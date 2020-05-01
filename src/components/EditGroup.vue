<template>
    <div>
        <i class="el-icon-arrow-left" @click="back"></i>
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-card class="box-card">
                    <!-- <i class="el-icon-arrow-left" @click="back"></i> -->
                    <div class="cont1">
                        <div>
                           <el-avatar :size="80" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fit">
                                <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image> -->
                            </el-avatar>
                        </div>
                        <div>
                            <h3>{{groupInfo.groupName}}</h3>
                        </div>
                        <div>
                            <p>{{groupInfo.groupDiscription}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 表单区 -->
        <div class="bg">
        <el-row type="flex" justify="center">
            <el-col :span="24">
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
                        <el-input placeholder="Group Name" v-model="editInfo.gname"></el-input>
                    </el-form-item>
                    <el-form-item label="Topic(optional)">
                        <el-input placeholder="Group Topic" v-model="editInfo.gtopic"></el-input>
                    </el-form-item>
                    <el-form-item label="Discription">
                        <el-input placeholder="Group Discription" v-model="editInfo.gdec"></el-input>
                    </el-form-item>
                </el-form>        
            </el-col>
        </el-row>
        <el-row  type="flex" justify="center">
            <!-- <el-col :span="12"> -->
                <el-button type="primary" @click="saveEditGro">Save Preferences</el-button>
            <!-- </el-col> -->
        </el-row>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            imageUrl: '',
            editInfo: {
                gname: '',
                gtopic: '',
                gdec: '',
                sid: ''
            },
            formData: new FormData()
        };
    },
    computed: {
        ...mapState(['groupInfo','sessionId'])
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
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            const filid= file.uid
            let filidod = file.uid 
            if(filid == filidod){
                this.formData.append("avatar", file) //
            }else{
                this.formData.set("avatar", file)
            }
            return isJPG && isLt2M ;
        },
        back() {
            // console.log(this.$router) 
            this.$router.push('/home/chatroom')
        },
        async saveEditGro() {
            this.editInfo.sid = this.sessionId
            // console.log(this.editInfo)
            // const {data: res} = await this.$http.put('http://localhost:3000/comments', this.editInfo)//t测试接口
            this.formData.append('name', this.editInfo.gname)
            this.formData.append('sid', this.editInfo.sid)
            this.formData.append('topic', this.editInfo.gtopic)
            this.formData.append('desc', this.editInfo.gdec)
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            if(!this.formData.has("avatar")){
                this.formData.delete("avatar")
            }
            const {data: res} = await this.$http.put('v1/rooms', this.formData, config) //房间设置 正式时用
            console.log(res)
            //判断语句
            this.$store.dispatch('getGroupInfo')
            this.$message({
                message: "修改成功！",
                type:'success'
            })
        }
    }
}
</script>

<style scoped>
.cont1{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.el-image{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.box-card{
    margin-top: 15px;
    /* margin-bottom: 10px; */
    margin-bottom: 0;
}
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
.el-icon-arrow-left {
    cursor: pointer;
}
.bg {
    background-color: #EBEEF5;
    padding: 10px;
    padding-bottom: 20px;
    margin-top: 0;
}
</style>
