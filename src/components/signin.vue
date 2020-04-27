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
        ...mapState(['chatText','memberInfo','groupInfo'])
    },
    methods: {
        signin() {
            this.$refs.loginFormRef.validate((valid) => {
                if (valid) {
                    alert('submit!');
                    window.sessionStorage.setItem('USERNAME',this.loginForm.username)
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
        }
    }
}
</script>

<style>

</style>