<template>
    <div>
        
        <el-row type="flex" justify="center">
            <el-col :span="24" label-position="top">
                <h3>Create group</h3>
                <!-- <el-input placeholder="Search for message or users... " suffix-icon="el-icon-search"></el-input> -->
            </el-col>
        </el-row>

        <!-- 表单区 -->
        <el-row type="flex" justify="center">
            <el-col :span="16">
                <el-form label-position="top" >
                    <el-form-item label="Photo">
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <!-- <el-form-item label="Photo">
                        <el-input type="textarea" placeholder="photo"></el-input>
                    </el-form-item> -->
                    <el-form-item label="Name">
                        <el-input placeholder="Group Name" v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="Topic(optional)">
                        <el-input placeholder="Group Topic" v-model="topic"></el-input>
                    </el-form-item>
                    <el-form-item label="Discription">
                        <el-input placeholder="Group Discription" v-model="discription"></el-input>
                    </el-form-item>
                    <el-form-item>
                         <el-row  type="flex" justify="center">
                            <el-button type="primary" @click="creatGroup">Create group</el-button>
                        </el-row>
                    </el-form-item>
                </el-form>        
            </el-col>
        </el-row>
        <!-- <el-row  type="flex" justify="center">
            <el-button type="primary" @click="creatGroup">Create group</el-button>
        </el-row> -->
         
    </div>
</template>

<script>
// import axios from 'axios'
import {mapState} from 'vuex';
export default {
    data() {
        return {
            imageUrl: '',
            name: '',
            topic: '',
            discription: ''
        };
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
            return isJPG && isLt2M;
        },
        creatGroup() {
            let groupInfo = { //正式数据
                name: this.name,
                topic: this.topic,
                desc: this.discription,
                sid: this.sessionId
            }
            // console.log("state中的"+this.sessionId)
            let groupTestInfo = { //post模拟数据 测试数据
                "code": 0,
                "msg": "200",
                "data": "http://localhost/chat/dC0MmYm9fSvLufUIf-0CAA"
            }
            var that = this;
            this.$http.post('http://localhost:3000/posts',groupInfo).then(function(response){ //测试接口
            // this.$http.post('v1/rooms',groupInfo).then(function(response){ //正式用
                // const res = response.data //正式用
                const res = groupTestInfo//测试时使用
                that.groupInfo.groupUrl = res.data
                let roomStr = res.data.split('/')
                // console.log(roomStr)
                // console.log(roomStr[roomStr.length-1].trim())
                const room = roomStr[roomStr.length-1].trim()
                if(res.code == 0) {
                    that.$store.dispatch('getGroupInfo')
                    //推送roomid
                    that.$store.dispatch('pushRoomId',room)
                    that.$message({
                        message:"创建成功!",
                        type:'success'
                    })
                    that.$router.push('/home/profilehome')//测试时用 //是否要换成房间url？

                }else {
                    that.$message({
                        message:"链接失败!",
                        type:'error'
                    })
                }
            
            }).catch(function(error){
                    that.$message({
                        message: "链接失败！",
                        type: 'error'
                    })
            })
        }
    },
    computed: {
        ...mapState(['sessionId','groupInfo'])

    }
}
</script>

<style>
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
/* .el-input{
    
} */
</style>
