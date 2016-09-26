(function(e,t){typeof define=="function"&&define.amd?define([],t):e.forge=t()})(this,function(){var e,t,n;return function(r){function v(e,t){return h.call(e,t)}function m(e,t){var n,r,i,s,o,u,a,f,c,h,p,v=t&&t.split("/"),m=l.map,g=m&&m["*"]||{};if(e&&e.charAt(0)===".")if(t){v=v.slice(0,v.length-1),e=e.split("/"),o=e.length-1,l.nodeIdCompat&&d.test(e[o])&&(e[o]=e[o].replace(d,"")),e=v.concat(e);for(c=0;c<e.length;c+=1){p=e[c];if(p===".")e.splice(c,1),c-=1;else if(p===".."){if(c===1&&(e[2]===".."||e[0]===".."))break;c>0&&(e.splice(c-1,2),c-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((v||g)&&m){n=e.split("/");for(c=n.length;c>0;c-=1){r=n.slice(0,c).join("/");if(v)for(h=v.length;h>0;h-=1){i=m[v.slice(0,h).join("/")];if(i){i=i[r];if(i){s=i,u=c;break}}}if(s)break;!a&&g&&g[r]&&(a=g[r],f=c)}!s&&a&&(s=a,u=f),s&&(n.splice(0,u,s),e=n.join("/"))}return e}function g(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function y(e){return function(t){return m(t,e)}}function b(e){return function(t){a[e]=t}}function w(e){if(v(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!v(a,e)&&!v(c,e))throw new Error("No "+e);return a[e]}function E(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function S(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice,d=/\.js$/;o=function(e,t){var n,r=E(e),i=r[0];return e=r[1],i&&(i=m(i,t),n=w(i)),i?n&&n.normalize?e=n.normalize(e,y(t)):e=m(e,t):(e=m(e,t),r=E(e),i=r[0],e=r[1],i&&(n=w(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return g(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:S(e)}}},i=function(e,t,n,i){var s,l,h,p,d,m=[],y=typeof n,E;i=i||e;if(y==="undefined"||y==="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(d=0;d<t.length;d+=1){p=o(t[d],i),l=p.f;if(l==="require")m[d]=u.require(e);else if(l==="exports")m[d]=u.exports(e),E=!0;else if(l==="module")s=m[d]=u.module(e);else if(v(a,l)||v(f,l)||v(c,l))m[d]=w(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,g(i,!0),b(l),{}),m[d]=a[l]}}h=n?n.apply(a[e],m):undefined;if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!E)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){if(typeof e=="string")return u[e]?u[e](t):w(o(e,t).f);if(!e.splice){l=e,l.deps&&s(l.deps,l.callback);if(!t)return;t.splice?(e=t,t=n,n=null):e=r}return t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s},s.config=function(e){return s(e)},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!v(a,e)&&!v(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("node_modules/almond/almond",function(){}),function(){function e(e){function n(e){this.data="",this.read=0;if(typeof e=="string")this.data=e;else if(t.isArrayBuffer(e)||t.isArrayBufferView(e)){var r=new Uint8Array(e);try{this.data=String.fromCharCode.apply(null,r)}catch(i){for(var s=0;s<r.length;++s)this.putByte(r[s])}}else if(e instanceof n||typeof e=="object"&&typeof e.data=="string"&&typeof e.read=="number")this.data=e.data,this.read=e.read;this._constructedStringLength=0}function i(e,n){n=n||{},this.read=n.readOffset||0,this.growSize=n.growSize||1024;var r=t.isArrayBuffer(e),i=t.isArrayBufferView(e);if(r||i){r?this.data=new DataView(e):this.data=new DataView(e.buffer,e.byteOffset,e.byteLength),this.write="writeOffset"in n?n.writeOffset:this.data.byteLength;return}this.data=new DataView(new ArrayBuffer(0)),this.write=0,e!==null&&e!==undefined&&this.putBytes(e),"writeOffset"in n&&(this.write=n.writeOffset)}var t=e.util=e.util||{};(function(){if(typeof process!="undefined"&&process.nextTick){t.nextTick=process.nextTick,typeof setImmediate=="function"?t.setImmediate=setImmediate:t.setImmediate=t.nextTick;return}if(typeof setImmediate=="function"){t.setImmediate=function(){return setImmediate.apply(undefined,arguments)},t.nextTick=function(e){return setImmediate(e)};return}t.setImmediate=function(e){setTimeout(e,0)};if(typeof window!="undefined"&&typeof window.postMessage=="function"){var e="forge.setImmediate",n=[];t.setImmediate=function(t){n.push(t),n.length===1&&window.postMessage(e,"*")};function r(t){if(t.source===window&&t.data===e){t.stopPropagation();var r=n.slice();n.length=0,r.forEach(function(e){e()})}}window.addEventListener("message",r,!0)}if(typeof MutationObserver!="undefined"){var i=Date.now(),s=!0,o=document.createElement("div"),n=[];(new MutationObserver(function(){var e=n.slice();n.length=0,e.forEach(function(e){e()})})).observe(o,{attributes:!0});var u=t.setImmediate;t.setImmediate=function(e){Date.now()-i>15?(i=Date.now(),u(e)):(n.push(e),n.length===1&&o.setAttribute("a",s=!s))}}t.nextTick=t.setImmediate})(),t.isArray=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},t.isArrayBuffer=function(e){return typeof ArrayBuffer!="undefined"&&e instanceof ArrayBuffer},t.isArrayBufferView=function(e){return e&&t.isArrayBuffer(e.buffer)&&e.byteLength!==undefined},t.ByteBuffer=n,t.ByteStringBuffer=n;var r=4096;t.ByteStringBuffer.prototype._optimizeConstructedString=function(e){this._constructedStringLength+=e,this._constructedStringLength>r&&(this.data.substr(0,1),this._constructedStringLength=0)},t.ByteStringBuffer.prototype.length=function(){return this.data.length-this.read},t.ByteStringBuffer.prototype.isEmpty=function(){return this.length()<=0},t.ByteStringBuffer.prototype.putByte=function(e){return this.putBytes(String.fromCharCode(e))},t.ByteStringBuffer.prototype.fillWithByte=function(e,t){e=String.fromCharCode(e);var n=this.data;while(t>0)t&1&&(n+=e),t>>>=1,t>0&&(e+=e);return this.data=n,this._optimizeConstructedString(t),this},t.ByteStringBuffer.prototype.putBytes=function(e){return this.data+=e,this._optimizeConstructedString(e.length),this},t.ByteStringBuffer.prototype.putString=function(e){return this.putBytes(t.encodeUtf8(e))},t.ByteStringBuffer.prototype.putInt16=function(e){return this.putBytes(String.fromCharCode(e>>8&255)+String.fromCharCode(e&255))},t.ByteStringBuffer.prototype.putInt24=function(e){return this.putBytes(String.fromCharCode(e>>16&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(e&255))},t.ByteStringBuffer.prototype.putInt32=function(e){return this.putBytes(String.fromCharCode(e>>24&255)+String.fromCharCode(e>>16&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(e&255))},t.ByteStringBuffer.prototype.putInt16Le=function(e){return this.putBytes(String.fromCharCode(e&255)+String.fromCharCode(e>>8&255))},t.ByteStringBuffer.prototype.putInt24Le=function(e){return this.putBytes(String.fromCharCode(e&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(e>>16&255))},t.ByteStringBuffer.prototype.putInt32Le=function(e){return this.putBytes(String.fromCharCode(e&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(e>>16&255)+String.fromCharCode(e>>24&255))},t.ByteStringBuffer.prototype.putInt=function(e,t){var n="";do t-=8,n+=String.fromCharCode(e>>t&255);while(t>0);return this.putBytes(n)},t.ByteStringBuffer.prototype.putSignedInt=function(e,t){return e<0&&(e+=2<<t-1),this.putInt(e,t)},t.ByteStringBuffer.prototype.putBuffer=function(e){return this.putBytes(e.getBytes())},t.ByteStringBuffer.prototype.getByte=function(){return this.data.charCodeAt(this.read++)},t.ByteStringBuffer.prototype.getInt16=function(){var e=this.data.charCodeAt(this.read)<<8^this.data.charCodeAt(this.read+1);return this.read+=2,e},t.ByteStringBuffer.prototype.getInt24=function(){var e=this.data.charCodeAt(this.read)<<16^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2);return this.read+=3,e},t.ByteStringBuffer.prototype.getInt32=function(){var e=this.data.charCodeAt(this.read)<<24^this.data.charCodeAt(this.read+1)<<16^this.data.charCodeAt(this.read+2)<<8^this.data.charCodeAt(this.read+3);return this.read+=4,e},t.ByteStringBuffer.prototype.getInt16Le=function(){var e=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8;return this.read+=2,e},t.ByteStringBuffer.prototype.getInt24Le=function(){var e=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2)<<16;return this.read+=3,e},t.ByteStringBuffer.prototype.getInt32Le=function(){var e=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2)<<16^this.data.charCodeAt(this.read+3)<<24;return this.read+=4,e},t.ByteStringBuffer.prototype.getInt=function(e){var t=0;do t=(t<<8)+this.data.charCodeAt(this.read++),e-=8;while(e>0);return t},t.ByteStringBuffer.prototype.getSignedInt=function(e){var t=this.getInt(e),n=2<<e-2;return t>=n&&(t-=n<<1),t},t.ByteStringBuffer.prototype.getBytes=function(e){var t;return e?(e=Math.min(this.length(),e),t=this.data.slice(this.read,this.read+e),this.read+=e):e===0?t="":(t=this.read===0?this.data:this.data.slice(this.read),this.clear()),t},t.ByteStringBuffer.prototype.bytes=function(e){return typeof e=="undefined"?this.data.slice(this.read):this.data.slice(this.read,this.read+e)},t.ByteStringBuffer.prototype.at=function(e){return this.data.charCodeAt(this.read+e)},t.ByteStringBuffer.prototype.setAt=function(e,t){return this.data=this.data.substr(0,this.read+e)+String.fromCharCode(t)+this.data.substr(this.read+e+1),this},t.ByteStringBuffer.prototype.last=function(){return this.data.charCodeAt(this.data.length-1)},t.ByteStringBuffer.prototype.copy=function(){var e=t.createBuffer(this.data);return e.read=this.read,e},t.ByteStringBuffer.prototype.compact=function(){return this.read>0&&(this.data=this.data.slice(this.read),this.read=0),this},t.ByteStringBuffer.prototype.clear=function(){return this.data="",this.read=0,this},t.ByteStringBuffer.prototype.truncate=function(e){var t=Math.max(0,this.length()-e);return this.data=this.data.substr(this.read,t),this.read=0,this},t.ByteStringBuffer.prototype.toHex=function(){var e="";for(var t=this.read;t<this.data.length;++t){var n=this.data.charCodeAt(t);n<16&&(e+="0"),e+=n.toString(16)}return e},t.ByteStringBuffer.prototype.toString=function(){return t.decodeUtf8(this.bytes())},t.DataBuffer=i,t.DataBuffer.prototype.length=function(){return this.write-this.read},t.DataBuffer.prototype.isEmpty=function(){return this.length()<=0},t.DataBuffer.prototype.accommodate=function(e,t){if(this.length()>=e)return this;t=Math.max(t||this.growSize,e);var n=new Uint8Array(this.data.buffer,this.data.byteOffset,this.data.byteLength),r=new Uint8Array(this.length()+t);return r.set(n),this.data=new DataView(r.buffer),this},t.DataBuffer.prototype.putByte=function(e){return this.accommodate(1),this.data.setUint8(this.write++,e),this},t.DataBuffer.prototype.fillWithByte=function(e,t){this.accommodate(t);for(var n=0;n<t;++n)this.data.setUint8(e);return this},t.DataBuffer.prototype.putBytes=function(e,n){if(t.isArrayBufferView(e)){var r=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),i=r.byteLength-r.byteOffset;this.accommodate(i);var s=new Uint8Array(this.data.buffer,this.write);return s.set(r),this.write+=i,this}if(t.isArrayBuffer(e)){var r=new Uint8Array(e);this.accommodate(r.byteLength);var s=new Uint8Array(this.data.buffer);return s.set(r,this.write),this.write+=r.byteLength,this}if(e instanceof t.DataBuffer||typeof e=="object"&&typeof e.read=="number"&&typeof e.write=="number"&&t.isArrayBufferView(e.data)){var r=new Uint8Array(e.data.byteLength,e.read,e.length());this.accommodate(r.byteLength);var s=new Uint8Array(e.data.byteLength,this.write);return s.set(r),this.write+=r.byteLength,this}e instanceof t.ByteStringBuffer&&(e=e.data,n="binary"),n=n||"binary";if(typeof e=="string"){var o;if(n==="hex")return this.accommodate(Math.ceil(e.length/2)),o=new Uint8Array(this.data.buffer,this.write),this.write+=t.binary.hex.decode(e,o,this.write),this;if(n==="base64")return this.accommodate(Math.ceil(e.length/4)*3),o=new Uint8Array(this.data.buffer,this.write),this.write+=t.binary.base64.decode(e,o,this.write),this;n==="utf8"&&(e=t.encodeUtf8(e),n="binary");if(n==="binary"||n==="raw")return this.accommodate(e.length),o=new Uint8Array(this.data.buffer,this.write),this.write+=t.binary.raw.decode(o),this;if(n==="utf16")return this.accommodate(e.length*2),o=new Uint16Array(this.data.buffer,this.write),this.write+=t.text.utf16.encode(o),this;throw new Error("Invalid encoding: "+n)}throw Error("Invalid parameter: "+e)},t.DataBuffer.prototype.putBuffer=function(e){return this.putBytes(e),e.clear(),this},t.DataBuffer.prototype.putString=function(e){return this.putBytes(e,"utf16")},t.DataBuffer.prototype.putInt16=function(e){return this.accommodate(2),this.data.setInt16(this.write,e),this.write+=2,this},t.DataBuffer.prototype.putInt24=function(e){return this.accommodate(3),this.data.setInt16(this.write,e>>8&65535),this.data.setInt8(this.write,e>>16&255),this.write+=3,this},t.DataBuffer.prototype.putInt32=function(e){return this.accommodate(4),this.data.setInt32(this.write,e),this.write+=4,this},t.DataBuffer.prototype.putInt16Le=function(e){return this.accommodate(2),this.data.setInt16(this.write,e,!0),this.write+=2,this},t.DataBuffer.prototype.putInt24Le=function(e){return this.accommodate(3),this.data.setInt8(this.write,e>>16&255),this.data.setInt16(this.write,e>>8&65535,!0),this.write+=3,this},t.DataBuffer.prototype.putInt32Le=function(e){return this.accommodate(4),this.data.setInt32(this.write,e,!0),this.write+=4,this},t.DataBuffer.prototype.putInt=function(e,t){this.accommodate(t/8);do t-=8,this.data.setInt8(this.write++,e>>t&255);while(t>0);return this},t.DataBuffer.prototype.putSignedInt=function(e,t){return this.accommodate(t/8),e<0&&(e+=2<<t-1),this.putInt(e,t)},t.DataBuffer.prototype.getByte=function(){return this.data.getInt8(this.read++)},t.DataBuffer.prototype.getInt16=function(){var e=this.data.getInt16(this.read);return this.read+=2,e},t.DataBuffer.prototype.getInt24=function(){var e=this.data.getInt16(this.read)<<8^this.data.getInt8(this.read+2);return this.read+=3,e},t.DataBuffer.prototype.getInt32=function(){var e=this.data.getInt32(this.read);return this.read+=4,e},t.DataBuffer.prototype.getInt16Le=function(){var e=this.data.getInt16(this.read,!0);return this.read+=2,e},t.DataBuffer.prototype.getInt24Le=function(){var e=this.data.getInt8(this.read)^this.data.getInt16(this.read+1,!0)<<8;return this.read+=3,e},t.DataBuffer.prototype.getInt32Le=function(){var e=this.data.getInt32(this.read,!0);return this.read+=4,e},t.DataBuffer.prototype.getInt=function(e){var t=0;do t=(t<<8)+this.data.getInt8(this.read++),e-=8;while(e>0);return t},t.DataBuffer.prototype.getSignedInt=function(e){var t=this.getInt(e),n=2<<e-2;return t>=n&&(t-=n<<1),t},t.DataBuffer.prototype.getBytes=function(e){var t;return e?(e=Math.min(this.length(),e),t=this.data.slice(this.read,this.read+e),this.read+=e):e===0?t="":(t=this.read===0?this.data:this.data.slice(this.read),this.clear()),t},t.DataBuffer.prototype.bytes=function(e){return typeof e=="undefined"?this.data.slice(this.read):this.data.slice(this.read,this.read+e)},t.DataBuffer.prototype.at=function(e){return this.data.getUint8(this.read+e)},t.DataBuffer.prototype.setAt=function(e,t){return this.data.setUint8(e,t),this},t.DataBuffer.prototype.last=function(){return this.data.getUint8(this.write-1)},t.DataBuffer.prototype.copy=function(){return new t.DataBuffer(this)},t.DataBuffer.prototype.compact=function(){if(this.read>0){var e=new Uint8Array(this.data.buffer,this.read),t=new Uint8Array(e.byteLength);t.set(e),this.data=new DataView(t),this.write-=this.read,this.read=0}return this},t.DataBuffer.prototype.clear=function(){return this.data=new DataView(new ArrayBuffer(0)),this.read=this.write=0,this},t.DataBuffer.prototype.truncate=function(e){return this.write=Math.max(0,this.length()-e),this.read=Math.min(this.read,this.write),this},t.DataBuffer.prototype.toHex=function(){var e="";for(var t=this.read;t<this.data.byteLength;++t){var n=this.data.getUint8(t);n<16&&(e+="0"),e+=n.toString(16)}return e},t.DataBuffer.prototype.toString=function(e){var n=new Uint8Array(this.data,this.read,this.length());e=e||"utf8";if(e==="binary"||e==="raw")return t.binary.raw.encode(n);if(e==="hex")return t.binary.hex.encode(n);if(e==="base64")return t.binary.base64.encode(n);if(e==="utf8")return t.text.utf8.decode(n);if(e==="utf16")return t.text.utf16.decode(n);throw new Error("Invalid encoding: "+e)},t.createBuffer=function(e,n){return n=n||"raw",e!==undefined&&n==="utf8"&&(e=t.encodeUtf8(e)),new t.ByteBuffer(e)},t.fillString=function(e,t){var n="";while(t>0)t&1&&(n+=e),t>>>=1,t>0&&(e+=e);return n},t.xorBytes=function(e,t,n){var r="",i="",s="",o=0,u=0;for(;n>0;--n,++o)i=e.charCodeAt(o)^t.charCodeAt(o),u>=10&&(r+=s,s="",u=0),s+=String.fromCharCode(i),++u;return r+=s,r},t.hexToBytes=function(e){var t="",n=0;e.length&!0&&(n=1,t+=String.fromCharCode(parseInt(e[0],16)));for(;n<e.length;n+=2)t+=String.fromCharCode(parseInt(e.substr(n,2),16));return t},t.bytesToHex=function(e){return t.createBuffer(e).toHex()},t.int32ToBytes=function(e){return String.fromCharCode(e>>24&255)+String.fromCharCode(e>>16&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(e&255)};var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=[62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,64,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];t.encode64=function(e,t){var n="",r="",i,o,u,a=0;while(a<e.length)i=e.charCodeAt(a++),o=e.charCodeAt(a++),u=e.charCodeAt(a++),n+=s.charAt(i>>2),n+=s.charAt((i&3)<<4|o>>4),isNaN(o)?n+="==":(n+=s.charAt((o&15)<<2|u>>6),n+=isNaN(u)?"=":s.charAt(u&63)),t&&n.length>t&&(r+=n.substr(0,t)+"\r\n",n=n.substr(t));return r+=n,r},t.decode64=function(e){e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");var t="",n,r,i,s,u=0;while(u<e.length)n=o[e.charCodeAt(u++)-43],r=o[e.charCodeAt(u++)-43],i=o[e.charCodeAt(u++)-43],s=o[e.charCodeAt(u++)-43],t+=String.fromCharCode(n<<2|r>>4),i!==64&&(t+=String.fromCharCode((r&15)<<4|i>>2),s!==64&&(t+=String.fromCharCode((i&3)<<6|s)));return t},t.encodeUtf8=function(e){return unescape(encodeURIComponent(e))},t.decodeUtf8=function(e){return decodeURIComponent(escape(e))},t.binary={raw:{},hex:{},base64:{}},t.binary.raw.encode=function(e){return String.fromCharCode.apply(null,e)},t.binary.raw.decode=function(e,t,n){var r=t;r||(r=new Uint8Array(e.length)),n=n||0;var i=n;for(var s=0;s<e.length;++s)r[i++]=e.charCodeAt(s);return t?i-n:r},t.binary.hex.encode=t.bytesToHex,t.binary.hex.decode=function(e,t,n){var r=t;r||(r=new Uint8Array(Math.ceil(e.length/2))),n=n||0;var i=0,s=n;e.length&1&&(i=1,r[s++]=parseInt(e[0],16));for(;i<e.length;i+=2)r[s++]=parseInt(e.substr(i,2),16);return t?s-n:r},t.binary.base64.encode=function(e,t){var n="",r="",i,o,u,a=0;while(a<e.byteLength)i=e[a++],o=e[a++],u=e[a++],n+=s.charAt(i>>2),n+=s.charAt((i&3)<<4|o>>4),isNaN(o)?n+="==":(n+=s.charAt((o&15)<<2|u>>6),n+=isNaN(u)?"=":s.charAt(u&63)),t&&n.length>t&&(r+=n.substr(0,t)+"\r\n",n=n.substr(t));return r+=n,r},t.binary.base64.decode=function(e,t,n){var r=t;r||(r=new Uint8Array(Math.ceil(e.length/4)*3)),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,""),n=n||0;var i,s,u,a,f=0,l=n;while(f<e.length)i=o[e.charCodeAt(f++)-43],s=o[e.charCodeAt(f++)-43],u=o[e.charCodeAt(f++)-43],a=o[e.charCodeAt(f++)-43],r[l++]=i<<2|s>>4,u!==64&&(r[l++]=(s&15)<<4|u>>2,a!==64&&(r[l++]=(u&3)<<6|a));return t?l-n:r.subarray(0,l)},t.text={utf8:{},utf16:{}},t.text.utf8.encode=function(e,n,r){e=t.encodeUtf8(e);var i=n;i||(i=new Uint8Array(e.length)),r=r||0;var s=r;for(var o=0;o<e.length;++o)i[s++]=e.charCodeAt(o);return n?s-r:i},t.text.utf8.decode=function(e){return t.decodeUtf8(String.fromCharCode.apply(null,e))},t.text.utf16.encode=function(e,t,n){var r=t;r||(r=new Uint8Array(e.length*2));var i=new Uint16Array(r.buffer);n=n||0;var s=n,o=n;for(var u=0;u<e.length;++u)i[o++]=e.charCodeAt(u),s+=2;return t?s-n:r},t.text.utf16.decode=function(e){return String.fromCharCode.apply(null,new Uint16Array(e.buffer))},t.deflate=function(e,n,r){n=t.decode64(e.deflate(t.encode64(n)).rval);if(r){var i=2,s=n.charCodeAt(1);s&32&&(i=6),n=n.substring(i,n.length-4)}return n},t.inflate=function(e,n,r){var i=e.inflate(t.encode64(n)).rval;return i===null?null:t.decode64(i)};var u=function(e,n,r){if(!e)throw new Error("WebStorage not available.");var i;r===null?i=e.removeItem(n):(r=t.encode64(JSON.stringify(r)),i=e.setItem(n,r));if(typeof i!="undefined"&&i.rval!==!0){var s=new Error(i.error.message);throw s.id=i.error.id,s.name=i.error.name,s}},a=function(e,n){if(!e)throw new Error("WebStorage not available.");var r=e.getItem(n);if(e.init)if(r.rval===null){if(r.error){var i=new Error(r.error.message);throw i.id=r.error.id,i.name=r.error.name,i}r=null}else r=r.rval;return r!==null&&(r=JSON.parse(t.decode64(r))),r},f=function(e,t,n,r){var i=a(e,t);i===null&&(i={}),i[n]=r,u(e,t,i)},l=function(e,t,n){var r=a(e,t);return r!==null&&(r=n in r?r[n]:null),r},c=function(e,t,n){var r=a(e,t);if(r!==null&&n in r){delete r[n];var i=!0;for(var s in r){i=!1;break}i&&(r=null),u(e,t,r)}},h=function(e,t){u(e,t,null)},p=function(e,t,n){var r=null;typeof n=="undefined"&&(n=["web","flash"]);var i,s=!1,o=null;for(var u in n){i=n[u];try{if(i==="flash"||i==="both"){if(t[0]===null)throw new Error("Flash local storage not available.");r=e.apply(this,t),s=i==="flash"}if(i==="web"||i==="both")t[0]=localStorage,r=e.apply(this,t),s=!0}catch(a){o=a}if(s)break}if(!s)throw o;return r};t.setItem=function(e,t,n,r,i){p(f,arguments,i)},t.getItem=function(e,t,n,r){return p(l,arguments,r)},t.removeItem=function(e,t,n,r){p(c,arguments,r)},t.clearItems=function(e,t,n){p(h,arguments,n)},t.parseUrl=function(e){var t=/^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;t.lastIndex=0;var n=t.exec(e),r=n===null?null:{full:e,scheme:n[1],host:n[2],port:n[3],path:n[4]};return r&&(r.fullHost=r.host,r.port?r.port!==80&&r.scheme==="http"?r.fullHost+=":"+r.port:r.port!==443&&r.scheme==="https"&&(r.fullHost+=":"+r.port):r.scheme==="http"?r.port=80:r.scheme==="https"&&(r.port=443),r.full=r.scheme+"://"+r.fullHost),r};var d=null;t.getQueryVariables=function(e){var t=function(e){var t={},n=e.split("&");for(var r=0;r<n.length;r++){var i=n[r].indexOf("="),s,o;i>0?(s=n[r].substring(0,i),o=n[r].substring(i+1)):(s=n[r],o=null),s in t||(t[s]=[]),!(s in Object.prototype)&&o!==null&&t[s].push(unescape(o))}return t},n;return typeof e=="undefined"?(d===null&&(typeof window!="undefined"&&window.location&&window.location.search?d=t(window.location.search.substring(1)):d={}),n=d):n=t(e),n},t.parseFragment=function(e){var n=e,r="",i=e.indexOf("?");i>0&&(n=e.substring(0,i),r=e.substring(i+1));var s=n.split("/");s.length>0&&s[0]===""&&s.shift();var o=r===""?{}:t.getQueryVariables(r);return{pathString:n,queryString:r,path:s,query:o}},t.makeRequest=function(e){var n=t.parseFragment(e),r={path:n.pathString,query:n.queryString,getPath:function(e){return typeof e=="undefined"?n.path:n.path[e]},getQuery:function(e,t){var r;return typeof e=="undefined"?r=n.query:(r=n.query[e],r&&typeof t!="undefined"&&(r=r[t])),r},getQueryLast:function(e,t){var n,i=r.getQuery(e);return i?n=i[i.length-1]:n=t,n}};return r},t.makeLink=function(e,t,n){e=jQuery.isArray(e)?e.join("/"):e;var r=jQuery.param(t||{});return n=n||"",e+(r.length>0?"?"+r:"")+(n.length>0?"#"+n:"")},t.setPath=function(e,t,n){if(typeof e=="object"&&e!==null){var r=0,i=t.length;while(r<i){var s=t[r++];if(r==i)e[s]=n;else{var o=s in e;if(!o||o&&typeof e[s]!="object"||o&&e[s]===null)e[s]={};e=e[s]}}}},t.getPath=function(e,t,n){var r=0,i=t.length,s=!0;while(s&&r<i&&typeof e=="object"&&e!==null){var o=t[r++];s=o in e,s&&(e=e[o])}return s?e:n},t.deletePath=function(e,t){if(typeof e=="object"&&e!==null){var n=0,r=t.length;while(n<r){var i=t[n++];if(n==r)delete e[i];else{if(!(i in e&&typeof e[i]=="object"&&e[i]!==null))break;e=e[i]}}}},t.isEmpty=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},t.format=function(e){var t=/%./g,n,r,i=0,s=[],o=0;while(n=t.exec(e)){r=e.substring(o,t.lastIndex-2),r.length>0&&s.push(r),o=t.lastIndex;var u=n[0][1];switch(u){case"s":case"o":i<arguments.length?s.push(arguments[i++ +1]):s.push("<?>");break;case"%":s.push("%");break;default:s.push("<%"+u+"?>")}}return s.push(e.substring(o)),s.join("")},t.formatNumber=function(e,t,n,r){var i=e,s=isNaN(t=Math.abs(t))?2:t,o=n===undefined?",":n,u=r===undefined?".":r,a=i<0?"-":"",f=parseInt(i=Math.abs(+i||0).toFixed(s),10)+"",l=f.length>3?f.length%3:0;return a+(l?f.substr(0,l)+u:"")+f.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+u)+(s?o+Math.abs(i-f).toFixed(s).slice(2):"")},t.formatSize=function(e){return e>=1073741824?e=t.formatNumber(e/1073741824,2,".","")+" GiB":e>=1048576?e=t.formatNumber(e/1048576,2,".","")+" MiB":e>=1024?e=t.formatNumber(e/1024,0)+" KiB":e=t.formatNumber(e,0)+" bytes",e},t.bytesFromIP=function(e){return e.indexOf(".")!==-1?t.bytesFromIPv4(e):e.indexOf(":")!==-1?t.bytesFromIPv6(e):null},t.bytesFromIPv4=function(e){e=e.split(".");if(e.length!==4)return null;var n=t.createBuffer();for(var r=0;r<e.length;++r){var i=parseInt(e[r],10);if(isNaN(i))return null;n.putByte(i)}return n.getBytes()},t.bytesFromIPv6=function(e){var n=0;e=e.split(":").filter(function(e){return e.length===0&&++n,!0});var r=(8-e.length+n)*2,i=t.createBuffer();for(var s=0;s<8;++s){if(!e[s]||e[s].length===0){i.fillWithByte(0,r),r=0;continue}var o=t.hexToBytes(e[s]);o.length<2&&i.putByte(0),i.putBytes(o)}return i.getBytes()},t.bytesToIP=function(e){return e.length===4?t.bytesToIPv4(e):e.length===16?t.bytesToIPv6(e):null},t.bytesToIPv4=function(e){if(e.length!==4)return null;var t=[];for(var n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t.join(".")},t.bytesToIPv6=function(e){if(e.length!==16)return null;var n=[],r=[],i=0;for(var s=0;s<e.length;s+=2){var o=t.bytesToHex(e[s]+e[s+1]);while(o[0]==="0"&&o!=="0")o=o.substr(1);if(o==="0"){var u=r[r.length-1],a=n.length;!u||a!==u.end+1?r.push({start:a,end:a}):(u.end=a,u.end-u.start>r[i].end-r[i].start&&(i=r.length-1))}n.push(o)}if(r.length>0){var f=r[i];f.end-f.start>0&&(n.splice(f.start,f.end-f.start+1,""),f.start===0&&n.unshift(""),f.end===7&&n.push(""))}return n.join(":")},t.estimateCores=function(e,n){function i(e,u,a){if(u===0){var f=Math.floor(e.reduce(function(e,t){return e+t},0)/e.length);return t.cores=Math.max(1,f),URL.revokeObjectURL(r),n(null,t.cores)}s(a,function(t,n){e.push(o(a,n)),i(e,u-1,a)})}function s(e,t){var n=[],i=[];for(var s=0;s<e;++s){var o=new Worker(r);o.addEventListener("message",function(r){i.push(r.data);if(i.length===e){for(var s=0;s<e;++s)n[s].terminate();t(null,i)}}),n.push(o)}for(var s=0;s<e;++s)n[s].postMessage(s)}function o(e,t){var n=[];for(var r=0;r<e;++r){var i=t[r],s=n[r]=[];for(var o=0;o<e;++o){if(r===o)continue;var u=t[o];(i.st>u.st&&i.st<u.et||u.st>i.st&&u.st<i.et)&&s.push(o)}}return n.reduce(function(e,t){return Math.max(e,t.length)},0)}typeof e=="function"&&(n=e,e={}),e=e||{};if("cores"in t&&!e.update)return n(null,t.cores);if(typeof navigator!="undefined"&&"hardwareConcurrency"in navigator&&navigator.hardwareConcurrency>0)return t.cores=navigator.hardwareConcurrency,n(null,t.cores);if(typeof Worker=="undefined")return t.cores=1,n(null,t.cores);if(typeof Blob=="undefined")return t.cores=2,n(null,t.cores);var r=URL.createObjectURL(new Blob(["(",function(){self.addEventListener("message",function(e){var t=Date.now(),n=t+4;while(Date.now()<n);self.postMessage({st:t,et:n})})}.toString(),")()"],{type:"application/javascript"}));i([],5,16)}}var r="util";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/util",["require","module"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){e.cipher=e.cipher||{},e.cipher.algorithms=e.cipher.algorithms||{},e.cipher.createCipher=function(t,n){var r=t;typeof r=="string"&&(r=e.cipher.getAlgorithm(r),r&&(r=r()));if(!r)throw new Error("Unsupported algorithm: "+t);return new e.cipher.BlockCipher({algorithm:r,key:n,decrypt:!1})},e.cipher.createDecipher=function(t,n){var r=t;typeof r=="string"&&(r=e.cipher.getAlgorithm(r),r&&(r=r()));if(!r)throw new Error("Unsupported algorithm: "+t);return new e.cipher.BlockCipher({algorithm:r,key:n,decrypt:!0})},e.cipher.registerAlgorithm=function(t,n){t=t.toUpperCase(),e.cipher.algorithms[t]=n},e.cipher.getAlgorithm=function(t){return t=t.toUpperCase(),t in e.cipher.algorithms?e.cipher.algorithms[t]:null};var t=e.cipher.BlockCipher=function(e){this.algorithm=e.algorithm,this.mode=this.algorithm.mode,this.blockSize=this.mode.blockSize,this._finish=!1,this._input=null,this.output=null,this._op=e.decrypt?this.mode.decrypt:this.mode.encrypt,this._decrypt=e.decrypt,this.algorithm.initialize(e)};t.prototype.start=function(t){t=t||{};var n={};for(var r in t)n[r]=t[r];n.decrypt=this._decrypt,this._finish=!1,this._input=e.util.createBuffer(),this.output=t.output||e.util.createBuffer(),this.mode.start(n)},t.prototype.update=function(e){e&&this._input.putBuffer(e);while(!this._op.call(this.mode,this._input,this.output,this._finish)&&!this._finish);this._input.compact()},t.prototype.finish=function(e){e&&(this.mode.name==="ECB"||this.mode.name==="CBC")&&(this.mode.pad=function(t){return e(this.blockSize,t,!1)},this.mode.unpad=function(t){return e(this.blockSize,t,!0)});var t={};return t.decrypt=this._decrypt,t.overflow=this._input.length()%this.blockSize,!this._decrypt&&this.mode.pad&&!this.mode.pad(this._input,t)?!1:(this._finish=!0,this.update(),this._decrypt&&this.mode.unpad&&!this.mode.unpad(this.output,t)?!1:this.mode.afterFinish&&!this.mode.afterFinish(this.output,t)?!1:!0)}}var r="cipher";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/cipher",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function n(t){typeof t=="string"&&(t=e.util.createBuffer(t));if(e.util.isArray(t)&&t.length>4){var n=t;t=e.util.createBuffer();for(var r=0;r<n.length;++r)t.putByte(n[r])}return e.util.isArray(t)||(t=[t.getInt32(),t.getInt32(),t.getInt32(),t.getInt32()]),t}function r(e){e[e.length-1]=e[e.length-1]+1&4294967295}function i(e){return[e/4294967296|0,e&4294967295]}e.cipher=e.cipher||{};var t=e.cipher.modes=e.cipher.modes||{};t.ecb=function(e){e=e||{},this.name="ECB",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=new Array(this._ints),this._outBlock=new Array(this._ints)},t.ecb.prototype.start=function(e){},t.ecb.prototype.encrypt=function(e,t,n){if(e.length()<this.blockSize&&!(n&&e.length()>0))return!0;for(var r=0;r<this._ints;++r)this._inBlock[r]=e.getInt32();this.cipher.encrypt(this._inBlock,this._outBlock);for(var r=0;r<this._ints;++r)t.putInt32(this._outBlock[r])},t.ecb.prototype.decrypt=function(e,t,n){if(e.length()<this.blockSize&&!(n&&e.length()>0))return!0;for(var r=0;r<this._ints;++r)this._inBlock[r]=e.getInt32();this.cipher.decrypt(this._inBlock,this._outBlock);for(var r=0;r<this._ints;++r)t.putInt32(this._outBlock[r])},t.ecb.prototype.pad=function(e,t){var n=e.length()===this.blockSize?this.blockSize:this.blockSize-e.length();return e.fillWithByte(n,n),!0},t.ecb.prototype.unpad=function(e,t){if(t.overflow>0)return!1;var n=e.length(),r=e.at(n-1);return r>this.blockSize<<2?!1:(e.truncate(r),!0)},t.cbc=function(e){e=e||{},this.name="CBC",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=new Array(this._ints),this._outBlock=new Array(this._ints)},t.cbc.prototype.start=function(e){if(e.iv===null){if(!this._prev)throw new Error("Invalid IV parameter.");this._iv=this._prev.slice(0)}else{if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=n(e.iv),this._prev=this._iv.slice(0)}},t.cbc.prototype.encrypt=function(e,t,n){if(e.length()<this.blockSize&&!(n&&e.length()>0))return!0;for(var r=0;r<this._ints;++r)this._inBlock[r]=this._prev[r]^e.getInt32();this.cipher.encrypt(this._inBlock,this._outBlock);for(var r=0;r<this._ints;++r)t.putInt32(this._outBlock[r]);this._prev=this._outBlock},t.cbc.prototype.decrypt=function(e,t,n){if(e.length()<this.blockSize&&!(n&&e.length()>0))return!0;for(var r=0;r<this._ints;++r)this._inBlock[r]=e.getInt32();this.cipher.decrypt(this._inBlock,this._outBlock);for(var r=0;r<this._ints;++r)t.putInt32(this._prev[r]^this._outBlock[r]);this._prev=this._inBlock.slice(0)},t.cbc.prototype.pad=function(e,t){var n=e.length()===this.blockSize?this.blockSize:this.blockSize-e.length();return e.fillWithByte(n,n),!0},t.cbc.prototype.unpad=function(e,t){if(t.overflow>0)return!1;var n=e.length(),r=e.at(n-1);return r>this.blockSize<<2?!1:(e.truncate(r),!0)},t.cfb=function(t){t=t||{},this.name="CFB",this.cipher=t.cipher,this.blockSize=t.blockSize||16,this._ints=this.blockSize/4,this._inBlock=null,this._outBlock=new Array(this._ints),this._partialBlock=new Array(this._ints),this._partialOutput=e.util.createBuffer(),this._partialBytes=0},t.cfb.prototype.start=function(e){if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=n(e.iv),this._inBlock=this._iv.slice(0),this._partialBytes=0},t.cfb.prototype.encrypt=function(e,t,n){var r=e.length();if(r===0)return!0;this.cipher.encrypt(this._inBlock,this._outBlock);if(this._partialBytes===0&&r>=this.blockSize){for(var i=0;i<this._ints;++i)this._inBlock[i]=e.getInt32()^this._outBlock[i],t.putInt32(this._inBlock[i]);return}var s=(this.blockSize-r)%this.blockSize;s>0&&(s=this.blockSize-s),this._partialOutput.clear();for(var i=0;i<this._ints;++i)this._partialBlock[i]=e.getInt32()^this._outBlock[i],this._partialOutput.putInt32(this._partialBlock[i]);if(s>0)e.read-=this.blockSize;else for(var i=0;i<this._ints;++i)this._inBlock[i]=this._partialBlock[i];this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes);if(s>0&&!n)return t.putBytes(this._partialOutput.getBytes(s-this._partialBytes)),this._partialBytes=s,!0;t.putBytes(this._partialOutput.getBytes(r-this._partialBytes)),this._partialBytes=0},t.cfb.prototype.decrypt=function(e,t,n){var r=e.length();if(r===0)return!0;this.cipher.encrypt(this._inBlock,this._outBlock);if(this._partialBytes===0&&r>=this.blockSize){for(var i=0;i<this._ints;++i)this._inBlock[i]=e.getInt32(),t.putInt32(this._inBlock[i]^this._outBlock[i]);return}var s=(this.blockSize-r)%this.blockSize;s>0&&(s=this.blockSize-s),this._partialOutput.clear();for(var i=0;i<this._ints;++i)this._partialBlock[i]=e.getInt32(),this._partialOutput.putInt32(this._partialBlock[i]^this._outBlock[i]);if(s>0)e.read-=this.blockSize;else for(var i=0;i<this._ints;++i)this._inBlock[i]=this._partialBlock[i];this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes);if(s>0&&!n)return t.putBytes(this._partialOutput.getBytes(s-this._partialBytes)),this._partialBytes=s,!0;t.putBytes(this._partialOutput.getBytes(r-this._partialBytes)),this._partialBytes=0},t.ofb=function(t){t=t||{},this.name="OFB",this.cipher=t.cipher,this.blockSize=t.blockSize||16,this._ints=this.blockSize/4,this._inBlock=null,this._outBlock=new Array(this._ints),this._partialOutput=e.util.createBuffer(),this._partialBytes=0},t.ofb.prototype.start=function(e){if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=n(e.iv),this._inBlock=this._iv.slice(0),this._partialBytes=0},t.ofb.prototype.encrypt=function(e,t,n){var r=e.length();if(e.length()===0)return!0;this.cipher.encrypt(this._inBlock,this._outBlock);if(this._partialBytes===0&&r>=this.blockSize){for(var i=0;i<this._ints;++i)t.putInt32(e.getInt32()^this._outBlock[i]),this._inBlock[i]=this._outBlock[i];return}var s=(this.blockSize-r)%this.blockSize;s>0&&(s=this.blockSize-s),this._partialOutput.clear();for(var i=0;i<this._ints;++i)this._partialOutput.putInt32(e.getInt32()^this._outBlock[i]);if(s>0)e.read-=this.blockSize;else for(var i=0;i<this._ints;++i)this._inBlock[i]=this._outBlock[i];this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes);if(s>0&&!n)return t.putBytes(this._partialOutput.getBytes(s-this._partialBytes)),this._partialBytes=s,!0;t.putBytes(this._partialOutput.getBytes(r-this._partialBytes)),this._partialBytes=0},t.ofb.prototype.decrypt=t.ofb.prototype.encrypt,t.ctr=function(t){t=t||{},this.name="CTR",this.cipher=t.cipher,this.blockSize=t.blockSize||16,this._ints=this.blockSize/4,this._inBlock=null,this._outBlock=new Array(this._ints),this._partialOutput=e.util.createBuffer(),this._partialBytes=0},t.ctr.prototype.start=function(e){if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=n(e.iv),this._inBlock=this._iv.slice(0),this._partialBytes=0},t.ctr.prototype.encrypt=function(e,t,n){var i=e.length();if(i===0)return!0;this.cipher.encrypt(this._inBlock,this._outBlock);if(this._partialBytes===0&&i>=this.blockSize)for(var s=0;s<this._ints;++s)t.putInt32(e.getInt32()^this._outBlock[s]);else{var o=(this.blockSize-i)%this.blockSize;o>0&&(o=this.blockSize-o),this._partialOutput.clear();for(var s=0;s<this._ints;++s)this._partialOutput.putInt32(e.getInt32()^this._outBlock[s]);o>0&&(e.read-=this.blockSize),this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes);if(o>0&&!n)return t.putBytes(this._partialOutput.getBytes(o-this._partialBytes)),this._partialBytes=o,!0;t.putBytes(this._partialOutput.getBytes(i-this._partialBytes)),this._partialBytes=0}r(this._inBlock)},t.ctr.prototype.decrypt=t.ctr.prototype.encrypt,t.gcm=function(t){t=t||{},this.name="GCM",this.cipher=t.cipher,this.blockSize=t.blockSize||16,this._ints=this.blockSize/4,this._inBlock=new Array(this._ints),this._outBlock=new Array(this._ints),this._partialOutput=e.util.createBuffer(),this._partialBytes=0,this._R=3774873600},t.gcm.prototype.start=function(t){if(!("iv"in t))throw new Error("Invalid IV parameter.");var n=e.util.createBuffer(t.iv);this._cipherLength=0;var s;"additionalData"in t?s=e.util.createBuffer(t.additionalData):s=e.util.createBuffer(),"tagLength"in t?this._tagLength=t.tagLength:this._tagLength=128,this._tag=null;if(t.decrypt){this._tag=e.util.createBuffer(t.tag).getBytes();if(this._tag.length!==this._tagLength/8)throw new Error("Authentication tag does not match tag length.")}this._hashBlock=new Array(this._ints),this.tag=null,this._hashSubkey=new Array(this._ints),this.cipher.encrypt([0,0,0,0],this._hashSubkey),this.componentBits=4,this._m=this.generateHashTable(this._hashSubkey,this.componentBits);var o=n.length();if(o===12)this._j0=[n.getInt32(),n.getInt32(),n.getInt32(),1];else{this._j0=[0,0,0,0];while(n.length()>0)this._j0=this.ghash(this._hashSubkey,this._j0,[n.getInt32(),n.getInt32(),n.getInt32(),n.getInt32()]);this._j0=this.ghash(this._hashSubkey,this._j0,[0,0].concat(i(o*8)))}this._inBlock=this._j0.slice(0),r(this._inBlock),this._partialBytes=0,s=e.util.createBuffer(s),this._aDataLength=i(s.length()*8);var u=s.length()%this.blockSize;u&&s.fillWithByte(0,this.blockSize-u),this._s=[0,0,0,0];while(s.length()>0)this._s=this.ghash(this._hashSubkey,this._s,[s.getInt32(),s.getInt32(),s.getInt32(),s.getInt32()])},t.gcm.prototype.encrypt=function(e,t,n){var i=e.length();if(i===0)return!0;this.cipher.encrypt(this._inBlock,this._outBlock);if(this._partialBytes===0&&i>=this.blockSize){for(var s=0;s<this._ints;++s)t.putInt32(this._outBlock[s]^=e.getInt32());this._cipherLength+=this.blockSize}else{var o=(this.blockSize-i)%this.blockSize;o>0&&(o=this.blockSize-o),this._partialOutput.clear();for(var s=0;s<this._ints;++s)this._partialOutput.putInt32(e.getInt32()^this._outBlock[s]);if(o===0||n){if(n){var u=i%this.blockSize;this._cipherLength+=u,this._partialOutput.truncate(this.blockSize-u)}else this._cipherLength+=this.blockSize;for(var s=0;s<this._ints;++s)this._outBlock[s]=this._partialOutput.getInt32();this._partialOutput.read-=this.blockSize}this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes);if(o>0&&!n)return e.read-=this.blockSize,t.putBytes(this._partialOutput.getBytes(o-this._partialBytes)),this._partialBytes=o,!0;t.putBytes(this._partialOutput.getBytes(i-this._partialBytes)),this._partialBytes=0}this._s=this.ghash(this._hashSubkey,this._s,this._outBlock),r(this._inBlock)},t.gcm.prototype.decrypt=function(e,t,n){var i=e.length();if(i<this.blockSize&&!(n&&i>0))return!0;this.cipher.encrypt(this._inBlock,this._outBlock),r(this._inBlock),this._hashBlock[0]=e.getInt32(),this._hashBlock[1]=e.getInt32(),this._hashBlock[2]=e.getInt32(),this._hashBlock[3]=e.getInt32(),this._s=this.ghash(this._hashSubkey,this._s,this._hashBlock);for(var s=0;s<this._ints;++s)t.putInt32(this._outBlock[s]^this._hashBlock[s]);i<this.blockSize?this._cipherLength+=i%this.blockSize:this._cipherLength+=this.blockSize},t.gcm.prototype.afterFinish=function(t,n){var r=!0;n.decrypt&&n.overflow&&t.truncate(this.blockSize-n.overflow),this.tag=e.util.createBuffer();var s=this._aDataLength.concat(i(this._cipherLength*8));this._s=this.ghash(this._hashSubkey,this._s,s);var o=[];this.cipher.encrypt(this._j0,o);for(var u=0;u<this._ints;++u)this.tag.putInt32(this._s[u]^o[u]);return this.tag.truncate(this.tag.length()%(this._tagLength/8)),n.decrypt&&this.tag.bytes()!==this._tag&&(r=!1),r},t.gcm.prototype.multiply=function(e,t){var n=[0,0,0,0],r=t.slice(0);for(var i=0;i<128;++i){var s=e[i/32|0]&1<<31-i%32;s&&(n[0]^=r[0],n[1]^=r[1],n[2]^=r[2],n[3]^=r[3]),this.pow(r,r)}return n},t.gcm.prototype.pow=function(e,t){var n=e[3]&1;for(var r=3;r>0;--r)t[r]=e[r]>>>1|(e[r-1]&1)<<31;t[0]=e[0]>>>1,n&&(t[0]^=this._R)},t.gcm.prototype.tableMultiply=function(e){var t=[0,0,0,0];for(var n=0;n<32;++n){var r=n/8|0,i=e[r]>>>(7-n%8)*4&15,s=this._m[n][i];t[0]^=s[0],t[1]^=s[1],t[2]^=s[2],t[3]^=s[3]}return t},t.gcm.prototype.ghash=function(e,t,n){return t[0]^=n[0],t[1]^=n[1],t[2]^=n[2],t[3]^=n[3],this.tableMultiply(t)},t.gcm.prototype.generateHashTable=function(e,t){var n=8/t,r=4*n,i=16*n,s=new Array(i);for(var o=0;o<i;++o){var u=[0,0,0,0],a=o/r|0,f=(r-1-o%r)*t;u[a]=1<<t-1<<f,s[o]=this.generateSubHashTable(this.multiply(u,e),t)}return s},t.gcm.prototype.generateSubHashTable=function(e,t){var n=1<<t,r=n>>>1,i=new Array(n);i[r]=e.slice(0);var s=r>>>1;while(s>0)this.pow(i[2*s],i[s]=[]),s>>=1;s=2;while(s<r){for(var o=1;o<s;++o){var u=i[s],a=i[o];i[s+o]=[u[0]^a[0],u[1]^a[1],u[2]^a[2],u[3]^a[3]]}s*=2}i[0]=[0,0,0,0];for(s=r+1;s<n;++s){var f=i[s^r];i[s]=[e[0]^f[0],e[1]^f[1],e[2]^f[2],e[3]^f[3]]}return i}}var r="cipherModes";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/cipherModes",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function t(t,n){var r=function(){return new e.aes.Algorithm(t,n)};e.cipher.registerAlgorithm(t,r)}function f(){n=!0,o=[0,1,2,4,8,16,32,64,128,27,54];var e=new Array(256);for(var t=0;t<128;++t)e[t]=t<<1,e[t+128]=t+128<<1^283;i=new Array(256),s=new Array(256),u=new Array(4),a=new Array(4);for(var t=0;t<4;++t)u[t]=new Array(256),a[t]=new Array(256);var r=0,f=0,l,c,h,p,d,v,m;for(var t=0;t<256;++t){p=f^f<<1^f<<2^f<<3^f<<4,p=p>>8^p&255^99,i[r]=p,s[p]=r,d=e[p],l=e[r],c=e[l],h=e[c],v=d<<24^p<<16^p<<8^(p^d),m=(l^c^h)<<24^(r^h)<<16^(r^c^h)<<8^(r^l^h);for(var g=0;g<4;++g)u[g][r]=v,a[g][p]=m,v=v<<24|v>>>8,m=m<<24|m>>>8;r===0?r=f=1:(r=l^e[e[e[l^h]]],f^=e[e[f]])}}function l(e,t){var n=e.slice(0),s,u=1,f=n.length,l=f+6+1,c=r*l;for(var h=f;h<c;++h)s=n[h-1],h%f===0?(s=i[s>>>16&255]<<24^i[s>>>8&255]<<16^i[s&255]<<8^i[s>>>24]^o[u]<<24,u++):f>6&&h%f===4&&(s=i[s>>>24]<<24^i[s>>>16&255]<<16^i[s>>>8&255]<<8^i[s&255]),n[h]=n[h-f]^s;if(t){var p,d=a[0],v=a[1],m=a[2],g=a[3],y=n.slice(0);c=n.length;for(var h=0,b=c-r;h<c;h+=r,b-=r)if(h===0||h===c-r)y[h]=n[b],y[h+1]=n[b+3],y[h+2]=n[b+2],y[h+3]=n[b+1];else for(var w=0;w<r;++w)p=n[b+w],y[h+(3&-w)]=d[i[p>>>24]]^v[i[p>>>16&255]]^m[i[p>>>8&255]]^g[i[p&255]];n=y}return n}function c(e,t,n,r){var o=e.length/4-1,f,l,c,h,p;r?(f=a[0],l=a[1],c=a[2],h=a[3],p=s):(f=u[0],l=u[1],c=u[2],h=u[3],p=i);var d,v,m,g,y,b,w;d=t[0]^e[0],v=t[r?3:1]^e[1],m=t[2]^e[2],g=t[r?1:3]^e[3];var E=3;for(var S=1;S<o;++S)y=f[d>>>24]^l[v>>>16&255]^c[m>>>8&255]^h[g&255]^e[++E],b=f[v>>>24]^l[m>>>16&255]^c[g>>>8&255]^h[d&255]^e[++E],w=f[m>>>24]^l[g>>>16&255]^c[d>>>8&255]^h[v&255]^e[++E],g=f[g>>>24]^l[d>>>16&255]^c[v>>>8&255]^h[m&255]^e[++E],d=y,v=b,m=w;n[0]=p[d>>>24]<<24^p[v>>>16&255]<<16^p[m>>>8&255]<<8^p[g&255]^e[++E],n[r?3:1]=p[v>>>24]<<24^p[m>>>16&255]<<16^p[g>>>8&255]<<8^p[d&255]^e[++E],n[2]=p[m>>>24]<<24^p[g>>>16&255]<<16^p[d>>>8&255]<<8^p[v&255]^e[++E],n[r?1:3]=p[g>>>24]<<24^p[d>>>16&255]<<16^p[v>>>8&255]<<8^p[m&255]^e[++E]}function h(t){t=t||{};var n=(t.mode||"CBC").toUpperCase(),r="AES-"+n,i;t.decrypt?i=e.cipher.createDecipher(r,t.key):i=e.cipher.createCipher(r,t.key);var s=i.start;return i.start=function(t,n){var r=null;n instanceof e.util.ByteBuffer&&(r=n,n={}),n=n||{},n.output=r,n.iv=t,s.call(i,n)},i}e.aes=e.aes||{},e.aes.startEncrypting=function(e,t,n,r){var i=h({key:e,output:n,decrypt:!1,mode:r});return i.start(t),i},e.aes.createEncryptionCipher=function(e,t){return h({key:e,output:null,decrypt:!1,mode:t})},e.aes.startDecrypting=function(e,t,n,r){var i=h({key:e,output:n,decrypt:!0,mode:r});return i.start(t),i},e.aes.createDecryptionCipher=function(e,t){return h({key:e,output:null,decrypt:!0,mode:t})},e.aes.Algorithm=function(e,t){n||f();var r=this;r.name=e,r.mode=new t({blockSize:16,cipher:{encrypt:function(e,t){return c(r._w,e,t,!1)},decrypt:function(e,t){return c(r._w,e,t,!0)}}}),r._init=!1},e.aes.Algorithm.prototype.initialize=function(t){if(this._init)return;var n=t.key,r;if(typeof n!="string"||n.length!==16&&n.length!==24&&n.length!==32){if(e.util.isArray(n)&&(n.length===16||n.length===24||n.length===32)){r=n,n=e.util.createBuffer();for(var i=0;i<r.length;++i)n.putByte(r[i])}}else n=e.util.createBuffer(n);if(!e.util.isArray(n)){r=n,n=[];var s=r.length();if(s===16||s===24||s===32){s>>>=2;for(var i=0;i<s;++i)n.push(r.getInt32())}}if(!e.util.isArray(n)||n.length!==4&&n.length!==6&&n.length!==8)throw new Error("Invalid key parameter.");var o=this.mode.name,u=["CFB","OFB","CTR","GCM"].indexOf(o)!==-1;this._w=l(n,t.decrypt&&!u),this._init=!0},e.aes._expandKey=function(e,t){return n||f(),l(e,t)},e.aes._updateBlock=c,t("AES-ECB",e.cipher.modes.ecb),t("AES-CBC",e.cipher.modes.cbc),t("AES-CFB",e.cipher.modes.cfb),t("AES-OFB",e.cipher.modes.ofb),t("AES-CTR",e.cipher.modes.ctr),t("AES-GCM",e.cipher.modes.gcm);var n=!1,r=4,i,s,o,u,a}var r="aes";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/aes",["require","module","./cipher","./cipherModes","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){e.pki=e.pki||{};var t=e.pki.oids=e.oids=e.oids||{};t["1.2.840.113549.1.1.1"]="rsaEncryption",t.rsaEncryption="1.2.840.113549.1.1.1",t["1.2.840.113549.1.1.4"]="md5WithRSAEncryption",t.md5WithRSAEncryption="1.2.840.113549.1.1.4",t["1.2.840.113549.1.1.5"]="sha1WithRSAEncryption",t.sha1WithRSAEncryption="1.2.840.113549.1.1.5",t["1.2.840.113549.1.1.7"]="RSAES-OAEP",t["RSAES-OAEP"]="1.2.840.113549.1.1.7",t["1.2.840.113549.1.1.8"]="mgf1",t.mgf1="1.2.840.113549.1.1.8",t["1.2.840.113549.1.1.9"]="pSpecified",t.pSpecified="1.2.840.113549.1.1.9",t["1.2.840.113549.1.1.10"]="RSASSA-PSS",t["RSASSA-PSS"]="1.2.840.113549.1.1.10",t["1.2.840.113549.1.1.11"]="sha256WithRSAEncryption",t.sha256WithRSAEncryption="1.2.840.113549.1.1.11",t["1.2.840.113549.1.1.12"]="sha384WithRSAEncryption",t.sha384WithRSAEncryption="1.2.840.113549.1.1.12",t["1.2.840.113549.1.1.13"]="sha512WithRSAEncryption",t.sha512WithRSAEncryption="1.2.840.113549.1.1.13",t["1.3.14.3.2.7"]="desCBC",t.desCBC="1.3.14.3.2.7",t["1.3.14.3.2.26"]="sha1",t.sha1="1.3.14.3.2.26",t["2.16.840.1.101.3.4.2.1"]="sha256",t.sha256="2.16.840.1.101.3.4.2.1",t["2.16.840.1.101.3.4.2.2"]="sha384",t.sha384="2.16.840.1.101.3.4.2.2",t["2.16.840.1.101.3.4.2.3"]="sha512",t.sha512="2.16.840.1.101.3.4.2.3",t["1.2.840.113549.2.5"]="md5",t.md5="1.2.840.113549.2.5",t["1.2.840.113549.1.7.1"]="data",t.data="1.2.840.113549.1.7.1",t["1.2.840.113549.1.7.2"]="signedData",t.signedData="1.2.840.113549.1.7.2",t["1.2.840.113549.1.7.3"]="envelopedData",t.envelopedData="1.2.840.113549.1.7.3",t["1.2.840.113549.1.7.4"]="signedAndEnvelopedData",t.signedAndEnvelopedData="1.2.840.113549.1.7.4",t["1.2.840.113549.1.7.5"]="digestedData",t.digestedData="1.2.840.113549.1.7.5",t["1.2.840.113549.1.7.6"]="encryptedData",t.encryptedData="1.2.840.113549.1.7.6",t["1.2.840.113549.1.9.1"]="emailAddress",t.emailAddress="1.2.840.113549.1.9.1",t["1.2.840.113549.1.9.2"]="unstructuredName",t.unstructuredName="1.2.840.113549.1.9.2",t["1.2.840.113549.1.9.3"]="contentType",t.contentType="1.2.840.113549.1.9.3",t["1.2.840.113549.1.9.4"]="messageDigest",t.messageDigest="1.2.840.113549.1.9.4",t["1.2.840.113549.1.9.5"]="signingTime",t.signingTime="1.2.840.113549.1.9.5",t["1.2.840.113549.1.9.6"]="counterSignature",t.counterSignature="1.2.840.113549.1.9.6",t["1.2.840.113549.1.9.7"]="challengePassword",t.challengePassword="1.2.840.113549.1.9.7",t["1.2.840.113549.1.9.8"]="unstructuredAddress",t.unstructuredAddress="1.2.840.113549.1.9.8",t["1.2.840.113549.1.9.14"]="extensionRequest",t.extensionRequest="1.2.840.113549.1.9.14",t["1.2.840.113549.1.9.20"]="friendlyName",t.friendlyName="1.2.840.113549.1.9.20",t["1.2.840.113549.1.9.21"]="localKeyId",t.localKeyId="1.2.840.113549.1.9.21",t["1.2.840.113549.1.9.22.1"]="x509Certificate",t.x509Certificate="1.2.840.113549.1.9.22.1",t["1.2.840.113549.1.12.10.1.1"]="keyBag",t.keyBag="1.2.840.113549.1.12.10.1.1",t["1.2.840.113549.1.12.10.1.2"]="pkcs8ShroudedKeyBag",t.pkcs8ShroudedKeyBag="1.2.840.113549.1.12.10.1.2",t["1.2.840.113549.1.12.10.1.3"]="certBag",t.certBag="1.2.840.113549.1.12.10.1.3",t["1.2.840.113549.1.12.10.1.4"]="crlBag",t.crlBag="1.2.840.113549.1.12.10.1.4",t["1.2.840.113549.1.12.10.1.5"]="secretBag",t.secretBag="1.2.840.113549.1.12.10.1.5",t["1.2.840.113549.1.12.10.1.6"]="safeContentsBag",t.safeContentsBag="1.2.840.113549.1.12.10.1.6",t["1.2.840.113549.1.5.13"]="pkcs5PBES2",t.pkcs5PBES2="1.2.840.113549.1.5.13",t["1.2.840.113549.1.5.12"]="pkcs5PBKDF2",t.pkcs5PBKDF2="1.2.840.113549.1.5.12",t["1.2.840.113549.1.12.1.1"]="pbeWithSHAAnd128BitRC4",t.pbeWithSHAAnd128BitRC4="1.2.840.113549.1.12.1.1",t["1.2.840.113549.1.12.1.2"]="pbeWithSHAAnd40BitRC4",t.pbeWithSHAAnd40BitRC4="1.2.840.113549.1.12.1.2",t["1.2.840.113549.1.12.1.3"]="pbeWithSHAAnd3-KeyTripleDES-CBC",t["pbeWithSHAAnd3-KeyTripleDES-CBC"]="1.2.840.113549.1.12.1.3",t["1.2.840.113549.1.12.1.4"]="pbeWithSHAAnd2-KeyTripleDES-CBC",t["pbeWithSHAAnd2-KeyTripleDES-CBC"]="1.2.840.113549.1.12.1.4",t["1.2.840.113549.1.12.1.5"]="pbeWithSHAAnd128BitRC2-CBC",t["pbeWithSHAAnd128BitRC2-CBC"]="1.2.840.113549.1.12.1.5",t["1.2.840.113549.1.12.1.6"]="pbewithSHAAnd40BitRC2-CBC",t["pbewithSHAAnd40BitRC2-CBC"]="1.2.840.113549.1.12.1.6",t["1.2.840.113549.3.7"]="des-EDE3-CBC",t["des-EDE3-CBC"]="1.2.840.113549.3.7",t["2.16.840.1.101.3.4.1.2"]="aes128-CBC",t["aes128-CBC"]="2.16.840.1.101.3.4.1.2",t["2.16.840.1.101.3.4.1.22"]="aes192-CBC",t["aes192-CBC"]="2.16.840.1.101.3.4.1.22",t["2.16.840.1.101.3.4.1.42"]="aes256-CBC",t["aes256-CBC"]="2.16.840.1.101.3.4.1.42",t["2.5.4.3"]="commonName",t.commonName="2.5.4.3",t["2.5.4.5"]="serialName",t.serialName="2.5.4.5",t["2.5.4.6"]="countryName",t.countryName="2.5.4.6",t["2.5.4.7"]="localityName",t.localityName="2.5.4.7",t["2.5.4.8"]="stateOrProvinceName",t.stateOrProvinceName="2.5.4.8",t["2.5.4.10"]="organizationName",t.organizationName="2.5.4.10",t["2.5.4.11"]="organizationalUnitName",t.organizationalUnitName="2.5.4.11",t["2.16.840.1.113730.1.1"]="nsCertType",t.nsCertType="2.16.840.1.113730.1.1",t["2.5.29.1"]="authorityKeyIdentifier",t["2.5.29.2"]="keyAttributes",t["2.5.29.3"]="certificatePolicies",t["2.5.29.4"]="keyUsageRestriction",t["2.5.29.5"]="policyMapping",t["2.5.29.6"]="subtreesConstraint",t["2.5.29.7"]="subjectAltName",t["2.5.29.8"]="issuerAltName",t["2.5.29.9"]="subjectDirectoryAttributes",t["2.5.29.10"]="basicConstraints",t["2.5.29.11"]="nameConstraints",t["2.5.29.12"]="policyConstraints",t["2.5.29.13"]="basicConstraints",t["2.5.29.14"]="subjectKeyIdentifier",t.subjectKeyIdentifier="2.5.29.14",t["2.5.29.15"]="keyUsage",t.keyUsage="2.5.29.15",t["2.5.29.16"]="privateKeyUsagePeriod",t["2.5.29.17"]="subjectAltName",t.subjectAltName="2.5.29.17",t["2.5.29.18"]="issuerAltName",t.issuerAltName="2.5.29.18",t["2.5.29.19"]="basicConstraints",t.basicConstraints="2.5.29.19",t["2.5.29.20"]="cRLNumber",t["2.5.29.21"]="cRLReason",t["2.5.29.22"]="expirationDate",t["2.5.29.23"]="instructionCode",t["2.5.29.24"]="invalidityDate",t["2.5.29.25"]="cRLDistributionPoints",t["2.5.29.26"]="issuingDistributionPoint",t["2.5.29.27"]="deltaCRLIndicator",t["2.5.29.28"]="issuingDistributionPoint",t["2.5.29.29"]="certificateIssuer",t["2.5.29.30"]="nameConstraints",t["2.5.29.31"]="cRLDistributionPoints",t["2.5.29.32"]="certificatePolicies",t["2.5.29.33"]="policyMappings",t["2.5.29.34"]="policyConstraints",t["2.5.29.35"]="authorityKeyIdentifier",t.authorityKeyIdentifier="2.5.29.35",t["2.5.29.36"]="policyConstraints",t["2.5.29.37"]="extKeyUsage",t.extKeyUsage="2.5.29.37",t["2.5.29.46"]="freshestCRL",t["2.5.29.54"]="inhibitAnyPolicy",t["1.3.6.1.5.5.7.3.1"]="serverAuth",t.serverAuth="1.3.6.1.5.5.7.3.1",t["1.3.6.1.5.5.7.3.2"]="clientAuth",t.clientAuth="1.3.6.1.5.5.7.3.2",t["1.3.6.1.5.5.7.3.3"]="codeSigning",t.codeSigning="1.3.6.1.5.5.7.3.3",t["1.3.6.1.5.5.7.3.4"]="emailProtection",t.emailProtection="1.3.6.1.5.5.7.3.4",t["1.3.6.1.5.5.7.3.8"]="timeStamping",t.timeStamping="1.3.6.1.5.5.7.3.8"}var r="oids";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/oids",["require","module"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t=e.asn1=e.asn1||{};t.Class={UNIVERSAL:0,APPLICATION:64,CONTEXT_SPECIFIC:128,PRIVATE:192},t.Type={NONE:0,BOOLEAN:1,INTEGER:2,BITSTRING:3,OCTETSTRING:4,NULL:5,OID:6,ODESC:7,EXTERNAL:8,REAL:9,ENUMERATED:10,EMBEDDED:11,UTF8:12,ROID:13,SEQUENCE:16,SET:17,PRINTABLESTRING:19,IA5STRING:22,UTCTIME:23,GENERALIZEDTIME:24,BMPSTRING:30},t.create=function(t,n,r,i){if(e.util.isArray(i)){var s=[];for(var o=0;o<i.length;++o)i[o]!==undefined&&s.push(i[o]);i=s}return{tagClass:t,type:n,constructed:r,composed:r||e.util.isArray(i),value:i}};var n=t.getBerValueLength=function(e){var t=e.getByte();if(t===128)return undefined;var n,r=t&128;return r?n=e.getInt((t&127)<<3):n=t,n};t.fromDer=function(r,i){i===undefined&&(i=!0),typeof r=="string"&&(r=e.util.createBuffer(r));if(r.length()<2){var s=new Error("Too few bytes to parse DER.");throw s.bytes=r.length(),s}var o=r.getByte(),u=o&192,a=o&31,f=n(r);if(r.length()<f){if(i){var s=new Error("Too few bytes to read ASN.1 value.");throw s.detail=r.length()+" < "+f,s}f=r.length()}var l,c=(o&32)===32,h=c;if(!h&&u===t.Class.UNIVERSAL&&a===t.Type.BITSTRING&&f>1){var p=r.read,d=r.getByte();if(d===0){o=r.getByte();var v=o&192;if(v===t.Class.UNIVERSAL||v===t.Class.CONTEXT_SPECIFIC)try{var m=n(r);h=m===f-(r.read-p),h&&(++p,--f)}catch(g){}}r.read=p}if(h){l=[];if(f===undefined)for(;;){if(r.bytes(2)===String.fromCharCode(0,0)){r.getBytes(2);break}l.push(t.fromDer(r,i))}else{var y=r.length();while(f>0)l.push(t.fromDer(r,i)),f-=y-r.length(),y=r.length()}}else{if(f===undefined){if(i)throw new Error("Non-constructed ASN.1 object of indefinite length.");f=r.length()}if(a===t.Type.BMPSTRING){l="";for(var b=0;b<f;b+=2)l+=String.fromCharCode(r.getInt16())}else l=r.getBytes(f)}return t.create(u,a,c,l)},t.toDer=function(n){var r=e.util.createBuffer(),i=n.tagClass|n.type,s=e.util.createBuffer();if(n.composed){n.constructed?i|=32:s.putByte(0);for(var o=0;o<n.value.length;++o)n.value[o]!==undefined&&s.putBuffer(t.toDer(n.value[o]))}else if(n.type===t.Type.BMPSTRING)for(var o=0;o<n.value.length;++o)s.putInt16(n.value.charCodeAt(o));else s.putBytes(n.value);r.putByte(i);if(s.length()<=127)r.putByte(s.length()&127);else{var u=s.length(),a="";do a+=String.fromCharCode(u&255),u>>>=8;while(u>0);r.putByte(a.length|128);for(var o=a.length-1;o>=0;--o)r.putByte(a.charCodeAt(o))}return r.putBuffer(s),r},t.oidToDer=function(t){var n=t.split("."),r=e.util.createBuffer();r.putByte(40*parseInt(n[0],10)+parseInt(n[1],10));var i,s,o,u;for(var a=2;a<n.length;++a){i=!0,s=[],o=parseInt(n[a],10);do u=o&127,o>>>=7,i||(u|=128),s.push(u),i=!1;while(o>0);for(var f=s.length-1;f>=0;--f)r.putByte(s[f])}return r},t.derToOid=function(t){var n;typeof t=="string"&&(t=e.util.createBuffer(t));var r=t.getByte();n=Math.floor(r/40)+"."+r%40;var i=0;while(t.length()>0)r=t.getByte(),i<<=7,r&128?i+=r&127:(n+="."+(i+r),i=0);return n},t.utcTimeToDate=function(e){var t=new Date,n=parseInt(e.substr(0,2),10);n=n>=50?1900+n:2e3+n;var r=parseInt(e.substr(2,2),10)-1,i=parseInt(e.substr(4,2),10),s=parseInt(e.substr(6,2),10),o=parseInt(e.substr(8,2),10),u=0;if(e.length>11){var a=e.charAt(10),f=10;a!=="+"&&a!=="-"&&(u=parseInt(e.substr(10,2),10),f+=2)}t.setUTCFullYear(n,r,i),t.setUTCHours(s,o,u,0);if(f){a=e.charAt(f);if(a==="+"||a==="-"){var l=parseInt(e.substr(f+1,2),10),c=parseInt(e.substr(f+4,2),10),h=l*60+c;h*=6e4,a==="+"?t.setTime(+t-h):t.setTime(+t+h)}}return t},t.generalizedTimeToDate=function(e){var t=new Date,n=parseInt(e.substr(0,4),10),r=parseInt(e.substr(4,2),10)-1,i=parseInt(e.substr(6,2),10),s=parseInt(e.substr(8,2),10),o=parseInt(e.substr(10,2),10),u=parseInt(e.substr(12,2),10),a=0,f=0,l=!1;e.charAt(e.length-1)==="Z"&&(l=!0);var c=e.length-5,h=e.charAt(c);if(h==="+"||h==="-"){var p=parseInt(e.substr(c+1,2),10),d=parseInt(e.substr(c+4,2),10);f=p*60+d,f*=6e4,h==="+"&&(f*=-1),l=!0}return e.charAt(14)==="."&&(a=parseFloat(e.substr(14),10)*1e3),l?(t.setUTCFullYear(n,r,i),t.setUTCHours(s,o,u,a),t.setTime(+t+f)):(t.setFullYear(n,r,i),t.setHours(s,o,u,a)),t},t.dateToUtcTime=function(e){if(typeof e=="string")return e;var t="",n=[];n.push((""+e.getUTCFullYear()).substr(2)),n.push(""+(e.getUTCMonth()+1)),n.push(""+e.getUTCDate()),n.push(""+e.getUTCHours()),n.push(""+e.getUTCMinutes()),n.push(""+e.getUTCSeconds());for(var r=0;r<n.length;++r)n[r].length<2&&(t+="0"),t+=n[r];return t+="Z",t},t.dateToGeneralizedTime=function(e){if(typeof e=="string")return e;var t="",n=[];n.push(""+e.getUTCFullYear()),n.push(""+(e.getUTCMonth()+1)),n.push(""+e.getUTCDate()),n.push(""+e.getUTCHours()),n.push(""+e.getUTCMinutes()),n.push(""+e.getUTCSeconds());for(var r=0;r<n.length;++r)n[r].length<2&&(t+="0"),t+=n[r];return t+="Z",t},t.integerToDer=function(t){var n=e.util.createBuffer();if(t>=-128&&t<128)return n.putSignedInt(t,8);if(t>=-32768&&t<32768)return n.putSignedInt(t,16);if(t>=-8388608&&t<8388608)return n.putSignedInt(t,24);if(t>=-2147483648&&t<2147483648)return n.putSignedInt(t,32);var r=new Error("Integer too large; max is 32-bits.");throw r.integer=t,r},t.derToInteger=function(t){typeof t=="string"&&(t=e.util.createBuffer(t));var n=t.length()*8;if(n>32)throw new Error("Integer too large; max is 32-bits.");return t.getSignedInt(n)},t.validate=function(n,r,i,s){var o=!1;if(n.tagClass!==r.tagClass&&typeof r.tagClass!="undefined"||n.type!==r.type&&typeof r.type!="undefined")s&&(n.tagClass!==r.tagClass&&s.push("["+r.name+"] "+'Expected tag class "'+r.tagClass+'", got "'+n.tagClass+'"'),n.type!==r.type&&s.push("["+r.name+"] "+'Expected type "'+r.type+'", got "'+n.type+'"'));else if(n.constructed===r.constructed||typeof r.constructed=="undefined"){o=!0;if(r.value&&e.util.isArray(r.value)){var u=0;for(var a=0;o&&a<r.value.length;++a)o=r.value[a].optional||!1,n.value[u]&&(o=t.validate(n.value[u],r.value[a],i,s),o?++u:r.value[a].optional&&(o=!0)),!o&&s&&s.push("["+r.name+"] "+'Tag class "'+r.tagClass+'", type "'+r.type+'" expected value length "'+r.value.length+'", got "'+n.value.length+'"')}o&&i&&(r.capture&&(i[r.capture]=n.value),r.captureAsn1&&(i[r.captureAsn1]=n))}else s&&s.push("["+r.name+"] "+'Expected constructed "'+r.constructed+'", got "'+n.constructed+'"');return o};var r=/[^\\u0000-\\u00ff]/;t.prettyPrint=function(n,i,s){var o="";i=i||0,s=s||2,i>0&&(o+="\n");var u="";for(var a=0;a<i*s;++a)u+=" ";o+=u+"Tag: ";switch(n.tagClass){case t.Class.UNIVERSAL:o+="Universal:";break;case t.Class.APPLICATION:o+="Application:";break;case t.Class.CONTEXT_SPECIFIC:o+="Context-Specific:";break;case t.Class.PRIVATE:o+="Private:"}if(n.tagClass===t.Class.UNIVERSAL){o+=n.type;switch(n.type){case t.Type.NONE:o+=" (None)";break;case t.Type.BOOLEAN:o+=" (Boolean)";break;case t.Type.BITSTRING:o+=" (Bit string)";break;case t.Type.INTEGER:o+=" (Integer)";break;case t.Type.OCTETSTRING:o+=" (Octet string)";break;case t.Type.NULL:o+=" (Null)";break;case t.Type.OID:o+=" (Object Identifier)";break;case t.Type.ODESC:o+=" (Object Descriptor)";break;case t.Type.EXTERNAL:o+=" (External or Instance of)";break;case t.Type.REAL:o+=" (Real)";break;case t.Type.ENUMERATED:o+=" (Enumerated)";break;case t.Type.EMBEDDED:o+=" (Embedded PDV)";break;case t.Type.UTF8:o+=" (UTF8)";break;case t.Type.ROID:o+=" (Relative Object Identifier)";break;case t.Type.SEQUENCE:o+=" (Sequence)";break;case t.Type.SET:o+=" (Set)";break;case t.Type.PRINTABLESTRING:o+=" (Printable String)";break;case t.Type.IA5String:o+=" (IA5String (ASCII))";break;case t.Type.UTCTIME:o+=" (UTC time)";break;case t.Type.GENERALIZEDTIME:o+=" (Generalized time)";break;case t.Type.BMPSTRING:o+=" (BMP String)"}}else o+=n.type;o+="\n",o+=u+"Constructed: "+n.constructed+"\n";if(n.composed){var f=0,l="";for(var a=0;a<n.value.length;++a)n.value[a]!==undefined&&(f+=1,l+=t.prettyPrint(n.value[a],i+1,s),a+1<n.value.length&&(l+=","));o+=u+"Sub values: "+f+l}else{o+=u+"Value: ";if(n.type===t.Type.OID){var c=t.derToOid(n.value);o+=c,e.pki&&e.pki.oids&&c in e.pki.oids&&(o+=" ("+e.pki.oids[c]+") ")}if(n.type===t.Type.INTEGER)try{o+=t.derToInteger(n.value)}catch(h){o+="0x"+e.util.bytesToHex(n.value)}else n.type===t.Type.OCTETSTRING?(r.test(n.value)||(o+="("+n.value+") "),o+="0x"+e.util.bytesToHex(n.value)):n.type===t.Type.UTF8?o+=e.util.decodeUtf8(n.value):n.type===t.Type.PRINTABLESTRING||n.type===t.Type.IA5String?o+=n.value:r.test(n.value)?o+="0x"+e.util.bytesToHex(n.value):n.value.length===0?o+="[null]":o+=n.value}return o}}var r="asn1";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/asn1",["require","module","./util","./oids"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function u(){n=String.fromCharCode(128),n+=e.util.fillString(String.fromCharCode(0),64),r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,6,11,0,5,10,15,4,9,14,3,8,13,2,7,12,5,8,11,14,1,4,7,10,13,0,3,6,9,12,15,2,0,7,14,5,12,3,10,1,8,15,6,13,4,11,2,9],i=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21],s=new Array(64);for(var t=0;t<64;++t)s[t]=Math.floor(Math.abs(Math.sin(t+1))*4294967296);o=!0}function a(e,t,n){var o,u,a,f,l,c,h,p,d=n.length();while(d>=64){u=e.h0,a=e.h1,f=e.h2,l=e.h3;for(p=0;p<16;++p)t[p]=n.getInt32Le(),c=l^a&(f^l),o=u+c+s[p]+t[p],h=i[p],u=l,l=f,f=a,a+=o<<h|o>>>32-h;for(;p<32;++p)c=f^l&(a^f),o=u+c+s[p]+t[r[p]],h=i[p],u=l,l=f,f=a,a+=o<<h|o>>>32-h;for(;p<48;++p)c=a^f^l,o=u+c+s[p]+t[r[p]],h=i[p],u=l,l=f,f=a,a+=o<<h|o>>>32-h;for(;p<64;++p)c=f^(a|~l),o=u+c+s[p]+t[r[p]],h=i[p],u=l,l=f,f=a,a+=o<<h|o>>>32-h;e.h0=e.h0+u|0,e.h1=e.h1+a|0,e.h2=e.h2+f|0,e.h3=e.h3+l|0,d-=64}}var t=e.md5=e.md5||{};e.md=e.md||{},e.md.algorithms=e.md.algorithms||{},e.md.md5=e.md.algorithms.md5=t,t.create=function(){o||u();var t=null,r=e.util.createBuffer(),i=new Array(16),s={algorithm:"md5",blockLength:64,digestLength:16,messageLength:0,fullMessageLength:null,messageLengthSize:8};return s.start=function(){s.messageLength=0,s.fullMessageLength=s.messageLength64=[];var n=s.messageLengthSize/4;for(var i=0;i<n;++i)s.fullMessageLength.push(0);return r=e.util.createBuffer(),t={h0:1732584193,h1:4023233417,h2:2562383102,h3:271733878},s},s.start(),s.update=function(n,o){o==="utf8"&&(n=e.util.encodeUtf8(n));var u=n.length;s.messageLength+=u,u=[u/4294967296>>>0,u>>>0];for(var f=s.fullMessageLength.length-1;f>=0;--f)s.fullMessageLength[f]+=u[1],u[1]=u[0]+(s.fullMessageLength[f]/4294967296>>>0),s.fullMessageLength[f]=s.fullMessageLength[f]>>>0,u[0]=u[1]/4294967296>>>0;return r.putBytes(n),a(t,i,r),(r.read>2048||r.length()===0)&&r.compact(),s},s.digest=function(){var o=e.util.createBuffer();o.putBytes(r.bytes());var u=s.fullMessageLength[s.fullMessageLength.length-1]+s.messageLengthSize,f=u&s.blockLength-1;o.putBytes(n.substr(0,s.blockLength-f));var l,c=0;for(var h=s.fullMessageLength.length-1;h>=0;--h)l=s.fullMessageLength[h]*8+c,c=l/4294967296>>>0,o.putInt32Le(l>>>0);var p={h0:t.h0,h1:t.h1,h2:t.h2,h3:t.h3};a(p,i,o);var d=e.util.createBuffer();return d.putInt32Le(p.h0),d.putInt32Le(p.h1),d.putInt32Le(p.h2),d.putInt32Le(p.h3),d},s};var n=null,r=null,i=null,s=null,o=!1}var r="md5";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/md5",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function i(){n=String.fromCharCode(128),n+=e.util.fillString(String.fromCharCode(0),64),r=!0}function s(e,t,n){var r,i,s,o,u,a,f,l,c=n.length();while(c>=64){i=e.h0,s=e.h1,o=e.h2,u=e.h3,a=e.h4;for(l=0;l<16;++l)r=n.getInt32(),t[l]=r,f=u^s&(o^u),r=(i<<5|i>>>27)+f+a+1518500249+r,a=u,u=o,o=s<<30|s>>>2,s=i,i=r;for(;l<20;++l)r=t[l-3]^t[l-8]^t[l-14]^t[l-16],r=r<<1|r>>>31,t[l]=r,f=u^s&(o^u),r=(i<<5|i>>>27)+f+a+1518500249+r,a=u,u=o,o=s<<30|s>>>2,s=i,i=r;for(;l<32;++l)r=t[l-3]^t[l-8]^t[l-14]^t[l-16],r=r<<1|r>>>31,t[l]=r,f=s^o^u,r=(i<<5|i>>>27)+f+a+1859775393+r,a=u,u=o,o=s<<30|s>>>2,s=i,i=r;for(;l<40;++l)r=t[l-6]^t[l-16]^t[l-28]^t[l-32],r=r<<2|r>>>30,t[l]=r,f=s^o^u,r=(i<<5|i>>>27)+f+a+1859775393+r,a=u,u=o,o=s<<30|s>>>2,s=i,i=r;for(;l<60;++l)r=t[l-6]^t[l-16]^t[l-28]^t[l-32],r=r<<2|r>>>30,t[l]=r,f=s&o|u&(s^o),r=(i<<5|i>>>27)+f+a+2400959708+r,a=u,u=o,o=s<<30|s>>>2,s=i,i=r;for(;l<80;++l)r=t[l-6]^t[l-16]^t[l-28]^t[l-32],r=r<<2|r>>>30,t[l]=r,f=s^o^u,r=(i<<5|i>>>27)+f+a+3395469782+r,a=u,u=o,o=s<<30|s>>>2,s=i,i=r;e.h0=e.h0+i|0,e.h1=e.h1+s|0,e.h2=e.h2+o|0,e.h3=e.h3+u|0,e.h4=e.h4+a|0,c-=64}}var t=e.sha1=e.sha1||{};e.md=e.md||{},e.md.algorithms=e.md.algorithms||{},e.md.sha1=e.md.algorithms.sha1=t,t.create=function(){r||i();var t=null,o=e.util.createBuffer(),u=new Array(80),a={algorithm:"sha1",blockLength:64,digestLength:20,messageLength:0,fullMessageLength:null,messageLengthSize:8};return a.start=function(){a.messageLength=0,a.fullMessageLength=a.messageLength64=[];var n=a.messageLengthSize/4;for(var r=0;r<n;++r)a.fullMessageLength.push(0);return o=e.util.createBuffer(),t={h0:1732584193,h1:4023233417,h2:2562383102,h3:271733878,h4:3285377520},a},a.start(),a.update=function(n,r){r==="utf8"&&(n=e.util.encodeUtf8(n));var i=n.length;a.messageLength+=i,i=[i/4294967296>>>0,i>>>0];for(var f=a.fullMessageLength.length-1;f>=0;--f)a.fullMessageLength[f]+=i[1],i[1]=i[0]+(a.fullMessageLength[f]/4294967296>>>0),a.fullMessageLength[f]=a.fullMessageLength[f]>>>0,i[0]=i[1]/4294967296>>>0;return o.putBytes(n),s(t,u,o),(o.read>2048||o.length()===0)&&o.compact(),a},a.digest=function(){var r=e.util.createBuffer();r.putBytes(o.bytes());var i=a.fullMessageLength[a.fullMessageLength.length-1]+a.messageLengthSize,f=i&a.blockLength-1;r.putBytes(n.substr(0,a.blockLength-f));var l=e.util.createBuffer(),c,h,p=a.fullMessageLength[0]*8;for(var d=0;d<a.fullMessageLength.length;++d)c=a.fullMessageLength[d+1]*8,h=c/4294967296>>>0,p+=h,r.putInt32(p>>>0),p=c;var v={h0:t.h0,h1:t.h1,h2:t.h2,h3:t.h3,h4:t.h4};s(v,u,r);var m=e.util.createBuffer();return m.putInt32(v.h0),m.putInt32(v.h1),m.putInt32(v.h2),m.putInt32(v.h3),m.putInt32(v.h4),m},a};var n=null,r=!1}var r="sha1";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/sha1",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function s(){n=String.fromCharCode(128),n+=e.util.fillString(String.fromCharCode(0),64),i=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],r=!0}function o(e,t,n){var r,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b=n.length();while(b>=64){for(l=0;l<16;++l)t[l]=n.getInt32();for(;l<64;++l)r=t[l-2],r=(r>>>17|r<<15)^(r>>>19|r<<13)^r>>>10,s=t[l-15],s=(s>>>7|s<<25)^(s>>>18|s<<14)^s>>>3,t[l]=r+t[l-7]+s+t[l-16]|0;c=e.h0,h=e.h1,p=e.h2,d=e.h3,v=e.h4,m=e.h5,g=e.h6,y=e.h7;for(l=0;l<64;++l)u=(v>>>6|v<<26)^(v>>>11|v<<21)^(v>>>25|v<<7),a=g^v&(m^g),o=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),f=c&h|p&(c^h),r=y+u+a+i[l]+t[l],s=o+f,y=g,g=m,m=v,v=d+r|0,d=p,p=h,h=c,c=r+s|0;e.h0=e.h0+c|0,e.h1=e.h1+h|0,e.h2=e.h2+p|0,e.h3=e.h3+d|0,e.h4=e.h4+v|0,e.h5=e.h5+m|0,e.h6=e.h6+g|0,e.h7=e.h7+y|0,b-=64}}var t=e.sha256=e.sha256||{};e.md=e.md||{},e.md.algorithms=e.md.algorithms||{},e.md.sha256=e.md.algorithms.sha256=t,t.create=function(){r||s();var t=null,i=e.util.createBuffer(),u=new Array(64),a={algorithm:"sha256",blockLength:64,digestLength:32,messageLength:0,fullMessageLength:null,messageLengthSize:8};return a.start=function(){a.messageLength=0,a.fullMessageLength=a.messageLength64=[];var n=a.messageLengthSize/4;for(var r=0;r<n;++r)a.fullMessageLength.push(0);return i=e.util.createBuffer(),t={h0:1779033703,h1:3144134277,h2:1013904242,h3:2773480762,h4:1359893119,h5:2600822924,h6:528734635,h7:1541459225},a},a.start(),a.update=function(n,r){r==="utf8"&&(n=e.util.encodeUtf8(n));var s=n.length;a.messageLength+=s,s=[s/4294967296>>>0,s>>>0];for(var f=a.fullMessageLength.length-1;f>=0;--f)a.fullMessageLength[f]+=s[1],s[1]=s[0]+(a.fullMessageLength[f]/4294967296>>>0),a.fullMessageLength[f]=a.fullMessageLength[f]>>>0,s[0]=s[1]/4294967296>>>0;return i.putBytes(n),o(t,u,i),(i.read>2048||i.length()===0)&&i.compact(),a},a.digest=function(){var r=e.util.createBuffer();r.putBytes(i.bytes());var s=a.fullMessageLength[a.fullMessageLength.length-1]+a.messageLengthSize,f=s&a.blockLength-1;r.putBytes(n.substr(0,a.blockLength-f));var l=e.util.createBuffer(),c,h,p=a.fullMessageLength[0]*8;for(var d=0;d<a.fullMessageLength.length;++d)c=a.fullMessageLength[d+1]*8,h=c/4294967296>>>0,p+=h,r.putInt32(p>>>0),p=c;var v={h0:t.h0,h1:t.h1,h2:t.h2,h3:t.h3,h4:t.h4,h5:t.h5,h6:t.h6,h7:t.h7};o(v,u,r);var m=e.util.createBuffer();return m.putInt32(v.h0),m.putInt32(v.h1),m.putInt32(v.h2),m.putInt32(v.h3),m.putInt32(v.h4),m.putInt32(v.h5),m.putInt32(v.h6),m.putInt32(v.h7),m},a};var n=null,r=!1,i=null}var r="sha256";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/sha256",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function u(){r=String.fromCharCode(128),r+=e.util.fillString(String.fromCharCode(0),128),s=[[1116352408,3609767458],[1899447441,602891725],[3049323471,3964484399],[3921009573,2173295548],[961987163,4081628472],[1508970993,3053834265],[2453635748,2937671579],[2870763221,3664609560],[3624381080,2734883394],[310598401,1164996542],[607225278,1323610764],[1426881987,3590304994],[1925078388,4068182383],[2162078206,991336113],[2614888103,633803317],[3248222580,3479774868],[3835390401,2666613458],[4022224774,944711139],[264347078,2341262773],[604807628,2007800933],[770255983,1495990901],[1249150122,1856431235],[1555081692,3175218132],[1996064986,2198950837],[2554220882,3999719339],[2821834349,766784016],[2952996808,2566594879],[3210313671,3203337956],[3336571891,1034457026],[3584528711,2466948901],[113926993,3758326383],[338241895,168717936],[666307205,1188179964],[773529912,1546045734],[1294757372,1522805485],[1396182291,2643833823],[1695183700,2343527390],[1986661051,1014477480],[2177026350,1206759142],[2456956037,344077627],[2730485921,1290863460],[2820302411,3158454273],[3259730800,3505952657],[3345764771,106217008],[3516065817,3606008344],[3600352804,1432725776],[4094571909,1467031594],[275423344,851169720],[430227734,3100823752],[506948616,1363258195],[659060556,3750685593],[883997877,3785050280],[958139571,3318307427],[1322822218,3812723403],[1537002063,2003034995],[1747873779,3602036899],[1955562222,1575990012],[2024104815,1125592928],[2227730452,2716904306],[2361852424,442776044],[2428436474,593698344],[2756734187,3733110249],[3204031479,2999351573],[3329325298,3815920427],[3391569614,3928383900],[3515267271,566280711],[3940187606,3454069534],[4118630271,4000239992],[116418474,1914138554],[174292421,2731055270],[289380356,3203993006],[460393269,320620315],[685471733,587496836],[852142971,1086792851],[1017036298,365543100],[1126000580,2618297676],[1288033470,3409855158],[1501505948,4234509866],[1607167915,987167468],[1816402316,1246189591]],o={},o["SHA-512"]=[[1779033703,4089235720],[3144134277,2227873595],[1013904242,4271175723],[2773480762,1595750129],[1359893119,2917565137],[2600822924,725511199],[528734635,4215389547],[1541459225,327033209]],o["SHA-384"]=[[3418070365,3238371032],[1654270250,914150663],[2438529370,812702999],[355462360,4144912697],[1731405415,4290775857],[2394180231,1750603025],[3675008525,1694076839],[1203062813,3204075428]],o["SHA-512/256"]=[[573645204,4230739756],[2673172387,3360449730],[596883563,1867755857],[2520282905,1497426621],[2519219938,2827943907],[3193839141,1401305490],[721525244,746961066],[246885852,2177182882]],o["SHA-512/224"]=[[2352822216,424955298],[1944164710,2312950998],[502970286,855612546],[1738396948,1479516111],[258812777,2077511080],[2011393907,79989058],[1067287976,1780299464],[286451373,2446758561]],i=!0}function a(e,t,n){var r,i,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I=n.length();while(I>=128){for(_=0;_<16;++_)t[_][0]=n.getInt32()>>>0,t[_][1]=n.getInt32()>>>0;for(;_<80;++_)H=t[_-2],D=H[0],P=H[1],r=((D>>>19|P<<13)^(P>>>29|D<<3)^D>>>6)>>>0,i=((D<<13|P>>>19)^(P<<3|D>>>29)^(D<<26|P>>>6))>>>0,j=t[_-15],D=j[0],P=j[1],o=((D>>>1|P<<31)^(D>>>8|P<<24)^D>>>7)>>>0,u=((D<<31|P>>>1)^(D<<24|P>>>8)^(D<<25|P>>>7))>>>0,B=t[_-7],F=t[_-16],P=i+B[1]+u+F[1],t[_][0]=r+B[0]+o+F[0]+(P/4294967296>>>0)>>>0,t[_][1]=P>>>0;m=e[0][0],g=e[0][1],y=e[1][0],b=e[1][1],w=e[2][0],E=e[2][1],S=e[3][0],x=e[3][1],T=e[4][0],N=e[4][1],C=e[5][0],k=e[5][1],L=e[6][0],A=e[6][1],O=e[7][0],M=e[7][1];for(_=0;_<80;++_)l=((T>>>14|N<<18)^(T>>>18|N<<14)^(N>>>9|T<<23))>>>0,c=((T<<18|N>>>14)^(T<<14|N>>>18)^(N<<23|T>>>9))>>>0,h=(L^T&(C^L))>>>0,p=(A^N&(k^A))>>>0,a=((m>>>28|g<<4)^(g>>>2|m<<30)^(g>>>7|m<<25))>>>0,f=((m<<4|g>>>28)^(g<<30|m>>>2)^(g<<25|m>>>7))>>>0,d=(m&y|w&(m^y))>>>0,v=(g&b|E&(g^b))>>>0,P=M+c+p+s[_][1]+t[_][1],r=O+l+h+s[_][0]+t[_][0]+(P/4294967296>>>0)>>>0,i=P>>>0,P=f+v,o=a+d+(P/4294967296>>>0)>>>0,u=P>>>0,O=L,M=A,L=C,A=k,C=T,k=N,P=x+i,T=S+r+(P/4294967296>>>0)>>>0,N=P>>>0,S=w,x=E,w=y,E=b,y=m,b=g,P=i+u,m=r+o+(P/4294967296>>>0)>>>0,g=P>>>0;P=e[0][1]+g,e[0][0]=e[0][0]+m+(P/4294967296>>>0)>>>0,e[0][1]=P>>>0,P=e[1][1]+b,e[1][0]=e[1][0]+y+(P/4294967296>>>0)>>>0,e[1][1]=P>>>0,P=e[2][1]+E,e[2][0]=e[2][0]+w+(P/4294967296>>>0)>>>0,e[2][1]=P>>>0,P=e[3][1]+x,e[3][0]=e[3][0]+S+(P/4294967296>>>0)>>>0,e[3][1]=P>>>0,P=e[4][1]+N,e[4][0]=e[4][0]+T+(P/4294967296>>>0)>>>0,e[4][1]=P>>>0,P=e[5][1]+k,e[5][0]=e[5][0]+C+(P/4294967296>>>0)>>>0,e[5][1]=P>>>0,P=e[6][1]+A,e[6][0]=e[6][0]+L+(P/4294967296>>>0)>>>0,e[6][1]=P>>>0,P=e[7][1]+M,e[7][0]=e[7][0]+O+(P/4294967296>>>0)>>>0,e[7][1]=P>>>0,I-=128}}var t=e.sha512=e.sha512||{};e.md=e.md||{},e.md.algorithms=e.md.algorithms||{},e.md.sha512=e.md.algorithms.sha512=t;var n=e.sha384=e.sha512.sha384=e.sha512.sha384||{};n.create=function(){return t.create("SHA-384")},e.md.sha384=e.md.algorithms.sha384=n,e.sha512.sha256=e.sha512.sha256||{create:function(){return t.create("SHA-512/256")}},e.md["sha512/256"]=e.md.algorithms["sha512/256"]=e.sha512.sha256,e.sha512.sha224=e.sha512.sha224||{create:function(){return t.create("SHA-512/224")}},e.md["sha512/224"]=e.md.algorithms["sha512/224"]=e.sha512.sha224,t.create=function(t){i||u(),typeof t=="undefined"&&(t="SHA-512");if(t in o){var n=o[t],s=null,f=e.util.createBuffer(),l=new Array(80);for(var c=0;c<80;++c)l[c]=new Array(2);var h={algorithm:t.replace("-","").toLowerCase(),blockLength:128,digestLength:64,messageLength:0,fullMessageLength:null,messageLengthSize:16};return h.start=function(){h.messageLength=0,h.fullMessageLength=h.messageLength128=[];var t=h.messageLengthSize/4;for(var r=0;r<t;++r)h.fullMessageLength.push(0);f=e.util.createBuffer(),s=new Array(n.length);for(var r=0;r<n.length;++r)s[r]=n[r].slice(0);return h},h.start(),h.update=function(t,n){n==="utf8"&&(t=e.util.encodeUtf8(t));var r=t.length;h.messageLength+=r,r=[r/4294967296>>>0,r>>>0];for(var i=h.fullMessageLength.length-1;i>=0;--i)h.fullMessageLength[i]+=r[1],r[1]=r[0]+(h.fullMessageLength[i]/4294967296>>>0),h.fullMessageLength[i]=h.fullMessageLength[i]>>>0,r[0]=r[1]/4294967296>>>0;return f.putBytes(t),a(s,l,f),(f.read>2048||f.length()===0)&&f.compact(),h},h.digest=function(){var n=e.util.createBuffer();n.putBytes(f.bytes());var i=h.fullMessageLength[h.fullMessageLength.length-1]+h.messageLengthSize,o=i&h.blockLength-1;n.putBytes(r.substr(0,h.blockLength-o));var u=e.util.createBuffer(),c,p,d=h.fullMessageLength[0]*8;for(var v=0;v<h.fullMessageLength.length;++v)c=h.fullMessageLength[v+1]*8,p=c/4294967296>>>0,d+=p,n.putInt32(d>>>0),d=c;var m=new Array(s.length);for(var v=0;v<s.length;++v)m[v]=s[v].slice(0);a(m,l,n);var g=e.util.createBuffer(),y;t==="SHA-512"?y=m.length:t==="SHA-384"?y=m.length-2:y=m.length-4;for(var v=0;v<y;++v)g.putInt32(m[v][0]),(v!==y-1||t!=="SHA-512/224")&&g.putInt32(m[v][1]);return g},h}throw new Error("Invalid SHA-512 algorithm: "+t)};var r=null,i=!1,s=null,o=null}var r="sha512";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/sha512",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){e.md=e.md||{},e.md.algorithms={md5:e.md5,sha1:e.sha1,sha256:e.sha256},e.md.md5=e.md5,e.md.sha1=e.sha1,e.md.sha256=e.sha256}var r="md";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/md",["require","module","./md5","./sha1","./sha256","./sha512"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t=e.hmac=e.hmac||{};t.create=function(){var t=null,n=null,r=null,i=null,s={};return s.start=function(s,o){if(s!==null)if(typeof s=="string"){s=s.toLowerCase();if(!(s in e.md.algorithms))throw new Error('Unknown hash algorithm "'+s+'"');n=e.md.algorithms[s].create()}else n=s;if(o===null)o=t;else{if(typeof o=="string")o=e.util.createBuffer(o);else if(e.util.isArray(o)){var u=o;o=e.util.createBuffer();for(var a=0;a<u.length;++a)o.putByte(u[a])}var f=o.length();f>n.blockLength&&(n.start(),n.update(o.bytes()),o=n.digest()),r=e.util.createBuffer(),i=e.util.createBuffer(),f=o.length();for(var a=0;a<f;++a){var u=o.at(a);r.putByte(54^u),i.putByte(92^u)}if(f<n.blockLength){var u=n.blockLength-f;for(var a=0;a<u;++a)r.putByte(54),i.putByte(92)}t=o,r=r.bytes(),i=i.bytes()}n.start(),n.update(r)},s.update=function(e){n.update(e)},s.getMac=function(){var e=n.digest().bytes();return n.start(),n.update(i),n.update(e),n.digest()},s.digest=s.getMac,s}}var r="hmac";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/hmac",["require","module","./md","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function n(e){var t=e.name+": ",n=[],r=function(e,t){return" "+t};for(var i=0;i<e.values.length;++i)n.push(e.values[i].replace(/^(\S+\r\n)/,r));t+=n.join(",")+"\r\n";var s=0,o=-1;for(var i=0;i<t.length;++i,++s)if(s>65&&o!==-1){var u=t[o];u===","?(++o,t=t.substr(0,o)+"\r\n "+t.substr(o)):t=t.substr(0,o)+"\r\n"+u+t.substr(o+1),s=i-o-1,o=-1,++i}else if(t[i]===" "||t[i]==="	"||t[i]===",")o=i;return t}function r(e){return e.replace(/^\s+/,"")}var t=e.pem=e.pem||{};t.encode=function(t,r){r=r||{};var i="-----BEGIN "+t.type+"-----\r\n",s;t.procType&&(s={name:"Proc-Type",values:[String(t.procType.version),t.procType.type]},i+=n(s)),t.contentDomain&&(s={name:"Content-Domain",values:[t.contentDomain]},i+=n(s)),t.dekInfo&&(s={name:"DEK-Info",values:[t.dekInfo.algorithm]},t.dekInfo.parameters&&s.values.push(t.dekInfo.parameters),i+=n(s));if(t.headers)for(var o=0;o<t.headers.length;++o)i+=n(t.headers[o]);return t.procType&&(i+="\r\n"),i+=e.util.encode64(t.body,r.maxline||64)+"\r\n",i+="-----END "+t.type+"-----\r\n",i},t.decode=function(t){var n=[],i=/\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g,s=/([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/,o=/\r?\n/,u;for(;;){u=i.exec(t);if(!u)break;var a={type:u[1],procType:null,contentDomain:null,dekInfo:null,headers:[],body:e.util.decode64(u[3])};n.push(a);if(!u[2])continue;var f=u[2].split(o),l=0;while(u&&l<f.length){var c=f[l].replace(/\s+$/,"");for(var h=l+1;h<f.length;++h){var p=f[h];if(!/\s/.test(p[0]))break;c+=p,l=h}u=c.match(s);if(u){var d={name:u[1],values:[]},v=u[2].split(",");for(var m=0;m<v.length;++m)d.values.push(r(v[m]));if(!a.procType){if(d.name!=="Proc-Type")throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');if(d.values.length!==2)throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');a.procType={version:v[0],type:v[1]}}else if(!a.contentDomain&&d.name==="Content-Domain")a.contentDomain=v[0]||"";else if(!a.dekInfo&&d.name==="DEK-Info"){if(d.values.length===0)throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');a.dekInfo={algorithm:v[0],parameters:v[1]||null}}else a.headers.push(d)}++l}if(a.procType==="ENCRYPTED"&&!a.dekInfo)throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".')}if(n.length===0)throw new Error("Invalid PEM formatted message.");return n}}var r="pem";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pem",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function t(t,n){var r=function(){return new e.des.Algorithm(t,n)};e.cipher.registerAlgorithm(t,r)}function l(e){var t=[0,4,536870912,536870916,65536,65540,536936448,536936452,512,516,536871424,536871428,66048,66052,536936960,536936964],n=[0,1,1048576,1048577,67108864,67108865,68157440,68157441,256,257,1048832,1048833,67109120,67109121,68157696,68157697],r=[0,8,2048,2056,16777216,16777224,16779264,16779272,0,8,2048,2056,16777216,16777224,16779264,16779272],i=[0,2097152,134217728,136314880,8192,2105344,134225920,136323072,131072,2228224,134348800,136445952,139264,2236416,134356992,136454144],s=[0,262144,16,262160,0,262144,16,262160,4096,266240,4112,266256,4096,266240,4112,266256],o=[0,1024,32,1056,0,1024,32,1056,33554432,33555456,33554464,33555488,33554432,33555456,33554464,33555488],u=[0,268435456,524288,268959744,2,268435458,524290,268959746,0,268435456,524288,268959744,2,268435458,524290,268959746],a=[0,65536,2048,67584,536870912,536936448,536872960,536938496,131072,196608,133120,198656,537001984,537067520,537004032,537069568],f=[0,262144,0,262144,2,262146,2,262146,33554432,33816576,33554432,33816576,33554434,33816578,33554434,33816578],l=[0,268435456,8,268435464,0,268435456,8,268435464,1024,268436480,1032,268436488,1024,268436480,1032,268436488],c=[0,32,0,32,1048576,1048608,1048576,1048608,8192,8224,8192,8224,1056768,1056800,1056768,1056800],h=[0,16777216,512,16777728,2097152,18874368,2097664,18874880,67108864,83886080,67109376,83886592,69206016,85983232,69206528,85983744],p=[0,4096,134217728,134221824,524288,528384,134742016,134746112,16,4112,134217744,134221840,524304,528400,134742032,134746128],d=[0,4,256,260,0,4,256,260,1,5,257,261,1,5,257,261],v=e.length()>8?3:1,m=[],g=[0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],y=0,b;for(var w=0;w<v;w++){var E=e.getInt32(),S=e.getInt32();b=(E>>>4^S)&252645135,S^=b,E^=b<<4,b=(S>>>-16^E)&65535,E^=b,S^=b<<-16,b=(E>>>2^S)&858993459,S^=b,E^=b<<2,b=(S>>>-16^E)&65535,E^=b,S^=b<<-16,b=(E>>>1^S)&1431655765,S^=b,E^=b<<1,b=(S>>>8^E)&16711935,E^=b,S^=b<<8,b=(E>>>1^S)&1431655765,S^=b,E^=b<<1,b=E<<8|S>>>20&240,E=S<<24|S<<8&16711680|S>>>8&65280|S>>>24&240,S=b;for(var x=0;x<g.length;++x){g[x]?(E=E<<2|E>>>26,S=S<<2|S>>>26):(E=E<<1|E>>>27,S=S<<1|S>>>27),E&=-15,S&=-15;var T=t[E>>>28]|n[E>>>24&15]|r[E>>>20&15]|i[E>>>16&15]|s[E>>>12&15]|o[E>>>8&15]|u[E>>>4&15],N=a[S>>>28]|f[S>>>24&15]|l[S>>>20&15]|c[S>>>16&15]|h[S>>>12&15]|p[S>>>8&15]|d[S>>>4&15];b=(N>>>16^T)&65535,m[y++]=T^b,m[y++]=N^b<<16}}return m}function c(e,t,l,c){var h=e.length===32?3:9,p;h===3?p=c?[30,-2,-2]:[0,32,2]:p=c?[94,62,-2,32,64,2,30,-2,-2]:[0,32,2,62,30,-2,64,96,2];var d,v=t[0],m=t[1];d=(v>>>4^m)&252645135,m^=d,v^=d<<4,d=(v>>>16^m)&65535,m^=d,v^=d<<16,d=(m>>>2^v)&858993459,v^=d,m^=d<<2,d=(m>>>8^v)&16711935,v^=d,m^=d<<8,d=(v>>>1^m)&1431655765,m^=d,v^=d<<1,v=v<<1|v>>>31,m=m<<1|m>>>31;for(var g=0;g<h;g+=3){var y=p[g+1],b=p[g+2];for(var w=p[g];w!=y;w+=b){var E=m^e[w],S=(m>>>4|m<<28)^e[w+1];d=v,v=m,m=d^(r[E>>>24&63]|s[E>>>16&63]|u[E>>>8&63]|f[E&63]|n[S>>>24&63]|i[S>>>16&63]|o[S>>>8&63]|a[S&63])}d=v,v=m,m=d}v=v>>>1|v<<31,m=m>>>1|m<<31,d=(v>>>1^m)&1431655765,m^=d,v^=d<<1,d=(m>>>8^v)&16711935,v^=d,m^=d<<8,d=(m>>>2^v)&858993459,v^=d,m^=d<<2,d=(v>>>16^m)&65535,m^=d,v^=d<<16,d=(v>>>4^m)&252645135,m^=d,v^=d<<4,l[0]=v,l[1]=m}function h(t){t=t||{};var n=(t.mode||"CBC").toUpperCase(),r="DES-"+n,i;t.decrypt?i=e.cipher.createDecipher(r,t.key):i=e.cipher.createCipher(r,t.key);var s=i.start;return i.start=function(t,n){var r=null;n instanceof e.util.ByteBuffer&&(r=n,n={}),n=n||{},n.output=r,n.iv=t,s.call(i,n)},i}e.des=e.des||{},e.des.startEncrypting=function(e,t,n,r){var i=h({key:e,output:n,decrypt:!1,mode:r||(t===null?"ECB":"CBC")});return i.start(t),i},e.des.createEncryptionCipher=function(e,t){return h({key:e,output:null,decrypt:!1,mode:t})},e.des.startDecrypting=function(e,t,n,r){var i=h({key:e,output:n,decrypt:!0,mode:r||(t===null?"ECB":"CBC")});return i.start(t),i},e.des.createDecryptionCipher=function(e,t){return h({key:e,output:null,decrypt:!0,mode:t})},e.des.Algorithm=function(e,t){var n=this;n.name=e,n.mode=new t({blockSize:8,cipher:{encrypt:function(e,t){return c(n._keys,e,t,!1)},decrypt:function(e,t){return c(n._keys,e,t,!0)}}}),n._init=!1},e.des.Algorithm.prototype.initialize=function(t){if(this._init)return;var n=e.util.createBuffer(t.key);if(this.name.indexOf("3DES")===0&&n.length()!==24)throw new Error("Invalid Triple-DES key size: "+n.length()*8);this._keys=l(n),this._init=!0},t("DES-ECB",e.cipher.modes.ecb),t("DES-CBC",e.cipher.modes.cbc),t("DES-CFB",e.cipher.modes.cfb),t("DES-OFB",e.cipher.modes.ofb),t("DES-CTR",e.cipher.modes.ctr),t("3DES-ECB",e.cipher.modes.ecb),t("3DES-CBC",e.cipher.modes.cbc),t("3DES-CFB",e.cipher.modes.cfb),t("3DES-OFB",e.cipher.modes.ofb),t("3DES-CTR",e.cipher.modes.ctr);var n=[16843776,0,65536,16843780,16842756,66564,4,65536,1024,16843776,16843780,1024,16778244,16842756,16777216,4,1028,16778240,16778240,66560,66560,16842752,16842752,16778244,65540,16777220,16777220,65540,0,1028,66564,16777216,65536,16843780,4,16842752,16843776,16777216,16777216,1024,16842756,65536,66560,16777220,1024,4,16778244,66564,16843780,65540,16842752,16778244,16777220,1028,66564,16843776,1028,16778240,16778240,0,65540,66560,0,16842756],r=[-2146402272,-2147450880,32768,1081376,1048576,32,-2146435040,-2147450848,-2147483616,-2146402272,-2146402304,-2147483648,-2147450880,1048576,32,-2146435040,1081344,1048608,-2147450848,0,-2147483648,32768,1081376,-2146435072,1048608,-2147483616,0,1081344,32800,-2146402304,-2146435072,32800,0,1081376,-2146435040,1048576,-2147450848,-2146435072,-2146402304,32768,-2146435072,-2147450880,32,-2146402272,1081376,32,32768,-2147483648,32800,-2146402304,1048576,-2147483616,1048608,-2147450848,-2147483616,1048608,1081344,0,-2147450880,32800,-2147483648,-2146435040,-2146402272,1081344],i=[520,134349312,0,134348808,134218240,0,131592,134218240,131080,134217736,134217736,131072,134349320,131080,134348800,520,134217728,8,134349312,512,131584,134348800,134348808,131592,134218248,131584,131072,134218248,8,134349320,512,134217728,134349312,134217728,131080,520,131072,134349312,134218240,0,512,131080,134349320,134218240,134217736,512,0,134348808,134218248,131072,134217728,134349320,8,131592,131584,134217736,134348800,134218248,520,134348800,131592,8,134348808,131584],s=[8396801,8321,8321,128,8396928,8388737,8388609,8193,0,8396800,8396800,8396929,129,0,8388736,8388609,1,8192,8388608,8396801,128,8388608,8193,8320,8388737,1,8320,8388736,8192,8396928,8396929,129,8388736,8388609,8396800,8396929,129,0,0,8396800,8320,8388736,8388737,1,8396801,8321,8321,128,8396929,129,1,8192,8388609,8193,8396928,8388737,8193,8320,8388608,8396801,128,8388608,8192,8396928],o=[256,34078976,34078720,1107296512,524288,256,1073741824,34078720,1074266368,524288,33554688,1074266368,1107296512,1107820544,524544,1073741824,33554432,1074266112,1074266112,0,1073742080,1107820800,1107820800,33554688,1107820544,1073742080,0,1107296256,34078976,33554432,1107296256,524544,524288,1107296512,256,33554432,1073741824,34078720,1107296512,1074266368,33554688,1073741824,1107820544,34078976,1074266368,256,33554432,1107820544,1107820800,524544,1107296256,1107820800,34078720,0,1074266112,1107296256,524544,33554688,1073742080,524288,0,1074266112,34078976,1073742080],u=[536870928,541065216,16384,541081616,541065216,16,541081616,4194304,536887296,4210704,4194304,536870928,4194320,536887296,536870912,16400,0,4194320,536887312,16384,4210688,536887312,16,541065232,541065232,0,4210704,541081600,16400,4210688,541081600,536870912,536887296,16,541065232,4210688,541081616,4194304,16400,536870928,4194304,536887296,536870912,16400,536870928,541081616,4210688,541065216,4210704,541081600,0,541065232,16,16384,541065216,4210704,16384,4194320,536887312,0,541081600,536870912,4194320,536887312],a=[2097152,69206018,67110914,0,2048,67110914,2099202,69208064,69208066,2097152,0,67108866,2,67108864,69206018,2050,67110912,2099202,2097154,67110912,67108866,69206016,69208064,2097154,69206016,2048,2050,69208066,2099200,2,67108864,2099200,67108864,2099200,2097152,67110914,67110914,69206018,69206018,2,2097154,67108864,67110912,2097152,69208064,2050,2099202,69208064,2050,67108866,69208066,69206016,2099200,0,2,69208066,0,2099202,69206016,2048,67108866,67110912,2048,2097154],f=[268439616,4096,262144,268701760,268435456,268439616,64,268435456,262208,268697600,268701760,266240,268701696,266304,4096,64,268697600,268435520,268439552,4160,266240,262208,268697664,268701696,4160,0,0,268697664,268435520,268439552,266304,262144,266304,262144,268701696,4096,64,268697664,4096,266304,268439552,64,268435520,268697600,268697664,268435456,262144,268439616,0,268701760,262208,268435520,268697600,268439552,268439616,0,268701760,266240,266240,4160,4160,262208,268435456,268701696]}var r="des";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/des",["require","module","./cipher","./cipherModes","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var n=e.pkcs5=e.pkcs5||{},r=typeof process!="undefined"&&process.versions&&process.versions.node,i;r&&!e.disableNativeCode&&(i=t("crypto")),e.pbkdf2=n.pbkdf2=function(t,n,s,o,u,a){function w(){if(y>c)return a(null,d);p.start(null,null),p.update(n),p.update(e.util.int32ToBytes(y)),v=g=p.digest().getBytes(),b=2,E()}function E(){if(b<=s)return p.start(null,null),p.update(g),m=p.digest().getBytes(),v=e.util.xorBytes(v,m,f),g=m,++b,e.util.setImmediate(E);d+=y<c?v:v.substr(0,h),++y,w()}typeof u=="function"&&(a=u,u=null);if(r&&!e.disableNativeCode&&i.pbkdf2&&(u===null||typeof u!="object")&&(i.pbkdf2Sync.length>4||!u||u==="sha1"))return typeof u!="string"&&(u="sha1"),n=new Buffer(n,"binary"),a?i.pbkdf2Sync.length===4?i.pbkdf2(t,n,s,o,function(e,t){if(e)return a(e);a(null,t.toString("binary"))}):i.pbkdf2(t,n,s,o,u,function(e,t){if(e)return a(e);a(null,t.toString("binary"))}):i.pbkdf2Sync.length===4?i.pbkdf2Sync(t,n,s,o).toString("binary"):i.pbkdf2Sync(t,n,s,o,u).toString("binary");if(typeof u=="undefined"||u===null)u=e.md.sha1.create();if(typeof u=="string"){if(!(u in e.md.algorithms))throw new Error("Unknown hash algorithm: "+u);u=e.md[u].create()}var f=u.digestLength;if(o>4294967295*f){var l=new Error("Derived key is too long.");if(a)return a(l);throw l}var c=Math.ceil(o/f),h=o-(c-1)*f,p=e.hmac.create();p.start(u,t);var d="",v,m,g;if(!a){for(var y=1;y<=c;++y){p.start(null,null),p.update(n),p.update(e.util.int32ToBytes(y)),v=g=p.digest().getBytes();for(var b=2;b<=s;++b)p.start(null,null),p.update(g),m=p.digest().getBytes(),v=e.util.xorBytes(v,m,f),g=m;d+=y<c?v:v.substr(0,h)}return d}var y=1,b;w()}}var r="pbkdf2";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pbkdf2",["require","module","./hmac","./md","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var n=typeof process!="undefined"&&process.versions&&process.versions.node,r=null;!e.disableNativeCode&&n&&!process.versions["node-webkit"]&&(r=t("crypto"));var i=e.prng=e.prng||{};i.create=function(t){function u(e){if(n.pools[0].messageLength>=32)return f(),e();var t=32-n.pools[0].messageLength<<5;n.seedFile(t,function(t,r){if(t)return e(t);n.collect(r),f(),e()})}function a(){if(n.pools[0].messageLength>=32)return f();var e=32-n.pools[0].messageLength<<5;n.collect(n.seedFileSync(e)),f()}function f(){var e=n.plugin.md.create();e.update(n.pools[0].digest().getBytes()),n.pools[0].start();var t=1;for(var r=1;r<32;++r)t=t===31?2147483648:t<<2,t%n.reseeds===0&&(e.update(n.pools[r].digest().getBytes()),n.pools[r].start());var i=e.digest().getBytes();e.start(),e.update(i);var s=e.digest().getBytes();n.key=n.plugin.formatKey(i),n.seed=n.plugin.formatSeed(s),n.reseeds=n.reseeds===4294967295?0:n.reseeds+1,n.generated=0}function l(t){var n=null;if(typeof window!="undefined"){var r=window.crypto||window.msCrypto;r&&r.getRandomValues&&(n=function(e){return r.getRandomValues(e)})}var i=e.util.createBuffer();if(n)while(i.length()<t){var s=Math.max(1,Math.min(t-i.length(),65536)/4),o=new Uint32Array(Math.floor(s));try{n(o);for(var u=0;u<o.length;++u)i.putInt32(o[u])}catch(a){if(!(typeof QuotaExceededError!="undefined"&&a instanceof QuotaExceededError))throw a}}if(i.length()<t){var f,l,c,h=Math.floor(Math.random()*65536);while(i.length()<t){l=16807*(h&65535),f=16807*(h>>16),l+=(f&32767)<<16,l+=f>>15,l=(l&2147483647)+(l>>31),h=l&4294967295;for(var u=0;u<3;++u)c=h>>>(u<<3),c^=Math.floor(Math.random()*256),i.putByte(String.fromCharCode(c&255))}}return i.getBytes(t)}var n={plugin:t,key:null,seed:null,time:null,reseeds:0,generated:0},i=t.md,s=new Array(32);for(var o=0;o<32;++o)s[o]=i.create();return n.pools=s,n.pool=0,n.generate=function(t,r){function l(c){if(c)return r(c);if(f.length()>=t)return r(null,f.getBytes(t));n.generated>1048575&&(n.key=null);if(n.key===null)return e.util.nextTick(function(){u(l)});var h=i(n.key,n.seed);n.generated+=h.length,f.putBytes(h),n.key=o(i(n.key,s(n.seed))),n.seed=a(i(n.key,n.seed)),e.util.setImmediate(l)}if(!r)return n.generateSync(t);var i=n.plugin.cipher,s=n.plugin.increment,o=n.plugin.formatKey,a=n.plugin.formatSeed,f=e.util.createBuffer();n.key=null,l()},n.generateSync=function(t){var r=n.plugin.cipher,i=n.plugin.increment,s=n.plugin.formatKey,o=n.plugin.formatSeed;n.key=null;var u=e.util.createBuffer();while(u.length()<t){n.generated>1048575&&(n.key=null),n.key===null&&a();var f=r(n.key,n.seed);n.generated+=f.length,u.putBytes(f),n.key=s(r(n.key,i(n.seed))),n.seed=o(r(n.key,n.seed))}return u.getBytes(t)},r?(n.seedFile=function(e,t){r.randomBytes(e,function(e,n){if(e)return t(e);t(null,n.toString())})},n.seedFileSync=function(e){return r.randomBytes(e).toString()}):(n.seedFile=function(e,t){try{t(null,l(e))}catch(n){t(n)}},n.seedFileSync=l),n.collect=function(e){var t=e.length;for(var r=0;r<t;++r)n.pools[n.pool].update(e.substr(r,1)),n.pool=n.pool===31?0:n.pool+1},n.collectInt=function(e,t){var r="";for(var i=0;i<t;i+=8)r+=String.fromCharCode(e>>i&255);n.collect(r)},n.registerWorker=function(e){if(e===self)n.seedFile=function(e,t){function n(e){var r=e.data;r.forge&&r.forge.prng&&(self.removeEventListener("message",n),t(r.forge.prng.err,r.forge.prng.bytes))}self.addEventListener("message",n),self.postMessage({forge:{prng:{needed:e}}})};else{var t=function(t){var r=t.data;r.forge&&r.forge.prng&&n.seedFile(r.forge.prng.needed,function(t,n){e.postMessage({forge:{prng:{err:t,bytes:n}}})})};e.addEventListener("message",t)}},n}}var r="prng";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/prng",["require","module","./md","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){if(e.random&&e.random.getBytes)return;(function(t){function s(){var t=e.prng.create(n);return t.getBytes=function(e,n){return t.generate(e,n)},t.getBytesSync=function(e){return t.generate(e)},t}var n={},r=new Array(4),i=e.util.createBuffer();n.formatKey=function(t){var n=e.util.createBuffer(t);return t=new Array(4),t[0]=n.getInt32(),t[1]=n.getInt32(),t[2]=n.getInt32(),t[3]=n.getInt32(),e.aes._expandKey(t,!1)},n.formatSeed=function(t){var n=e.util.createBuffer(t);return t=new Array(4),t[0]=n.getInt32(),t[1]=n.getInt32(),t[2]=n.getInt32(),t[3]=n.getInt32(),t},n.cipher=function(t,n){return e.aes._updateBlock(t,n,r,!1),i.putInt32(r[0]),i.putInt32(r[1]),i.putInt32(r[2]),i.putInt32(r[3]),i.getBytes()},n.increment=function(e){return++e[3],e},n.md=e.md.sha256;var o=s(),u=typeof process!="undefined"&&process.versions&&process.versions.node,a=null;if(typeof window!="undefined"){var f=window.crypto||window.msCrypto;f&&f.getRandomValues&&(a=function(e){return f.getRandomValues(e)})}if(e.disableNativeCode||!u&&!a){typeof window=="undefined"||window.document===undefined,o.collectInt(+(new Date),32);if(typeof navigator!="undefined"){var l="";for(var c in navigator)try{typeof navigator[c]=="string"&&(l+=navigator[c])}catch(h){}o.collect(l),l=null}t&&(t().mousemove(function(e){o.collectInt(e.clientX,16),o.collectInt(e.clientY,16)}),t().keypress(function(e){o.collectInt(e.charCode,8)}))}if(!e.random)e.random=o;else for(var c in o)e.random[c]=o[c];e.random.createInstance=s})(typeof jQuery!="undefined"?jQuery:null)}var r="random";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/random",["require","module","./aes","./md","./prng","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t=[217,120,249,196,25,221,181,237,40,233,253,121,74,160,216,157,198,126,55,131,43,118,83,142,98,76,100,136,68,139,251,162,23,154,89,245,135,179,79,19,97,69,109,141,9,129,125,50,189,143,64,235,134,183,123,11,240,149,33,34,92,107,78,130,84,214,101,147,206,96,178,28,115,86,192,20,167,140,241,220,18,117,202,31,59,190,228,209,66,61,212,48,163,60,182,38,111,191,14,218,70,105,7,87,39,242,29,155,188,148,67,3,248,17,199,246,144,239,62,231,6,195,213,47,200,102,30,215,8,232,234,222,128,82,238,247,132,170,114,172,53,77,106,42,150,26,210,113,90,21,73,116,75,159,208,94,4,24,164,236,194,224,65,110,15,81,203,204,36,145,175,80,161,244,112,57,153,124,58,133,35,184,180,122,252,2,54,91,37,85,151,49,45,93,250,152,227,138,146,174,5,223,41,16,103,108,186,201,211,0,230,207,225,158,168,44,99,22,1,63,88,226,137,169,13,56,52,27,171,51,255,176,187,72,12,95,185,177,205,46,197,243,219,71,229,165,156,119,10,166,32,104,254,127,193,173],n=[1,2,3,5],r=function(e,t){return e<<t&65535|(e&65535)>>16-t},i=function(e,t){return(e&65535)>>t|e<<16-t&65535};e.rc2=e.rc2||{},e.rc2.expandKey=function(n,r){typeof n=="string"&&(n=e.util.createBuffer(n)),r=r||128;var i=n,s=n.length(),o=r,u=Math.ceil(o/8),a=255>>(o&7),f;for(f=s;f<128;f++)i.putByte(t[i.at(f-1)+i.at(f-s)&255]);i.setAt(128-u,t[i.at(128-u)&a]);for(f=127-u;f>=0;f--)i.setAt(f,t[i.at(f+1)^i.at(f+u)]);return i};var s=function(t,s,o){var u=!1,a=null,f=null,l=null,c,h,p,d,v=[];t=e.rc2.expandKey(t,s);for(p=0;p<64;p++)v.push(t.getInt16Le());o?(c=function(e){for(p=0;p<4;p++)e[p]+=v[d]+(e[(p+3)%4]&e[(p+2)%4])+(~e[(p+3)%4]&e[(p+1)%4]),e[p]=r(e[p],n[p]),d++},h=function(e){for(p=0;p<4;p++)e[p]+=v[e[(p+3)%4]&63]}):(c=function(e){for(p=3;p>=0;p--)e[p]=i(e[p],n[p]),e[p]-=v[d]+(e[(p+3)%4]&e[(p+2)%4])+(~e[(p+3)%4]&e[(p+1)%4]),d--},h=function(e){for(p=3;p>=0;p--)e[p]-=v[e[(p+3)%4]&63]});var m=function(e){var t=[];for(p=0;p<4;p++){var n=a.getInt16Le();l!==null&&(o?n^=l.getInt16Le():l.putInt16Le(n)),t.push(n&65535)}d=o?0:63;for(var r=0;r<e.length;r++)for(var i=0;i<e[r][0];i++)e[r][1](t);for(p=0;p<4;p++)l!==null&&(o?l.putInt16Le(t[p]):t[p]^=l.getInt16Le()),f.putInt16Le(t[p])},g=null;return g={start:function(t,n){t&&typeof t=="string"&&(t=e.util.createBuffer(t)),u=!1,a=e.util.createBuffer(),f=n||new e.util.createBuffer,l=t,g.output=f},update:function(e){u||a.putBuffer(e);while(a.length()>=8)m([[5,c],[1,h],[6,c],[1,h],[5,c]])},finish:function(e){var t=!0;if(o)if(e)t=e(8,a,!o);else{var n=a.length()===8?8:8-a.length();a.fillWithByte(n,n)}t&&(u=!0,g.update());if(!o){t=a.length()===0;if(t)if(e)t=e(8,f,!o);else{var r=f.length(),i=f.at(r-1);i>r?t=!1:f.truncate(i)}}return t}},g};e.rc2.startEncrypting=function(t,n,r){var i=e.rc2.createEncryptionCipher(t,128);return i.start(n,r),i},e.rc2.createEncryptionCipher=function(e,t){return s(e,t,!0)},e.rc2.startDecrypting=function(t,n,r){var i=e.rc2.createDecryptionCipher(t,128);return i.start(n,r),i},e.rc2.createDecryptionCipher=function(e,t){return s(e,t,!1)}}var r="rc2";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/rc2",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function i(e,t,n){this.data=[],e!=null&&("number"==typeof e?this.fromNumber(e,t,n):t==null&&"string"!=typeof e?this.fromString(e,256):this.fromString(e,t))}function s(){return new i(null)}function o(e,t,n,r,i,s){while(--s>=0){var o=t*this.data[e++]+n.data[r]+i;i=Math.floor(o/67108864),n.data[r++]=o&67108863}return i}function u(e,t,n,r,i,s){var o=t&32767,u=t>>15;while(--s>=0){var a=this.data[e]&32767,f=this.data[e++]>>15,l=u*a+f*o;a=o*a+((l&32767)<<15)+n.data[r]+(i&1073741823),i=(a>>>30)+(l>>>15)+u*f+(i>>>30),n.data[r++]=a&1073741823}return i}function a(e,t,n,r,i,s){var o=t&16383,u=t>>14;while(--s>=0){var a=this.data[e]&16383,f=this.data[e++]>>14,l=u*a+f*o;a=o*a+((l&16383)<<14)+n.data[r]+i,i=(a>>28)+(l>>14)+u*f,n.data[r++]=a&268435455}return i}function d(e){return l.charAt(e)}function v(e,t){var n=c[e.charCodeAt(t)];return n==null?-1:n}function m(e){for(var t=this.t-1;t>=0;--t)e.data[t]=this.data[t];e.t=this.t,e.s=this.s}function g(e){this.t=1,this.s=e<0?-1:0,e>0?this.data[0]=e:e<-1?this.data[0]=e+this.DV:this.t=0}function y(e){var t=s();return t.fromInt(e),t}function b(e,t){var n;if(t==16)n=4;else if(t==8)n=3;else if(t==256)n=8;else if(t==2)n=1;else if(t==32)n=5;else{if(t!=4){this.fromRadix(e,t);return}n=2}this.t=0,this.s=0;var r=e.length,s=!1,o=0;while(--r>=0){var u=n==8?e[r]&255:v(e,r);if(u<0){e.charAt(r)=="-"&&(s=!0);continue}s=!1,o==0?this.data[this.t++]=u:o+n>this.DB?(this.data[this.t-1]|=(u&(1<<this.DB-o)-1)<<o,this.data[this.t++]=u>>this.DB-o):this.data[this.t-1]|=u<<o,o+=n,o>=this.DB&&(o-=this.DB)}n==8&&(e[0]&128)!=0&&(this.s=-1,o>0&&(this.data[this.t-1]|=(1<<this.DB-o)-1<<o)),this.clamp(),s&&i.ZERO.subTo(this,this)}function w(){var e=this.s&this.DM;while(this.t>0&&this.data[this.t-1]==e)--this.t}function E(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(e==16)t=4;else if(e==8)t=3;else if(e==2)t=1;else if(e==32)t=5;else{if(e!=4)return this.toRadix(e);t=2}var n=(1<<t)-1,r,i=!1,s="",o=this.t,u=this.DB-o*this.DB%t;if(o-->0){u<this.DB&&(r=this.data[o]>>u)>0&&(i=!0,s=d(r));while(o>=0)u<t?(r=(this.data[o]&(1<<u)-1)<<t-u,r|=this.data[--o]>>(u+=this.DB-t)):(r=this.data[o]>>(u-=t)&n,u<=0&&(u+=this.DB,--o)),r>0&&(i=!0),i&&(s+=d(r))}return i?s:"0"}function S(){var e=s();return i.ZERO.subTo(this,e),e}function x(){return this.s<0?this.negate():this}function T(e){var t=this.s-e.s;if(t!=0)return t;var n=this.t;t=n-e.t;if(t!=0)return this.s<0?-t:t;while(--n>=0)if((t=this.data[n]-e.data[n])!=0)return t;return 0}function N(e){var t=1,n;return(n=e>>>16)!=0&&(e=n,t+=16),(n=e>>8)!=0&&(e=n,t+=8),(n=e>>4)!=0&&(e=n,t+=4),(n=e>>2)!=0&&(e=n,t+=2),(n=e>>1)!=0&&(e=n,t+=1),t}function C(){return this.t<=0?0:this.DB*(this.t-1)+N(this.data[this.t-1]^this.s&this.DM)}function k(e,t){var n;for(n=this.t-1;n>=0;--n)t.data[n+e]=this.data[n];for(n=e-1;n>=0;--n)t.data[n]=0;t.t=this.t+e,t.s=this.s}function L(e,t){for(var n=e;n<this.t;++n)t.data[n-e]=this.data[n];t.t=Math.max(this.t-e,0),t.s=this.s}function A(e,t){var n=e%this.DB,r=this.DB-n,i=(1<<r)-1,s=Math.floor(e/this.DB),o=this.s<<n&this.DM,u;for(u=this.t-1;u>=0;--u)t.data[u+s+1]=this.data[u]>>r|o,o=(this.data[u]&i)<<n;for(u=s-1;u>=0;--u)t.data[u]=0;t.data[s]=o,t.t=this.t+s+1,t.s=this.s,t.clamp()}function O(e,t){t.s=this.s;var n=Math.floor(e/this.DB);if(n>=this.t){t.t=0;return}var r=e%this.DB,i=this.DB-r,s=(1<<r)-1;t.data[0]=this.data[n]>>r;for(var o=n+1;o<this.t;++o)t.data[o-n-1]|=(this.data[o]&s)<<i,t.data[o-n]=this.data[o]>>r;r>0&&(t.data[this.t-n-1]|=(this.s&s)<<i),t.t=this.t-n,t.clamp()}function M(e,t){var n=0,r=0,i=Math.min(e.t,this.t);while(n<i)r+=this.data[n]-e.data[n],t.data[n++]=r&this.DM,r>>=this.DB;if(e.t<this.t){r-=e.s;while(n<this.t)r+=this.data[n],t.data[n++]=r&this.DM,r>>=this.DB;r+=this.s}else{r+=this.s;while(n<e.t)r-=e.data[n],t.data[n++]=r&this.DM,r>>=this.DB;r-=e.s}t.s=r<0?-1:0,r<-1?t.data[n++]=this.DV+r:r>0&&(t.data[n++]=r),t.t=n,t.clamp()}function _(e,t){var n=this.abs(),r=e.abs(),s=n.t;t.t=s+r.t;while(--s>=0)t.data[s]=0;for(s=0;s<r.t;++s)t.data[s+n.t]=n.am(0,r.data[s],t,s,0,n.t);t.s=0,t.clamp(),this.s!=e.s&&i.ZERO.subTo(t,t)}function D(e){var t=this.abs(),n=e.t=2*t.t;while(--n>=0)e.data[n]=0;for(n=0;n<t.t-1;++n){var r=t.am(n,t.data[n],e,2*n,0,1);(e.data[n+t.t]+=t.am(n+1,2*t.data[n],e,2*n+1,r,t.t-n-1))>=t.DV&&(e.data[n+t.t]-=t.DV,e.data[n+t.t+1]=1)}e.t>0&&(e.data[e.t-1]+=t.am(n,t.data[n],e,2*n,0,1)),e.s=0,e.clamp()}function P(e,t,n){var r=e.abs();if(r.t<=0)return;var o=this.abs();if(o.t<r.t){t!=null&&t.fromInt(0),n!=null&&this.copyTo(n);return}n==null&&(n=s());var u=s(),a=this.s,f=e.s,l=this.DB-N(r.data[r.t-1]);l>0?(r.lShiftTo(l,u),o.lShiftTo(l,n)):(r.copyTo(u),o.copyTo(n));var c=u.t,h=u.data[c-1];if(h==0)return;var p=h*(1<<this.F1)+(c>1?u.data[c-2]>>this.F2:0),d=this.FV/p,v=(1<<this.F1)/p,m=1<<this.F2,g=n.t,y=g-c,b=t==null?s():t;u.dlShiftTo(y,b),n.compareTo(b)>=0&&(n.data[n.t++]=1,n.subTo(b,n)),i.ONE.dlShiftTo(c,b),b.subTo(u,u);while(u.t<c)u.data[u.t++]=0;while(--y>=0){var w=n.data[--g]==h?this.DM:Math.floor(n.data[g]*d+(n.data[g-1]+m)*v);if((n.data[g]+=u.am(0,w,n,y,0,c))<w){u.dlShiftTo(y,b),n.subTo(b,n);while(n.data[g]<--w)n.subTo(b,n)}}t!=null&&(n.drShiftTo(c,t),a!=f&&i.ZERO.subTo(t,t)),n.t=c,n.clamp(),l>0&&n.rShiftTo(l,n),a<0&&i.ZERO.subTo(n,n)}function H(e){var t=s();return this.abs().divRemTo(e,null,t),this.s<0&&t.compareTo(i.ZERO)>0&&e.subTo(t,t),t}function B(e){this.m=e}function j(e){return e.s<0||e.compareTo(this.m)>=0?e.mod(this.m):e}function F(e){return e}function I(e){e.divRemTo(this.m,null,e)}function q(e,t,n){e.multiplyTo(t,n),this.reduce(n)}function R(e,t){e.squareTo(t),this.reduce(t)}function U(){if(this.t<1)return 0;var e=this.data[0];if((e&1)==0)return 0;var t=e&3;return t=t*(2-(e&15)*t)&15,t=t*(2-(e&255)*t)&255,t=t*(2-((e&65535)*t&65535))&65535,t=t*(2-e*t%this.DV)%this.DV,t>0?this.DV-t:-t}function z(e){this.m=e,this.mp=e.invDigit(),this.mpl=this.mp&32767,this.mph=this.mp>>15,this.um=(1<<e.DB-15)-1,this.mt2=2*e.t}function W(e){var t=s();return e.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),e.s<0&&t.compareTo(i.ZERO)>0&&this.m.subTo(t,t),t}function X(e){var t=s();return e.copyTo(t),this.reduce(t),t}function V(e){while(e.t<=this.mt2)e.data[e.t++]=0;for(var t=0;t<this.m.t;++t){var n=e.data[t]&32767,r=n*this.mpl+((n*this.mph+(e.data[t]>>15)*this.mpl&this.um)<<15)&e.DM;n=t+this.m.t,e.data[n]+=this.m.am(0,r,e,t,0,this.m.t);while(e.data[n]>=e.DV)e.data[n]-=e.DV,e.data[++n]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)}function $(e,t){e.squareTo(t),this.reduce(t)}function J(e,t,n){e.multiplyTo(t,n),this.reduce(n)}function K(){return(this.t>0?this.data[0]&1:this.s)==0}function Q(e,t){if(e>4294967295||e<1)return i.ONE;var n=s(),r=s(),o=t.convert(this),u=N(e)-1;o.copyTo(n);while(--u>=0){t.sqrTo(n,r);if((e&1<<u)>0)t.mulTo(r,o,n);else{var a=n;n=r,r=a}}return t.revert(n)}function G(e,t){var n;return e<256||t.isEven()?n=new B(t):n=new z(t),this.exp(e,n)}function Y(){var e=s();return this.copyTo(e),e}function Z(){if(this.s<0){if(this.t==1)return this.data[0]-this.DV;if(this.t==0)return-1}else{if(this.t==1)return this.data[0];if(this.t==0)return 0}return(this.data[1]&(1<<32-this.DB)-1)<<this.DB|this.data[0]}function et(){return this.t==0?this.s:this.data[0]<<24>>24}function tt(){return this.t==0?this.s:this.data[0]<<16>>16}function nt(e){return Math.floor(Math.LN2*this.DB/Math.log(e))}function rt(){return this.s<0?-1:this.t<=0||this.t==1&&this.data[0]<=0?0:1}function it(e){e==null&&(e=10);if(this.signum()==0||e<2||e>36)return"0";var t=this.chunkSize(e),n=Math.pow(e,t),r=y(n),i=s(),o=s(),u="";this.divRemTo(r,i,o);while(i.signum()>0)u=(n+o.intValue()).toString(e).substr(1)+u,i.divRemTo(r,i,o);return o.intValue().toString(e)+u}function st(e,t){this.fromInt(0),t==null&&(t=10);var n=this.chunkSize(t),r=Math.pow(t,n),s=!1,o=0,u=0;for(var a=0;a<e.length;++a){var f=v(e,a);if(f<0){e.charAt(a)=="-"&&this.signum()==0&&(s=!0);continue}u=t*u+f,++o>=n&&(this.dMultiply(r),this.dAddOffset(u,0),o=0,u=0)}o>0&&(this.dMultiply(Math.pow(t,o)),this.dAddOffset(u,0)),s&&i.ZERO.subTo(this,this)}function ot(e,t,n){if("number"==typeof t)if(e<2)this.fromInt(1);else{this.fromNumber(e,n),this.testBit(e-1)||this.bitwiseTo(i.ONE.shiftLeft(e-1),dt,this),this.isEven()&&this.dAddOffset(1,0);while(!this.isProbablePrime(t))this.dAddOffset(2,0),this.bitLength()>e&&this.subTo(i.ONE.shiftLeft(e-1),this)}else{var r=new Array,s=e&7;r.length=(e>>3)+1,t.nextBytes(r),s>0?r[0]&=(1<<s)-1:r[0]=0,this.fromString(r,256)}}function ut(){var e=this.t,t=new Array;t[0]=this.s;var n=this.DB-e*this.DB%8,r,i=0;if(e-->0){n<this.DB&&(r=this.data[e]>>n)!=(this.s&this.DM)>>n&&(t[i++]=r|this.s<<this.DB-n);while(e>=0){n<8?(r=(this.data[e]&(1<<n)-1)<<8-n,r|=this.data[--e]>>(n+=this.DB-8)):(r=this.data[e]>>(n-=8)&255,n<=0&&(n+=this.DB,--e)),(r&128)!=0&&(r|=-256),i==0&&(this.s&128)!=(r&128)&&++i;if(i>0||r!=this.s)t[i++]=r}}return t}function at(e){return this.compareTo(e)==0}function ft(e){return this.compareTo(e)<0?this:e}function lt(e){return this.compareTo(e)>0?this:e}function ct(e,t,n){var r,i,s=Math.min(e.t,this.t);for(r=0;r<s;++r)n.data[r]=t(this.data[r],e.data[r]);if(e.t<this.t){i=e.s&this.DM;for(r=s;r<this.t;++r)n.data[r]=t(this.data[r],i);n.t=this.t}else{i=this.s&this.DM;for(r=s;r<e.t;++r)n.data[r]=t(i,e.data[r]);n.t=e.t}n.s=t(this.s,e.s),n.clamp()}function ht(e,t){return e&t}function pt(e){var t=s();return this.bitwiseTo(e,ht,t),t}function dt(e,t){return e|t}function vt(e){var t=s();return this.bitwiseTo(e,dt,t),t}function mt(e,t){return e^t}function gt(e){var t=s();return this.bitwiseTo(e,mt,t),t}function yt(e,t){return e&~t}function bt(e){var t=s();return this.bitwiseTo(e,yt,t),t}function wt(){var e=s();for(var t=0;t<this.t;++t)e.data[t]=this.DM&~this.data[t];return e.t=this.t,e.s=~this.s,e}function Et(e){var t=s();return e<0?this.rShiftTo(-e,t):this.lShiftTo(e,t),t}function St(e){var t=s();return e<0?this.lShiftTo(-e,t):this.rShiftTo(e,t),t}function xt(e){if(e==0)return-1;var t=0;return(e&65535)==0&&(e>>=16,t+=16),(e&255)==0&&(e>>=8,t+=8),(e&15)==0&&(e>>=4,t+=4),(e&3)==0&&(e>>=2,t+=2),(e&1)==0&&++t,t}function Tt(){for(var e=0;e<this.t;++e)if(this.data[e]!=0)return e*this.DB+xt(this.data[e]);return this.s<0?this.t*this.DB:-1}function Nt(e){var t=0;while(e!=0)e&=e-1,++t;return t}function Ct(){var e=0,t=this.s&this.DM;for(var n=0;n<this.t;++n)e+=Nt(this.data[n]^t);return e}function kt(e){var t=Math.floor(e/this.DB);return t>=this.t?this.s!=0:(this.data[t]&1<<e%this.DB)!=0}function Lt(e,t){var n=i.ONE.shiftLeft(e);return this.bitwiseTo(n,t,n),n}function At(e){return this.changeBit(e,dt)}function Ot(e){return this.changeBit(e,yt)}function Mt(e){return this.changeBit(e,mt)}function _t(e,t){var n=0,r=0,i=Math.min(e.t,this.t);while(n<i)r+=this.data[n]+e.data[n],t.data[n++]=r&this.DM,r>>=this.DB;if(e.t<this.t){r+=e.s;while(n<this.t)r+=this.data[n],t.data[n++]=r&this.DM,r>>=this.DB;r+=this.s}else{r+=this.s;while(n<e.t)r+=e.data[n],t.data[n++]=r&this.DM,r>>=this.DB;r+=e.s}t.s=r<0?-1:0,r>0?t.data[n++]=r:r<-1&&(t.data[n++]=this.DV+r),t.t=n,t.clamp()}function Dt(e){var t=s();return this.addTo(e,t),t}function Pt(e){var t=s();return this.subTo(e,t),t}function Ht(e){var t=s();return this.multiplyTo(e,t),t}function Bt(e){var t=s();return this.divRemTo(e,t,null),t}function jt(e){var t=s();return this.divRemTo(e,null,t),t}function Ft(e){var t=s(),n=s();return this.divRemTo(e,t,n),new Array(t,n)}function It(e){this.data[this.t]=this.am(0,e-1,this,0,0,this.t),++this.t,this.clamp()}function qt(e,t){if(e==0)return;while(this.t<=t)this.data[this.t++]=0;this.data[t]+=e;while(this.data[t]>=this.DV)this.data[t]-=this.DV,++t>=this.t&&(this.data[this.t++]=0),++this.data[t]}function Rt(){}function Ut(e){return e}function zt(e,t,n){e.multiplyTo(t,n)}function Wt(e,t){e.squareTo(t)}function Xt(e){return this.exp(e,new Rt)}function Vt(e,t,n){var r=Math.min(this.t+e.t,t);n.s=0,n.t=r;while(r>0)n.data[--r]=0;var i;for(i=n.t-this.t;r<i;++r)n.data[r+this.t]=this.am(0,e.data[r],n,r,0,this.t);for(i=Math.min(e.t,t);r<i;++r)this.am(0,e.data[r],n,r,0,t-r);n.clamp()}function $t(e,t,n){--t;var r=n.t=this.t+e.t-t;n.s=0;while(--r>=0)n.data[r]=0;for(r=Math.max(t-this.t,0);r<e.t;++r)n.data[this.t+r-t]=this.am(t-r,e.data[r],n,0,0,this.t+r-t);n.clamp(),n.drShiftTo(1,n)}function Jt(e){this.r2=s(),this.q3=s(),i.ONE.dlShiftTo(2*e.t,this.r2),this.mu=this.r2.divide(e),this.m=e}function Kt(e){if(e.s<0||e.t>2*this.m.t)return e.mod(this.m);if(e.compareTo(this.m)<0)return e;var t=s();return e.copyTo(t),this.reduce(t),t}function Qt(e){return e}function Gt(e){e.drShiftTo(this.m.t-1,this.r2),e.t>this.m.t+1&&(e.t=this.m.t+1,e.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(e.compareTo(this.r2)<0)e.dAddOffset(1,this.m.t+1);e.subTo(this.r2,e);while(e.compareTo(this.m)>=0)e.subTo(this.m,e)}function Yt(e,t){e.squareTo(t),this.reduce(t)}function Zt(e,t,n){e.multiplyTo(t,n),this.reduce(n)}function en(e,t){var n=e.bitLength(),r,i=y(1),o;if(n<=0)return i;n<18?r=1:n<48?r=3:n<144?r=4:n<768?r=5:r=6,n<8?o=new B(t):t.isEven()?o=new Jt(t):o=new z(t);var u=new Array,a=3,f=r-1,l=(1<<r)-1;u[1]=o.convert(this);if(r>1){var c=s();o.sqrTo(u[1],c);while(a<=l)u[a]=s(),o.mulTo(c,u[a-2],u[a]),a+=2}var h=e.t-1,p,d=!0,v=s(),m;n=N(e.data[h])-1;while(h>=0){n>=f?p=e.data[h]>>n-f&l:(p=(e.data[h]&(1<<n+1)-1)<<f-n,h>0&&(p|=e.data[h-1]>>this.DB+n-f)),a=r;while((p&1)==0)p>>=1,--a;(n-=a)<0&&(n+=this.DB,--h);if(d)u[p].copyTo(i),d=!1;else{while(a>1)o.sqrTo(i,v),o.sqrTo(v,i),a-=2;a>0?o.sqrTo(i,v):(m=i,i=v,v=m),o.mulTo(v,u[p],i)}while(h>=0&&(e.data[h]&1<<n)==0)o.sqrTo(i,v),m=i,i=v,v=m,--n<0&&(n=this.DB-1,--h)}return o.revert(i)}function tn(e){var t=this.s<0?this.negate():this.clone(),n=e.s<0?e.negate():e.clone();if(t.compareTo(n)<0){var r=t;t=n,n=r}var i=t.getLowestSetBit(),s=n.getLowestSetBit();if(s<0)return t;i<s&&(s=i),s>0&&(t.rShiftTo(s,t),n.rShiftTo(s,n));while(t.signum()>0)(i=t.getLowestSetBit())>0&&t.rShiftTo(i,t),(i=n.getLowestSetBit())>0&&n.rShiftTo(i,n),t.compareTo(n)>=0?(t.subTo(n,t),t.rShiftTo(1,t)):(n.subTo(t,n),n.rShiftTo(1,n));return s>0&&n.lShiftTo(s,n),n}function nn(e){if(e<=0)return 0;var t=this.DV%e,n=this.s<0?e-1:0;if(this.t>0)if(t==0)n=this.data[0]%e;else for(var r=this.t-1;r>=0;--r)n=(t*n+this.data[r])%e;return n}function rn(e){var t=e.isEven();if(this.isEven()&&t||e.signum()==0)return i.ZERO;var n=e.clone(),r=this.clone(),s=y(1),o=y(0),u=y(0),a=y(1);while(n.signum()!=0){while(n.isEven()){n.rShiftTo(1,n);if(t){if(!s.isEven()||!o.isEven())s.addTo(this,s),o.subTo(e,o);s.rShiftTo(1,s)}else o.isEven()||o.subTo(e,o);o.rShiftTo(1,o)}while(r.isEven()){r.rShiftTo(1,r);if(t){if(!u.isEven()||!a.isEven())u.addTo(this,u),a.subTo(e,a);u.rShiftTo(1,u)}else a.isEven()||a.subTo(e,a);a.rShiftTo(1,a)}n.compareTo(r)>=0?(n.subTo(r,n),t&&s.subTo(u,s),o.subTo(a,o)):(r.subTo(n,r),t&&u.subTo(s,u),a.subTo(o,a))}return r.compareTo(i.ONE)!=0?i.ZERO:a.compareTo(e)>=0?a.subtract(e):a.signum()<0?(a.addTo(e,a),a.signum()<0?a.add(e):a):a}function un(e){var t,n=this.abs();if(n.t==1&&n.data[0]<=sn[sn.length-1]){for(t=0;t<sn.length;++t)if(n.data[0]==sn[t])return!0;return!1}if(n.isEven())return!1;t=1;while(t<sn.length){var r=sn[t],i=t+1;while(i<sn.length&&r<on)r*=sn[i++];r=n.modInt(r);while(t<i)if(r%sn[t++]==0)return!1}return n.millerRabin(e)}function an(e){var t=this.subtract(i.ONE),n=t.getLowestSetBit();if(n<=0)return!1;var r=t.shiftRight(n),s=fn(),o;for(var u=0;u<e;++u){do o=new i(this.bitLength(),s);while(o.compareTo(i.ONE)<=0||o.compareTo(t)>=0);var a=o.modPow(r,this);if(a.compareTo(i.ONE)!=0&&a.compareTo(t)!=0){var f=1;while(f++<n&&a.compareTo(t)!=0){a=a.modPowInt(2,this);if(a.compareTo(i.ONE)==0)return!1}if(a.compareTo(t)!=0)return!1}}return!0}function fn(){return{nextBytes:function(e){for(var t=0;t<e.length;++t)e[t]=Math.floor(Math.random()*256)}}}var t,n=0xdeadbeefcafe,r=(n&16777215)==15715070;typeof navigator=="undefined"?(i.prototype.am=a,t=28):r&&navigator.appName=="Microsoft Internet Explorer"?(i.prototype.am=u,t=30):r&&navigator.appName!="Netscape"?(i.prototype.am=o,t=26):(i.prototype.am=a,t=28),i.prototype.DB=t,i.prototype.DM=(1<<t)-1,i.prototype.DV=1<<t;var f=52;i.prototype.FV=Math.pow(2,f),i.prototype.F1=f-t,i.prototype.F2=2*t-f;var l="0123456789abcdefghijklmnopqrstuvwxyz",c=new Array,h,p;h="0".charCodeAt(0);for(p=0;p<=9;++p)c[h++]=p;h="a".charCodeAt(0);for(p=10;p<36;++p)c[h++]=p;h="A".charCodeAt(0);for(p=10;p<36;++p)c[h++]=p;B.prototype.convert=j,B.prototype.revert=F,B.prototype.reduce=I,B.prototype.mulTo=q,B.prototype.sqrTo=R,z.prototype.convert=W,z.prototype.revert=X,z.prototype.reduce=V,z.prototype.mulTo=J,z.prototype.sqrTo=$,i.prototype.copyTo=m,i.prototype.fromInt=g,i.prototype.fromString=b,i.prototype.clamp=w,i.prototype.dlShiftTo=k,i.prototype.drShiftTo=L,i.prototype.lShiftTo=A,i.prototype.rShiftTo=O,i.prototype.subTo=M,i.prototype.multiplyTo=_,i.prototype.squareTo=D,i.prototype.divRemTo=P,i.prototype.invDigit=U,i.prototype.isEven=K,i.prototype.exp=Q,i.prototype.toString=E,i.prototype.negate=S,i.prototype.abs=x,i.prototype.compareTo=T,i.prototype.bitLength=C,i.prototype.mod=H,i.prototype.modPowInt=G,i.ZERO=y(0),i.ONE=y(1),Rt.prototype.convert=Ut,Rt.prototype.revert=Ut,Rt.prototype.mulTo=zt,Rt.prototype.sqrTo=Wt,Jt.prototype.convert=Kt,Jt.prototype.revert=Qt,Jt.prototype.reduce=Gt,Jt.prototype.mulTo=Zt,Jt.prototype.sqrTo=Yt;var sn=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509],on=(1<<26)/sn[sn.length-1];i.prototype.chunkSize=nt,i.prototype.toRadix=it,i.prototype.fromRadix=st,i.prototype.fromNumber=ot,i.prototype.bitwiseTo=ct,i.prototype.changeBit=Lt,i.prototype.addTo=_t,i.prototype.dMultiply=It,i.prototype.dAddOffset=qt,i.prototype.multiplyLowerTo=Vt,i.prototype.multiplyUpperTo=$t,i.prototype.modInt=nn,i.prototype.millerRabin=an,i.prototype.clone=Y,i.prototype.intValue=Z,i.prototype.byteValue=et,i.prototype.shortValue=tt,i.prototype.signum=rt,i.prototype.toByteArray=ut,i.prototype.equals=at,i.prototype.min=ft,i.prototype.max=lt,i.prototype.and=pt,i.prototype.or=vt,i.prototype.xor=gt,i.prototype.andNot=bt,i.prototype.not=wt,i.prototype.shiftLeft=Et,i.prototype.shiftRight=St,i.prototype.getLowestSetBit=Tt,i.prototype.bitCount=Ct,i.prototype.testBit=kt,i.prototype.setBit=At,i.prototype.clearBit=Ot,i.prototype.flipBit=Mt,i.prototype.add=Dt,i.prototype.subtract=Pt,i.prototype.multiply=Ht,i.prototype.divide=Bt,i.prototype.remainder=jt,i.prototype.divideAndRemainder=Ft,i.prototype.modPow=en,i.prototype.modInverse=rn,i.prototype.pow=Xt,i.prototype.gcd=tn,i.prototype.isProbablePrime=un,e.jsbn=e.jsbn||{},e.jsbn.BigInteger=i}var r="jsbn";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/jsbn",["require","module"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function n(t,n,r){r||(r=e.md.sha1.create());var i="",s=Math.ceil(n/r.digestLength);for(var o=0;o<s;++o){var u=String.fromCharCode(o>>24&255,o>>16&255,o>>8&255,o&255);r.start(),r.update(t+u),i+=r.digest().getBytes()}return i.substring(0,n)}var t=e.pkcs1=e.pkcs1||{};t.encode_rsa_oaep=function(t,r,i){var s,o,u,a;typeof i=="string"?(s=i,o=arguments[3]||undefined,u=arguments[4]||undefined):i&&(s=i.label||undefined,o=i.seed||undefined,u=i.md||undefined,i.mgf1&&i.mgf1.md&&(a=i.mgf1.md)),u?u.start():u=e.md.sha1.create(),a||(a=u);var f=Math.ceil(t.n.bitLength()/8),l=f-2*u.digestLength-2;if(r.length>l){var c=new Error("RSAES-OAEP input message length is too long.");throw c.length=r.length,c.maxLength=l,c}s||(s=""),u.update(s,"raw");var h=u.digest(),p="",d=l-r.length;for(var v=0;v<d;v++)p+="\0";var m=h.getBytes()+p+""+r;if(!o)o=e.random.getBytes(u.digestLength);else if(o.length!==u.digestLength){var c=new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");throw c.seedLength=o.length,c.digestLength=u.digestLength,c}var g=n(o,f-u.digestLength-1,a),y=e.util.xorBytes(m,g,m.length),b=n(y,u.digestLength,a),w=e.util.xorBytes(o,b,o.length);return"\0"+w+y},t.decode_rsa_oaep=function(t,r,i){var s,o,u;typeof i=="string"?(s=i,o=arguments[3]||undefined):i&&(s=i.label||undefined,o=i.md||undefined,i.mgf1&&i.mgf1.md&&(u=i.mgf1.md));var a=Math.ceil(t.n.bitLength()/8);if(r.length!==a){var f=new Error("RSAES-OAEP encoded message length is invalid.");throw f.length=r.length,f.expectedLength=a,f}o===undefined?o=e.md.sha1.create():o.start(),u||(u=o);if(a<2*o.digestLength+2)throw new Error("RSAES-OAEP key is too short for the hash function.");s||(s=""),o.update(s,"raw");var l=o.digest().getBytes(),c=r.charAt(0),h=r.substring(1,o.digestLength+1),p=r.substring(1+o.digestLength),d=n(p,o.digestLength,u),v=e.util.xorBytes(h,d,h.length),m=n(v,a-o.digestLength-1,u),g=e.util.xorBytes(p,m,p.length),y=g.substring(0,o.digestLength),f=c!=="\0";for(var b=0;b<o.digestLength;++b)f|=l.charAt(b)!==y.charAt(b);var w=1,E=o.digestLength;for(var S=o.digestLength;S<g.length;S++){var x=g.charCodeAt(S),T=x&1^1,N=w?65534:0;f|=x&N,w&=T,E+=w}if(f||g.charCodeAt(E)!==1)throw new Error("Invalid RSAES-OAEP padding.");return g.substring(E+1)}}var r="pkcs1";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pkcs1",["require","module","./util","./random","./sha1"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function o(e,t,n,r){return"workers"in n?a(e,t,n,r):u(e,t,n,r)}function u(t,n,i,s){var o=f(t,n),a=0,c=l(o.bitLength());"millerRabinTests"in i&&(c=i.millerRabinTests);var h=10;"maxBlockTime"in i&&(h=i.maxBlockTime);var p=+(new Date);do{o.bitLength()>t&&(o=f(t,n));if(o.isProbablePrime(c))return s(null,o);o.dAddOffset(r[a++%8],0)}while(h<0||+(new Date)-p<h);e.util.setImmediate(function(){u(t,n,i,s)})}function a(t,r,i,s){function p(){function d(i){if(p)return;--u;var a=i.data;if(a.found){for(var h=0;h<e.length;++h)e[h].terminate();return p=!0,s(null,new n(a.prime,16))}o.bitLength()>t&&(o=f(t,r));var d=o.toString(16);i.target.postMessage({hex:d,workLoad:l}),o.dAddOffset(c,0)}a=Math.max(1,a);var e=[];for(var i=0;i<a;++i)e[i]=new Worker(h);var u=a;for(var i=0;i<a;++i)e[i].addEventListener("message",d);var p=!1}if(typeof Worker=="undefined")return u(t,r,i,s);var o=f(t,r),a=i.workers,l=i.workLoad||100,c=l*30/8,h=i.workerScript||"forge/prime.worker.js";if(a===-1)return e.util.estimateCores(function(e,t){e&&(t=2),a=t-1,p()});p()}function f(e,t){var r=new n(e,t),o=e-1;return r.testBit(o)||r.bitwiseTo(n.ONE.shiftLeft(o),s,r),r.dAddOffset(31-r.mod(i).byteValue(),0),r}function l(e){return e<=100?27:e<=150?18:e<=200?15:e<=250?12:e<=300?9:e<=350?8:e<=400?7:e<=500?6:e<=600?5:e<=800?4:e<=1250?3:2}if(e.prime)return;var t=e.prime=e.prime||{},n=e.jsbn.BigInteger,r=[6,4,2,4,2,4,6,2],i=new n(null);i.fromInt(30);var s=function(e,t){return e|t};t.generateProbablePrime=function(t,n,r){typeof n=="function"&&(r=n,n={}),n=n||{};var i=n.algorithm||"PRIMEINC";typeof i=="string"&&(i={name:i}),i.options=i.options||{};var s=n.prng||e.random,u={nextBytes:function(e){var t=s.getBytesSync(e.length);for(var n=0;n<e.length;++n)e[n]=t.charCodeAt(n)}};if(i.name==="PRIMEINC")return o(t,u,i.options,r);throw new Error("Invalid prime generation algorithm: "+i.name)}}var r="prime";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/prime",["require","module","./util","./jsbn","./random"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function c(t,n,r){var i=e.util.createBuffer(),s=Math.ceil(n.n.bitLength()/8);if(t.length>s-11){var o=new Error("Message is too long for PKCS#1 v1.5 padding.");throw o.length=t.length,o.max=s-11,o}i.putByte(0),i.putByte(r);var u=s-3-t.length,a;if(r===0||r===1){a=r===0?0:255;for(var f=0;f<u;++f)i.putByte(a)}else while(u>0){var l=0,c=e.random.getBytes(u);for(var f=0;f<u;++f)a=c.charCodeAt(f),a===0?++l:i.putByte(a);u=l}return i.putByte(0),i.putBytes(t),i}function h(t,n,r,i){var s=Math.ceil(n.n.bitLength()/8),o=e.util.createBuffer(t),u=o.getByte(),a=o.getByte();if(u!==0||r&&a!==0&&a!==1||!r&&a!=2||r&&a===0&&typeof i=="undefined")throw new Error("Encryption block is invalid.");var f=0;if(a===0){f=s-3-i;for(var l=0;l<f;++l)if(o.getByte()!==0)throw new Error("Encryption block is invalid.")}else if(a===1){f=0;while(o.length()>1){if(o.getByte()!==255){--o.read;break}++f}}else if(a===2){f=0;while(o.length()>1){if(o.getByte()===0){--o.read;break}++f}}var c=o.getByte();if(c!==0||f!==s-3-o.length())throw new Error("Encryption block is invalid.");return o.getBytes()}function p(n,i,s){function u(){a(n.pBits,function(e,t){if(e)return s(e);n.p=t;if(n.q!==null)return f(e,n.q);a(n.qBits,f)})}function a(t,n){e.prime.generateProbablePrime(t,o,n)}function f(e,i){if(e)return s(e);n.q=i;if(n.p.compareTo(n.q)<0){var o=n.p;n.p=n.q,n.q=o}if(n.p.subtract(t.ONE).gcd(n.e).compareTo(t.ONE)!==0){n.p=null,u();return}if(n.q.subtract(t.ONE).gcd(n.e).compareTo(t.ONE)!==0){n.q=null,a(n.qBits,f);return}n.p1=n.p.subtract(t.ONE),n.q1=n.q.subtract(t.ONE),n.phi=n.p1.multiply(n.q1);if(n.phi.gcd(n.e).compareTo(t.ONE)!==0){n.p=n.q=null,u();return}n.n=n.p.multiply(n.q);if(n.n.bitLength()!==n.bits){n.q=null,a(n.qBits,f);return}var l=n.e.modInverse(n.phi);n.keys={privateKey:r.rsa.setPrivateKey(n.n,n.e,l,n.p,n.q,l.mod(n.p1),l.mod(n.q1),n.q.modInverse(n.p)),publicKey:r.rsa.setPublicKey(n.n,n.e)},s(null,n.keys)}typeof i=="function"&&(s=i,i={}),i=i||{};var o={algorithm:{name:i.algorithm||"PRIMEINC",options:{workers:i.workers||2,workLoad:i.workLoad||100,workerScript:i.workerScript}}};"prng"in i&&(o.prng=i.prng),u()}function d(t){var n=t.toString(16);return n[0]>="8"&&(n="00"+n),e.util.hexToBytes(n)}function v(e){return e<=100?27:e<=150?18:e<=200?15:e<=250?12:e<=300?9:e<=350?8:e<=400?7:e<=500?6:e<=600?5:e<=800?4:e<=1250?3:2}function m(e){return typeof window!="undefined"&&typeof window.crypto=="object"&&typeof window.crypto.subtle=="object"&&typeof window.crypto.subtle[e]=="function"}function g(e){return typeof window!="undefined"&&typeof window.msCrypto=="object"&&typeof window.msCrypto.subtle=="object"&&typeof window.msCrypto.subtle[e]=="function"}function y(t){var n=e.util.hexToBytes(t.toString(16)),r=new Uint8Array(n.length);for(var i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}function b(e){if(e.kty!=="RSA")throw new Error('Unsupported key algorithm "'+e.kty+'"; algorithm must be "RSA".');return r.setRsaPrivateKey(E(e.n),E(e.e),E(e.d),E(e.p),E(e.q),E(e.dp),E(e.dq),E(e.qi))}function w(e){if(e.kty!=="RSA")throw new Error('Key algorithm must be "RSA".');return r.setRsaPublicKey(E(e.n),E(e.e))}function E(n){return new t(e.util.bytesToHex(e.util.decode64(n)),16)}if(typeof t=="undefined")var t=e.jsbn.BigInteger;var n=e.asn1;e.pki=e.pki||{},e.pki.rsa=e.rsa=e.rsa||{};var r=e.pki,i=[6,4,2,4,2,4,6,2],s={name:"PrivateKeyInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PrivateKeyInfo.version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyVersion"},{name:"PrivateKeyInfo.privateKeyAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"privateKeyOid"}]},{name:"PrivateKeyInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"privateKey"}]},o={name:"RSAPrivateKey",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"RSAPrivateKey.version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyVersion"},{name:"RSAPrivateKey.modulus",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyModulus"},{name:"RSAPrivateKey.publicExponent",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyPublicExponent"},{name:"RSAPrivateKey.privateExponent",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyPrivateExponent"},{name:"RSAPrivateKey.prime1",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyPrime1"},{name:"RSAPrivateKey.prime2",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyPrime2"},{name:"RSAPrivateKey.exponent1",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyExponent1"},{name:"RSAPrivateKey.exponent2",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyExponent2"},{name:"RSAPrivateKey.coefficient",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyCoefficient"}]},u={name:"RSAPublicKey",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"RSAPublicKey.modulus",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"publicKeyModulus"},{name:"RSAPublicKey.exponent",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"publicKeyExponent"}]},a=e.pki.rsa.publicKeyValidator={name:"SubjectPublicKeyInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"subjectPublicKeyInfo",value:[{name:"SubjectPublicKeyInfo.AlgorithmIdentifier",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"publicKeyOid"}]},{name:"SubjectPublicKeyInfo.subjectPublicKey",tagClass:n.Class.UNIVERSAL,type:n.Type.BITSTRING,constructed:!1,value:[{name:"SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,optional:!0,captureAsn1:"rsaPublicKey"}]}]},f=function(e){var t;if(e.algorithm in r.oids){t=r.oids[e.algorithm];var s=n.oidToDer(t).getBytes(),o=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]),u=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]);u.value.push(n.create(n.Class.UNIVERSAL,n.Type.OID,!1,s)),u.value.push(n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,""));var a=n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,e.digest().getBytes());return o.value.push(u),o.value.push(a),n.toDer(o).getBytes()}var i=new Error("Unknown message digest algorithm.");throw i.algorithm=e.algorithm,i},l=function(n,r,i){if(i)return n.modPow(r.e,r.n);if(!r.p||!r.q)return n.modPow(r.d,r.n);r.dP||(r.dP=r.d.mod(r.p.subtract(t.ONE))),r.dQ||(r.dQ=r.d.mod(r.q.subtract(t.ONE))),r.qInv||(r.qInv=r.q.modInverse(r.p));var s;do s=new t(e.util.bytesToHex(e.random.getBytes(r.n.bitLength()/8)),16);while(s.compareTo(r.n)>=0||!s.gcd(r.n).equals(t.ONE));n=n.multiply(s.modPow(r.e,r.n)).mod(r.n);var o=n.mod(r.p).modPow(r.dP,r.p),u=n.mod(r.q).modPow(r.dQ,r.q);while(o.compareTo(u)<0)o=o.add(r.p);var a=o.subtract(u).multiply(r.qInv).mod(r.p).multiply(r.q).add(u);return a=a.multiply(s.modInverse(r.n)).mod(r.n),a};r.rsa.encrypt=function(n,r,i){var s=i,o,u=Math.ceil(r.n.bitLength()/8);i!==!1&&i!==!0?(s=i===2,o=c(n,r,i)):(o=e.util.createBuffer(),o.putBytes(n));var a=new t(o.toHex(),16),f=l(a,r,s),h=f.toString(16),p=e.util.createBuffer(),d=u-Math.ceil(h.length/2);while(d>0)p.putByte(0),--d;return p.putBytes(e.util.hexToBytes(h)),p.getBytes()},r.rsa.decrypt=function(n,r,i,s){var o=Math.ceil(r.n.bitLength()/8);if(n.length!==o){var u=new Error("Encrypted message length is invalid.");throw u.length=n.length,u.expected=o,u}var a=new t(e.util.createBuffer(n).toHex(),16);if(a.compareTo(r.n)>=0)throw new Error("Encrypted message is invalid.");var f=l(a,r,i),c=f.toString(16),p=e.util.createBuffer(),d=o-Math.ceil(c.length/2);while(d>0)p.putByte(0),--d;return p.putBytes(e.util.hexToBytes(c)),s!==!1?h(p.getBytes(),r,i):p.getBytes()},r.rsa.createKeyPairGenerationState=function(n,r,i){typeof n=="string"&&(n=parseInt(n,10)),n=n||2048,i=i||{};var s=i.prng||e.random,o={nextBytes:function(e){var t=s.getBytesSync(e.length);for(var n=0;n<e.length;++n)e[n]=t.charCodeAt(n)}},u=i.algorithm||"PRIMEINC",a;if(u!=="PRIMEINC")throw new Error("Invalid key generation algorithm: "+u);return a={algorithm:u,state:0,bits:n,rng:o,eInt:r||65537,e:new t(null),p:null,q:null,qBits:n>>1,pBits:n-(n>>1),pqState:0,num:null,keys:null},a.e.fromInt(a.eInt),a},r.rsa.stepKeyPairGenerationState=function(e,n){"algorithm"in e||(e.algorithm="PRIMEINC");var s=new t(null);s.fromInt(30);var o=0,u=function(e,t){return e|t},a=+(new Date),f,l=0;while(e.keys===null&&(n<=0||l<n)){if(e.state===0){var c=e.p===null?e.pBits:e.qBits,h=c-1;e.pqState===0?(e.num=new t(c,e.rng),e.num.testBit(h)||e.num.bitwiseTo(t.ONE.shiftLeft(h),u,e.num),e.num.dAddOffset(31-e.num.mod(s).byteValue(),0),o=0,++e.pqState):e.pqState===1?e.num.bitLength()>c?e.pqState=0:e.num.isProbablePrime(v(e.num.bitLength()))?++e.pqState:e.num.dAddOffset(i[o++%8],0):e.pqState===2?e.pqState=e.num.subtract(t.ONE).gcd(e.e).compareTo(t.ONE)===0?3:0:e.pqState===3&&(e.pqState=0,e.p===null?e.p=e.num:e.q=e.num,e.p!==null&&e.q!==null&&++e.state,e.num=null)}else if(e.state===1)e.p.compareTo(e.q)<0&&(e.num=e.p,e.p=e.q,e.q=e.num),++e.state;else if(e.state===2)e.p1=e.p.subtract(t.ONE),e.q1=e.q.subtract(t.ONE),e.phi=e.p1.multiply(e.q1),++e.state;else if(e.state===3)e.phi.gcd(e.e).compareTo(t.ONE)===0?++e.state:(e.p=null,e.q=null,e.state=0);else if(e.state===4)e.n=e.p.multiply(e.q),e.n.bitLength()===e.bits?++e.state:(e.q=null,e.state=0);else if(e.state===5){var p=e.e.modInverse(e.phi);e.keys={privateKey:r.rsa.setPrivateKey(e.n,e.e,p,e.p,e.q,p.mod(e.p1),p.mod(e.q1),e.q.modInverse(e.p)),publicKey:r.rsa.setPublicKey(e.n,e.e)}}f=+(new Date),l+=f-a,a=f}return e.keys!==null},r.rsa.generateKeyPair=function(t,i,s,o){arguments.length===1?typeof t=="object"?(s=t,t=undefined):typeof t=="function"&&(o=t,t=undefined):arguments.length===2?typeof t=="number"?typeof i=="function"?(o=i,i=undefined):typeof i!="number"&&(s=i,i=undefined):(s=t,o=i,t=undefined,i=undefined):arguments.length===3&&(typeof i=="number"?typeof s=="function"&&(o=s,s=undefined):(o=s,s=i,i=undefined)),s=s||{},t===undefined&&(t=s.bits||2048),i===undefined&&(i=s.e||65537);if(!e.disableNativeCode&&o&&t>=256&&t<=16384&&(i===65537||i===3)){if(m("generateKey")&&m("exportKey"))return window.crypto.subtle.generateKey({name:"RSASSA-PKCS1-v1_5",modulusLength:t,publicExponent:y(i),hash:{name:"SHA-256"}},!0,["sign","verify"]).then(function(e){return window.crypto.subtle.exportKey("pkcs8",e.privateKey)}).catch(function(e){o(e)}).then(function(t){if(t){var i=r.privateKeyFromAsn1(n.fromDer(e.util.createBuffer(t)));o(null,{privateKey:i,publicKey:r.setRsaPublicKey(i.n,i.e)})}});if(g("generateKey")&&g("exportKey")){var u=window.msCrypto.subtle.generateKey({name:"RSASSA-PKCS1-v1_5",modulusLength:t,publicExponent:y(i),hash:{name:"SHA-256"}},!0,["sign","verify"]);u.oncomplete=function(t){var i=t.target.result,s=window.msCrypto.subtle.exportKey("pkcs8",i.privateKey);s.oncomplete=function(t){var i=t.target.result,s=r.privateKeyFromAsn1(n.fromDer(e.util.createBuffer(i)));o(null,{privateKey:s,publicKey:r.setRsaPublicKey(s.n,s.e)})},s.onerror=function(e){o(e)}},u.onerror=function(e){o(e)};return}}var a=r.rsa.createKeyPairGenerationState(t,i,s);if(!o)return r.rsa.stepKeyPairGenerationState(a,0),a.keys;p(a,s,o)},r.setRsaPublicKey=r.rsa.setPublicKey=function(t,i){var s={n:t,e:i};return s.encrypt=function(t,n,i){typeof n=="string"?n=n.toUpperCase():n===undefined&&(n="RSAES-PKCS1-V1_5");if(n==="RSAES-PKCS1-V1_5")n={encode:function(e,t,n){return c(e,t,2).getBytes()}};else if(n==="RSA-OAEP"||n==="RSAES-OAEP")n={encode:function(t,n){return e.pkcs1.encode_rsa_oaep(n,t,i)}};else if(["RAW","NONE","NULL",null].indexOf(n)!==-1)n={encode:function(e){return e}};else if(typeof n=="string")throw new Error('Unsupported encryption scheme: "'+n+'".');var o=n.encode(t,s,!0);return r.rsa.encrypt(o,s,!0)},s.verify=function(e,t,i){typeof i=="string"?i=i.toUpperCase():i===undefined&&(i="RSASSA-PKCS1-V1_5");if(i==="RSASSA-PKCS1-V1_5")i={verify:function(e,t){t=h(t,s,!0);var r=n.fromDer(t);return e===r.value[1].value}};else if(i==="NONE"||i==="NULL"||i===null)i={verify:function(e,t){return t=h(t,s,!0),e===t}};var o=r.rsa.decrypt(t,s,!0,!1);return i.verify(e,o,s.n.bitLength())},s},r.setRsaPrivateKey=r.rsa.setPrivateKey=function(t,n,i,s,o,u,a,l){var c={n:t,e:n,d:i,p:s,q:o,dP:u,dQ:a,qInv:l};return c.decrypt=function(t,n,i){typeof n=="string"?n=n.toUpperCase():n===undefined&&(n="RSAES-PKCS1-V1_5");var s=r.rsa.decrypt(t,c,!1,!1);if(n==="RSAES-PKCS1-V1_5")n={decode:h};else if(n==="RSA-OAEP"||n==="RSAES-OAEP")n={decode:function(t,n){return e.pkcs1.decode_rsa_oaep(n,t,i)}};else{if(["RAW","NONE","NULL",null].indexOf(n)===-1)throw new Error('Unsupported encryption scheme: "'+n+'".');n={decode:function(e){return e}}}return n.decode(s,c,!1)},c.sign=function(e,t){var n=!1;typeof t=="string"&&(t=t.toUpperCase());if(t===undefined||t==="RSASSA-PKCS1-V1_5")t={encode:f},n=1;else if(t==="NONE"||t==="NULL"||t===null)t={encode:function(){return e}},n=1;var i=t.encode(e,c.n.bitLength());return r.rsa.encrypt(i,c,n)},c},r.wrapRsaPrivateKey=function(e){return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(0).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(r.oids.rsaEncryption).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")]),n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,n.toDer(e).getBytes())])},r.privateKeyFromAsn1=function(i){var u={},a=[];n.validate(i,s,u,a)&&(i=n.fromDer(e.util.createBuffer(u.privateKey))),u={},a=[];if(!n.validate(i,o,u,a)){var f=new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");throw f.errors=a,f}var l,c,h,p,d,v,m,g;return l=e.util.createBuffer(u.privateKeyModulus).toHex(),c=e.util.createBuffer(u.privateKeyPublicExponent).toHex(),h=e.util.createBuffer(u.privateKeyPrivateExponent).toHex(),p=e.util.createBuffer(u.privateKeyPrime1).toHex(),d=e.util.createBuffer(u.privateKeyPrime2).toHex(),v=e.util.createBuffer(u.privateKeyExponent1).toHex(),m=e.util.createBuffer(u.privateKeyExponent2).toHex(),g=e.util.createBuffer(u.privateKeyCoefficient).toHex(),r.setRsaPrivateKey(new t(l,16),new t(c,16),new t(h,16),new t(p,16),new t(d,16),new t(v,16),new t(m,16),new t(g,16))},r.privateKeyToAsn1=r.privateKeyToRSAPrivateKey=function(e){return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(0).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.n)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.e)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.d)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.p)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.q)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.dP)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.dQ)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.qInv))])},r.publicKeyFromAsn1=function(i){var s={},o=[];if(n.validate(i,a,s,o)){var f=n.derToOid(s.publicKeyOid);if(f!==r.oids.rsaEncryption){var l=new Error("Cannot read public key. Unknown OID.");throw l.oid=f,l}i=s.rsaPublicKey}o=[];if(!n.validate(i,u,s,o)){var l=new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");throw l.errors=o,l}var c=e.util.createBuffer(s.publicKeyModulus).toHex(),h=e.util.createBuffer(s.publicKeyExponent).toHex();return r.setRsaPublicKey(new t(c,16),new t(h,16))},r.publicKeyToAsn1=r.publicKeyToSubjectPublicKeyInfo=function(e){return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(r.oids.rsaEncryption).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")]),n.create(n.Class.UNIVERSAL,n.Type.BITSTRING,!1,[r.publicKeyToRSAPublicKey(e)])])},r.publicKeyToRSAPublicKey=function(e){return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.n)),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,d(e.e))])}}var r="rsa";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/rsa",["require","module","./asn1","./jsbn","./oids","./pkcs1","./prime","./random","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function a(e,t){return e.start().update(t).digest().getBytes()}if(typeof t=="undefined")var t=e.jsbn.BigInteger;var n=e.asn1,r=e.pki=e.pki||{};r.pbe=e.pbe=e.pbe||{};var i=r.oids,s={name:"EncryptedPrivateKeyInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedPrivateKeyInfo.encryptionAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"encryptionOid"},{name:"AlgorithmIdentifier.parameters",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"encryptionParams"}]},{name:"EncryptedPrivateKeyInfo.encryptedData",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"encryptedData"}]},o={name:"PBES2Algorithms",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.keyDerivationFunc",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.keyDerivationFunc.oid",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"kdfOid"},{name:"PBES2Algorithms.params",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.params.salt",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"kdfSalt"},{name:"PBES2Algorithms.params.iterationCount",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,onstructed:!0,capture:"kdfIterationCount"}]}]},{name:"PBES2Algorithms.encryptionScheme",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.encryptionScheme.oid",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"encOid"},{name:"PBES2Algorithms.encryptionScheme.iv",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"encIv"}]}]},u={name:"pkcs-12PbeParams",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"pkcs-12PbeParams.salt",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"salt"},{name:"pkcs-12PbeParams.iterations",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"iterations"}]};r.encryptPrivateKeyInfo=function(t,s,o){o=o||{},o.saltSize=o.saltSize||8,o.count=o.count||2048,o.algorithm=o.algorithm||"aes128";var u=e.random.getBytesSync(o.saltSize),a=o.count,f=n.integerToDer(a),l,c,h;if(o.algorithm.indexOf("aes")===0||o.algorithm==="des"){var p,d,v;switch(o.algorithm){case"aes128":l=16,p=16,d=i["aes128-CBC"],v=e.aes.createEncryptionCipher;break;case"aes192":l=24,p=16,d=i["aes192-CBC"],v=e.aes.createEncryptionCipher;break;case"aes256":l=32,p=16,d=i["aes256-CBC"],v=e.aes.createEncryptionCipher;break;case"des":l=8,p=8,d=i.desCBC,v=e.des.createEncryptionCipher;break;default:var m=new Error("Cannot encrypt private key. Unknown encryption algorithm.");throw m.algorithm=o.algorithm,m}var g=e.pkcs5.pbkdf2(s,u,a,l),y=e.random.getBytesSync(p),b=v(g);b.start(y),b.update(n.toDer(t)),b.finish(),h=b.output.getBytes(),c=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.pkcs5PBES2).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.pkcs5PBKDF2).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,u),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,f.getBytes())])]),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(d).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,y)])])])}else{if(o.algorithm!=="3des"){var m=new Error("Cannot encrypt private key. Unknown encryption algorithm.");throw m.algorithm=o.algorithm,m}l=24;var w=new e.util.ByteBuffer(u),g=r.pbe.generatePkcs12Key(s,w,1,a,l),y=r.pbe.generatePkcs12Key(s,w,2,a,l),b=e.des.createEncryptionCipher(g);b.start(y),b.update(n.toDer(t)),b.finish(),h=b.output.getBytes(),c=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,u),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,f.getBytes())])])}var E=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[c,n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,h)]);return E},r.decryptPrivateKeyInfo=function(t,i){var o=null,u={},a=[];if(!n.validate(t,s,u,a)){var f=new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");throw f.errors=a,f}var l=n.derToOid(u.encryptionOid),c=r.pbe.getCipher(l,u.encryptionParams,i),h=e.util.createBuffer(u.encryptedData);return c.update(h),c.finish()&&(o=n.fromDer(c.output)),o},r.encryptedPrivateKeyToPem=function(t,r){var i={type:"ENCRYPTED PRIVATE KEY",body:n.toDer(t).getBytes()};return e.pem.encode(i,{maxline:r})},r.encryptedPrivateKeyFromPem=function(t){var r=e.pem.decode(t)[0];if(r.type!=="ENCRYPTED PRIVATE KEY"){var i=new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');throw i.headerType=r.type,i}if(r.procType&&r.procType.type==="ENCRYPTED")throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");return n.fromDer(r.body)},r.encryptRsaPrivateKey=function(t,i,s){s=s||{};if(!s.legacy){var o=r.wrapRsaPrivateKey(r.privateKeyToAsn1(t));return o=r.encryptPrivateKeyInfo(o,i,s),r.encryptedPrivateKeyToPem(o)}var u,a,f,l;switch(s.algorithm){case"aes128":u="AES-128-CBC",f=16,a=e.random.getBytesSync(16),l=e.aes.createEncryptionCipher;break;case"aes192":u="AES-192-CBC",f=24,a=e.random.getBytesSync(16),l=e.aes.createEncryptionCipher;break;case"aes256":u="AES-256-CBC",f=32,a=e.random.getBytesSync(16),l=e.aes.createEncryptionCipher;break;case"3des":u="DES-EDE3-CBC",f=24,a=e.random.getBytesSync(8),l=e.des.createEncryptionCipher;break;case"des":u="DES-CBC",f=8,a=e.random.getBytesSync(8),l=e.des.createEncryptionCipher;break;default:var c=new Error('Could not encrypt RSA private key; unsupported encryption algorithm "'+s.algorithm+'".');throw c.algorithm=s.algorithm,c}var h=e.pbe.opensslDeriveBytes(i,a.substr(0,8),f),p=l(h);p.start(a),p.update(n.toDer(r.privateKeyToAsn1(t))),p.finish();var d={type:"RSA PRIVATE KEY",procType:{version:"4",type:"ENCRYPTED"},dekInfo:{algorithm:u,parameters:e.util.bytesToHex(a).toUpperCase()},body:p.output.getBytes()};return e.pem.encode(d)},r.decryptRsaPrivateKey=function(t,i){var s=null,o=e.pem.decode(t)[0];if(o.type!=="ENCRYPTED PRIVATE KEY"&&o.type!=="PRIVATE KEY"&&o.type!=="RSA PRIVATE KEY"){var u=new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');throw u.headerType=u,u}if(o.procType&&o.procType.type==="ENCRYPTED"){var a,f;switch(o.dekInfo.algorithm){case"DES-CBC":a=8,f=e.des.createDecryptionCipher;break;case"DES-EDE3-CBC":a=24,f=e.des.createDecryptionCipher;break;case"AES-128-CBC":a=16,f=e.aes.createDecryptionCipher;break;case"AES-192-CBC":a=24,f=e.aes.createDecryptionCipher;break;case"AES-256-CBC":a=32,f=e.aes.createDecryptionCipher;break;case"RC2-40-CBC":a=5,f=function(t){return e.rc2.createDecryptionCipher(t,40)};break;case"RC2-64-CBC":a=8,f=function(t){return e.rc2.createDecryptionCipher(t,64)};break;case"RC2-128-CBC":a=16,f=function(t){return e.rc2.createDecryptionCipher(t,128)};break;default:var u=new Error('Could not decrypt private key; unsupported encryption algorithm "'+o.dekInfo.algorithm+'".');throw u.algorithm=o.dekInfo.algorithm,u}var l=e.util.hexToBytes(o.dekInfo.parameters),c=e.pbe.opensslDeriveBytes(i,l.substr(0,8),a),h=f(c);h.start(l),h.update(e.util.createBuffer(o.body));if(!h.finish())return s;s=h.output.getBytes()}else s=o.body;return o.type==="ENCRYPTED PRIVATE KEY"?s=r.decryptPrivateKeyInfo(n.fromDer(s),i):s=n.fromDer(s),s!==null&&(s=r.privateKeyFromAsn1(s)),s},r.pbe.generatePkcs12Key=function(t,n,r,i,s,o){var u,a;if(typeof o=="undefined"||o===null)o=e.md.sha1.create();var f=o.digestLength,l=o.blockLength,c=new e.util.ByteBuffer,h=new e.util.ByteBuffer;if(t!==null&&t!==undefined){for(a=0;a<t.length;a++)h.putInt16(t.charCodeAt(a));h.putInt16(0)}var p=h.length(),d=n.length(),v=new e.util.ByteBuffer;v.fillWithByte(r,l);var m=l*Math.ceil(d/l),g=new e.util.ByteBuffer;for(a=0;a<m;a++)g.putByte(n.at(a%d));var y=l*Math.ceil(p/l),b=new e.util.ByteBuffer;for(a=0;a<y;a++)b.putByte(h.at(a%p));var w=g;w.putBuffer(b);var E=Math.ceil(s/f);for(var S=1;S<=E;S++){var x=new e.util.ByteBuffer;x.putBytes(v.bytes()),x.putBytes(w.bytes());for(var T=0;T<i;T++)o.start(),o.update(x.getBytes()),x=o.digest();var N=new e.util.ByteBuffer;for(a=0;a<l;a++)N.putByte(x.at(a%f));var C=Math.ceil(d/l)+Math.ceil(p/l),k=new e.util.ByteBuffer;for(u=0;u<C;u++){var L=new e.util.ByteBuffer(w.getBytes(l)),A=511;for(a=N.length()-1;a>=0;a--)A>>=8,A+=N.at(a)+L.at(a),L.setAt(a,A&255);k.putBuffer(L)}w=k,c.putBuffer(x)}return c.truncate(c.length()-s),c},r.pbe.getCipher=function(e,t,n){switch(e){case r.oids.pkcs5PBES2:return r.pbe.getCipherForPBES2(e,t,n);case r.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:case r.oids["pbewithSHAAnd40BitRC2-CBC"]:return r.pbe.getCipherForPKCS12PBE(e,t,n);default:var i=new Error("Cannot read encrypted PBE data block. Unsupported OID.");throw i.oid=e,i.supportedOids=["pkcs5PBES2","pbeWithSHAAnd3-KeyTripleDES-CBC","pbewithSHAAnd40BitRC2-CBC"],i}},r.pbe.getCipherForPBES2=function(t,i,s){var u={},a=[];if(!n.validate(i,o,u,a)){var f=new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");throw f.errors=a,f}t=n.derToOid(u.kdfOid);if(t!==r.oids.pkcs5PBKDF2){var f=new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");throw f.oid=t,f.supportedOids=["pkcs5PBKDF2"],f}t=n.derToOid(u.encOid);if(t!==r.oids["aes128-CBC"]&&t!==r.oids["aes192-CBC"]&&t!==r.oids["aes256-CBC"]&&t!==r.oids["des-EDE3-CBC"]&&t!==r.oids.desCBC){var f=new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");throw f.oid=t,f.supportedOids=["aes128-CBC","aes192-CBC","aes256-CBC","des-EDE3-CBC","desCBC"],f}var l=u.kdfSalt,c=e.util.createBuffer(u.kdfIterationCount);c=c.getInt(c.length()<<3);var h,p;switch(r.oids[t]){case"aes128-CBC":h=16,p=e.aes.createDecryptionCipher;break;case"aes192-CBC":h=24,p=e.aes.createDecryptionCipher;break;case"aes256-CBC":h=32,p=e.aes.createDecryptionCipher;break;case"des-EDE3-CBC":h=24,p=e.des.createDecryptionCipher;break;case"desCBC":h=8,p=e.des.createDecryptionCipher}var d=e.pkcs5.pbkdf2(s,l,c,h),v=u.encIv,m=p(d);return m.start(v),m},r.pbe.getCipherForPKCS12PBE=function(t,i,s){var o={},a=[];if(!n.validate(i,u,o,a)){var f=new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");throw f.errors=a,f}var l=e.util.createBuffer(o.salt),c=e.util.createBuffer(o.iterations);c=c.getInt(c.length()<<3);var h,p,d;switch(t){case r.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:h=24,p=8,d=e.des.startDecrypting;break;case r.oids["pbewithSHAAnd40BitRC2-CBC"]:h=5,p=8,d=function(t,n){var r=e.rc2.createDecryptionCipher(t,40);return r.start(n,null),r};break;default:var f=new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");throw f.oid=t,f}var v=r.pbe.generatePkcs12Key(s,l,1,c,h),m=r.pbe.generatePkcs12Key(s,l,2,c,p);return d(v,m)},r.pbe.opensslDeriveBytes=function(t,n,r,i){if(typeof i=="undefined"||i===null)i=e.md.md5.create();n===null&&(n="");var s=[a(i,t+n)];for(var o=16,u=1;o<r;++u,o+=16)s.push(a(i,s[u-1]+t+n));return s.join("").substr(0,r)}}var r="pbe";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pbe",["require","module","./aes","./asn1","./des","./md","./oids","./pem","./pbkdf2","./random","./rc2","./rsa","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t=e.asn1,n=e.pkcs7asn1=e.pkcs7asn1||{};e.pkcs7=e.pkcs7||{},e.pkcs7.asn1=n;var r={name:"ContentInfo",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"ContentInfo.ContentType",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"contentType"},{name:"ContentInfo.content",tagClass:t.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,captureAsn1:"content"}]};n.contentInfoValidator=r;var i={name:"EncryptedContentInfo",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedContentInfo.contentType",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"contentType"},{name:"EncryptedContentInfo.contentEncryptionAlgorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"encAlgorithm"},{name:"EncryptedContentInfo.contentEncryptionAlgorithm.parameter",tagClass:t.Class.UNIVERSAL,captureAsn1:"encParameter"}]},{name:"EncryptedContentInfo.encryptedContent",tagClass:t.Class.CONTEXT_SPECIFIC,type:0,capture:"encryptedContent",captureAsn1:"encryptedContentAsn1"}]};n.envelopedDataValidator={name:"EnvelopedData",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"EnvelopedData.Version",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"version"},{name:"EnvelopedData.RecipientInfos",tagClass:t.Class.UNIVERSAL,type:t.Type.SET,constructed:!0,captureAsn1:"recipientInfos"}].concat(i)},n.encryptedDataValidator={name:"EncryptedData",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedData.Version",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"version"}].concat(i)};var s={name:"SignerInfo",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"SignerInfo.version",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1},{name:"SignerInfo.issuerAndSerialNumber",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"SignerInfo.issuerAndSerialNumber.issuer",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"issuer"},{name:"SignerInfo.issuerAndSerialNumber.serialNumber",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"serial"}]},{name:"SignerInfo.digestAlgorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"SignerInfo.digestAlgorithm.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"digestAlgorithm"},{name:"SignerInfo.digestAlgorithm.parameter",tagClass:t.Class.UNIVERSAL,constructed:!1,captureAsn1:"digestParameter",optional:!0}]},{name:"SignerInfo.authenticatedAttributes",tagClass:t.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,capture:"authenticatedAttributes"},{name:"SignerInfo.digestEncryptionAlgorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,capture:"signatureAlgorithm"},{name:"SignerInfo.encryptedDigest",tagClass:t.Class.UNIVERSAL,type:t.Type.OCTETSTRING,constructed:!1,capture:"signature"},{name:"SignerInfo.unauthenticatedAttributes",tagClass:t.Class.CONTEXT_SPECIFIC,type:1,constructed:!0,optional:!0,capture:"unauthenticatedAttributes"}]};n.signedDataValidator={name:"SignedData",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"SignedData.Version",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"version"},{name:"SignedData.DigestAlgorithms",tagClass:t.Class.UNIVERSAL,type:t.Type.SET,constructed:!0,captureAsn1:"digestAlgorithms"},r,{name:"SignedData.Certificates",tagClass:t.Class.CONTEXT_SPECIFIC,type:0,optional:!0,captureAsn1:"certificates"},{name:"SignedData.CertificateRevocationLists",tagClass:t.Class.CONTEXT_SPECIFIC,type:1,optional:!0,captureAsn1:"crls"},{name:"SignedData.SignerInfos",tagClass:t.Class.UNIVERSAL,type:t.Type.SET,capture:"signerInfos",optional:!0,value:[s]}]},n.recipientInfoValidator={name:"RecipientInfo",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"RecipientInfo.version",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"version"},{name:"RecipientInfo.issuerAndSerial",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"RecipientInfo.issuerAndSerial.issuer",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"issuer"},{name:"RecipientInfo.issuerAndSerial.serialNumber",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"serial"}]},{name:"RecipientInfo.keyEncryptionAlgorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"RecipientInfo.keyEncryptionAlgorithm.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"encAlgorithm"},{name:"RecipientInfo.keyEncryptionAlgorithm.parameter",tagClass:t.Class.UNIVERSAL,constructed:!1,captureAsn1:"encParameter"}]},{name:"RecipientInfo.encryptedKey",tagClass:t.Class.UNIVERSAL,type:t.Type.OCTETSTRING,constructed:!1,capture:"encKey"}]}}var r="pkcs7asn1";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pkcs7asn1",["require","module","./asn1","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){e.mgf=e.mgf||{};var t=e.mgf.mgf1=e.mgf1=e.mgf1||{};t.create=function(t){var n={generate:function(n,r){var i=new e.util.ByteBuffer,s=Math.ceil(r/t.digestLength);for(var o=0;o<s;o++){var u=new e.util.ByteBuffer;u.putInt32(o),t.start(),t.update(n+u.getBytes()),i.putBuffer(t.digest())}return i.truncate(i.length()-r),i.getBytes()}};return n}}var r="mgf1";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/mgf1",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){e.mgf=e.mgf||{},e.mgf.mgf1=e.mgf1}var r="mgf";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/mgf",["require","module","./mgf1"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t=e.pss=e.pss||{};t.create=function(t){arguments.length===3&&(t={md:arguments[0],mgf:arguments[1],saltLength:arguments[2]});var n=t.md,r=t.mgf,i=n.digestLength,s=t.salt||null;typeof s=="string"&&(s=e.util.createBuffer(s));var o;if("saltLength"in t)o=t.saltLength;else{if(s===null)throw new Error("Salt length not specified or specific salt not given.");o=s.length()}if(s!==null&&s.length()!==o)throw new Error("Given salt length does not match length of given salt.");var u=t.prng||e.random,a={};return a.encode=function(t,a){var f,l=a-1,c=Math.ceil(l/8),h=t.digest().getBytes();if(c<i+o+2)throw new Error("Message is too long to encrypt.");var p;s===null?p=u.getBytesSync(o):p=s.bytes();var d=new e.util.ByteBuffer;d.fillWithByte(0,8),d.putBytes(h),d.putBytes(p),n.start(),n.update(d.getBytes());var v=n.digest().getBytes(),m=new e.util.ByteBuffer;m.fillWithByte(0,c-o-i-2),m.putByte(1),m.putBytes(p);var g=m.getBytes(),y=c-i-1,b=r.generate(v,y),w="";for(f=0;f<y;f++)w+=String.fromCharCode(g.charCodeAt(f)^b.charCodeAt(f));var E=65280>>8*c-l&255;return w=String.fromCharCode(w.charCodeAt(0)&~E)+w.substr(1),w+v+String.fromCharCode(188)},a.verify=function(t,s,u){var a,f=u-1,l=Math.ceil(f/8);s=s.substr(-l);if(l<i+o+2)throw new Error("Inconsistent parameters to PSS signature verification.");if(s.charCodeAt(l-1)!==188)throw new Error("Encoded message does not end in 0xBC.");var c=l-i-1,h=s.substr(0,c),p=s.substr(c,i),d=65280>>8*l-f&255;if((h.charCodeAt(0)&d)!==0)throw new Error("Bits beyond keysize not zero as expected.");var v=r.generate(p,c),m="";for(a=0;a<c;a++)m+=String.fromCharCode(h.charCodeAt(a)^v.charCodeAt(a));m=String.fromCharCode(m.charCodeAt(0)&~d)+m.substr(1);var g=l-i-o-2;for(a=0;a<g;a++)if(m.charCodeAt(a)!==0)throw new Error("Leftmost octets not zero as expected");if(m.charCodeAt(g)!==1)throw new Error("Inconsistent PSS signature, 0x01 marker not found");var y=m.substr(-o),b=new e.util.ByteBuffer;b.fillWithByte(0,8),b.putBytes(t),b.putBytes(y),n.start(),n.update(b.getBytes());var w=n.digest().getBytes();return p===w},a}}var r="pss";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pss",["require","module","./random","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function l(e,t){typeof t=="string"&&(t={shortName:t});var n=null,r;for(var i=0;n===null&&i<e.attributes.length;++i)r=e.attributes[i],t.type&&t.type===r.type?n=r:t.name&&t.name===r.name?n=r:t.shortName&&t.shortName===r.shortName&&(n=r);return n}function h(n){var r=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]),i,s,o=n.attributes;for(var u=0;u<o.length;++u){i=o[u];var a=i.value,f=t.Type.PRINTABLESTRING;"valueTagClass"in i&&(f=i.valueTagClass,f===t.Type.UTF8&&(a=e.util.encodeUtf8(a))),s=t.create(t.Class.UNIVERSAL,t.Type.SET,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(i.type).getBytes()),t.create(t.Class.UNIVERSAL,f,!1,a)])]),r.value.push(s)}return r}function p(n){var r={};for(var i=0;i<n.length;++i){var s=n[i];if(s.shortName&&(s.valueTagClass===t.Type.UTF8||s.valueTagClass===t.Type.PRINTABLESTRING||s.valueTagClass===t.Type.IA5STRING)){var o=s.value;s.valueTagClass===t.Type.UTF8&&(o=e.util.encodeUtf8(s.value)),s.shortName in r?e.util.isArray(r[s.shortName])?r[s.shortName].push(o):r[s.shortName]=[r[s.shortName],o]:r[s.shortName]=o}}return r}function d(e){var s;for(var o=0;o<e.length;++o){s=e[o],typeof s.name=="undefined"&&(s.type&&s.type in n.oids?s.name=n.oids[s.type]:s.shortName&&s.shortName in i&&(s.name=n.oids[i[s.shortName]]));if(typeof s.type=="undefined"){if(!(s.name&&s.name in n.oids)){var u=new Error("Attribute type not specified.");throw u.attribute=s,u}s.type=n.oids[s.name]}typeof s.shortName=="undefined"&&s.name&&s.name in i&&(s.shortName=i[s.name]);if(s.type===r.extensionRequest){s.valueConstructed=!0,s.valueTagClass=t.Type.SEQUENCE;if(!s.value&&s.extensions){s.value=[];for(var a=0;a<s.extensions.length;++a)s.value.push(n.certificateExtensionToAsn1(v(s.extensions[a])))}}if(typeof s.value=="undefined"){var u=new Error("Attribute value not specified.");throw u.attribute=s,u}}}function v(i,s){s=s||{},typeof i.name=="undefined"&&i.id&&i.id in n.oids&&(i.name=n.oids[i.id]);if(typeof i.id=="undefined"){if(!(i.name&&i.name in n.oids)){var o=new Error("Extension ID not specified.");throw o.extension=i,o}i.id=n.oids[i.name]}if(typeof i.value!="undefined")return i;if(i.name==="keyUsage"){var u=0,a=0,f=0;i.digitalSignature&&(a|=128,u=7),i.nonRepudiation&&(a|=64,u=6),i.keyEncipherment&&(a|=32,u=5),i.dataEncipherment&&(a|=16,u=4),i.keyAgreement&&(a|=8,u=3),i.keyCertSign&&(a|=4,u=2),i.cRLSign&&(a|=2,u=1),i.encipherOnly&&(a|=1,u=0),i.decipherOnly&&(f|=128,u=7);var l=String.fromCharCode(u);f!==0?l+=String.fromCharCode(a)+String.fromCharCode(f):a!==0&&(l+=String.fromCharCode(a)),i.value=t.create(t.Class.UNIVERSAL,t.Type.BITSTRING,!1,l)}else if(i.name==="basicConstraints")i.value=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]),i.cA&&i.value.value.push(t.create(t.Class.UNIVERSAL,t.Type.BOOLEAN,!1,String.fromCharCode(255))),"pathLenConstraint"in i&&i.value.value.push(t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(i.pathLenConstraint).getBytes()));else if(i.name==="extKeyUsage"){i.value=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]);var c=i.value.value;for(var p in i){if(i[p]!==!0)continue;p in r?c.push(t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(r[p]).getBytes())):p.indexOf(".")!==-1&&c.push(t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(p).getBytes()))}}else if(i.name==="nsCertType"){var u=0,a=0;i.client&&(a|=128,u=7),i.server&&(a|=64,u=6),i.email&&(a|=32,u=5),i.objsign&&(a|=16,u=4),i.reserved&&(a|=8,u=3),i.sslCA&&(a|=4,u=2),i.emailCA&&(a|=2,u=1),i.objCA&&(a|=1,u=0);var l=String.fromCharCode(u);a!==0&&(l+=String.fromCharCode(a)),i.value=t.create(t.Class.UNIVERSAL,t.Type.BITSTRING,!1,l)}else if(i.name==="subjectAltName"||i.name==="issuerAltName"){i.value=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]);var d;for(var v=0;v<i.altNames.length;++v){d=i.altNames[v];var l=d.value;if(d.type===7&&d.ip){l=e.util.bytesFromIP(d.ip);if(l===null){var o=new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');throw o.extension=i,o}}else d.type===8&&(d.oid?l=t.oidToDer(t.oidToDer(d.oid)):l=t.oidToDer(l));i.value.value.push(t.create(t.Class.CONTEXT_SPECIFIC,d.type,!1,l))}}else if(i.name==="subjectKeyIdentifier"&&s.cert){var m=s.cert.generateSubjectKeyIdentifier();i.subjectKeyIdentifier=m.toHex(),i.value=t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,m.getBytes())}else if(i.name==="authorityKeyIdentifier"&&s.cert){i.value=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]);var c=i.value.value;if(i.keyIdentifier){var g=i.keyIdentifier===!0?s.cert.generateSubjectKeyIdentifier().getBytes():i.keyIdentifier;c.push(t.create(t.Class.CONTEXT_SPECIFIC,0,!1,g))}if(i.authorityCertIssuer){var y=[t.create(t.Class.CONTEXT_SPECIFIC,4,!0,[h(i.authorityCertIssuer===!0?s.cert.issuer:i.authorityCertIssuer)])];c.push(t.create(t.Class.CONTEXT_SPECIFIC,1,!0,y))}if(i.serialNumber){var b=e.util.hexToBytes(i.serialNumber===!0?s.cert.serialNumber:i.serialNumber);c.push(t.create(t.Class.CONTEXT_SPECIFIC,2,!1,b))}}else if(i.name==="cRLDistributionPoints"){i.value=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]);var c=i.value.value,w=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]),E=t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[]),d;for(var v=0;v<i.altNames.length;++v){d=i.altNames[v];var l=d.value;if(d.type===7&&d.ip){l=e.util.bytesFromIP(d.ip);if(l===null){var o=new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');throw o.extension=i,o}}else d.type===8&&(d.oid?l=t.oidToDer(t.oidToDer(d.oid)):l=t.oidToDer(l));E.value.push(t.create(t.Class.CONTEXT_SPECIFIC,d.type,!1,l))}w.value.push(t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[E])),c.push(w)}if(typeof i.value=="undefined"){var o=new Error("Extension value not specified.");throw o.extension=i,o}return i}function m(e,n){switch(e){case r["RSASSA-PSS"]:var i=[];return n.hash.algorithmOid!==undefined&&i.push(t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.hash.algorithmOid).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")])])),n.mgf.algorithmOid!==undefined&&i.push(t.create(t.Class.CONTEXT_SPECIFIC,1,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.mgf.algorithmOid).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.mgf.hash.algorithmOid).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")])])])),n.saltLength!==undefined&&i.push(t.create(t.Class.CONTEXT_SPECIFIC,2,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(n.saltLength).getBytes())])),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,i);default:return t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")}}function g(n){var r=t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[]);if(n.attributes.length===0)return r;var i=n.attributes;for(var s=0;s<i.length;++s){var o=i[s],u=o.value,a=t.Type.UTF8;"valueTagClass"in o&&(a=o.valueTagClass),a===t.Type.UTF8&&(u=e.util.encodeUtf8(u));var f=!1;"valueConstructed"in o&&(f=o.valueConstructed);var l=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(o.type).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SET,!0,[t.create(t.Class.UNIVERSAL,a,f,u)])]);r.value.push(l)}return r}var t=e.asn1,n=e.pki=e.pki||{},r=n.oids,i={};i.CN=r.commonName,i.commonName="CN",i.C=r.countryName,i.countryName="C",i.L=r.localityName,i.localityName="L",i.ST=r.stateOrProvinceName,i.stateOrProvinceName="ST",i.O=r.organizationName,i.organizationName="O",i.OU=r.organizationalUnitName,i.organizationalUnitName="OU",i.E=r.emailAddress,i.emailAddress="E";var s=e.pki.rsa.publicKeyValidator,o={name:"Certificate",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.TBSCertificate",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"tbsCertificate",value:[{name:"Certificate.TBSCertificate.version",tagClass:t.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,value:[{name:"Certificate.TBSCertificate.version.integer",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"certVersion"}]},{name:"Certificate.TBSCertificate.serialNumber",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"certSerialNumber"},{name:"Certificate.TBSCertificate.signature",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.TBSCertificate.signature.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"certinfoSignatureOid"},{name:"Certificate.TBSCertificate.signature.parameters",tagClass:t.Class.UNIVERSAL,optional:!0,captureAsn1:"certinfoSignatureParams"}]},{name:"Certificate.TBSCertificate.issuer",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"certIssuer"},{name:"Certificate.TBSCertificate.validity",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.TBSCertificate.validity.notBefore (utc)",tagClass:t.Class.UNIVERSAL,type:t.Type.UTCTIME,constructed:!1,optional:!0,capture:"certValidity1UTCTime"},{name:"Certificate.TBSCertificate.validity.notBefore (generalized)",tagClass:t.Class.UNIVERSAL,type:t.Type.GENERALIZEDTIME,constructed:!1,optional:!0,capture:"certValidity2GeneralizedTime"},{name:"Certificate.TBSCertificate.validity.notAfter (utc)",tagClass:t.Class.UNIVERSAL,type:t.Type.UTCTIME,constructed:!1,optional:!0,capture:"certValidity3UTCTime"},{name:"Certificate.TBSCertificate.validity.notAfter (generalized)",tagClass:t.Class.UNIVERSAL,type:t.Type.GENERALIZEDTIME,constructed:!1,optional:!0,capture:"certValidity4GeneralizedTime"}]},{name:"Certificate.TBSCertificate.subject",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"certSubject"},s,{name:"Certificate.TBSCertificate.issuerUniqueID",tagClass:t.Class.CONTEXT_SPECIFIC,type:1,constructed:!0,optional:!0,value:[{name:"Certificate.TBSCertificate.issuerUniqueID.id",tagClass:t.Class.UNIVERSAL,type:t.Type.BITSTRING,constructed:!1,capture:"certIssuerUniqueId"}]},{name:"Certificate.TBSCertificate.subjectUniqueID",tagClass:t.Class.CONTEXT_SPECIFIC,type:2,constructed:!0,optional:!0,value:[{name:"Certificate.TBSCertificate.subjectUniqueID.id",tagClass:t.Class.UNIVERSAL,type:t.Type.BITSTRING,constructed:!1,capture:"certSubjectUniqueId"}]},{name:"Certificate.TBSCertificate.extensions",tagClass:t.Class.CONTEXT_SPECIFIC,type:3,constructed:!0,captureAsn1:"certExtensions",optional:!0}]},{name:"Certificate.signatureAlgorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.signatureAlgorithm.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"certSignatureOid"},{name:"Certificate.TBSCertificate.signature.parameters",tagClass:t.Class.UNIVERSAL,optional:!0,captureAsn1:"certSignatureParams"}]},{name:"Certificate.signatureValue",tagClass:t.Class.UNIVERSAL,type:t.Type.BITSTRING,constructed:!1,capture:"certSignature"}]},u={name:"rsapss",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"rsapss.hashAlgorithm",tagClass:t.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,value:[{name:"rsapss.hashAlgorithm.AlgorithmIdentifier",tagClass:t.Class.UNIVERSAL,type:t.Class.SEQUENCE,constructed:!0,optional:!0,value:[{name:"rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"hashOid"}]}]},{name:"rsapss.maskGenAlgorithm",tagClass:t.Class.CONTEXT_SPECIFIC,type:1,constructed:!0,value:[{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier",tagClass:t.Class.UNIVERSAL,type:t.Class.SEQUENCE,constructed:!0,optional:!0,value:[{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"maskGenOid"},{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"maskGenHashOid"}]}]}]},{name:"rsapss.saltLength",tagClass:t.Class.CONTEXT_SPECIFIC,type:2,optional:!0,value:[{name:"rsapss.saltLength.saltLength",tagClass:t.Class.UNIVERSAL,type:t.Class.INTEGER,constructed:!1,capture:"saltLength"}]},{name:"rsapss.trailerField",tagClass:t.Class.CONTEXT_SPECIFIC,type:3,optional:!0,value:[{name:"rsapss.trailer.trailer",tagClass:t.Class.UNIVERSAL,type:t.Class.INTEGER,constructed:!1,capture:"trailer"}]}]},a={name:"CertificationRequestInfo",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"certificationRequestInfo",value:[{name:"CertificationRequestInfo.integer",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"certificationRequestInfoVersion"},{name:"CertificationRequestInfo.subject",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"certificationRequestInfoSubject"},s,{name:"CertificationRequestInfo.attributes",tagClass:t.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,capture:"certificationRequestInfoAttributes",value:[{name:"CertificationRequestInfo.attributes",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"CertificationRequestInfo.attributes.type",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1},{name:"CertificationRequestInfo.attributes.value",tagClass:t.Class.UNIVERSAL,type:t.Type.SET,constructed:!0}]}]}]},f={name:"CertificationRequest",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,captureAsn1:"csr",value:[a,{name:"CertificationRequest.signatureAlgorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"CertificationRequest.signatureAlgorithm.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"csrSignatureOid"},{name:"CertificationRequest.signatureAlgorithm.parameters",tagClass:t.Class.UNIVERSAL,optional:!0,captureAsn1:"csrSignatureParams"}]},{name:"CertificationRequest.signature",tagClass:t.Class.UNIVERSAL,type:t.Type.BITSTRING,constructed:!1,capture:"csrSignature"}]};n.RDNAttributesAsArray=function(e,n){var s=[],o,u,a;for(var f=0;f<e.value.length;++f){o=e.value[f];for(var l=0;l<o.value.length;++l)a={},u=o.value[l],a.type=t.derToOid(u.value[0].value),a.value=u.value[1].value,a.valueTagClass=u.value[1].type,a.type in r&&(a.name=r[a.type],a.name in i&&(a.shortName=i[a.name])),n&&(n.update(a.type),n.update(a.value)),s.push(a)}return s},n.CRIAttributesAsArray=function(e){var s=[];for(var o=0;o<e.length;++o){var u=e[o],a=t.derToOid(u.value[0].value),f=u.value[1].value;for(var l=0;l<f.length;++l){var c={};c.type=a,c.value=f[l].value,c.valueTagClass=f[l].type,c.type in r&&(c.name=r[c.type],c.name in i&&(c.shortName=i[c.name]));if(c.type===r.extensionRequest){c.extensions=[];for(var h=0;h<c.value.length;++h)c.extensions.push(n.certificateExtensionFromAsn1(c.value[h]))}s.push(c)}}return s};var c=function(e,n,i){var s={};if(e!==r["RSASSA-PSS"])return s;i&&(s={hash:{algorithmOid:r.sha1},mgf:{algorithmOid:r.mgf1,hash:{algorithmOid:r.sha1}},saltLength:20});var o={},a=[];if(!t.validate(n,u,o,a)){var f=new Error("Cannot read RSASSA-PSS parameter block.");throw f.errors=a,f}return o.hashOid!==undefined&&(s.hash=s.hash||{},s.hash.algorithmOid=t.derToOid(o.hashOid)),o.maskGenOid!==undefined&&(s.mgf=s.mgf||{},s.mgf.algorithmOid=t.derToOid(o.maskGenOid),s.mgf.hash=s.mgf.hash||{},s.mgf.hash.algorithmOid=t.derToOid(o.maskGenHashOid)),o.saltLength!==undefined&&(s.saltLength=o.saltLength.charCodeAt(0)),s};n.certificateFromPem=function(r,i,s){var o=e.pem.decode(r)[0];if(o.type!=="CERTIFICATE"&&o.type!=="X509 CERTIFICATE"&&o.type!=="TRUSTED CERTIFICATE"){var u=new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');throw u.headerType=o.type,u}if(o.procType&&o.procType.type==="ENCRYPTED")throw new Error("Could not convert certificate from PEM; PEM is encrypted.");var a=t.fromDer(o.body,s);return n.certificateFromAsn1(a,i)},n.certificateToPem=function(r,i){var s={type:"CERTIFICATE",body:t.toDer(n.certificateToAsn1(r)).getBytes()};return e.pem.encode(s,{maxline:i})},n.publicKeyFromPem=function(r){var i=e.pem.decode(r)[0];if(i.type!=="PUBLIC KEY"&&i.type!=="RSA PUBLIC KEY"){var s=new Error('Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".');throw s.headerType=i.type,s}if(i.procType&&i.procType.type==="ENCRYPTED")throw new Error("Could not convert public key from PEM; PEM is encrypted.");var o=t.fromDer(i.body);return n.publicKeyFromAsn1(o)},n.publicKeyToPem=function(r,i){var s={type:"PUBLIC KEY",body:t.toDer(n.publicKeyToAsn1(r)).getBytes()};return e.pem.encode(s,{maxline:i})},n.publicKeyToRSAPublicKeyPem=function(r,i){var s={type:"RSA PUBLIC KEY",body:t.toDer(n.publicKeyToRSAPublicKey(r)).getBytes()};return e.pem.encode(s,{maxline:i})},n.getPublicKeyFingerprint=function(r,i){i=i||{};var s=i.md||e.md.sha1.create(),o=i.type||"RSAPublicKey",u;switch(o){case"RSAPublicKey":u=t.toDer(n.publicKeyToRSAPublicKey(r)).getBytes();break;case"SubjectPublicKeyInfo":u=t.toDer(n.publicKeyToAsn1(r)).getBytes();break;default:throw new Error('Unknown fingerprint type "'+i.type+'".')}s.start(),s.update(u);var a=s.digest();if(i.encoding==="hex"){var f=a.toHex();return i.delimiter?f.match(/.{2}/g).join(i.delimiter):f}if(i.encoding==="binary")return a.getBytes();if(i.encoding)throw new Error('Unknown encoding "'+i.encoding+'".');return a},n.certificationRequestFromPem=function(r,i,s){var o=e.pem.decode(r)[0];if(o.type!=="CERTIFICATE REQUEST"){var u=new Error('Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".');throw u.headerType=o.type,u}if(o.procType&&o.procType.type==="ENCRYPTED")throw new Error("Could not convert certification request from PEM; PEM is encrypted.");var a=t.fromDer(o.body,s);return n.certificationRequestFromAsn1(a,i)},n.certificationRequestToPem=function(r,i){var s={type:"CERTIFICATE REQUEST",body:t.toDer(n.certificationRequestToAsn1(r)).getBytes()};return e.pem.encode(s,{maxline:i})},n.createCertificate=function(){var i={};return i.version=2,i.serialNumber="00",i.signatureOid=null,i.signature=null,i.siginfo={},i.siginfo.algorithmOid=null,i.validity={},i.validity.notBefore=new Date,i.validity.notAfter=new Date,i.issuer={},i.issuer.getField=function(e){return l(i.issuer,e)},i.issuer.addField=function(e){d([e]),i.issuer.attributes.push(e)},i.issuer.attributes=[],i.issuer.hash=null,i.subject={},i.subject.getField=function(e){return l(i.subject,e)},i.subject.addField=function(e){d([e]),i.subject.attributes.push(e)},i.subject.attributes=[],i.subject.hash=null,i.extensions=[],i.publicKey=null,i.md=null,i.setSubject=function(e,t){d(e),i.subject.attributes=e,delete i.subject.uniqueId,t&&(i.subject.uniqueId=t),i.subject.hash=null},i.setIssuer=function(e,t){d(e),i.issuer.attributes=e,delete i.issuer.uniqueId,t&&(i.issuer.uniqueId=t),i.issuer.hash=null},i.setExtensions=function(e){for(var t=0;t<e.length;++t)v(e[t],{cert:i});i.extensions=e},i.getExtension=function(e){typeof e=="string"&&(e={name:e});var t=null,n;for(var r=0;t===null&&r<i.extensions.length;++r)n=i.extensions[r],e.id&&n.id===e.id?t=n:e.name&&n.name===e.name&&(t=n);return t},i.sign=function(s,o){i.md=o||e.md.sha1.create();var u=r[i.md.algorithm+"WithRSAEncryption"];if(!u){var a=new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");throw a.algorithm=i.md.algorithm,a}i.signatureOid=i.siginfo.algorithmOid=u,i.tbsCertificate=n.getTBSCertificate(i);var f=t.toDer(i.tbsCertificate);i.md.update(f.getBytes()),i.signature=s.sign(i.md)},i.verify=function(s){var o=!1;if(!i.issued(s)){var u=s.issuer,a=i.subject,f=new Error("The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.");throw f.expectedIssuer=u.attributes,f.actualIssuer=a.attributes,f}var l=s.md;if(l===null){if(s.signatureOid in r){var c=r[s.signatureOid];switch(c){case"sha1WithRSAEncryption":l=e.md.sha1.create();break;case"md5WithRSAEncryption":l=e.md.md5.create();break;case"sha256WithRSAEncryption":l=e.md.sha256.create();break;case"sha512WithRSAEncryption":l=e.md.sha512.create();break;case"RSASSA-PSS":l=e.md.sha256.create()}}if(l===null){var f=new Error("Could not compute certificate digest. Unknown signature OID.");throw f.signatureOid=s.signatureOid,f}var h=s.tbsCertificate||n.getTBSCertificate(s),p=t.toDer(h);l.update(p.getBytes())}if(l!==null){var d;switch(s.signatureOid){case r.sha1WithRSAEncryption:d=undefined;break;case r["RSASSA-PSS"]:var v,m;v=r[s.signatureParameters.mgf.hash.algorithmOid];if(v===undefined||e.md[v]===undefined){var f=new Error("Unsupported MGF hash function.");throw f.oid=s.signatureParameters.mgf.hash.algorithmOid,f.name=v,f}m=r[s.signatureParameters.mgf.algorithmOid];if(m===undefined||e.mgf[m]===undefined){var f=new Error("Unsupported MGF function.");throw f.oid=s.signatureParameters.mgf.algorithmOid,f.name=m,f}m=e.mgf[m].create(e.md[v].create()),v=r[s.signatureParameters.hash.algorithmOid];if(v===undefined||e.md[v]===undefined)throw{message:"Unsupported RSASSA-PSS hash function.",oid:s.signatureParameters.hash.algorithmOid,name:v};d=e.pss.create(e.md[v].create(),m,s.signatureParameters.saltLength)}o=i.publicKey.verify(l.digest().getBytes(),s.signature,d)}return o},i.isIssuer=function(e){var t=!1,n=i.issuer,r=e.subject;if(n.hash&&r.hash)t=n.hash===r.hash;else if(n.attributes.length===r.attributes.length){t=!0;var s,o;for(var u=0;t&&u<n.attributes.length;++u){s=n.attributes[u],o=r.attributes[u];if(s.type!==o.type||s.value!==o.value)t=!1}}return t},i.issued=function(e){return e.isIssuer(i)},i.generateSubjectKeyIdentifier=function(){return n.getPublicKeyFingerprint(i.publicKey,{type:"RSAPublicKey"})},i.verifySubjectKeyIdentifier=function(){var t=r.subjectKeyIdentifier;for(var n=0;n<i.extensions.length;++n){var s=i.extensions[n];if(s.id===t){var o=i.generateSubjectKeyIdentifier().getBytes();return e.util.hexToBytes(s.subjectKeyIdentifier)===o}}return!1},i},n.certificateFromAsn1=function(i,s){var u={},a=[];if(!t.validate(i,o,u,a)){var f=new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.");throw f.errors=a,f}if(typeof u.certSignature!="string"){var h="\0";for(var p=0;p<u.certSignature.length;++p)h+=t.toDer(u.certSignature[p]).getBytes();u.certSignature=h}var v=t.derToOid(u.publicKeyOid);if(v!==n.oids.rsaEncryption)throw new Error("Cannot read public key. OID is not RSA.");var m=n.createCertificate();m.version=u.certVersion?u.certVersion.charCodeAt(0):0;var g=e.util.createBuffer(u.certSerialNumber);m.serialNumber=g.toHex(),m.signatureOid=e.asn1.derToOid(u.certSignatureOid),m.signatureParameters=c(m.signatureOid,u.certSignatureParams,!0),m.siginfo.algorithmOid=e.asn1.derToOid(u.certinfoSignatureOid),m.siginfo.parameters=c(m.siginfo.algorithmOid,u.certinfoSignatureParams,!1);var y=e.util.createBuffer(u.certSignature);++y.read,m.signature=y.getBytes();var b=[];u.certValidity1UTCTime!==undefined&&b.push(t.utcTimeToDate(u.certValidity1UTCTime)),u.certValidity2GeneralizedTime!==undefined&&b.push(t.generalizedTimeToDate(u.certValidity2GeneralizedTime)),u.certValidity3UTCTime!==undefined&&b.push(t.utcTimeToDate(u.certValidity3UTCTime)),u.certValidity4GeneralizedTime!==undefined&&b.push(t.generalizedTimeToDate(u.certValidity4GeneralizedTime));if(b.length>2)throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");if(b.length<2)throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");m.validity.notBefore=b[0],m.validity.notAfter=b[1],m.tbsCertificate=u.tbsCertificate;if(s){m.md=null;if(m.signatureOid in r){var v=r[m.signatureOid];switch(v){case"sha1WithRSAEncryption":m.md=e.md.sha1.create();break;case"md5WithRSAEncryption":m.md=e.md.md5.create();break;case"sha256WithRSAEncryption":m.md=e.md.sha256.create();break;case"sha512WithRSAEncryption":m.md=e.md.sha512.create();break;case"RSASSA-PSS":m.md=e.md.sha256.create()}}if(m.md===null){var f=new Error("Could not compute certificate digest. Unknown signature OID.");throw f.signatureOid=m.signatureOid,f}var w=t.toDer(m.tbsCertificate);m.md.update(w.getBytes())}var E=e.md.sha1.create();m.issuer.getField=function(e){return l(m.issuer,e)},m.issuer.addField=function(e){d([e]),m.issuer.attributes.push(e)},m.issuer.attributes=n.RDNAttributesAsArray(u.certIssuer,E),u.certIssuerUniqueId&&(m.issuer.uniqueId=u.certIssuerUniqueId),m.issuer.hash=E.digest().toHex();var S=e.md.sha1.create();return m.subject.getField=function(e){return l(m.subject,e)},m.subject.addField=function(e){d([e]),m.subject.attributes.push(e)},m.subject.attributes=n.RDNAttributesAsArray(u.certSubject,S),u.certSubjectUniqueId&&(m.subject.uniqueId=u.certSubjectUniqueId),m.subject.hash=S.digest().toHex(),u.certExtensions?m.extensions=n.certificateExtensionsFromAsn1(u.certExtensions):m.extensions=[],m.publicKey=n.publicKeyFromAsn1(u.subjectPublicKeyInfo),m},n.certificateExtensionsFromAsn1=function(e){var t=[];for(var r=0;r<e.value.length;++r){var i=e.value[r];for(var s=0;s<i.value.length;++s)t.push(n.certificateExtensionFromAsn1(i.value[s]))}return t},n.certificateExtensionFromAsn1=function(n){var i={};i.id=t.derToOid(n.value[0].value),i.critical=!1,n.value[1].type===t.Type.BOOLEAN?(i.critical=n.value[1].value.charCodeAt(0)!==0,i.value=n.value[2].value):i.value=n.value[1].value;if(i.id in r){i.name=r[i.id];if(i.name==="keyUsage"){var s=t.fromDer(i.value),o=0,u=0;s.value.length>1&&(o=s.value.charCodeAt(1),u=s.value.length>2?s.value.charCodeAt(2):0),i.digitalSignature=(o&128)===128,i.nonRepudiation=(o&64)===64,i.keyEncipherment=(o&32)===32,i.dataEncipherment=(o&16)===16,i.keyAgreement=(o&8)===8,i.keyCertSign=(o&4)===4,i.cRLSign=(o&2)===2,i.encipherOnly=(o&1)===1,i.decipherOnly=(u&128)===128}else if(i.name==="basicConstraints"){var s=t.fromDer(i.value);s.value.length>0&&s.value[0].type===t.Type.BOOLEAN?i.cA=s.value[0].value.charCodeAt(0)!==0:i.cA=!1;var a=null;s.value.length>0&&s.value[0].type===t.Type.INTEGER?a=s.value[0].value:s.value.length>1&&(a=s.value[1].value),a!==null&&(i.pathLenConstraint=t.derToInteger(a))}else if(i.name==="extKeyUsage"){var s=t.fromDer(i.value);for(var f=0;f<s.value.length;++f){var l=t.derToOid(s.value[f].value);l in r?i[r[l]]=!0:i[l]=!0}}else if(i.name==="nsCertType"){var s=t.fromDer(i.value),o=0;s.value.length>1&&(o=s.value.charCodeAt(1)),i.client=(o&128)===128,i.server=(o&64)===64,i.email=(o&32)===32,i.objsign=(o&16)===16,i.reserved=(o&8)===8,i.sslCA=(o&4)===4,i.emailCA=(o&2)===2,i.objCA=(o&1)===1}else if(i.name==="subjectAltName"||i.name==="issuerAltName"){i.altNames=[];var c,s=t.fromDer(i.value);for(var h=0;h<s.value.length;++h){c=s.value[h];var p={type:c.type,value:c.value};i.altNames.push(p);switch(c.type){case 1:case 2:case 6:break;case 7:p.ip=e.util.bytesToIP(c.value);break;case 8:p.oid=t.derToOid(c.value);break;default:}}}else if(i.name==="subjectKeyIdentifier"){var s=t.fromDer(i.value);i.subjectKeyIdentifier=e.util.bytesToHex(s.value)}}return i},n.certificationRequestFromAsn1=function(i,s){var o={},u=[];if(!t.validate(i,f,o,u)){var a=new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.");throw a.errors=u,a}if(typeof o.csrSignature!="string"){var h="\0";for(var p=0;p<o.csrSignature.length;++p)h+=t.toDer(o.csrSignature[p]).getBytes();o.csrSignature=h}var v=t.derToOid(o.publicKeyOid);if(v!==n.oids.rsaEncryption)throw new Error("Cannot read public key. OID is not RSA.");var m=n.createCertificationRequest();m.version=o.csrVersion?o.csrVersion.charCodeAt(0):0,m.signatureOid=e.asn1.derToOid(o.csrSignatureOid),m.signatureParameters=c(m.signatureOid,o.csrSignatureParams,!0),m.siginfo.algorithmOid=e.asn1.derToOid(o.csrSignatureOid),m.siginfo.parameters=c(m.siginfo.algorithmOid,o.csrSignatureParams,!1);var g=e.util.createBuffer(o.csrSignature);++g.read,m.signature=g.getBytes(),m.certificationRequestInfo=o.certificationRequestInfo;if(s){m.md=null;if(m.signatureOid in r){var v=r[m.signatureOid];switch(v){case"sha1WithRSAEncryption":m.md=e.md.sha1.create();break;case"md5WithRSAEncryption":m.md=e.md.md5.create();break;case"sha256WithRSAEncryption":m.md=e.md.sha256.create();break;case"sha512WithRSAEncryption":m.md=e.md.sha512.create();break;case"RSASSA-PSS":m.md=e.md.sha256.create()}}if(m.md===null){var a=new Error("Could not compute certification request digest. Unknown signature OID.");throw a.signatureOid=m.signatureOid,a}var y=t.toDer(m.certificationRequestInfo);m.md.update(y.getBytes())}var b=e.md.sha1.create();return m.subject.getField=function(e){return l(m.subject,e)},m.subject.addField=function(e){d([e]),m.subject.attributes.push(e)},m.subject.attributes=n.RDNAttributesAsArray(o.certificationRequestInfoSubject,b),m.subject.hash=b.digest().toHex(),m.publicKey=n.publicKeyFromAsn1(o.subjectPublicKeyInfo),m.getAttribute=function(e){return l(m,e)},m.addAttribute=function(e){d([e]),m.attributes.push(e)},m.attributes=n.CRIAttributesAsArray(o.certificationRequestInfoAttributes||[]),m},n.createCertificationRequest=function(){var i={};return i.version=0,i.signatureOid=null,i.signature=null,i.siginfo={},i.siginfo.algorithmOid=null,i.subject={},i.subject.getField=function(e){return l(i.subject,e)},i.subject.addField=function(e){d([e]),i.subject.attributes.push(e)},i.subject.attributes=[],i.subject.hash=null,i.publicKey=null,i.attributes=[],i.getAttribute=function(e){return l(i,e)},i.addAttribute=function(e){d([e]),i.attributes.push(e)},i.md=null,i.setSubject=function(e){d(e),i.subject.attributes=e,i.subject.hash=null},i.setAttributes=function(e){d(e),i.attributes=e},i.sign=function(s,o){i.md=o||e.md.sha1.create();var u=r[i.md.algorithm+"WithRSAEncryption"];if(!u){var a=new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");throw a.algorithm=i.md.algorithm,a}i.signatureOid=i.siginfo.algorithmOid=u,i.certificationRequestInfo=n.getCertificationRequestInfo(i);var f=t.toDer(i.certificationRequestInfo);i.md.update(f.getBytes()),i.signature=s.sign(i.md)},i.verify=function(){var s=!1,o=i.md;if(o===null){if(i.signatureOid in r){var u=r[i.signatureOid];switch(u){case"sha1WithRSAEncryption":o=e.md.sha1.create();break;case"md5WithRSAEncryption":o=e.md.md5.create();break;case"sha256WithRSAEncryption":o=e.md.sha256.create();break;case"sha512WithRSAEncryption":o=e.md.sha512.create();break;case"RSASSA-PSS":o=e.md.sha256.create()}}if(o===null){var a=new Error("Could not compute certification request digest. Unknown signature OID.");throw a.signatureOid=i.signatureOid,a}var f=i.certificationRequestInfo||n.getCertificationRequestInfo(i),l=t.toDer(f);o.update(l.getBytes())}if(o!==null){var c;switch(i.signatureOid){case r.sha1WithRSAEncryption:break;case r["RSASSA-PSS"]:var h,p;h=r[i.signatureParameters.mgf.hash.algorithmOid];if(h===undefined||e.md[h]===undefined){var a=new Error("Unsupported MGF hash function.");throw a.oid=i.signatureParameters.mgf.hash.algorithmOid,a.name=h,a}p=r[i.signatureParameters.mgf.algorithmOid];if(p===undefined||e.mgf[p]===undefined){var a=new Error("Unsupported MGF function.");throw a.oid=i.signatureParameters.mgf.algorithmOid,a.name=p,a}p=e.mgf[p].create(e.md[h].create()),h=r[i.signatureParameters.hash.algorithmOid];if(h===undefined||e.md[h]===undefined){var a=new Error("Unsupported RSASSA-PSS hash function.");throw a.oid=i.signatureParameters.hash.algorithmOid,a.name=h,a}c=e.pss.create(e.md[h].create(),p,i.signatureParameters.saltLength)}s=i.publicKey.verify(o.digest().getBytes(),i.signature,c)}return s},i},n.getTBSCertificate=function(r){var i=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(r.version).getBytes())]),t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,e.util.hexToBytes(r.serialNumber)),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(r.siginfo.algorithmOid).getBytes()),m(r.siginfo.algorithmOid,r.siginfo.parameters)]),h(r.issuer),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.UTCTIME,!1,t.dateToUtcTime(r.validity.notBefore)),t.create(t.Class.UNIVERSAL,t.Type.UTCTIME,!1,t.dateToUtcTime(r.validity.notAfter))]),h(r.subject),n.publicKeyToAsn1(r.publicKey)]);return r.issuer.uniqueId&&i.value.push(t.create(t.Class.CONTEXT_SPECIFIC,1,!0,[t.create(t.Class.UNIVERSAL,t.Type.BITSTRING,!1,String.fromCharCode(0)+r.issuer.uniqueId)])),r.subject.uniqueId&&i.value.push(t.create(t.Class.CONTEXT_SPECIFIC,2,!0,[t.create(t.Class.UNIVERSAL,t.Type.BITSTRING,!1,String.fromCharCode(0)+r.subject.uniqueId)])),r.extensions.length>0&&i.value.push(n.certificateExtensionsToAsn1(r.extensions)),i},n.getCertificationRequestInfo=function(e){var r=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(e.version).getBytes()),h(e.subject),n.publicKeyToAsn1(e.publicKey),g(e)]);return r},n.distinguishedNameToAsn1=function(e){return h(e)},n.certificateToAsn1=function(e){var r=e.tbsCertificate||n.getTBSCertificate(e);return t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[r,t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(e.signatureOid).getBytes()),m(e.signatureOid,e.signatureParameters)]),t.create(t.Class.UNIVERSAL,t.Type.BITSTRING,!1,String.fromCharCode(0)+e.signature)])},n.certificateExtensionsToAsn1=function(e){var r=t.create(t.Class.CONTEXT_SPECIFIC,3,!0,[]),i=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]);r.value.push(i);for(var s=0;s<e.length;++s)i.value.push(n.certificateExtensionToAsn1(e[s]));return r},n.certificateExtensionToAsn1=function(e){var n=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[]);n.value.push(t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(e.id).getBytes())),e.critical&&n.value.push(t.create(t.Class.UNIVERSAL,t.Type.BOOLEAN,!1,String.fromCharCode(255)));var r=e.value;return typeof e.value!="string"&&(r=t.toDer(r).getBytes()),n.value.push(t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,r)),n},n.certificationRequestToAsn1=function(e){var r=e.certificationRequestInfo||n.getCertificationRequestInfo(e);return t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[r,t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(e.signatureOid).getBytes()),m(e.signatureOid,e.signatureParameters)]),t.create(t.Class.UNIVERSAL,t.Type.BITSTRING,!1,String.fromCharCode(0)+e.signature)])},n.createCaStore=function(r){function s(e){return o(e),i.certs[e.hash]||null}function o(t){if(!t.hash){var r=e.md.sha1.create();t.attributes=n.RDNAttributesAsArray(h(t),r),t.hash=r.digest().toHex()}}var i={certs:{}};i.getIssuer=function(e){var t=s(e.issuer);return t},i.addCertificate=function(t){typeof t=="string"&&(t=e.pki.certificateFromPem(t)),o(t.subject);if(!i.hasCertificate(t))if(t.subject.hash in i.certs){var n=i.certs[t.subject.hash];e.util.isArray(n)||(n=[n]),n.push(t),i.certs[t.subject.hash]=n}else i.certs[t.subject.hash]=t},i.hasCertificate=function(r){typeof r=="string"&&(r=e.pki.certificateFromPem(r));var i=s(r.subject);if(!i)return!1;e.util.isArray(i)||(i=[i]);var o=t.toDer(n.certificateToAsn1(r)).getBytes();for(var u=0;u<i.length;++u){var a=t.toDer(n.certificateToAsn1(i[u])).getBytes();if(o===a)return!0}return!1},i.listAllCertificates=function(){var t=[];for(var n in i.certs)if(i.certs.hasOwnProperty(n)){var r=i.certs[n];if(!e.util.isArray(r))t.push(r);else for(var s=0;s<r.length;++s)t.push(r[s])}return t},i.removeCertificate=function(r){var u;typeof r=="string"&&(r=e.pki.certificateFromPem(r)),o(r.subject);if(!i.hasCertificate(r))return null;var a=s(r.subject);if(!e.util.isArray(a))return u=i.certs[r.subject.hash],delete i.certs[r.subject.hash],u;var f=t.toDer(n.certificateToAsn1(r)).getBytes();for(var l=0;l<a.length;++l){var c=t.toDer(n.certificateToAsn1(a[l])).getBytes();f===c&&(u=a[l],a.splice(l,1))}return a.length===0&&delete i.certs[r.subject.hash],u};if(r)for(var u=0;u<r.length;++u){var a=r[u];i.addCertificate(a)}return i},n.certificateError={bad_certificate:"forge.pki.BadCertificate",unsupported_certificate:"forge.pki.UnsupportedCertificate",certificate_revoked:"forge.pki.CertificateRevoked",certificate_expired:"forge.pki.CertificateExpired",certificate_unknown:"forge.pki.CertificateUnknown",unknown_ca:"forge.pki.UnknownCertificateAuthority"},n.verifyCertificateChain=function(t,r,i){r=r.slice(0);var s=r.slice(0),o=new Date,u=!0,a=null,f=0;do{var l=r.shift(),c=null,h=!1;if(o<l.validity.notBefore||o>l.validity.notAfter)a={message:"Certificate is not valid yet or has expired.",error:n.certificateError.certificate_expired,notBefore:l.validity.notBefore,notAfter:l.validity.notAfter,now:o};if(a===null){c=r[0]||t.getIssuer(l),c===null&&l.isIssuer(l)&&(h=!0,c=l);if(c){var p=c;e.util.isArray(p)||(p=[p]);var d=!1;while(!d&&p.length>0){c=p.shift();try{d=c.verify(l)}catch(v){}}d||(a={message:"Certificate signature is invalid.",error:n.certificateError.bad_certificate})}a===null&&(!c||h)&&!t.hasCertificate(l)&&(a={message:"Certificate is not trusted.",error:n.certificateError.unknown_ca})}a===null&&c&&!l.isIssuer(c)&&(a={message:"Certificate issuer is invalid.",error:n.certificateError.bad_certificate});if(a===null){var m={keyUsage:!0,basicConstraints:!0};for(var g=0;a===null&&g<l.extensions.length;++g){var y=l.extensions[g];y.critical&&!(y.name in m)&&(a={message:"Certificate has an unsupported critical extension.",error:n.certificateError.unsupported_certificate})}}if(a===null&&(!u||r.length===0&&(!c||h))){var b=l.getExtension("basicConstraints"),w=l.getExtension("keyUsage");w!==null&&(!w.keyCertSign||b===null)&&(a={message:"Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",error:n.certificateError.bad_certificate}),a===null&&b!==null&&!b.cA&&(a={message:"Certificate basicConstraints indicates the certificate is not a CA.",error:n.certificateError.bad_certificate});if(a===null&&w!==null&&"pathLenConstraint"in b){var E=f-1;E>b.pathLenConstraint&&(a={message:"Certificate basicConstraints pathLenConstraint violated.",error:n.certificateError.bad_certificate})}}var S=a===null?!0:a.error,x=i?i(S,f,s):S;if(x!==!0){S===!0&&(a={message:"The application rejected the certificate.",error:n.certificateError.bad_certificate});if(x||x===0)typeof x=="object"&&!e.util.isArray(x)?(x.message&&(a.message=x.message),x.error&&(a.error=x.error)):typeof x=="string"&&(a.error=x);throw a}a=null,u=!1,++f}while(r.length>0);return!0}}var r="x509";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n.pki}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/x509",["require","module","./aes","./asn1","./des","./md","./mgf","./oids","./pem","./pss","./rsa","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function f(e,t,n,r){var i=[];for(var s=0;s<e.length;s++)for(var o=0;o<e[s].safeBags.length;o++){var u=e[s].safeBags[o];if(r!==undefined&&u.type!==r)continue;if(t===null){i.push(u);continue}u.attributes[t]!==undefined&&u.attributes[t].indexOf(n)>=0&&i.push(u)}return i}function l(t){if(t.composed||t.constructed){var n=e.util.createBuffer();for(var r=0;r<t.value.length;++r)n.putBytes(t.value[r].value);t.composed=t.constructed=!1,t.value=n.getBytes()}return t}function c(e,r,s,o){r=t.fromDer(r,s);if(r.tagClass!==t.Class.UNIVERSAL||r.type!==t.Type.SEQUENCE||r.constructed!==!0)throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");for(var u=0;u<r.value.length;u++){var a=r.value[u],f={},c=[];if(!t.validate(a,i,f,c)){var d=new Error("Cannot read ContentInfo.");throw d.errors=c,d}var v={encrypted:!1},m=null,g=f.content.value[0];switch(t.derToOid(f.contentType)){case n.oids.data:if(g.tagClass!==t.Class.UNIVERSAL||g.type!==t.Type.OCTETSTRING)throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");m=l(g).value;break;case n.oids.encryptedData:m=h(g,o),v.encrypted=!0;break;default:var d=new Error("Unsupported PKCS#12 contentType.");throw d.contentType=t.derToOid(f.contentType),d}v.safeBags=p(m,s,o),e.safeContents.push(v)}}function h(r,i){var s={},o=[];if(!t.validate(r,e.pkcs7.asn1.encryptedDataValidator,s,o)){var u=new Error("Cannot read EncryptedContentInfo.");throw u.errors=o,u}var a=t.derToOid(s.contentType);if(a!==n.oids.data){var u=new Error("PKCS#12 EncryptedContentInfo ContentType is not Data.");throw u.oid=a,u}a=t.derToOid(s.encAlgorithm);var f=n.pbe.getCipher(a,s.encParameter,i),c=l(s.encryptedContentAsn1),h=e.util.createBuffer(c.value);f.update(h);if(!f.finish())throw new Error("Failed to decrypt PKCS#12 SafeContents.");return f.output.getBytes()}function p(e,r,i){if(!r&&e.length===0)return[];e=t.fromDer(e,r);if(e.tagClass!==t.Class.UNIVERSAL||e.type!==t.Type.SEQUENCE||e.constructed!==!0)throw new Error("PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.");var s=[];for(var u=0;u<e.value.length;u++){var f=e.value[u],l={},c=[];if(!t.validate(f,o,l,c)){var h=new Error("Cannot read SafeBag.");throw h.errors=c,h}var p={type:t.derToOid(l.bagId),attributes:d(l.bagAttributes)};s.push(p);var v,m,g=l.bagValue.value[0];switch(p.type){case n.oids.pkcs8ShroudedKeyBag:g=n.decryptPrivateKeyInfo(g,i);if(g===null)throw new Error("Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?");case n.oids.keyBag:try{p.key=n.privateKeyFromAsn1(g)}catch(y){p.key=null,p.asn1=g}continue;case n.oids.certBag:v=a,m=function(){if(t.derToOid(l.certId)!==n.oids.x509Certificate){var e=new Error("Unsupported certificate type, only X.509 supported.");throw e.oid=t.derToOid(l.certId),e}var i=t.fromDer(l.cert,r);try{p.cert=n.certificateFromAsn1(i,!0)}catch(s){p.cert=null,p.asn1=i}};break;default:var h=new Error("Unsupported PKCS#12 SafeBag type.");throw h.oid=p.type,h}if(v!==undefined&&!t.validate(g,v,l,c)){var h=new Error("Cannot read PKCS#12 "+v.name);throw h.errors=c,h}m()}return s}function d(e){var r={};if(e!==undefined)for(var i=0;i<e.length;++i){var s={},o=[];if(!t.validate(e[i],u,s,o)){var a=new Error("Cannot read PKCS#12 BagAttribute.");throw a.errors=o,a}var f=t.derToOid(s.oid);if(n.oids[f]===undefined)continue;r[n.oids[f]]=[];for(var l=0;l<s.values.length;++l)r[n.oids[f]].push(s.values[l].value)}return r}var t=e.asn1,n=e.pki,r=e.pkcs12=e.pkcs12||{},i={name:"ContentInfo",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"ContentInfo.contentType",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"contentType"},{name:"ContentInfo.content",tagClass:t.Class.CONTEXT_SPECIFIC,constructed:!0,captureAsn1:"content"}]},s={name:"PFX",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"PFX.version",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,capture:"version"},i,{name:"PFX.macData",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,optional:!0,captureAsn1:"mac",value:[{name:"PFX.macData.mac",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"PFX.macData.mac.digestAlgorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"PFX.macData.mac.digestAlgorithm.algorithm",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"macAlgorithm"},{name:"PFX.macData.mac.digestAlgorithm.parameters",tagClass:t.Class.UNIVERSAL,captureAsn1:"macAlgorithmParameters"}]},{name:"PFX.macData.mac.digest",tagClass:t.Class.UNIVERSAL,type:t.Type.OCTETSTRING,constructed:!1,capture:"macDigest"}]},{name:"PFX.macData.macSalt",tagClass:t.Class.UNIVERSAL,type:t.Type.OCTETSTRING,constructed:!1,capture:"macSalt"},{name:"PFX.macData.iterations",tagClass:t.Class.UNIVERSAL,type:t.Type.INTEGER,constructed:!1,optional:!0,capture:"macIterations"}]}]},o={name:"SafeBag",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"SafeBag.bagId",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"bagId"},{name:"SafeBag.bagValue",tagClass:t.Class.CONTEXT_SPECIFIC,constructed:!0,captureAsn1:"bagValue"},{name:"SafeBag.bagAttributes",tagClass:t.Class.UNIVERSAL,type:t.Type.SET,constructed:!0,optional:!0,capture:"bagAttributes"}]},u={name:"Attribute",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"Attribute.attrId",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"oid"},{name:"Attribute.attrValues",tagClass:t.Class.UNIVERSAL,type:t.Type.SET,constructed:!0,capture:"values"}]},a={name:"CertBag",tagClass:t.Class.UNIVERSAL,type:t.Type.SEQUENCE,constructed:!0,value:[{name:"CertBag.certId",tagClass:t.Class.UNIVERSAL,type:t.Type.OID,constructed:!1,capture:"certId"},{name:"CertBag.certValue",tagClass:t.Class.CONTEXT_SPECIFIC,constructed:!0,value:[{name:"CertBag.certValue[0]",tagClass:t.Class.UNIVERSAL,type:t.Class.OCTETSTRING,constructed:!1,capture:"cert"}]}]};r.pkcs12FromAsn1=function(i,o,u){typeof o=="string"?(u=o,o=!0):o===undefined&&(o=!0);var a={},h=[];if(!t.validate(i,s,a,h)){var p=new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.");throw p.errors=p,p}var d={version:a.version.charCodeAt(0),safeContents:[],getBags:function(t){var n={},r;return"localKeyId"in t?r=t.localKeyId:"localKeyIdHex"in t&&(r=e.util.hexToBytes(t.localKeyIdHex)),r===undefined&&!("friendlyName"in t)&&"bagType"in t&&(n[t.bagType]=f(d.safeContents,null,null,t.bagType)),r!==undefined&&(n.localKeyId=f(d.safeContents,"localKeyId",r,t.bagType)),"friendlyName"in t&&(n.friendlyName=f(d.safeContents,"friendlyName",t.friendlyName,t.bagType)),n},getBagsByFriendlyName:function(e,t){return f(d.safeContents,"friendlyName",e,t)},getBagsByLocalKeyId:function(e,t){return f(d.safeContents,"localKeyId",e,t)}};if(a.version.charCodeAt(0)!==3){var p=new Error("PKCS#12 PFX of version other than 3 not supported.");throw p.version=a.version.charCodeAt(0),p}if(t.derToOid(a.contentType)!==n.oids.data){var p=new Error("Only PKCS#12 PFX in password integrity mode supported.");throw p.oid=t.derToOid(a.contentType),p}var v=a.content.value[0];if(v.tagClass!==t.Class.UNIVERSAL||v.type!==t.Type.OCTETSTRING)throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");v=l(v);if(a.mac){var m=null,g=0,y=t.derToOid(a.macAlgorithm);switch(y){case n.oids.sha1:m=e.md.sha1.create(),g=20;break;case n.oids.sha256:m=e.md.sha256.create(),g=32;break;case n.oids.sha384:m=e.md.sha384.create(),g=48;break;case n.oids.sha512:m=e.md.sha512.create(),g=64;break;case n.oids.md5:m=e.md.md5.create(),g=16}if(m===null)throw new Error("PKCS#12 uses unsupported MAC algorithm: "+y);var b=new e.util.ByteBuffer(a.macSalt),w="macIterations"in a?parseInt(e.util.bytesToHex(a.macIterations),16):1,E=r.generateKey(u,b,3,w,g,m),S=e.hmac.create();S.start(m,E),S.update(v.value);var x=S.getMac();if(x.getBytes()!==a.macDigest)throw new Error("PKCS#12 MAC could not be verified. Invalid password?")}return c(d,v.value,o,u),d},r.toPkcs12Asn1=function(i,s,o,u){u=u||{},u.saltSize=u.saltSize||8,u.count=u.count||2048,u.algorithm=u.algorithm||u.encAlgorithm||"aes128","useMac"in u||(u.useMac=!0),"localKeyId"in u||(u.localKeyId=null),"generateLocalKeyId"in u||(u.generateLocalKeyId=!0);var a=u.localKeyId,f;if(a!==null)a=e.util.hexToBytes(a);else if(u.generateLocalKeyId)if(s){var l=e.util.isArray(s)?s[0]:s;typeof l=="string"&&(l=n.certificateFromPem(l));var c=e.md.sha1.create();c.update(t.toDer(n.certificateToAsn1(l)).getBytes()),a=c.digest().getBytes()}else a=e.random.getBytes(20);var h=[];a!==null&&h.push(t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.localKeyId).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SET,!0,[t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,a)])])),"friendlyName"in u&&h.push(t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.friendlyName).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SET,!0,[t.create(t.Class.UNIVERSAL,t.Type.BMPSTRING,!1,u.friendlyName)])])),h.length>0&&(f=t.create(t.Class.UNIVERSAL,t.Type.SET,!0,h));var p=[],d=[];s!==null&&(e.util.isArray(s)?d=s:d=[s]);var v=[];for(var m=0;m<d.length;++m){s=d[m],typeof s=="string"&&(s=n.certificateFromPem(s));var g=m===0?f:undefined,y=n.certificateToAsn1(s),b=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.certBag).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.x509Certificate).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,t.toDer(y).getBytes())])])]),g]);v.push(b)}if(v.length>0){var w=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,v),E=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.data).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,t.toDer(w).getBytes())])]);p.push(E)}var S=null;if(i!==null){var x=n.wrapRsaPrivateKey(n.privateKeyToAsn1(i));o===null?S=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.keyBag).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[x]),f]):S=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.pkcs8ShroudedKeyBag).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[n.encryptPrivateKeyInfo(x,o,u)]),f]);var T=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[S]),N=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.data).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,t.toDer(T).getBytes())])]);p.push(N)}var C=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,p),k;if(u.useMac){var c=e.md.sha1.create(),L=new e.util.ByteBuffer(e.random.getBytes(u.saltSize)),A=u.count,i=r.generateKey(o,L,3,A,20),O=e.hmac.create();O.start(c,i),O.update(t.toDer(C).getBytes());var M=O.getMac();k=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.sha1).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")]),t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,M.getBytes())]),t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,L.getBytes()),t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(A).getBytes())])}return t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(3).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.oids.data).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,t.toDer(C).getBytes())])]),k])},r.generateKey=e.pbe.generatePkcs12Key}var r="pkcs12";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pkcs12",["require","module","./asn1","./hmac","./oids","./pkcs7asn1","./pbe","./random","./rsa","./sha1","./util","./x509"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t=e.asn1,n=e.pki=e.pki||{};n.pemToDer=function(t){var n=e.pem.decode(t)[0];if(n.procType&&n.procType.type==="ENCRYPTED")throw new Error("Could not convert PEM to DER; PEM is encrypted.");return e.util.createBuffer(n.body)},n.privateKeyFromPem=function(r){var i=e.pem.decode(r)[0];if(i.type!=="PRIVATE KEY"&&i.type!=="RSA PRIVATE KEY"){var s=new Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');throw s.headerType=i.type,s}if(i.procType&&i.procType.type==="ENCRYPTED")throw new Error("Could not convert private key from PEM; PEM is encrypted.");var o=t.fromDer(i.body);return n.privateKeyFromAsn1(o)},n.privateKeyToPem=function(r,i){var s={type:"RSA PRIVATE KEY",body:t.toDer(n.privateKeyToAsn1(r)).getBytes()};return e.pem.encode(s,{maxline:i})},n.privateKeyInfoToPem=function(n,r){var i={type:"PRIVATE KEY",body:t.toDer(n).getBytes()};return e.pem.encode(i,{maxline:r})}}var r="pki";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pki",["require","module","./asn1","./oids","./pbe","./pem","./pbkdf2","./pkcs12","./pss","./rsa","./util","./x509"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t=function(t,n,r,i){var s=e.util.createBuffer(),o=t.length>>1,u=o+(t.length&1),a=t.substr(0,u),f=t.substr(o,u),l=e.util.createBuffer(),c=e.hmac.create();r=n+r;var h=Math.ceil(i/16),p=Math.ceil(i/20);c.start("MD5",a);var d=e.util.createBuffer();l.putBytes(r);for(var v=0;v<h;++v)c.start(null,null),c.update(l.getBytes()),l.putBuffer(c.digest()),c.start(null,null),c.update(l.bytes()+r),d.putBuffer(c.digest());c.start("SHA1",f);var m=e.util.createBuffer();l.clear(),l.putBytes(r);for(var v=0;v<p;++v)c.start(null,null),c.update(l.getBytes()),l.putBuffer(c.digest()),c.start(null,null),c.update(l.bytes()+r),m.putBuffer(c.digest());return s.putBytes(e.util.xorBytes(d.getBytes(),m.getBytes(),i)),s},n=function(e,t,n,r){},r=function(t,n,r){var i=e.hmac.create();i.start("SHA1",t);var s=e.util.createBuffer();return s.putInt32(n[0]),s.putInt32(n[1]),s.putByte(r.type),s.putByte(r.version.major),s.putByte(r.version.minor),s.putInt16(r.length),s.putBytes(r.fragment.bytes()),i.update(s.getBytes()),i.digest().getBytes()},i=function(t,n,r){var i=!1;try{var s=t.deflate(n.fragment.getBytes());n.fragment=e.util.createBuffer(s),n.length=s.length,i=!0}catch(o){}return i},s=function(t,n,r){var i=!1;try{var s=t.inflate(n.fragment.getBytes());n.fragment=e.util.createBuffer(s),n.length=s.length,i=!0}catch(o){}return i},o=function(t,n){var r=0;switch(n){case 1:r=t.getByte();break;case 2:r=t.getInt16();break;case 3:r=t.getInt24();break;case 4:r=t.getInt32()}return e.util.createBuffer(t.getBytes(r))},u=function(e,t,n){e.putInt(n.length(),t<<3),e.putBuffer(n)},a={};a.Versions={TLS_1_0:{major:3,minor:1},TLS_1_1:{major:3,minor:2},TLS_1_2:{major:3,minor:3}},a.SupportedVersions=[a.Versions.TLS_1_1,a.Versions.TLS_1_0],a.Version=a.SupportedVersions[0],a.MaxFragment=15360,a.ConnectionEnd={server:0,client:1},a.PRFAlgorithm={tls_prf_sha256:0},a.BulkCipherAlgorithm={none:null,rc4:0,des3:1,aes:2},a.CipherType={stream:0,block:1,aead:2},a.MACAlgorithm={none:null,hmac_md5:0,hmac_sha1:1,hmac_sha256:2,hmac_sha384:3,hmac_sha512:4},a.CompressionMethod={none:0,deflate:1},a.ContentType={change_cipher_spec:20,alert:21,handshake:22,application_data:23,heartbeat:24},a.HandshakeType={hello_request:0,client_hello:1,server_hello:2,certificate:11,server_key_exchange:12,certificate_request:13,server_hello_done:14,certificate_verify:15,client_key_exchange:16,finished:20},a.Alert={},a.Alert.Level={warning:1,fatal:2},a.Alert.Description={close_notify:0,unexpected_message:10,bad_record_mac:20,decryption_failed:21,record_overflow:22,decompression_failure:30,handshake_failure:40,bad_certificate:42,unsupported_certificate:43,certificate_revoked:44,certificate_expired:45,certificate_unknown:46,illegal_parameter:47,unknown_ca:48,access_denied:49,decode_error:50,decrypt_error:51,export_restriction:60,protocol_version:70,insufficient_security:71,internal_error:80,user_canceled:90,no_renegotiation:100},a.HeartbeatMessageType={heartbeat_request:1,heartbeat_response:2},a.CipherSuites={},a.getCipherSuite=function(e){var t=null;for(var n in a.CipherSuites){var r=a.CipherSuites[n];if(r.id[0]===e.charCodeAt(0)&&r.id[1]===e.charCodeAt(1)){t=r;break}}return t},a.handleUnexpected=function(e,t){var n=!e.open&&e.entity===a.ConnectionEnd.client;n||e.error(e,{message:"Unexpected message. Received TLS record out of order.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.unexpected_message}})},a.handleHelloRequest=function(e,t,n){!e.handshaking&&e.handshakes>0&&(a.queue(e,a.createAlert(e,{level:a.Alert.Level.warning,description:a.Alert.Description.no_renegotiation})),a.flush(e)),e.process()},a.parseHelloMessage=function(t,n,r){var i=null,s=t.entity===a.ConnectionEnd.client;if(r<38)t.error(t,{message:s?"Invalid ServerHello message. Message too short.":"Invalid ClientHello message. Message too short.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.illegal_parameter}});else{var u=n.fragment,f=u.length();i={version:{major:u.getByte(),minor:u.getByte()},random:e.util.createBuffer(u.getBytes(32)),session_id:o(u,1),extensions:[]},s?(i.cipher_suite=u.getBytes(2),i.compression_method=u.getByte()):(i.cipher_suites=o(u,2),i.compression_methods=o(u,1)),f=r-(f-u.length());if(f>0){var l=o(u,2);while(l.length()>0)i.extensions.push({type:[l.getByte(),l.getByte()],data:o(l,2)});if(!s)for(var c=0;c<i.extensions.length;++c){var h=i.extensions[c];if(h.type[0]===0&&h.type[1]===0){var p=o(h.data,2);while(p.length()>0){var d=p.getByte();if(d!==0)break;t.session.extensions.server_name.serverNameList.push(o(p,2).getBytes())}}}}if(t.session.version)if(i.version.major!==t.session.version.major||i.version.minor!==t.session.version.minor)return t.error(t,{message:"TLS version change is disallowed during renegotiation.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.protocol_version}});if(s)t.session.cipherSuite=a.getCipherSuite(i.cipher_suite);else{var v=e.util.createBuffer(i.cipher_suites.bytes());while(v.length()>0){t.session.cipherSuite=a.getCipherSuite(v.getBytes(2));if(t.session.cipherSuite!==null)break}}if(t.session.cipherSuite===null)return t.error(t,{message:"No cipher suites in common.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.handshake_failure},cipherSuite:e.util.bytesToHex(i.cipher_suite)});s?t.session.compressionMethod=i.compression_method:t.session.compressionMethod=a.CompressionMethod.none}return i},a.createSecurityParameters=function(e,t){var n=e.entity===a.ConnectionEnd.client,r=t.random.bytes(),i=n?e.session.sp.client_random:r,s=n?r:a.createRandom().getBytes();e.session.sp={entity:e.entity,prf_algorithm:a.PRFAlgorithm.tls_prf_sha256,bulk_cipher_algorithm:null,cipher_type:null,enc_key_length:null,block_length:null,fixed_iv_length:null,record_iv_length:null,mac_algorithm:null,mac_length:null,mac_key_length:null,compression_algorithm:e.session.compressionMethod,pre_master_secret:null,master_secret:null,client_random:i,server_random:s}},a.handleServerHello=function(e,t,n){var r=a.parseHelloMessage(e,t,n);if(e.fail)return;if(!(r.version.minor<=e.version.minor))return e.error(e,{message:"Incompatible TLS version.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.protocol_version}});e.version.minor=r.version.minor,e.session.version=e.version;var i=r.session_id.bytes();i.length>0&&i===e.session.id?(e.expect=d,e.session.resuming=!0,e.session.sp.server_random=r.random.bytes()):(e.expect=l,e.session.resuming=!1,a.createSecurityParameters(e,r)),e.session.id=i,e.process()},a.handleClientHello=function(t,n,r){var i=a.parseHelloMessage(t,n,r);if(t.fail)return;var s=i.session_id.bytes(),o=null;if(t.sessionCache){o=t.sessionCache.getSession(s);if(o===null)s="";else if(o.version.major!==i.version.major||o.version.minor>i.version.minor)o=null,s=""}s.length===0&&(s=e.random.getBytes(32)),t.session.id=s,t.session.clientHelloVersion=i.version,t.session.sp={};if(o)t.version=t.session.version=o.version,t.session.sp=o.sp;else{var u;for(var f=1;f<a.SupportedVersions.length;++f){u=a.SupportedVersions[f];if(u.minor<=i.version.minor)break}t.version={major:u.major,minor:u.minor},t.session.version=t.version}o!==null?(t.expect=S,t.session.resuming=!0,t.session.sp.client_random=i.random.bytes()):(t.expect=t.verifyClient!==!1?b:w,t.session.resuming=!1,a.createSecurityParameters(t,i)),t.open=!0,a.queue(t,a.createRecord(t,{type:a.ContentType.handshake,data:a.createServerHello(t)})),t.session.resuming?(a.queue(t,a.createRecord(t,{type:a.ContentType.change_cipher_spec,data:a.createChangeCipherSpec()})),t.state.pending=a.createConnectionState(t),t.state.current.write=t.state.pending.write,a.queue(t,a.createRecord(t,{type:a.ContentType.handshake,data:a.createFinished(t)}))):(a.queue(t,a.createRecord(t,{type:a.ContentType.handshake,data:a.createCertificate(t)})),t.fail||(a.queue(t,a.createRecord(t,{type:a.ContentType.handshake,data:a.createServerKeyExchange(t)})),t.verifyClient!==!1&&a.queue(t,a.createRecord(t,{type:a.ContentType.handshake,data:a.createCertificateRequest(t)})),a.queue(t,a.createRecord(t,{type:a.ContentType.handshake,data:a.createServerHelloDone(t)})))),a.flush(t),t.process()},a.handleCertificate=function(t,n,r){if(r<3)return t.error(t,{message:"Invalid Certificate message. Message too short.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.illegal_parameter}});var i=n.fragment,s={certificate_list:o(i,3)},u,f,l=[];try{while(s.certificate_list.length()>0)u=o(s.certificate_list,3),f=e.asn1.fromDer(u),u=e.pki.certificateFromAsn1(f,!0),l.push(u)}catch(h){return t.error(t,{message:"Could not parse certificate list.",cause:h,send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.bad_certificate}})}var p=t.entity===a.ConnectionEnd.client;!p&&t.verifyClient!==!0||l.length!==0?l.length===0?t.expect=p?c:w:(p?t.session.serverCertificate=l[0]:t.session.clientCertificate=l[0],a.verifyCertificateChain(t,l)&&(t.expect=p?c:w)):t.error(t,{message:p?"No server certificate provided.":"No client certificate provided.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.illegal_parameter}}),t.process()},a.handleServerKeyExchange=function(e,t,n){if(n>0)return e.error(e,{message:"Invalid key parameters. Only RSA is supported.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.unsupported_certificate}});e.expect=h,e.process()},a.handleClientKeyExchange=function(t,n,r){if(r<48)return t.error(t,{message:"Invalid key parameters. Only RSA is supported.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.unsupported_certificate}});var i=n.fragment,s={enc_pre_master_secret:o(i,2).getBytes()},u=null;if(t.getPrivateKey)try{u=t.getPrivateKey(t,t.session.serverCertificate),u=e.pki.privateKeyFromPem(u)}catch(f){t.error(t,{message:"Could not get private key.",cause:f,send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.internal_error}})}if(u===null)return t.error(t,{message:"No private key set.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.internal_error}});try{var l=t.session.sp;l.pre_master_secret=u.decrypt(s.enc_pre_master_secret);var c=t.session.clientHelloVersion;if(c.major!==l.pre_master_secret.charCodeAt(0)||c.minor!==l.pre_master_secret.charCodeAt(1))throw new Error("TLS version rollback attack detected.")}catch(f){l.pre_master_secret=e.random.getBytes(48)}t.expect=S,t.session.clientCertificate!==null&&(t.expect=E),t.process()},a.handleCertificateRequest=function(e,t,n){if(n<3)return e.error(e,{message:"Invalid CertificateRequest. Message too short.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.illegal_parameter}});var r=t.fragment,i={certificate_types:o(r,1),certificate_authorities:o(r,2)};e.session.certificateRequest=i,e.expect=p,e.process()},a.handleCertificateVerify=function(t,n,r){if(r<2)return t.error(t,{message:"Invalid CertificateVerify. Message too short.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.illegal_parameter}});var i=n.fragment;i.read-=4;var s=i.bytes();i.read+=4;var u={signature:o(i,2).getBytes()},f=e.util.createBuffer();f.putBuffer(t.session.md5.digest()),f.putBuffer(t.session.sha1.digest()),f=f.getBytes();try{var l=t.session.clientCertificate;if(!l.publicKey.verify(f,u.signature,"NONE"))throw new Error("CertificateVerify signature does not match.");t.session.md5.update(s),t.session.sha1.update(s)}catch(c){return t.error(t,{message:"Bad signature in CertificateVerify.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.handshake_failure}})}t.expect=S,t.process()},a.handleServerHelloDone=function(t,n,r){if(r>0)return t.error(t,{message:"Invalid ServerHelloDone message. Invalid length.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.record_overflow}});if(t.serverCertificate===null){var i={message:"No server certificate provided. Not enough security.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.insufficient_security}},s=0,o=t.verify(t,i.alert.description,s,[]);if(o!==!0){if(o||o===0)typeof o=="object"&&!e.util.isArray(o)?(o.message&&(i.message=o.message),o.alert&&(i.alert.description=o.alert)):typeof o=="number"&&(i.alert.description=o);return t.error(t,i)}}t.session.certificateRequest!==null&&(n=a.createRecord(t,{type:a.ContentType.handshake,data:a.createCertificate(t)}),a.queue(t,n)),n=a.createRecord(t,{type:a.ContentType.handshake,data:a.createClientKeyExchange(t)}),a.queue(t,n),t.expect=g;var u=function(e,t){e.session.certificateRequest!==null&&e.session.clientCertificate!==null&&a.queue(e,a.createRecord(e,{type:a.ContentType.handshake,data:a.createCertificateVerify(e,t)})),a.queue(e,a.createRecord(e,{type:a.ContentType.change_cipher_spec,data:a.createChangeCipherSpec()})),e.state.pending=a.createConnectionState(e),e.state.current.write=e.state.pending.write,a.queue(e,a.createRecord(e,{type:a.ContentType.handshake,data:a.createFinished(e)})),e.expect=d,a.flush(e),e.process()};if(t.session.certificateRequest===null||t.session.clientCertificate===null)return u(t,null);a.getClientSignature(t,u)},a.handleChangeCipherSpec=function(e,t){if(t.fragment.getByte()!==1)return e.error(e,{message:"Invalid ChangeCipherSpec message received.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.illegal_parameter}});var n=e.entity===a.ConnectionEnd.client;if(e.session.resuming&&n||!e.session.resuming&&!n)e.state.pending=a.createConnectionState(e);e.state.current.read=e.state.pending.read;if(!e.session.resuming&&n||e.session.resuming&&!n)e.state.pending=null;e.expect=n?v:x,e.process()},a.handleFinished=function(n,r,i){var s=r.fragment;s.read-=4;var o=s.bytes();s.read+=4;var u=r.fragment.getBytes();s=e.util.createBuffer(),s.putBuffer(n.session.md5.digest()),s.putBuffer(n.session.sha1.digest());var f=n.entity===a.ConnectionEnd.client,l=f?"server finished":"client finished",c=n.session.sp,h=12,p=t;s=p(c.master_secret,l,s.getBytes(),h);if(s.getBytes()!==u)return n.error(n,{message:"Invalid verify_data in Finished message.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.decrypt_error}});n.session.md5.update(o),n.session.sha1.update(o);if(n.session.resuming&&f||!n.session.resuming&&!f)a.queue(n,a.createRecord(n,{type:a.ContentType.change_cipher_spec,data:a.createChangeCipherSpec()})),n.state.current.write=n.state.pending.write,n.state.pending=null,a.queue(n,a.createRecord(n,{type:a.ContentType.handshake,data:a.createFinished(n)}));n.expect=f?m:T,n.handshaking=!1,++n.handshakes,n.peerCertificate=f?n.session.serverCertificate:n.session.clientCertificate,a.flush(n),n.isConnected=!0,n.connected(n),n.process()},a.handleAlert=function(e,t){var n=t.fragment,r={level:n.getByte(),description:n.getByte()},i;switch(r.description){case a.Alert.Description.close_notify:i="Connection closed.";break;case a.Alert.Description.unexpected_message:i="Unexpected message.";break;case a.Alert.Description.bad_record_mac:i="Bad record MAC.";break;case a.Alert.Description.decryption_failed:i="Decryption failed.";break;case a.Alert.Description.record_overflow:i="Record overflow.";break;case a.Alert.Description.decompression_failure:i="Decompression failed.";break;case a.Alert.Description.handshake_failure:i="Handshake failure.";break;case a.Alert.Description.bad_certificate:i="Bad certificate.";break;case a.Alert.Description.unsupported_certificate:i="Unsupported certificate.";break;case a.Alert.Description.certificate_revoked:i="Certificate revoked.";break;case a.Alert.Description.certificate_expired:i="Certificate expired.";break;case a.Alert.Description.certificate_unknown:i="Certificate unknown.";break;case a.Alert.Description.illegal_parameter:i="Illegal parameter.";break;case a.Alert.Description.unknown_ca:i="Unknown certificate authority.";break;case a.Alert.Description.access_denied:i="Access denied.";break;case a.Alert.Description.decode_error:i="Decode error.";break;case a.Alert.Description.decrypt_error:i="Decrypt error.";break;case a.Alert.Description.export_restriction:i="Export restriction.";break;case a.Alert.Description.protocol_version:i="Unsupported protocol version.";break;case a.Alert.Description.insufficient_security:i="Insufficient security.";break;case a.Alert.Description.internal_error:i="Internal error.";break;case a.Alert.Description.user_canceled:i="User canceled.";break;case a.Alert.Description.no_renegotiation:i="Renegotiation not supported.";break;default:i="Unknown error."}if(r.description===a.Alert.Description.close_notify)return e.close();e.error(e,{message:i,send:!1,origin:e.entity===a.ConnectionEnd.client?"server":"client",alert:r}),e.process()},a.handleHandshake=function(t,n){var r=n.fragment,i=r.getByte(),s=r.getInt24();if(s>r.length())return t.fragmented=n,n.fragment=e.util.createBuffer(),r.read-=4,t.process();t.fragmented=null,r.read-=4;var o=r.bytes(s+4);r.read+=4,i in q[t.entity][t.expect]?(t.entity===a.ConnectionEnd.server&&!t.open&&!t.fail&&(t.handshaking=!0,t.session={version:null,extensions:{server_name:{serverNameList:[]}},cipherSuite:null,compressionMethod:null,serverCertificate:null,clientCertificate:null,md5:e.md.md5.create(),sha1:e.md.sha1.create()}),i!==a.HandshakeType.hello_request&&i!==a.HandshakeType.certificate_verify&&i!==a.HandshakeType.finished&&(t.session.md5.update(o),t.session.sha1.update(o)),q[t.entity][t.expect][i](t,n,s)):a.handleUnexpected(t,n)},a.handleApplicationData=function(e,t){e.data.putBuffer(t.fragment),e.dataReady(e),e.process()},a.handleHeartbeat=function(t,n){var r=n.fragment,i=r.getByte(),s=r.getInt16(),o=r.getBytes(s);if(i===a.HeartbeatMessageType.heartbeat_request){if(t.handshaking||s>o.length)return t.process();a.queue(t,a.createRecord(t,{type:a.ContentType.heartbeat,data:a.createHeartbeat(a.HeartbeatMessageType.heartbeat_response,o)})),a.flush(t)}else if(i===a.HeartbeatMessageType.heartbeat_response){if(o!==t.expectedHeartbeatPayload)return t.process();t.heartbeatReceived&&t.heartbeatReceived(t,e.util.createBuffer(o))}t.process()};var f=0,l=1,c=2,h=3,p=4,d=5,v=6,m=7,g=8,y=0,b=1,w=2,E=3,S=4,x=5,T=6,N=7,C=a.handleUnexpected,k=a.handleChangeCipherSpec,L=a.handleAlert,A=a.handleHandshake,O=a.handleApplicationData,M=a.handleHeartbeat,_=[];_[a.ConnectionEnd.client]=[[C,L,A,C,M],[C,L,A,C,M],[C,L,A,C,M],[C,L,A,C,M],[C,L,A,C,M],[k,L,C,C,M],[C,L,A,C,M],[C,L,A,O,M],[C,L,A,C,M]],_[a.ConnectionEnd.server]=[[C,L,A,C,M],[C,L,A,C,M],[C,L,A,C,M],[C,L,A,C,M],[k,L,C,C,M],[C,L,A,C,M],[C,L,A,O,M],[C,L,A,C,M]];var D=a.handleHelloRequest,P=a.handleServerHello,H=a.handleCertificate,B=a.handleServerKeyExchange,j=a.handleCertificateRequest,F=a.handleServerHelloDone,I=a.handleFinished,q=[];q[a.ConnectionEnd.client]=[[C,C,P,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],[D,C,C,C,C,C,C,C,C,C,C,H,B,j,F,C,C,C,C,C,C],[D,C,C,C,C,C,C,C,C,C,C,C,B,j,F,C,C,C,C,C,C],[D,C,C,C,C,C,C,C,C,C,C,C,C,j,F,C,C,C,C,C,C],[D,C,C,C,C,C,C,C,C,C,C,C,C,C,F,C,C,C,C,C,C],[D,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],[D,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,I],[D,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],[D,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C]];var R=a.handleClientHello,U=a.handleClientKeyExchange,z=a.handleCertificateVerify;q[a.ConnectionEnd.server]=[[C,R,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],[C,C,C,C,C,C,C,C,C,C,C,H,C,C,C,C,C,C,C,C,C],[C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,U,C,C,C,C],[C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,z,C,C,C,C,C],[C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],[C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,I],[C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],[C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C]],a.generateKeys=function(e,n){var r=t,i=n.client_random+n.server_random;e.session.resuming||(n.master_secret=r(n.pre_master_secret,"master secret",i,48).bytes(),n.pre_master_secret=null),i=n.server_random+n.client_random;var s=2*n.mac_key_length+2*n.enc_key_length,o=e.version.major===a.Versions.TLS_1_0.major&&e.version.minor===a.Versions.TLS_1_0.minor;o&&(s+=2*n.fixed_iv_length);var u=r(n.master_secret,"key expansion",i,s),f={client_write_MAC_key:u.getBytes(n.mac_key_length),server_write_MAC_key:u.getBytes(n.mac_key_length),client_write_key:u.getBytes(n.enc_key_length),server_write_key:u.getBytes(n.enc_key_length)};return o&&(f.client_write_IV=u.getBytes(n.fixed_iv_length),f.server_write_IV=u.getBytes(n.fixed_iv_length)),f},a.createConnectionState=function(e){var t=e.entity===a.ConnectionEnd.client,n=function(){var e={sequenceNumber:[0,0],macKey:null,macLength:0,macFunction:null,cipherState:null,cipherFunction:function(e){return!0},compressionState:null,compressFunction:function(e){return!0},updateSequenceNumber:function(){e.sequenceNumber[1]===4294967295?(e.sequenceNumber[1]=0,++e.sequenceNumber[0]):++e.sequenceNumber[1]}};return e},r={read:n(),write:n()};r.read.update=function(e,t){return r.read.cipherFunction(t,r.read)?r.read.compressFunction(e,t,r.read)||e.error(e,{message:"Could not decompress record.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.decompression_failure}}):e.error(e,{message:"Could not decrypt record or bad MAC.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.bad_record_mac}}),!e.fail},r.write.update=function(e,t){return r.write.compressFunction(e,t,r.write)?r.write.cipherFunction(t,r.write)||e.error(e,{message:"Could not encrypt record.",send:!1,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.internal_error}}):e.error(e,{message:"Could not compress record.",send:!1,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.internal_error}}),!e.fail};if(e.session){var o=e.session.sp;e.session.cipherSuite.initSecurityParameters(o),o.keys=a.generateKeys(e,o),r.read.macKey=t?o.keys.server_write_MAC_key:o.keys.client_write_MAC_key,r.write.macKey=t?o.keys.client_write_MAC_key:o.keys.server_write_MAC_key,e.session.cipherSuite.initConnectionState(r,e,o);switch(o.compression_algorithm){case a.CompressionMethod.none:break;case a.CompressionMethod.deflate:r.read.compressFunction=s,r.write.compressFunction=i;break;default:throw new Error("Unsupported compression algorithm.")}}return r},a.createRandom=function(){var t=new Date,n=+t+t.getTimezoneOffset()*6e4,r=e.util.createBuffer();return r.putInt32(n),r.putBytes(e.random.getBytes(28)),r},a.createRecord=function(e,t){if(!t.data)return null;var n={type:t.type,version:{major:e.version.major,minor:e.version.minor},length:t.data.length(),fragment:t.data};return n},a.createAlert=function(t,n){var r=e.util.createBuffer();return r.putByte(n.level),r.putByte(n.description),a.createRecord(t,{type:a.ContentType.alert,data:r})},a.createClientHello=function(t){t.session.clientHelloVersion={major:t.version.major,minor:t.version.minor};var n=e.util.createBuffer();for(var r=0;r<t.cipherSuites.length;++r){var i=t.cipherSuites[r];n.putByte(i.id[0]),n.putByte(i.id[1])}var s=n.length(),o=e.util.createBuffer();o.putByte(a.CompressionMethod.none);var f=o.length(),l=e.util.createBuffer();if(t.virtualHost){var c=e.util.createBuffer();c.putByte(0),c.putByte(0);var h=e.util.createBuffer();h.putByte(0),u(h,2,e.util.createBuffer(t.virtualHost));var p=e.util.createBuffer();u(p,2,h),u(c,2,p),l.putBuffer(c)}var d=l.length();d>0&&(d+=2);var v=t.session.id,m=v.length+1+2+4+28+2+s+1+f+d,g=e.util.createBuffer();return g.putByte(a.HandshakeType.client_hello),g.putInt24(m),g.putByte(t.version.major),g.putByte(t.version.minor),g.putBytes(t.session.sp.client_random),u(g,1,e.util.createBuffer(v)),u(g,2,n),u(g,1,o),d>0&&u(g,2,l),g},a.createServerHello=function(t){var n=t.session.id,r=n.length+1+2+4+28+2+1,i=e.util.createBuffer();return i.putByte(a.HandshakeType.server_hello),i.putInt24(r),i.putByte(t.version.major),i.putByte(t.version.minor),i.putBytes(t.session.sp.server_random),u(i,1,e.util.createBuffer(n)),i.putByte(t.session.cipherSuite.id[0]),i.putByte(t.session.cipherSuite.id[1]),i.putByte(t.session.compressionMethod),i},a.createCertificate=function(t){var n=t.entity===a.ConnectionEnd.client,r=null;if(t.getCertificate){var i;n?i=t.session.certificateRequest:i=t.session.extensions.server_name.serverNameList,r=t.getCertificate(t,i)}var s=e.util.createBuffer();if(r!==null)try{e.util.isArray(r)||(r=[r]);var o=null;for(var f=0;f<r.length;++f){var l=e.pem.decode(r[f])[0];if(l.type!=="CERTIFICATE"&&l.type!=="X509 CERTIFICATE"&&l.type!=="TRUSTED CERTIFICATE"){var c=new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');throw c.headerType=l.type,c}if(l.procType&&l.procType.type==="ENCRYPTED")throw new Error("Could not convert certificate from PEM; PEM is encrypted.");var h=e.util.createBuffer(l.body);o===null&&(o=e.asn1.fromDer(h.bytes(),!1));var p=e.util.createBuffer();u(p,3,h),s.putBuffer(p)}r=e.pki.certificateFromAsn1(o),n?t.session.clientCertificate=r:t.session.serverCertificate=r}catch(d){return t.error(t,{message:"Could not send certificate list.",cause:d,send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.bad_certificate}})}var v=3+s.length(),m=e.util.createBuffer();return m.putByte(a.HandshakeType.certificate),m.putInt24(v),u(m,3,s),m},a.createClientKeyExchange=function(t){var n=e.util.createBuffer();n.putByte(t.session.clientHelloVersion.major),n.putByte(t.session.clientHelloVersion.minor),n.putBytes(e.random.getBytes(46));var r=t.session.sp;r.pre_master_secret=n.getBytes();var i=t.session.serverCertificate.publicKey;n=i.encrypt(r.pre_master_secret);var s=n.length+2,o=e.util.createBuffer();return o.putByte(a.HandshakeType.client_key_exchange),o.putInt24(s),o.putInt16(n.length),o.putBytes(n),o},a.createServerKeyExchange=function(t){var n=0,r=e.util.createBuffer();return n>0&&(r.putByte(a.HandshakeType.server_key_exchange),r.putInt24(n)),r},a.getClientSignature=function(t,n){var r=e.util.createBuffer();r.putBuffer(t.session.md5.digest()),r.putBuffer(t.session.sha1.digest()),r=r.getBytes(),t.getSignature=t.getSignature||function(t,n,r){var i=null;if(t.getPrivateKey)try{i=t.getPrivateKey(t,t.session.clientCertificate),i=e.pki.privateKeyFromPem(i)}catch(s){t.error(t,{message:"Could not get private key.",cause:s,send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.internal_error}})}i===null?t.error(t,{message:"No private key set.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.internal_error}}):n=i.sign(n,null),r(t,n)},t.getSignature(t,r,n)},a.createCertificateVerify=function(t,n){var r=n.length+2,i=e.util.createBuffer();return i.putByte(a.HandshakeType.certificate_verify),i.putInt24(r),i.putInt16(n.length),i.putBytes(n),i},a.createCertificateRequest=function(t){var n=e.util.createBuffer();n.putByte(1);var r=e.util.createBuffer();for(var i in t.caStore.certs){var s=t.caStore.certs[i],o=e.pki.distinguishedNameToAsn1(s.subject),f=e.asn1.toDer(o);r.putInt16(f.length()),r.putBuffer(f)}var l=1+n.length()+2+r.length(),c=e.util.createBuffer();return c.putByte(a.HandshakeType.certificate_request),c.putInt24(l),u(c,1,n),u(c,2,r),c},a.createServerHelloDone=function(t){var n=e.util.createBuffer();return n.putByte(a.HandshakeType.server_hello_done),n.putInt24(0),n},a.createChangeCipherSpec=function(){var t=e.util.createBuffer();return t.putByte(1),t},a.createFinished=function(n){var r=e.util.createBuffer();r.putBuffer(n.session.md5.digest()),r.putBuffer(n.session.sha1.digest());var i=n.entity===a.ConnectionEnd.client,s=n.session.sp,o=12,u=t,f=i?"client finished":"server finished";r=u(s.master_secret,f,r.getBytes(),o);var l=e.util.createBuffer();return l.putByte(a.HandshakeType.finished),l.putInt24(r.length()),l.putBuffer(r),l},a.createHeartbeat=function(t,n,r){typeof r=="undefined"&&(r=n.length);var i=e.util.createBuffer();i.putByte(t),i.putInt16(r),i.putBytes(n);var s=i.length(),o=Math.max(16,s-r-3);return i.putBytes(e.random.getBytes(o)),i},a.queue=function(t,n){if(!n)return;if(n.type===a.ContentType.handshake){var r=n.fragment.bytes();t.session.md5.update(r),t.session.sha1.update(r),r=null}var i;if(n.fragment.length()<=a.MaxFragment)i=[n];else{i=[];var s=n.fragment.bytes();while(s.length>a.MaxFragment)i.push(a.createRecord(t,{type:n.type,data:e.util.createBuffer(s.slice(0,a.MaxFragment))})),s=s.slice(a.MaxFragment);s.length>0&&i.push(a.createRecord(t,{type:n.type,data:e.util.createBuffer(s)}))}for(var o=0;o<i.length&&!t.fail;++o){var u=i[o],f=t.state.current.write;f.update(t,u)&&t.records.push(u)}},a.flush=function(e){for(var t=0;t<e.records.length;++t){var n=e.records[t];e.tlsData.putByte(n.type),e.tlsData.putByte(n.version.major),e.tlsData.putByte(n.version.minor),e.tlsData.putInt16(n.fragment.length()),e.tlsData.putBuffer(e.records[t].fragment)}return e.records=[],e.tlsDataReady(e)};var W=function(t){switch(t){case!0:return!0;case e.pki.certificateError.bad_certificate:return a.Alert.Description.bad_certificate;case e.pki.certificateError.unsupported_certificate:return a.Alert.Description.unsupported_certificate;case e.pki.certificateError.certificate_revoked:return a.Alert.Description.certificate_revoked;case e.pki.certificateError.certificate_expired:return a.Alert.Description.certificate_expired;case e.pki.certificateError.certificate_unknown:return a.Alert.Description.certificate_unknown;case e.pki.certificateError.unknown_ca:return a.Alert.Description.unknown_ca;default:return a.Alert.Description.bad_certificate}},X=function(t){switch(t){case!0:return!0;case a.Alert.Description.bad_certificate:return e.pki.certificateError.bad_certificate;case a.Alert.Description.unsupported_certificate:return e.pki.certificateError.unsupported_certificate;case a.Alert.Description.certificate_revoked:return e.pki.certificateError.certificate_revoked;case a.Alert.Description.certificate_expired:return e.pki.certificateError.certificate_expired;case a.Alert.Description.certificate_unknown:return e.pki.certificateError.certificate_unknown;case a.Alert.Description.unknown_ca:return e.pki.certificateError.unknown_ca;default:return e.pki.certificateError.bad_certificate}};a.verifyCertificateChain=function(t,n){try{e.pki.verifyCertificateChain(t.caStore,n,function(r,i,s){var o=W(r),u=t.verify(t,r,i,s);if(u!==!0){if(typeof u=="object"&&!e.util.isArray(u)){var f=new Error("The application rejected the certificate.");throw f.send=!0,f.alert={level:a.Alert.Level.fatal,description:a.Alert.Description.bad_certificate},u.message&&(f.message=u.message),u.alert&&(f.alert.description=u.alert),f}u!==r&&(u=X(u))}return u})}catch(r){var i=r;if(typeof i!="object"||e.util.isArray(i))i={send:!0,alert:{level:a.Alert.Level.fatal,description:W(r)}};"send"in i||(i.send=!0),"alert"in i||(i.alert={level:a.Alert.Level.fatal,description:W(i.error)}),t.error(t,i)}return!t.fail},a.createSessionCache=function(t,n){var r=null;if(t&&t.getSession&&t.setSession&&t.order)r=t;else{r={},r.cache=t||{},r.capacity=Math.max(n||100,1),r.order=[];for(var i in t)r.order.length<=n?r.order.push(i):delete t[i];r.getSession=function(t){var n=null,i=null;t?i=e.util.bytesToHex(t):r.order.length>0&&(i=r.order[0]);if(i!==null&&i in r.cache){n=r.cache[i],delete r.cache[i];for(var s in r.order)if(r.order[s]===i){r.order.splice(s,1);break}}return n},r.setSession=function(t,n){if(r.order.length===r.capacity){var i=r.order.shift();delete r.cache[i]}var i=e.util.bytesToHex(t);r.order.push(i),r.cache[i]=n}}return r},a.createConnection=function(t){var n=null;t.caStore?e.util.isArray(t.caStore)?n=e.pki.createCaStore(t.caStore):n=t.caStore:n=e.pki.createCaStore();var r=t.cipherSuites||null;if(r===null){r=[];for(var i in a.CipherSuites)r.push(a.CipherSuites[i])}var s=t.server||!1?a.ConnectionEnd.server:a.ConnectionEnd.client,o=t.sessionCache?a.createSessionCache(t.sessionCache):null,u={version:{major:a.Version.major,minor:a.Version.minor},entity:s,sessionId:t.sessionId,caStore:n,sessionCache:o,cipherSuites:r,connected:t.connected,virtualHost:t.virtualHost||null,verifyClient:t.verifyClient||!1,verify:t.verify||function(e,t,n,r){return t},getCertificate:t.getCertificate||null,getPrivateKey:t.getPrivateKey||null,getSignature:t.getSignature||null,input:e.util.createBuffer(),tlsData:e.util.createBuffer(),data:e.util.createBuffer(),tlsDataReady:t.tlsDataReady,dataReady:t.dataReady,heartbeatReceived:t.heartbeatReceived,closed:t.closed,error:function(e,n){n.origin=n.origin||(e.entity===a.ConnectionEnd.client?"client":"server"),n.send&&(a.queue(e,a.createAlert(e,n.alert)),a.flush(e));var r=n.fatal!==!1;r&&(e.fail=!0),t.error(e,n),r&&e.close(!1)},deflate:t.deflate||null,inflate:t.inflate||null};u.reset=function(e){u.version={major:a.Version.major,minor:a.Version.minor},u.record=null,u.session=null,u.peerCertificate=null,u.state={pending:null,current:null},u.expect=u.entity===a.ConnectionEnd.client?f:y,u.fragmented=null,u.records=[],u.open=!1,u.handshakes=0,u.handshaking=!1,u.isConnected=!1,u.fail=!e&&typeof e!="undefined",u.input.clear(),u.tlsData.clear(),u.data.clear(),u.state.current=a.createConnectionState(u)},u.reset();var l=function(e,t){var n=t.type-a.ContentType.change_cipher_spec,r=_[e.entity][e.expect];n in r?r[n](e,t):a.handleUnexpected(e,t)},c=function(t){var n=0,r=t.input,i=r.length();if(i<5)n=5-i;else{t.record={type:r.getByte(),version:{major:r.getByte(),minor:r.getByte()},length:r.getInt16(),fragment:e.util.createBuffer(),ready:!1};var s=t.record.version.major===t.version.major;s&&t.session&&t.session.version&&(s=t.record.version.minor===t.version.minor),s||t.error(t,{message:"Incompatible TLS version.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.protocol_version}})}return n},h=function(e){var t=0,n=e.input,r=n.length();if(r<e.record.length)t=e.record.length-r;else{e.record.fragment.putBytes(n.getBytes(e.record.length)),n.compact();var i=e.state.current.read;i.update(e,e.record)&&(e.fragmented!==null&&(e.fragmented.type===e.record.type?(e.fragmented.fragment.putBuffer(e.record.fragment),e.record=e.fragmented):e.error(e,{message:"Invalid fragmented record.",send:!0,alert:{level:a.Alert.Level.fatal,description:a.Alert.Description.unexpected_message}})),e.record.ready=!0)}return t};return u.handshake=function(t){if(u.entity!==a.ConnectionEnd.client)u.error(u,{message:"Cannot initiate handshake as a server.",fatal:!1});else if(u.handshaking)u.error(u,{message:"Handshake already in progress.",fatal:!1});else{u.fail&&!u.open&&u.handshakes===0&&(u.fail=!1),u.handshaking=!0,t=t||"";var n=null;t.length>0&&(u.sessionCache&&(n=u.sessionCache.getSession(t)),n===null&&(t="")),t.length===0&&u.sessionCache&&(n=u.sessionCache.getSession(),n!==null&&(t=n.id)),u.session={id:t,version:null,cipherSuite:null,compressionMethod:null,serverCertificate:null,certificateRequest:null,clientCertificate:null,sp:{},md5:e.md.md5.create(),sha1:e.md.sha1.create()},n&&(u.version=n.version,u.session.sp=n.sp),u.session.sp.client_random=a.createRandom().getBytes(),u.open=!0,a.queue(u,a.createRecord(u,{type:a.ContentType.handshake,data:a.createClientHello(u)})),a.flush(u)}},u.process=function(e){var t=0;return e&&u.input.putBytes(e),u.fail||(u.record!==null&&u.record.ready&&u.record.fragment.isEmpty()&&(u.record=null),u.record===null&&(t=c(u)),!u.fail&&u.record!==null&&!u.record.ready&&(t=h(u)),!u.fail&&u.record!==null&&u.record.ready&&l(u,u.record)),t},u.prepare=function(t){return a.queue(u,a.createRecord(u,{type:a.ContentType.application_data,data:e.util.createBuffer(t)})),a.flush(u)},u.prepareHeartbeatRequest=function(t,n){return t instanceof e.util.ByteBuffer&&(t=t.bytes()),typeof n=="undefined"&&(n=t.length),u.expectedHeartbeatPayload=t,a.queue(u,a.createRecord(u,{type:a.ContentType.heartbeat,data:a.createHeartbeat(a.HeartbeatMessageType.heartbeat_request,t,n)})),a.flush(u)},u.close=function(e){if(!u.fail&&u.sessionCache&&u.session){var t={id:u.session.id,version:u.session.version,sp:u.session.sp};t.sp.keys=null,u.sessionCache.setSession(t.id,t)}if(u.open){u.open=!1,u.input.clear();if(u.isConnected||u.handshaking)u.isConnected=u.handshaking=!1,a.queue(u,a.createAlert(u,{level:a.Alert.Level.warning,description:a.Alert.Description.close_notify})),a.flush(u);u.closed(u)}u.reset(e)},u},e.tls=e.tls||{};for(var V in a)typeof a[V]!="function"&&(e.tls[V]=a[V]);e.tls.prf_tls1=t,e.tls.hmac_sha1=r,e.tls.createSessionCache=a.createSessionCache,e.tls.createConnection=a.createConnection}var r="tls";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/tls",["require","module","./asn1","./hmac","./md","./pem","./pki","./random","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function n(n,i,s){var o=i.entity===e.tls.ConnectionEnd.client;n.read.cipherState={init:!1,cipher:e.cipher.createDecipher("AES-CBC",o?s.keys.server_write_key:s.keys.client_write_key),iv:o?s.keys.server_write_IV:s.keys.client_write_IV},n.write.cipherState={init:!1,cipher:e.cipher.createCipher("AES-CBC",o?s.keys.client_write_key:s.keys.server_write_key),iv:o?s.keys.client_write_IV:s.keys.server_write_IV},n.read.cipherFunction=u,n.write.cipherFunction=r,n.read.macLength=n.write.macLength=s.mac_length,n.read.macFunction=n.write.macFunction=t.hmac_sha1}function r(n,r){var s=!1,o=r.macFunction(r.macKey,r.sequenceNumber,n);n.fragment.putBytes(o),r.updateSequenceNumber();var u;n.version.minor===t.Versions.TLS_1_0.minor?u=r.cipherState.init?null:r.cipherState.iv:u=e.random.getBytesSync(16),r.cipherState.init=!0;var a=r.cipherState.cipher;return a.start({iv:u}),n.version.minor>=t.Versions.TLS_1_1.minor&&a.output.putBytes(u),a.update(n.fragment),a.finish(i)&&(n.fragment=a.output,n.length=n.fragment.length(),s=!0),s}function i(e,t,n){if(!n){var r=e-t.length()%e;t.fillWithByte(r-1,r)}return!0}function s(e,t,n){var r=!0;if(n){var i=t.length(),s=t.last();for(var o=i-1-s;o<i-1;++o)r=r&&t.at(o)==s;r&&t.truncate(s+1)}return r}function u(n,r){var i=!1;++o;var u;n.version.minor===t.Versions.TLS_1_0.minor?u=r.cipherState.init?null:r.cipherState.iv:u=n.fragment.getBytes(16),r.cipherState.init=!0;var f=r.cipherState.cipher;f.start({iv:u}),f.update(n.fragment),i=f.finish(s);var l=r.macLength,c=e.random.getBytesSync(l),h=f.output.length();h>=l?(n.fragment=f.output.getBytes(h-l),c=f.output.getBytes(l)):n.fragment=f.output.getBytes(),n.fragment=e.util.createBuffer(n.fragment),n.length=n.fragment.length();var p=r.macFunction(r.macKey,r.sequenceNumber,n);return r.updateSequenceNumber(),i=a(r.macKey,c,p)&&i,i}function a(t,n,r){var i=e.hmac.create();return i.start("SHA1",t),i.update(n),n=i.digest().getBytes(),i.start(null,null),i.update(r),r=i.digest().getBytes(),n===r}var t=e.tls;t.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA={id:[0,47],name:"TLS_RSA_WITH_AES_128_CBC_SHA",initSecurityParameters:function(e){e.bulk_cipher_algorithm=t.BulkCipherAlgorithm.aes,e.cipher_type=t.CipherType.block,e.enc_key_length=16,e.block_length=16,e.fixed_iv_length=16,e.record_iv_length=16,e.mac_algorithm=t.MACAlgorithm.hmac_sha1,e.mac_length=20,e.mac_key_length=20},initConnectionState:n},t.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA={id:[0,53],name:"TLS_RSA_WITH_AES_256_CBC_SHA",initSecurityParameters:function(e){e.bulk_cipher_algorithm=t.BulkCipherAlgorithm.aes,e.cipher_type=t.CipherType.block,e.enc_key_length=32,e.block_length=16,e.fixed_iv_length=16,e.record_iv_length=16,e.mac_algorithm=t.MACAlgorithm.hmac_sha1,e.mac_length=20,e.mac_key_length=20},initConnectionState:n};var o=0}var r="aesCipherSuites";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/aesCipherSuites",["require","module","./aes","./tls"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){e.debug=e.debug||{},e.debug.storage={},e.debug.get=function(t,n){var r;return typeof t=="undefined"?r=e.debug.storage:t in e.debug.storage&&(typeof n=="undefined"?r=e.debug.storage[t]:r=e.debug.storage[t][n]),r},e.debug.set=function(t,n,r){t in e.debug.storage||(e.debug.storage[t]={}),e.debug.storage[t][n]=r},e.debug.clear=function(t,n){typeof t=="undefined"?e.debug.storage={}:t in e.debug.storage&&(typeof n=="undefined"?delete e.debug.storage[t]:delete e.debug.storage[t][n])}}var r="debug";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/debug",["require","module"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function n(t,n,r,i){t.generate=function(t,s){var o=new e.util.ByteBuffer,u=Math.ceil(s/i)+r,a=new e.util.ByteBuffer;for(var f=r;f<u;++f){a.putInt32(f),n.start(),n.update(t+a.getBytes());var l=n.digest();o.putBytes(l.getBytes(i))}return o.truncate(o.length()-s),o.getBytes()}}e.kem=e.kem||{};var t=e.jsbn.BigInteger;e.kem.rsa={},e.kem.rsa.create=function(n,r){r=r||{};var i=r.prng||e.random,s={};return s.encrypt=function(r,s){var o=Math.ceil(r.n.bitLength()/8),u;do u=(new t(e.util.bytesToHex(i.getBytesSync(o)),16)).mod(r.n);while(u.equals(t.ZERO));u=e.util.hexToBytes(u.toString(16));var a=o-u.length;a>0&&(u=e.util.fillString(String.fromCharCode(0),a)+u);var f=r.encrypt(u,"NONE"),l=n.generate(u,s);return{encapsulation:f,key:l}},s.decrypt=function(e,t,r){var i=e.decrypt(t,"NONE");return n.generate(i,r)},s},e.kem.kdf1=function(e,t){n(this,e,0,t||e.digestLength)},e.kem.kdf2=function(e,t){n(this,e,1,t||e.digestLength)}}var r="kem";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/kem",["require","module","./util","./random","./jsbn"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){e.log=e.log||{},e.log.levels=["none","error","warning","info","debug","verbose","max"];var t={},n=[],r=null;e.log.LEVEL_LOCKED=2,e.log.NO_LEVEL_CHECK=4,e.log.INTERPOLATE=8;for(var i=0;i<e.log.levels.length;++i){var s=e.log.levels[i];t[s]={index:i,name:s.toUpperCase()}}e.log.logMessage=function(r){var i=t[r.level].index;for(var s=0;s<n.length;++s){var o=n[s];if(o.flags&e.log.NO_LEVEL_CHECK)o.f(r);else{var u=t[o.level].index;i<=u&&o.f(o,r)}}},e.log.prepareStandard=function(e){"standard"in e||(e.standard=t[e.level].name+" ["+e.category+"] "+e.message)},e.log.prepareFull=function(t){if(!("full"in t)){var n=[t.message];n=n.concat([]||t.arguments),t.full=e.util.format.apply(this,n)}},e.log.prepareStandardFull=function(t){"standardFull"in t||(e.log.prepareStandard(t),t.standardFull=t.standard)};var o=["error","warning","info","debug","verbose"];for(var i=0;i<o.length;++i)(function(t){e.log[t]=function(n,r){var i=Array.prototype.slice.call(arguments).slice(2),s={timestamp:new Date,level:t,category:n,message:r,arguments:i};e.log.logMessage(s)}})(o[i]);e.log.makeLogger=function(t){var n={flags:0,f:t};return e.log.setLevel(n,"none"),n},e.log.setLevel=function(t,n){var r=!1;if(t&&!(t.flags&e.log.LEVEL_LOCKED))for(var i=0;i<e.log.levels.length;++i){var s=e.log.levels[i];if(n==s){t.level=n,r=!0;break}}return r},e.log.lock=function(t,n){typeof n=="undefined"||n?t.flags|=e.log.LEVEL_LOCKED:t.flags&=~e.log.LEVEL_LOCKED},e.log.addLogger=function(e){n.push(e)};if(typeof console!="undefined"&&"log"in console){var u;if(console.error&&console.warn&&console.info&&console.debug){var a={error:console.error,warning:console.warn,info:console.info,debug:console.debug,verbose:console.debug},f=function(t,n){e.log.prepareStandard(n);var r=a[n.level],i=[n.standard];i=i.concat(n.arguments.slice()),r.apply(console,i)};u=e.log.makeLogger(f)}else{var f=function(t,n){e.log.prepareStandardFull(n),console.log(n.standardFull)};u=e.log.makeLogger(f)}e.log.setLevel(u,"debug"),e.log.addLogger(u),r=u}else console={log:function(){}};if(r!==null){var l=e.util.getQueryVariables();"console.level"in l&&e.log.setLevel(r,l["console.level"].slice(-1)[0]);if("console.lock"in l){var c=l["console.lock"].slice(-1)[0];c=="true"&&e.log.lock(r)}}e.log.consoleLogger=r}var r="log";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/log",["require","module","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function r(r){var i={},s=[];if(!t.validate(r,n.asn1.recipientInfoValidator,i,s)){var o=new Error("Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.");throw o.errors=s,o}return{version:i.version.charCodeAt(0),issuer:e.pki.RDNAttributesAsArray(i.issuer),serialNumber:e.util.createBuffer(i.serial).toHex(),encryptedContent:{algorithm:t.derToOid(i.encAlgorithm),parameter:i.encParameter.value,content:i.encKey}}}function i(n){return t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(n.version).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[e.pki.distinguishedNameToAsn1({attributes:n.issuer}),t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,e.util.hexToBytes(n.serialNumber))]),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.encryptedContent.algorithm).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")]),t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,n.encryptedContent.content)])}function s(e){var t=[];for(var n=0;n<e.length;++n)t.push(r(e[n]));return t}function o(e){var t=[];for(var n=0;n<e.length;++n)t.push(i(e[n]));return t}function u(r){var i={},s=[];if(!t.validate(r,n.asn1.signerInfoValidator,i,s)){var o=new Error("Cannot read PKCS#7 SignerInfo. ASN.1 object is not an PKCS#7 SignerInfo.");throw o.errors=s,o}var u={version:i.version.charCodeAt(0),issuer:e.pki.RDNAttributesAsArray(i.issuer),serialNumber:e.util.createBuffer(i.serial).toHex(),digestAlgorithm:t.derToOid(i.digestAlgorithm),signatureAlgorithm:t.derToOid(i.signatureAlgorithm),signature:i.signature,authenticatedAttributes:[],unauthenticatedAttributes:[]},a=i.authenticatedAttributes||[],f=i.unauthenticatedAttributes||[];return u}function a(n){var r=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(n.version).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[e.pki.distinguishedNameToAsn1({attributes:n.issuer}),t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,e.util.hexToBytes(n.serialNumber))]),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.digestAlgorithm).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")])]);n.authenticatedAttributesAsn1&&r.value.push(n.authenticatedAttributesAsn1),r.value.push(t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.signatureAlgorithm).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")])),r.value.push(t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,n.signature));if(n.unauthenticatedAttributes.length>0){var i=t.create(t.Class.CONTEXT_SPECIFIC,1,!0,[]);for(var s=0;s<n.unauthenticatedAttributes.length;++s){var o=n.unauthenticatedAttributes[s];i.values.push(c(o))}r.value.push(i)}return r}function f(e){var t=[];for(var n=0;n<e.length;++n)t.push(u(e[n]));return t}function l(e){var t=[];for(var n=0;n<e.length;++n)t.push(a(e[n]));return t}function c(n){var r;if(n.type===e.pki.oids.contentType)r=t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.value).getBytes());else if(n.type===e.pki.oids.messageDigest)r=t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,n.value.bytes());else if(n.type===e.pki.oids.signingTime){var i=new Date("Jan 1, 1950 00:00:00Z"),s=new Date("Jan 1, 2050 00:00:00Z"),o=n.value;if(typeof o=="string"){var u=Date.parse(o);isNaN(u)?o.length===13?o=t.utcTimeToDate(o):o=t.generalizedTimeToDate(o):o=new Date(u)}o>=i&&o<s?r=t.create(t.Class.UNIVERSAL,t.Type.UTCTIME,!1,t.dateToUtcTime(o)):r=t.create(t.Class.UNIVERSAL,t.Type.GENERALIZEDTIME,!1,t.dateToGeneralizedTime(o))}return t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.type).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SET,!0,[r])])}function h(n){return[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(e.pki.oids.data).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(n.algorithm).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,n.parameter.getBytes())]),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,n.content.getBytes())])]}function p(n,r,i){var s={},o=[];if(!t.validate(r,i,s,o)){var u=new Error("Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.");throw u.errors=u,u}var a=t.derToOid(s.contentType);if(a!==e.pki.oids.data)throw new Error("Unsupported PKCS#7 message. Only wrapped ContentType Data supported.");if(s.encryptedContent){var f="";if(e.util.isArray(s.encryptedContent))for(var l=0;l<s.encryptedContent.length;++l){if(s.encryptedContent[l].type!==t.Type.OCTETSTRING)throw new Error("Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.");f+=s.encryptedContent[l].value}else f=s.encryptedContent;n.encryptedContent={algorithm:t.derToOid(s.encAlgorithm),parameter:e.util.createBuffer(s.encParameter.value),content:e.util.createBuffer(f)}}if(s.content){var f="";if(e.util.isArray(s.content))for(var l=0;l<s.content.length;++l){if(s.content[l].type!==t.Type.OCTETSTRING)throw new Error("Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.");f+=s.content[l].value}else f=s.content;n.content=e.util.createBuffer(f)}return n.version=s.version.charCodeAt(0),n.rawCapture=s,s}function d(t){if(t.encryptedContent.key===undefined)throw new Error("Symmetric key not available.");if(t.content===undefined){var n;switch(t.encryptedContent.algorithm){case e.pki.oids["aes128-CBC"]:case e.pki.oids["aes192-CBC"]:case e.pki.oids["aes256-CBC"]:n=e.aes.createDecryptionCipher(t.encryptedContent.key);break;case e.pki.oids.desCBC:case e.pki.oids["des-EDE3-CBC"]:n=e.des.createDecryptionCipher(t.encryptedContent.key);break;default:throw new Error("Unsupported symmetric cipher, OID "+t.encryptedContent.algorithm)}n.start(t.encryptedContent.parameter),n.update(t.encryptedContent.content);if(!n.finish())throw new Error("Symmetric decryption failed.");t.content=n.output}}var t=e.asn1,n=e.pkcs7=e.pkcs7||{};n.messageFromPem=function(r){var i=e.pem.decode(r)[0];if(i.type!=="PKCS7"){var s=new Error('Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".');throw s.headerType=i.type,s}if(i.procType&&i.procType.type==="ENCRYPTED")throw new Error("Could not convert PKCS#7 message from PEM; PEM is encrypted.");var o=t.fromDer(i.body);return n.messageFromAsn1(o)},n.messageToPem=function(n,r){var i={type:"PKCS7",body:t.toDer(n.toAsn1()).getBytes()};return e.pem.encode(i,{maxline:r})},n.messageFromAsn1=function(r){var i={},s=[];if(!t.validate(r,n.asn1.contentInfoValidator,i,s)){var o=new Error("Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.");throw o.errors=s,o}var u=t.derToOid(i.contentType),a;switch(u){case e.pki.oids.envelopedData:a=n.createEnvelopedData();break;case e.pki.oids.encryptedData:a=n.createEncryptedData();break;case e.pki.oids.signedData:a=n.createSignedData();break;default:throw new Error("Cannot read PKCS#7 message. ContentType with OID "+u+" is not (yet) supported.")}return a.fromAsn1(i.content.value[0]),a},n.createSignedData=function(){function i(){var n={};for(var i=0;i<r.signers.length;++i){var s=r.signers[i],o=s.digestAlgorithm;o in n||(n[o]=e.md[e.pki.oids[o]].create()),s.authenticatedAttributes.length===0?s.md=n[o]:s.md=e.md[e.pki.oids[o]].create()}r.digestAlgorithmIdentifiers=[];for(var o in n)r.digestAlgorithmIdentifiers.push(t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(o).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.NULL,!1,"")]));return n}function s(n){if(r.contentInfo.value.length<2)throw new Error("Could not sign PKCS#7 message; there is no content to sign.");var i=t.derToOid(r.contentInfo.value[0].value),s=r.contentInfo.value[1];s=s.value[0];var o=t.toDer(s);o.getByte(),t.getBerValueLength(o),o=o.getBytes();for(var u in n)n[u].start().update(o);var a=new Date;for(var f=0;f<r.signers.length;++f){var h=r.signers[f];if(h.authenticatedAttributes.length===0){if(i!==e.pki.oids.data)throw new Error("Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data.")}else{h.authenticatedAttributesAsn1=t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[]);var p=t.create(t.Class.UNIVERSAL,t.Type.SET,!0,[]);for(var d=0;d<h.authenticatedAttributes.length;++d){var v=h.authenticatedAttributes[d];v.type===e.pki.oids.messageDigest?v.value=n[h.digestAlgorithm].digest():v.type===e.pki.oids.signingTime&&(v.value||(v.value=a)),p.value.push(c(v)),h.authenticatedAttributesAsn1.value.push(c(v))}o=t.toDer(p).getBytes(),h.md.start().update(o)}h.signature=h.key.sign(h.md,"RSASSA-PKCS1-V1_5")}r.signerInfos=l(r.signers)}var r=null;return r={type:e.pki.oids.signedData,version:1,certificates:[],crls:[],signers:[],digestAlgorithmIdentifiers:[],contentInfo:null,signerInfos:[],fromAsn1:function(t){p(r,t,n.asn1.signedDataValidator),r.certificates=[],r.crls=[],r.digestAlgorithmIdentifiers=[],r.contentInfo=null,r.signerInfos=[];var i=r.rawCapture.certificates.value;for(var s=0;s<i.length;++s)r.certificates.push(e.pki.certificateFromAsn1(i[s]))},toAsn1:function(){r.contentInfo||r.sign();var n=[];for(var i=0;i<r.certificates.length;++i)n.push(e.pki.certificateToAsn1(r.certificates[i]));var s=[],o=t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(r.version).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SET,!0,r.digestAlgorithmIdentifiers),r.contentInfo])]);return n.length>0&&o.value[0].value.push(t.create(t.Class.CONTEXT_SPECIFIC,0,!0,n)),s.length>0&&o.value[0].value.push(t.create(t.Class.CONTEXT_SPECIFIC,1,!0,s)),o.value[0].value.push(t.create(t.Class.UNIVERSAL,t.Type.SET,!0,r.signerInfos)),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(r.type).getBytes()),o])},addSigner:function(t){var n=t.issuer,i=t.serialNumber;if(t.certificate){var s=t.certificate;typeof s=="string"&&(s=e.pki.certificateFromPem(s)),n=s.issuer.attributes,i=s.serialNumber}var o=t.key;if(!o)throw new Error("Could not add PKCS#7 signer; no private key specified.");typeof o=="string"&&(o=e.pki.privateKeyFromPem(o));var u=t.digestAlgorithm||e.pki.oids.sha1;switch(u){case e.pki.oids.sha1:case e.pki.oids.sha256:case e.pki.oids.sha384:case e.pki.oids.sha512:case e.pki.oids.md5:break;default:throw new Error("Could not add PKCS#7 signer; unknown message digest algorithm: "+u)}var a=t.authenticatedAttributes||[];if(a.length>0){var f=!1,l=!1;for(var c=0;c<a.length;++c){var h=a[c];if(!f&&h.type===e.pki.oids.contentType){f=!0;if(l)break;continue}if(!l&&h.type===e.pki.oids.messageDigest){l=!0;if(f)break;continue}}if(!f||!l)throw new Error("Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.")}r.signers.push({key:o,version:1,issuer:n,serialNumber:i,digestAlgorithm:u,signatureAlgorithm:e.pki.oids.rsaEncryption,signature:null,authenticatedAttributes:a,unauthenticatedAttributes:[]})},sign:function(){if(typeof r.content!="object"||r.contentInfo===null){r.contentInfo=t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(e.pki.oids.data).getBytes())]);if("content"in r){var n;r.content instanceof e.util.ByteBuffer?n=r.content.bytes():typeof r.content=="string"&&(n=e.util.encodeUtf8(r.content)),r.contentInfo.value.push(t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.OCTETSTRING,!1,n)]))}}if(r.signers.length===0)return;var o=i();s(o)},verify:function(){throw new Error("PKCS#7 signature verification not yet implemented.")},addCertificate:function(t){typeof t=="string"&&(t=e.pki.certificateFromPem(t)),r.certificates.push(t)},addCertificateRevokationList:function(e){throw new Error("PKCS#7 CRL support not yet implemented.")}},r},n.createEncryptedData=function(){var t=null;return t={type:e.pki.oids.encryptedData,version:0,encryptedContent:{algorithm:e.pki.oids["aes256-CBC"]},fromAsn1:function(e){p(t,e,n.asn1.encryptedDataValidator)},decrypt:function(e){e!==undefined&&(t.encryptedContent.key=e),d(t)}},t},n.createEnvelopedData=function(){var r=null;return r={type:e.pki.oids.envelopedData,version:0,recipients:[],encryptedContent:{algorithm:e.pki.oids["aes256-CBC"]},fromAsn1:function(e){var t=p(r,e,n.asn1.envelopedDataValidator);r.recipients=s(t.recipientInfos.value)},toAsn1:function(){return t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.OID,!1,t.oidToDer(r.type).getBytes()),t.create(t.Class.CONTEXT_SPECIFIC,0,!0,[t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,[t.create(t.Class.UNIVERSAL,t.Type.INTEGER,!1,t.integerToDer(r.version).getBytes()),t.create(t.Class.UNIVERSAL,t.Type.SET,!0,o(r.recipients)),t.create(t.Class.UNIVERSAL,t.Type.SEQUENCE,!0,h(r.encryptedContent))])])])},findRecipient:function(e){var t=e.issuer.attributes;for(var n=0;n<r.recipients.length;++n){var i=r.recipients[n],s=i.issuer;if(i.serialNumber!==e.serialNumber)continue;if(s.length!==t.length)continue;var o=!0;for(var u=0;u<t.length;++u)if(s[u].type!==t[u].type||s[u].value!==t[u].value){o=!1;break}if(o)return i}return null},decrypt:function(t,n){if(r.encryptedContent.key===undefined&&t!==undefined&&n!==undefined)switch(t.encryptedContent.algorithm){case e.pki.oids.rsaEncryption:case e.pki.oids.desCBC:var i=n.decrypt(t.encryptedContent.content);r.encryptedContent.key=e.util.createBuffer(i);break;default:throw new Error("Unsupported asymmetric cipher, OID "+t.encryptedContent.algorithm)}d(r)},addRecipient:function(t){r.recipients.push({version:0,issuer:t.issuer.attributes,serialNumber:t.serialNumber,encryptedContent:{algorithm:e.pki.oids.rsaEncryption,key:t.publicKey}})},encrypt:function(t,n){if(r.encryptedContent.content===undefined){n=n||r.encryptedContent.algorithm,t=t||r.encryptedContent.key;var i,s,o;switch(n){case e.pki.oids["aes128-CBC"]:i=16,s=16,o=e.aes.createEncryptionCipher;break;case e.pki.oids["aes192-CBC"]:i=24,s=16,o=e.aes.createEncryptionCipher;break;case e.pki.oids["aes256-CBC"]:i=32,s=16,o=e.aes.createEncryptionCipher;break;case e.pki.oids["des-EDE3-CBC"]:i=24,s=8,o=e.des.createEncryptionCipher;break;default:throw new Error("Unsupported symmetric cipher, OID "+n)}if(t===undefined)t=e.util.createBuffer(e.random.getBytes(i));else if(t.length()!=i)throw new Error("Symmetric key has wrong length; got "+t.length()+" bytes, expected "+i+".");r.encryptedContent.algorithm=n,r.encryptedContent.key=t,r.encryptedContent.parameter=e.util.createBuffer(e.random.getBytes(s));var u=o(t);u.start(r.encryptedContent.parameter.copy()),u.update(r.content);if(!u.finish())throw new Error("Symmetric encryption failed.");r.encryptedContent.content=u.output}for(var a=0;a<r.recipients.length;++a){var f=r.recipients[a];if(f.encryptedContent.content!==undefined)continue;switch(f.encryptedContent.algorithm){case e.pki.oids.rsaEncryption:f.encryptedContent.content=f.encryptedContent.key.encrypt(r.encryptedContent.key.data);break;default:throw new Error("Unsupported asymmetric cipher, OID "+f.encryptedContent.algorithm)}}}},r}}var r="pkcs7";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/pkcs7",["require","module","./aes","./asn1","./des","./oids","./pem","./pkcs7asn1","./random","./util","./x509"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){function n(t,n){var r=n.toString(16);r[0]>="8"&&(r="00"+r);var i=e.util.hexToBytes(r);t.putInt32(i.length),t.putBytes(i)}function r(e,t){e.putInt32(t.length),e.putString(t)}function i(){var t=e.md.sha1.create(),n=arguments.length;for(var r=0;r<n;++r)t.update(arguments[r]);return t.digest()}var t=e.ssh=e.ssh||{};t.privateKeyToPutty=function(t,s,o){o=o||"",s=s||"";var u="ssh-rsa",a=s===""?"none":"aes256-cbc",f="PuTTY-User-Key-File-2: "+u+"\r\n";f+="Encryption: "+a+"\r\n",f+="Comment: "+o+"\r\n";var l=e.util.createBuffer();r(l,u),n(l,t.e),n(l,t.n);var c=e.util.encode64(l.bytes(),64),h=Math.floor(c.length/66)+1;f+="Public-Lines: "+h+"\r\n",f+=c;var p=e.util.createBuffer();n(p,t.d),n(p,t.p),n(p,t.q),n(p,t.qInv);var d;if(!s)d=e.util.encode64(p.bytes(),64);else{var v=p.length()+16-1;v-=v%16;var m=i(p.bytes());m.truncate(m.length()-v+p.length()),p.putBuffer(m);var g=e.util.createBuffer();g.putBuffer(i("\0\0\0\0",s)),g.putBuffer(i("\0\0\0",s));var y=e.aes.createEncryptionCipher(g.truncate(8),"CBC");y.start(e.util.createBuffer().fillWithByte(0,16)),y.update(p.copy()),y.finish();var b=y.output;b.truncate(16),d=e.util.encode64(b.bytes(),64)}h=Math.floor(d.length/66)+1,f+="\r\nPrivate-Lines: "+h+"\r\n",f+=d;var w=i("putty-private-key-file-mac-key",s),E=e.util.createBuffer();r(E,u),r(E,a),r(E,o),E.putInt32(l.length()),E.putBuffer(l),E.putInt32(p.length()),E.putBuffer(p);var S=e.hmac.create();return S.start("sha1",w),S.update(E.bytes()),f+="\r\nPrivate-MAC: "+S.digest().toHex()+"\r\n",f},t.publicKeyToOpenSSH=function(t,i){var s="ssh-rsa";i=i||"";var o=e.util.createBuffer();return r(o,s),n(o,t.e),n(o,t.n),s+" "+e.util.encode64(o.bytes())+" "+i},t.privateKeyToOpenSSH=function(t,n){return n?e.pki.encryptRsaPrivateKey(t,n,{legacy:!0,algorithm:"aes128"}):e.pki.privateKeyToPem(t)},t.getPublicKeyFingerprint=function(t,i){i=i||{};var s=i.md||e.md.md5.create(),o="ssh-rsa",u=e.util.createBuffer();r(u,o),n(u,t.e),n(u,t.n),s.start(),s.update(u.getBytes());var a=s.digest();if(i.encoding==="hex"){var f=a.toHex();return i.delimiter?f.match(/.{2}/g).join(i.delimiter):f}if(i.encoding==="binary")return a.getBytes();if(i.encoding)throw new Error('Unknown encoding "'+i.encoding+'".');return a}}var r="ssh";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/ssh",["require","module","./aes","./hmac","./md5","./sha1","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){function e(e){var t="forge.task",n=0,r={},i=0;e.debug.set(t,"tasks",r);var s={};e.debug.set(t,"queues",s);var o="?",u=30,a=20,f="ready",l="running",c="blocked",h="sleeping",p="done",d="error",v="stop",m="start",g="block",y="unblock",b="sleep",w="wakeup",E="cancel",S="fail",x={};x[f]={},x[f][v]=f,x[f][m]=l,x[f][E]=p,x[f][S]=d,x[l]={},x[l][v]=f,x[l][m]=l,x[l][g]=c,x[l][y]=l,x[l][b]=h,x[l][w]=l,x[l][E]=p,x[l][S]=d,x[c]={},x[c][v]=c,x[c][m]=c,x[c][g]=c,x[c][y]=c,x[c][b]=c,x[c][w]=c,x[c][E]=p,x[c][S]=d,x[h]={},x[h][v]=h,x[h][m]=h,x[h][g]=h,x[h][y]=h,x[h][b]=h,x[h][w]=h,x[h][E]=p,x[h][S]=d,x[p]={},x[p][v]=p,x[p][m]=p,x[p][g]=p,x[p][y]=p,x[p][b]=p,x[p][w]=p,x[p][E]=p,x[p][S]=d,x[d]={},x[d][v]=d,x[d][m]=d,x[d][g]=d,x[d][y]=d,x[d][b]=d,x[d][w]=d,x[d][E]=d,x[d][S]=d;var T=function(s){this.id=-1,this.name=s.name||o,this.parent=s.parent||null,this.run=s.run,this.subtasks=[],this.error=!1,this.state=f,this.blocks=0,this.timeoutId=null,this.swapTime=null,this.userData=null,this.id=i++,r[this.id]=this,n>=1&&e.log.verbose(t,"[%s][%s] init",this.id,this.name,this)};T.prototype.debug=function(n){n=n||"",e.log.debug(t,n,"[%s][%s] task:",this.id,this.name,this,"subtasks:",this.subtasks.length,"queue:",s)},T.prototype.next=function(e,t){typeof e=="function"&&(t=e,e=this.name);var n=new T({run:t,name:e,parent:this});return n.state=l,n.type=this.type,n.successCallback=this.successCallback||null,n.failureCallback=this.failureCallback||null,this.subtasks.push(n),this},T.prototype.parallel=function(t,n){return e.util.isArray(t)&&(n=t,t=this.name),this.next(t,function(r){var i=r;i.block(n.length);var s=function(t,r){e.task.start({type:t,run:function(e){n[r](e)},success:function(e){i.unblock()},failure:function(e){i.unblock()}})};for(var o=0;o<n.length;o++){var u=t+"__parallel-"+r.id+"-"+o,a=o;s(u,a)}})},T.prototype.stop=function(){this.state=x[this.state][v]},T.prototype.start=function(){this.error=!1,this.state=x[this.state][m],this.state===l&&(this.start=new Date,this.run(this),C(this,0))},T.prototype.block=function(e){e=typeof e=="undefined"?1:e,this.blocks+=e,this.blocks>0&&(this.state=x[this.state][g])},T.prototype.unblock=function(e){return e=typeof e=="undefined"?1:e,this.blocks-=e,this.blocks===0&&this.state!==p&&(this.state=l,C(this,0)),this.blocks},T.prototype.sleep=function(e){e=typeof e=="undefined"?0:e,this.state=x[this.state][b];var t=this;this.timeoutId=setTimeout(function(){t.timeoutId=null,t.state=l,C(t,0)},e)},T.prototype.wait=function(e){e.wait(this)},T.prototype.wakeup=function(){this.state===h&&(cancelTimeout(this.timeoutId),this.timeoutId=null,this.state=l,C(this,0))},T.prototype.cancel=function(){this.state=x[this.state][E],this.permitsNeeded=0,this.timeoutId!==null&&(cancelTimeout(this.timeoutId),this.timeoutId=null),this.subtasks=[]},T.prototype.fail=function(e){this.error=!0,k(this,!0);if(e)e.error=this.error,e.swapTime=this.swapTime,e.userData=this.userData,C(e,0);else{if(this.parent!==null){var t=this.parent;while(t.parent!==null)t.error=this.error,t.swapTime=this.swapTime,t.userData=this.userData,t=t.parent;k(t,!0)}this.failureCallback&&this.failureCallback(this)}};var N=function(e){e.error=!1,e.state=x[e.state][m],setTimeout(function(){e.state===l&&(e.swapTime=+(new Date),e.run(e),C(e,0))},0)},C=function(e,t){var n=t>u||+(new Date)-e.swapTime>a,r=function(t){t++;if(e.state===l){n&&(e.swapTime=+(new Date));if(e.subtasks.length>0){var r=e.subtasks.shift();r.error=e.error,r.swapTime=e.swapTime,r.userData=e.userData,r.run(r),r.error||C(r,t)}else k(e),e.error||e.parent!==null&&(e.parent.error=e.error,e.parent.swapTime=e.swapTime,e.parent.userData=e.userData,C(e.parent,t))}};n?setTimeout(r,0):r(t)},k=function(i,o){i.state=p,delete r[i.id],n>=1&&e.log.verbose(t,"[%s][%s] finish",i.id,i.name,i),i.parent===null&&(i.type in s?s[i.type].length===0?e.log.error(t,"[%s][%s] task queue empty [%s]",i.id,i.name,i.type):s[i.type][0]!==i?e.log.error(t,"[%s][%s] task not first in queue [%s]",i.id,i.name,i.type):(s[i.type].shift(),s[i.type].length===0?(n>=1&&e.log.verbose(t,"[%s][%s] delete queue [%s]",i.id,i.name,i.type),delete s[i.type]):(n>=1&&e.log.verbose(t,"[%s][%s] queue start next [%s] remain:%s",i.id,i.name,i.type,s[i.type].length),s[i.type][0].start())):e.log.error(t,"[%s][%s] task queue missing [%s]",i.id,i.name,i.type),o||(i.error&&i.failureCallback?i.failureCallback(i):!i.error&&i.successCallback&&i.successCallback(i)))};e.task=e.task||{},e.task.start=function(r){var i=new T({run:r.run,name:r.name||o});i.type=r.type,i.successCallback=r.success||null,i.failureCallback=r.failure||null,i.type in s?s[r.type].push(i):(n>=1&&e.log.verbose(t,"[%s][%s] create queue [%s]",i.id,i.name,i.type),s[i.type]=[i],N(i))},e.task.cancel=function(e){e in s&&(s[e]=[s[e][0]])},e.task.createCondition=function(){var e={tasks:{}};return e.wait=function(t){t.id in e.tasks||(t.block(),e.tasks[t.id]=t)},e.notify=function(){var t=e.tasks;e.tasks={};for(var n in t)t[n].unblock()},e}}var r="task";if(typeof n!="function"){if(typeof module!="object"||!module.exports)return typeof forge=="undefined"&&(forge={}),e(forge);var i=!0;n=function(e,n){n(t,module)}}var s,o=function(t,n){n.exports=function(n){var i=s.map(function(e){return t(e)}).concat(e);n=n||{},n.defined=n.defined||{};if(n.defined[r])return n[r];n.defined[r]=!0;for(var o=0;o<i.length;++o)i[o](n);return n[r]}},u=n;n=function(e,t){return s=typeof e=="string"?t.slice(2):e.slice(2),i?(delete n,u.apply(null,Array.prototype.slice.call(arguments,0))):(n=u,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/task",["require","module","./debug","./log","./util"],function(){o.apply(null,Array.prototype.slice.call(arguments,0))})}(),function(){var e="forge";if(typeof n!="function"){if(typeof module!="object"||!module.exports){typeof forge=="undefined"&&(forge={disableNativeCode:!1});return}var r=!0;n=function(e,n){n(t,module)}}var i,s=function(t,n){n.exports=function(n){var r=i.map(function(e){return t(e)});n=n||{},n.defined=n.defined||{};if(n.defined[e])return n[e];n.defined[e]=!0;for(var s=0;s<r.length;++s)r[s](n);return n},n.exports.disableNativeCode=!1,n.exports(n.exports)},o=n;n=function(e,t){return i=typeof e=="string"?t.slice(2):e.slice(2),r?(delete n,o.apply(null,Array.prototype.slice.call(arguments,0))):(n=o,n.apply(null,Array.prototype.slice.call(arguments,0)))},n("js/forge",["require","module","./aes","./aesCipherSuites","./asn1","./cipher","./cipherModes","./debug","./des","./hmac","./kem","./log","./md","./mgf1","./pbkdf2","./pem","./pkcs7","./pkcs1","./pkcs12","./pki","./prime","./prng","./pss","./random","./rc2","./ssh","./task","./tls","./util"],function(){s.apply(null,Array.prototype.slice.call(arguments,0))})}(),t("js/forge")});
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.io = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var url = _dereq_('./url');
var parser = _dereq_('socket.io-parser');
var Manager = _dereq_('./manager');
var debug = _dereq_('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri == 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }

  return io.socket(parsed.path);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = _dereq_('./manager');
exports.Socket = _dereq_('./socket');

},{"./manager":2,"./socket":4,"./url":5,"debug":14,"socket.io-parser":40}],2:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var eio = _dereq_('engine.io-client');
var Socket = _dereq_('./socket');
var Emitter = _dereq_('component-emitter');
var parser = _dereq_('socket.io-parser');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:manager');
var indexOf = _dereq_('indexof');
var Backoff = _dereq_('backo2');

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts){
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' == typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new parser.Encoder();
  this.decoder = new parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function() {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function(){
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.engine.id;
    }
  }
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function(v){
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function(v){
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function(v){
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function(v){
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function(v){
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function(v){
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function() {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};


/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function(fn){
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function() {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function(data){
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function(){
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function(){
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function(){
  this.lastPing = new Date;
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function(){
  this.emitAll('pong', new Date - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function(data){
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function(packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function(err){
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function(nsp){
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function(){
      socket.id = self.engine.id;
    });

    if (this.autoConnect) {
      // manually call here since connecting evnet is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function(socket){
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function(packet){
  debug('writing packet %j', packet);
  var self = this;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function(encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function() {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function(){
  debug('cleanup');

  var sub;
  while (sub = this.subs.shift()) sub.destroy();

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function(){
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' == this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function(reason){
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function(){
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function(){
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function(err){
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function(){
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"./on":3,"./socket":4,"backo2":8,"component-bind":11,"component-emitter":12,"debug":14,"engine.io-client":16,"indexof":32,"socket.io-parser":40}],3:[function(_dereq_,module,exports){

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function(){
      obj.removeListener(ev, fn);
    }
  };
}

},{}],4:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var parser = _dereq_('socket.io-parser');
var Emitter = _dereq_('component-emitter');
var toArray = _dereq_('to-array');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:socket');
var hasBin = _dereq_('has-binary');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp){
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function() {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function(){
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' == this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function(ev){
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var parserType = parser.EVENT; // default
  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
  var packet = { type: parserType, data: args };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' == typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  delete this.flags;

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function(packet){
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function(){
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' != this.nsp) {
    this.packet({ type: parser.CONNECT });
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function(reason){
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function(packet){
  if (packet.nsp != this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function(packet){
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function(id){
  var self = this;
  var sent = false;
  return function(){
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
    self.packet({
      type: type,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function(packet){
  var ack = this.acks[packet.id];
  if ('function' == typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function(){
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function(){
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function(){
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function(){
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function(){
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function(compress){
  this.flags = this.flags || {};
  this.flags.compress = compress;
  return this;
};

},{"./on":3,"component-bind":11,"component-emitter":12,"debug":14,"has-binary":30,"socket.io-parser":40,"to-array":43}],5:[function(_dereq_,module,exports){
(function (global){

/**
 * Module dependencies.
 */

var parseuri = _dereq_('parseuri');
var debug = _dereq_('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc){
  var obj = uri;

  // default to window.location
  var loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' == typeof uri) {
    if ('/' == uri.charAt(0)) {
      if ('/' == uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' != typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    }
    else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port == obj.port ? '' : (':' + obj.port));

  return obj;
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"debug":14,"parseuri":38}],6:[function(_dereq_,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],7:[function(_dereq_,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],8:[function(_dereq_,module,exports){

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],9:[function(_dereq_,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();

},{}],10:[function(_dereq_,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],11:[function(_dereq_,module,exports){
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],12:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],13:[function(_dereq_,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],14:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":15}],15:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = _dereq_('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":35}],16:[function(_dereq_,module,exports){

module.exports =  _dereq_('./lib/');

},{"./lib/":17}],17:[function(_dereq_,module,exports){

module.exports = _dereq_('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = _dereq_('engine.io-parser');

},{"./socket":18,"engine.io-parser":27}],18:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = _dereq_('./transports');
var Emitter = _dereq_('component-emitter');
var debug = _dereq_('debug')('engine.io-client:socket');
var index = _dereq_('indexof');
var parser = _dereq_('engine.io-parser');
var parseuri = _dereq_('parseuri');
var parsejson = _dereq_('parsejson');
var parseqs = _dereq_('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Noop function.
 *
 * @api private
 */

function noop(){}

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts){
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' == typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure :
    (global.location && 'https:' == location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ?
       location.port :
       (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;

  // other options for Node.js client
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }
  }

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = _dereq_('./transport');
Socket.transports = _dereq_('./transports');
Socket.parser = _dereq_('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized,
    perMessageDeflate: this.perMessageDeflate,
    extraHeaders: this.extraHeaders
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function() {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function(transport){
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function(){
    self.onDrain();
  })
  .on('packet', function(packet){
    self.onPacket(packet);
  })
  .on('error', function(e){
    self.onError(e);
  })
  .on('close', function(){
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 })
    , failed = false
    , self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen(){
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' == msg.type && 'probe' == msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' == self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  //Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose(){
    onerror("transport closed");
  }

  //When the socket is closed while we're probing
  function onclose(){
    onerror("socket closed");
  }

  //When the socket is upgraded while we're probing
  function onupgrade(to){
    if (transport && to.name != transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  //Remove all listeners on the transport and on self
  function cleanup(){
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();

};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if  ('closed' == this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' == self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function(){
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function() {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' != this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if('function' == typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' == typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' == this.readyState || 'closed' == this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function() {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i<j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./transport":19,"./transports":20,"component-emitter":26,"debug":14,"engine.io-parser":27,"indexof":32,"parsejson":36,"parseqs":37,"parseuri":38}],19:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var parser = _dereq_('engine.io-parser');
var Emitter = _dereq_('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' == this.readyState || '' == this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function(packets){
  if ('open' == this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function(data){
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":26,"engine.io-parser":27}],20:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var XHR = _dereq_('./polling-xhr');
var JSONP = _dereq_('./polling-jsonp');
var websocket = _dereq_('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts){
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname != location.hostname || port != opts.port;
    xs = opts.secure != isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling-jsonp":21,"./polling-xhr":22,"./websocket":24,"xmlhttprequest-ssl":25}],21:[function(_dereq_,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = _dereq_('./polling');
var inherit = _dereq_('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Callbacks count.
 */

var index = 0;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function(e){
    self.onError('jsonp poll error',e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  }
  else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
  
  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch(e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function(){
      if (self.iframe.readyState == 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling":23,"component-inherit":13}],22:[function(_dereq_,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var Polling = _dereq_('./polling');
var Emitter = _dereq_('component-emitter');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty(){}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts){
  Polling.call(this, opts);

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname != global.location.hostname ||
      port != opts.port;
    this.xs = opts.secure != isSSL;
  } else {
    this.extraHeaders = opts.extraHeaders;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function(opts){
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function(data, fn){
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function(err){
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function(){
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function(data){
    self.onData(data);
  });
  req.on('error', function(err){
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts){
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined != opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function(){
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' == this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.hasXDR()) {
      xhr.onload = function(){
        self.onLoad();
      };
      xhr.onerror = function(){
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function(){
        if (4 != xhr.readyState) return;
        if (200 == xhr.status || 1223 == xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function(){
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function() {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function(){
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function(data){
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function(err){
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function(fromError){
  if ('undefined' == typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch(e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function(){
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        try {
          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
        } catch (e) {
          var ui8Arr = new Uint8Array(this.xhr.response);
          var dataArray = [];
          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
            dataArray.push(ui8Arr[idx]);
          }

          data = String.fromCharCode.apply(null, dataArray);
        }
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function(){
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function(){
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (global.document) {
  Request.requestsCount = 0;
  Request.requests = {};
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling":23,"component-emitter":26,"component-inherit":13,"debug":14,"xmlhttprequest-ssl":25}],23:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parseqs = _dereq_('parseqs');
var parser = _dereq_('engine.io-parser');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function() {
  var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function(){
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function(onPause){
  var pending = 0;
  var self = this;

  this.readyState = 'pausing';

  function pause(){
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function(){
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function(){
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function(){
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function(data){
  var self = this;
  debug('polling got data %s', data);
  var callback = function(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' == self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' == packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' != this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' == this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function(){
  var self = this;

  function close(){
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' == this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  var callbackfn = function() {
    self.writable = true;
    self.emit('drain');
  };

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function(data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' == schema && this.port != 443) ||
     ('http' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

},{"../transport":19,"component-inherit":13,"debug":14,"engine.io-parser":27,"parseqs":37,"xmlhttprequest-ssl":25,"yeast":45}],24:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parser = _dereq_('engine.io-parser');
var parseqs = _dereq_('parseqs');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  try {
    WebSocket = _dereq_('ws');
  } catch (e) { }
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function(){
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var self = this;
  var uri = this.uri();
  var protocols = void(0);
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }

  this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'buffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function(){
  var self = this;

  this.ws.onopen = function(){
    self.onOpen();
  };
  this.ws.onclose = function(){
    self.onClose();
  };
  this.ws.onmessage = function(ev){
    self.onData(ev.data);
  };
  this.ws.onerror = function(e){
    self.onError('websocket error', e);
  };
};

/**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */

if ('undefined' != typeof navigator
  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
  WS.prototype.onData = function(data){
    var self = this;
    setTimeout(function(){
      Transport.prototype.onData.call(self, data);
    }, 0);
  };
}

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function(packets){
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function(packet) {
      parser.encodePacket(packet, self.supportsBinary, function(data) {
        if (!BrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' == typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        //Sometimes the websocket has already been closed but the browser didn't
        //have a chance of informing us about it yet, in that case send will
        //throw an error
        try {
          if (BrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e){
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done(){
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function(){
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function(){
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function(){
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' == schema && this.port != 443)
    || ('ws' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function(){
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"../transport":19,"component-inherit":13,"debug":14,"engine.io-parser":27,"parseqs":37,"ws":undefined,"yeast":45}],25:[function(_dereq_,module,exports){
// browser shim for xmlhttprequest module
var hasCORS = _dereq_('has-cors');

module.exports = function(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { }
  }
}

},{"has-cors":31}],26:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],27:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = _dereq_('./keys');
var hasBinary = _dereq_('has-binary');
var sliceBuffer = _dereq_('arraybuffer.slice');
var base64encoder = _dereq_('base64-arraybuffer');
var after = _dereq_('after');
var utf8 = _dereq_('utf8');

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = navigator.userAgent.match(/Android/i);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = _dereq_('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  // String data
  if (typeof data == 'string' || data === undefined) {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      try {
        data = utf8.decode(data);
      } catch (e) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!global.ArrayBuffer) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = ''
    , n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if(numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./keys":28,"after":6,"arraybuffer.slice":7,"base64-arraybuffer":9,"blob":10,"has-binary":29,"utf8":44}],28:[function(_dereq_,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],29:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"isarray":33}],30:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      // see: https://github.com/Automattic/has-binary/pull/4
      if (obj.toJSON && 'function' == typeof obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"isarray":33}],31:[function(_dereq_,module,exports){

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{}],32:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],33:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],34:[function(_dereq_,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],35:[function(_dereq_,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],36:[function(_dereq_,module,exports){
(function (global){
/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@')
      .replace(rvalidtokens, ']')
      .replace(rvalidbraces, ''))) {
    return (new Function('return ' + data))();
  }
};
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],37:[function(_dereq_,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],38:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],39:[function(_dereq_,module,exports){
(function (global){
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = _dereq_('isarray');
var isBuf = _dereq_('./is-buffer');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet){
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == typeof data && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  var curPlaceHolder = 0;

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == typeof data) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((global.Blob && obj instanceof Blob) ||
        (global.File && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./is-buffer":41,"isarray":33}],40:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var debug = _dereq_('debug')('socket.io-parser');
var json = _dereq_('json3');
var isArray = _dereq_('isarray');
var Emitter = _dereq_('component-emitter');
var binary = _dereq_('./binary');
var isBuf = _dereq_('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {
  var str = '';
  var nsp = false;

  // first is type
  str += obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    str += obj.attachments;
    str += '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' != obj.nsp) {
    nsp = true;
    str += obj.nsp;
  }

  // immediately followed by the id
  if (null != obj.id) {
    if (nsp) {
      str += ',';
      nsp = false;
    }
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    if (nsp) str += ',';
    str += json.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if ('string' == typeof obj) {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var p = {};
  var i = 0;

  // look up type
  p.type = Number(str.charAt(0));
  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
    var buf = '';
    while (str.charAt(++i) != '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) != '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' == str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' == c) break;
      p.nsp += c;
      if (i == str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i == str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    try {
      p.data = json.parse(str.substr(i));
    } catch(e){
      return error();
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(data){
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}

},{"./binary":39,"./is-buffer":41,"component-emitter":42,"debug":14,"isarray":33,"json3":34}],41:[function(_dereq_,module,exports){
(function (global){

module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],42:[function(_dereq_,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],43:[function(_dereq_,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],44:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/utf8js v2.0.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			checkScalarValue(codePoint);
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				checkScalarValue(codePoint);
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.0.0',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],45:[function(_dereq_,module,exports){
'use strict';

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

},{}]},{},[1])(1)
});

var ipushpull;
(function (ipushpull) {
    "use strict";
    ipushpull.module = angular.module("ipushpull", []);
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
    var Request = (function () {
        function Request(method, url) {
            this._headers = {};
            this._cache = false;
            this._overrideLock = false;
            this._method = method;
            this._url = url;
            this._headers = {
                "Content-Type": "application/json",
                "x-requested-with": "XMLHttpRequest",
                "x-ipp-device-uuid": "",
                "x-ipp-client": "",
                "x-ipp-client-version": "",
            };
        }
        Request.get = function (url) {
            return new Request("GET", url);
        };
        Request.post = function (url) {
            return new Request("POST", url);
        };
        Request.put = function (url) {
            return new Request("PUT", url);
        };
        Request.del = function (url) {
            return new Request("DELETE", url);
        };
        Object.defineProperty(Request.prototype, "METHOD", {
            get: function () { return this._method; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "URL", {
            get: function () { return this._url; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "HEADERS", {
            get: function () { return this._headers; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "DATA", {
            get: function () { return this._data; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "PARAMS", {
            get: function () { return this._params; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "CACHE", {
            get: function () { return this._cache; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Request.prototype, "OVERRIDE_LOCK", {
            get: function () { return this._overrideLock; },
            enumerable: true,
            configurable: true
        });
        Request.prototype.method = function (method) {
            this._method = method;
            return this;
        };
        Request.prototype.url = function (url) {
            this._url = url;
            return this;
        };
        Request.prototype.headers = function (headers, overwrite) {
            if (overwrite === void 0) { overwrite = false; }
            this._headers = (overwrite) ? headers : angular.merge({}, this._headers, headers);
            return this;
        };
        Request.prototype.data = function (data) {
            this._data = data;
            return this;
        };
        Request.prototype.params = function (params, overwrite) {
            if (overwrite === void 0) { overwrite = false; }
            this._params = (overwrite) ? params : angular.merge({}, this._params, params);
            return this;
        };
        Request.prototype.cache = function (cache) {
            if (cache && this._method === "GET") {
                this._cache = cache;
            }
            return this;
        };
        Request.prototype.overrideLock = function (override) {
            if (override === void 0) { override = true; }
            this._overrideLock = override;
            return this;
        };
        return Request;
    }());
    var Api = (function () {
        function Api($http, $httpParamSerializerJQLike, $q, $injector, storage, config) {
            var _this = this;
            this.$http = $http;
            this.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
            this.$q = $q;
            this.$injector = $injector;
            this.storage = storage;
            this.config = config;
            this._locked = false;
            this.dummyRequest = function (data) {
                console.log("Api is locked down, preventing call " + data.url);
                var q = _this.$q.defer();
                q.reject({
                    data: {},
                    status: 666,
                    statusText: "Api is locked",
                    config: data,
                });
                return q.promise;
            };
            this.handleSuccess = function (response) {
                var q = _this.$q.defer();
                q.resolve({
                    success: true,
                    data: response.data,
                    httpCode: parseInt(response.status, 10),
                    httpText: response.statusText,
                });
                return q.promise;
            };
            this.handleError = function (response) {
                var q = _this.$q.defer();
                if (parseInt(response.status, 10) === 401 && !_this._locked && response.data.error !== "invalid_grant") {
                    var ippAuth = _this.$injector.get("ippAuthService");
                    ippAuth.emit(ippAuth.EVENT_401);
                }
                q.reject({
                    success: false,
                    data: response.data,
                    httpCode: parseInt(response.status, 10),
                    httpText: response.statusText,
                });
                return q.promise;
            };
            this._endPoint = this.config.url + "/api/1.0/";
        }
        Api.prototype.parseError = function (err, def) {
            var msg = def;
            if (err.data) {
                var keys = Object.keys(err.data);
                if (keys.length) {
                    if (angular.isArray(err.data[keys[0]])) {
                        msg = err.data[keys[0]][0];
                    }
                    else if (typeof err.data[keys[0]] === "string") {
                        msg = err.data[keys[0]];
                    }
                    else {
                        msg = def;
                    }
                }
                else {
                    msg = def;
                }
            }
            else {
                msg = def;
            }
            return msg;
        };
        Api.prototype.block = function () {
            this._locked = true;
        };
        Api.prototype.unblock = function () {
            this._locked = false;
        };
        Api.prototype.getSelfInfo = function () {
            return this
                .send(Request.get(this._endPoint + "users/self/")
                .cache(false)
                .overrideLock());
        };
        Api.prototype.refreshAccessTokens = function (refreshToken) {
            return this.send(Request.post(this._endPoint + "oauth/token/")
                .data(this.$httpParamSerializerJQLike({
                grant_type: "refresh_token",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                refresh_token: refreshToken,
            }))
                .headers({
                "Content-Type": "application/x-www-form-urlencoded",
            })
                .overrideLock());
        };
        Api.prototype.userLogin = function (data) {
            return this.send(Request.post(this._endPoint + "oauth/token/")
                .data(this.$httpParamSerializerJQLike({
                grant_type: "password",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                username: data.email,
                password: data.password,
            }))
                .headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }));
        };
        Api.prototype.getDomains = function () {
            return this.send(Request.get(this._endPoint + "domains/"));
        };
        Api.prototype.getDomain = function (domainId) {
            return this.send(Request.get(this._endPoint + "domains/" + domainId + "/"));
        };
        Api.prototype.createFolder = function (data) {
            return this.send(Request.post(this._endPoint + "domains/").data(data.data));
        };
        Api.prototype.updateDomain = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/" + data.domainId + "/")
                .data(data.data));
        };
        Api.prototype.getDomainPages = function (domainId) {
            return this.send(Request.get(this._endPoint + "domains/" + domainId + "/page_access/"));
        };
        Api.prototype.getDomainsAndPages = function () {
            return this.send(Request.get(this._endPoint + "domain_page_access/"));
        };
        Api.prototype.getPage = function (data) {
            return this.send(Request
                .get(this._endPoint + "domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                .params({ client_seq_no: data.seq_no }));
        };
        Api.prototype.getPageByName = function (data) {
            return this.send(Request
                .get(this._endPoint + "domains/name/" + data.domainId + "/page_content/name/" + data.pageId + "/")
                .params({ client_seq_no: data.seq_no }));
        };
        Api.prototype.getPageAccess = function (data) {
            return this.send(Request.get(this._endPoint + "domains/id/" + data.domainId + "/page_access/id/" + data.pageId + "/"));
        };
        Api.prototype.createPage = function (data) {
            return this.send(Request
                .post(this._endPoint + "domains/" + data.domainId + "/pages/")
                .data({ name: data.data.name }));
        };
        Api.prototype.savePageContent = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/id/" + data.domainId + "/page_content/id/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.savePageContentDelta = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/id/" + data.domainId + "/page_content_delta/id/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.savePageSettings = function (data) {
            return this.send(Request
                .put(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/")
                .data(data.data));
        };
        Api.prototype.deletePage = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/pages/" + data.pageId + "/"));
        };
        Api.prototype.saveUserInfo = function (data) {
            return this.send(Request.put(this._endPoint + "users/self/").data(data));
        };
        Api.prototype.changePassword = function (data) {
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        };
        Api.prototype.changeEmail = function (data) {
            return this.send(Request.put(this._endPoint + "credentials/self/").data(data));
        };
        Api.prototype.forgotPassword = function (data) {
            return this.send(Request.post(this._endPoint + "password_reset/").data(data));
        };
        Api.prototype.resetPassword = function (data) {
            return this.send(Request.post(this._endPoint + "password_reset/confirm/").data(data));
        };
        Api.prototype.inviteUsers = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        };
        Api.prototype.acceptInvitation = function (data) {
            return this.send(Request.post(this._endPoint + "users/invitation/confirm/").data(data));
        };
        Api.prototype.refuseInvitation = function (data) {
            return this.send(Request.del(this._endPoint + "users/invitation/confirm/").data(data));
        };
        Api.prototype.domainInvitations = function (data) {
            return this.send(Request
                .get(this._endPoint + "domains/" + data.domainId + "/invitations/")
                .params({ is_complete: "False" }));
        };
        Api.prototype.userInvitations = function () {
            return this.send(Request
                .get(this._endPoint + "users/self/invitations/")
                .params({ is_complete: "False" }));
        };
        Api.prototype.domainAccessLog = function (data) {
            return this.send(Request
                .get(this._endPoint + "domain_access/" + data.domainId + "/events/")
                .params({ page_size: data.limit }));
        };
        Api.prototype.domainUsers = function (data) {
            return this.send(Request.get(this._endPoint + "domain_access/" + data.domainId + "/users/"));
        };
        Api.prototype.activateUser = function (data) {
            return this.send(Request.post(this._endPoint + "users/signup/confirm/").data(data));
        };
        Api.prototype.setDomainDefault = function (data) {
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/self/").data(data.data));
        };
        Api.prototype.resendInvite = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/invitations/" + data.inviteId + "/resend/"));
        };
        Api.prototype.updateDomainAccess = function (data) {
            return this.send(Request.put(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        };
        Api.prototype.removeUsersFromDomain = function (data) {
            return this.send(Request.del(this._endPoint + "domain_access/" + data.domainId + "/users/").data(data.data));
        };
        Api.prototype.getInvitation = function (data) {
            return this.send(Request.get(this._endPoint + "users/invitations/" + data.token + "/"));
        };
        Api.prototype.cancelInvitations = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/invitations/").data(data.data));
        };
        Api.prototype.getDomainAccessGroups = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/"));
        };
        Api.prototype.getDomainAccessGroup = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.groupId + "/"));
        };
        Api.prototype.addDomainAccessGroup = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/").data(data.data));
        };
        Api.prototype.putDomainAgroupMembers = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/members/").data(data.data));
        };
        Api.prototype.putDomainAgroupPages = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/pages/").data(data.data));
        };
        Api.prototype.updateDomainAgroup = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/").data(data.data));
        };
        Api.prototype.deleteDomainAGroup = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/access_groups/" + data.agroupId + "/"));
        };
        Api.prototype.getDomainPageAccess = function (data) {
            return this.send(Request.get(this._endPoint + "domain_page_access/" + data.domainId + "/"));
        };
        Api.prototype.getDomainCustomers = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/customers/"));
        };
        Api.prototype.saveDomainPageAccess = function (data) {
            return this.send(Request.put(this._endPoint + "domain_page_access/" + data.domainId + "/basic/").data(data.data));
        };
        Api.prototype.getTemplates = function (data) {
            return this.send(Request.get(this._endPoint + "templates/"));
        };
        Api.prototype.saveCustomer = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/customers/").data(data.data));
        };
        Api.prototype.updateCustomer = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/customers/" + data.data.id + "/").data(data.data));
        };
        Api.prototype.removeCustomer = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/customers/" + data.customerId + "/"));
        };
        Api.prototype.getDocEmailRules = function (data) {
            return this.send(Request.get(this._endPoint + "domains/" + data.domainId + "/docsnames/"));
        };
        Api.prototype.createDocEmailRule = function (data) {
            return this.send(Request.post(this._endPoint + "domains/" + data.domainId + "/docsnames/").data(data.data));
        };
        Api.prototype.updateDocEmailRule = function (data) {
            return this.send(Request.put(this._endPoint + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/").data(data.data));
        };
        Api.prototype.deleteDocEmailRule = function (data) {
            return this.send(Request.del(this._endPoint + "domains/" + data.domainId + "/docsnames/" + data.docRuleId + "/"));
        };
        Api.prototype.send = function (request) {
            var token = this.storage.get("access_token");
            request.headers({
                "Authorization": "Bearer " + ((token) ? token : "null"),
            });
            var provider = (this._locked && !request.OVERRIDE_LOCK) ? this.dummyRequest : this.$http;
            request.cache(false);
            var r = provider({
                url: request.URL,
                cache: request.CACHE,
                method: request.METHOD,
                params: request.PARAMS,
                data: request.DATA,
                headers: request.HEADERS,
            });
            return r.then(this.handleSuccess, this.handleError);
        };
        Api.$inject = ["$http", "$httpParamSerializerJQLike", "$q", "$injector", "ippGlobalStorageService", "ipushpull_conf"];
        return Api;
    }());
    ipushpull.module.service("ippApiService", Api);
})(ipushpull || (ipushpull = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ipushpull;
(function (ipushpull) {
    "use strict";
    var Auth = (function (_super) {
        __extends(Auth, _super);
        function Auth($q, ippApi, storage, config) {
            var _this = this;
            _super.call(this);
            this.$q = $q;
            this.ippApi = ippApi;
            this.storage = storage;
            this.config = config;
            this._user = {};
            this._authenticated = false;
            this._authInProgress = false;
            this.on401 = function () {
                _this.ippApi.block();
                _this.storage.remove("access_token");
                _this.emit(_this.EVENT_RE_LOGGING);
                _this.authenticate(true).then(function () {
                    _this.emit(_this.EVENT_LOGIN_REFRESHED);
                }, function () {
                    _this.emit(_this.EVENT_ERROR);
                }).finally(function () {
                    _this.ippApi.unblock();
                });
            };
            this.on("401", this.on401);
        }
        Object.defineProperty(Auth.prototype, "EVENT_LOGGED_IN", {
            get: function () { return "logged_in"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_RE_LOGGING", {
            get: function () { return "re_logging"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_LOGIN_REFRESHED", {
            get: function () { return "login_refreshed"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_LOGGED_OUT", {
            get: function () { return "logged_out"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_ERROR", {
            get: function () { return "error"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "EVENT_401", {
            get: function () { return "401"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auth.prototype, "user", {
            get: function () { return this._user; },
            enumerable: true,
            configurable: true
        });
        Auth.prototype.authenticate = function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            var q = this.$q.defer();
            if (this._authInProgress) {
                q.reject("Auth already in progress");
                return q.promise;
            }
            this._authInProgress = true;
            if (this._authenticated && !force) {
                this._authInProgress = false;
                q.resolve();
                return q.promise;
            }
            this.processAuth().then(function (res) {
                if (!_this._authenticated) {
                    _this._authenticated = true;
                    _this.emit(_this.EVENT_LOGGED_IN);
                }
                q.resolve();
            }, function (err) {
                _this.emit(_this.EVENT_ERROR, err);
                if (_this._authenticated) {
                    _this.logout();
                }
                q.reject(err);
            }).finally(function () {
                _this._authInProgress = false;
            });
            return q.promise;
        };
        Auth.prototype.login = function (username, password) {
            var _this = this;
            var q = this.$q.defer();
            this.ippApi.userLogin({
                grant_type: "password",
                client_id: this.config.api_key,
                client_secret: this.config.api_secret,
                email: username,
                password: password,
            }).then(function (res) {
                _this.saveTokens(res.data);
                _this.authenticate().then(q.resolve, q.reject);
            }, function (err) {
                err.message = "";
                if (err.httpCode === 400 || err.httpCode === 401) {
                    switch (err.data.error) {
                        case "invalid_grant":
                            err.message = "The username and password you entered did not match our records. Please double-check and try again.";
                            break;
                        case "invalid_client":
                            err.message = "Your client doesn\'t have access to iPushPull system.";
                            break;
                        case "invalid_request":
                            err.message = err.data.error_description;
                            break;
                        default:
                            err.message = _this.ippApi.parseError(err.data, "Unknown error");
                            break;
                    }
                }
                _this.emit(_this.EVENT_ERROR, err);
                q.reject(err);
            });
            return q.promise;
        };
        Auth.prototype.logout = function () {
            this.storage.remove("access_token");
            this.storage.remove("refresh_token");
            this._authenticated = false;
            this.emit(this.EVENT_LOGGED_OUT);
        };
        Auth.prototype.processAuth = function () {
            var _this = this;
            var q = this.$q.defer();
            var accessToken = this.storage.get("access_token");
            var refreshToken = this.storage.get("refresh_token");
            if (accessToken) {
                return this.getUserInfo();
            }
            else {
                if (refreshToken) {
                    this.refreshTokens().then(function (data) {
                        _this.saveTokens(data.data);
                        _this.getUserInfo().then(q.resolve, q.reject);
                    }, function (err) {
                        _this.storage.remove("refresh_token");
                        q.reject(err);
                    });
                }
                else {
                    q.reject("No tokens available");
                }
            }
            return q.promise;
        };
        Auth.prototype.refreshTokens = function () {
            var refreshToken = this.storage.get("refresh_token");
            return this.ippApi.refreshAccessTokens(refreshToken);
        };
        Auth.prototype.saveTokens = function (tokens) {
            this.storage.create("access_token", tokens.access_token);
            this.storage.create("refresh_token", tokens.refresh_token);
        };
        Auth.prototype.getUserInfo = function () {
            var _this = this;
            var q = this.$q.defer();
            this.ippApi.getSelfInfo().then(function (res) {
                _this._user = res.data;
                q.resolve();
            }, q.reject);
            return q.promise;
        };
        Auth.$inject = ["$q", "ippApiService", "ippGlobalStorageService", "ipushpull_conf"];
        return Auth;
    }(EventEmitter));
    ipushpull.module.service("ippAuthService", Auth);
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
    var Crypto = (function () {
        function Crypto() {
        }
        Crypto._instance = function () {
            return new Crypto();
        };
        Crypto.prototype.decryptContent = function (key, data) {
            if (!this.libCheck()) {
                return;
            }
            if (!data)
                return undefined;
            var rawData = forge.util.decode64(data);
            var iv = rawData.substring(0, 16);
            var cleanData = rawData.substring(16);
            cleanData = forge.util.createBuffer(cleanData, "latin1");
            iv = forge.util.createBuffer(iv, "latin1");
            var decipher = forge.cipher.createDecipher("AES-CBC", this.hashPassphrase(key.passphrase));
            decipher.start({ iv: iv });
            decipher.update(cleanData);
            var pass = decipher.finish();
            var decrypted;
            try {
                decrypted = JSON.parse(decipher.output.toString());
            }
            catch (e) {
                decrypted = undefined;
            }
            return decrypted;
        };
        Crypto.prototype.encryptContent = function (key, data) {
            if (!this.libCheck()) {
                return;
            }
            var readyData = JSON.stringify(data);
            var hash = this.hashPassphrase(key.passphrase);
            var iv = forge.random.getBytesSync(16);
            var cipher = forge.cipher.createCipher("AES-CBC", hash);
            cipher.start({ iv: iv });
            cipher.update(forge.util.createBuffer(readyData, "utf8"));
            cipher.finish();
            var encrypted = cipher.output;
            var buffer = forge.util.createBuffer();
            buffer.putBytes(iv);
            buffer.putBytes(encrypted.bytes());
            var output = buffer.getBytes();
            return forge.util.encode64(output);
        };
        Crypto.prototype.hashPassphrase = function (passphrase) {
            var md = forge.md.sha256.create();
            md.update(passphrase);
            return md.digest().bytes();
        };
        Crypto.prototype.libCheck = function () {
            if (typeof forge === "undefined") {
                console.error("[iPushPull]", "If you want to use encryption make sure you include forge library in your header or use ng-ipushpull-standalone.min.js");
            }
            return typeof forge !== "undefined";
        };
        return Crypto;
    }());
    ipushpull.module.factory("ippCryptoService", Crypto._instance);
})(ipushpull || (ipushpull = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ipushpull;
(function (ipushpull) {
    "use strict";
})(ipushpull || (ipushpull = {}));
var ipushpull;
(function (ipushpull) {
    "use strict";
    var $q, $timeout, $interval, api, auth, storage, crypto, config;
    var PageWrap = (function () {
        function PageWrap(q, timeout, interval, ippApi, ippAuth, ippStorage, ippCrypto, ippConf) {
            var defaults = {
                url: "https://www.ipushpull.com",
            };
            $q = q;
            $timeout = timeout;
            $interval = interval;
            api = ippApi;
            auth = ippAuth;
            storage = ippStorage;
            crypto = ippCrypto;
            config = angular.merge({}, defaults, ippConf);
            return Page;
        }
        PageWrap.$inject = ["$q", "$timeout", "$interval", "ippApiService", "ippAuthService", "ippGlobalStorageService", "ippCryptoService", "ipushpull_conf"];
        return PageWrap;
    }());
    ipushpull.module.service("ippPageService", PageWrap);
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(pageId, folderId) {
            var _this = this;
            _super.call(this);
            this.ready = false;
            this.decrypted = true;
            this.updatesOn = true;
            this._supportsWS = true;
            this._encryptionKeyPull = {
                name: "",
                passphrase: "",
            };
            this._encryptionKeyPush = {
                name: "",
                passphrase: "",
            };
            this.types = {
                regular: this.TYPE_REGULAR,
                pageAccessReport: this.TYPE_PAGE_ACCESS_REPORT,
                domainUsageReport: this.TYPE_DOMAIN_USAGE_REPORT,
                globalUsageReport: this.TYPE_GLOBAL_USAGE_REPORT,
                pageUpdateReport: this.TYPE_PAGE_UPDATE_REPORT,
                alert: this.TYPE_ALERT,
                pdf: this.TYPE_PDF,
                liveUsage: this.TYPE_LIVE_USAGE_REPORT,
            };
            this._supportsWS = "WebSocket" in window || "MozWebSocket" in window;
            this._folderId = (!isNaN(+folderId)) ? folderId : undefined;
            this._pageId = (!isNaN(+pageId)) ? pageId : undefined;
            this._folderName = (isNaN(+folderId)) ? folderId : undefined;
            this._pageName = (isNaN(+pageId)) ? pageId : undefined;
            if (!this._pageId) {
                this.updatesOn = false;
            }
            if (!this._pageId) {
                this.getPageId(this._folderName, this._pageName).then(function (res) {
                    _this._pageId = res.pageId;
                    _this._folderId = res.folderId;
                    _this.init();
                }, function (err) {
                });
            }
            else {
                this.init();
            }
        }
        Object.defineProperty(Page.prototype, "TYPE_REGULAR", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_ALERT", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_PDF", {
            get: function () { return 6; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_PAGE_ACCESS_REPORT", {
            get: function () { return 1001; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_DOMAIN_USAGE_REPORT", {
            get: function () { return 1002; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_GLOBAL_USAGE_REPORT", {
            get: function () { return 1003; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_PAGE_UPDATE_REPORT", {
            get: function () { return 1004; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "TYPE_LIVE_USAGE_REPORT", {
            get: function () { return 1007; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_READY", {
            get: function () { return "ready"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_DECRYPTED", {
            get: function () { return "decrypted"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_NEW_CONTENT", {
            get: function () { return "new_content"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_NEW_META", {
            get: function () { return "new_meta"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_ACCESS_UPDATED", {
            get: function () { return "access_updated"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "EVENT_ERROR", {
            get: function () { return "error"; },
            enumerable: true,
            configurable: true
        });
        Page.create = function (folderId, name, type, template) {
            var q = $q.defer();
            if (template) {
                var page_1 = new Page(template.id, template.domain_id);
                page_1.on(page_1.EVENT_READY, function () {
                    page_1.clone(folderId, name)
                        .then(q.resolve, q.reject)
                        .finally(function () {
                        page_1.destroy();
                    });
                });
            }
            else {
                api.createPage({
                    domainId: folderId,
                    data: {
                        name: name,
                        special_page_type: type,
                    },
                }).then(function (res) {
                    var page = new Page(res.data.id, folderId);
                    page.on(page.EVENT_READY, function () {
                        page.stop();
                        q.resolve(page);
                    });
                }, function (err) {
                    q.reject(err);
                });
            }
            return q.promise;
        };
        ;
        Object.defineProperty(Page.prototype, "encryptionKeyPull", {
            set: function (key) { this._encryptionKeyPull = key; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "encryptionKeyPush", {
            set: function (key) { this._encryptionKeyPush = key; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "data", {
            get: function () { return this._data; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "access", {
            get: function () { return this._access; },
            enumerable: true,
            configurable: true
        });
        Page.prototype.start = function () {
            this._provider.start();
            this.updatesOn = true;
        };
        Page.prototype.stop = function () {
            this._provider.stop();
            this.updatesOn = false;
        };
        Page.prototype.push = function (data, delta) {
            if (delta === void 0) { delta = true; }
            if (delta) {
                return this.pushDelta(data);
            }
            else {
                return this.pushFull(data);
            }
        };
        Page.prototype.saveMeta = function (data) {
            var q = $q.defer();
            delete data.access_rights;
            api.savePageSettings({
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            }).then(q.resolve, function (err) {
                q.reject(api.parseError(err, "Could not save page settings"));
            });
            return q.promise;
        };
        Page.prototype.decrypt = function (key) {
            if (!key) {
                key = this._encryptionKeyPull;
            }
            if (this._data.encryption_type_used && !key.passphrase) {
                this.decrypted = false;
                return;
            }
            if (this._data.encryption_type_used) {
                var decrypted = crypto.decryptContent({
                    name: key.name,
                    passphrase: key.passphrase,
                }, this._data.encrypted_content);
                if (decrypted) {
                    this.decrypted = true;
                    this._data.content = decrypted;
                    this._encryptionKeyPull = key;
                    this.emit(this.EVENT_DECRYPTED);
                }
                else {
                    this.decrypted = false;
                    this.emit(this.EVENT_ERROR, new Error("Could not decrypt page with key \"" + key.name + "\" and passphrase \"" + key.passphrase + "\""));
                }
            }
            else {
                this.decrypted = true;
            }
            if (this.decrypted) {
                this._data.content = PageStyles.decompressStyles(this._data.content);
            }
        };
        Page.prototype.destroy = function () {
            this._provider.destroy();
            $interval.cancel(this._accessInterval);
            this.removeEvent();
        };
        Page.prototype.clone = function (folderId, name, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var q = $q.defer();
            if (!this.ready) {
                q.reject("Page is not ready");
                return q.promise;
            }
            if (options.clone_ranges && this._folderId !== folderId) {
                options.clone_ranges = false;
            }
            Page.create(this._folderId, name, this._data.special_page_type).then(function (newPage) {
                $q.all([
                    newPage.push(_this._data.content, false),
                ]).then(function (res) {
                    q.resolve(newPage);
                }, q.reject);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        Page.prototype.init = function () {
            var _this = this;
            this.Ranges = new Ranges(this._folderId, this._pageId);
            if (!this._supportsWS || typeof io === "undefined") {
                console.warn("[iPushPull] Cannot use websocket technology it is not supported or websocket library is not included. " +
                    "Make sure socket-io client is incldued or use ng-ipushpull-standalone.min.js");
            }
            this._provider = (!this._supportsWS || typeof io === "undefined" || config.transport === "polling")
                ? new ProviderREST(this._pageId, this._folderId)
                : new ProviderSocket(this._pageId, this._folderId);
            this.getPageAccess();
            this._accessInterval = $interval(function () {
                _this.getPageAccess();
            }, 30000);
            this.registerListeners();
        };
        Page.prototype.getPageId = function (folderName, pageName) {
            var q = $q.defer();
            api.getPageByName({ domainId: folderName, pageId: pageName }).then(function (res) {
                q.resolve({ pageId: res.data.id, folderId: res.data.domain_id });
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        };
        Page.prototype.getPageAccess = function () {
            var _this = this;
            var q = $q.defer();
            api.getPageAccess({
                domainId: this._folderId,
                pageId: this._pageId,
            }).then(function (res) {
                _this._access = res.data;
                _this.emit(_this.EVENT_ACCESS_UPDATED);
                q.resolve();
            }, function (err) {
                q.reject();
            });
            return q.promise;
        };
        Page.prototype.registerListeners = function () {
            var _this = this;
            this._provider.on("content_update", function (data) {
                data.special_page_type = _this.updatePageType(data.special_page_type);
                _this._data = angular.merge({}, _this._data, data);
                _this.decrypt();
                _this._contentLoaded = true;
                _this.checkReady();
                _this.emit(_this.EVENT_NEW_CONTENT, _this._data);
            });
            this._provider.on("meta_update", function (data) {
                data.special_page_type = _this.updatePageType(data.special_page_type);
                delete data.content;
                delete data.encrypted_content;
                _this._data = angular.merge({}, _this._data, data);
                _this.Ranges.parse(data.access_rights || "[]");
                _this._metaLoaded = true;
                _this.checkReady();
                _this.emit(_this.EVENT_NEW_META, data);
            });
            this._provider.on("error", function (err) {
                err.code = err.httpCode || err.code;
                err.message = err.httpText || err.message;
                _this.emit(_this.EVENT_ERROR, err.message);
                if (err.code === 404) {
                    _this.destroy();
                }
            });
        };
        Page.prototype.pushFull = function (content) {
            var _this = this;
            var q = $q.defer();
            if (this._data.encryption_type_to_use) {
                if (!this._encryptionKeyPull || this._data.encryption_key_to_use !== this._encryptionKeyPush.name) {
                    q.reject("None or wrong encryption key");
                    return q.promise;
                }
                var encrypted = this.encrypt(this._encryptionKeyPush, content);
                if (encrypted) {
                    this._data.encrypted_content = encrypted;
                    this._data.encryption_type_used = 1;
                    this._data.encryption_key_used = this._encryptionKeyPush.name;
                }
                else {
                    q.reject("Encryption failed");
                    return q.promise;
                }
            }
            else {
                this._data.encryption_key_used = "";
                this._data.encryption_type_used = 0;
                this._data.content = content;
            }
            var data = {
                content: this._data.content,
                encrypted_content: this._data.encrypted_content,
                encryption_type_used: this._data.encryption_type_used,
                encryption_key_used: this._data.encryption_key_used,
            };
            var requestData = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            };
            api.savePageContent(requestData).then(function (res) {
                _this._data.seq_no = res.data.seq_no;
                q.resolve(res);
            }, q.reject);
            return q.promise;
        };
        Page.prototype.pushDelta = function (data) {
            var q = $q.defer();
            var requestData = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: data,
            };
            api.savePageContentDelta(requestData).then(q.resolve, q.reject);
            return q.promise;
        };
        Page.prototype.checkReady = function () {
            if (this._contentLoaded && this._metaLoaded && !this.ready) {
                this.ready = true;
                this.emit(this.EVENT_READY);
            }
        };
        Page.prototype.updatePageType = function (pageType) {
            if (pageType > 0 && pageType < 5 || pageType === 7) {
                pageType += 1000;
            }
            return pageType;
        };
        Page.prototype.encrypt = function (key, content) {
            return crypto.encryptContent(key, content);
        };
        return Page;
    }(EventEmitter));
    var PermissionRange = (function () {
        function PermissionRange(name, rowStart, rowEnd, colStart, colEnd, permissions) {
            if (rowStart === void 0) { rowStart = 0; }
            if (rowEnd === void 0) { rowEnd = 0; }
            if (colStart === void 0) { colStart = 0; }
            if (colEnd === void 0) { colEnd = 0; }
            this.name = name;
            this.rowStart = rowStart;
            this.rowEnd = rowEnd;
            this.colStart = colStart;
            this.colEnd = colEnd;
            this._permissions = {
                ro: [],
                no: [],
            };
            if (permissions) {
                this._permissions = permissions;
            }
        }
        PermissionRange.prototype.setPermission = function (userId, permission) {
            if (this._permissions.ro.indexOf(userId) >= 0) {
                this._permissions.ro.splice(this._permissions.ro.indexOf(userId), 1);
            }
            if (this._permissions.no.indexOf(userId) >= 0) {
                this._permissions.no.splice(this._permissions.no.indexOf(userId), 1);
            }
            if (permission) {
                this._permissions[permission].push(userId);
            }
        };
        PermissionRange.prototype.getPermission = function (userId) {
            var permission = "";
            if (this._permissions.ro.indexOf(userId) >= 0) {
                permission = "ro";
            }
            else if (this._permissions.no.indexOf(userId) >= 0) {
                permission = "no";
            }
            return permission;
        };
        PermissionRange.prototype.toObject = function () {
            return {
                name: this.name,
                start: this.rowStart + ":" + this.colStart,
                end: this.rowEnd + ":" + this.colEnd,
                rights: this._permissions,
                freeze: false,
            };
        };
        return PermissionRange;
    }());
    ipushpull.PermissionRange = PermissionRange;
    var FreezingRange = (function () {
        function FreezingRange(name, subject, count) {
            if (subject === void 0) { subject = "rows"; }
            if (count === void 0) { count = 1; }
            this.name = name;
            this.subject = subject;
            this.count = count;
        }
        Object.defineProperty(FreezingRange, "SUBJECT_ROWS", {
            get: function () { return "rows"; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(FreezingRange, "SUBJECT_COLUMNS", {
            get: function () { return "cols"; },
            enumerable: true,
            configurable: true
        });
        ;
        FreezingRange.prototype.toObject = function () {
            var range = {
                name: this.name,
                start: "0:0",
                end: "",
                rights: { ro: [], no: [] },
                freeze: true,
            };
            if (this.subject === FreezingRange.SUBJECT_ROWS) {
                range.end = (this.count - 1) + ":-1";
            }
            else {
                range.end = "-1:" + (this.count - 1);
            }
            return range;
        };
        return FreezingRange;
    }());
    ipushpull.FreezingRange = FreezingRange;
    var Ranges = (function () {
        function Ranges(folderId, pageId, pageAccessRights) {
            this._ranges = [];
            this._folderId = folderId;
            this._pageId = pageId;
            if (pageAccessRights) {
                this.parse(pageAccessRights);
            }
        }
        Object.defineProperty(Ranges.prototype, "TYPE_PERMISSION_RANGE", {
            get: function () { return "permissions"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ranges.prototype, "TYPE_FREEZING_RANGE", {
            get: function () { return "freezing"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ranges.prototype, "ranges", {
            get: function () { return this._ranges; },
            enumerable: true,
            configurable: true
        });
        Ranges.prototype.setRanges = function (ranges) {
            this._ranges = ranges;
            return this;
        };
        Ranges.prototype.addRange = function (range) {
            var nameUnique = false;
            var newName = range.name;
            var count = 1;
            while (!nameUnique) {
                nameUnique = true;
                for (var i = 0; i < this._ranges.length; i++) {
                    if (this._ranges[i].name === newName) {
                        nameUnique = false;
                        newName = range.name + "_" + count;
                        count++;
                    }
                }
            }
            range.name = newName;
            this._ranges.push(range);
            return this;
        };
        Ranges.prototype.removeRange = function (range) {
            if (this._ranges.indexOf(range) >= 0) {
                this._ranges.splice(this._ranges.indexOf(range), 1);
            }
            return this;
        };
        Ranges.prototype.save = function () {
            var ranges = [];
            for (var i = 0; i < this._ranges.length; i++) {
                ranges.push(this._ranges[i].toObject());
            }
            var requestData = {
                domainId: this._folderId,
                pageId: this._pageId,
                data: {
                    access_rights: JSON.stringify(ranges),
                },
            };
            return api.savePageSettings(requestData);
        };
        Ranges.prototype.parse = function (pageAccessRights) {
            var ar = JSON.parse(pageAccessRights);
            this._ranges = [];
            for (var i = 0; i < ar.length; i++) {
                var rowStart = parseInt(ar[i].start.split(":")[0], 10);
                var rowEnd = parseInt(ar[i].end.split(":")[0], 10);
                var colStart = parseInt(ar[i].start.split(":")[1], 10);
                var colEnd = parseInt(ar[i].end.split(":")[1], 10);
                if (ar[i].freeze) {
                    var subject = (colEnd >= 0) ? "cols" : "rows";
                    var count = (colEnd >= 0) ? colEnd + 1 : rowEnd + 1;
                    this._ranges.push(new FreezingRange(ar[i].name, subject, count));
                }
                else {
                    this._ranges.push(new PermissionRange(ar[i].name, rowStart, rowEnd, colStart, colEnd, ar[i].rights));
                }
            }
            return this._ranges;
        };
        return Ranges;
    }());
    var ProviderREST = (function (_super) {
        __extends(ProviderREST, _super);
        function ProviderREST(_pageId, _folderId) {
            _super.call(this);
            this._pageId = _pageId;
            this._folderId = _folderId;
            this._stopped = false;
            this._requestOngoing = false;
            this._timeout = 1000;
            this._seqNo = 0;
            this.start();
        }
        ProviderREST.prototype.start = function () {
            this._stopped = false;
            this.startPolling();
        };
        ProviderREST.prototype.stop = function () {
            this._stopped = true;
            $timeout.cancel(this._timer);
        };
        ProviderREST.prototype.destroy = function () {
            this.stop();
            this.removeEvent();
        };
        ProviderREST.prototype.startPolling = function () {
            var _this = this;
            this.load();
            this._timer = $timeout(function () {
                _this.startPolling();
            }, this._timeout);
        };
        ProviderREST.prototype.load = function (ignoreSeqNo) {
            var _this = this;
            if (ignoreSeqNo === void 0) { ignoreSeqNo = false; }
            var q = $q.defer();
            if (this._requestOngoing || this._stopped) {
                q.reject({});
                return q.promise;
            }
            this._requestOngoing = true;
            api.getPage({
                domainId: this._folderId,
                pageId: this._pageId,
                seq_no: (!ignoreSeqNo) ? this._seqNo : undefined,
            }).then(function (res) {
                if (res.httpCode === 200 || res.httpCode === 204) {
                    if (res.httpCode === 200) {
                        _this._seqNo = res.data.seq_no;
                        _this.emit("content_update", _this.tempGetContentOb(res.data));
                        _this.emit("meta_update", _this.tempGetSettingsOb(res.data));
                    }
                    else {
                        _this.emit("empty_update");
                    }
                    q.resolve(res.data);
                }
                else {
                    _this.emit("error", res.data);
                    q.reject({});
                }
            }, function (err) {
                _this.emit("error", err);
                q.reject(err);
            }).finally(function () {
                _this._requestOngoing = false;
            });
            return q.promise;
        };
        ProviderREST.prototype.tempGetContentOb = function (data) {
            return {
                id: data.id,
                domain_id: data.domain_id,
                seq_no: data.seq_no,
                content_modified_timestamp: data.content_modified_timestamp,
                content: data.content,
                content_modified_by: data.content_modified_by,
                push_interval: data.push_interval,
                pull_interval: data.pull_interval,
                is_public: data.is_public,
                description: data.description,
                encrypted_content: data.encrypted_content,
                encryption_key_used: data.encryption_key_used,
                encryption_type_used: data.encryption_type_used,
                special_page_type: data.special_page_type,
            };
        };
        ProviderREST.prototype.tempGetSettingsOb = function (data) {
            return JSON.parse(JSON.stringify(data));
        };
        return ProviderREST;
    }(EventEmitter));
    var ProviderSocket = (function (_super) {
        __extends(ProviderSocket, _super);
        function ProviderSocket(_pageId, _folderId) {
            var _this = this;
            _super.call(this);
            this._pageId = _pageId;
            this._folderId = _folderId;
            this._stopped = false;
            this.onConnect = function () {
                return;
            };
            this.onDisconnect = function () {
                return;
            };
            this.onPageContent = function (data) {
                $timeout(function () {
                    _this.emit("content_update", data);
                });
            };
            this.onPageSettings = function (data) {
                $timeout(function () {
                    _this.emit("meta_update", data);
                });
            };
            this.onPageError = function (data) {
                $timeout(function () {
                    if (data.code === 401) {
                        auth.emit(auth.EVENT_401);
                    }
                    else {
                        _this.emit("error", data);
                    }
                });
            };
            this.onOAuthError = function (data) {
            };
            this.onAuthRefresh = function () {
                var dummy = _this._pageId;
                _this.start();
            };
            this.supportsWebSockets = function () { return "WebSocket" in window || "MozWebSocket" in window; };
            this.start();
            auth.on(auth.EVENT_LOGIN_REFRESHED, this.onAuthRefresh);
        }
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_ERROR", {
            get: function () { return "page_error"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_CONTENT", {
            get: function () { return "page_content"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_PUSH", {
            get: function () { return "page_push"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_SETTINGS", {
            get: function () { return "page_settings"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_DATA", {
            get: function () { return "page_data"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_USER_JOINED", {
            get: function () { return "page_user_joined"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProviderSocket, "SOCKET_EVENT_PAGE_USER_LEFT", {
            get: function () { return "page_user_left"; },
            enumerable: true,
            configurable: true
        });
        ProviderSocket.prototype.start = function () {
            if (!this._socket || !this._socket.connected) {
                this.init();
            }
            else {
                this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            }
        };
        ProviderSocket.prototype.stop = function () {
            this._socket.off(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            this._stopped = true;
        };
        ProviderSocket.prototype.destroy = function () {
            this._socket.removeAllListeners();
            this._socket.disconnect();
            this.stop();
            auth.off(auth.EVENT_LOGIN_REFRESHED, this.onAuthRefresh);
            this.removeEvent();
        };
        ProviderSocket.prototype.init = function () {
            this._socket = this.connect();
            this._socket.on("connect", this.onConnect);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_CONTENT, this.onPageContent);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_SETTINGS, this.onPageSettings);
            this._socket.on(ProviderSocket.SOCKET_EVENT_PAGE_ERROR, this.onPageError);
            this._socket.on("oauth_error", this.onOAuthError);
            this._socket.on("disconnect", this.onDisconnect);
            this._stopped = false;
        };
        ProviderSocket.prototype.connect = function () {
            var query = [
                ("access_token=" + storage.get("access_token")),
            ];
            query = query.filter(function (val) {
                return (val.length > 0);
            });
            return io.connect(config.url + "/page/" + this._pageId, {
                query: query.join("&"),
                transports: (this.supportsWebSockets()) ? ["websocket"] : ["polling"],
                forceNew: true,
            });
        };
        return ProviderSocket;
    }(EventEmitter));
    var PageStyles = (function () {
        function PageStyles() {
            this.currentStyle = {};
            this.currentBorders = { top: {}, right: {}, bottom: {}, left: {} };
            this.excelStyles = {
                "text-wrap": "white-space",
                "tbs": "border-top-style",
                "rbs": "border-right-style",
                "bbs": "border-bottom-style",
                "lbs": "border-left-style",
                "tbc": "border-top-color",
                "rbc": "border-right-color",
                "bbc": "border-bottom-color",
                "lbc": "border-left-color",
                "tbw": "border-top-width",
                "rbw": "border-right-width",
                "bbw": "border-bottom-width",
                "lbw": "border-left-width",
            };
            this.excelBorderStyles = {
                "solid": "solid",
                "thin": "solid",
                "thick": "solid",
                "hair": "solid",
                "dash": "dashed",
                "dashed": "dashed",
                "dashdot": "dashed",
                "mediumdashed": "dashed",
                "mediumdashdot": "dashed",
                "slantdashdot": "dashed",
                "dot": "dotted",
                "dotted": "dotted",
                "hairline": "dotted",
                "mediumdashdotdot": "dotted",
                "dashdotdot": "dotted",
                "double": "double",
            };
            this.excelBorderWeights = {
                "thin": "1px",
                "medium": "1px",
                "thick": "2px",
                "hair": "1px",
                "hairline": "1px",
                "double": "3px",
            };
            this.ignoreStyles = [
                "number-format",
            ];
        }
        PageStyles.decompressStyles = function (content) {
            var styler = new PageStyles();
            for (var i = 0; i < content.length; i++) {
                for (var j = 0; j < content[i].length; j++) {
                    content[i][j].style = styler.makeStyle(content[i][j].style);
                }
            }
            return content;
        };
        PageStyles.prototype.reset = function () {
            this.currentStyle = {};
            this.currentBorders = { top: {}, right: {}, bottom: {}, left: {} };
        };
        PageStyles.prototype.makeStyle = function (cellStyle) {
            var styleName, style = angular.copy(cellStyle);
            for (var item in style) {
                if (this.ignoreStyles.indexOf(item) >= 0) {
                    continue;
                }
                styleName = this.excelToCSS(item);
                var prefix = "", suffix = "";
                if ((styleName === "color" || styleName === "background-color") && style[item] !== "none") {
                    prefix = "#";
                }
                if (styleName === "font-family") {
                    suffix = ", Arial, Helvetica, sans-serif";
                }
                if (styleName === "white-space") {
                    style[item] = (style[item] === "normal") ? "pre" : "pre-wrap";
                }
                if (styleName === "width" || styleName === "height") {
                    suffix = " !important";
                }
                if (styleName.indexOf("border") >= 0) {
                    var pos = styleName.split("-")[1];
                    if (styleName.indexOf("-style") >= 0) {
                        this.currentBorders[pos].style = this.excelBorderStyles[style[item]] || undefined;
                    }
                    if (styleName.indexOf("-width") >= 0) {
                        this.currentBorders[pos].width = (style[item] !== "none") ? this.excelBorderWeights[style[item]] : undefined;
                    }
                    if (styleName.indexOf("-color") >= 0) {
                        this.currentBorders[pos].color = (style[item] === "none") ? "transparent" : "#" + style[item];
                    }
                    continue;
                }
                this.currentStyle[styleName] = prefix + style[item] + suffix;
            }
            var resultStyles = angular.copy(this.currentStyle);
            for (var borderPos in this.currentBorders) {
                if (typeof this.currentBorders[borderPos].style === "undefined" || !this.currentBorders[borderPos].style) {
                    continue;
                }
                resultStyles["border-" + borderPos] = this.currentBorders[borderPos].width + " " + this.currentBorders[borderPos].style + " " + this.currentBorders[borderPos].color + ";";
            }
            return resultStyles;
        };
        PageStyles.prototype.excelToCSS = function (val) {
            return (this.excelStyles[val]) ? this.excelStyles[val] : val;
        };
        PageStyles.prototype.CSSToExcel = function (val) {
            var excelVal = val;
            for (var style in this.excelStyles) {
                if (this.excelStyles[style] === val) {
                    excelVal = style;
                    break;
                }
            }
            return excelVal;
        };
        PageStyles.prototype.excelBorderWeight = function (pixels) {
            var bWeight = "";
            for (var weight in this.excelBorderWeights) {
                if (this.excelBorderWeights[weight] === pixels) {
                    bWeight = weight;
                    break;
                }
            }
            return bWeight;
        };
        return PageStyles;
    }());
})(ipushpull || (ipushpull = {}));

var ipushpull;
(function (ipushpull) {
    "use strict";
    var LocalStorage = (function () {
        function LocalStorage() {
            this.prefix = "ipp";
        }
        LocalStorage.prototype.create = function (key, value) {
            localStorage.setItem(this.makeKey(key), value);
        };
        LocalStorage.prototype.save = function (key, value) {
            return this.create(key, value);
        };
        LocalStorage.prototype.get = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            var val = localStorage.getItem(this.makeKey(key));
            if (!val) {
                return defaultValue;
            }
            if (this.isValidJSON(val)) {
                return JSON.parse(val);
            }
            else {
                return val;
            }
        };
        LocalStorage.prototype.remove = function (key) {
            localStorage.removeItem(this.makeKey(key));
        };
        LocalStorage.prototype.makeKey = function (key) {
            if (this.prefix && key.indexOf(this.prefix) !== 0) {
                key = this.prefix + "_" + key;
            }
            if (this.suffix) {
                key = key + "_" + this.suffix;
            }
            return key;
        };
        LocalStorage.prototype.isValidJSON = function (val) {
            try {
                var json = JSON.parse(val);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        return LocalStorage;
    }());
    ipushpull.module.service("ippUserStorageService", ["ippAuthService", "ipushpull_conf", function (ippAuth, config) {
            var storage = new LocalStorage();
            storage.suffix = "GUEST";
            if (config.storage_prefix) {
                storage.prefix = config.storage_prefix;
            }
            ippAuth.on("logged_in", function () {
                storage.suffix = "" + ippAuth.user.id;
            });
            return storage;
        }]);
    ipushpull.module.service("ippGlobalStorageService", ["ipushpull_conf", function (config) {
            var storage = new LocalStorage();
            if (config.storage_prefix) {
                storage.prefix = config.storage_prefix;
            }
            return storage;
        }]);
})(ipushpull || (ipushpull = {}));
