<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="旧密码" prop="oldpwd">
    <el-input type="password" v-model="ruleForm.oldpwd"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="newpwd">
    <el-input type="password"  v-model="ruleForm.newpwd"></el-input>
  </el-form-item>
  <el-form-item label="新密码确认" prop="newpwd2">
    <el-input type="password"  v-model="ruleForm.newpwd2"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
  </div>
</template>

<script>
import { updatePwd } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import lang from '@/lang'

export default {
  name: 'user',
  directives: {
    waves
  },
  data() {
    return {
       ruleForm: {
          oldpwd: '',
          newpwd: '',
          newpwd2: ''
        },
        rules: {
          oldpwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 9, message: '长度在 6 到 9 个字符', trigger: 'blur' }
          ],
          newpwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 9, message: '长度在 6 到 9 个字符', trigger: 'blur' }
          ],
          newpwd2: [
            { required: true, message: '请确认输入新密码', trigger: 'blur' },
            { min: 6, max: 9, message: '长度在 6 到 9 个字符', trigger: 'blur' }
          ]
        }
      };
  },
  created() {
    //this.getList()
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            updatePwd(this.ruleForm).then((response) => {
            var msg = response.datas.error
            console.log(response)

            if(response.code === 200){
              console.log(response)
              this.$notify({
                title: '成功',
                message: '密码修改成功',
                type: 'success',    
                duration: 2000
              })
            }else{
              this.$notify({
                title: '失败',
                message: msg,
                type: 'fail',    
                duration: 2000
              })
            }
          })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}

</script>
<style scoped>
  .el-checkbox{
    margin-left: 10px;
  } 
</style>

<style rel="stylesheet/scss" lang="scss" scoped>

.filter-container {
    padding-top: 20px;
}

.app-container {
    height: 100%;
    padding: 20px;
}
</style>
