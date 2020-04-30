<template>
    <div >
        <div class="contbox">
            <div class="cont">
                <div>
                    <el-avatar size="large" :src="imgUrl" fit="fit">
                        <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image> -->
                    </el-avatar>
                </div>
                <div class="msg">
                    <h5>{{groupInfo.groupName}}</h5>
                    <div class="types">{{groupMembers}}members · {{groupInfo.groupTopic}}</div>
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
            <el-input placeholder="Search for message or users..." suffix-icon="el-icon-search" v-model="sec" @keyup.enter.native="searchTextNow"></el-input>
            <el-drawer title="查找记录" :visible.sync="drawer" direction="btt" :with-header="false" :size="'60%'">
                <h5>查找记录</h5>
                <ul style="background-color: pink">
                    <li v-for="(chat, index) in searchChatText" :key="index">
                        <h5>{{chat.uname}}</h5>
                        <p>{{chat.msg}}</p>
                    </li>
                </ul>
            </el-drawer>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import More from './More'

export default {
    components: {
        More,
    },
    data() {
        return {
            search: false,
            sec: '',
            drawer: false,
            imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
    },
    computed: {
        ...mapState(['groupInfo','groupMembers','searchChatText']),
        
    },
    methods: {
        searchTextNow() {
            console.log(this.sec)
            this.$store.dispatch('showSearch',this.sec)
            this.drawer = true
        },
        getImeUrl() {
            this.imgUrl = this.groupInfo.groupAvatar
        }
    },
    mounted() {
        this.getImeUrl()
    },
    updated() {
        this.getImeUrl()
    },
    sockets:{ //在此接收又服务器发送过来的数据 ps：注意此处的方法名要与服务器的发送的事件保持一致才能接收到
        clientNum(Num){
            console.log(typeof Num)
            
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
el-popover{
    background-color: rgba(255, 255, 255) !important;
    box-shadow: 0 0 rgba(255, 255, 255) !important;
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
    cursor: pointer;
}
</style>