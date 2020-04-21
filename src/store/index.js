import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groupInfo: {
      groupName: 'Matthew Wiggins',
      groupTopic: 'HTML, CSS and Javascript help',
      groupDiscription: 'Bootstrap is an open source toolkit for developing web with HTML, CSS and JS.',
      groupMembers: 36
    },
    memberInfo: {
      memberCountry: 'Warsaw, Poland',
      memberPhone: '+39 02 87 21 43 19',
      memberEmail: 'anna@gmail.com',
    },
    chatText: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
