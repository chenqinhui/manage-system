<template>
    <div style="height: 100%">
      <ul>
        <li  v-for="obj in listObj"  v-bind:key="obj.id">
          {{obj.message}}，{{obj.location}}，{{obj.name}}    {{obj.time}}
        </li>
      </ul>
    </div>
</template>

<script>
  import Vue from 'vue'
  new Vue({
    el:'#app',
    data:{
      list:[1,2,3,4,5,6],
      listObj:[
        {id:1, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:2, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:3, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:4, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:5, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
        {id:6, message:'摄像头有报修',location:'行政楼二楼',name:'张三',time:'2020-06-26 12:45:23'},
      ]
    }
  });
</script>
