<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <span>新增下游公司</span>
        <el-divider></el-divider>
           <el-row>
               <el-col :span="12">
                   <el-form-item label="公司名称" prop="name">
                    <el-input v-model="ruleForm.name" ></el-input>
                   </el-form-item>
               </el-col>       
           </el-row>
           <el-row>
          <el-col :span="12" >
              <el-form-item >
              <el-button type="primary" @click="createData">提交</el-button>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>      
        </el-row> 
      </el-form>
    </div>
  </div>
</template>
<script>
import {
 addDownnerCompany
} from "@/api/article";
import lang from "@/lang";
import { checkPhone, validatePhone, validateEmail } from "@/utils/validate";

export default {
  data() {
    return {
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    createData() {
      const vm = this;
      this.$refs['ruleForm'].validate(valid => {
        console.log()
        if (valid) {
          addDownnerCompany(vm.ruleForm).then(response => {
            console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: "成功",
                message: "提交成功",
                type: "success",
                duration: 2000
              });
            this.$router.push({ path: "/apply/DownnerCompanyList" });
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