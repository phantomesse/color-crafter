(()=>{"use strict";var r={208:(r,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_HEX_COLOR=void 0,t.asHexColor=function(r){var e,n;return(r=r.toLowerCase().replace("#","").substring(0,6)).length<3||1!==(null!==(n=null===(e=r.match(/[a-f0-9]+/g))||void 0===e?void 0:e.length)&&void 0!==n?n:0)?t.DEFAULT_HEX_COLOR:(r.length<6&&(r=r.substring(0,3).split("").map((function(r){return"".concat(r).concat(r)})).join("")),"#".concat(r))},t.DEFAULT_HEX_COLOR="#000000"},266:(r,t)=>{function e(r){return r>=0&&r<=255}Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_RGB_COLOR=void 0,t.asRgbColor=function(r,n,o){return r<=1&&n<=1&&o<=1&&(r*=255,n*=255,o*=255),[r=Math.round(r),n=Math.round(n),o=Math.round(o)].map(e).includes(!1)?t.DEFAULT_RGB_COLOR:{r,g:n,b:o}},t.DEFAULT_RGB_COLOR={r:0,g:0,b:0}}},t={};function e(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return r[n](u,u.exports,e),u.exports}e(208),e(266)})();