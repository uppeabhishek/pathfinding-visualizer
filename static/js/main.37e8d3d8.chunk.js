(this["webpackJsonppathfinding-visualizer"]=this["webpackJsonppathfinding-visualizer"]||[]).push([[0],{221:function(e,a,t){e.exports=t(425)},423:function(e,a,t){},425:function(e,a,t){"use strict";t.r(a);t(222),t(231),t(415);var r=t(0),n=t.n(r),c=t(18),l=t.n(c),o=t(96),i=t(456),s=t(458),m=t(459),u=t(464),d=t(461),h=t(462),f=t(460),v=t(463),b=t(453),g=t(465),E=Object(b.a)((function(e){return Object(g.a)({header:{padding:"10px",maxWidth:"100%",overflowX:"auto"},toolbar:{"& > *":{color:"white",flexDirection:"column",display:"flex",marginRight:"40px"}}})})),p=function(){var e=Object(r.useState)(""),a=Object(o.a)(e,2),t=a[0],c=a[1],l=Object(r.useState)(""),b=Object(o.a)(l,2),g=b[0],p=b[1],O=Object(r.useRef)([{name:"Depth First Search",value:"DFS"},{name:"A*",value:"A*"}]),j=Object(r.useRef)([{name:"Random",value:"random"},{name:"Recursive Backtracker",value:"recursiveBackTracker"}]);var A=E();return n.a.createElement("div",null,n.a.createElement(i.a,{className:A.header,position:"static"},n.a.createElement(s.a,{className:A.toolbar},n.a.createElement(m.a,{className:"item title",variant:"h4"},"Pathfinding Visualizer"),n.a.createElement("div",{className:"item graphAlgorithms"},n.a.createElement(u.a,{id:"graphAlgorithmsLabel"},n.a.createElement(m.a,{variant:"h6"},"Algorithms")),n.a.createElement(d.a,{id:"graphAlgorithms",labelId:"graphAlgorithmsLabel",value:t,onChange:function(e){c(e.target.value)}},O.current.map((function(e){return n.a.createElement(h.a,{key:e.name,value:e.value},e.name)})))),n.a.createElement("div",{className:"item mazeGenerationAlgorithms"},n.a.createElement(u.a,{id:"mazeGenerationAlgorithmsLabel"},n.a.createElement(m.a,{variant:"h6"},"Mazes")),n.a.createElement(d.a,{id:"mazeGenerationAlgorithms",labelId:"mazeGenerationAlgorithmsLabel",value:g,onChange:function(e){p(e.target.value)}},j.current.map((function(e){return n.a.createElement(h.a,{key:e.name,value:e.value},e.name)})))),n.a.createElement(f.a,{variant:"contained"},"Visualize"),n.a.createElement("div",null,n.a.createElement(m.a,{gutterBottom:!0,id:"animationSpeedSlider"},"Animation Speed"),n.a.createElement(v.a,{"aria-labelledby":"animationSpeedSliderr",defaultValue:30,getAriaValueText:function(e){return e.toString()},marks:!0,max:100,min:10,step:10,valueLabelDisplay:"auto"})),n.a.createElement(f.a,{color:"secondary",variant:"contained"},"Clear Route"),n.a.createElement(f.a,{color:"secondary",variant:"contained"},"Clear Weights"),n.a.createElement(f.a,{color:"secondary",variant:"contained"},"Clear Board"))))},O=Object(b.a)((function(e){return Object(g.a)({root:{flex:1},"@keyframes tdAnimation":{from:{transform:"scaleX(0)"},to:{transform:"scaleX(1)"}},table:{overflow:"hidden",borderSpacing:0,"& td":{textAlign:"center",color:"white",animation:"$tdAnimation 1500ms"},"& td.selected":{"&:hover":{transform:"scale(1.5)"},backgroundColor:"#61dafb"},"& td.source":{"&:hover":{transform:"scale(1.5)"},backgroundColor:"green"},"& td.destination":{"&:hover":{transform:"scale(1.5)"},backgroundColor:"red"}}})})),j=function(e){var a=e.height,t=e.width,c=O(),l=30,o=30,i=Math.floor(a/l),s=Math.floor(t/o);function m(e){var a=e.currentTarget.classList,t=new Set(e.currentTarget.classList);t.has("source")||t.has("destination")||(t.has("selected")?a.remove("selected"):a.add("selected"))}var u=!1;function d(e){m(e),u=!0}function h(){u=!1}function f(e){u&&m(e)}o-=4,l-=4;var v=function(e){for(var a=e.row,t=[],r=a===Math.floor(i/2),c=Math.floor(s/4),m=3*c,u="",v="",b=0;b<s;b++)r&&(c===b?(u="source",v="S"):m===b?(u="destination",v="D"):(u="",v="")),t.push(n.a.createElement("td",{key:"".concat(a).concat(b),className:u,"data-id":"".concat(a).concat(b),style:{width:o,height:l,border:"".concat(1,"px solid blue")},onMouseDown:d,onMouseEnter:f,onMouseUp:h},v));return n.a.createElement(n.a.Fragment,null,t)},b=function(){for(var e=[],a=0;a<i;a++)e.push(n.a.createElement("tr",{key:a},n.a.createElement(v,{row:a})));return n.a.createElement(n.a.Fragment,null,e)},g=Object(r.useRef)(null);return n.a.createElement("table",{className:c.table},n.a.createElement("tbody",{ref:g},n.a.createElement(b,null)))},A=function(){var e=O(),a=Object(r.useRef)(null),t=Object(r.useState)([0,0]),c=Object(o.a)(t,2),l=c[0],i=c[1];return Object(r.useEffect)((function(){a.current&&i([a.current.clientHeight,a.current.clientWidth])}),[]),n.a.createElement("div",{ref:a,className:e.root},l[0]>0&&n.a.createElement(j,{height:l[0],width:l[1]}))},w=function(){return n.a.createElement("div",null)},y=Object(b.a)((function(e){return Object(g.a)({root:{width:"100%",height:"100%",display:"flex",flexDirection:"column"},main:{flex:1,display:"flex",flexDirection:"column",padding:"10px"}})}));var S=function(){var e=y();return n.a.createElement("div",{className:e.root},n.a.createElement(p,null),n.a.createElement("div",{className:e.main},n.a.createElement(w,null),n.a.createElement(A,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(423);var R=t(214),k=t(73),x=t(28),N={algorithm:"",animationSpeed:50,mazeType:"",clearRoute:!1,clearBoard:!1,clearWeights:!1,vAlgorithm:!1},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"CHANGE_ALGORITHM":return Object(x.a)(Object(x.a)({},e),{},{algorithm:a.algorithm});case"CHANGE_MAZE_TYPE":return Object(x.a)(Object(x.a)({},e),{},{mazeType:a.mazeType});case"CHANGE_ANIMATION_SPEED":return Object(x.a)(Object(x.a)({},e),{},{animationSpeed:a.animationSpeed});case"CLEAR_ROUTE":return Object(x.a)(Object(x.a)({},e),{},{clearRoute:a.clearRoute});case"CLEAR_BOARD":return Object(x.a)(Object(x.a)({},e),{},{clearBoard:a.clearBoard});case"CLEAR_WEIGHTS":return Object(x.a)(Object(x.a)({},e),{},{clearWeights:a.clearWeights});case"VISUALIZE_ALGORITHM":return Object(x.a)(Object(x.a)({},e),{},{vAlgorithm:a.vAlgorithm});default:return Object(x.a)({},e)}},L=Object(k.b)({globals:C}),M=Object(k.c)(L,{});l.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(R.a,{store:M},n.a.createElement(S,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[221,1,2]]]);
//# sourceMappingURL=main.37e8d3d8.chunk.js.map