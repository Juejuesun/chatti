<template>
    <div >
        <div>
            <i class="el-icon-arrow-left" @click="back"></i>
        </div>
        <div class="cont">
            <div>
                <el-avatar size="large" :src="imgUrl" fit="fit">
                    <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image> -->
                </el-avatar>
            </div>
            <div class="msg" @mouseenter="showLink=true" @mouseleave="showLink=false">
                <h5>{{groupInfo.groupName}}</h5>
                <div class="types">{{groupInfo.groupUrl}}<i @click="CopyUrl" v-show="showLink" class="el-icon-link"></i></div>
            </div>
        </div>
        <div class="itc">
            <h3>{{introduction}}</h3>
            <p>{{groupInfo.groupDiscription}}</p>
        </div>
        <!-- 卡片区 -->
        <div class="bg">
            <el-card class="box-card">
                <div class="cont2" @click="shareGroup">
                    <div>Twtter</div>
                    <div><i class="fa fa-twitter"></i></div>
                </div>
                <div class="cont2" @click="shareGroup">
                    <div>Facebook</div>
                    <div><i class="fa fa-facebook"></i></div>
                </div>
                <div class="cont2" @click="shareGroup">
                    <div>Github</div>
                    <div><i class="fa fa-github"></i></div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            introduction: 'introduction',
            showLink: false,
            imgUrl: ''
        }
    },
    computed: {
       ...mapState(['groupInfo','memberInfo'])
    },
    methods: {
        back() {
            // console.log(this.$router) 
            this.$router.push('/home/chatroom')
        },
        CopyUrl(data){
            let Url2 = this.groupInfo.groupUrl;
            let oInput = document.createElement("input");
            oInput.value = Url2;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = "oInput";
            oInput.style.display = "none";
            this.$message({
                message:"复制成功!",
                type:'success'
            })
        },
        getImeUrl() {
            this.imgUrl = this.groupInfo.groupAvatar
        },
        shareGroup() {
            this.CopyUrl()
            this.$confirm('复制成功！快去分享吧', '提示', {
                confirmButtonText: '确定',
                type: 'success',
                center: true,
                showClose: false,
                showCancelButton: false
            })
        }
    },
    mounted() {
        this.getImeUrl()
    },
    updated() {
        this.getImeUrl()
    },
}
</script>

<style scoped>
.cont {
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.cont2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
    cursor: pointer;
}
.cont2:hover {
    color: #409EFF;
}
.msg {
    margin-left: 15px;
}
h5 {
    margin: 10px !important;
    margin-left: 0 !important;
}
.types {
    font-size: 15px;
    color: #606266;
}
i {
    cursor: pointer;
}
.bg{
    background-color: #EBEEF5;
    padding: 10px;
    padding-bottom: 20px;
    margin-top: 0;
    height: 350px;
}
.itc {
    padding: 10px;
}
</style>