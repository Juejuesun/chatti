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
    groupMembers: 0,
    sessionId: '',
    defaultActive: 'enter',
    isShowState: true,
    msgNum: -1,
    newmsg: true,
    isloading: false,
    memberInfo: {
      memberName: '',
      memberDes: 'No Description',
      memberCountry: 'No info',
      memberPhone: 'No info',
      memberEmail: 'No info',
      memberAvatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      memberJotime: '--:--'
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
      const {data: res} = await axios.get('v1/rooms',{params:roomid});//正式使用
      // const {data: res} = await axios.get('roommsg.json'); //测试使用
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
      // const {data: res} = await axios.get('chatText.json');//测试使用
      let getChatTextInfo = {
        room: state.groupInfo.groupId,
        mid: state.msgNum
      }
      if(state.msgNum===0) {
        return
      }else{
        // const {data: resTest} = await axios.get('http://localhost:3000/delh',getChatTextInfo);//测试时为
        const {data: res} = await axios.get('v1/messages',{params: getChatTextInfo});//正式用
        console.log(res)
        if(res.code === 0) {
          // let revStr = res.data.reverse()
          // state.msgNum = res.data.left
          res.data.list.forEach(function(pre) {
            // console.log(x + '|' + index + '|' + (a === arr));
            if(!pre.msgType){
              pre.msgType = "msgres"
            }
            state.chatText.unshift(pre)
          });
          if(res.data.left){
            state.msgNum = res.data.left-1
          }else{
            state.msgNum = 0
          }
          // const count = state.chatText.unshift(revStr)
          // state.chatText = res.data
          console.log('加了历史',state.chatText,getChatTextInfo)
        }
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
      }
      if(data.udiscription) {
        state.memberInfo.memberDes = data.udiscription
      }
      if(data.udiscription) {
        state.memberInfo.memberCountry = data.memberCountry
      }
    },
    getinTime(state) {
      state.memberInfo.memberJotime = moment().format("HH:mm")
    },
    SOCKET_online_count(state, data) {
      state.groupMembers = data;
      console.log("online_count返回数据："+data)
    },
    SOCKET_sid(state,data) {
      state.sessionId = data
    },
    SOCKET_chat(state,data) {
      console.log(data)
        let chatmsg = {
          uname: data.uname,
          msg: data.msg,
          date: moment().format("HH:mm:ss"),
          msgType: 'msgres',
          cid: state.sessionId.slice(0,6),
          avatar: data.avatar
        }
        state.chatText.push(chatmsg)
    },
    SOCKET_response(state,respond) {
      console.log(respond)
      let joinmsg = {
          uname: respond.msg,
          msg: '',
          date: moment().format("HH:mm:ss"),
          msgType: 'respond'
      }
      state.chatText.push(joinmsg)
      state.groupMembers += respond.change
      console.log("response目前返回人数："+state.groupMembers)
    },
    SOCKET_disconnect(state) {
      state.chatText = []
      // alert('断开链接')
      state.isloading = true
    },
    getUname(state) {
      state.memberInfo.memberName = window.sessionStorage.getItem('USERNAME')
    },
    async getAvatar(state) {
      let sidd = {
        'sid': state.sessionId
      }
      const {data: res} = await axios.get('v1/users/avatar', {params: sidd})
      if(!res.code) {
        state.memberInfo.memberAvatar = res.data
      }else {
        console.log("获取失败！")
      }
    },
    watchNew(state,{bool}) {
      state.newmsg = bool
      console.log(state.newmsg, bool)
    },
    clearChatText(state) {
      state.chatText = []
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
    },
    getinTime({commit}) {
      commit('getinTime')
    },
    clearChatText({commit}) {
      commit('clearChatText')
    }
  },
  modules: {
  }
})
