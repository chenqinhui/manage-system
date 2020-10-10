<template>
   <div style="height: 100%">
     <el-form :model="equipInfoForm" ref="equipInfoForm" :rules="rules">
       <el-form-item prop="type" label="设备类型："  :label-width="formLabelWidth">
         <el-select v-model="equipInfoForm.type" placeholder="" class="form-selection">
           <el-option
             v-for="item in equipmentType"
             :key="item.value"
             :label="item.label"
             :value="`${item.value}|${item.label}`">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item prop="name" label="设备名称：" :label-width="formLabelWidth">
         <el-input v-model="equipInfoForm.name" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item prop="location" label="设备位置：" :label-width="formLabelWidth">
         <el-select v-model="equipInfoForm.location" placeholder="" class="form-selection">
           <el-option
             v-for="item in equipmentAddress"
             :key="item.value"
             :label="item.label"
             :value="`${item.value}|${item.label}`">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item prop="department" label="设备部门：" :label-width="formLabelWidth">
         <el-select v-model="equipInfoForm.department" placeholder="" class="form-selection">
           <el-option
             v-for="item in equipmentDepartment"
             :key="item.value"
             :label="item.label"
             :value="`${item.value}|${item.label}`">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="品牌名称：" :label-width="formLabelWidth">
         <el-input v-model="equipInfoForm.brand" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="SN号：" :label-width="formLabelWidth">
         <el-input v-model="equipInfoForm.snId" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="购买时间：" :label-width="formLabelWidth">
         <el-date-picker
           v-model="equipInfoForm.buyTime"
           type="datetime"
           placeholder="选择日期时间"
           value-format="yyyy-MM-dd hh:mm:ss">
         </el-date-picker>
       </el-form-item>
       <el-form-item label="产品描述" :label-width="formLabelWidth">
         <el-input type="textarea" :rows="2" v-model="equipInfoForm.product" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button @click="cancel()">取消</el-button>
         <el-button type="primary" @click="addEquipment('equipInfoForm')">添加</el-button>
       </el-form-item>
     </el-form>
   </div>
</template>
<script>
import { getCookie } from '../../../assets/js/cookie'
export default {
    name:'EquipForm',
    props:['dialogFormVisible'],
    data(){
        return{
            equipInfoForm:{
                type:'',
                name:'',
                location:'',
                department:'',
                brand:'',
                snId:'',
                buyTime:'',
                product:''
            },
            rules: {
                type: [
                    { required: true, message: '请选择设备类型', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请选择设备位置', trigger: 'change' }
                ],
                department: [
                    { required: true, message: '请选择设备部门', trigger: 'change' }
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
        addEquipment(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let requestData = {
                        "equipmentName":this.equipInfoForm.name,
                        "equipmentTypeId":this.equipInfoForm.type.split('|')[0],
                        "equipmentTypeName":this.equipInfoForm.type.split('|')[1],
                        "equipmentAddressId":this.equipInfoForm.location.split('|')[0],
                        "equipmentAddressName":this.equipInfoForm.location.split('|')[1],
                        "departmentId":this.equipInfoForm.department.split('|')[0],
                        "equipmentBrandName":this.equipInfoForm.brand,
                        "equipmentSerialNumber":this.equipInfoForm.snId,
                        "equipmentBuyingDate":this.equipInfoForm.buyTime,
                        "equipmentDescribe":this.equipInfoForm.describe,
                        "createUserId":getCookie('token')
                    };
                    this.$axios({
                        url: 'http://shcloud2.wmtechzone.club:50003/apis/apparatus/setdata',
                        method: 'post',
                        headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: this.$qs.stringify(requestData)
                    }).then(response => {
                        if(response.data.code==="200"){
                            this.$message("添加设备成功");
                            this.$emit('reload');

                        }else if(response.data.code==='500'){
                            this.$message(response.message);
                        }else if(response.data.code==='-1'){
                            this.$message(response.message);
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
            this.$emit('hideDialog');
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
    /* .form-item-required::before {
        content: "*";
        color: #f56c6c;
        margin-right: 5px;
        font-weight: bold;
    } */
    .form-selection{
        width:100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width:100%;
    }
</style>
