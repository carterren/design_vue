<template>
  <div>
    <the-header></the-header>
    <the-aside></the-aside>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import bus from "../assets/js/bus";
import TheHeader from "@/components/TheHeader";
import TheAside from "@/components/TheAside"

export default {
  name: "Home",
  components:{
    TheHeader,
    TheAside
  },
  data(){
    return{
      collapse: false
    }
  },
  created() {
    //通过bus进行组建间通信，来折叠侧边栏
    bus.$on('collapse',msg =>{
      this.collapse = msg
    })
  }
}
</script>

<style scoped>

</style>