<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >


      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data(){
    return{
      nameDesc: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      if(!this.sidebar.opened){
        this.nameDesc = ''
      }else{
        this.nameDesc = '南极旅游管理系统'
      }
      return !this.sidebar.opened
    },
    name() {
      return this.$route.name
    }
  },
  watch: {
    name(newVal, oldVal){
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.layout-logo {
    width: 180px;
    height: 80px;
    background: #002140;
    float: left;
    position: relative;
    line-height: 2.8;
    text-align: center;
    color: #fff;
    font-size: 18px;
    left: 0;
    cursor: pointer;
    transition: all 368ms;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
}

.el-menu-item.is-active {
    color: #fff;
    background-color: #1890ff !important;
}

.router-link-active.el-menu-item.is-active {
    color: #fff;
    background-color: #1890ff !important;
}


.is-active {
    color: #fff;
    background-color: #1890ff !important;
}
</style>
