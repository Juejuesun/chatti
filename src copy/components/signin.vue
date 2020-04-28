<template>
  <div>
    <el-card >
        <div slot="header">
            <span>设置昵称</span>
        </div>
         <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="signin">进入</el-button>
                </el-form-item>
            </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            loginForm:{
                username: ""
            },
            loginFormRules:{
                //用户名是否合法
                username:[
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState(['chatText','memberInfo','groupInfo','sessionId'])
    },
    watch: {
        $route(to, from) {
            // console.log(to);
            // console.log(from);
            if(from.path !== '/home/enter') { //如果上一页面时enter 则要获取roomis
                //获取roomid
                let path = this.$route.path
                let pathStr = path.split('/')
                const pathis = pathStr[pathStr.length-1]
                console.log(pathis)
                //推送roomid
                this.$store.dispatch('pushRoomId',pathis)
            }
        }
    },
    methods: {
        signin() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (valid) {
                    alert('submit!');
                    window.sessionStorage.setItem('USERNAME',this.loginForm.username)
                    if(!this.groupInfo.groupId) {
                        await this.getroomid()
                    }
                    let sig = {
                        name: this.loginForm.username,
                        room: this.groupInfo.groupId
                    }
                    this.$router.push('/home/chatroom')
                    this.$store.dispatch('getUname')
                    this.$socket.emit("join",sig);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            // console.log('signin中的'+this.sessionId,this.groupInfo.groupId)
        },
        getroomid() {
            let path = this.$route.path
                let pathStr = path.split('/')
                const pathis = pathStr[pathStr.length-1].trim()
                console.log(pathis)
                //推送roomid
                this.$store.dispatch('pushRoomId',pathis)
                const groupUrl = ('http://localhost/chat/'+pathis).trim() //存疑
                // console.log('前'+this.groupInfo.groupUrl)
                this.groupInfo.groupUrl = groupUrl
                // console.log('后'+this.groupInfo.groupUrl)
        }
    }
}
</script>

<style>

</style>