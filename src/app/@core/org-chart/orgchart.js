/*
  html2canvas 0.5.0-beta4 <http://html2canvas.hertzen.com>
  Copyright (c) 2016 Niklas von Hertzen

  Released under  License
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.html2canvas=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(b,c,d){(function(b){!function(e){function f(a){throw new RangeError(I[a])}function g(a,b){for(var c=a.length,d=[];c--;)d[c]=b(a[c]);return d}function h(a,b){var c=a.split("@"),d="";c.length>1&&(d=c[0]+"@",a=c[1]),a=a.replace(H,".");var e=a.split("."),f=g(e,b).join(".");return d+f}function i(a){for(var b,c,d=[],e=0,f=a.length;f>e;)b=a.charCodeAt(e++),b>=55296&&56319>=b&&f>e?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function j(a){return g(a,function(a){var b="";return a>65535&&(a-=65536,b+=L(a>>>10&1023|55296),a=56320|1023&a),b+=L(a)}).join("")}function k(a){return 10>a-48?a-22:26>a-65?a-65:26>a-97?a-97:x}function l(a,b){return a+22+75*(26>a)-((0!=b)<<5)}function m(a,b,c){var d=0;for(a=c?K(a/B):a>>1,a+=K(a/b);a>J*z>>1;d+=x)a=K(a/J);return K(d+(J+1)*a/(a+A))}function n(a){var b,c,d,e,g,h,i,l,n,o,p=[],q=a.length,r=0,s=D,t=C;for(c=a.lastIndexOf(E),0>c&&(c=0),d=0;c>d;++d)a.charCodeAt(d)>=128&&f("not-basic"),p.push(a.charCodeAt(d));for(e=c>0?c+1:0;q>e;){for(g=r,h=1,i=x;e>=q&&f("invalid-input"),l=k(a.charCodeAt(e++)),(l>=x||l>K((w-r)/h))&&f("overflow"),r+=l*h,n=t>=i?y:i>=t+z?z:i-t,!(n>l);i+=x)o=x-n,h>K(w/o)&&f("overflow"),h*=o;b=p.length+1,t=m(r-g,b,0==g),K(r/b)>w-s&&f("overflow"),s+=K(r/b),r%=b,p.splice(r++,0,s)}return j(p)}function o(a){var b,c,d,e,g,h,j,k,n,o,p,q,r,s,t,u=[];for(a=i(a),q=a.length,b=D,c=0,g=C,h=0;q>h;++h)p=a[h],128>p&&u.push(L(p));for(d=e=u.length,e&&u.push(E);q>d;){for(j=w,h=0;q>h;++h)p=a[h],p>=b&&j>p&&(j=p);for(r=d+1,j-b>K((w-c)/r)&&f("overflow"),c+=(j-b)*r,b=j,h=0;q>h;++h)if(p=a[h],b>p&&++c>w&&f("overflow"),p==b){for(k=c,n=x;o=g>=n?y:n>=g+z?z:n-g,!(o>k);n+=x)t=k-o,s=x-o,u.push(L(l(o+t%s,0))),k=K(t/s);u.push(L(l(k,0))),g=m(c,r,d==e),c=0,++d}++c,++b}return u.join("")}function p(a){return h(a,function(a){return F.test(a)?n(a.slice(4).toLowerCase()):a})}function q(a){return h(a,function(a){return G.test(a)?"xn--"+o(a):a})}var r="object"==typeof d&&d&&!d.nodeType&&d,s="object"==typeof c&&c&&!c.nodeType&&c,t="object"==typeof b&&b;(t.global===t||t.window===t||t.self===t)&&(e=t);var u,v,w=2147483647,x=36,y=1,z=26,A=38,B=700,C=72,D=128,E="-",F=/^xn--/,G=/[^\x20-\x7E]/,H=/[\x2E\u3002\uFF0E\uFF61]/g,I={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},J=x-y,K=Math.floor,L=String.fromCharCode;if(u={version:"1.3.2",ucs2:{decode:i,encode:j},decode:n,encode:o,toASCII:q,toUnicode:p},"function"==typeof a&&"object"==typeof a.amd&&a.amd)a("punycode",function(){return u});else if(r&&s)if(c.exports==r)s.exports=u;else for(v in u)u.hasOwnProperty(v)&&(r[v]=u[v]);else e.punycode=u}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(a,b,c){function d(a,b,c){!a.defaultView||b===a.defaultView.pageXOffset&&c===a.defaultView.pageYOffset||a.defaultView.scrollTo(b,c)}function e(a,b){try{b&&(b.width=a.width,b.height=a.height,b.getContext("2d").putImageData(a.getContext("2d").getImageData(0,0,a.width,a.height),0,0))}catch(c){h("Unable to copy canvas content from",a,c)}}function f(a,b){for(var c=3===a.nodeType?document.createTextNode(a.nodeValue):a.cloneNode(!1),d=a.firstChild;d;)(b===!0||1!==d.nodeType||"SCRIPT"!==d.nodeName)&&c.appendChild(f(d,b)),d=d.nextSibling;return 1===a.nodeType&&(c._scrollTop=a.scrollTop,c._scrollLeft=a.scrollLeft,"CANVAS"===a.nodeName?e(a,c):("TEXTAREA"===a.nodeName||"SELECT"===a.nodeName)&&(c.value=a.value)),c}function g(a){if(1===a.nodeType){a.scrollTop=a._scrollTop,a.scrollLeft=a._scrollLeft;for(var b=a.firstChild;b;)g(b),b=b.nextSibling}}var h=a("./log");b.exports=function(a,b,c,e,h,i,j){var k=f(a.documentElement,h.javascriptEnabled),l=b.createElement("iframe");return l.className="html2canvas-container",l.style.visibility="hidden",l.style.position="fixed",l.style.left="-10000px",l.style.top="0px",l.style.border="0",l.width=c,l.height=e,l.scrolling="no",b.body.appendChild(l),new Promise(function(b){var c=l.contentWindow.document;l.contentWindow.onload=l.onload=function(){var a=setInterval(function(){c.body.childNodes.length>0&&(g(c.documentElement),clearInterval(a),"view"===h.type&&(l.contentWindow.scrollTo(i,j),!/(iPad|iPhone|iPod)/g.test(navigator.userAgent)||l.contentWindow.scrollY===j&&l.contentWindow.scrollX===i||(c.documentElement.style.top=-j+"px",c.documentElement.style.left=-i+"px",c.documentElement.style.position="absolute")),b(l))},50)},c.open(),c.write("<!DOCTYPE html><html></html>"),d(a,i,j),c.replaceChild(c.adoptNode(k),c.documentElement),c.close()})}},{"./log":13}],3:[function(a,b,c){function d(a){this.r=0,this.g=0,this.b=0,this.a=null;this.fromArray(a)||this.namedColor(a)||this.rgb(a)||this.rgba(a)||this.hex6(a)||this.hex3(a)}d.prototype.darken=function(a){var b=1-a;return new d([Math.round(this.r*b),Math.round(this.g*b),Math.round(this.b*b),this.a])},d.prototype.isTransparent=function(){return 0===this.a},d.prototype.isBlack=function(){return 0===this.r&&0===this.g&&0===this.b},d.prototype.fromArray=function(a){return Array.isArray(a)&&(this.r=Math.min(a[0],255),this.g=Math.min(a[1],255),this.b=Math.min(a[2],255),a.length>3&&(this.a=a[3])),Array.isArray(a)};var e=/^#([a-f0-9]{3})$/i;d.prototype.hex3=function(a){var b=null;return null!==(b=a.match(e))&&(this.r=parseInt(b[1][0]+b[1][0],16),this.g=parseInt(b[1][1]+b[1][1],16),this.b=parseInt(b[1][2]+b[1][2],16)),null!==b};var f=/^#([a-f0-9]{6})$/i;d.prototype.hex6=function(a){var b=null;return null!==(b=a.match(f))&&(this.r=parseInt(b[1].substring(0,2),16),this.g=parseInt(b[1].substring(2,4),16),this.b=parseInt(b[1].substring(4,6),16)),null!==b};var g=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;d.prototype.rgb=function(a){var b=null;return null!==(b=a.match(g))&&(this.r=Number(b[1]),this.g=Number(b[2]),this.b=Number(b[3])),null!==b};var h=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;d.prototype.rgba=function(a){var b=null;return null!==(b=a.match(h))&&(this.r=Number(b[1]),this.g=Number(b[2]),this.b=Number(b[3]),this.a=Number(b[4])),null!==b},d.prototype.toString=function(){return null!==this.a&&1!==this.a?"rgba("+[this.r,this.g,this.b,this.a].join(",")+")":"rgb("+[this.r,this.g,this.b].join(",")+")"},d.prototype.namedColor=function(a){a=a.toLowerCase();var b=i[a];if(b)this.r=b[0],this.g=b[1],this.b=b[2];else if("transparent"===a)return this.r=this.g=this.b=this.a=0,!0;return!!b},d.prototype.isColor=!0;var i={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};b.exports=d},{}],4:[function(b,c,d){function e(a,b){var c=x++;if(b=b||{},b.logging&&(r.options.logging=!0,r.options.start=Date.now()),b.async="undefined"==typeof b.async?!0:b.async,b.allowTaint="undefined"==typeof b.allowTaint?!1:b.allowTaint,b.removeContainer="undefined"==typeof b.removeContainer?!0:b.removeContainer,b.javascriptEnabled="undefined"==typeof b.javascriptEnabled?!1:b.javascriptEnabled,b.imageTimeout="undefined"==typeof b.imageTimeout?1e4:b.imageTimeout,b.renderer="function"==typeof b.renderer?b.renderer:n,b.strict=!!b.strict,"string"==typeof a){if("string"!=typeof b.proxy)return Promise.reject("Proxy must be used when rendering url");var d=null!=b.width?b.width:window.innerWidth,e=null!=b.height?b.height:window.innerHeight;return u(l(a),b.proxy,document,d,e,b).then(function(a){return g(a.contentWindow.document.documentElement,a,b,d,e)})}var h=(void 0===a?[document.documentElement]:a.length?a:[a])[0];return h.setAttribute(w+c,c),f(h.ownerDocument,b,h.ownerDocument.defaultView.innerWidth,h.ownerDocument.defaultView.innerHeight,c).then(function(a){return"function"==typeof b.onrendered&&(r("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"),b.onrendered(a)),a})}function f(a,b,c,d,e){return t(a,a,c,d,b,a.defaultView.pageXOffset,a.defaultView.pageYOffset).then(function(f){r("Document cloned");var h=w+e,i="["+h+"='"+e+"']";a.querySelector(i).removeAttribute(h);var j=f.contentWindow,k=j.document.querySelector(i),l="function"==typeof b.onclone?Promise.resolve(b.onclone(j.document)):Promise.resolve(!0);return l.then(function(){return g(k,f,b,c,d)})})}function g(a,b,c,d,e){var f=b.contentWindow,g=new m(f.document),l=new o(c,g),n=v(a),q="view"===c.type?d:j(f.document),s="view"===c.type?e:k(f.document),t=new c.renderer(q,s,l,c,document),u=new p(a,t,g,l,c);return u.ready.then(function(){r("Finished rendering");var d;return d="view"===c.type?i(t.canvas,{width:t.canvas.width,height:t.canvas.height,top:0,left:0,x:0,y:0}):a===f.document.body||a===f.document.documentElement||null!=c.canvas?t.canvas:i(t.canvas,{width:null!=c.width?c.width:n.width,height:null!=c.height?c.height:n.height,top:n.top,left:n.left,x:0,y:0}),h(b,c),d})}function h(a,b){b.removeContainer&&(a.parentNode.removeChild(a),r("Cleaned up container"))}function i(a,b){var c=document.createElement("canvas"),d=Math.min(a.width-1,Math.max(0,b.left)),e=Math.min(a.width,Math.max(1,b.left+b.width)),f=Math.min(a.height-1,Math.max(0,b.top)),g=Math.min(a.height,Math.max(1,b.top+b.height));c.width=b.width,c.height=b.height;var h=e-d,i=g-f;return r("Cropping canvas at:","left:",b.left,"top:",b.top,"width:",h,"height:",i),r("Resulting crop with width",b.width,"and height",b.height,"with x",d,"and y",f),c.getContext("2d").drawImage(a,d,f,h,i,b.x,b.y,h,i),c}function j(a){return Math.max(Math.max(a.body.scrollWidth,a.documentElement.scrollWidth),Math.max(a.body.offsetWidth,a.documentElement.offsetWidth),Math.max(a.body.clientWidth,a.documentElement.clientWidth))}function k(a){return Math.max(Math.max(a.body.scrollHeight,a.documentElement.scrollHeight),Math.max(a.body.offsetHeight,a.documentElement.offsetHeight),Math.max(a.body.clientHeight,a.documentElement.clientHeight))}function l(a){var b=document.createElement("a");return b.href=a,b.href=b.href,b}var m=b("./support"),n=b("./renderers/canvas"),o=b("./imageloader"),p=b("./nodeparser"),q=b("./nodecontainer"),r=b("./log"),s=b("./utils"),t=b("./clone"),u=b("./proxy").loadUrlDocument,v=s.getBounds,w="data-html2canvas-node",x=0;e.CanvasRenderer=n,e.NodeContainer=q,e.log=r,e.utils=s;var y="undefined"==typeof document||"function"!=typeof Object.create||"function"!=typeof document.createElement("canvas").getContext?function(){return Promise.reject("No canvas support")}:e;c.exports=y,"function"==typeof a&&a.amd&&a("html2canvas",[],function(){return y})},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(a,b,c){function d(a){if(this.src=a,e("DummyImageContainer for",a),!this.promise||!this.image){e("Initiating DummyImageContainer"),d.prototype.image=new Image;var b=this.image;d.prototype.promise=new Promise(function(a,c){b.onload=a,b.onerror=c,b.src=f(),b.complete===!0&&a(b)})}}var e=a("./log"),f=a("./utils").smallImage;b.exports=d},{"./log":13,"./utils":26}],6:[function(a,b,c){function d(a,b){var c,d,f=document.createElement("div"),g=document.createElement("img"),h=document.createElement("span"),i="Hidden Text";f.style.visibility="hidden",f.style.fontFamily=a,f.style.fontSize=b,f.style.margin=0,f.style.padding=0,document.body.appendChild(f),g.src=e(),g.width=1,g.height=1,g.style.margin=0,g.style.padding=0,g.style.verticalAlign="baseline",h.style.fontFamily=a,h.style.fontSize=b,h.style.margin=0,h.style.padding=0,h.appendChild(document.createTextNode(i)),f.appendChild(h),f.appendChild(g),c=g.offsetTop-h.offsetTop+1,f.removeChild(h),f.appendChild(document.createTextNode(i)),f.style.lineHeight="normal",g.style.verticalAlign="super",d=g.offsetTop-f.offsetTop+1,document.body.removeChild(f),this.baseline=c,this.lineWidth=1,this.middle=d}var e=a("./utils").smallImage;b.exports=d},{"./utils":26}],7:[function(a,b,c){function d(){this.data={}}var e=a("./font");d.prototype.getMetrics=function(a,b){return void 0===this.data[a+"-"+b]&&(this.data[a+"-"+b]=new e(a,b)),this.data[a+"-"+b]},b.exports=d},{"./font":6}],8:[function(a,b,c){function d(b,c,d){this.image=null,this.src=b;var e=this,g=f(b);this.promise=(c?new Promise(function(a){"about:blank"===b.contentWindow.document.URL||null==b.contentWindow.document.documentElement?b.contentWindow.onload=b.onload=function(){a(b)}:a(b)}):this.proxyLoad(d.proxy,g,d)).then(function(b){var c=a("./core");return c(b.contentWindow.document.documentElement,{type:"view",width:b.width,height:b.height,proxy:d.proxy,javascriptEnabled:d.javascriptEnabled,removeContainer:d.removeContainer,allowTaint:d.allowTaint,imageTimeout:d.imageTimeout/2})}).then(function(a){return e.image=a})}var e=a("./utils"),f=e.getBounds,g=a("./proxy").loadUrlDocument;d.prototype.proxyLoad=function(a,b,c){var d=this.src;return g(d.src,a,d.ownerDocument,b.width,b.height,c)},b.exports=d},{"./core":4,"./proxy":16,"./utils":26}],9:[function(a,b,c){function d(a){this.src=a.value,this.colorStops=[],this.type=null,this.x0=.5,this.y0=.5,this.x1=.5,this.y1=.5,this.promise=Promise.resolve(!0)}d.TYPES={LINEAR:1,RADIAL:2},d.REGEXP_COLORSTOP=/^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i,b.exports=d},{}],10:[function(a,b,c){function d(a,b){this.src=a,this.image=new Image;var c=this;this.tainted=null,this.promise=new Promise(function(d,e){c.image.onload=d,c.image.onerror=e,b&&(c.image.crossOrigin="anonymous"),c.image.src=a,c.image.complete===!0&&d(c.image)})}b.exports=d},{}],11:[function(a,b,c){function d(a,b){this.link=null,this.options=a,this.support=b,this.origin=this.getOrigin(window.location.href)}var e=a("./log"),f=a("./imagecontainer"),g=a("./dummyimagecontainer"),h=a("./proxyimagecontainer"),i=a("./framecontainer"),j=a("./svgcontainer"),k=a("./svgnodecontainer"),l=a("./lineargradientcontainer"),m=a("./webkitgradientcontainer"),n=a("./utils").bind;d.prototype.findImages=function(a){var b=[];return a.reduce(function(a,b){switch(b.node.nodeName){case"IMG":return a.concat([{args:[b.node.src],method:"url"}]);case"svg":case"IFRAME":return a.concat([{args:[b.node],method:b.node.nodeName}])}return a},[]).forEach(this.addImage(b,this.loadImage),this),b},d.prototype.findBackgroundImage=function(a,b){return b.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(a,this.loadImage),this),a},d.prototype.addImage=function(a,b){return function(c){c.args.forEach(function(d){this.imageExists(a,d)||(a.splice(0,0,b.call(this,c)),e("Added image #"+a.length,"string"==typeof d?d.substring(0,100):d))},this)}},d.prototype.hasImageBackground=function(a){return"none"!==a.method},d.prototype.loadImage=function(a){if("url"===a.method){var b=a.args[0];return!this.isSVG(b)||this.support.svg||this.options.allowTaint?b.match(/data:image\/.*;base64,/i)?new f(b.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),!1):this.isSameOrigin(b)||this.options.allowTaint===!0||this.isSVG(b)?new f(b,!1):this.support.cors&&!this.options.allowTaint&&this.options.useCORS?new f(b,!0):this.options.proxy?new h(b,this.options.proxy):new g(b):new j(b)}return"linear-gradient"===a.method?new l(a):"gradient"===a.method?new m(a):"svg"===a.method?new k(a.args[0],this.support.svg):"IFRAME"===a.method?new i(a.args[0],this.isSameOrigin(a.args[0].src),this.options):new g(a)},d.prototype.isSVG=function(a){return"svg"===a.substring(a.length-3).toLowerCase()||j.prototype.isInline(a)},d.prototype.imageExists=function(a,b){return a.some(function(a){return a.src===b})},d.prototype.isSameOrigin=function(a){return this.getOrigin(a)===this.origin},d.prototype.getOrigin=function(a){var b=this.link||(this.link=document.createElement("a"));return b.href=a,b.href=b.href,b.protocol+b.hostname+b.port},d.prototype.getPromise=function(a){return this.timeout(a,this.options.imageTimeout)["catch"](function(){var b=new g(a.src);return b.promise.then(function(b){a.image=b})})},d.prototype.get=function(a){var b=null;return this.images.some(function(c){return(b=c).src===a})?b:null},d.prototype.fetch=function(a){return this.images=a.reduce(n(this.findBackgroundImage,this),this.findImages(a)),this.images.forEach(function(a,b){a.promise.then(function(){e("Succesfully loaded image #"+(b+1),a)},function(c){e("Failed loading image #"+(b+1),a,c)})}),this.ready=Promise.all(this.images.map(this.getPromise,this)),e("Finished searching images"),this},d.prototype.timeout=function(a,b){var c,d=Promise.race([a.promise,new Promise(function(d,f){c=setTimeout(function(){e("Timed out loading image",a),f(a)},b)})]).then(function(a){return clearTimeout(c),a});return d["catch"](function(){clearTimeout(c)}),d},b.exports=d},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(a,b,c){function d(a){e.apply(this,arguments),this.type=e.TYPES.LINEAR;var b=d.REGEXP_DIRECTION.test(a.args[0])||!e.REGEXP_COLORSTOP.test(a.args[0]);b?a.args[0].split(/\s+/).reverse().forEach(function(a,b){switch(a){case"left":this.x0=0,this.x1=1;break;case"top":this.y0=0,this.y1=1;break;case"right":this.x0=1,this.x1=0;break;case"bottom":this.y0=1,this.y1=0;break;case"to":var c=this.y0,d=this.x0;this.y0=this.y1,this.x0=this.x1,this.x1=d,this.y1=c;break;case"center":break;default:var e=.01*parseFloat(a,10);if(isNaN(e))break;0===b?(this.y0=e,this.y1=1-this.y0):(this.x0=e,this.x1=1-this.x0)}},this):(this.y0=0,this.y1=1),this.colorStops=a.args.slice(b?1:0).map(function(a){var b=a.match(e.REGEXP_COLORSTOP),c=+b[2],d=0===c?"%":b[3];return{color:new f(b[1]),stop:"%"===d?c/100:null}}),null===this.colorStops[0].stop&&(this.colorStops[0].stop=0),null===this.colorStops[this.colorStops.length-1].stop&&(this.colorStops[this.colorStops.length-1].stop=1),this.colorStops.forEach(function(a,b){null===a.stop&&this.colorStops.slice(b).some(function(c,d){return null!==c.stop?(a.stop=(c.stop-this.colorStops[b-1].stop)/(d+1)+this.colorStops[b-1].stop,!0):!1},this)},this)}var e=a("./gradientcontainer"),f=a("./color");d.prototype=Object.create(e.prototype),d.REGEXP_DIRECTION=/^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i,b.exports=d},{"./color":3,"./gradientcontainer":9}],13:[function(a,b,c){var d=function(){d.options.logging&&window.console&&window.console.log&&Function.prototype.bind.call(window.console.log,window.console).apply(window.console,[Date.now()-d.options.start+"ms","html2canvas:"].concat([].slice.call(arguments,0)))};d.options={logging:!1},b.exports=d},{}],14:[function(a,b,c){function d(a,b){this.node=a,this.parent=b,this.stack=null,this.bounds=null,this.borders=null,this.clip=[],this.backgroundClip=[],this.offsetBounds=null,this.visible=null,this.computedStyles=null,this.colors={},this.styles={},this.backgroundImages=null,this.transformData=null,this.transformMatrix=null,this.isPseudoElement=!1,this.opacity=null}function e(a){var b=a.options[a.selectedIndex||0];return b?b.text||"":""}function f(a){if(a&&"matrix"===a[1])return a[2].split(",").map(function(a){return parseFloat(a.trim())});if(a&&"matrix3d"===a[1]){var b=a[2].split(",").map(function(a){return parseFloat(a.trim())});return[b[0],b[1],b[4],b[5],b[12],b[13]]}}function g(a){return-1!==a.toString().indexOf("%")}function h(a){return a.replace("px","")}function i(a){return parseFloat(a)}var j=a("./color"),k=a("./utils"),l=k.getBounds,m=k.parseBackgrounds,n=k.offsetBounds;d.prototype.cloneTo=function(a){a.visible=this.visible,a.borders=this.borders,a.bounds=this.bounds,a.clip=this.clip,a.backgroundClip=this.backgroundClip,a.computedStyles=this.computedStyles,a.styles=this.styles,a.backgroundImages=this.backgroundImages,a.opacity=this.opacity},d.prototype.getOpacity=function(){return null===this.opacity?this.opacity=this.cssFloat("opacity"):this.opacity},d.prototype.assignStack=function(a){this.stack=a,a.children.push(this)},d.prototype.isElementVisible=function(){return this.node.nodeType===Node.TEXT_NODE?this.parent.visible:"none"!==this.css("display")&&"hidden"!==this.css("visibility")&&!this.node.hasAttribute("data-html2canvas-ignore")&&("INPUT"!==this.node.nodeName||"hidden"!==this.node.getAttribute("type"))},d.prototype.css=function(a){return this.computedStyles||(this.computedStyles=this.isPseudoElement?this.parent.computedStyle(this.before?":before":":after"):this.computedStyle(null)),this.styles[a]||(this.styles[a]=this.computedStyles[a])},d.prototype.prefixedCss=function(a){var b=["webkit","moz","ms","o"],c=this.css(a);return void 0===c&&b.some(function(b){return c=this.css(b+a.substr(0,1).toUpperCase()+a.substr(1)),void 0!==c},this),void 0===c?null:c},d.prototype.computedStyle=function(a){return this.node.ownerDocument.defaultView.getComputedStyle(this.node,a)},d.prototype.cssInt=function(a){var b=parseInt(this.css(a),10);return isNaN(b)?0:b},d.prototype.color=function(a){return this.colors[a]||(this.colors[a]=new j(this.css(a)))},d.prototype.cssFloat=function(a){var b=parseFloat(this.css(a));return isNaN(b)?0:b},d.prototype.fontWeight=function(){var a=this.css("fontWeight");switch(parseInt(a,10)){case 401:a="bold";break;case 400:a="normal"}return a},d.prototype.parseClip=function(){var a=this.css("clip").match(this.CLIP);return a?{top:parseInt(a[1],10),right:parseInt(a[2],10),bottom:parseInt(a[3],10),left:parseInt(a[4],10)}:null},d.prototype.parseBackgroundImages=function(){return this.backgroundImages||(this.backgroundImages=m(this.css("backgroundImage")))},d.prototype.cssList=function(a,b){var c=(this.css(a)||"").split(",");return c=c[b||0]||c[0]||"auto",c=c.trim().split(" "),1===c.length&&(c=[c[0],g(c[0])?"auto":c[0]]),c},d.prototype.parseBackgroundSize=function(a,b,c){var d,e,f=this.cssList("backgroundSize",c);if(g(f[0]))d=a.width*parseFloat(f[0])/100;else{if(/contain|cover/.test(f[0])){var h=a.width/a.height,i=b.width/b.height;return i>h^"contain"===f[0]?{width:a.height*i,height:a.height}:{width:a.width,height:a.width/i}}d=parseInt(f[0],10)}return e="auto"===f[0]&&"auto"===f[1]?b.height:"auto"===f[1]?d/b.width*b.height:g(f[1])?a.height*parseFloat(f[1])/100:parseInt(f[1],10),"auto"===f[0]&&(d=e/b.height*b.width),{width:d,height:e}},d.prototype.parseBackgroundPosition=function(a,b,c,d){var e,f,h=this.cssList("backgroundPosition",c);return e=g(h[0])?(a.width-(d||b).width)*(parseFloat(h[0])/100):parseInt(h[0],10),f="auto"===h[1]?e/b.width*b.height:g(h[1])?(a.height-(d||b).height)*parseFloat(h[1])/100:parseInt(h[1],10),"auto"===h[0]&&(e=f/b.height*b.width),{left:e,top:f}},d.prototype.parseBackgroundRepeat=function(a){return this.cssList("backgroundRepeat",a)[0]},d.prototype.parseTextShadows=function(){var a=this.css("textShadow"),b=[];if(a&&"none"!==a)for(var c=a.match(this.TEXT_SHADOW_PROPERTY),d=0;c&&d<c.length;d++){var e=c[d].match(this.TEXT_SHADOW_VALUES);b.push({color:new j(e[0]),offsetX:e[1]?parseFloat(e[1].replace("px","")):0,offsetY:e[2]?parseFloat(e[2].replace("px","")):0,blur:e[3]?e[3].replace("px",""):0})}return b},d.prototype.parseTransform=function(){if(!this.transformData)if(this.hasTransform()){var a=this.parseBounds(),b=this.prefixedCss("transformOrigin").split(" ").map(h).map(i);b[0]+=a.left,b[1]+=a.top,this.transformData={origin:b,matrix:this.parseTransformMatrix()}}else this.transformData={origin:[0,0],matrix:[1,0,0,1,0,0]};return this.transformData},d.prototype.parseTransformMatrix=function(){if(!this.transformMatrix){var a=this.prefixedCss("transform"),b=a?f(a.match(this.MATRIX_PROPERTY)):null;this.transformMatrix=b?b:[1,0,0,1,0,0]}return this.transformMatrix},d.prototype.parseBounds=function(){return this.bounds||(this.bounds=this.hasTransform()?n(this.node):l(this.node))},d.prototype.hasTransform=function(){return"1,0,0,1,0,0"!==this.parseTransformMatrix().join(",")||this.parent&&this.parent.hasTransform()},d.prototype.getValue=function(){var a=this.node.value||"";return"SELECT"===this.node.tagName?a=e(this.node):"password"===this.node.type&&(a=Array(a.length+1).join("•")),0===a.length?this.node.placeholder||"":a},d.prototype.MATRIX_PROPERTY=/(matrix|matrix3d)\((.+)\)/,d.prototype.TEXT_SHADOW_PROPERTY=/((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,d.prototype.TEXT_SHADOW_VALUES=/(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g,d.prototype.CLIP=/^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/,b.exports=d},{"./color":3,"./utils":26}],15:[function(a,b,c){function d(a,b,c,d,e){O("Starting NodeParser"),this.renderer=b,this.options=e,this.range=null,this.support=c,this.renderQueue=[],this.stack=new V(!0,1,a.ownerDocument,null);var f=new Q(a,null);if(e.background&&b.rectangle(0,0,b.width,b.height,new U(e.background)),a===a.ownerDocument.documentElement){var g=new Q(f.color("backgroundColor").isTransparent()?a.ownerDocument.body:a.ownerDocument.documentElement,null);b.rectangle(0,0,b.width,b.height,g.color("backgroundColor"))}f.visibile=f.isElementVisible(),this.createPseudoHideStyles(a.ownerDocument),this.disableAnimations(a.ownerDocument),this.nodes=J([f].concat(this.getChildren(f)).filter(function(a){return a.visible=a.isElementVisible()}).map(this.getPseudoElements,this)),this.fontMetrics=new T,O("Fetched nodes, total:",this.nodes.length),O("Calculate overflow clips"),this.calculateOverflowClips(),O("Start fetching images"),this.images=d.fetch(this.nodes.filter(B)),this.ready=this.images.ready.then(X(function(){return O("Images loaded, starting parsing"),O("Creating stacking contexts"),this.createStackingContexts(),O("Sorting stacking contexts"),this.sortStackingContexts(this.stack),this.parse(this.stack),O("Render queue created with "+this.renderQueue.length+" items"),new Promise(X(function(a){e.async?"function"==typeof e.async?e.async.call(this,this.renderQueue,a):this.renderQueue.length>0?(this.renderIndex=0,this.asyncRenderer(this.renderQueue,a)):a():(this.renderQueue.forEach(this.paint,this),a())},this))},this))}function e(a){return a.parent&&a.parent.clip.length}function f(a){return a.replace(/(\-[a-z])/g,function(a){return a.toUpperCase().replace("-","")})}function g(){}function h(a,b,c,d){return a.map(function(e,f){if(e.width>0){var g=b.left,h=b.top,i=b.width,j=b.height-a[2].width;switch(f){case 0:j=a[0].width,e.args=l({c1:[g,h],c2:[g+i,h],c3:[g+i-a[1].width,h+j],c4:[g+a[3].width,h+j]},d[0],d[1],c.topLeftOuter,c.topLeftInner,c.topRightOuter,c.topRightInner);break;case 1:g=b.left+b.width-a[1].width,i=a[1].width,e.args=l({c1:[g+i,h],c2:[g+i,h+j+a[2].width],c3:[g,h+j],c4:[g,h+a[0].width]},d[1],d[2],c.topRightOuter,c.topRightInner,c.bottomRightOuter,c.bottomRightInner);break;case 2:h=h+b.height-a[2].width,j=a[2].width,e.args=l({c1:[g+i,h+j],c2:[g,h+j],c3:[g+a[3].width,h],c4:[g+i-a[3].width,h]},d[2],d[3],c.bottomRightOuter,c.bottomRightInner,c.bottomLeftOuter,c.bottomLeftInner);break;case 3:i=a[3].width,e.args=l({c1:[g,h+j+a[2].width],c2:[g,h],c3:[g+i,h+a[0].width],c4:[g+i,h+j]},d[3],d[0],c.bottomLeftOuter,c.bottomLeftInner,c.topLeftOuter,c.topLeftInner)}}return e})}function i(a,b,c,d){var e=4*((Math.sqrt(2)-1)/3),f=c*e,g=d*e,h=a+c,i=b+d;return{topLeft:k({x:a,y:i},{x:a,y:i-g},{x:h-f,y:b},{x:h,y:b}),topRight:k({x:a,y:b},{x:a+f,y:b},{x:h,y:i-g},{x:h,y:i}),bottomRight:k({x:h,y:b},{x:h,y:b+g},{x:a+f,y:i},{x:a,y:i}),bottomLeft:k({x:h,y:i},{x:h-f,y:i},{x:a,y:b+g},{x:a,y:b})}}function j(a,b,c){var d=a.left,e=a.top,f=a.width,g=a.height,h=b[0][0]<f/2?b[0][0]:f/2,j=b[0][1]<g/2?b[0][1]:g/2,k=b[1][0]<f/2?b[1][0]:f/2,l=b[1][1]<g/2?b[1][1]:g/2,m=b[2][0]<f/2?b[2][0]:f/2,n=b[2][1]<g/2?b[2][1]:g/2,o=b[3][0]<f/2?b[3][0]:f/2,p=b[3][1]<g/2?b[3][1]:g/2,q=f-k,r=g-n,s=f-m,t=g-p;return{topLeftOuter:i(d,e,h,j).topLeft.subdivide(.5),topLeftInner:i(d+c[3].width,e+c[0].width,Math.max(0,h-c[3].width),Math.max(0,j-c[0].width)).topLeft.subdivide(.5),topRightOuter:i(d+q,e,k,l).topRight.subdivide(.5),topRightInner:i(d+Math.min(q,f+c[3].width),e+c[0].width,q>f+c[3].width?0:k-c[3].width,l-c[0].width).topRight.subdivide(.5),bottomRightOuter:i(d+s,e+r,m,n).bottomRight.subdivide(.5),bottomRightInner:i(d+Math.min(s,f-c[3].width),e+Math.min(r,g+c[0].width),Math.max(0,m-c[1].width),n-c[2].width).bottomRight.subdivide(.5),
  bottomLeftOuter:i(d,e+t,o,p).bottomLeft.subdivide(.5),bottomLeftInner:i(d+c[3].width,e+t,Math.max(0,o-c[3].width),p-c[2].width).bottomLeft.subdivide(.5)}}function k(a,b,c,d){var e=function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}};return{start:a,startControl:b,endControl:c,end:d,subdivide:function(f){var g=e(a,b,f),h=e(b,c,f),i=e(c,d,f),j=e(g,h,f),l=e(h,i,f),m=e(j,l,f);return[k(a,g,j,m),k(m,l,i,d)]},curveTo:function(a){a.push(["bezierCurve",b.x,b.y,c.x,c.y,d.x,d.y])},curveToReversed:function(d){d.push(["bezierCurve",c.x,c.y,b.x,b.y,a.x,a.y])}}}function l(a,b,c,d,e,f,g){var h=[];return b[0]>0||b[1]>0?(h.push(["line",d[1].start.x,d[1].start.y]),d[1].curveTo(h)):h.push(["line",a.c1[0],a.c1[1]]),c[0]>0||c[1]>0?(h.push(["line",f[0].start.x,f[0].start.y]),f[0].curveTo(h),h.push(["line",g[0].end.x,g[0].end.y]),g[0].curveToReversed(h)):(h.push(["line",a.c2[0],a.c2[1]]),h.push(["line",a.c3[0],a.c3[1]])),b[0]>0||b[1]>0?(h.push(["line",e[1].end.x,e[1].end.y]),e[1].curveToReversed(h)):h.push(["line",a.c4[0],a.c4[1]]),h}function m(a,b,c,d,e,f,g){b[0]>0||b[1]>0?(a.push(["line",d[0].start.x,d[0].start.y]),d[0].curveTo(a),d[1].curveTo(a)):a.push(["line",f,g]),(c[0]>0||c[1]>0)&&a.push(["line",e[0].start.x,e[0].start.y])}function n(a){return a.cssInt("zIndex")<0}function o(a){return a.cssInt("zIndex")>0}function p(a){return 0===a.cssInt("zIndex")}function q(a){return-1!==["inline","inline-block","inline-table"].indexOf(a.css("display"))}function r(a){return a instanceof V}function s(a){return a.node.data.trim().length>0}function t(a){return/^(normal|none|0px)$/.test(a.parent.css("letterSpacing"))}function u(a){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(b){var c=a.css("border"+b+"Radius"),d=c.split(" ");return d.length<=1&&(d[1]=d[0]),d.map(G)})}function v(a){return a.nodeType===Node.TEXT_NODE||a.nodeType===Node.ELEMENT_NODE}function w(a){var b=a.css("position"),c=-1!==["absolute","relative","fixed"].indexOf(b)?a.css("zIndex"):"auto";return"auto"!==c}function x(a){return"static"!==a.css("position")}function y(a){return"none"!==a.css("float")}function z(a){return-1!==["inline-block","inline-table"].indexOf(a.css("display"))}function A(a){var b=this;return function(){return!a.apply(b,arguments)}}function B(a){return a.node.nodeType===Node.ELEMENT_NODE}function C(a){return a.isPseudoElement===!0}function D(a){return a.node.nodeType===Node.TEXT_NODE}function E(a){return function(b,c){return b.cssInt("zIndex")+a.indexOf(b)/a.length-(c.cssInt("zIndex")+a.indexOf(c)/a.length)}}function F(a){return a.getOpacity()<1}function G(a){return parseInt(a,10)}function H(a){return a.width}function I(a){return a.node.nodeType!==Node.ELEMENT_NODE||-1===["SCRIPT","HEAD","TITLE","OBJECT","BR","OPTION"].indexOf(a.node.nodeName)}function J(a){return[].concat.apply([],a)}function K(a){var b=a.substr(0,1);return b===a.substr(a.length-1)&&b.match(/'|"/)?a.substr(1,a.length-2):a}function L(a){for(var b,c=[],d=0,e=!1;a.length;)M(a[d])===e?(b=a.splice(0,d),b.length&&c.push(P.ucs2.encode(b)),e=!e,d=0):d++,d>=a.length&&(b=a.splice(0,d),b.length&&c.push(P.ucs2.encode(b)));return c}function M(a){return-1!==[32,13,10,9,45].indexOf(a)}function N(a){return/[^\u0000-\u00ff]/.test(a)}var O=a("./log"),P=a("punycode"),Q=a("./nodecontainer"),R=a("./textcontainer"),S=a("./pseudoelementcontainer"),T=a("./fontmetrics"),U=a("./color"),V=a("./stackingcontext"),W=a("./utils"),X=W.bind,Y=W.getBounds,Z=W.parseBackgrounds,$=W.offsetBounds;d.prototype.calculateOverflowClips=function(){this.nodes.forEach(function(a){if(B(a)){C(a)&&a.appendToDOM(),a.borders=this.parseBorders(a);var b="hidden"===a.css("overflow")?[a.borders.clip]:[],c=a.parseClip();c&&-1!==["absolute","fixed"].indexOf(a.css("position"))&&b.push([["rect",a.bounds.left+c.left,a.bounds.top+c.top,c.right-c.left,c.bottom-c.top]]),a.clip=e(a)?a.parent.clip.concat(b):b,a.backgroundClip="hidden"!==a.css("overflow")?a.clip.concat([a.borders.clip]):a.clip,C(a)&&a.cleanDOM()}else D(a)&&(a.clip=e(a)?a.parent.clip:[]);C(a)||(a.bounds=null)},this)},d.prototype.asyncRenderer=function(a,b,c){c=c||Date.now(),this.paint(a[this.renderIndex++]),a.length===this.renderIndex?b():c+20>Date.now()?this.asyncRenderer(a,b,c):setTimeout(X(function(){this.asyncRenderer(a,b)},this),0)},d.prototype.createPseudoHideStyles=function(a){this.createStyles(a,"."+S.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+':before { content: "" !important; display: none !important; }.'+S.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER+':after { content: "" !important; display: none !important; }')},d.prototype.disableAnimations=function(a){this.createStyles(a,"* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")},d.prototype.createStyles=function(a,b){var c=a.createElement("style");c.innerHTML=b,a.body.appendChild(c)},d.prototype.getPseudoElements=function(a){var b=[[a]];if(a.node.nodeType===Node.ELEMENT_NODE){var c=this.getPseudoElement(a,":before"),d=this.getPseudoElement(a,":after");c&&b.push(c),d&&b.push(d)}return J(b)},d.prototype.getPseudoElement=function(a,b){var c=a.computedStyle(b);if(!c||!c.content||"none"===c.content||"-moz-alt-content"===c.content||"none"===c.display)return null;for(var d=K(c.content),e="url"===d.substr(0,3),g=document.createElement(e?"img":"html2canvaspseudoelement"),h=new S(g,a,b),i=c.length-1;i>=0;i--){var j=f(c.item(i));g.style[j]=c[j]}if(g.className=S.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+" "+S.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER,e)return g.src=Z(d)[0].args[0],[h];var k=document.createTextNode(d);return g.appendChild(k),[h,new R(k,h)]},d.prototype.getChildren=function(a){return J([].filter.call(a.node.childNodes,v).map(function(b){var c=[b.nodeType===Node.TEXT_NODE?new R(b,a):new Q(b,a)].filter(I);return b.nodeType===Node.ELEMENT_NODE&&c.length&&"TEXTAREA"!==b.tagName?c[0].isElementVisible()?c.concat(this.getChildren(c[0])):[]:c},this))},d.prototype.newStackingContext=function(a,b){var c=new V(b,a.getOpacity(),a.node,a.parent);a.cloneTo(c);var d=b?c.getParentStack(this):c.parent.stack;d.contexts.push(c),a.stack=c},d.prototype.createStackingContexts=function(){this.nodes.forEach(function(a){B(a)&&(this.isRootElement(a)||F(a)||w(a)||this.isBodyWithTransparentRoot(a)||a.hasTransform())?this.newStackingContext(a,!0):B(a)&&(x(a)&&p(a)||z(a)||y(a))?this.newStackingContext(a,!1):a.assignStack(a.parent.stack)},this)},d.prototype.isBodyWithTransparentRoot=function(a){return"BODY"===a.node.nodeName&&a.parent.color("backgroundColor").isTransparent()},d.prototype.isRootElement=function(a){return null===a.parent},d.prototype.sortStackingContexts=function(a){a.contexts.sort(E(a.contexts.slice(0))),a.contexts.forEach(this.sortStackingContexts,this)},d.prototype.parseTextBounds=function(a){return function(b,c,d){if("none"!==a.parent.css("textDecoration").substr(0,4)||0!==b.trim().length){if(this.support.rangeBounds&&!a.parent.hasTransform()){var e=d.slice(0,c).join("").length;return this.getRangeBounds(a.node,e,b.length)}if(a.node&&"string"==typeof a.node.data){var f=a.node.splitText(b.length),g=this.getWrapperBounds(a.node,a.parent.hasTransform());return a.node=f,g}}else(!this.support.rangeBounds||a.parent.hasTransform())&&(a.node=a.node.splitText(b.length));return{}}},d.prototype.getWrapperBounds=function(a,b){var c=a.ownerDocument.createElement("html2canvaswrapper"),d=a.parentNode,e=a.cloneNode(!0);c.appendChild(a.cloneNode(!0)),d.replaceChild(c,a);var f=b?$(c):Y(c);return d.replaceChild(e,c),f},d.prototype.getRangeBounds=function(a,b,c){var d=this.range||(this.range=a.ownerDocument.createRange());return d.setStart(a,b),d.setEnd(a,b+c),d.getBoundingClientRect()},d.prototype.parse=function(a){var b=a.contexts.filter(n),c=a.children.filter(B),d=c.filter(A(y)),e=d.filter(A(x)).filter(A(q)),f=c.filter(A(x)).filter(y),h=d.filter(A(x)).filter(q),i=a.contexts.concat(d.filter(x)).filter(p),j=a.children.filter(D).filter(s),k=a.contexts.filter(o);b.concat(e).concat(f).concat(h).concat(i).concat(j).concat(k).forEach(function(a){this.renderQueue.push(a),r(a)&&(this.parse(a),this.renderQueue.push(new g))},this)},d.prototype.paint=function(a){try{a instanceof g?this.renderer.ctx.restore():D(a)?(C(a.parent)&&a.parent.appendToDOM(),this.paintText(a),C(a.parent)&&a.parent.cleanDOM()):this.paintNode(a)}catch(b){if(O(b),this.options.strict)throw b}},d.prototype.paintNode=function(a){r(a)&&(this.renderer.setOpacity(a.opacity),this.renderer.ctx.save(),a.hasTransform()&&this.renderer.setTransform(a.parseTransform())),"INPUT"===a.node.nodeName&&"checkbox"===a.node.type?this.paintCheckbox(a):"INPUT"===a.node.nodeName&&"radio"===a.node.type?this.paintRadio(a):this.paintElement(a)},d.prototype.paintElement=function(a){var b=a.parseBounds();this.renderer.clip(a.backgroundClip,function(){this.renderer.renderBackground(a,b,a.borders.borders.map(H))},this),this.renderer.clip(a.clip,function(){this.renderer.renderBorders(a.borders.borders)},this),this.renderer.clip(a.backgroundClip,function(){switch(a.node.nodeName){case"svg":case"IFRAME":var c=this.images.get(a.node);c?this.renderer.renderImage(a,b,a.borders,c):O("Error loading <"+a.node.nodeName+">",a.node);break;case"IMG":var d=this.images.get(a.node.src);d?this.renderer.renderImage(a,b,a.borders,d):O("Error loading <img>",a.node.src);break;case"CANVAS":this.renderer.renderImage(a,b,a.borders,{image:a.node});break;case"SELECT":case"INPUT":case"TEXTAREA":this.paintFormValue(a)}},this)},d.prototype.paintCheckbox=function(a){var b=a.parseBounds(),c=Math.min(b.width,b.height),d={width:c-1,height:c-1,top:b.top,left:b.left},e=[3,3],f=[e,e,e,e],g=[1,1,1,1].map(function(a){return{color:new U("#A5A5A5"),width:a}}),i=j(d,f,g);this.renderer.clip(a.backgroundClip,function(){this.renderer.rectangle(d.left+1,d.top+1,d.width-2,d.height-2,new U("#DEDEDE")),this.renderer.renderBorders(h(g,d,i,f)),a.node.checked&&(this.renderer.font(new U("#424242"),"normal","normal","bold",c-3+"px","arial"),this.renderer.text("✔",d.left+c/6,d.top+c-1))},this)},d.prototype.paintRadio=function(a){var b=a.parseBounds(),c=Math.min(b.width,b.height)-2;this.renderer.clip(a.backgroundClip,function(){this.renderer.circleStroke(b.left+1,b.top+1,c,new U("#DEDEDE"),1,new U("#A5A5A5")),a.node.checked&&this.renderer.circle(Math.ceil(b.left+c/4)+1,Math.ceil(b.top+c/4)+1,Math.floor(c/2),new U("#424242"))},this)},d.prototype.paintFormValue=function(a){var b=a.getValue();if(b.length>0){var c=a.node.ownerDocument,d=c.createElement("html2canvaswrapper"),e=["lineHeight","textAlign","fontFamily","fontWeight","fontSize","color","paddingLeft","paddingTop","paddingRight","paddingBottom","width","height","borderLeftStyle","borderTopStyle","borderLeftWidth","borderTopWidth","boxSizing","whiteSpace","wordWrap"];e.forEach(function(b){try{d.style[b]=a.css(b)}catch(c){O("html2canvas: Parse: Exception caught in renderFormValue: "+c.message)}});var f=a.parseBounds();d.style.position="fixed",d.style.left=f.left+"px",d.style.top=f.top+"px",d.textContent=b,c.body.appendChild(d),this.paintText(new R(d.firstChild,a)),c.body.removeChild(d)}},d.prototype.paintText=function(a){a.applyTextTransform();var b=P.ucs2.decode(a.node.data),c=this.options.letterRendering&&!t(a)||N(a.node.data)?b.map(function(a){return P.ucs2.encode([a])}):L(b),d=a.parent.fontWeight(),e=a.parent.css("fontSize"),f=a.parent.css("fontFamily"),g=a.parent.parseTextShadows();this.renderer.font(a.parent.color("color"),a.parent.css("fontStyle"),a.parent.css("fontVariant"),d,e,f),g.length?this.renderer.fontShadow(g[0].color,g[0].offsetX,g[0].offsetY,g[0].blur):this.renderer.clearShadow(),this.renderer.clip(a.parent.clip,function(){c.map(this.parseTextBounds(a),this).forEach(function(b,d){b&&(this.renderer.text(c[d],b.left,b.bottom),this.renderTextDecoration(a.parent,b,this.fontMetrics.getMetrics(f,e)))},this)},this)},d.prototype.renderTextDecoration=function(a,b,c){switch(a.css("textDecoration").split(" ")[0]){case"underline":this.renderer.rectangle(b.left,Math.round(b.top+c.baseline+c.lineWidth),b.width,1,a.color("color"));break;case"overline":this.renderer.rectangle(b.left,Math.round(b.top),b.width,1,a.color("color"));break;case"line-through":this.renderer.rectangle(b.left,Math.ceil(b.top+c.middle+c.lineWidth),b.width,1,a.color("color"))}};var _={inset:[["darken",.6],["darken",.1],["darken",.1],["darken",.6]]};d.prototype.parseBorders=function(a){var b=a.parseBounds(),c=u(a),d=["Top","Right","Bottom","Left"].map(function(b,c){var d=a.css("border"+b+"Style"),e=a.color("border"+b+"Color");"inset"===d&&e.isBlack()&&(e=new U([255,255,255,e.a]));var f=_[d]?_[d][c]:null;return{width:a.cssInt("border"+b+"Width"),color:f?e[f[0]](f[1]):e,args:null}}),e=j(b,c,d);return{clip:this.parseBackgroundClip(a,e,d,c,b),borders:h(d,b,e,c)}},d.prototype.parseBackgroundClip=function(a,b,c,d,e){var f=a.css("backgroundClip"),g=[];switch(f){case"content-box":case"padding-box":m(g,d[0],d[1],b.topLeftInner,b.topRightInner,e.left+c[3].width,e.top+c[0].width),m(g,d[1],d[2],b.topRightInner,b.bottomRightInner,e.left+e.width-c[1].width,e.top+c[0].width),m(g,d[2],d[3],b.bottomRightInner,b.bottomLeftInner,e.left+e.width-c[1].width,e.top+e.height-c[2].width),m(g,d[3],d[0],b.bottomLeftInner,b.topLeftInner,e.left+c[3].width,e.top+e.height-c[2].width);break;default:m(g,d[0],d[1],b.topLeftOuter,b.topRightOuter,e.left,e.top),m(g,d[1],d[2],b.topRightOuter,b.bottomRightOuter,e.left+e.width,e.top),m(g,d[2],d[3],b.bottomRightOuter,b.bottomLeftOuter,e.left+e.width,e.top+e.height),m(g,d[3],d[0],b.bottomLeftOuter,b.topLeftOuter,e.left,e.top+e.height)}return g},b.exports=d},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,punycode:1}],16:[function(a,b,c){function d(a,b,c){var d="withCredentials"in new XMLHttpRequest;if(!b)return Promise.reject("No proxy configured");var e=g(d),i=h(b,a,e);return d?k(i):f(c,i,e).then(function(a){return o(a.content)})}function e(a,b,c){var d="crossOrigin"in new Image,e=g(d),i=h(b,a,e);return d?Promise.resolve(i):f(c,i,e).then(function(a){return"data:"+a.type+";base64,"+a.content})}function f(a,b,c){return new Promise(function(d,e){var f=a.createElement("script"),g=function(){delete window.html2canvas.proxy[c],a.body.removeChild(f)};window.html2canvas.proxy[c]=function(a){g(),d(a)},f.src=b,f.onerror=function(a){g(),e(a)},a.body.appendChild(f)})}function g(a){return a?"":"html2canvas_"+Date.now()+"_"+ ++p+"_"+Math.round(1e5*Math.random())}function h(a,b,c){return a+"?url="+encodeURIComponent(b)+(c.length?"&callback=html2canvas.proxy."+c:"")}function i(a){return function(b){var c,d=new DOMParser;try{c=d.parseFromString(b,"text/html")}catch(e){m("DOMParser not supported, falling back to createHTMLDocument"),c=document.implementation.createHTMLDocument("");try{c.open(),c.write(b),c.close()}catch(f){m("createHTMLDocument write not supported, falling back to document.body.innerHTML"),c.body.innerHTML=b}}var g=c.querySelector("base");if(!g||!g.href.host){var h=c.createElement("base");h.href=a,c.head.insertBefore(h,c.head.firstChild)}return c}}function j(a,b,c,e,f,g){return new d(a,b,window.document).then(i(a)).then(function(a){return n(a,c,e,f,g,0,0)})}var k=a("./xhr"),l=a("./utils"),m=a("./log"),n=a("./clone"),o=l.decode64,p=0;c.Proxy=d,c.ProxyURL=e,c.loadUrlDocument=j},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(a,b,c){function d(a,b){var c=document.createElement("a");c.href=a,a=c.href,this.src=a,this.image=new Image;var d=this;this.promise=new Promise(function(c,f){d.image.crossOrigin="Anonymous",d.image.onload=c,d.image.onerror=f,new e(a,b,document).then(function(a){d.image.src=a})["catch"](f)})}var e=a("./proxy").ProxyURL;b.exports=d},{"./proxy":16}],18:[function(a,b,c){function d(a,b,c){e.call(this,a,b),this.isPseudoElement=!0,this.before=":before"===c}var e=a("./nodecontainer");d.prototype.cloneTo=function(a){d.prototype.cloneTo.call(this,a),a.isPseudoElement=!0,a.before=this.before},d.prototype=Object.create(e.prototype),d.prototype.appendToDOM=function(){this.before?this.parent.node.insertBefore(this.node,this.parent.node.firstChild):this.parent.node.appendChild(this.node),this.parent.node.className+=" "+this.getHideClass()},d.prototype.cleanDOM=function(){this.node.parentNode.removeChild(this.node),this.parent.node.className=this.parent.node.className.replace(this.getHideClass(),"")},d.prototype.getHideClass=function(){return this["PSEUDO_HIDE_ELEMENT_CLASS_"+(this.before?"BEFORE":"AFTER")]},d.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE="___html2canvas___pseudoelement_before",d.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER="___html2canvas___pseudoelement_after",b.exports=d},{"./nodecontainer":14}],19:[function(a,b,c){function d(a,b,c,d,e){this.width=a,this.height=b,this.images=c,this.options=d,this.document=e}var e=a("./log");d.prototype.renderImage=function(a,b,c,d){var e=a.cssInt("paddingLeft"),f=a.cssInt("paddingTop"),g=a.cssInt("paddingRight"),h=a.cssInt("paddingBottom"),i=c.borders,j=b.width-(i[1].width+i[3].width+e+g),k=b.height-(i[0].width+i[2].width+f+h);this.drawImage(d,0,0,d.image.width||j,d.image.height||k,b.left+e+i[3].width,b.top+f+i[0].width,j,k)},d.prototype.renderBackground=function(a,b,c){b.height>0&&b.width>0&&(this.renderBackgroundColor(a,b),this.renderBackgroundImage(a,b,c))},d.prototype.renderBackgroundColor=function(a,b){var c=a.color("backgroundColor");c.isTransparent()||this.rectangle(b.left,b.top,b.width,b.height,c)},d.prototype.renderBorders=function(a){a.forEach(this.renderBorder,this)},d.prototype.renderBorder=function(a){a.color.isTransparent()||null===a.args||this.drawShape(a.args,a.color)},d.prototype.renderBackgroundImage=function(a,b,c){var d=a.parseBackgroundImages();d.reverse().forEach(function(d,f,g){switch(d.method){case"url":var h=this.images.get(d.args[0]);h?this.renderBackgroundRepeating(a,b,h,g.length-(f+1),c):e("Error loading background-image",d.args[0]);break;case"linear-gradient":case"gradient":var i=this.images.get(d.value);i?this.renderBackgroundGradient(i,b,c):e("Error loading background-image",d.args[0]);break;case"none":break;default:e("Unknown background-image type",d.args[0])}},this)},d.prototype.renderBackgroundRepeating=function(a,b,c,d,e){var f=a.parseBackgroundSize(b,c.image,d),g=a.parseBackgroundPosition(b,c.image,d,f),h=a.parseBackgroundRepeat(d);switch(h){case"repeat-x":case"repeat no-repeat":this.backgroundRepeatShape(c,g,f,b,b.left+e[3],b.top+g.top+e[0],99999,f.height,e);break;case"repeat-y":case"no-repeat repeat":this.backgroundRepeatShape(c,g,f,b,b.left+g.left+e[3],b.top+e[0],f.width,99999,e);break;case"no-repeat":this.backgroundRepeatShape(c,g,f,b,b.left+g.left+e[3],b.top+g.top+e[0],f.width,f.height,e);break;default:this.renderBackgroundRepeat(c,g,f,{top:b.top,left:b.left},e[3],e[0])}},b.exports=d},{"./log":13}],20:[function(a,b,c){function d(a,b){f.apply(this,arguments),this.canvas=this.options.canvas||this.document.createElement("canvas"),this.options.canvas||(this.canvas.width=a,this.canvas.height=b),this.ctx=this.canvas.getContext("2d"),this.taintCtx=this.document.createElement("canvas").getContext("2d"),this.ctx.textBaseline="bottom",this.variables={},h("Initialized CanvasRenderer with size",a,"x",b)}function e(a){return a.length>0}var f=a("../renderer"),g=a("../lineargradientcontainer"),h=a("../log");d.prototype=Object.create(f.prototype),d.prototype.setFillStyle=function(a){return this.ctx.fillStyle="object"==typeof a&&a.isColor?a.toString():a,this.ctx},d.prototype.rectangle=function(a,b,c,d,e){this.setFillStyle(e).fillRect(a,b,c,d)},d.prototype.circle=function(a,b,c,d){this.setFillStyle(d),this.ctx.beginPath(),this.ctx.arc(a+c/2,b+c/2,c/2,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill()},d.prototype.circleStroke=function(a,b,c,d,e,f){this.circle(a,b,c,d),this.ctx.strokeStyle=f.toString(),this.ctx.stroke()},d.prototype.drawShape=function(a,b){this.shape(a),this.setFillStyle(b).fill()},d.prototype.taints=function(a){if(null===a.tainted){this.taintCtx.drawImage(a.image,0,0);try{this.taintCtx.getImageData(0,0,1,1),a.tainted=!1}catch(b){this.taintCtx=document.createElement("canvas").getContext("2d"),a.tainted=!0}}return a.tainted},d.prototype.drawImage=function(a,b,c,d,e,f,g,h,i){(!this.taints(a)||this.options.allowTaint)&&this.ctx.drawImage(a.image,b,c,d,e,f,g,h,i)},d.prototype.clip=function(a,b,c){this.ctx.save(),a.filter(e).forEach(function(a){this.shape(a).clip()},this),b.call(c),this.ctx.restore()},d.prototype.shape=function(a){return this.ctx.beginPath(),a.forEach(function(a,b){"rect"===a[0]?this.ctx.rect.apply(this.ctx,a.slice(1)):this.ctx[0===b?"moveTo":a[0]+"To"].apply(this.ctx,a.slice(1))},this),this.ctx.closePath(),this.ctx},d.prototype.font=function(a,b,c,d,e,f){this.setFillStyle(a).font=[b,c,d,e,f].join(" ").split(",")[0]},d.prototype.fontShadow=function(a,b,c,d){this.setVariable("shadowColor",a.toString()).setVariable("shadowOffsetY",b).setVariable("shadowOffsetX",c).setVariable("shadowBlur",d)},d.prototype.clearShadow=function(){this.setVariable("shadowColor","rgba(0,0,0,0)")},d.prototype.setOpacity=function(a){this.ctx.globalAlpha=a},d.prototype.setTransform=function(a){this.ctx.translate(a.origin[0],a.origin[1]),this.ctx.transform.apply(this.ctx,a.matrix),this.ctx.translate(-a.origin[0],-a.origin[1])},d.prototype.setVariable=function(a,b){return this.variables[a]!==b&&(this.variables[a]=this.ctx[a]=b),this},d.prototype.text=function(a,b,c){this.ctx.fillText(a,b,c)},d.prototype.backgroundRepeatShape=function(a,b,c,d,e,f,g,h,i){var j=[["line",Math.round(e),Math.round(f)],["line",Math.round(e+g),Math.round(f)],["line",Math.round(e+g),Math.round(h+f)],["line",Math.round(e),Math.round(h+f)]];this.clip([j],function(){this.renderBackgroundRepeat(a,b,c,d,i[3],i[0])},this)},d.prototype.renderBackgroundRepeat=function(a,b,c,d,e,f){var g=Math.round(d.left+b.left+e),h=Math.round(d.top+b.top+f);this.setFillStyle(this.ctx.createPattern(this.resizeImage(a,c),"repeat")),this.ctx.translate(g,h),this.ctx.fill(),this.ctx.translate(-g,-h)},d.prototype.renderBackgroundGradient=function(a,b){if(a instanceof g){var c=this.ctx.createLinearGradient(b.left+b.width*a.x0,b.top+b.height*a.y0,b.left+b.width*a.x1,b.top+b.height*a.y1);a.colorStops.forEach(function(a){c.addColorStop(a.stop,a.color.toString())}),this.rectangle(b.left,b.top,b.width,b.height,c)}},d.prototype.resizeImage=function(a,b){var c=a.image;if(c.width===b.width&&c.height===b.height)return c;var d,e=document.createElement("canvas");return e.width=b.width,e.height=b.height,d=e.getContext("2d"),d.drawImage(c,0,0,c.width,c.height,0,0,b.width,b.height),e},b.exports=d},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(a,b,c){function d(a,b,c,d){e.call(this,c,d),this.ownStacking=a,this.contexts=[],this.children=[],this.opacity=(this.parent?this.parent.stack.opacity:1)*b}var e=a("./nodecontainer");d.prototype=Object.create(e.prototype),d.prototype.getParentStack=function(a){var b=this.parent?this.parent.stack:null;return b?b.ownStacking?b:b.getParentStack(a):a.stack},b.exports=d},{"./nodecontainer":14}],22:[function(a,b,c){function d(a){this.rangeBounds=this.testRangeBounds(a),this.cors=this.testCORS(),this.svg=this.testSVG()}d.prototype.testRangeBounds=function(a){var b,c,d,e,f=!1;return a.createRange&&(b=a.createRange(),b.getBoundingClientRect&&(c=a.createElement("boundtest"),c.style.height="123px",c.style.display="block",a.body.appendChild(c),b.selectNode(c),d=b.getBoundingClientRect(),e=d.height,123===e&&(f=!0),a.body.removeChild(c))),f},d.prototype.testCORS=function(){return"undefined"!=typeof(new Image).crossOrigin},d.prototype.testSVG=function(){var a=new Image,b=document.createElement("canvas"),c=b.getContext("2d");a.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{c.drawImage(a,0,0),b.toDataURL()}catch(d){return!1}return!0},b.exports=d},{}],23:[function(a,b,c){function d(a){this.src=a,this.image=null;var b=this;this.promise=this.hasFabric().then(function(){return b.isInline(a)?Promise.resolve(b.inlineFormatting(a)):e(a)}).then(function(a){return new Promise(function(c){window.html2canvas.svg.fabric.loadSVGFromString(a,b.createCanvas.call(b,c))})})}var e=a("./xhr"),f=a("./utils").decode64;d.prototype.hasFabric=function(){return window.html2canvas.svg&&window.html2canvas.svg.fabric?Promise.resolve():Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))},d.prototype.inlineFormatting=function(a){return/^data:image\/svg\+xml;base64,/.test(a)?this.decode64(this.removeContentType(a)):this.removeContentType(a)},d.prototype.removeContentType=function(a){return a.replace(/^data:image\/svg\+xml(;base64)?,/,"")},d.prototype.isInline=function(a){return/^data:image\/svg\+xml/i.test(a)},d.prototype.createCanvas=function(a){var b=this;return function(c,d){var e=new window.html2canvas.svg.fabric.StaticCanvas("c");b.image=e.lowerCanvasEl,e.setWidth(d.width).setHeight(d.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(c,d)).renderAll(),a(e.lowerCanvasEl)}},d.prototype.decode64=function(a){return"function"==typeof window.atob?window.atob(a):f(a)},b.exports=d},{"./utils":26,"./xhr":28}],24:[function(a,b,c){function d(a,b){this.src=a,this.image=null;var c=this;this.promise=b?new Promise(function(b,d){c.image=new Image,c.image.onload=b,c.image.onerror=d,c.image.src="data:image/svg+xml,"+(new XMLSerializer).serializeToString(a),c.image.complete===!0&&b(c.image)}):this.hasFabric().then(function(){return new Promise(function(b){window.html2canvas.svg.fabric.parseSVGDocument(a,c.createCanvas.call(c,b))})})}var e=a("./svgcontainer");d.prototype=Object.create(e.prototype),b.exports=d},{"./svgcontainer":23}],25:[function(a,b,c){function d(a,b){f.call(this,a,b)}function e(a,b,c){return a.length>0?b+c.toUpperCase():void 0}var f=a("./nodecontainer");d.prototype=Object.create(f.prototype),d.prototype.applyTextTransform=function(){this.node.data=this.transform(this.parent.css("textTransform"))},d.prototype.transform=function(a){var b=this.node.data;switch(a){case"lowercase":return b.toLowerCase();case"capitalize":return b.replace(/(^|\s|:|-|\(|\))([a-z])/g,e);case"uppercase":return b.toUpperCase();default:return b}},b.exports=d},{"./nodecontainer":14}],26:[function(a,b,c){c.smallImage=function(){return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},c.bind=function(a,b){return function(){return a.apply(b,arguments)}},c.decode64=function(a){var b,c,d,e,f,g,h,i,j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",k=a.length,l="";for(b=0;k>b;b+=4)c=j.indexOf(a[b]),d=j.indexOf(a[b+1]),e=j.indexOf(a[b+2]),f=j.indexOf(a[b+3]),g=c<<2|d>>4,h=(15&d)<<4|e>>2,i=(3&e)<<6|f,l+=64===e?String.fromCharCode(g):64===f||-1===f?String.fromCharCode(g,h):String.fromCharCode(g,h,i);return l},c.getBounds=function(a){if(a.getBoundingClientRect){var b=a.getBoundingClientRect(),c=null==a.offsetWidth?b.width:a.offsetWidth;return{top:b.top,bottom:b.bottom||b.top+b.height,right:b.left+c,left:b.left,width:c,height:null==a.offsetHeight?b.height:a.offsetHeight}}return{}},c.offsetBounds=function(a){var b=a.offsetParent?c.offsetBounds(a.offsetParent):{top:0,left:0};return{top:a.offsetTop+b.top,bottom:a.offsetTop+a.offsetHeight+b.top,right:a.offsetLeft+b.left+a.offsetWidth,left:a.offsetLeft+b.left,width:a.offsetWidth,height:a.offsetHeight}},c.parseBackgrounds=function(a){var b,c,d,e,f,g,h,i=" \r\n	",j=[],k=0,l=0,m=function(){b&&('"'===c.substr(0,1)&&(c=c.substr(1,c.length-2)),c&&h.push(c),"-"===b.substr(0,1)&&(e=b.indexOf("-",1)+1)>0&&(d=b.substr(0,e),b=b.substr(e)),j.push({prefix:d,method:b.toLowerCase(),value:f,args:h,image:null})),h=[],b=d=c=f=""};return h=[],b=d=c=f="",a.split("").forEach(function(a){if(!(0===k&&i.indexOf(a)>-1)){switch(a){case'"':g?g===a&&(g=null):g=a;break;case"(":if(g)break;if(0===k)return k=1,void(f+=a);l++;break;case")":if(g)break;if(1===k){if(0===l)return k=0,f+=a,void m();l--}break;case",":if(g)break;if(0===k)return void m();if(1===k&&0===l&&!b.match(/^url$/i))return h.push(c),c="",void(f+=a)}f+=a,0===k?b+=a:c+=a}}),m(),j}},{}],27:[function(a,b,c){function d(a){e.apply(this,arguments),this.type="linear"===a.args[0]?e.TYPES.LINEAR:e.TYPES.RADIAL}var e=a("./gradientcontainer");d.prototype=Object.create(e.prototype),b.exports=d},{"./gradientcontainer":9}],28:[function(a,b,c){function d(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.onload=function(){200===d.status?b(d.responseText):c(new Error(d.statusText))},d.onerror=function(){c(new Error("Network Error"))},d.send()})}b.exports=d},{}]},{},[4])(4)});
export default class OrgChart {
  constructor(options) {
    this._name = 'OrgChart';
    Promise.prototype.finally = function (callback) {
      let P = this.constructor;

      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason; })
      );
    };

    let that = this,
      defaultOptions = {
        'nodeTitle': 'name',
        'nodeId': 'id',
        'toggleSiblingsResp': false,
        'depth': 999,
        'chartClass': '',
        'exportButton': false,
        'exportFilename': 'OrgChart',
        'parentNodeSymbol': 'fa-users',
        'draggable': false,
        'direction': 't2b',
        'pan': false,
        'zoom': false
      },
      opts = Object.assign(defaultOptions, options),
      data = opts.data,
      chart = document.createElement('div'),
      chartContainer = document.querySelector(opts.chartContainer);

    this.options = opts;
    delete this.options.data;
    this.chart = chart;
    this.chartContainer = chartContainer;
    chart.dataset.options = JSON.stringify(opts);
    chart.setAttribute('class', 'orgchart' + (opts.chartClass !== '' ? ' ' + opts.chartClass : '') +
      (opts.direction !== 't2b' ? ' ' + opts.direction : ''));
    if (typeof data === 'object') { // local json datasource
      this.buildHierarchy(chart, opts.ajaxURL ? data : this._attachRel(data, '00'), 0);
    } else if (typeof data === 'string' && data.startsWith('#')) { // ul datasource
      this.buildHierarchy(chart, this._buildJsonDS(document.querySelector(data).children[0]), 0);
    } else { // ajax datasource
      let spinner = document.createElement('i');

      spinner.setAttribute('class', 'fa fa-circle-o-notch fa-spin spinner');
      chart.appendChild(spinner);
      this._getJSON(data)
      .then(function (resp) {
        that.buildHierarchy(chart, opts.ajaxURL ? resp : that._attachRel(resp, '00'), 0);
      })
      .catch(function (err) {
        console.error('failed to fetch datasource for orgchart', err);
      })
      .finally(function () {
        let spinner = chart.querySelector('.spinner');

        spinner.parentNode.removeChild(spinner);
      });
    }
    chart.addEventListener('click', this._clickChart.bind(this));
    // append the export button to the chart-container
    if (opts.exportButton && !chartContainer.querySelector('.oc-export-btn')) {
      let exportBtn = document.createElement('button'),
        downloadBtn = document.createElement('a');

      exportBtn.setAttribute('class', 'oc-export-btn' + (opts.chartClass !== '' ? ' ' + opts.chartClass : ''));
      exportBtn.innerHTML = 'Export';
      exportBtn.addEventListener('click', this._clickExportButton.bind(this));
      downloadBtn.setAttribute('class', 'oc-download-btn' + (opts.chartClass !== '' ? ' ' + opts.chartClass : ''));
      downloadBtn.setAttribute('download', opts.exportFilename + '.png');
      chartContainer.appendChild(exportBtn);
      chartContainer.appendChild(downloadBtn);
    }

    if (opts.pan) {
      chartContainer.style.overflow = 'hidden';
      chart.addEventListener('mousedown', this._onPanStart.bind(this));
      chart.addEventListener('touchstart', this._onPanStart.bind(this));
      document.body.addEventListener('mouseup', this._onPanEnd.bind(this));
      document.body.addEventListener('touchend', this._onPanEnd.bind(this));
    }

    if (opts.zoom) {
      chartContainer.addEventListener('wheel', this._onWheeling.bind(this));
      chartContainer.addEventListener('touchstart', this._onTouchStart.bind(this));
      document.body.addEventListener('touchmove', this._onTouchMove.bind(this));
      document.body.addEventListener('touchend', this._onTouchEnd.bind(this));
    }

    chartContainer.appendChild(chart);
  }
  get name() {
    return this._name;
  }
  _closest(el, fn) {
    return el && ((fn(el) && el !== this.chart) ? el : this._closest(el.parentNode, fn));
  }
  _siblings(el, expr) {
    return Array.from(el.parentNode.children).filter((child) => {
      if (child !== el) {
        if (expr) {
          return el.matches(expr);
        }
        return true;
      }
      return false;
    });
  }
  _prevAll(el, expr) {
    let sibs = [],
      prevSib = el.previousElementSibling;

    while (prevSib) {
      if (!expr || prevSib.matches(expr)) {
        sibs.push(prevSib);
      }
      prevSib = prevSib.previousElementSibling;
    }
    return sibs;
  }
  _nextAll(el, expr) {
    let sibs = [];
    let nextSib = el.nextElementSibling;

    while (nextSib) {
      if (!expr || nextSib.matches(expr)) {
        sibs.push(nextSib);
      }
      nextSib = nextSib.nextElementSibling;
    }
    return sibs;
  }
  _isVisible(el) {
    return el.offsetParent !== null;
  }
  _addClass(elements, classNames) {
    elements.forEach((el) => {
      if (classNames.indexOf(' ') > 0) {
        classNames.split(' ').forEach((className) => el.classList.add(className));
      } else {
        el.classList.add(classNames);
      }
    });
  }
  _removeClass(elements, classNames) {
    elements.forEach((el) => {
      if (classNames.indexOf(' ') > 0) {
        classNames.split(' ').forEach((className) => el.classList.remove(className));
      } else {
        el.classList.remove(classNames);
      }
    });
  }
  _css(elements, prop, val) {
    elements.forEach((el) => {
      el.style[prop] = val;
    });
  }
  _removeAttr(elements, attr) {
    elements.forEach((el) => {
      el.removeAttribute(attr);
    });
  }
  _one(el, type, listener, self) {
    let one = function (event) {
      try {
        listener.call(self, event);
      } finally {
        el.removeEventListener(type, one);
      }
    };

    el.addEventListener(type, one);
  }
  _getDescElements(ancestors, selector) {
    let results = [];

    ancestors.forEach((el) => results.push(...el.querySelectorAll(selector)));
    return results;
  }
  _getJSON(url) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();

      function handler() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(new Error(this.statusText));
        }
      }
      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      // xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    });
  }
  _buildJsonDS(li) {
    let subObj = {
      'name': li.firstChild.textContent.trim(),
      'relationship': (li.parentNode.parentNode.nodeName === 'LI' ? '1' : '0') +
        (li.parentNode.children.length > 1 ? 1 : 0) + (li.children.length ? 1 : 0)
    };

    if (li.id) {
      subObj.id = li.id;
    }
    if (li.querySelector('ul')) {
      Array.from(li.querySelector('ul').children).forEach((el) => {
        if (!subObj.children) { subObj.children = []; }
        subObj.children.push(this._buildJsonDS(el));
      });
    }
    return subObj;
  }
  _attachRel(data, flags) {
    data.relationship = flags + (data.children && data.children.length > 0 ? 1 : 0);
    if (data.children) {
      for (let item of data.children) {
        this._attachRel(item, '1' + (data.children.length > 1 ? 1 : 0));
      }
    }
    return data;
  }
  _repaint(node) {
    if (node) {
      node.style.offsetWidth = node.offsetWidth;
    }
  }
  // whether the cursor is hovering over the node
  _isInAction(node) {
    return node.querySelector(':scope > .edge').className.indexOf('fa-') > -1;
  }
  // detect the exist/display state of related node
  _getNodeState(node, relation) {
    let criteria,
      state = { 'exist': false, 'visible': false };

    if (relation === 'parent') {
      criteria = this._closest(node, (el) => el.classList && el.classList.contains('nodes'));
      if (criteria) {
        state.exist = true;
      }
      if (state.exist && this._isVisible(criteria.parentNode.children[0])) {
        state.visible = true;
      }
    } else if (relation === 'children') {
      criteria = this._closest(node, (el) => el.nodeName === 'TR').nextElementSibling;
      if (criteria) {
        state.exist = true;
      }
      if (state.exist && this._isVisible(criteria)) {
        state.visible = true;
      }
    } else if (relation === 'siblings') {
      criteria = this._siblings(this._closest(node, (el) => el.nodeName === 'TABLE').parentNode);
      if (criteria.length) {
        state.exist = true;
      }
      if (state.exist && criteria.some((el) => this._isVisible(el))) {
        state.visible = true;
      }
    }

    return state;
  }
  // find the related nodes
  getRelatedNodes(node, relation) {
    if (relation === 'parent') {
      return this._closest(node, (el) => el.classList.contains('nodes'))
        .parentNode.children[0].querySelector('.node');
    } else if (relation === 'children') {
      return Array.from(this._closest(node, (el) => el.nodeName === 'TABLE').lastChild.children)
        .map((el) => el.querySelector('.node'));
    } else if (relation === 'siblings') {
      return this._siblings(this._closest(node, (el) => el.nodeName === 'TABLE').parentNode)
        .map((el) => el.querySelector('.node'));
    }
    return [];
  }
  _switchHorizontalArrow(node) {
    let opts = this.options,
      leftEdge = node.querySelector('.leftEdge'),
      rightEdge = node.querySelector('.rightEdge'),
      temp = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode;

    if (opts.toggleSiblingsResp && (typeof opts.ajaxURL === 'undefined' ||
      this._closest(node, (el) => el.classList.contains('.nodes')).dataset.siblingsLoaded)) {
      let prevSib = temp.previousElementSibling,
        nextSib = temp.nextElementSibling;

      if (prevSib) {
        if (prevSib.classList.contains('hidden')) {
          leftEdge.classList.add('nb-arrow-left');
          leftEdge.classList.remove('nb-arrow-right');
        } else {
          leftEdge.classList.add('nb-arrow-right');
          leftEdge.classList.remove('nb-arrow-left');
        }
      }
      if (nextSib) {
        if (nextSib.classList.contains('hidden')) {
          rightEdge.classList.add('nb-arrow-right');
          rightEdge.classList.remove('nb-arrow-left');
        } else {
          rightEdge.classList.add('nb-arrow-left');
          rightEdge.classList.remove('nb-arrow-right');
        }
      }
    } else {
      let sibs = this._siblings(temp),
        sibsVisible = sibs.length ? !sibs.some((el) => el.classList.contains('hidden')) : false;

      leftEdge.classList.toggle('nb-arrow-right', sibsVisible);
      leftEdge.classList.toggle('nb-arrow-left', !sibsVisible);
      rightEdge.classList.toggle('nb-arrow-left', sibsVisible);
      rightEdge.classList.toggle('nb-arrow-right', !sibsVisible);
    }
  }
  _hoverNode(event) {
    let node = event.target,
      flag = false,
      topEdge = node.querySelector(':scope > .topEdge'),
      bottomEdge = node.querySelector(':scope > .bottomEdge'),
      leftEdge = node.querySelector(':scope > .leftEdge');
      if (bottomEdge) {
        flag = this._getNodeState(node, 'children').visible;
        bottomEdge.classList.toggle('chart-arrow-down', !flag);
        bottomEdge.classList.toggle('chart-arrow-up', flag);
      }
    if (event.type === 'mouseenter') {
      if (topEdge) {
        flag = this._getNodeState(node, 'parent').visible;
        // topEdge.classList.toggle('chart-arrow-up', !flag);
        // topEdge.classList.toggle('chart-arrow-down', flag);
      }
      
      if (leftEdge) {
        //this._switchHorizontalArrow(node);
      }
    } else {
      Array.from(node.querySelectorAll(':scope > .edge')).forEach((el) => {
        //el.classList.remove('chart-arrow-up', 'chart-arrow-down', 'nb-arrow-right', 'nb-arrow-left');
      });
    }
  }
  // define node click event handler
  _clickNode(event) {
    let clickedNode = event.currentTarget,
      focusedNode = this.chart.querySelector('.focused');

    if (focusedNode) {
      focusedNode.classList.remove('focused');
    }
    clickedNode.classList.add('focused');
  }
  // build the parent node of specific node
  _buildParentNode(currentRoot, nodeData, callback) {
    let that = this,
      table = document.createElement('table');

    nodeData.relationship = nodeData.relationship || '001';
    this._createNode(nodeData, 0)
      .then(function (nodeDiv) {
        let chart = that.chart;

        nodeDiv.classList.remove('slide-up');
        nodeDiv.classList.add('slide-down');
        let parentTr = document.createElement('tr'),
          superiorLine = document.createElement('tr'),
          inferiorLine = document.createElement('tr'),
          childrenTr = document.createElement('tr');

        parentTr.setAttribute('class', 'hidden');
        parentTr.innerHTML = `<td colspan="2"></td>`;
        table.appendChild(parentTr);
        superiorLine.setAttribute('class', 'lines hidden');
        superiorLine.innerHTML = `<td colspan="2"><div class="downLine"></div></td>`;
        table.appendChild(superiorLine);
        inferiorLine.setAttribute('class', 'lines hidden');
        inferiorLine.innerHTML = `<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>`;
        table.appendChild(inferiorLine);
        childrenTr.setAttribute('class', 'nodes');
        childrenTr.innerHTML = `<td colspan="2"></td>`;
        table.appendChild(childrenTr);
        table.querySelector('td').appendChild(nodeDiv);
        chart.insertBefore(table, chart.children[0]);
        table.children[3].children[0].appendChild(chart.lastChild);
        callback();
      })
      .catch(function (err) {
        console.error('Failed to create parent node', err);
      });
  }
  _switchVerticalArrow(arrow) {
    arrow.classList.toggle('chart-arrow-up');
    arrow.classList.toggle('chart-arrow-down');
  }
  // show the parent node of the specified node
  showParent(node) {
    // just show only one superior level
    let temp = this._prevAll(this._closest(node, (el) => el.classList.contains('nodes')));

    this._removeClass(temp, 'hidden');
    // just show only one line
    this._addClass(Array(temp[0].children).slice(1, -1), 'hidden');
    // show parent node with animation
    let parent = temp[2].querySelector('.node');

    this._one(parent, 'transitionend', function () {
      parent.classList.remove('slide');
      if (this._isInAction(node)) {
        this._switchVerticalArrow(node.querySelector(':scope > .topEdge'));
      }
    }, this);
    this._repaint(parent);
    parent.classList.add('slide');
    parent.classList.remove('slide-down');
  }
  // show the sibling nodes of the specified node
  showSiblings(node, direction) {
    // firstly, show the sibling td tags
    let siblings = [],
      temp = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode;

    if (direction) {
      siblings = direction === 'left' ? this._prevAll(temp) : this._nextAll(temp);
    } else {
      siblings = this._siblings(temp);
    }
    this._removeClass(siblings, 'hidden');
    // secondly, show the lines
    let upperLevel = this._prevAll(this._closest(node, (el) => el.classList.contains('nodes')));

    temp = Array.from(upperLevel[0].querySelectorAll(':scope > .hidden'));
    if (direction) {
      this._removeClass(temp.slice(0, siblings.length * 2), 'hidden');
    } else {
      this._removeClass(temp, 'hidden');
    }
    // thirdly, do some cleaning stuff
    if (!this._getNodeState(node, 'parent').visible) {
      this._removeClass(upperLevel, 'hidden');
      let parent = upperLevel[2].querySelector('.node');

      this._one(parent, 'transitionend', function (event) {
        event.target.classList.remove('slide');
      }, this);
      this._repaint(parent);
      parent.classList.add('slide');
      parent.classList.remove('slide-down');
    }
    // lastly, show the sibling nodes with animation
    siblings.forEach((sib) => {
      Array.from(sib.querySelectorAll('.node')).forEach((node) => {
        if (this._isVisible(node)) {
          node.classList.add('slide');
          node.classList.remove('slide-left', 'slide-right');
        }
      });
    });
    this._one(siblings[0].querySelector('.slide'), 'transitionend', function () {
      siblings.forEach((sib) => {
        this._removeClass(Array.from(sib.querySelectorAll('.slide')), 'slide');
      });
      if (this._isInAction(node)) {
        this._switchHorizontalArrow(node);
        node.querySelector('.topEdge').classList.remove('chart-arrow-up');
        node.querySelector('.topEdge').classList.add('chart-arrow-down');
      }
    }, this);
  }
  // hide the sibling nodes of the specified node
  hideSiblings(node, direction) {
    let nodeContainer = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode,
      siblings = this._siblings(nodeContainer);

    siblings.forEach((sib) => {
      if (sib.querySelector('.spinner')) {
        this.chart.dataset.inAjax = false;
      }
    });

    if (!direction || (direction && direction === 'left')) {
      let preSibs = this._prevAll(nodeContainer);

      preSibs.forEach((sib) => {
        Array.from(sib.querySelectorAll('.node')).forEach((node) => {
          if (this._isVisible(node)) {
            node.classList.add('slide', 'slide-right');
          }
        });
      });
    }
    if (!direction || (direction && direction !== 'left')) {
      let nextSibs = this._nextAll(nodeContainer);

      nextSibs.forEach((sib) => {
        Array.from(sib.querySelectorAll('.node')).forEach((node) => {
          if (this._isVisible(node)) {
            node.classList.add('slide', 'slide-left');
          }
        });
      });
    }

    let animatedNodes = [];

    this._siblings(nodeContainer).forEach((sib) => {
      Array.prototype.push.apply(animatedNodes, Array.from(sib.querySelectorAll('.slide')));
    });
    let lines = [];

    for (let node of animatedNodes) {
      let temp = this._closest(node, function (el) {
        return el.classList.contains('nodes');
      }).previousElementSibling;

      lines.push(temp);
      lines.push(temp.previousElementSibling);
    }
    lines = [...new Set(lines)];
    lines.forEach(function (line) {
      line.style.visibility = 'hidden';
    });

    this._one(animatedNodes[0], 'transitionend', function (event) {
      lines.forEach(function (line) {
        line.removeAttribute('style');
      });
      let sibs = [];

      if (direction) {
        if (direction === 'left') {
          sibs = this._prevAll(nodeContainer, ':not(.hidden)');
        } else {
          sibs = this._nextAll(nodeContainer, ':not(.hidden)');
        }
      } else {
        sibs = this._siblings(nodeContainer);
      }
      let temp = Array.from(this._closest(nodeContainer, function (el) {
        return el.classList.contains('nodes');
      }).previousElementSibling.querySelectorAll(':scope > :not(.hidden)'));

      let someLines = temp.slice(1, direction ? sibs.length * 2 + 1 : -1);

      this._addClass(someLines, 'hidden');
      this._removeClass(animatedNodes, 'slide');
      sibs.forEach((sib) => {
        Array.from(sib.querySelectorAll('.node')).slice(1).forEach((node) => {
          if (this._isVisible(node)) {
            node.classList.remove('slide-left', 'slide-right');
            node.classList.add('slide-up');
          }
        });
      });
      sibs.forEach((sib) => {
        this._addClass(Array.from(sib.querySelectorAll('.lines')), 'hidden');
        this._addClass(Array.from(sib.querySelectorAll('.nodes')), 'hidden');
        this._addClass(Array.from(sib.querySelectorAll('.verticalNodes')), 'hidden');
      });
      this._addClass(sibs, 'hidden');

      if (this._isInAction(node)) {
        this._switchHorizontalArrow(node);
      }
    }, this);
  }
  // recursively hide the ancestor node and sibling nodes of the specified node
  hideParent(node) {
    let temp = Array.from(this._closest(node, function (el) {
      return el.classList.contains('nodes');
    }).parentNode.children).slice(0, 3);

    if (temp[0].querySelector('.spinner')) {
      this.chart.dataset.inAjax = false;
    }
    // hide the sibling nodes
    if (this._getNodeState(node, 'siblings').visible) {
      this.hideSiblings(node);
    }
    // hide the lines
    let lines = temp.slice(1);

    this._css(lines, 'visibility', 'hidden');
    // hide the superior nodes with transition
    let parent = temp[0].querySelector('.node'),
      grandfatherVisible = this._getNodeState(parent, 'parent').visible;

    if (parent && this._isVisible(parent)) {
      parent.classList.add('slide', 'slide-down');
      this._one(parent, 'transitionend', function () {
        parent.classList.remove('slide');
        this._removeAttr(lines, 'style');
        this._addClass(temp, 'hidden');
      }, this);
    }
    // if the current node has the parent node, hide it recursively
    if (parent && grandfatherVisible) {
      this.hideParent(parent);
    }
  }
  // exposed method
  addParent(currentRoot, data) {
    let that = this;

    this._buildParentNode(currentRoot, data, function () {
      if (!currentRoot.querySelector(':scope > .topEdge')) {
        let topEdge = document.createElement('i');

        topEdge.setAttribute('class', 'edge verticalEdge topEdge fa');
        currentRoot.appendChild(topEdge);
      }
      that.showParent(currentRoot);
    });
  }
  // start up loading status for requesting new nodes
  _startLoading(arrow, node) {
    let opts = this.options,
      chart = this.chart;

    if (typeof chart.dataset.inAjax !== 'undefined' && chart.dataset.inAjax === 'true') {
      return false;
    }

    arrow.classList.add('hidden');
    let spinner = document.createElement('i');

    spinner.setAttribute('class', 'fa fa-circle-o-notch fa-spin spinner');
    node.appendChild(spinner);
    this._addClass(Array.from(node.querySelectorAll(':scope > *:not(.spinner)')), 'hazy');
    chart.dataset.inAjax = true;

    let exportBtn = this.chartContainer.querySelector('.oc-export-btn' +
      (opts.chartClass !== '' ? '.' + opts.chartClass : ''));

    if (exportBtn) {
      exportBtn.disabled = true;
    }
    return true;
  }
  // terminate loading status for requesting new nodes
  _endLoading(arrow, node) {
    let opts = this.options;

    arrow.classList.remove('hidden');
    node.querySelector(':scope > .spinner').remove();
    this._removeClass(Array.from(node.querySelectorAll(':scope > .hazy')), 'hazy');
    this.chart.dataset.inAjax = false;
    let exportBtn = this.chartContainer.querySelector('.oc-export-btn' +
      (opts.chartClass !== '' ? '.' + opts.chartClass : ''));

    if (exportBtn) {
      exportBtn.disabled = false;
    }
  }
  // define click event handler for the top edge
  _clickTopEdge(event) {
    event.stopPropagation();
    let that = this,
      topEdge = event.target,
      node = topEdge.parentNode,
      parentState = this._getNodeState(node, 'parent'),
      opts = this.options;

    if (parentState.exist) {
      let temp = this._closest(node, function (el) {
        return el.classList.contains('nodes');
      });
      let parent = temp.parentNode.firstChild.querySelector('.node');

      if (parent.classList.contains('slide')) { return; }
      // hide the ancestor nodes and sibling nodes of the specified node
      if (parentState.visible) {
        this.hideParent(node);
        this._one(parent, 'transitionend', function () {
          if (this._isInAction(node)) {
            this._switchVerticalArrow(topEdge);
            this._switchHorizontalArrow(node);
          }
        }, this);
      } else { // show the ancestors and siblings
        this.showParent(node);
      }
    } else {
      // load the new parent node of the specified node by ajax request
      let nodeId = topEdge.parentNode.id;

      // start up loading status
      if (this._startLoading(topEdge, node)) {
        // load new nodes
        this._getJSON(typeof opts.ajaxURL.parent === 'function' ?
          opts.ajaxURL.parent(node.dataset.source) : opts.ajaxURL.parent + nodeId)
        .then(function (resp) {
          if (that.chart.dataset.inAjax === 'true') {
            if (Object.keys(resp).length) {
              that.addParent(node, resp);
            }
          }
        })
        .catch(function (err) {
          console.error('Failed to get parent node data.', err);
        })
        .finally(function () {
          that._endLoading(topEdge, node);
        });
      }
    }
  }
  // recursively hide the descendant nodes of the specified node
  hideChildren(node) {
    let that = this,
      temp = this._nextAll(node.parentNode.parentNode),
      lastItem = temp[temp.length - 1],
      lines = [];

    if (lastItem.querySelector('.spinner')) {
      this.chart.dataset.inAjax = false;
    }
    let descendants = Array.from(lastItem.querySelectorAll('.node')).filter((el) => that._isVisible(el)),
      isVerticalDesc = lastItem.classList.contains('verticalNodes');

    if (!isVerticalDesc) {
      descendants.forEach((desc) => {
        Array.prototype.push.apply(lines,
          that._prevAll(that._closest(desc, (el) => el.classList.contains('nodes')), '.lines'));
      });
      lines = [...new Set(lines)];
      this._css(lines, 'visibility', 'hidden');
    }
    this._one(descendants[0], 'transitionend', function (event) {
      this._removeClass(descendants, 'slide');
      if (isVerticalDesc) {
        that._addClass(temp, 'hidden');
      } else {
        lines.forEach((el) => {
          el.removeAttribute('style');
          el.classList.add('hidden');
          el.parentNode.lastChild.classList.add('hidden');
        });
        this._addClass(Array.from(lastItem.querySelectorAll('.verticalNodes')), 'hidden');
      }
      if (this._isInAction(node)) {
        this._switchVerticalArrow(node.querySelector('.bottomEdge'));
      }
    }, this);
    this._addClass(descendants, 'slide slide-up');
  }
  // show the children nodes of the specified node
  showChildren(node) {
    let that = this,
      temp = this._nextAll(node.parentNode.parentNode),
      descendants = [];

    this._removeClass(temp, 'hidden');
    if (temp.some((el) => el.classList.contains('verticalNodes'))) {
      temp.forEach((el) => {
        Array.prototype.push.apply(descendants, Array.from(el.querySelectorAll('.node')).filter((el) => {
          return that._isVisible(el);
        }));
      });
    } else {
      Array.from(temp[2].children).forEach((el) => {
        Array.prototype.push.apply(descendants,
          Array.from(el.querySelector('tr').querySelectorAll('.node')).filter((el) => {
            return that._isVisible(el);
          }));
      });
    }
    // the two following statements are used to enforce browser to repaint
    this._repaint(descendants[0]);
    this._one(descendants[0], 'transitionend', (event) => {
      this._removeClass(descendants, 'slide');
      if (this._isInAction(node)) {
        this._switchVerticalArrow(node.querySelector('.bottomEdge'));
      }
    }, this);
    this._addClass(descendants, 'slide');
    this._removeClass(descendants, 'slide-up');
  }
  // build the child nodes of specific node
  _buildChildNode(appendTo, nodeData, callback) {
    let data = nodeData.children || nodeData.siblings;

    appendTo.querySelector('td').setAttribute('colSpan', data.length * 2);
    this.buildHierarchy(appendTo, { 'children': data }, 0, callback);
  }
  // exposed method
  addChildren(node, data) {
    let that = this,
      opts = this.options,
      count = 0;

    this.chart.dataset.inEdit = 'addChildren';
    this._buildChildNode.call(this, this._closest(node, (el) => el.nodeName === 'TABLE'), data, function () {
      if (++count === data.children.length) {
        if (!node.querySelector('.bottomEdge')) {
          let bottomEdge = document.createElement('i');

          bottomEdge.setAttribute('class', 'edge verticalEdge bottomEdge fa ');
          node.appendChild(bottomEdge);
        }
        if (!node.querySelector('.symbol')) {
          let symbol = document.createElement('i');

          symbol.setAttribute('class', 'fa ' + opts.parentNodeSymbol + ' symbol');
          node.querySelector(':scope > .title').appendChild(symbol);
        }
        that.showChildren(node);
        that.chart.dataset.inEdit = '';
      }
    });
  }
  // bind click event handler for the bottom edge
  _clickBottomEdge(event) {
    event.stopPropagation();
    let that = this,
      opts = this.options,
      bottomEdge = event.target,
      node = bottomEdge.parentNode,
      childrenState = this._getNodeState(node, 'children');

    if (childrenState.exist) {
      let temp = this._closest(node, function (el) {
        return el.nodeName === 'TR';
      }).parentNode.lastChild;

      if (Array.from(temp.querySelectorAll('.node')).some((node) => {
        return this._isVisible(node) && node.classList.contains('slide');
      })) { return; }
      // hide the descendant nodes of the specified node
      if (childrenState.visible) {
        this.hideChildren(node);
      } else { // show the descendants
        this.showChildren(node);
      }
    } else { // load the new children nodes of the specified node by ajax request
      let nodeId = bottomEdge.parentNode.id;

      if (this._startLoading(bottomEdge, node)) {
        this._getJSON(typeof opts.ajaxURL.children === 'function' ?
          opts.ajaxURL.children(node.dataset.source) : opts.ajaxURL.children + nodeId)
        .then(function (resp) {
          if (that.chart.dataset.inAjax === 'true') {
            if (resp.children.length) {
              that.addChildren(node, resp);
            }
          }
        })
        .catch(function (err) {
          console.error('Failed to get children nodes data', err);
        })
        .finally(function () {
          that._endLoading(bottomEdge, node);
        });
      }
    }
  }
  // subsequent processing of build sibling nodes
  _complementLine(oneSibling, siblingCount, existingSibligCount) {
    let temp = oneSibling.parentNode.parentNode.children;

    temp[0].children[0].setAttribute('colspan', siblingCount * 2);
    temp[1].children[0].setAttribute('colspan', siblingCount * 2);
    for (let i = 0; i < existingSibligCount; i++) {
      let rightLine = document.createElement('td'),
        leftLine = document.createElement('td');

      rightLine.setAttribute('class', 'rightLine topLine');
      rightLine.innerHTML = '&nbsp;';
      temp[2].insertBefore(rightLine, temp[2].children[1]);
      leftLine.setAttribute('class', 'leftLine topLine');
      leftLine.innerHTML = '&nbsp;';
      temp[2].insertBefore(leftLine, temp[2].children[1]);
    }
  }
  // build the sibling nodes of specific node
  _buildSiblingNode(nodeChart, nodeData, callback) {
    let that = this,
      newSiblingCount = nodeData.siblings ? nodeData.siblings.length : nodeData.children.length,
      existingSibligCount = nodeChart.parentNode.nodeName === 'TD' ? this._closest(nodeChart, (el) => {
        return el.nodeName === 'TR';
      }).children.length : 1,
      siblingCount = existingSibligCount + newSiblingCount,
      insertPostion = (siblingCount > 1) ? Math.floor(siblingCount / 2 - 1) : 0;

    // just build the sibling nodes for the specific node
    if (nodeChart.parentNode.nodeName === 'TD') {
      let temp = this._prevAll(nodeChart.parentNode.parentNode);

      temp[0].remove();
      temp[1].remove();
      let childCount = 0;

      that._buildChildNode.call(that, that._closest(nodeChart.parentNode, (el) => el.nodeName === 'TABLE'),
        nodeData, () => {
          if (++childCount === newSiblingCount) {
            let siblingTds = Array.from(that._closest(nodeChart.parentNode, (el) => el.nodeName === 'TABLE')
              .lastChild.children);

            if (existingSibligCount > 1) {
              let temp = nodeChart.parentNode.parentNode;

              Array.from(temp.children).forEach((el) => {
                siblingTds[0].parentNode.insertBefore(el, siblingTds[0]);
              });
              temp.remove();
              that._complementLine(siblingTds[0], siblingCount, existingSibligCount);
              that._addClass(siblingTds, 'hidden');
              siblingTds.forEach((el) => {
                that._addClass(el.querySelectorAll('.node'), 'slide-left');
              });
            } else {
              let temp = nodeChart.parentNode.parentNode;

              siblingTds[insertPostion].parentNode.insertBefore(nodeChart.parentNode, siblingTds[insertPostion + 1]);
              temp.remove();
              that._complementLine(siblingTds[insertPostion], siblingCount, 1);
              that._addClass(siblingTds, 'hidden');
              that._addClass(that._getDescElements(siblingTds.slice(0, insertPostion + 1), '.node'), 'slide-right');
              that._addClass(that._getDescElements(siblingTds.slice(insertPostion + 1), '.node'), 'slide-left');
            }
            callback();
          }
        });
    } else { // build the sibling nodes and parent node for the specific ndoe
      let nodeCount = 0;

      that.buildHierarchy.call(that, that.chart, nodeData, 0, () => {
        if (++nodeCount === siblingCount) {
          let temp = nodeChart.nextElementSibling.children[3]
            .children[insertPostion],
            td = document.createElement('td');

          td.setAttribute('colspan', 2);
          td.appendChild(nodeChart);
          temp.parentNode.insertBefore(td, temp.nextElementSibling);
          that._complementLine(temp, siblingCount, 1);

          let temp2 = that._closest(nodeChart, (el) => el.classList && el.classList.contains('nodes'))
            .parentNode.children[0];

          temp2.classList.add('hidden');
          that._addClass(Array.from(temp2.querySelectorAll('.node')), 'slide-down');

          let temp3 = this._siblings(nodeChart.parentNode);

          that._addClass(temp3, 'hidden');
          that._addClass(that._getDescElements(temp3.slice(0, insertPostion), '.node'), 'slide-right');
          that._addClass(that._getDescElements(temp3.slice(insertPostion), '.node'), 'slide-left');
          callback();
        }
      });
    }
  }
  addSiblings(node, data) {
    let that = this;

    this.chart.dataset.inEdit = 'addSiblings';
    this._buildSiblingNode.call(this, this._closest(node, (el) => el.nodeName === 'TABLE'), data, () => {
      that._closest(node, (el) => el.classList && el.classList.contains('nodes'))
        .dataset.siblingsLoaded = true;
      if (!node.querySelector('.leftEdge')) {
        let rightEdge = document.createElement('i'),
          leftEdge = document.createElement('i');

        rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
        node.appendChild(rightEdge);
        leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
        node.appendChild(leftEdge);
      }
      that.showSiblings(node);
      that.chart.dataset.inEdit = '';
    });
  }
  removeNodes(node) {
    let parent = this._closest(node, el => el.nodeName === 'TABLE').parentNode,
      sibs = this._siblings(parent.parentNode);

    if (parent.nodeName === 'TD') {
      if (this._getNodeState(node, 'siblings').exist) {
        sibs[2].querySelector('.topLine').nextElementSibling.remove();
        sibs[2].querySelector('.topLine').remove();
        sibs[0].children[0].setAttribute('colspan', sibs[2].children.length);
        sibs[1].children[0].setAttribute('colspan', sibs[2].children.length);
        parent.remove();
      } else {
        sibs[0].children[0].removeAttribute('colspan');
        sibs[0].querySelector('.bottomEdge').remove();
        this._siblings(sibs[0]).forEach(el => el.remove());
      }
    } else {
      Array.from(parent.parentNode.children).forEach(el => el.remove());
    }
  }
  // bind click event handler for the left and right edges
  _clickHorizontalEdge(event) {
    event.stopPropagation();
    let that = this,
      opts = this.options,
      hEdge = event.target,
      node = hEdge.parentNode,
      siblingsState = this._getNodeState(node, 'siblings');

    if (siblingsState.exist) {
      let temp = this._closest(node, function (el) {
          return el.nodeName === 'TABLE';
        }).parentNode,
        siblings = this._siblings(temp);

      if (siblings.some((el) => {
        let node = el.querySelector('.node');

        return this._isVisible(node) && node.classList.contains('slide');
      })) { return; }
      if (opts.toggleSiblingsResp) {
        let prevSib = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode.previousElementSibling,
          nextSib = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode.nextElementSibling;

        if (hEdge.classList.contains('leftEdge')) {
          if (prevSib.classList.contains('hidden')) {
            this.showSiblings(node, 'left');
          } else {
            this.hideSiblings(node, 'left');
          }
        } else {
          if (nextSib.classList.contains('hidden')) {
            this.showSiblings(node, 'right');
          } else {
            this.hideSiblings(node, 'right');
          }
        }
      } else {
        if (siblingsState.visible) {
          this.hideSiblings(node);
        } else {
          this.showSiblings(node);
        }
      }
    } else {
      // load the new sibling nodes of the specified node by ajax request
      let nodeId = hEdge.parentNode.id,
        url = (this._getNodeState(node, 'parent').exist) ?
          (typeof opts.ajaxURL.siblings === 'function' ?
            opts.ajaxURL.siblings(JSON.parse(node.dataset.source)) : opts.ajaxURL.siblings + nodeId) :
          (typeof opts.ajaxURL.families === 'function' ?
            opts.ajaxURL.families(JSON.parse(node.dataset.source)) : opts.ajaxURL.families + nodeId);

      if (this._startLoading(hEdge, node)) {
        this._getJSON(url)
        .then(function (resp) {
          if (that.chart.dataset.inAjax === 'true') {
            if (resp.siblings || resp.children) {
              that.addSiblings(node, resp);
            }
          }
        })
        .catch(function (err) {
          console.error('Failed to get sibling nodes data', err);
        })
        .finally(function () {
          that._endLoading(hEdge, node);
        });
      }
    }
  }
  // event handler for toggle buttons in Hybrid(horizontal + vertical) OrgChart
  _clickToggleButton(event) {
    let that = this,
      toggleBtn = event.target,
      descWrapper = toggleBtn.parentNode.nextElementSibling,
      descendants = Array.from(descWrapper.querySelectorAll('.node')),
      children = Array.from(descWrapper.children).map(item => item.querySelector('.node'));

    if (children.some((item) => item.classList.contains('slide'))) { return; }
    toggleBtn.classList.toggle('fa-plus-square');
    toggleBtn.classList.toggle('fa-minus-square');
    if (descendants[0].classList.contains('slide-up')) {
      descWrapper.classList.remove('hidden');
      this._repaint(children[0]);
      this._addClass(children, 'slide');
      this._removeClass(children, 'slide-up');
      this._one(children[0], 'transitionend', () => {
        that._removeClass(children, 'slide');
      });
    } else {
      this._addClass(descendants, 'slide slide-up');
      this._one(descendants[0], 'transitionend', () => {
        that._removeClass(descendants, 'slide');
        descendants.forEach(desc => {
          let ul = that._closest(desc, function (el) {
            return el.nodeName === 'UL';
          });

          ul.classList.add('hidden');
        });
      });

      descendants.forEach(desc => {
        let subTBs = Array.from(desc.querySelectorAll('.toggleBtn'));

        that._removeClass(subTBs, 'fa-minus-square');
        that._addClass(subTBs, 'fa-plus-square');
      });
    }
  }
  _dispatchClickEvent(event) {
    let classList = event.target.classList;

    if (classList.contains('topEdge')) {
      this._clickTopEdge(event);
    } else if (classList.contains('rightEdge') || classList.contains('leftEdge')) {
      this._clickHorizontalEdge(event);
    } else if (classList.contains('bottomEdge')) {
      this._clickBottomEdge(event);
    } else if (classList.contains('toggleBtn')) {
      this._clickToggleButton(event);
    } else {
      this._clickNode(event);
    }
  }
  _onDragStart(event) {
    let nodeDiv = event.target,
      opts = this.options,
      isFirefox = /firefox/.test(window.navigator.userAgent.toLowerCase());

    if (isFirefox) {
      event.dataTransfer.setData('text/html', 'hack for firefox');
    }
    // if users enable zoom or direction options
    if (this.chart.style.transform) {
      let ghostNode, nodeCover;

      if (!document.querySelector('.ghost-node')) {
        ghostNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        ghostNode.classList.add('ghost-node');
        nodeCover = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        ghostNode.appendChild(nodeCover);
        this.chart.appendChild(ghostNode);
      } else {
        ghostNode = this.chart.querySelector(':scope > .ghost-node');
        nodeCover = ghostNode.children[0];
      }
      let transValues = this.chart.style.transform.split(','),
        scale = Math.abs(window.parseFloat((opts.direction === 't2b' || opts.direction === 'b2t') ?
          transValues[0].slice(transValues[0].indexOf('(') + 1) : transValues[1]));

      ghostNode.setAttribute('width', nodeDiv.offsetWidth);
      ghostNode.setAttribute('height', nodeDiv.offsetHeight);
      nodeCover.setAttribute('x', 5 * scale);
      nodeCover.setAttribute('y', 5 * scale);
      nodeCover.setAttribute('width', 120 * scale);
      nodeCover.setAttribute('height', 40 * scale);
      nodeCover.setAttribute('rx', 4 * scale);
      nodeCover.setAttribute('ry', 4 * scale);
      nodeCover.setAttribute('stroke-width', 1 * scale);
      let xOffset = event.offsetX * scale,
        yOffset = event.offsetY * scale;

      if (opts.direction === 'l2r') {
        xOffset = event.offsetY * scale;
        yOffset = event.offsetX * scale;
      } else if (opts.direction === 'r2l') {
        xOffset = nodeDiv.offsetWidth - event.offsetY * scale;
        yOffset = event.offsetX * scale;
      } else if (opts.direction === 'b2t') {
        xOffset = nodeDiv.offsetWidth - event.offsetX * scale;
        yOffset = nodeDiv.offsetHeight - event.offsetY * scale;
      }
      if (isFirefox) { // hack for old version of Firefox(< 48.0)
        let ghostNodeWrapper = document.createElement('img');

        ghostNodeWrapper.src = 'data:image/svg+xml;utf8,' + (new XMLSerializer()).serializeToString(ghostNode);
        event.dataTransfer.setDragImage(ghostNodeWrapper, xOffset, yOffset);
        nodeCover.setAttribute('fill', 'rgb(255, 255, 255)');
        nodeCover.setAttribute('stroke', 'rgb(191, 0, 0)');
      } else {
        event.dataTransfer.setDragImage(ghostNode, xOffset, yOffset);
      }
    }
    let dragged = event.target,
      dragZone = this._closest(dragged, (el) => {
        return el.classList && el.classList.contains('nodes');
      }).parentNode.children[0].querySelector('.node'),
      dragHier = Array.from(this._closest(dragged, (el) => {
        return el.nodeName === 'TABLE';
      }).querySelectorAll('.node'));

    this.dragged = dragged;
    Array.from(this.chart.querySelectorAll('.node')).forEach(function (node) {
      if (!dragHier.includes(node)) {
        if (opts.dropCriteria) {
          if (opts.dropCriteria(dragged, dragZone, node)) {
            node.classList.add('allowedDrop');
          }
        } else {
          node.classList.add('allowedDrop');
        }
      }
    });
  }
  _onDragOver(event) {
    event.preventDefault();
    let dropZone = event.currentTarget;

    if (!dropZone.classList.contains('allowedDrop')) {
      event.dataTransfer.dropEffect = 'none';
    }
  }
  _onDragEnd(event) {
    Array.from(this.chart.querySelectorAll('.allowedDrop')).forEach(function (el) {
      el.classList.remove('allowedDrop');
    });
  }
  _onDrop(event) {
    let dropZone = event.currentTarget,
      chart = this.chart,
      dragged = this.dragged,
      dragZone = this._closest(dragged, function (el) {
        return el.classList && el.classList.contains('nodes');
      }).parentNode.children[0].children[0];

    this._removeClass(Array.from(chart.querySelectorAll('.allowedDrop')), 'allowedDrop');
    // firstly, deal with the hierarchy of drop zone
    if (!dropZone.parentNode.parentNode.nextElementSibling) { // if the drop zone is a leaf node
      let bottomEdge = document.createElement('i');

      bottomEdge.setAttribute('class', 'edge verticalEdge bottomEdge fa ');
      dropZone.appendChild(bottomEdge);
      dropZone.parentNode.setAttribute('colspan', 2);
      let table = this._closest(dropZone, function (el) {
          return el.nodeName === 'TABLE';
        }),
        upperTr = document.createElement('tr'),
        lowerTr = document.createElement('tr'),
        nodeTr = document.createElement('tr');

      upperTr.setAttribute('class', 'lines');
      upperTr.innerHTML = `<td colspan="2"><div class="downLine"></div></td>`;
      table.appendChild(upperTr);
      lowerTr.setAttribute('class', 'lines');
      lowerTr.innerHTML = `<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>`;
      table.appendChild(lowerTr);
      nodeTr.setAttribute('class', 'nodes');
      table.appendChild(nodeTr);
      Array.from(dragged.querySelectorAll('.horizontalEdge')).forEach((hEdge) => {
        dragged.removeChild(hEdge);
      });
      let draggedTd = this._closest(dragged, (el) => el.nodeName === 'TABLE').parentNode;

      nodeTr.appendChild(draggedTd);
    } else {
      let dropColspan = window.parseInt(dropZone.parentNode.colSpan) + 2;

      dropZone.parentNode.setAttribute('colspan', dropColspan);
      dropZone.parentNode.parentNode.nextElementSibling.children[0].setAttribute('colspan', dropColspan);
      if (!dragged.querySelector('.horizontalEdge')) {
        let rightEdge = document.createElement('i'),
          leftEdge = document.createElement('i');

        rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
        dragged.appendChild(rightEdge);
        leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
        dragged.appendChild(leftEdge);
      }
      let temp = dropZone.parentNode.parentNode.nextElementSibling.nextElementSibling,
        leftline = document.createElement('td'),
        rightline = document.createElement('td');

      leftline.setAttribute('class', 'leftLine topLine');
      leftline.innerHTML = `&nbsp;`;
      temp.insertBefore(leftline, temp.children[1]);
      rightline.setAttribute('class', 'rightLine topLine');
      rightline.innerHTML = `&nbsp;`;
      temp.insertBefore(rightline, temp.children[2]);
      temp.nextElementSibling.appendChild(this._closest(dragged, function (el) {
        return el.nodeName === 'TABLE';
      }).parentNode);

      let dropSibs = this._siblings(this._closest(dragged, function (el) {
        return el.nodeName === 'TABLE';
      }).parentNode).map((el) => el.querySelector('.node'));

      if (dropSibs.length === 1) {
        let rightEdge = document.createElement('i'),
          leftEdge = document.createElement('i');

        rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
        dropSibs[0].appendChild(rightEdge);
        leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
        dropSibs[0].appendChild(leftEdge);
      }
    }
    // secondly, deal with the hierarchy of dragged node
    let dragColSpan = window.parseInt(dragZone.colSpan);

    if (dragColSpan > 2) {
      dragZone.setAttribute('colspan', dragColSpan - 2);
      dragZone.parentNode.nextElementSibling.children[0].setAttribute('colspan', dragColSpan - 2);
      let temp = dragZone.parentNode.nextElementSibling.nextElementSibling;

      temp.children[1].remove();
      temp.children[1].remove();

      let dragSibs = Array.from(dragZone.parentNode.parentNode.children[3].children).map(function (td) {
        return td.querySelector('.node');
      });

      if (dragSibs.length === 1) {
        dragSibs[0].querySelector('.leftEdge').remove();
        dragSibs[0].querySelector('.rightEdge').remove();
      }
    } else {
      dragZone.removeAttribute('colspan');
      dragZone.querySelector('.node').removeChild(dragZone.querySelector('.bottomEdge'));
      Array.from(dragZone.parentNode.parentNode.children).slice(1).forEach((tr) => tr.remove());
    }
    let customE = new CustomEvent('nodedropped.orgchart', { 'detail': {
      'draggedNode': dragged,
      'dragZone': dragZone.children[0],
      'dropZone': dropZone
    }});

    chart.dispatchEvent(customE);
  }
  // create node
  _createNode(nodeData, level) {
    let that = this,
      opts = this.options;

    return new Promise(function (resolve, reject) {
      if (nodeData.children) {
        for (let child of nodeData.children) {
          child.parentId = nodeData.id;
        }
      }

      // construct the content of node
      let nodeDiv = document.createElement('div');

      delete nodeData.children;
      nodeDiv.dataset.source = JSON.stringify(nodeData);
      if (nodeData[opts.nodeId]) {
        nodeDiv.id = nodeData[opts.nodeId];
      }
      let inEdit = that.chart.dataset.inEdit,
        isHidden;

      if (inEdit) {
        isHidden = inEdit === 'addChildren' ? ' slide-up' : '';
      } else {
        isHidden = level >= opts.depth ? ' slide-up' : '';
      }
      nodeDiv.setAttribute('class', 'node ' + (nodeData.className || '') + isHidden);
      if (opts.draggable) {
        nodeDiv.setAttribute('draggable', true);
      }
      if (nodeData.parentId) {
        nodeDiv.setAttribute('data-parent', nodeData.parentId);
      }
      // nodeDiv.innerHTML = `
      //   <div class="title">${nodeData[opts.nodeTitle]}</div>
      //   ${opts.nodeContent ? `<div class="content">${nodeData[opts.nodeContent]}</div>` : ''}
      // `;
      nodeDiv.innerHTML = `
        <div class="title">${nodeData[opts.nodeTitle]}</div>
      `;
      // append 4 direction arrows or expand/collapse buttons
      let flags = nodeData.relationship || '';

      if (opts.verticalDepth && (level + 2) > opts.verticalDepth) {
        if ((level + 1) >= opts.verticalDepth && Number(flags.substr(2, 1))) {
          let toggleBtn = document.createElement('i'),
            icon = level + 1 >= opts.depth ? 'plus' : 'minus';

          toggleBtn.setAttribute('class', 'toggleBtn fa fa-' + icon + '-square');
          nodeDiv.appendChild(toggleBtn);
        }
      } else {
        if (Number(flags.substr(0, 1))) {
          let topEdge = document.createElement('i');

          topEdge.setAttribute('class', 'edge verticalEdge topEdge fa');
          nodeDiv.appendChild(topEdge);
        }
        if (Number(flags.substr(1, 1))) {
          let rightEdge = document.createElement('i'),
            leftEdge = document.createElement('i');

          rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
          nodeDiv.appendChild(rightEdge);
          leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
          nodeDiv.appendChild(leftEdge);
        }
        if (Number(flags.substr(2, 1))) {
          let bottomEdge = document.createElement('i'),
            symbol = document.createElement('i'),
            title = nodeDiv.querySelector(':scope > .title');

          bottomEdge.setAttribute('class', 'edge verticalEdge bottomEdge fa chart-arrow-down');
          nodeDiv.appendChild(bottomEdge);
          symbol.setAttribute('class', 'fa ' + opts.parentNodeSymbol + ' symbol');
          title.insertBefore(symbol, title.children[0]);
        }
      }

      nodeDiv.addEventListener('mouseenter', that._hoverNode.bind(that));
      nodeDiv.addEventListener('mouseleave', that._hoverNode.bind(that));
      nodeDiv.addEventListener('click', that._dispatchClickEvent.bind(that));
      if (opts.draggable) {
        nodeDiv.addEventListener('dragstart', that._onDragStart.bind(that));
        nodeDiv.addEventListener('dragover', that._onDragOver.bind(that));
        nodeDiv.addEventListener('dragend', that._onDragEnd.bind(that));
        nodeDiv.addEventListener('drop', that._onDrop.bind(that));
      }
      // allow user to append dom modification after finishing node create of orgchart
      if (opts.createNode) {
        opts.createNode(nodeDiv, nodeData);
      }

      resolve(nodeDiv);
    });
  }
  buildHierarchy(appendTo, nodeData, level, callback) {
    // Construct the node
    let that = this,
      opts = this.options,
      nodeWrapper,
      childNodes = nodeData.children,
      isVerticalNode = opts.verticalDepth && (level + 1) >= opts.verticalDepth;

    if (Object.keys(nodeData).length > 1) { // if nodeData has nested structure
      nodeWrapper = isVerticalNode ? appendTo : document.createElement('table');
      if (!isVerticalNode) {
        appendTo.appendChild(nodeWrapper);
      }
      this._createNode(nodeData, level)
      .then(function (nodeDiv) {
        if (isVerticalNode) {
          nodeWrapper.insertBefore(nodeDiv, nodeWrapper.firstChild);
        } else {
          let tr = document.createElement('tr');

          tr.innerHTML = `
            <td ${childNodes ? `colspan="${childNodes.length * 2}"` : ''}>
            </td>
          `;
          tr.children[0].appendChild(nodeDiv);
          nodeWrapper.insertBefore(tr, nodeWrapper.children[0] ? nodeWrapper.children[0] : null);
        }
        if (callback) {
          callback();
        }
      })
      .catch(function (err) {
        console.error('Failed to creat node', err);
      });
    }
    // Construct the inferior nodes and connectiong lines
    if (childNodes) {
      if (Object.keys(nodeData).length === 1) { // if nodeData is just an array
        nodeWrapper = appendTo;
      }
      let isHidden,
        isVerticalLayer = opts.verticalDepth && (level + 2) >= opts.verticalDepth,
        inEdit = that.chart.dataset.inEdit;

      if (inEdit) {
        isHidden = inEdit === 'addSiblings' ? '' : ' hidden';
      } else {
        isHidden = level + 1 >= opts.depth ? ' hidden' : '';
      }

      // draw the line close to parent node
      if (!isVerticalLayer) {
        let tr = document.createElement('tr');

        tr.setAttribute('class', 'lines' + isHidden);
        tr.innerHTML = `
          <td colspan="${ childNodes.length * 2 }">
            <div class="downLine"></div>
          </td>
        `;
        nodeWrapper.appendChild(tr);
      }
      // draw the lines close to children nodes
      let lineLayer = document.createElement('tr');

      lineLayer.setAttribute('class', 'lines' + isHidden);
      lineLayer.innerHTML = `
        <td class="rightLine">&nbsp;</td>
        ${childNodes.slice(1).map(() => `
          <td class="leftLine topLine">&nbsp;</td>
          <td class="rightLine topLine">&nbsp;</td>
          `).join('')}
        <td class="leftLine">&nbsp;</td>
      `;
      let nodeLayer;

      if (isVerticalLayer) {
        nodeLayer = document.createElement('ul');
        if (isHidden) {
          nodeLayer.classList.add(isHidden.trim());
        }
        if (level + 2 === opts.verticalDepth) {
          let tr = document.createElement('tr');

          tr.setAttribute('class', 'verticalNodes' + isHidden);
          tr.innerHTML = `<td></td>`;
          tr.firstChild.appendChild(nodeLayer);
          nodeWrapper.appendChild(tr);
        } else {
          nodeWrapper.appendChild(nodeLayer);
        }
      } else {
        nodeLayer = document.createElement('tr');
        nodeLayer.setAttribute('class', 'nodes' + isHidden);
        nodeWrapper.appendChild(lineLayer);
        nodeWrapper.appendChild(nodeLayer);
      }
      // recurse through children nodes
      childNodes.forEach((child) => {
        let nodeCell;

        if (isVerticalLayer) {
          nodeCell = document.createElement('li');
        } else {
          nodeCell = document.createElement('td');
          nodeCell.setAttribute('colspan', 2);
        }
        nodeLayer.appendChild(nodeCell);
        that.buildHierarchy(nodeCell, child, level + 1, callback);
      });
    }
  }
  _clickChart(event) {
    let closestNode = this._closest(event.target, function (el) {
      return el.classList && el.classList.contains('node');
    });

    if (!closestNode && this.chart.querySelector('.node.focused')) {
      this.chart.querySelector('.node.focused').classList.remove('focused');
    }
  }
  _clickExportButton() {
    let opts = this.options,
      chartContainer = this.chartContainer,
      mask = chartContainer.querySelector(':scope > .mask'),
      sourceChart = chartContainer.querySelector('.orgchart:not(.hidden)'),
      flag = opts.direction === 'l2r' || opts.direction === 'r2l';

    if (!mask) {
      mask = document.createElement('div');
      mask.setAttribute('class', 'mask');
      mask.innerHTML = `<i class="fa fa-circle-o-notch fa-spin spinner"></i>`;
      chartContainer.appendChild(mask);
    } else {
      mask.classList.remove('hidden');
    }
    chartContainer.classList.add('canvasContainer');
    window.html2canvas(sourceChart, {
      'width': flag ? sourceChart.clientHeight : sourceChart.clientWidth,
      'height': flag ? sourceChart.clientWidth : sourceChart.clientHeight,
      'onclone': function (cloneDoc) {
        let canvasContainer = cloneDoc.querySelector('.canvasContainer');

        canvasContainer.style.overflow = 'visible';
        canvasContainer.querySelector('.orgchart:not(.hidden)').transform = '';
      }
    })
    .then((canvas) => {
      let downloadBtn = chartContainer.querySelector('.oc-download-btn');

      chartContainer.querySelector('.mask').classList.add('hidden');
      downloadBtn.setAttribute('href', canvas.toDataURL());
      downloadBtn.click();
    })
    .catch((err) => {
      console.error('Failed to export the curent orgchart!', err);
    })
    .finally(() => {
      chartContainer.classList.remove('canvasContainer');
    });
  }
  _loopChart(chart) {
    let subObj = { 'id': chart.querySelector('.node').id };

    if (chart.children[3]) {
      Array.from(chart.children[3].children).forEach((el) => {
        if (!subObj.children) { subObj.children = []; }
        subObj.children.push(this._loopChart(el.firstChild));
      });
    }
    return subObj;
  }
  getHierarchy() {
    if (!this.chart.querySelector('.node').id) {
      return 'Error: Nodes of orghcart to be exported must have id attribute!';
    }
    return this._loopChart(this.chart.querySelector('table'));
  }
  _onPanStart(event) {
    let chart = event.currentTarget;

    if (this._closest(event.target, (el) => el.classList && el.classList.contains('node')) ||
      (event.touches && event.touches.length > 1)) {
      chart.dataset.panning = false;
      return;
    }
    chart.style.cursor = 'move';
    chart.dataset.panning = true;

    let lastX = 0,
      lastY = 0,
      lastTf = window.getComputedStyle(chart).transform;

    if (lastTf !== 'none') {
      let temp = lastTf.split(',');

      if (!lastTf.includes('3d')) {
        lastX = Number.parseInt(temp[4], 10);
        lastY = Number.parseInt(temp[5], 10);
      } else {
        lastX = Number.parseInt(temp[12], 10);
        lastY = Number.parseInt(temp[13], 10);
      }
    }
    let startX = 0,
      startY = 0;

    if (!event.targetTouches) { // pan on desktop
      startX = event.pageX - lastX;
      startY = event.pageY - lastY;
    } else if (event.targetTouches.length === 1) { // pan on mobile device
      startX = event.targetTouches[0].pageX - lastX;
      startY = event.targetTouches[0].pageY - lastY;
    } else if (event.targetTouches.length > 1) {
      return;
    }
    chart.dataset.panStart = JSON.stringify({ 'startX': startX, 'startY': startY });
    chart.addEventListener('mousemove', this._onPanning.bind(this));
    chart.addEventListener('touchmove', this._onPanning.bind(this));
  }
  _onPanning(event) {
    let chart = event.currentTarget;

    if (chart.dataset.panning === 'false') {
      return;
    }
    let newX = 0,
      newY = 0,
      panStart = JSON.parse(chart.dataset.panStart),
      startX = panStart.startX,
      startY = panStart.startY;

    if (!event.targetTouches) { // pand on desktop
      newX = event.pageX - startX;
      newY = event.pageY - startY;
    } else if (event.targetTouches.length === 1) { // pan on mobile device
      newX = event.targetTouches[0].pageX - startX;
      newY = event.targetTouches[0].pageY - startY;
    } else if (event.targetTouches.length > 1) {
      return;
    }
    let lastTf = window.getComputedStyle(chart).transform;

    if (lastTf === 'none') {
      if (!lastTf.includes('3d')) {
        chart.style.transform = 'matrix(1, 0, 0, 1, ' + newX + ', ' + newY + ')';
      } else {
        chart.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + newX + ', ' + newY + ', 0, 1)';
      }
    } else {
      let matrix = lastTf.split(',');

      if (!lastTf.includes('3d')) {
        matrix[4] = newX;
        matrix[5] = newY + ')';
      } else {
        matrix[12] = newX;
        matrix[13] = newY;
      }
      chart.style.transform = matrix.join(',');
    }
  }
  _onPanEnd(event) {
    let chart = this.chart;

    if (chart.dataset.panning === 'true') {
      chart.dataset.panning = false;
      chart.style.cursor = 'default';
      document.body.removeEventListener('mousemove', this._onPanning);
      document.body.removeEventListener('touchmove', this._onPanning);
    }
  }
  _setChartScale(chart, newScale) {
    let lastTf = window.getComputedStyle(chart).transform;

    if (lastTf === 'none') {
      chart.style.transform = 'scale(' + newScale + ',' + newScale + ')';
    } else {
      let matrix = lastTf.split(',');

      if (!lastTf.includes('3d')) {
        matrix[0] = 'matrix(' + newScale;
        matrix[3] = newScale;
        chart.style.transform = lastTf + ' scale(' + newScale + ',' + newScale + ')';
      } else {
        chart.style.transform = lastTf + ' scale3d(' + newScale + ',' + newScale + ', 1)';
      }
    }
    chart.dataset.scale = newScale;
  }
  _onWheeling(event) {
    event.preventDefault();

    let newScale = event.deltaY > 0 ? 0.8 : 1.2;

    this._setChartScale(this.chart, newScale);
  }
  _getPinchDist(event) {
    return Math.sqrt((event.touches[0].clientX - event.touches[1].clientX) *
      (event.touches[0].clientX - event.touches[1].clientX) +
      (event.touches[0].clientY - event.touches[1].clientY) *
      (event.touches[0].clientY - event.touches[1].clientY));
  }
  _onTouchStart(event) {
    let chart = this.chart;

    if (event.touches && event.touches.length === 2) {
      let dist = this._getPinchDist(event);

      chart.dataset.pinching = true;
      chart.dataset.pinchDistStart = dist;
    }
  }
  _onTouchMove(event) {
    let chart = this.chart;

    if (chart.dataset.pinching) {
      let dist = this._getPinchDist(event);

      chart.dataset.pinchDistEnd = dist;
    }
  }
  _onTouchEnd(event) {
    let chart = this.chart;

    if (chart.dataset.pinching) {
      chart.dataset.pinching = false;
      let diff = chart.dataset.pinchDistEnd - chart.dataset.pinchDistStart;

      if (diff > 0) {
        this._setChartScale(chart, 1);
      } else if (diff < 0) {
        this._setChartScale(chart, -1);
      }
    }
  }
}
