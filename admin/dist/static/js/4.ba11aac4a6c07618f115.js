webpackJsonp([4],{"86QN":function(t,e){},EgQe:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),a=n.n(r),i=n("exGp"),c=n.n(i),o=n("Dd8w"),s=n.n(o),u=n("NYxO"),l={name:"list",data:function(){return{isCreateChapter:!1,isUpdateChapter:!1,column_chapter_id:this.$route.params.column_chapter_id,loading:!0,chapterTitle:"",chapterId:-1,zIndex:9999,list:[],columns:[{title:"ID",key:"id",width:80,align:"center"},{title:"文章标题",key:"title"},{title:"文章作者",key:"author"},{title:"操作",slot:"action",width:200,align:"center"}]}},created:function(){this.fetchData()},methods:s()({},Object(u.b)({getSectionList:"section/list",destroySection:"section/destroy"}),{fetchData:function(){var t=this;return c()(a.a.mark(function e(){var n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getSectionList({column_chapter_id:t.column_chapter_id});case 2:n=e.sent,t.list=n.data.data,t.loading=!1;case 5:case"end":return e.stop()}},e,t)}))()},toPathLink:function(t){this.$router.push(t)},create:function(){this.$router.push("/chapter/section/create/"+this.column_chapter_id)},update:function(t){this.$router.push("/chapter/section/update/"+t+"?column_chapter_id="+this.column_chapter_id)},destroy:function(t){var e,n=this;this.$Modal.confirm({title:"提示",content:"<p>确定删除此章节文章吗？</p>",loading:!0,onOk:(e=c()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.destroySection(t);case 3:n.$Message.success("删除成功"),n.fetchData(),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.$Message.error(e.t0);case 11:return e.prev=11,n.$Modal.remove(),e.finish(11);case 14:case"end":return e.stop()}},e,n,[[0,7,11,14]])})),function(){return e.apply(this,arguments)}),onCancel:function(){n.$Message.warning("取消！")}})}})},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("Button",{staticStyle:{"margin-bottom":"16px"},attrs:{type:"primary",icon:"md-add"},on:{click:t.create}},[t._v("新增文章\n  ")]),t._v(" "),t.list.length>0?n("section",[n("Table",{attrs:{loading:t.loading,border:"",columns:t.columns,data:t.list},scopedSlots:t._u([{key:"name",fn:function(e){var r=e.row;return[n("strong",[t._v(t._s(r.name))])]}},{key:"action",fn:function(e){var r=e.row;return e.index,[n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.update(r.id)}}},[t._v("编辑")]),t._v(" "),n("Button",{attrs:{type:"error",size:"small"},on:{click:function(e){return t.destroy(r.id)}}},[t._v("删除")])]}}],null,!1,1888473351)})],1):t._e()],1)},staticRenderFns:[]};var p=n("VU/8")(l,d,!1,function(t){n("86QN")},"data-v-7181523f",null);e.default=p.exports}});
//# sourceMappingURL=4.ba11aac4a6c07618f115.js.map