"use strict";(self["webpackChunkadmin"]=self["webpackChunkadmin"]||[]).push([[108],{9108:function(e,t,s){s.r(t),s.d(t,{default:function(){return d}});var l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"about"},[s("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save.apply(null,arguments)}}},[s("h1",[e._v(e._s(e.id?"编辑":"新建")+"英雄")]),s("el-tabs",{attrs:{type:"border-card"}},[s("el-tab-pane",{attrs:{label:"基础信息"}},[s("el-form-item",{attrs:{label:"名称"}},[s("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),s("el-form-item",{staticClass:"upload",attrs:{label:"图标"}},[s("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.getAuthHeaders(),action:e.uploadURL,"show-file-list":!1,"on-success":e.afterUpload}},[e.model.icon?s("img",{staticClass:"avatar",attrs:{src:e.model.icon}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),s("el-form-item",{attrs:{label:"称号"}},[s("el-input",{model:{value:e.model.title,callback:function(t){e.$set(e.model,"title",t)},expression:"model.title"}})],1),s("el-form-item",{attrs:{label:"类型"}},[s("el-select",{attrs:{multiple:""},model:{value:e.model.categories,callback:function(t){e.$set(e.model,"categories",t)},expression:"model.categories"}},e._l(e.categories,(function(e){return s("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),s("el-form-item",{attrs:{label:"难度"}},[s("el-rate",{staticStyle:{"margin-top":"0.6rem"},attrs:{"show-score":"",max:3},model:{value:e.model.scores.difficult,callback:function(t){e.$set(e.model.scores,"difficult",t)},expression:"model.scores.difficult"}})],1),s("el-form-item",{attrs:{label:"攻击"}},[s("el-rate",{staticStyle:{"margin-top":"0.6rem"},attrs:{"show-score":"",max:3},model:{value:e.model.scores.attack,callback:function(t){e.$set(e.model.scores,"attack",t)},expression:"model.scores.attack"}})],1),s("el-form-item",{attrs:{label:"技能"}},[s("el-rate",{staticStyle:{"margin-top":"0.6rem"},attrs:{"show-score":"",max:3},model:{value:e.model.scores.skills,callback:function(t){e.$set(e.model.scores,"skills",t)},expression:"model.scores.skills"}})],1),s("el-form-item",{attrs:{label:"生存"}},[s("el-rate",{staticStyle:{"margin-top":"0.6rem"},attrs:{"show-score":"",max:3},model:{value:e.model.scores.survive,callback:function(t){e.$set(e.model.scores,"survive",t)},expression:"model.scores.survive"}})],1),s("el-form-item",{attrs:{label:"顺风出装"}},[s("el-select",{attrs:{multiple:""},model:{value:e.model.items_adv,callback:function(t){e.$set(e.model,"items_adv",t)},expression:"model.items_adv"}},e._l(e.items,(function(e){return s("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),s("el-form-item",{attrs:{label:"逆风出装"}},[s("el-select",{attrs:{multiple:""},model:{value:e.model.items_dis,callback:function(t){e.$set(e.model,"items_dis",t)},expression:"model.items_dis"}},e._l(e.items,(function(e){return s("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),s("el-form-item",{attrs:{label:"使用技巧"}},[s("el-input",{attrs:{resize:"none",type:"textarea",autosize:{minRows:2}},model:{value:e.model.usageTips,callback:function(t){e.$set(e.model,"usageTips",t)},expression:"model.usageTips"}})],1),s("el-form-item",{attrs:{label:"对抗技巧"}},[s("el-input",{attrs:{resize:"none",type:"textarea",autosize:{minRows:2}},model:{value:e.model.battleTips,callback:function(t){e.$set(e.model,"battleTips",t)},expression:"model.battleTips"}})],1),s("el-form-item",{attrs:{label:"团战技巧"}},[s("el-input",{attrs:{resize:"none",type:"textarea",autosize:{minRows:2}},model:{value:e.model.teamTips,callback:function(t){e.$set(e.model,"teamTips",t)},expression:"model.teamTips"}})],1)],1),s("el-tab-pane",{attrs:{label:"技能信息",name:"skills"}},[s("el-button",{on:{click:function(t){return e.model.skills.push({})}}},[s("i",{staticClass:"el-icon-plus"}),e._v(" 添加技能")]),e._l(e.model.skills,(function(t,l){return s("el-row",{key:l,staticStyle:{"flex-wrap":"wrap"},attrs:{type:"flex"}},[s("el-col",{attrs:{md:12}},[s("el-form-item",{attrs:{label:"技能名称"}},[s("el-input",{model:{value:t.name,callback:function(s){e.$set(t,"name",s)},expression:"item.name"}})],1),s("el-form-item",{attrs:{label:"技能消耗"}},[s("el-input",{model:{value:t.cost,callback:function(s){e.$set(t,"cost",s)},expression:"item.cost"}})],1),s("el-form-item",{attrs:{label:"技能冷却"}},[s("el-input",{model:{value:t.cooldown,callback:function(s){e.$set(t,"cooldown",s)},expression:"item.cooldown"}})],1),s("el-form-item",{attrs:{label:"技能描述"}},[s("el-input",{attrs:{autosize:{minRows:2},type:"textarea",resize:"none"},model:{value:t.description,callback:function(s){e.$set(t,"description",s)},expression:"item.description"}})],1),s("el-form-item",{attrs:{label:"技能提示"}},[s("el-input",{model:{value:t.tips,callback:function(s){e.$set(t,"tips",s)},expression:"item.tips"}})],1)],1),s("el-col",{attrs:{md:12}},[s("el-form-item",{staticClass:"upload partner",attrs:{label:"图标"}},[s("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.getAuthHeaders(),action:e.uploadURL,"show-file-list":!1,"on-success":function(s){return e.$set(t,"icon",s.url)}}},[t.icon?s("img",{staticClass:"avatar",attrs:{src:t.icon}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),s("el-form-item",[s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.model.skills.splice(l,1)}}},[e._v("删除")])],1)],1),s("div",{staticClass:"hr"})],1)}))],2),s("el-tab-pane",{attrs:{label:"最佳搭档",name:"partner"}},[s("el-button",{staticClass:"mb-2",on:{click:function(t){return e.model.partner.push({})}}},[s("i",{staticClass:"el-icon-plus"}),e._v(" 添加搭档")]),e._l(e.model.partner,(function(t,l){return s("el-row",{key:"partner"+l,staticStyle:{"flex-wrap":"wrap"},attrs:{type:"flex"}},[s("el-col",{attrs:{md:12}},[s("el-form-item",{attrs:{label:"英雄"}},[s("el-select",{attrs:{filterable:""},model:{value:t.hero,callback:function(s){e.$set(t,"hero",s)},expression:"item.hero"}},e._l(e.heroes,(function(e){return s("el-option",{key:e._id,attrs:{label:e.title,value:e._id}})})),1)],1),s("el-form-item",{attrs:{label:"搭档描述"}},[s("el-input",{attrs:{autosize:{minRows:2},type:"textarea",resize:"none"},model:{value:t.description,callback:function(s){e.$set(t,"description",s)},expression:"item.description"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.model.partner.splice(l,1)}}},[e._v("删除")])],1)],1)],1)}))],2)],1),s("el-form-item",{staticStyle:{"margin-top":"1rem"}},[s("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("提交")])],1)],1)],1)},a=[],i=s(4045),o=s(392),r=s(5274),n={props:{id:{type:String}},data(){return{model:{scores:{difficult:0,skills:0,attack:0,survive:0},skills:[]},categories:{},items:{},heroes:{}}},methods:{async save(){this.id?await(0,i.s9)(this.id,this.model):await(0,i.Om)(this.model),this.$router.push("/heroes/list"),this.$message({type:"success",message:"保存成功"})},async fetch(){const{data:e}=await(0,i.a$)(this.id);this.model=Object.assign({},this.model,e)},afterUpload(e){this.$set(this.model,"icon",e.url)},async fetchCategoires(){const{data:e}=await(0,o.AT)();this.categories=e},async fetchItems(){const{data:e}=await(0,r.mC)();this.items=e},async initHeroesList(){const{data:e}=await(0,i.$c)();this.heroes=e}},created(){this.fetchCategoires(),this.fetchItems(),this.initHeroesList(),this.id&&this.fetch()}},c=n,m=s(1001),u=(0,m.Z)(c,l,a,!1,null,"00618d59",null),d=u.exports},392:function(e,t,s){s.d(t,{AT:function(){return a},OU:function(){return n},Om:function(){return i},a$:function(){return r},k4:function(){return c},s9:function(){return o}});var l=s(6051);const a=()=>l.A.get("categories"),i=e=>l.A.post("categories",e),o=(...e)=>l.A.put(`categories/${e[0]}`,e[1]),r=e=>l.A.get(`categories/${e}`),n=()=>l.A.get("categories"),c=e=>l.A.post(`categories/${e}`)},4045:function(e,t,s){s.d(t,{$c:function(){return a},Om:function(){return i},a$:function(){return r},k4:function(){return n},s9:function(){return o}});var l=s(6051);const a=()=>l.A.get("heroes"),i=e=>l.A.post("heroes",e),o=(...e)=>l.A.put(`heroes/${e[0]}`,e[1]),r=e=>l.A.get(`heroes/${e}`),n=e=>l.A.post(`heroes/${e}`)},5274:function(e,t,s){s.d(t,{Om:function(){return i},a$:function(){return r},k4:function(){return n},mC:function(){return a},s9:function(){return o}});var l=s(6051);const a=()=>l.A.get("items"),i=e=>l.A.post("items",e),o=(...e)=>l.A.put(`items/${e[0]}`,e[1]),r=e=>l.A.get(`items/${e}`),n=e=>l.A.post(`items/${e}`)}}]);
//# sourceMappingURL=108.25983538.js.map