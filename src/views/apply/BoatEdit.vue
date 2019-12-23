<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <span>新增船舶</span>
        <el-divider></el-divider>
           <el-row>
               <el-col :span="12">
                   <el-form-item label="公司名称"  prop="touristCode">
                    <el-select v-model="ruleForm.companyId"  placeholder="请选择" filterable>
                      <el-option v-for="item in companyApplyList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    
                   </el-form-item>
               </el-col>       
           </el-row>
           <el-row>
               <el-col :span="12">
                   <el-form-item label="船名"  prop="touristCode">
                    <el-input v-model="ruleForm.name"></el-input>
                   </el-form-item>
               </el-col>       
           </el-row>
           <el-row>
               <el-col :span="12">
                   <el-form-item label="是否豪华"  prop="touristCode">
                    <el-radio v-model="flag" label="是"></el-radio>
                    <el-radio v-model="flag" label="否"></el-radio>         
                   </el-form-item>
               </el-col>       
           </el-row>
           <el-row>
               <el-col :span="12">
                   <el-form-item label="载客人数"  prop="touristCode">
                    <el-input v-model="ruleForm.seatNumber"></el-input>
                   </el-form-item>
               </el-col>       
           </el-row>
         <el-row>
          <el-col :span="12" offset="4">
              <el-form-item >
              <el-button type="primary" @click="onSubmit">提交</el-button>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="">
            
          </el-form-item>
          
        </el-row>
        
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  getCompanyList,
  createTripInfo
} from "@/api/article";
import lang from "@/lang";
import { checkPhone, validatePhone, validateEmail } from "@/utils/validate";

export default {
  name: "companyapply",
  data() {
    return {
      flag:'',
      ruleForm: {
        name: "",
        companyId: "", 
        isLux: "", 
        seatNumber: "",
      },
      companyApplyList: [],
      listQuery:{
        pagesize:100,
        curpage:1,
        name:"",
      },
      applyed: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        firstName: [
          { required: true, message: "请输入英文姓", trigger: "blur" }
        ],
        lastName: [{ required: true, message: "请输入英文名", trigger: "blur" }]
        // companyofficeaddress: [
        //   { required: true, message: "请输入公司运营地址", trigger: "blur" }
        // ],
        // companytel: [
        //   { required: true, message: "请输入单位电话", trigger: "blur" },
        //   {
        //     validator: validatePhone,
        //     message: "请输入正确格式的电话号码",
        //     trigger: "blur"
        //   }
        // ],
        // companylicence: [
        //   { required: true, message: "请上传单位营业执照", trigger: "blur" }
        // ],
        // applyer: [{ required: true, message: "请输入申请人", trigger: "blur" }],
        // applyertel: [
        //   { required: true, message: "请输入申请人电话", trigger: "blur" },
        //   {
        //     validator: checkPhone,
        //     message: "请输入正确格式的手机号",
        //     trigger: "blur"
        //   }
        // ]
      },

      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    // this.getBeianCompany()
    this.getCompanyInfo();
  },
  methods: {
    getCompanyInfo(){
      getCompanyList(this.listQuery).then(response => {
        this.companyApplyList = response.datas.list || [];
      });
    },
    onSubmit() {
      this.createData();
    },
    isLuxury(){
      if (this.flag === "是") {
          this.ruleForm.isLux = 2;
      } else {
        this.ruleForm.isLux = 1;
      }
    },
    createData() {
      const vm = this;
      this.isLuxury();
      console.log(this.ruleForm)
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          createTripInfo(vm.ruleForm).then(response => {
                console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: "成功",
                message: "提交成功",
                type: "success",
                duration: 2000
              });
            this.$router.push({ path: "/applylist/BoatList" });
            } else {
              this.$notify({
                title: "提交失败",
                message: "提交失败",
                type: "success",
                duration: 2000
              });
            }
          });
        }
      });
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  padding-top: 20px;
}

.app-container {
  height: 100%;
  padding: 20px;
}

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
</style>
<style>
label {
  font-weight: 400 !important;
}
</style>