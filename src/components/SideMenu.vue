<template>
    <div style="height: 100%">
      <el-menu
        :collapse="isCollapse"
        :default-active="$route.path"
        text-color="#fff"
        router>
        <el-menu-item index="/home">
          <img src="@/assets/4-1设备管理_11.png" class="menu-icon">
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="/order">
          <img src="@/assets/4-1设备管理_14.png" class="menu-icon">
          <span slot="title">工单列表</span>
        </el-menu-item>
        <el-menu-item index="/message">
          <img src="@/assets/4-1设备管理_16.png" class="menu-icon">
          <span slot="title">消息中心</span>
        </el-menu-item>
        <el-menu-item index="/equipments">
          <img src="@/assets/4-1设备管理_19.png" class="menu-icon">
          <span slot="title">设备管理</span>
        </el-menu-item>
        <el-menu-item index="/member">
          <img src="@/assets/4-1设备管理_22.png" class="menu-icon">
          <span slot="title">人员配置</span>
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
export default {
    name:'SideMenu',
    data(){
      return{
        isCollapse:false
      }
    },
    methods:{
        equipManagePage(){
            this.$router.push({
              path: '/equipments'
            })
        }
    }
}
</script>>

<style>
  .el-menu{
    height:100%;
    background-color: rgb(32, 125, 240);
    width:auto;
  }

  .el-menu-item{
    text-align: left;
  }

  .el-menu-item.is-active {
      background-color: rgb(172,205,244) !important;
      color: #fff;
  }

  .menu-icon{
    width:20px;
    height:20px;
    margin-left:20px;
    margin-right:20px;
  }
</style>
