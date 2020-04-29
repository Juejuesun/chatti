<template>
    <div>
        
        <el-row type="flex" justify="center">
            <el-col :span="24" label-position="top">
                    <h3>Settings</h3>
                    <p>Update your profile details</p>
            </el-col>
        </el-row>

        <!-- 表单区 -->
        <el-row type="flex" justify="center">
            <el-col :span="15">
                <el-form label-position="top" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
                    <div class="cont1">
                        <div>
                            <h3>Account</h3>
                            <p>Update your profile details.</p>
                        </div>
                        <div>
                            <i class="el-icon-user"></i>
                        </div>
                    </div>
                    
                    <el-form-item label="Avatar">
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :file-list="fileList">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>         
                    </el-form-item>
                    <!-- <el-form-item label="Photo">
                        <el-input type="textarea" placeholder="photo"></el-input>
                    </el-form-item> -->
                    <el-form-item label="Name" prop="username">
                        <el-input placeholder="Type your name" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Phone">
                        <el-input placeholder="(123) 456-789" v-model="loginForm.uphone"></el-input>
                    </el-form-item>
                    <el-form-item label="Email">
                        <el-input placeholder="you@yoursite.com" v-model="loginForm.uemail"></el-input>
                    </el-form-item>
                    <el-form-item label="Discription">
                        <el-input placeholder="Yourself Discription" v-model="loginForm.udiscription"></el-input>
                    </el-form-item>
                </el-form>        
            </el-col>
        </el-row>
        <el-row  type="flex" justify="center">
            <!-- <el-col :span="12"> -->
                <el-button type="primary" @click="savePreference">Save Preferences</el-button>
            <!-- </el-col> -->
        </el-row>
        
         
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            imageUrl: '',
            fileList: [],
            formData: new FormData(),
            loginForm:{
                username: "",
                uphone: '',
                uemail: '',
                udiscription: '',
            },
            loginFormRules:{
                //用户名是否合法
                username:[
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapState(['chatText','memberInfo','groupInfo','sessionId'])
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            this.formData.append("avatar",file) //
            // console.log(this.formData.get("avatar"))
            return isJPG && isLt2M;
        },
        savePreference() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (valid) {
                    let memberInfo = { //post模拟数据
                        'uname': this.loginForm.username,
                        'uphone': this.loginForm.uphone,
                        'uemail': this.loginForm.uemail,
                        'udiscription': this.loginForm.udiscription
                    }
                    // socket 事件
                    window.sessionStorage.setItem('USERNAME',this.loginForm.username)
                    // if(!this.groupInfo.groupId) {
                        await this.getroomid()
                    // }
                    let sig = {
                        name: this.loginForm.username,
                        room: this.groupInfo.groupId
                    }
                    // console.log("sig=",sig)
                    //推送图片
                    this.formData.append("sid", this.sessionId)
                    console.log('文件',this.formData.get("avatar"))
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    const {data: putres} = await this.$http.put('v1/users/avatar',this.formData, config)//正式使用
                    this.$store.dispatch('getAvatar')

                    if(!this.memberInfo.memberName){
                        this.$router.push({
                            path: '/home/chatroom',
                            // name: 'chatroom',
                            query:{id: this.groupInfo.groupId}
                        })//做一个守卫
                        //守卫
                        this.$socket.emit("join",sig);
                        this.$message({
                            message:"设置成功,快去聊天吧!",
                            type:'success'
                        })
                    }else {
                        this.$message({
                            message:"修改成功",
                            type:'success'
                        })
                    }
                    this.$store.dispatch('getUname')
                    this.$store.dispatch('savePreferences',memberInfo) //strot事件
                    // this.$refs.loginFormRef.resetFields();
                    
                    this.loginForm.uemail=''
                    this.loginForm.udiscription=''
                    this.loginForm.uphone=''
                }else {
                    console.log('error submit!!');
                    this.$message({
                        message:"请输入昵称!",
                        type:'error'
                    })
                    return false;
                }
            });
        },
        getroomid() {
            let roomid = (this.$route.query.id).trim()
            let path = (this.$route.fullPath).trim()
            console.log(roomid)
            // console.log('fu录=',path)
            //推送roomid
            this.$store.dispatch('pushRoomId',roomid)
            const groupUrl = path //存疑
            this.groupInfo.groupUrl = 'http://localhost:8080/#'+groupUrl
        }
    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.cont1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.el-icon-user{
    font-size: 25px;
}

</style>
