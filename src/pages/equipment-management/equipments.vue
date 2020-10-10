<template>
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
            <el-row class="equip-search-row">
              <el-col :span="8">
                <span>设备名称：</span>
                <el-input v-model="equipNameInput" placeholder="" class="equip-name-input"></el-input>
              </el-col>
              <el-col :span="8">
                <span>设备类型：</span>
                <el-select v-model="equipmentTypeValue" placeholder="请选择">
                  <el-option
                    v-for="item in equipmentType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="handleCurrentChange(1)">搜索</el-button>
              </el-col>
            </el-row>
            <el-row class="function-row">
              <div class="function-btn">
                <el-button type="success">导出Excel</el-button>
                <el-button type="primary" @click="dialogFormVisible=true">新增设备</el-button>
                <!--添加设备的弹出对话框-->
                <el-dialog title="添加设备" :visible.sync="dialogFormVisible">
                  <add-equip-form @hideDialog="hideDialog" @reload="closeAndReload"></add-equip-form>
                  <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addEquipment()">添加</el-button>
                  </div> -->
                </el-dialog>
              </div>
            </el-row>
            <el-row>
              <el-table
                ref="multipleTable"
                :data="equipTableData"
                tooltip-effect="dark"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="equipmentName"
                  label="设备名称">
                </el-table-column>
                <el-table-column
                  prop="equipmentAddressName"
                  label="设备位置">
                </el-table-column>
                <el-table-column
                  prop="equipmentTypeName"
                  label="设备类型">
                </el-table-column>
                <el-table-column
                  prop="departmentName"
                  label="设备部门">
                </el-table-column>
                <el-table-column
                  prop="equipmentSerialNumber"
                  label="N号">
                </el-table-column>
                <el-table-column
                  prop="equipmentBuyingDate"
                  label="添加时间">
                </el-table-column>
                <el-table-column
                  prop="createUserName"
                  label="添加人">
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="操作"
                  fixed:right
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="showEditDialog(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteEquipment(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
                <template slot="append">
                </template>
              </el-table>
              <!--编辑设备对话框-->
              <el-dialog title="编辑设备" :visible.sync="dialogEditFormVisible">
                <edit-equip-form @hideEditDialog="hideDialog()" @reload="closeAndReload()" :equipInfoForm="equipInfo"></edit-equip-form>
              </el-dialog>
            </el-row>
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="rowLength"
              :current-page.sync="currentPage"
              layout="prev, pager, next, jumper"
              :total="totalItems">
            </el-pagination>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  import SideMenu from '@/components/SideMenu'
  import TopBanner from '@/components/TopBanner'
  import AddEquipForm from '@/pages/equipment-management/components/AddEquipForm'
  import EditEquipForm from '@/pages/equipment-management/components/EditEquipForm'
  export default {
    name:"Equipments",
    components:{
      SideMenu,
      TopBanner,
      AddEquipForm,
      EditEquipForm
    },
    data(){
        return{
            equipNameInput:'',
            equipmentTypeValue:'-1',
            equipmentType: [{
              'label':'全部类型',
              'value':'-1'
            }],
            equipTableData:[/*{
              index:1,
              equipmentName:"AAA",
              equipmentAddressName:"Address",
              equipmentTypeName:"Type",
              departmentName:"department",
              equipmentSerialNumber:"1234",
              equipmentBuyingDate:"2020-4-2 17:36:00",
              createUserName:"UserName"
            }*/],
            dialogFormVisible:false,
            dialogEditFormVisible:false,
            equipInfo:'',
            currentPage:1,
            rowLength:5,
            totalPages:0,
            totalItems:0
        }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showDialog(){
        this.dialogFormVisible=true;
      },
      showEditDialog(row){
        this.dialogEditFormVisible=true;
        this.equipInfo=JSON.parse(JSON.stringify(row));
        //console.info(this.equipInfo);
      },
      hideDialog(){
        this.dialogFormVisible=false;
        this.dialogEditFormVisible=false;
      },
      closeAndReload(){
        this.dialogFormVisible=false;
        this.dialogEditFormVisible=false;
        this.searchEquipments();
      },
      searchEquipments(){
        //this.currentPage = p;
        let requestData = {
            "equipmentName": this.equipNameInput,
            "equipmentTypeId": this.equipmentTypeValue,
            "rowLength":this.rowLength,
            "pageNum":this.currentPage
        }

        this.$axios({
            url: 'http://shcloud2.wmtechzone.club:50003/apis/apparatus/getdata',
            method: 'post',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: this.$qs.stringify(requestData)
        }).then(response => {
            if(response.data.code==="200"){
                this.equipTableData = response.data.data[0].dataList;
                this.totalPages=Number(response.data.data[0].totalPages);
                this.totalItems=Number(response.data.data[0].totalItems);
            }else if(response.data.code==="500"){
                this.equipTableData=[]
            }else if(response.data.code==="-1"){
                this.$message(response.message);
            }
        }).catch(error => {
            console.log(error);
            this.$message('请求出错！');
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.searchEquipments();
      },
      getEquipmentTypeList(){
          let requestData = this.$qs.stringify({
              "rowLength":20,
              "pageNum":1
          })
          this.$axios({
              url: 'http://shcloud2.wmtechzone.club:50003/apis/apparatustype/getdata',
              method: 'post',
              headers:{
              'Content-Type':'application/x-www-form-urlencoded'
              },
              data: requestData
          }).then(response => {

              if(response.data.code==="200"){
                  let typeList = response.data.data[0].dataList;
                  for(let i=0;i<typeList.length;i++){
                      let type = typeList[i]
                      let item = {'value':type.id,'label':type.equipmentTypeName}
                      this.equipmentType.push(item)
                  }
              }else if(response.code==='500'){
                  this.$message(response.message);
              }else if(response.code==='-1'){
                  this.$message(response.message);
              }
          }).catch(error => {
              console.log(error);
              this.$message('请求出错！');
          })
      },
      deleteEquipment(index,row){
          this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              let requestData = {
                  id:row.id
              }
              this.$axios({
                  url: 'http://shcloud2.wmtechzone.club:50003/apis/apparatus/deldata',
                  method: 'post',
                  headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
                  },
                  data: this.$qs.stringify(requestData)
              }).then(response => {
                  if(response.data.code==="200"){
                      this.handleCurrentChange(1);
                  }else if(response.code==='500'){
                      this.$message(response.message);
                  }else if(response.code==='-1'){
                      this.$message(response.message);
                  }
              }).catch(error => {
                  console.log(error);
                  this.$message('请求出错！');
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    mounted:function(){
      this.getEquipmentTypeList();
      this.handleCurrentChange(1);
    },
    activated:function(){
      this.handleCurrentChange(1);
    }
  }
</script>

<style>
  .dialog-footer{
    text-align: center;
  }

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

  .el-dialog__header{
    background-color:  rgb(14,98,201);
    text-align: left;
    border-radius: 2px 2px 0 0;
  }

  .el-dialog__title{
    color:white;
  }

  .el-table th {
    display: table-cell!important;
  }

  .equip-search-row{
    background-color: white;
    padding:10px;
  }

  .equip-name-input{
    display: inline-block;
    width:200px;
  }

  .function-row{
    padding:10px;
    padding-right: 0;
  }

  .function-btn{
    float:right;
  }
</style>
