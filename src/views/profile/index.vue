<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="24" :xs="24">
          <user-card :user="user" />

          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="密码" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>

        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'
import {  updateUserPwd } from '@/api/article'


export default {
  name: 'Profile',roles
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
    console.log('+++++++++++++++++++++++++')
    console.log(this.roles[0])
    var group_name = "";
    if(this.roles[0] == 'admin'){
      group_name = '超级管理员';
    }else if(this.roles[0] == 'area_admin'){
      group_name = '区域管理员';
    }else if(this.roles[0] == 'normal'){
      group_name = '普通用户';
    }
      this.user = {
        name: this.name,
        role: group_name,
        oldpwd: '',
        newpwd: '',
        avatar: this.avatar
      }
    },

    submit1() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    },

    updateData() {
      const vm = this;
      if(this.user.newpwd == '' || this.user.oldpwd == ''){
        vm.$notify({
              title: '错误',
              message: '请输入密码',
              type: 'error',
              duration: 2000
            })
        return;
      }


      vm.$refs['dataForm'].validate((valid) => {
        if (valid) {

          vm.temp.admin_areaid = JSON.stringify(vm.temp.checkedCities);

          const tempData = Object.assign({}, vm.temp)

          updateUserPwd(tempData).then(() => {
            for (const v of vm.list) {
              if (v.admin_id === vm.temp.admin_id) {
                const index = vm.list.indexOf(v)
                vm.list.splice(index, 1, vm.temp)
                break
              }
            }
            vm.dialogFormVisible = false
            vm.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }


  }
}
</script>
