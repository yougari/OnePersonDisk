"use strict";(self["webpackChunkvue"]=self["webpackChunkvue"]||[]).push([[114],{1114:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var l=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"search"},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入名称查询"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),t("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"info",plain:""},on:{click:function(t){return e.load(1)}}},[e._v("查询")]),t("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"warning",plain:""},on:{click:e.reset}},[e._v("重置")])],1),t("div",{staticClass:"operation"},[t("el-button",{attrs:{type:"danger",plain:""},on:{click:e.delBatch}},[e._v("批量删除")])],1),t("div",{staticClass:"table"},[t("el-table",{attrs:{data:e.tableData,strip:""},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t("el-table-column",{attrs:{prop:"id",label:"序号",width:"70",align:"center",sortable:""}}),t("el-table-column",{attrs:{prop:"name",label:"名称"}}),t("el-table-column",{attrs:{prop:"fileId",label:"文件ID"}}),t("el-table-column",{attrs:{prop:"shareTime",label:"分享时间"}}),t("el-table-column",{attrs:{prop:"endTime",label:"到期时间"}}),t("el-table-column",{attrs:{prop:"count",label:"访问次数"}}),t("el-table-column",{attrs:{prop:"userId",label:"分享人ID"}}),t("el-table-column",{attrs:{prop:"userName",label:"分享人"}}),t("el-table-column",{attrs:{prop:"code",label:"验证码"}}),t("el-table-column",{attrs:{label:"操作",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(t){return e.del(a.row.id)}}},[e._v("删除")])]}}])})],1),t("div",{staticClass:"pagination"},[t("el-pagination",{attrs:{background:"","current-page":e.pageNum,"page-sizes":[5,10,20],"page-size":e.pageSize,layout:"total, prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)])},s=[],n={name:"Share",data(){return{tableData:[],pageNum:1,pageSize:10,total:0,name:null,user:JSON.parse(localStorage.getItem("xm-user")||"{}"),ids:[]}},created(){this.load(1)},methods:{del(e){this.$confirm("您确定删除吗？","确认删除",{type:"warning"}).then((t=>{this.$request.delete("/share/delete/"+e).then((e=>{"200"===e.code?(this.$message.success("操作成功"),this.load(1)):this.$message.error(e.msg)}))})).catch((()=>{}))},handleSelectionChange(e){this.ids=e.map((e=>e.id))},delBatch(){this.ids.length?this.$confirm("您确定批量删除这些数据吗？","确认删除",{type:"warning"}).then((e=>{this.$request.delete("/share/delete/batch",{data:this.ids}).then((e=>{"200"===e.code?(this.$message.success("操作成功"),this.load(1)):this.$message.error(e.msg)}))})).catch((()=>{})):this.$message.warning("请选择数据")},load(e){e&&(this.pageNum=e),this.$request.get("/share/selectPage",{params:{pageNum:this.pageNum,pageSize:this.pageSize,name:this.name}}).then((e=>{this.tableData=e.data?.list,this.total=e.data?.total}))},reset(){this.name=null,this.load(1)},handleCurrentChange(e){this.load(e)}}},i=n,r=a(3736),o=(0,r.Z)(i,l,s,!1,null,"8c110760",null),c=o.exports}}]);
//# sourceMappingURL=114.0975046e.js.map