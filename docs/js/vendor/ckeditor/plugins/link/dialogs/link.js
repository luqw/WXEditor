/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/

!function(){CKEDITOR.dialog.add("link",function(e){var t,i=CKEDITOR.plugins.link,l=function(){var t=this.getDialog(),i=t.getContentElement("target","popupFeatures"),t=t.getContentElement("target","linkTargetName"),l=this.getValue();if(i&&t)switch(i=i.getElement(),i.hide(),t.setValue(""),l){case"frame":t.setLabel(e.lang.link.targetFrameName),t.getElement().show();break;case"popup":i.show(),t.setLabel(e.lang.link.targetPopupName),t.getElement().show();break;default:t.setValue(l),t.getElement().hide()}},a=function(e){e.target&&this.setValue(e.target[this.id]||"")},n=function(e){e.advanced&&this.setValue(e.advanced[this.id]||"")},o=function(e){e.target||(e.target={}),e.target[this.id]=this.getValue()||""},s=function(e){e.advanced||(e.advanced={}),e.advanced[this.id]=this.getValue()||""},d=e.lang.common,r=e.lang.link;return{title:r.title,minWidth:350,minHeight:230,contents:[{id:"info",label:r.info,title:r.info,elements:[{id:"linkType",type:"select",label:r.type,"default":"url",items:[[r.toUrl,"url"],[r.toAnchor,"anchor"],[r.toEmail,"email"]],onChange:function(){var t=this.getDialog(),i=["urlOptions","anchorOptions","emailOptions"],l=this.getValue(),a=t.definition.getContents("upload"),a=a&&a.hidden;for("url"==l?(e.config.linkShowTargetTab&&t.showPage("target"),a||t.showPage("upload")):(t.hidePage("target"),a||t.hidePage("upload")),a=0;a<i.length;a++){var n=t.getContentElement("info",i[a]);n&&(n=n.getElement().getParent().getParent(),i[a]==l+"Options"?n.show():n.hide())}t.layout()},setup:function(e){this.setValue(e.type||"url")},commit:function(e){e.type=this.getValue()}},{type:"vbox",id:"urlOptions",children:[{type:"hbox",widths:["25%","75%"],children:[{id:"protocol",type:"select",label:d.protocol,"default":"http://",items:[["http://‎","http://"],["https://‎","https://"],["ftp://‎","ftp://"],["news://‎","news://"],[r.other,""]],setup:function(e){e.url&&this.setValue(e.url.protocol||"")},commit:function(e){e.url||(e.url={}),e.url.protocol=this.getValue()}},{type:"text",id:"url",label:d.url,required:!0,onLoad:function(){this.allowOnChange=!0},onKeyUp:function(){this.allowOnChange=!1;var e=this.getDialog().getContentElement("info","protocol"),t=this.getValue(),i=/^((javascript:)|[#\/\.\?])/i,l=/^(http|https|ftp|news):\/\/(?=.)/i.exec(t);l?(this.setValue(t.substr(l[0].length)),e.setValue(l[0].toLowerCase())):i.test(t)&&e.setValue(""),this.allowOnChange=!0},onChange:function(){this.allowOnChange&&this.onKeyUp()},validate:function(){var t=this.getDialog();return t.getContentElement("info","linkType")&&"url"!=t.getValueOf("info","linkType")?!0:!e.config.linkJavaScriptLinksAllowed&&/javascript\:/.test(this.getValue())?(alert(d.invalidValue),!1):this.getDialog().fakeObj?!0:CKEDITOR.dialog.validate.notEmpty(r.noUrl).apply(this)},setup:function(e){this.allowOnChange=!1,e.url&&this.setValue(e.url.url),this.allowOnChange=!0},commit:function(e){this.onChange(),e.url||(e.url={}),e.url.url=this.getValue(),this.allowOnChange=!1}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().show()}},{type:"button",id:"browse",hidden:"true",filebrowser:"info:url",label:d.browseServer}]},{type:"vbox",id:"anchorOptions",width:260,align:"center",padding:0,children:[{type:"fieldset",id:"selectAnchorText",label:r.selectAnchor,setup:function(){t=i.getEditorAnchors(e),this.getElement()[t&&t.length?"show":"hide"]()},children:[{type:"hbox",id:"selectAnchor",children:[{type:"select",id:"anchorName","default":"",label:r.anchorName,style:"width: 100%;",items:[[""]],setup:function(e){if(this.clear(),this.add(""),t)for(var i=0;i<t.length;i++)t[i].name&&this.add(t[i].name);e.anchor&&this.setValue(e.anchor.name),(e=this.getDialog().getContentElement("info","linkType"))&&"email"==e.getValue()&&this.focus()},commit:function(e){e.anchor||(e.anchor={}),e.anchor.name=this.getValue()}},{type:"select",id:"anchorId","default":"",label:r.anchorId,style:"width: 100%;",items:[[""]],setup:function(e){if(this.clear(),this.add(""),t)for(var i=0;i<t.length;i++)t[i].id&&this.add(t[i].id);e.anchor&&this.setValue(e.anchor.id)},commit:function(e){e.anchor||(e.anchor={}),e.anchor.id=this.getValue()}}],setup:function(){this.getElement()[t&&t.length?"show":"hide"]()}}]},{type:"html",id:"noAnchors",style:"text-align: center;",html:'<div role="note" tabIndex="-1">'+CKEDITOR.tools.htmlEncode(r.noAnchors)+"</div>",focus:!0,setup:function(){this.getElement()[t&&t.length?"hide":"show"]()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}},{type:"vbox",id:"emailOptions",padding:1,children:[{type:"text",id:"emailAddress",label:r.emailAddress,required:!0,validate:function(){var e=this.getDialog();return e.getContentElement("info","linkType")&&"email"==e.getValueOf("info","linkType")?CKEDITOR.dialog.validate.notEmpty(r.noEmail).apply(this):!0},setup:function(e){e.email&&this.setValue(e.email.address),(e=this.getDialog().getContentElement("info","linkType"))&&"email"==e.getValue()&&this.select()},commit:function(e){e.email||(e.email={}),e.email.address=this.getValue()}},{type:"text",id:"emailSubject",label:r.emailSubject,setup:function(e){e.email&&this.setValue(e.email.subject)},commit:function(e){e.email||(e.email={}),e.email.subject=this.getValue()}},{type:"textarea",id:"emailBody",label:r.emailBody,rows:3,"default":"",setup:function(e){e.email&&this.setValue(e.email.body)},commit:function(e){e.email||(e.email={}),e.email.body=this.getValue()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}}]},{id:"target",requiredContent:"a[target]",label:r.target,title:r.target,elements:[{type:"hbox",widths:["50%","50%"],children:[{type:"select",id:"linkTargetType",label:d.target,"default":"notSet",style:"width : 100%;",items:[[d.notSet,"notSet"],[r.targetFrame,"frame"],[r.targetPopup,"popup"],[d.targetNew,"_blank"],[d.targetTop,"_top"],[d.targetSelf,"_self"],[d.targetParent,"_parent"]],onChange:l,setup:function(e){e.target&&this.setValue(e.target.type||"notSet"),l.call(this)},commit:function(e){e.target||(e.target={}),e.target.type=this.getValue()}},{type:"text",id:"linkTargetName",label:r.targetFrameName,"default":"",setup:function(e){e.target&&this.setValue(e.target.name)},commit:function(e){e.target||(e.target={}),e.target.name=this.getValue().replace(/\W/gi,"")}}]},{type:"vbox",width:"100%",align:"center",padding:2,id:"popupFeatures",children:[{type:"fieldset",label:r.popupFeatures,children:[{type:"hbox",children:[{type:"checkbox",id:"resizable",label:r.popupResizable,setup:a,commit:o},{type:"checkbox",id:"status",label:r.popupStatusBar,setup:a,commit:o}]},{type:"hbox",children:[{type:"checkbox",id:"location",label:r.popupLocationBar,setup:a,commit:o},{type:"checkbox",id:"toolbar",label:r.popupToolbar,setup:a,commit:o}]},{type:"hbox",children:[{type:"checkbox",id:"menubar",label:r.popupMenuBar,setup:a,commit:o},{type:"checkbox",id:"fullscreen",label:r.popupFullScreen,setup:a,commit:o}]},{type:"hbox",children:[{type:"checkbox",id:"scrollbars",label:r.popupScrollBars,setup:a,commit:o},{type:"checkbox",id:"dependent",label:r.popupDependent,setup:a,commit:o}]},{type:"hbox",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:d.width,id:"width",setup:a,commit:o},{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:r.popupLeft,id:"left",setup:a,commit:o}]},{type:"hbox",children:[{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:d.height,id:"height",setup:a,commit:o},{type:"text",labelLayout:"horizontal",label:r.popupTop,widths:["50%","50%"],id:"top",setup:a,commit:o}]}]}]}]},{id:"upload",label:r.upload,title:r.upload,hidden:!0,filebrowser:"uploadButton",elements:[{type:"file",id:"upload",label:d.upload,style:"height:40px",size:29},{type:"fileButton",id:"uploadButton",label:d.uploadSubmit,filebrowser:"info:url","for":["upload","upload"]}]},{id:"advanced",label:r.advanced,title:r.advanced,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",id:"advId",requiredContent:"a[id]",label:r.id,setup:n,commit:s},{type:"select",id:"advLangDir",requiredContent:"a[dir]",label:r.langDir,"default":"",style:"width:110px",items:[[d.notSet,""],[r.langDirLTR,"ltr"],[r.langDirRTL,"rtl"]],setup:n,commit:s},{type:"text",id:"advAccessKey",requiredContent:"a[accesskey]",width:"80px",label:r.acccessKey,maxLength:1,setup:n,commit:s}]},{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",label:r.name,id:"advName",requiredContent:"a[name]",setup:n,commit:s},{type:"text",label:r.langCode,id:"advLangCode",requiredContent:"a[lang]",width:"110px","default":"",setup:n,commit:s},{type:"text",label:r.tabIndex,id:"advTabIndex",requiredContent:"a[tabindex]",width:"80px",maxLength:5,setup:n,commit:s}]}]},{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:r.advisoryTitle,requiredContent:"a[title]","default":"",id:"advTitle",setup:n,commit:s},{type:"text",label:r.advisoryContentType,requiredContent:"a[type]","default":"",id:"advContentType",setup:n,commit:s}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:r.cssClasses,requiredContent:"a(cke-xyz)","default":"",id:"advCSSClasses",setup:n,commit:s},{type:"text",label:r.charset,requiredContent:"a[charset]","default":"",id:"advCharset",setup:n,commit:s}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:r.rel,requiredContent:"a[rel]","default":"",id:"advRel",setup:n,commit:s},{type:"text",label:r.styles,requiredContent:"a{cke-xyz}","default":"",id:"advStyles",validate:CKEDITOR.dialog.validate.inlineStyle(e.lang.common.invalidInlineStyle),setup:n,commit:s}]}]}]}],onShow:function(){var e=this.getParentEditor(),t=e.getSelection(),l=null;(l=i.getSelectedLink(e))&&l.hasAttribute("href")?t.getSelectedElement()||t.selectElement(l):l=null,e=i.parseLinkAttributes(e,l),this._.selectedElement=l,this.setupContent(e)},onOk:function(){var t={};this.commitContent(t);var l=e.getSelection(),a=i.getLinkAttributes(e,t);if(this._.selectedElement){var n=this._.selectedElement,o=n.data("cke-saved-href"),s=n.getHtml();n.setAttributes(a.set),n.removeAttributes(a.removed),(o==s||"email"==t.type&&-1!=s.indexOf("@"))&&(n.setHtml("email"==t.type?t.email.address:a.set["data-cke-saved-href"]),l.selectElement(n)),delete this._.selectedElement}else l=l.getRanges()[0],l.collapsed&&(t=new CKEDITOR.dom.text("email"==t.type?t.email.address:a.set["data-cke-saved-href"],e.document),l.insertNode(t),l.selectNodeContents(t)),a=new CKEDITOR.style({element:"a",attributes:a.set}),a.type=CKEDITOR.STYLE_INLINE,a.applyToRange(l,e),l.select()},onLoad:function(){e.config.linkShowAdvancedTab||this.hidePage("advanced"),e.config.linkShowTargetTab||this.hidePage("target")},onFocus:function(){var e=this.getContentElement("info","linkType");e&&"url"==e.getValue()&&(e=this.getContentElement("info","url"),e.select())}}})}();