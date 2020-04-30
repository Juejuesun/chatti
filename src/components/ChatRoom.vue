<template>
    <el-container>
        <el-container>
            <el-header>
                <ChatHeader/>
            </el-header>
             
            <el-main class="maincontent" id="dialogue_box">
                <div>
                    <!-- Main
                    <ul>
                        <li v-for="(chat, index) in chatText" :key="index">
                            <h5>{{chat.uname}}</h5>
                            <p>{{chat.msg}}</p>
                        </li>
                    </ul> -->
                    <div v-for="(chat, index) in chatText" :key="index">
                        <div v-if="chat.msgType == 'respond'" class="respondMsg">
                            <div class="sysTime">{{chat.date}}</div>
                            <div class="respond">{{chat.uname}}</div>
                        </div>
                        <div v-else-if="chat.msgType == 'msgres'" class="msgresMsg">
                            <div v-if="chat.uname==memberInfo.memberName" class="self">
                                <el-card class="box-card" shadow="hover" style="background-color: #409EFF; color: #FFFFFF">
                                    <div>{{chat.msg}}</div>
                                    <div class="msgdate">{{chat.date}}</div>
                                </el-card>
                                <el-avatar class="msgName" :size="50">{{chat.uname}}</el-avatar>
                            </div>
                            <div v-else class="others">
                                 <el-avatar class="msgName" :size="50">{{chat.uname}}</el-avatar>
                                <el-card class="box-card" shadow="hover">
                                    <div>{{chat.msg}}</div>
                                    <div class="msgdate">{{chat.date}}</div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
            <el-footer>
                <!-- <chatFooter/> -->
                <div class="cont">
                    <el-input placeholder="Send your message..." style="width: 80%;"  v-model="msg" @keyup.enter.native="send"></el-input>
                    <div class="emojiwin">
                        <el-popover placement="top" trigger="click" visible-arrow="true" >
                            <VEmojiPicker @select="selectEmoji" />
                            <i slot="reference" class="fa fa-smile-o "></i>
                        </el-popover>
                    </div>
                    <el-button class="thisBtn" type="primary" icon="el-icon-s-promotion" circle @click="send"></el-button>
                </div>
            </el-footer>
        </el-container>
        <el-aside v-show="isShow">
            <router-view></router-view>
        </el-aside>
    </el-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ChatHeader from './ChatHeader'
import VEmojiPicker from 'v-emoji-picker';

const moment = require("moment")
export default {
    components: {
        ChatHeader,
        VEmojiPicker
    },
    data() {
        return {
            isShow: false,
            // chatTexts: this.chatText
            msg: '',
        }
    },
    watch: {
        $route(to, from) {
            // console.log(to);
            // console.log(from);
            if(to.path === '/home/chatroom') { //隐藏侧边卡片
                this.isShow = false
            } else {
                this.isShow = true
            }
        }
    },
    methods: {
        // ...mapState(['getGroupInfo']),
        selectEmoji(emoji) {
            // console.log(emoji)
            this.msg += emoji.data
        },
        getChatText() {
            this.$store.dispatch('getChatText')
            console.log(this.chatText.length)
        },
        send() {
            let transdata = {
                msg: this.msg,
                name: this.memberInfo.memberName,
                room: this.groupInfo.groupId,
                date: moment().format("HH:mm:ss")
            }
            // console.log(transdata)
            this.$socket.emit("chat",transdata);
            this.msg = ''
        },
        roolDown() {
            this.$nextTick(function(){
            var div = document.getElementById('dialogue_box');
            div.scrollTop = div.scrollHeight;
            })
        },
        // beforeunloadFn(e) {
        //     console.log('刷新或关闭')
        //     alert("lijao")
        // // ...
        // }
    },
    beforeCreate(){
        const urls = this.$route.path
        console.log(urls)
    },
    created() {
        const roomid = {
            room: this.groupInfo.groupId
        }
        this.$socket.emit("online_cnt", roomid)
        // window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    },
    computed: {
        ...mapState(['chatText','memberInfo','groupInfo'])
    },
    mounted() {
        // this.getChatText();//正式使用
        // this.$socket.emit('login','haha');
        
    },
    sockets:{ //在此接收又服务器发送过来的数据 ps：注意此处的方法名要与服务器的发送的事件保持一致才能接收到
        connect() {      //与ws:127.0.0.1:8000连接后回调
            console.log('连接成功');
        },
        online_count(Num){
            console.log(Num)
            // this.groupMembers = Num
        },
        chat(data) {
            console.log(data)
            let chatmsg = {
                uname: data.name,
                msg: data.msg,
                date: moment().format("HH:mm:ss"),
                msgType: 'msgres'
            }
            this.chatText.push(chatmsg)//调试时使用
        },
        response(respond) {
            console.log(respond)
            let joinmsg = {
                uname: respond,
                msg: '',
                date: moment().format("HH:mm:ss"),
                msgType: 'respond'
            }
            this.chatText.push(joinmsg)//调试时使用
        }
    },
    updated() {
        this.roolDown()
    }
}
</script>

<style scoped>
.maincontent{
    height: 400px;
}
.cont{
    display: flex;
    flex: 1;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    margin-top: 15px;
}
.thisBtn{
    margin: 5px;
    margin-left: 10px;
    margin-top: 0;
}
.respondMsg {
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    /* background-color: aqua; */
}
.sysTime {
    align-self: center;
    font-size: 12px;
    margin-top: 10px;
}
.respond {
    align-self: center;
    font-size: 12px;
    color: #FFFFFF;
    background-color: #909399;
    padding: 6px;
    border-radius: 11px;
}
.box-card{
    width: 380px;
    background-color: #EBEEF5;
    margin: 10px;
    
}
.msgdate{
    font-size: 10px;
    margin-top: 10px;
}
.self {
    display: flex;
    flex: 1;
    justify-content: flex-end;
}
.others {
    display: flex;
    flex: 1;
    justify-content: flex-start;
}
.msgName {
    align-self: center;
}
.emojiwin {
    margin: 5px;
    margin-right: 0;
    font-size: 23px;
    color: #909399;
}
</style>