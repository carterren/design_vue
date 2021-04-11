import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    HOST: 'http://127.0.0.1:8888',
    isPlay:false,  //默认不播放
    url:''  , //歌曲地址
    id:''   //歌曲对应的ID
  },
  getters: {
    isPlay: state => state.isPlay,
    url: state => state.url,
    id: state => state.id
  },
  mutations: {
    setIsPlay: (state,isPlay) => {state.isPlay = isPlay},
    setUrl: (state,url) => {state.url = url},
    setId: (state,id) => {state.id = id}
  },
  actions: {
  },
  modules: {
  }
})
