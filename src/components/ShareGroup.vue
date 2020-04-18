<template>
    <div >
        <div>
            <i class="el-icon-arrow-left" @click="back"></i>
        </div>
        <div class="cont">
            <div>
                <el-avatar size="large" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fit">
                    <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image> -->
                </el-avatar>
            </div>
            <div class="msg" @mouseenter="showLink=true" @mouseleave="showLink=false">
                <h5>Matthew Wiggins</h5>
                <div class="types">{{url}}<i @click="CopyUrl" v-show="showLink" class="el-icon-link"></i></div>
            </div>
        </div>
        <div>
            <h2>{{introduction}}</h2>
        </div>
        <!-- 卡片区 -->
        <div class="bg">
            <el-card class="box-card">
                <div class="cont2">
                    <div>Twtter</div>
                    <div><i class="fa fa-twitter"></i></div>
                </div>
                <div class="cont2">
                    <div>Facebook</div>
                    <div><i class="fa fa-facebook"></i></div>
                </div>
                <div class="cont2">
                    <div>Github</div>
                    <div><i class="fa fa-github"></i></div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            members: 35,
            url: 'Quick setup and build tools.',
            introduction: 'introduction',
            showLink: false
        }
    },
    methods: {
        back() {
            // console.log(this.$router) 
            this.$router.push('/home/chatroom')
        },
        CopyUrl(data){
            let Url2 = this.url;
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
        }
    }
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
</style>