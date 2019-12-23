<template>
  <el-form>
    <el-form-item label="旧密码">
      <el-input type="password" v-model.trim="user.oldpwd" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input type="password" v-model.trim="user.newpwd" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {  updateUserPwd } from '@/api/article'


export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          oldpwd: '',
          newpwd: '',
          name: ''
        }
      }
    }
  },
  methods: {
    submit() {
    console.log(this.user.oldpwd);

      var vm = this;

      updateUserPwd({name:this.user.name,oldpwd:this.user.oldpwd,newpwd:this.user.newpwd}).then((response) => {
            console.log(response);
            if(response.code == 200){
              vm.dialogFormVisible = false
              vm.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }else{
              vm.$notify({
                title: '失败',
                message: '账号或者密码错误',
                type: 'error',
                duration: 2000
              })

            }
            
          })

    }
  }
}
</script>
