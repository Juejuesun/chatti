import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const moment = require("moment")

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groupInfo: {
      groupName: 'Matthew Wiggins',
      groupTopic: 'HTML, CSS and Javascript help',
      groupDiscription: 'Bootstrap is an open source toolkit for developing web with HTML, CSS and JS.',
      groupUrl: 'Quick setup and build tools.',
      groupId: '',
      groupAvatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    groupMembers: 1,
    sessionId: '',
    defaultActive: 'enter',
    isShowState: true,
    msgNum: 0,
    newmsg: true,
    memberInfo: {
      memberName: '',
      memberDes: 'No Description',
      memberCountry: 'Warsaw, Poland',
      memberPhone: '+39 02 87 21 43 19',
      memberEmail: 'anna@gmail.com',
      memberAvatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    chatText: [],
    searchChatText: []
  },
  mutations: {
    pushRoomId(state,{room}) {
      state.groupInfo.groupId = room
    },
    async getGroupInfo(state) {
      let roomid = {
        room: state.groupInfo.groupId
      }
      // console.log("roomid=",roomid)
      // const {data: res} = await axios.get('v1/rooms',{params:roomid});//正式使用
      const {data: res} = await axios.get('roommsg.json'); //测试使用
        // console.log(res)
        if(res.code === 0) {
          state.groupInfo.groupName = res.data.name
          state.groupInfo.groupTopic = res.data.topic
          state.groupInfo.groupDiscription = res.data.desc
          state.groupInfo.groupAvatar = res.data.avatar
        

        }
        console.log('getGroupInfo!') //调试用
        
    },
    changeState(state) {
      const usName = window.sessionStorage.getItem('USERNAME')
      if(usName) {
        state.isShowState = false
        state.defaultActive = 'chatroom'
      }
    },
    async getChatText(state) {//历史消息
      const {data: res} = await axios.get('chatText.json');//测试使用
      let getChatTextInfo = {
        room: state.groupInfo.groupId,
        mid: -1
      }
      const {data: resTest} = await axios.get('http://localhost:3000/delh',getChatTextInfo);//测试时为
      // const {data: res} = await axios.get('v1/messages',{params: getChatTextInfo});//正式用
      console.log(res)
      if(res.code === 0) {
        // let revStr = res.data.reverse()
        state.msgNum = res.data.left
        res.data.list.forEach(function(pre) {
          // console.log(x + '|' + index + '|' + (a === arr));
          if(!pre.msgType){
            pre.msgType = "msgres"
          }
          state.chatText.unshift(pre)
        });
        if(res.data.left){
          getChatTextInfo.mid = res.data.left-1
        }else{
          getChatTextInfo.mid = 0
        }
        // const count = state.chatText.unshift(revStr)
        // state.chatText = res.data
        console.log('加了历史',state.chatText,getChatTextInfo)
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
        console.log("dasj",data.uphone)
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
    SOCKET_chat(state,data) {
      console.log(data)
        let chatmsg = {
          uname: data.name,
          msg: data.msg,
          date: moment().format("HH:mm:ss"),
          msgType: 'msgres',
          cid: state.sessionId.slice(0,6),
          url: state.memberInfo.memberAvatar
        }
        state.chatText.push(chatmsg)//调试时使用
    },
    SOCKET_response(state,respond) {
      console.log(respond)
      let joinmsg = {
          uname: respond,
          msg: '',
          date: moment().format("HH:mm:ss"),
          msgType: 'respond'
      }
      state.chatText.push(joinmsg)//调试时使用
    },
    getUname(state) {
      state.memberInfo.memberName = window.sessionStorage.getItem('USERNAME')
    },
    async getAvatar(state) {
      let sidd = {
        'sid': state.sessionId
      }
      const {data: res} = await axios.get('v1/users/avatar', {params: sidd})
      if(res.code) {
        state.memberInfo.memberAvatar = res.data
      }else {
        console.log("获取失败！")
      }
    },
    watchNew(state,{bool}) {
      state.newmsg = bool
      console.log(state.newmsg, bool)
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
    },
    getAvatar({commit}) {
      commit('getAvatar')
    },
    changeState({commit}) {
      commit('changeState')
    },
    watchNew({commit},bool) {
      commit('watchNew', {bool})
    }
  },
  modules: {
  }
})
