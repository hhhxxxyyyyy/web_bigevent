!function(){"use strict";var t=function(e){var n=e,r=function(){return n};return{get:r,set:function(t){n=t},clone:function(){return t(r())}}},e=tinymce.util.Tools.resolve("tinymce.PluginManager"),n=function(t){return{setPatterns:function(e){t.set(e)},getPatterns:function(){return t.get()}}},r=[{start:"*",end:"*",format:"italic"},{start:"**",end:"**",format:"bold"},{start:"***",end:"***",format:["bold","italic"]},{start:"#",format:"h1"},{start:"##",format:"h2"},{start:"###",format:"h3"},{start:"####",format:"h4"},{start:"#####",format:"h5"},{start:"######",format:"h6"},{start:"1. ",cmd:"InsertOrderedList"},{start:"* ",cmd:"InsertUnorderedList"},{start:"- ",cmd:"InsertUnorderedList"}],a=function(t){return t.textpattern_patterns!==undefined?t.textpattern_patterns:r},o=tinymce.util.Tools.resolve("tinymce.util.Delay"),i=tinymce.util.Tools.resolve("tinymce.util.VK"),s=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),l=tinymce.util.Tools.resolve("tinymce.util.Tools"),d=function(t,e){for(var n=0;n<t.length;n++)if(0===e.indexOf(t[n].start)&&(!t[n].end||e.lastIndexOf(t[n].end)===e.length-t[n].end.length))return t[n]},f=function(t,e,n,r){var a,o,i,s,l,d,f=t.sort(function(t,e){return t.start.length>e.start.length?-1:t.start.length<e.start.length?1:0});for(o=0;o<f.length;o++)if((a=f[o]).end!==undefined&&(s=a,l=n,d=r,e.substr(l-s.end.length-d,s.end.length)===s.end)&&n-r-(i=a).end.length-i.start.length>0)return a},c=function(t,e,n){if(!1!==e.collapsed){var r=e.startContainer,a=r.data,o=!0===n?1:0;if(3===r.nodeType){var i=f(t,a,e.startOffset,o);if(i!==undefined){var s=a.lastIndexOf(i.end,e.startOffset-o),l=a.lastIndexOf(i.start,s-i.end.length);if(s=a.indexOf(i.end,l+i.start.length),-1!==l){var c=document.createRange();c.setStart(r,l),c.setEnd(r,s+i.end.length);var u=d(t,c.toString());if(!(i===undefined||u!==i||r.data.length<=i.start.length+i.end.length))return{pattern:i,startOffset:l,endOffset:s}}}}}},u=function(t,e,n){var r=t.selection.getRng(!0),a=c(e,r,n);if(a)return function(t,e,n,r){var a=l.isArray(n.pattern.format)?n.pattern.format:[n.pattern.format];if(0!==l.grep(a,function(e){var n=t.formatter.get(e);return n&&n[0].inline}).length)return t.undoManager.transact(function(){var r,o,i,s;r=e,o=n.pattern,i=n.endOffset,s=n.startOffset,(r=s>0?r.splitText(s):r).splitText(i-s+o.end.length),r.deleteData(0,o.start.length),r.deleteData(r.data.length-o.end.length,o.end.length),e=r,a.forEach(function(n){t.formatter.apply(n,{},e)})}),e}(t,r.startContainer,a)},g={patternFromRng:c,applyInlineFormatSpace:function(t,e){return u(t,e,!0)},applyInlineFormatEnter:function(t,e){return u(t,e,!1)},applyBlockFormat:function(t,e){var n,r,a,o,i,f,c,u,g,h,m;if(n=t.selection,r=t.dom,n.isCollapsed()&&(c=r.getParent(n.getStart(),"p"))){for(g=new s(c,c);i=g.next();)if(3===i.nodeType){o=i;break}if(o){if(!(u=d(e,o.data)))return;if(a=(h=n.getRng(!0)).startContainer,m=h.startOffset,o===a&&(m=Math.max(0,m-u.start.length)),l.trim(o.data).length===u.start.length)return;u.format&&(f=t.formatter.get(u.format))&&f[0].block&&(o.deleteData(0,u.start.length),t.formatter.apply(u.format,{},o),h.setStart(a,m),h.collapse(!0),n.setRng(h)),u.cmd&&t.undoManager.transact(function(){o.deleteData(0,u.start.length),t.execCommand(u.cmd)})}}}},h=function(t,e,n){for(var r=0;r<t.length;r++)if(n(t[r],e))return!0},m={handleEnter:function(t,e){var n,r;(n=g.applyInlineFormatEnter(t,e))&&((r=t.dom.createRng()).setStart(n,n.data.length),r.setEnd(n,n.data.length),t.selection.setRng(r)),g.applyBlockFormat(t,e)},handleInlineKey:function(t,e){var n,r,a,o,i;(n=g.applyInlineFormatSpace(t,e))&&(i=t.dom,r=n.data.slice(-1),/[\u00a0 ]/.test(r)&&(n.deleteData(n.data.length-1,1),a=i.doc.createTextNode(r),i.insertAfter(a,n.parentNode),(o=i.createRng()).setStart(a,1),o.setEnd(a,1),t.selection.setRng(o)))},checkCharCode:function(t,e){return h(t,e,function(t,e){return t.charCodeAt(0)===e.charCode})},checkKeyCode:function(t,e){return h(t,e,function(t,e){return t===e.keyCode&&!1===i.modifierPressed(e)})}},p=function(t,e){var n=[",",".",";",":","!","?"],r=[32];t.on("keydown",function(n){13!==n.keyCode||i.modifierPressed(n)||m.handleEnter(t,e.get())},!0),t.on("keyup",function(n){m.checkKeyCode(r,n)&&m.handleInlineKey(t,e.get())}),t.on("keypress",function(r){m.checkCharCode(n,r)&&o.setEditorTimeout(t,function(){m.handleInlineKey(t,e.get())})})};e.add("textpattern",function(e){var r=t(a(e.settings));return p(e,r),n(r)})}();