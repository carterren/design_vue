<template>
  <div class="sidebar">
    <el-menu
        router="true"
        default-active="Statistics"
        unique-opened="true"
        class="el-menu-vertical-demo"
        background-color="#253041"
        text-color="#fff"
        active-text-color="#ffd04b">

      <el-menu-item class="sidebar-el-menu" index="Statistics">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="worker">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
          <el-menu-item index="/Worker" >
            <i class="el-icon-user"/>
           <span>员工管理</span>
          </el-menu-item>
          <el-menu-item index="/WorkerType">
            <i class="el-icon-user"/>
            <span>角色类别</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="cargo">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>货物管理</span>
        </template>
        <el-menu-item index="/Cargo" >货物管理</el-menu-item>
        <el-menu-item index="/CargoType">货物类别</el-menu-item>
      </el-submenu>
      <el-menu-item index="Vehicle" >
        <i class="el-icon-menu"></i>
        <span slot="title">车辆管理</span>
      </el-menu-item>
      <el-menu-item index="Warehouse">
        <i class="el-icon-menu"></i>
        <span slot="title">仓库管理</span>
      </el-menu-item>
      <el-menu-item index="Plan">
        <i class="el-icon-menu"></i>
        <span slot="title">计划管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import bus from "../assets/js/bus"

export default {
  name: "Aside",
  data() {
    return {
      collapse: false,
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    //通过bus进行组建间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  },
  methods: {
  }
}

</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0px;
  top: 70px;
  bottom: 0;
  background-color: #334256;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}

.sidebar > ul {
  height: 100%;
}
</style>