"use strict";(self["webpackChunkvue"]=self["webpackChunkvue"]||[]).push([[692],{4692:function(e,t,i){i.r(t),i.d(t,{default:function(){return d}});var a=function(){var e=this,t=e._self._c;return t("div",[e.validateFailed?t("div",{staticStyle:{margin:"150px auto","text-align":"center","font-size":"30px",color:"#666"}},[e._v("分享文件不存在或已被取消")]):t("div",{staticClass:"card",staticStyle:{margin:"5px auto 100px auto",width:"70%"}},[t("div",{staticStyle:{color:"#666",display:"flex","align-items":"center"}},[e._v(" 分享："),t("strong",{staticStyle:{color:"#333"}},[e._v(e._s(e.share.name))]),t("i",{staticClass:"el-icon-time",staticStyle:{"margin-left":"20px","margin-right":"5px"}}),e._v(" "+e._s(e.share.shareTime)+" "),t("span",{staticStyle:{"margin-left":"20px"}},[t("i",{staticClass:"el-icon-info",staticStyle:{"margin-right":"5px"}}),e.share.status?.includes("小时")?t("span",{staticStyle:{color:"red"}},[e._v(e._s(e.share.status))]):t("span",[e._v(e._s(e.share.status))])])]),t("div",[t("div",{staticStyle:{padding:"15px 0","margin-top":"30px"}},[t("a",{staticStyle:{color:"#666"},attrs:{href:"/front/openShare?code="+e.code+"&shareId="+e.shareId}},[e._v("全部文件 "),e.folders.length?t("i",{staticClass:"el-icon-arrow-right"}):e._e()]),e._l(e.folders,(function(i,a){return t("a",{key:i.id,staticStyle:{color:"#666"},attrs:{href:"/front/openShare?code="+e.code+"&shareId="+e.shareId+"&folderId="+i.id}},[e._v(" "+e._s(i.name)+" "),a!==e.folders.length-1?t("i",{staticClass:"el-icon-arrow-right"}):e._e()])}))],2),t("el-table",{attrs:{size:"medium",stripe:"",data:e.tableData}},[t("el-table-column",{attrs:{label:"名称"},scopedSlots:e._u([{key:"default",fn:function(i){return[t("div",{staticStyle:{display:"flex",cursor:"pointer"},on:{click:function(t){return e.openFile(i.row)}}},[t("div",{staticStyle:{flex:"1"}},[t("i",{class:e.typeList.find((e=>e.text===i.row.type))?.icon||"el-icon-file",staticStyle:{color:"#409EFF"}}),i.row.unSave?e._e():t("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(i.row.name))])]),t("div",{staticStyle:{color:"#409EFF","font-size":"14px"}},["否"===i.row.folder?t("el-tooltip",{attrs:{content:"下载",effect:"light","open-delay":1e3}},[t("i",{staticClass:"el-icon-download",staticStyle:{"margin-right":"10px",cursor:"pointer"},on:{click:function(t){return t.stopPropagation(),e.download(i.row.file)}}})]):e._e()],1)])]}}])}),t("el-table-column",{attrs:{prop:"updateTime",label:"修改时间",width:"200"}}),t("el-table-column",{attrs:{prop:"size",label:"文件大小（KB）",width:"200"}})],1)],1)])])},s=[],l={name:"OpenShare",data(){return{code:this.$route.query.code,shareId:this.$route.query.shareId,share:{},validateFailed:!1,folders:[],typeList:[{text:"mp3",icon:"el-icon-mp3"},{text:"mp4",icon:"el-icon-mp4"},{text:"jpg",icon:"el-icon-jpg"},{text:"jpeg",icon:"el-icon-jpeg"},{text:"png",icon:"el-icon-png"},{text:"pdf",icon:"el-icon-pdf"},{text:"docx",icon:"el-icon-docx"},{text:"txt",icon:"el-icon-text"},{text:"zip",icon:"el-icon-zip"},{text:"folder",icon:"el-icon-folder"}],tableData:[],folderId:this.$route.query.folderId}},created(){this.code&&this.shareId?this.load():this.validateFailed=!0},methods:{openFile(e){"是"===e.folder?location.href="/front/openShare?code="+this.code+"&shareId="+this.shareId+"&folderId="+e.id:window.open(this.$baseUrl+"/diskFiles/preview/"+e.id)},download(e){window.open(e)},load(){this.$request.get("/share/selectById/"+this.shareId).then((e=>{this.share=e.data||{},this.tableData=e.data?[e.data]:[],"已过期"===this.share.status&&(this.validateFailed=!0),this.share.code!==this.code?this.validateFailed=!0:this.loadFiles()}))},loadFiles(){this.$request.get("/diskFiles/selectShare",{params:{shareId:this.shareId||null,folderId:this.folderId||null}}).then((e=>{this.tableData=e.data||[]})),this.$request.get("/diskFiles/selectFolders",{params:{folderId:this.folderId||null}}).then((e=>{this.folders=e.data||[]}))}}},o=l,r=i(3736),n=(0,r.Z)(o,a,s,!1,null,"aeeb4f92",null),d=n.exports}}]);
//# sourceMappingURL=692.b62e10c1.js.map