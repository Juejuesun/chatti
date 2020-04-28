import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groupInfo: {
      groupName: 'Matthew Wiggins',
      groupTopic: 'HTML, CSS and Javascript help',
      groupDiscription: 'Bootstrap is an open source toolkit for developing web with HTML, CSS and JS.',
      groupUrl: 'Quick setup and build tools.',
      groupId: ''
    },
    groupMembers: 1,
    sessionId: '',
    defaultActive: 'enter',
    isShowState: true,
    memberInfo: {
      memberName: 'Danny',
      memberDes: 'No Description',
      memberCountry: 'Warsaw, Poland',
      memberPhone: '+39 02 87 21 43 19',
      memberEmail: 'anna@gmail.com',
    },
    chatText: [],
    searchChatText: []
  },
  mutations: {
    async getGroupInfo(state) {
      // const {data: res} = await axios.get('v1/rooms',state.groupInfo.groupId);//正式使用
      const {data: res} = await axios.get('roommsg.json'); //测试使用
        // console.log(res)
        if(res.code === 0) {
          state.groupInfo.groupName = res.data.name
          state.groupInfo.groupTopic = res.data.topic
          state.groupInfo.groupDiscription = res.data.desc
        }
        console.log('getGroupInfo!') //调试用
        state.defaultActive = 'chatroom'
        state.isShowState = false
    },
    async getChatText(state) {
      const {data: res} = await axios.get('chatText.json');//测试使用
      let getChatTextInfo = {
        room: state.groupInfo.groupId,
        page: 1
      }
      const {data: resTest} = await axios.post('v1/messages',getChatTextInfo);//正式时为res
      console.log(res)
      if(res.code === 0) {
        state.chatText = res.data
      }
    },
    showSearch(state,{search}){
      if(search){
        state.searchChatText = state.chatText.filter((value)=>{  //过滤数组元素
          return value.msg.includes(search) | value.uname.includes(search); //如果包含字符返回true
        });
      }else {
        state.searchChatText = [{uname: '查询失败！', msg: '请输入关键词！'}]
      }
      if(!state.searchChatText.length){
        state.searchChatText = [{uname: '无此用户！', msg: '无记录！'}]
      }
      console.log(state.searchChatText)
    },
    savePreferences(state,{data}) {
      let orname = state.memberInfo.memberName
      if(data.uname.trim()) {
        state.memberInfo.memberName = data.uname
      }else {
        state.memberInfo.memberName = orname
      }
      if(data.uphone) {
        state.memberInfo.memberPhone = data.uphone
      }
      if(data.uemail) {
        state.memberInfo.memberEmail = data.uemail
      }if(data.udiscription) {
        state.memberInfo.memberDes = data.udiscription
      }
    },
    SOCKET_online_count(state, data) {
      state.groupMembers = data;
    },
    SOCKET_sid(state,data) {
      state.sessionId = data
    },
    getUname(state) {
      state.memberInfo.memberName = window.sessionStorage.getItem('USERNAME')
    },
    pushRoomId(state,room) {
      state.groupInfo.groupId = room
    }
  },
  actions: {
    getGroupInfo ({commit}) {
      commit('getGroupInfo')
    },
    getChatText ({commit}) {
      commit('getChatText')
    },
    showSearch({commit},search) {
      commit('showSearch',{search})
    },
    savePreferences({commit},data){
      commit('savePreferences',{data})
    },
    getUname({commit}) {
      commit('getUname')
      commit('getGroupInfo')
    },
    pushRoomId({commit},room) {
      commit('pushRoomId',{room})
    }
  },
  modules: {
  }
})
