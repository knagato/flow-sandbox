(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(135)}])},135:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return Z}});var t=r(5893),i=r(9217);(0,i.vc)({"accessNode.api":"https://access-testnet.onflow.org","discovery.wallet":"https://fcl-discovery.onflow.org/testnet/authn","0xProfile":"0xba1132bc08f82fe2"});var o=r(7294),l=r(3519),a=r(9732),s=r(8695),c=r(3335),d=r(682),u=r(1608),f=r(1555),h=r(5530),j=r(3914),x=r(6986),b=r(5005);function y(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function v(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function m(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){v(e,n,r[n])}))}return e}function g(e){return function(e){if(Array.isArray(e))return y(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"===typeof e)return y(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(){var e={id:0,title:"",body:""},n=(0,o.useState)({loggedIn:null}),r=n[0],y=n[1];(0,o.useEffect)((function(){return i.ar.subscribe(y)}),[]);var Z=(0,o.useState)(!1),p=Z[0],w=Z[1],C=function(){return w(!1)},N=function(){return w(!0)},I=(0,o.useState)([{id:0,title:"title 1",body:"sample text"},{id:1,title:"title 2",body:"sample text"}]),O=I[0],S=I[1],_=(0,o.useState)(e),k=_[0],A=_[1],E=function(e){return function(n){var r=m({},k,v({},e,n.target.value));A(r)}},P=function(){var e;return(0,t.jsxs)(l.Z,{title:null!==(e=null===r||void 0===r?void 0:r.addr)&&void 0!==e?e:"No Address",id:"basic-nav-dropdown",children:[(0,t.jsx)(l.Z.Item,{onClick:N,children:"Create New Diary"}),(0,t.jsx)(l.Z.Divider,{}),(0,t.jsx)(l.Z.Item,{onClick:i._b,children:"Log Out"})]})},T=function(){return(0,t.jsx)(a.Z.Link,{onClick:i.Ib,children:"Log In"})},D=function(e){var n=e.diaries.map((function(e){return(0,t.jsxs)(s.Z.Item,{children:[(0,t.jsx)("h2",{children:e.title}),e.body]},e.id.toString())}));return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h1",{className:"my-3",children:"Your Diaries"}),(0,t.jsx)(s.Z,{children:n})]})};return(0,t.jsxs)("div",{children:[(0,t.jsx)(c.Z,{bg:"light",expand:"lg",children:(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(c.Z.Brand,{children:"NFT Diary"}),(0,t.jsx)(c.Z.Toggle,{"aria-controls":"basic-navbar-nav"}),(0,t.jsxs)(c.Z.Collapse,{id:"basic-navbar-nav",children:[(0,t.jsx)(a.Z,{className:"me-auto",children:(0,t.jsx)(a.Z.Link,{href:"#home",children:"Home"})}),(0,t.jsx)(a.Z,{className:"float-end",children:r.loggedIn?(0,t.jsx)(P,{}):(0,t.jsx)(T,{})})]})]})}),(0,t.jsx)(d.Z,{children:(0,t.jsx)(u.Z,{children:(0,t.jsx)(f.Z,{children:r.loggedIn?(0,t.jsx)(D,{diaries:O}):(0,t.jsx)("h1",{className:"my-3",children:"Please log in"})})})}),(0,t.jsxs)(h.Z,{show:p,onHide:C,children:[(0,t.jsx)(h.Z.Header,{closeButton:!0,children:(0,t.jsx)(h.Z.Title,{children:"Create New Diary"})}),(0,t.jsx)(h.Z.Body,{children:(0,t.jsxs)(j.Z,{children:[(0,t.jsxs)(x.Z,{controlId:"title",children:[(0,t.jsx)(j.Z.Label,{children:"Title"}),(0,t.jsx)(j.Z.Control,{type:"text",placeholder:"diary title",value:k.title,onChange:E("title")})]}),(0,t.jsxs)(x.Z,{controlId:"body",children:[(0,t.jsx)(j.Z.Label,{children:"Body"}),(0,t.jsx)(j.Z.Control,{as:"textarea",rows:5,value:k.body,onChange:E("body")})]})]})}),(0,t.jsxs)(h.Z.Footer,{children:[(0,t.jsx)(b.Z,{variant:"secondary",onClick:C,children:"Close"}),(0,t.jsx)(b.Z,{variant:"primary",onClick:function(){var n=m({},k,{id:O.length});S(g(O).concat([n])),A(e),C()},children:"Submit"})]})]})]})}}},function(e){e.O(0,[435,834,774,888,179],(function(){return n=8581,e(e.s=n);var n}));var n=e.O();_N_E=n}]);