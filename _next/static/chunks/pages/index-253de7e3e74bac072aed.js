_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[11],{"/EDR":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r("QeBL")}])},"2qu3":function(e,t,r){"use strict";var n=r("lSNA"),o=r("lwsE"),u=r("W8MJ");function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){var r;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,a=!0,i=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){i=!0,u=e},f:function(){try{a||null==r.return||r.return()}finally{if(i)throw u}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}t.__esModule=!0,t.default=void 0;var s,f=(s=r("q1tI"))&&s.__esModule?s:{default:s},d=r("8L3h"),p=r("jwwS");var b=[],y=[],h=!1;function O(e){var t=e(),r={loading:!0,loaded:null,error:null};return r.promise=t.then((function(e){return r.loading=!1,r.loaded=e,e})).catch((function(e){throw r.loading=!1,r.error=e,e})),r}function m(e){var t={loading:!1,loaded:{},error:null},r=[];try{Object.keys(e).forEach((function(n){var o=O(e[n]);o.loading?t.loading=!0:(t.loaded[n]=o.loaded,t.error=o.error),r.push(o.promise),o.promise.then((function(e){t.loaded[n]=e})).catch((function(e){t.error=e}))}))}catch(n){t.error=n}return t.promise=Promise.all(r).then((function(e){return t.loading=!1,e})).catch((function(e){throw t.loading=!1,e})),t}function v(e,t){return f.default.createElement(function(e){return e&&e.__esModule?e.default:e}(e),t)}function j(e,t){var r=Object.assign({loader:null,loading:null,delay:200,timeout:null,render:v,webpack:null,modules:null},t),n=null;function o(){if(!n){var t=new w(e,r);n={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return n.promise()}if(!h&&"function"===typeof r.webpack){var u=r.webpack();y.push((function(e){var t,r=c(u);try{for(r.s();!(t=r.n()).done;){var n=t.value;if(-1!==e.indexOf(n))return o()}}catch(a){r.e(a)}finally{r.f()}}))}var a=function(e,t){o();var u=f.default.useContext(p.LoadableContext),a=(0,d.useSubscription)(n);return f.default.useImperativeHandle(t,(function(){return{retry:n.retry}}),[]),u&&Array.isArray(r.modules)&&r.modules.forEach((function(e){u(e)})),f.default.useMemo((function(){return a.loading||a.error?f.default.createElement(r.loading,{isLoading:a.loading,pastDelay:a.pastDelay,timedOut:a.timedOut,error:a.error,retry:n.retry}):a.loaded?r.render(a.loaded,e):null}),[e,a])};return a.preload=function(){return o()},a.displayName="LoadableComponent",f.default.forwardRef(a)}var w=function(){function e(t,r){o(this,e),this._loadFn=t,this._opts=r,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return u(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var t=this._res,r=this._opts;t.loading&&("number"===typeof r.delay&&(0===r.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),r.delay)),"number"===typeof r.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),r.timeout))),this._res.promise.then((function(){e._update({}),e._clearTimeouts()})).catch((function(t){e._update({}),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=i(i({},this._state),{},{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var t=this;return this._callbacks.add(e),function(){t._callbacks.delete(e)}}}]),e}();function g(e){return j(O,e)}function _(e,t){for(var r=[];e.length;){var n=e.pop();r.push(n(t))}return Promise.all(r).then((function(){if(e.length)return _(e,t)}))}g.Map=function(e){if("function"!==typeof e.render)throw new Error("LoadableMap requires a `render(loaded, props)` function");return j(m,e)},g.preloadAll=function(){return new Promise((function(e,t){_(b).then(e,t)}))},g.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(t){var r=function(){return h=!0,t()};_(y,e).then(r,r)}))},window.__NEXT_PRELOADREADY=g.preloadReady;var P=g;t.default=P},"5G8z":function(e,t,r){"use strict";r.d(t,"d",(function(){return c})),r.d(t,"a",(function(){return l})),r.d(t,"e",(function(){return s})),r.d(t,"b",(function(){return f})),r.d(t,"c",(function(){return d}));var n=r("rePB"),o=r("T1Xd");function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i={loader:void 0,colorValues:[],sliderValues:[],contrastLimits:[],loaderSelection:[],channelIsOn:[],colormap:"",opacity:1},c=Object(o.b)({key:"sourceInfo",default:{}}),l=Object(o.b)({key:"layerIds",default:[]}),s=Object(o.b)({key:"viewerViewState",default:{zoom:0,target:[0,0,0],default:!0}}),f=Object(o.c)({key:"layerStateFamily",default:function(e){return{Layer:null,layerProps:a({id:e},i),on:!1}}}),d=Object(o.d)({key:"layerSelector",get:function(e){var t=e.get,r=t(l).map((function(e){return f(e)}));return t(Object(o.h)(r))}})},"HaE+":function(e,t,r){"use strict";function n(e,t,r,n,o,u,a){try{var i=e[u](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,u){var a=e.apply(t,r);function i(e){n(a,o,u,i,c,"next",e)}function c(e){n(a,o,u,i,c,"throw",e)}i(void 0)}))}}r.d(t,"a",(function(){return o}))},QeBL:function(e,t,r){"use strict";r.r(t);var n=r("KQm4"),o=r("rePB"),u=r("o0o1"),a=r.n(u),i=r("HaE+"),c=r("nKUr"),l=r("a6RD"),s=r.n(l),f=r("nOHt"),d=r("q1tI"),p=r("T1Xd"),b=r("kiQV"),y=r("5G8z");function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=s()((function(){return Promise.all([r.e(1),r.e(0),r.e(16)]).then(r.bind(null,"4Rbn"))}),{loadableGenerated:{webpack:function(){return["4Rbn"]},modules:["../components/Viewer"]}}),v=s()((function(){return Promise.all([r.e(1),r.e(3),r.e(0),r.e(6),r.e(14)]).then(r.bind(null,"JzcK"))}),{loadableGenerated:{webpack:function(){return["JzcK"]},modules:["../components/Menu"]}});t.default=function(){var e=Object(f.useRouter)(),t=Object(p.g)(y.e),u=Object(p.g)(y.a),l=Object(p.g)(y.d);function s(e){return h.apply(this,arguments)}function h(){return(h=Object(i.a)(a.a.mark((function e(t){var i,c,s,f;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([r.e(1),r.e(3),r.e(5),r.e(7),r.e(13)]).then(r.bind(null,"Ab0Y"));case 2:return i=e.sent,c=i.createSourceData,s=Math.random().toString(36).slice(2),e.next=7,c(t);case 7:f=e.sent,l((function(e){return f.name||(f.name="image_".concat(Object.keys(e).length)),O(O({},e),{},Object(o.a)({},s,f))})),u((function(e){return[].concat(Object(n.a)(e),[s])}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(d.useEffect)((function(){"source"in e.query&&s(e.query)}),[e]),Object(d.useEffect)((function(){function e(){return(e=Object(i.a)(a.a.mark((function e(){var n,o,u,c,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(15).then(r.t.bind(null,"Sc0T",7));case 2:return n=e.sent,o=n.setupRPC,e.next=6,o({name:"vizarr",description:"A minimal, purely client-side program for viewing Zarr-based images with Viv & ImJoy",version:b.a});case 6:u=e.sent,c=function(){var e=Object(i.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s(t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(i.a)(a.a.mark((function e(r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t(r));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u.export({add_image:c,set_view_state:l});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}window.self!==window.top&&function(){e.apply(this,arguments)}()}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(v,{}),Object(c.jsx)(m,{})]})}},a6RD:function(e,t,r){"use strict";var n=r("lSNA");function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.__esModule=!0,t.noSSR=c,t.default=function(e,t){var r=a.default,n={loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};e instanceof Promise?n.loader=function(){return e}:"function"===typeof e?n.loader=e:"object"===typeof e&&(n=u(u({},n),e));if(n=u(u({},n),t),"object"===typeof e&&!(e instanceof Promise)&&(e.render&&(n.render=function(t,r){return e.render(r,t)}),e.modules)){r=a.default.Map;var o={},i=e.modules();Object.keys(i).forEach((function(e){var t=i[e];"function"!==typeof t.then?o[e]=t:o[e]=function(){return t.then((function(e){return e.default||e}))}})),n.loader=o}n.loadableGenerated&&delete(n=u(u({},n),n.loadableGenerated)).loadableGenerated;if("boolean"===typeof n.ssr){if(!n.ssr)return delete n.ssr,c(r,n);delete n.ssr}return r(n)};i(r("q1tI"));var a=i(r("2qu3"));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){return delete t.webpack,delete t.modules,e(t)}},jwwS:function(e,t,r){"use strict";var n;t.__esModule=!0,t.LoadableContext=void 0;var o=((n=r("q1tI"))&&n.__esModule?n:{default:n}).default.createContext(null);t.LoadableContext=o},kiQV:function(e){e.exports=JSON.parse('{"a":"0.1.0"}')},lSNA:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}}},[["/EDR",2,1,0,4]]]);