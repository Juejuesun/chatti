<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
      ...mapState(['defaultActive','groupInfo','memberInfo'])
  },
  methods: {
    beforeunloadFn(e) {
      console.log('关闭')
      alert("确定离开吗？")
      //房主删除房间
      const root = window.sessionStorage.getItem('ROOMROOT')
      let ssid = {
          sid: this.sessionId
      } 
      if(root) {
          this.$confirm('您是房主，次操作将解散房间, 是否继续?', '注意', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
          }).then(() => {//测试
          // }).then(async () => {//正式
              // const {data: res} = await this.$http.delete('v1/rooms',{params: ssid})//正式用
              // console.log(res)
              // if(res.code === 0) //正式使用
              this.$store.dispatch('clearChatText')
              console.log('房主离开啦！')
              this.$message({
                  type: 'success',
                  message: '房间已解散!'
              });
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      }
      //下线
      let data = {
        name: this.memberInfo.memberName,
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
