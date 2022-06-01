(function(){"use strict";var e={1953:function(e,t,n){n.d(t,{Z:function(){return s}});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card mt-3 bg-white p-4"},[n("div",{staticClass:"card-header pb-3 d-flex jc-between"},[n("i",{staticClass:"iconfont",class:"icon-"+e.icon}),n("span",{staticClass:"fs-xl flex-1 px-2"},[e._v(e._s(e.title))]),n("i",{staticClass:"iconfont icon-gengduo"})]),e._t("default")],2)},i=[],o={props:{title:{type:String,required:!0},icon:{type:String,required:!0}}},a=o,c=n(1001),u=(0,c.Z)(a,r,i,!1,null,null,null),s=u.exports},9269:function(e,t,n){n(6992),n(8674),n(9601),n(7727);var r=n(8935),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],a=n(1001),c={},u=(0,a.Z)(c,i,o,!1,null,null,null),s=u.exports,l=(n(1539),n(8783),n(3948),n(2809));r.Z.use(l.Z);var f=[{path:"/",name:"Home",component:function(){return n.e(164).then(n.bind(n,2164))},children:[{path:"/",name:"News",component:function(){return Promise.all([n.e(135),n.e(293)]).then(n.bind(n,9293))}},{path:"article/:id",name:"Article",component:function(){return Promise.all([n.e(135),n.e(401)]).then(n.bind(n,9554))},props:!0}]},{path:"/heroes/:id",name:"Hero",component:function(){return Promise.all([n.e(135),n.e(721)]).then(n.bind(n,1721))},props:!0}],d=new l.Z({mode:"history",base:"/",routes:f}),p=d,v=n(4665);r.Z.use(v.ZP);var h=new v.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),m=n(1953),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("m-card",{attrs:{icon:e.icon,title:e.title}},[n("div",{staticClass:"card-nav mt-3 nav jc-between fs-lg"},e._l(e.categories,(function(t,r){return n("div",{key:r,staticClass:"nav-item"},[n("span",{staticClass:"cp",class:{active:r==e.active},on:{click:function(t){return e.changeActive(r)}}},[e._v(e._s(t.name))])])})),0),n("div",{staticClass:"card-body mt-3"},[n("div",{ref:"list",staticClass:"swiper",class:"swiper"+this.icon},[n("div",{staticClass:"swiper-wrapper"},e._l(e.categories,(function(t,r){return n("div",{key:r,staticClass:"swiper-slide d-flex flex-col fs-lg"},[e._t("item",null,{category:t})],2)})),0)])])])},b=[],y=n(1770),w={props:{title:{type:String,required:!0},icon:{type:String,required:!0},categories:{type:Array,required:!0}},data:function(){return{active:0}},methods:{changeActive:function(e){this.$refs.list.swiper.slideTo(e)}},mounted:function(){var e=this,t=new y.Z(".swiper".concat(this.icon),{speed:400,spaceBetween:100,autoHeight:!0});t.on("slideChange",(function(){e.active=e.$refs.list.swiper.activeIndex}))}},C=w,_=(0,a.Z)(C,g,b,!1,null,null,null),k=_.exports;r.Z.config.productionTip=!1,r.Z.component("m-card",m.Z),r.Z.component("m-card-list",k),new r.Z({router:p,store:h,render:function(e){return e(s)}}).$mount("#app")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=e,function(){var e=[];n.O=function(t,r,i,o){if(!r){var a=1/0;for(l=0;l<e.length;l++){r=e[l][0],i=e[l][1],o=e[l][2];for(var c=!0,u=0;u<r.length;u++)(!1&o||a>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(c=!1,o<a&&(a=o));if(c){e.splice(l--,1);var s=i();void 0!==s&&(t=s)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"-legacy."+{135:"3a3745f6",164:"22efb1af",293:"0ceb2378",401:"94dfe1ef",721:"4fbf871f"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{164:"cf30880d",293:"4dabe709",401:"f44f1767",721:"6b9b086f"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="web:";n.l=function(r,i,o,a){if(e[r])e[r].push(i);else{var c,u;if(void 0!==o)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var f=s[l];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==t+o){c=f;break}}c||(u=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",t+o),c.src=r),e[r]=[i];var d=function(t,n){c.onerror=c.onload=null,clearTimeout(p);var i=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),i&&i.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),u&&document.head.appendChild(c)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,r){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var o=function(o){if(i.onerror=i.onload=null,"load"===o.type)n();else{var a=o&&("load"===o.type?"missing":o.type),c=o&&o.target&&o.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=a,u.request=c,i.parentNode.removeChild(i),r(u)}};return i.onerror=i.onload=o,i.href=t,document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var i=n[r],o=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===t))return i}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){i=a[r],o=i.getAttribute("data-href");if(o===e||o===t)return i}},r=function(r){return new Promise((function(i,o){var a=n.miniCssF(r),c=n.p+a;if(t(a,c))return i();e(r,c,i,o)}))},i={143:0};n.f.miniCss=function(e,t){var n={164:1,293:1,401:1,721:1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=r(e).then((function(){i[e]=0}),(function(t){throw delete i[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var o=new Promise((function(n,r){i=e[t]=[n,r]}));r.push(i[2]=o);var a=n.p+n.u(t),c=new Error,u=function(r){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",c.name="ChunkLoadError",c.type=o,c.request=a,i[1](c)}};n.l(a,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,a=r[0],c=r[1],u=r[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(i in c)n.o(c,i)&&(n.m[i]=c[i]);if(u)var l=u(n)}for(t&&t(r);s<a.length;s++)o=a[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(l)},r=self["webpackChunkweb"]=self["webpackChunkweb"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(9269)}));r=n.O(r)})();
//# sourceMappingURL=app-legacy.12e2f8ad.js.map