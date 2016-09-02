/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

function Notification(t,e){CKEDITOR.tools.extend(this,e,{editor:t,id:"cke-"+CKEDITOR.tools.getUniqueId(),area:t._.notificationArea}),e.type||(this.type="info"),this.element=this._createElement(),t.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)}function Area(t){var e=this;this.editor=t,this.notifications=[],this.element=this._createElement(),this._uiBuffer=CKEDITOR.tools.eventsBuffer(10,this._layout,this),this._changeBuffer=CKEDITOR.tools.eventsBuffer(500,this._layout,this),t.on("destroy",function(){e._removeListeners(),e.element.remove()})}CKEDITOR.plugins.add("notification",{lang:"cs,da,de,en,eo,fr,gl,it,ko,ku,nb,nl,pl,pt-br,ru,sv,tr,ug,zh,zh-cn",requires:"toolbar",init:function(t){function e(t){var e=new CKEDITOR.dom.element("div");e.setStyles({position:"fixed","margin-left":"-9999px"}),e.setAttributes({"aria-live":"assertive","aria-atomic":"true"}),e.setText(t),CKEDITOR.document.getBody().append(e),setTimeout(function(){e.remove()},100)}t._.notificationArea=new Area(t),t.showNotification=function(e,i,o){var n,s;"progress"==i?n=o:s=o;var r=new CKEDITOR.plugins.notification(t,{message:e,type:i,progress:n,duration:s});return r.show(),r},t.on("key",function(i){if(27==i.data.keyCode){var o=t._.notificationArea.notifications;if(!o.length)return;e(t.lang.notification.closed),o[o.length-1].hide(),i.cancel()}})}}),Notification.prototype={show:function(){this.editor.fire("notificationShow",{notification:this})!==!1&&(this.area.add(this),this._hideAfterTimeout())},update:function(t){var e=!0;this.editor.fire("notificationUpdate",{notification:this,options:t})===!1&&(e=!1);var i=this.element,o=i.findOne(".cke_notification_message"),n=i.findOne(".cke_notification_progress"),s=t.type;i.removeAttribute("role"),t.progress&&"progress"!=this.type&&(s="progress"),s&&(i.removeClass(this._getClass()),i.removeAttribute("aria-label"),this.type=s,i.addClass(this._getClass()),i.setAttribute("aria-label",this.type),"progress"!=this.type||n?"progress"!=this.type&&n&&n.remove():(n=this._createProgressElement(),n.insertBefore(o))),void 0!==t.message&&(this.message=t.message,o.setHtml(this.message)),void 0!==t.progress&&(this.progress=t.progress,n&&n.setStyle("width",this._getPercentageProgress())),e&&t.important&&(i.setAttribute("role","alert"),this.isVisible()||this.area.add(this)),this.duration=t.duration,this._hideAfterTimeout()},hide:function(){this.editor.fire("notificationHide",{notification:this})!==!1&&this.area.remove(this)},isVisible:function(){return CKEDITOR.tools.indexOf(this.area.notifications,this)>=0},_createElement:function(){var t,e,i,o=this,n=this.editor.lang.common.close;return t=new CKEDITOR.dom.element("div"),t.addClass("cke_notification"),t.addClass(this._getClass()),t.setAttributes({id:this.id,role:"alert","aria-label":this.type}),"progress"==this.type&&t.append(this._createProgressElement()),e=new CKEDITOR.dom.element("p"),e.addClass("cke_notification_message"),e.setHtml(this.message),t.append(e),i=CKEDITOR.dom.element.createFromHtml('<a class="cke_notification_close" href="javascript:void(0)" title="'+n+'" role="button" tabindex="-1"><span class="cke_label">X</span></a>'),t.append(i),i.on("click",function(){o.editor.focus(),o.hide()}),t},_getClass:function(){return"progress"==this.type?"cke_notification_info":"cke_notification_"+this.type},_createProgressElement:function(){var t=new CKEDITOR.dom.element("span");return t.addClass("cke_notification_progress"),t.setStyle("width",this._getPercentageProgress()),t},_getPercentageProgress:function(){return Math.round(100*(this.progress||0))+"%"},_hideAfterTimeout:function(){var t,e=this;this._hideTimeoutId&&clearTimeout(this._hideTimeoutId),"number"==typeof this.duration?t=this.duration:("info"==this.type||"success"==this.type)&&(t="number"==typeof this.editor.config.notification_duration?this.editor.config.notification_duration:5e3),t&&(e._hideTimeoutId=setTimeout(function(){e.hide()},t))}},Area.prototype={add:function(t){this.notifications.push(t),this.element.append(t.element),1==this.element.getChildCount()&&(CKEDITOR.document.getBody().append(this.element),this._attachListeners()),this._layout()},remove:function(t){var e=CKEDITOR.tools.indexOf(this.notifications,t);0>e||(this.notifications.splice(e,1),t.element.remove(),this.element.getChildCount()||(this._removeListeners(),this.element.remove()))},_createElement:function(){var t=this.editor,e=t.config,i=new CKEDITOR.dom.element("div");return i.addClass("cke_notifications_area"),i.setAttribute("id","cke_notifications_area_"+t.name),i.setStyle("z-index",e.baseFloatZIndex-2),i},_attachListeners:function(){var t=CKEDITOR.document.getWindow(),e=this.editor;t.on("scroll",this._uiBuffer.input),t.on("resize",this._uiBuffer.input),e.on("change",this._changeBuffer.input),e.on("floatingSpaceLayout",this._layout,this,null,20),e.on("blur",this._layout,this,null,20)},_removeListeners:function(){var t=CKEDITOR.document.getWindow(),e=this.editor;t.removeListener("scroll",this._uiBuffer.input),t.removeListener("resize",this._uiBuffer.input),e.removeListener("change",this._changeBuffer.input),e.removeListener("floatingSpaceLayout",this._layout),e.removeListener("blur",this._layout)},_layout:function(){function t(){c.setStyles({position:"absolute",top:I(d.y)})}function e(){c.setStyles({position:"fixed",top:I(p.bottom)})}function i(){c.setStyles({position:"fixed",top:0})}function o(){c.setStyles({position:"absolute",top:I(d.y+f.height-g.height)})}function n(){c.setStyle("left",I(w))}function s(){c.setStyle("left",I(w-d.x+C.x))}function r(){c.setStyle("left",I(w+f.width/2-_/2-y/2))}function a(){c.setStyle("left",I(w+f.width-_-y))}function h(){c.setStyle("left",I(w-d.x+C.x+E.width-_-y))}var l,c=this.element,u=this.editor,f=u.ui.contentsElement.getClientRect(),d=u.ui.contentsElement.getDocumentPosition(),m=u.ui.space("top"),p=m.getClientRect(),g=c.getClientRect(),_=this._notificationWidth,y=this._notificationMargin,v=CKEDITOR.document.getWindow(),C=v.getScrollPosition(),E=v.getViewPaneSize(),T=CKEDITOR.document.getBody(),b=T.getDocumentPosition(),I=CKEDITOR.tools.cssLength;_&&y||(l=this.element.getChild(0),_=this._notificationWidth=l.getClientRect().width,y=this._notificationMargin=parseInt(l.getComputedStyle("margin-left"),10)+parseInt(l.getComputedStyle("margin-right"),10)),m.isVisible()&&p.bottom>f.top&&p.bottom<f.bottom-g.height?e():f.top>0?t():d.y+f.height-g.height>C.y?i():o();var w="fixed"==c.getStyle("position")?f.left:"static"!=T.getComputedStyle("position")?d.x-b.x:d.x;f.width<_+y?d.x+_+y>C.x+E.width?a():n():d.x+_+y>C.x+E.width?n():d.x+f.width/2+_/2+y>C.x+E.width?h():f.left+f.width-_-y<0?a():f.left+f.width/2-_/2<0?s():r()}},CKEDITOR.plugins.notification=Notification;