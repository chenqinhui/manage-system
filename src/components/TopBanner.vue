<template>
    <div style="height: 100%">
      <el-row class="top-banner">
        <p class="system-name">运维管理系统</p>
        <div class="login-banner">
          <img src="@/assets/4-1设备管理_03.png" class="admin-img">
          <span class="admin-text">欢迎您, {{admin}}</span>
          <img src="@/assets/4-1设备管理_06.png" class="logout-img">
          <button class="logout-btn" v-on:click="logout()">退出</button>
        </div>
      </el-row>
    </div>
</template>
<script>
    import {delCookie, getCookie} from '../assets/js/cookie.js'
export default {
    name:'TopBanner',
    methods:{
      logout(){
        // window.sessionStorage.removeItem("userId");
        // window.sessionStorage.removeItem("userName");
          delCookie('token');
          delCookie('userName')
        //this.$cookies.set("userId",-1);
        this.$router.push({
          path: '/login'
        })
      }
    },
    data(){
      return{
        admin:"admin"
      }
    },
    mounted:function(){
      this.admin = getCookie('userName');
      // this.admin = window.sessionStorage.getItem("userName");
    }
}
</script>

<style>
  .admin-img{
    width:30px;
    height:30px;
    margin-right:5px;
    vertical-align: middle;
  }
  .admin-text{
    vertical-align: middle;
  }
  .login-banner{
    float: right;
  }
  .logout-img{
    width:15px;
    height:15px;
    margin-left:3em;
    vertical-align: middle;
  }
  .logout-btn{
    color:white;
    background-color: transparent;
    border:none;
    font-size:16px;
  }
  .system-name{
    font-size:24px;
    float: left;
  }
  .top-banner{
    color:white;
  }
</style>>
