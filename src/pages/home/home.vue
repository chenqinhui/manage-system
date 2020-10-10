<template>
  <!-- <div>This is Home</div> -->
  <div style="height: 100%">
    <el-container>
      <el-header>
        <top-banner></top-banner>
      </el-header>
      <el-container>
        <el-aside :span="2">
          <side-menu></side-menu>
        </el-aside>
        <el-main :span="22">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-card class="order-card">
                <p>12</p>
                <p>待派订单</p>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card class="order-card">
                <p>12</p>
                <p>待派订单</p>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card class="order-card">
                <p>12</p>
                <p>待派订单</p>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card class="order-card">
                <p>12</p>
                <p>待派订单</p>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card class="order-card">
                <p>12</p>
                <p>待派订单</p>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card class="order-card">
                <p>12</p>
                <p>待派订单</p>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="statics-chart">
                <p>工单统计数</p>
                <el-divider></el-divider>
                <order-line-bar-chart></order-line-bar-chart>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="message-box">
                <p>消息中心</p>
                <el-divider></el-divider>
                <li  v-for="obj in listObj"  v-bind:key="obj.id">
                  <el-row>
                    <div class="message-content">{{obj.message}}，{{obj.location}}，{{obj.name}}</div>
                    <div class="message-time">{{obj.time}}</div>
                  </el-row>
                  <el-divider></el-divider>
                </li>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SideMenu from '@/components/SideMenu'
  import TopBanner from '@/components/TopBanner'
  //import MessageTable from '@/pages/home/components/MessageTable'
  //import OrderLineBarChart from '@/pages/home/components/OrderLineBarChart'
  export default {
    components:{
      SideMenu,
      TopBanner,
      //OrderLineBarChart
    },
    data(){
      return{
        listObj:[
        {id:1, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:2, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:3, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:4, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:5, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:6, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
      ]
      }
    }
  }
</script>

<style>
  .el-header, .el-footer {
    background-color:  rgb(14,98,201);
    color: #fff;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height:100%;
    /* line-height: 200px; */
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }

  /* body > .el-container {
    margin-bottom: 40px;
  } */
  .el-container{
    height:100%
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .order-card{
    height:120px;
    font-size:18px;
  }

  .order-card p{
    margin-top:12%;
  }

  .statics-chart{
    width:100%;
    margin-top:20px;
  }

  .message-box{
    width:100%;
    margin-top:20px;
  }

  .message-content{
    float: left;
  }

  .message-time{
    float:right;
  }
</style>
