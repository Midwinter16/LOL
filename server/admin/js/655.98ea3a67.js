"use strict";(self["webpackChunkadmin"]=self["webpackChunkadmin"]||[]).push([[655],{5655:function(e,t,s){s.r(t),s.d(t,{default:function(){return c}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-content"},[s("el-card",{staticClass:"login-card",attrs:{header:"请先登录"}},[s("el-form",{nativeOn:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}}},[s("el-form-item",{attrs:{label:"用户名"}},[s("el-input",{attrs:{type:"text"},model:{value:e.model.username,callback:function(t){e.$set(e.model,"username",t)},expression:"model.username"}})],1),s("el-form-item",{attrs:{label:"密码"}},[s("el-input",{attrs:{type:"password"},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}})],1),s("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("登录")])],1)],1)],1)},l=[],n=s(6051);const r=e=>n.e.post("/login",e);var o={data(){return{model:{}}},methods:{async login(){const{data:e}=await r(this.model);localStorage.setItem("token",e),this.$router.push("/"),this.$message({type:"success",message:"登录成功"})}}},i=o,u=s(1001),m=(0,u.Z)(i,a,l,!1,null,"78e97249",null),c=m.exports}}]);
//# sourceMappingURL=655.98ea3a67.js.map