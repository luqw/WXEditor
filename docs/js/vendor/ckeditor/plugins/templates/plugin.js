/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

!function(){CKEDITOR.plugins.add("templates",{requires:"dialog",lang:"af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",icons:"templates,templates-rtl",hidpi:!0,init:function(t){CKEDITOR.dialog.add("templates",CKEDITOR.getUrl(this.path+"dialogs/templates.js")),t.addCommand("templates",new CKEDITOR.dialogCommand("templates")),t.ui.addButton&&t.ui.addButton("Templates",{label:t.lang.templates.button,command:"templates",toolbar:"doctools,10"})}});var t={},e={};CKEDITOR.addTemplates=function(e,a){t[e]=a},CKEDITOR.getTemplates=function(e){return t[e]},CKEDITOR.loadTemplates=function(t,a){for(var l=[],s=0,n=t.length;n>s;s++)e[t[s]]||(l.push(t[s]),e[t[s]]=1);l.length?CKEDITOR.scriptLoader.load(l,a):setTimeout(a,0)}}(),CKEDITOR.config.templates_files=[CKEDITOR.getUrl("plugins/templates/templates/default.js")],CKEDITOR.config.templates_replaceContent=!0;