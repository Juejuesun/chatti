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
                <el-form label-position="top" >
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
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>         
                    </el-form-item>
                    <!-- <el-form-item label="Photo">
                        <el-input type="textarea" placeholder="photo"></el-input>
                    </el-form-item> -->
                    <el-form-item label="Name">
                        <el-input placeholder="Type your name" v-model="uname"></el-input>
                    </el-form-item>
                    <el-form-item label="Phone">
                        <el-input placeholder="(123) 456-789" v-model="uphone"></el-input>
                    </el-form-item>
                    <el-form-item label="Email">
                        <el-input placeholder="you@yoursite.com" v-model="uemail"></el-input>
                    </el-form-item>
                    <el-form-item label="Discription">
                        <el-input placeholder="Yourself Discription" v-model="udiscription"></el-input>
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
export default {
    data() {
        return {
            imageUrl: '',
            uname: '',
            uphone: '',
            uemail: '',
            udiscription: ''
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
        savePreference() {
            let memberInfo = { //post模拟数据
                'uname': this.uname,
                'uphone': this.uphone,
                'uemail': this.uemail,
                'udiscription': this.udiscription
            }
            this.$store.dispatch('savePreferences',memberInfo)
            this.uname = ''
            this.uphone = ''
            this.uemail = ''
            this.udiscription = ''
            this.$message({
                message:"修改成功!",
                type:'success'
            })
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
