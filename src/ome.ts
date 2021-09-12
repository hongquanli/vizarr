import { ZarrPixelSource } from '@hms-dbmi/viv';
import pMap from 'p-map';
import { Group as ZarrGroup, HTTPStore, openGroup, ZarrArray } from 'zarr';
import type { ImageLayerConfig, SourceData } from './state';
import { join, loadMultiscales, guessTileSize, range, parseMatrix, decodeAttrs } from './utils';

import * as Ome from './ome-types';

export async function loadWell(config: ImageLayerConfig, grp: ZarrGroup, well: Ome.Well): Promise<SourceData> {
  // Can filter Well fields by URL query ?acquisition=ID
  let acquisitions: Ome.Acquisition[] = [];

  if (!(grp.store instanceof HTTPStore)) {
    throw Error('Store must be an HTTPStore to open well.');
  }

  const [row, col] = grp.store.url.split('/').filter(Boolean).slice(-2);

  let { images } = well;

  // Do we have more than 1 Acquisition?
  const acqIds = images.flatMap((img) => (img.acquisition ? [img.acquisition] : []));

  if (acqIds.length > 1) {
    // Need to get acquisitions metadata from parent Plate
    const plateUrl = grp.store.url.replace(`${row}/${col}`, '');
    const plate = await openGroup(new HTTPStore(plateUrl));
    const plateAttrs = await decodeAttrs(plate.attrs, Ome.PlateAttrs);
    acquisitions = plateAttrs.plate.acquisitions ?? [];

    // filter imagePaths by acquisition
    if (config.acquisition && acqIds.includes(config.acquisition)) {
      images = images.filter((img) => img.acquisition === config.acquisition);
    }
  }

  const imgPaths = images.map((img) => img.path);
  const cols = Math.ceil(Math.sqrt(imgPaths.length));
  const rows = Math.ceil(imgPaths.length / cols);

  // Use first image for rendering settings, resolutions etc.
  const imgAttrs = await decodeAttrs((await grp.getItem(imgPaths[0])).attrs, Ome.OmeroAttrs);

  const resolution = imgAttrs.multiscales[0].datasets[0].path;

  // Create loader for every Image.
  const promises = imgPaths.map((p) => grp.getItem(join(p, resolution)));
  const data = (await Promise.all(promises)) as ZarrArray[];
  const axis_labels = getOmeAxisLabels(imgAttrs.multiscales);
  const meta = parseOmeroMeta(imgAttrs.omero, axis_labels);

  const tileSize = guessTileSize(data[0]);
  const loaders = range(rows).flatMap((row) => {
    return range(cols).map((col) => {
      const offset = col + row * cols;
      return { name: String(offset), row, col, loader: new ZarrPixelSource(data[offset], axis_labels, tileSize) };
    });
  });

  const sourceData: SourceData = {
    loaders,
    ...meta,
    axis_labels,
    loader: [loaders[0].loader],
    model_matrix: parseMatrix(config.model_matrix),
    defaults: {
      selection: meta.defaultSelection,
      colormap: config.colormap ?? '',
      opacity: config.opacity ?? 1,
    },
    name: `Well ${row}${col}`,
  };

  if (acquisitions.length > 0) {
    // To show acquisition chooser in UI
    sourceData.acquisitions = acquisitions;
    sourceData.acquisitionId = config.acquisition || -1;
  }

  sourceData.rows = rows;
  sourceData.columns = cols;
  sourceData.onClick = (info: any) => {
    let gridCoord = info.gridCoord;
    if (!gridCoord) {
      return;
    }
    const { row, column } = gridCoord;
    let imgSource = undefined;
    if (grp.store instanceof HTTPStore && !isNaN(row) && !isNaN(column)) {
      const field = row * cols + column;
      imgSource = join(grp.store.url, imgPaths[field]);
    }
    if (config.onClick) {
      delete info.layer;
      info.imageSource = imgSource;
      config.onClick(info);
    } else if (imgSource) {
      window.open(window.location.origin + window.location.pathname + '?source=' + imgSource);
    }
  };

  return sourceData;
}

