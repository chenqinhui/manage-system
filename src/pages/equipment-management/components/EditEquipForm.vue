<template>
    <div style="height: 100%">
      <el-form :model="equipInfoForm" ref="equipInfoForm" :rules="rules">
        <el-form-item prop="type" :label-width="formLabelWidth">
          <div slot="label" class="form-item-required">设备类型：</div>
          <el-select v-model="equipInfoForm.equipmentTypeName" class="form-selection" @change="typeChanged()">
            <el-option
              v-for="item in equipmentType"
              :key="item.value"
              :label="item.label"
              :value="`${item.value}|${item.label}`">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="equipmentName" label="设备名称：" :label-width="formLabelWidth">
          <el-input v-model="equipInfoForm.equipmentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="location" :label-width="formLabelWidth">
          <div slot="label" class="form-item-required">设备位置：</div>
          <el-select v-model="equipInfoForm.equipmentAddressName" placeholder="" class="form-selection" @change="addressChanged()">
            <el-option
              v-for="item in equipmentAddress"
              :key="item.value"
              :label="item.label"
              :value="`${item.value}|${item.label}`">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="department" :label-width="formLabelWidth">
          <div slot="label" class="form-item-required">设备部门：</div>
          <el-select v-model="equipInfoForm.departmentName" placeholder="" class="form-selection" @change="departmentChanged()">
            <el-option
              v-for="item in equipmentDepartment"
              :key="item.value"
              :label="item.label"
              :value="`${item.value}|${item.label}`">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌名称：" :label-width="formLabelWidth">
          <el-input v-model="equipInfoForm.equipmentBrandName"></el-input>
        </el-form-item>
        <el-form-item label="SN号：" :label-width="formLabelWidth">
          <el-input v-model="equipInfoForm.equipmentSerialNumber"></el-input>
        </el-form-item>
        <el-form-item label="购买时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="equipInfoForm.equipmentBuyingDate"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" v-model="equipInfoForm.equipmentDescribe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="editEquipment('equipInfoForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import { getCookie } from '../../../assets/js/cookie'
export default {
    name:'EditEquipForm',
    props:['dialogEditFormVisible','equipInfoForm'],
    data(){
        return{
            // newEquipInfoForm:{
            //     type:'',
            //     name:'',
            //     location:'',
            //     department:'',
            //     brand:'',
            //     snId:'',
            //     buyTime:'',
            //     product:''
            // },
            rules:{
                equipmentName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
            },
            formLabelWidth:'120px',
            equipmentType:[],
            equipmentAddress:[],
            equipmentDepartment:[]
        }
    },
    methods:{
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
        getEquipmentAddressList(){
            let requestData = this.$qs.stringify({
                    "rowLength":20,
                    "pageNum":1
                })
            this.$axios({
                url: 'http://shcloud2.wmtechzone.club:50003/apis/address/getdata',
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
                    let item = {'value':type.id,'label':type.equipmentAddressName}
                    this.equipmentAddress.push(item)
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
        getEquipmentDepartmentList(){
            let requestData = this.$qs.stringify({
                    "rowLength":20,
                    "pageNum":1
                })
            this.$axios({
                url: 'http://shcloud2.wmtechzone.club:50003/apis/department/getdata',
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
                    let item = {'value':type.id,'label':type.deptName}
                    this.equipmentDepartment.push(item)
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
        editEquipment(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let requestData = {
                        "id":this.equipInfoForm.id,
                        "equipmentName":this.equipInfoForm.equipmentName,
                        "equipmentTypeId":this.equipInfoForm.equipmentTypeId,
                        "equipmentTypeName":this.equipInfoForm.equipmentTypeName,
                        "equipmentAddressId":this.equipInfoForm.equipmentAddressId,
                        "equipmentAddressName":this.equipInfoForm.equipmentAddressName,
                        "departmentId":this.equipInfoForm.departmentId,
                        "equipmentBrandName":this.equipInfoForm.equipmentBrandName,
                        "equipmentSerialNumber":this.equipInfoForm.equipmentSerialNumber,
                        "equipmentBuyingDate":this.equipInfoForm.equipmentBuyingDate,
                        "equipmentDescribe":this.equipInfoForm.equipmentDescribe,
                        "CreateUserId":getCookie('token')
                    };
                    console.info(requestData);
                    this.$axios({
                        url: 'http://shcloud2.wmtechzone.club:50003/apis/apparatus/updatedata',
                        method: 'post',
                        headers:{
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: this.$qs.stringify(requestData)
                    }).then(response => {
                        if(response.data.code==="200"){
                            this.$message("修改设备成功");
                            this.$emit('reload');
                        }else if(response.data.code==='500'){
                            let message = response.data.msg;
                            console.info(message);
                            if(message.indexOf("(hint:deptId)")!=-1){
                                this.$message.warning(response.data.msg);
                                this.$emit('reload');
                            }
                            else if(message.indexOf("(hint:id)")!=-1){
                                this.$message.error(response.data.msg);
                            }
                        }else if(response.data.code==='-1'){
                            this.$message.error(response.data.msg);
                        }
                    }).catch(error => {
                        console.log(error);
                        this.$message('请求出错！');
                    })
                }else{
                    return false;
                }
            });
        },
        cancel(){
            this.$emit('hideEditDialog');
        },
        departmentChanged(){
            let deptItem = this.equipInfoForm.departmentName;
            this.equipInfoForm.departmentId = deptItem.split("|")[0];
            this.equipInfoForm.departmentName = deptItem.split("|")[1];
        },
        typeChanged(){
            let typeItem = this.equipInfoForm.equipmentTypeName;
            this.equipInfoForm.equipmentTypeId = typeItem.split("|")[0];
            this.equipInfoForm.equipmentTypeName = typeItem.split("|")[1];
        },
        addressChanged(){
            let addressItem = this.equipInfoForm.equipmentAddressName;
            this.equipInfoForm.equipmentAddressId = addressItem.split("|")[0];
            this.equipInfoForm.equipmentAddressName = addressItem.split("|")[1];
        }
    },
    created:function(){
        this.getEquipmentTypeList();
        this.getEquipmentAddressList();
        this.getEquipmentDepartmentList();
    }
}
</script>

<style>
    .form-btn{
        text-align: center;
    }
    .form-item-required::before {
        content: "*";
        color: #f56c6c;
        margin-right: 5px;
        font-weight: bold;
    }
    .form-selection{
        width:100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width:100%;
    }
</style>
