<template>
    <div class="login-background background">
        <el-card class="card-box">
            <el-row type="flex" class="login-card-row">
                <el-col :span="12">
                    <img src="../../../static/images/login-box.png" class="login-img">
                </el-col>
                <el-col :span="12" class="login-content">
                    <el-row>
                        <p class="system-name">运维管理系统</p>
                    </el-row>
                    <el-row>
                        <el-form :model="loginForm" class="login-form">
                            <el-form-item prop="username" class="login-form-item">
                                <img src="@/assets/0-1登录1_03.png" class="login-form-icon">
                                <input v-model="loginForm.username" placeholder="请输入用户名" class="login-form-input">
                            </el-form-item>
                            <el-divider class="login-form-divider"></el-divider>
                            <el-form-item prop="password" class="login-form-item">
                                <img src="@/assets/0-1登录_09.png" class="login-form-icon">
                                <input v-model="loginForm.password" placeholder="请输入密码" class="login-form-input">
                            </el-form-item>
                            <el-divider class="login-form-divider"></el-divider>
                            <el-form-item>
                                <el-checkbox class="login-form-item">记住密码</el-checkbox>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="login()" round class="login-btn">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {setCookie} from '../../assets/js/cookie.js'
export default {
    name:"loginPage",
    data(){
        return{
            loginForm:{
                username:"",
                password:""
            },
            // background: {
            //     backgroundImage: "url(" + require("../../assets/0-1登录_01.png") + ")",
            //     backgroundRepeat: "no-repeat",
            // }
        }
    },
    methods:{
        login(){
            if(this.loginForm.username!==undefined&&this.loginForm.password!==undefined&&this.loginForm.username!==""&&this.loginForm.password!==""){
                this.$axios({
                    url: 'http://shtest.wmtechzone.club:48112/maintenance/login/login',
                    method: 'post',
                    data: this.$qs.stringify({
                        "user_name": this.loginForm.username,
                        "pass_word": this.loginForm.password
                    })
                }).then(response => {
                    if(response.data.code===200){
                        //将用户信息保存到session中
                        // let session = window.sessionStorage;
                        // session.setItem("userId",response.data.data.person_id);
                        setCookie('token', response.data.data.person_id);
                        setCookie('userName',response.data.data.person_name);
                        // session.setItem("userName",response.data.data.person_name);
                        this.$router.push({
                            path: '/equipments'
                        })
                    }else if(response.data.code===700){
                        this.$message.error(response.data.message);
                    }else if(response.data.code===800){
                        this.$message.error(response.data.message);
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.error('登录出错!');
                })
            }else{
                this.$message({
                    message:'用户名或密码不能为空!',
                    type:'warning'
                });
            }
        }
    }
}
</script>>

<style>
    .card-box{
        width: 800px;
        height: 450px;
        margin: auto;
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
    }
    .el-card{
        border-radius: 20px;
    }
    .el-card__body{
        height:100%;
        padding:50px;
    }
    .login-background{
        width:100%;
        height:100%;
      background-image: url("../../../static/images/login-bg.png");
      background-repeat: no-repeat;
    }
    .login-btn{
        width:100%;
        margin-top:10px;
    }
    .login-card-row{
        align:middle;
    }
    .login-content{
        padding:5%;
    }
    .login-img{
        width:100%;
        vertical-align: middle;
    }
    .login-form{
        margin-top:50px;
        float:left;
    }
    .login-form-divider{
        margin:0;
    }
    .login-form-icon{
        width:20px;
        height:20px;
        vertical-align: middle;
    }
    .login-form-input{
        padding:10px;
        border:0 solid;
    }
    .login-form-item{
        margin-top:10px;
        margin-bottom:0;
    }
</style>
