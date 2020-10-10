<template>
    <div style="height: 100%">
      <ve-line :data="orderLineBarChartData" :setting="orderChartSettings"></ve-line>
    </div>
</template>

<script>
import Vue from 'vue'
  new Vue({
    el:'#app',
    created:function(){
        this.orderLineBarChartData={
            columns:[],
            rows:[]
        }
        this.orderChartSettings={}
    }
  });
export default {

}
</script>>
