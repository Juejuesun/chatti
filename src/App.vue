<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
      ...mapState(['defaultActive','isShowState','groupInfo','memberInfo'])
  },
  methods: {
    beforeunloadFn(e) {
      console.log('关闭')
      alert("确定离开吗？")
      let data = {
        name: this.memberInfo.memberName,
        room: this.groupInfo.groupId
      }
      let room = {
        room: this.groupInfo.groupId
      }
      this.$socket.emit('leave',data)
      // this.$socket.emit('online_cnt',data)

    }
  },
  created() {
        window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  beforeDestroy() {
        alert("确定离开房间吗？")
  },
  destroyed() {
      window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
}
</script>

<style>

</style>