export async function loadPlate(config: ImageLayerConfig, grp: ZarrGroup, plate: Ome.Plate): Promise<SourceData> {
  const rows = plate.rows.map((row) => row.name);
  const columns = plate.columns.map((row) => row.name);

  // Fields are by index and we assume at least 1 per Well
  const wellPaths = plate.wells.map((well) => well.path);

  // Use first image as proxy for others.
  const { well } = await grp.getItem(wellPaths[0]).then((g) => decodeAttrs(g.attrs, Ome.WellAttrs));

  const imgPath = well.images[0].path;
  const imgAttrs = await grp
    .getItem(join(wellPaths[0], imgPath))
    .then((node) => decodeAttrs(node.attrs, Ome.OmeroAttrs));

  // Lowest resolution is the 'path' of the last 'dataset' from the first multiscales
  const { datasets } = imgAttrs.multiscales[0];
  const resolution = datasets[datasets.length - 1].path;

  // Create loader for every Well. Some loaders may be undefined if Wells are missing.
  const mapper = ([key, path]: string[]) => grp.getItem(path).then((arr) => [key, arr]) as Promise<[string, ZarrArray]>;
  const promises = await pMap(
    wellPaths.map((p) => [p, join(p, imgPath, resolution)]),
    mapper,
    { concurrency: 10 }
  );
  const data = await Promise.all(promises);
  const axis_labels = getOmeAxisLabels(imgAttrs.multiscales);
  const meta = parseOmeroMeta(imgAttrs.omero, axis_labels);
  const tileSize = guessTileSize(data[0][1]);
  const loaders = data.map((d) => {
    const [row, col] = d[0].split('/');
    return {
      name: `${row}${col}`,
      row: rows.indexOf(row),
      col: columns.indexOf(col),
      loader: new ZarrPixelSource(d[1], axis_labels, tileSize),
    };
  });

  // Load Image to use for channel names, rendering settings, sizeZ, sizeT etc.
  const sourceData: SourceData = {
    loaders,
    ...meta,
    axis_labels,
    loader: [loaders[0].loader],
    model_matrix: parseMatrix(config.model_matrix),
    defaults: {
      selection: meta.defaultSelection,
      colormap: config.colormap ?? '',
      opacity: config.opacity ?? 1,
    },
    name: plate.name || 'Plate',
    rows: rows.length,
    columns: columns.length,
  };
  // Us onClick from image config or Open Well in new window
  sourceData.onClick = (info: any) => {
    let gridCoord = info.gridCoord;
    if (!gridCoord) {
      return;
    }
    const { row, column } = gridCoord;
    let imgSource = undefined;
    // TODO: use a regex for the path??
    if (grp.store instanceof HTTPStore && !isNaN(row) && !isNaN(column)) {
      imgSource = join(grp.store.url, rows[row], columns[column]);
    }
    if (config.onClick) {
      delete info.layer;
      info.imageSource = imgSource;
      config.onClick(info);
    } else if (imgSource) {
      window.open(window.location.origin + window.location.pathname + '?source=' + imgSource);
    }
  };
  return sourceData;
}

export async function loadOmeroMultiscales(
  config: ImageLayerConfig,
  grp: ZarrGroup,
  attrs: { multiscales: Ome.Multiscale[]; omero: Ome.Omero }
): Promise<SourceData> {
  const { name, opacity = 1, colormap = '' } = config;
  const data = await loadMultiscales(grp, attrs.multiscales);
  const axis_labels = getOmeAxisLabels(attrs.multiscales);
  const meta = parseOmeroMeta(attrs.omero, axis_labels);
  const tileSize = guessTileSize(data[0]);

  const loader = data.map((arr) => new ZarrPixelSource(arr, axis_labels, tileSize));
  return {
    ...meta,
    name: meta.name ?? name,
    loader: loader,
    axis_labels,
    model_matrix: parseMatrix(config.model_matrix),
    defaults: {
      selection: meta.defaultSelection,
      colormap,
      opacity,
    },
  };
}

function parseOmeroMeta({ rdefs, channels, name }: Ome.Omero, axis_labels: string[]) {
  const t = rdefs.defaultT ?? 0;
  const z = rdefs.defaultZ ?? 0;

  const colors: string[] = [];
  const contrast_limits: number[][] = [];
  const visibilities: boolean[] = [];
  const names: string[] = [];

  channels.forEach((c) => {
    colors.push(c.color);
    contrast_limits.push([c.window.start, c.window.end]);
    visibilities.push(c.active);
    names.push(c.label);
  });

  const defaultSelection = axis_labels.map((label) => {
    if (label == 't') return t;
    if (label == 'z') return z;
    return 0;
  });

  return {
    name,
    names,
    colors,
    contrast_limits,
    visibilities,
    channel_axis: axis_labels.includes('c') ? axis_labels.indexOf('c') : null,
    defaultSelection,
  };
}

function getOmeAxisLabels(multiscales: Ome.Multiscale[]): [...string[], 'y', 'x'] {
  const default_axes = ['t', 'c', 'z', 'y', 'x']; // v0.1 & v0.2
  return (multiscales[0].axes || default_axes) as [...string[], 'y', 'x'];
}
