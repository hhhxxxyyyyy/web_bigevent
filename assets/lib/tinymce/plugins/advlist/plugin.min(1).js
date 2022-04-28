!function(){"use strict";var t=tinymce.util.Tools.resolve("tinymce.PluginManager"),e=tinymce.util.Tools.resolve("tinymce.util.Tools"),n=function(t,e,n){var r="UL"===e?"InsertUnorderedList":"InsertOrderedList";t.execCommand(r,!1,!1===n?null:{"list-style-type":n})},r=function(t){t.addCommand("ApplyUnorderedListStyle",function(e,r){n(t,"UL",r["list-style-type"])}),t.addCommand("ApplyOrderedListStyle",function(e,r){n(t,"OL",r["list-style-type"])})},o=function(t){var e=t.getParam("advlist_number_styles","default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman");return e?e.split(/[ ,]/):[]},i=function(t){var e=t.getParam("advlist_bullet_styles","default,circle,disc,square");return e?e.split(/[ ,]/):[]},l=function(t){return t&&/^(TH|TD)$/.test(t.nodeName)},a=function(t){return function(e){return e&&/^(OL|UL|DL)$/.test(e.nodeName)&&(r=e,(n=t).$.contains(n.getBody(),r));var n,r}},s=function(t){var e=t.dom.getParent(t.selection.getNode(),"ol,ul");return t.dom.getStyle(e,"listStyleType")||""},u=function(t){return e.map(t,function(t){return{text:t.replace(/\-/g," ").replace(/\b\w/g,function(t){return t.toUpperCase()}),data:"default"===t?"":t}})},c=function(t,n){return function(r){var o=r.control;t.on("NodeChange",function(r){var i=function(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n;return-1}(r.parents,l),s=-1!==i?r.parents.slice(0,i):r.parents,u=e.grep(s,a(t));o.active(u.length>0&&u[0].nodeName===n)})}},d=function(t,e,r,o,i,l){var a;t.addButton(e,{active:!1,type:"splitbutton",tooltip:r,menu:u(l),onPostRender:c(t,i),onshow:(a=t,function(t){var e=s(a);t.control.items().each(function(t){t.active(t.settings.data===e)})}),onselect:function(e){n(t,i,e.control.settings.data)},onclick:function(){t.execCommand(o)}})},p=function(t,e,n,r,o,i){var l,a,s,u,p;i.length>0?d(t,e,n,r,o,i):(a=e,s=n,u=r,p=o,(l=t).addButton(a,{active:!1,type:"button",tooltip:s,onPostRender:c(l,p),onclick:function(){l.execCommand(u)}}))},f=function(t){p(t,"numlist","Numbered list","InsertOrderedList","OL",o(t)),p(t,"bullist","Bullet list","InsertUnorderedList","UL",i(t))};t.add("advlist",function(t){var n,o,i;o="lists",i=(n=t).settings.plugins?n.settings.plugins:"",-1!==e.inArray(i.split(/[ ,]/),o)&&(f(t),r(t))})}();