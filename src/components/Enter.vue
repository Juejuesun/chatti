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
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-picture-outline avatar-uploader-icon" ></i>
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
            discription: '',
            // fileList: []
            formData: new FormData()
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type 
            const isLt2M = file.size / 1024 / 1024 < 2;

            if ((isJPG != 'image/jpeg') && (isJPG != 'image/png')) {
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                return
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return
            }
            this.formData.set("avatar", file)
            console.log(file)
            // console.log("form中",this.formData.get("avatar"))
            // console.log(this.formData.has("avatar"))
            return isJPG && isLt2M ;
        },
        creatGroup() {
            let groupInfo = { //测试数据
                name: this.name,
                topic: this.topic,
                desc: this.discription,
                sid: this.sessionId
            }
            this.formData.append('name', this.name)
            this.formData.append('topic', this.topic)
            this.formData.append('desc', this.discription)
            this.formData.append('sid', this.sessionId)
            if(!this.formData.has("avatar")){
                this.formData.delete("avatar")
            }
            let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
            // console.log("state中的"+this.sessionId)
            let groupTestInfo = { //post模拟数据 测试数据
                "code": 0,
                "msg": "200",
                "data": "dC0MmYm9fSvLufUIf-0CAA"
            }
            
            var that = this;
            
            this.$http.post('http://localhost:3000/posts',groupInfo).then(async function(response){ //测试接口
            // this.$http.post('v1/rooms', this.formData, config).then(async function(response){ //正式用
                // const res = response.data //正式用
                const res = groupTestInfo//测试时使用
                console.log(res)
                //推送roomid
                await that.$store.dispatch('pushRoomId',res.data)
                if(res.code == 0) {
                    that.$store.dispatch('getGroupInfo')
                    
                    window.sessionStorage.setItem('ROOMROOT', true)
                    window.sessionStorage.setItem('FIRSTCRT','true')
                    that.$message({
                        message:"创建成功!",
                        type:'success'
                    })
                    that.$router.push({
                        path: '/home/profilehome',
                        // name: 'profilehome',
                        query:{id: res.data}
       　　         })//测试时用 //是否要换成房间url？

                }else {
                    that.$message({
                        message:"链接失败!",
                        type:'error'
                    })
                }
            
            })
            // .catch(function(error){
            //         that.$message({
            //             message: "链接失败！",
            //             type: 'error'
            //         })
            // })
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
