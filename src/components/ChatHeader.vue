<template>
    <div >
        <div class="contbox">
            <div class="cont">
                <div>
                    <el-avatar size="large" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fit">
                        <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image> -->
                    </el-avatar>
                </div>
                <div class="msg">
                    <h5>Matthew Wiggins</h5>
                    <div class="types">{{members}}members · {{topic}}</div>
                </div>
            </div>
            <div>
                <i class="el-icon-search" @click="search=!search"></i>
                <router-link to="/home/chatroom/share">
                    <i class="fa fa-share-alt"></i>
                </router-link>
                <el-popover placement="bottom" trigger="click" visible-arrow="true">
                    <more/>
                    <!-- <el-button slot="reference">click 激活</el-button> -->
                    <i slot="reference" class="el-icon-more"></i>
                </el-popover>
            </div>
        </div>
        <div v-show="search">
            <el-input placeholder="Search this chat" suffix-icon="el-icon-search"></el-input>
        </div>
    </div>
</template>

<script>
import More from './More'
export default {
    components: {
        More
    },
    data() {
        return {
            members: 35,
            topic: 'HTML, CSS and Javascript help',
            search: false
        }
    }
}
</script>

<style scoped>
.el-image{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.cont{
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.contbox{
    /* height: 30%; */
    display: flex;
    /* flex-direction: row; */
    justify-content: space-between;
    align-items: center;
}
.msg{
    margin-left: 15px;
}
.el-popover{
    background-color: rgba(255, 255, 255, 0) !important;
    box-shadow: 0 0 rgba(255, 255, 255, 0) !important;
}
h5{
    margin: 10px !important;
    margin-left: 0 !important;
}
.types{
    font-size: 12px;
    color: #606266;
}
i{
    margin: 15px;
}
</style>