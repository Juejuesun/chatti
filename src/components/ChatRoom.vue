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
                    <div class="cent" >
                        <el-badge :value="msgNum" :is-dot="msgNum==-1" :hidden="msgNum==0" :max="99" class="item" type="primary">
                            <el-tag type="info" @click="getChatText" @mouseover.native="noGoDown(false)" @mouseout.native="noGoDown(true)" style="cursor: pointer;font-size: 10px;">聊天记录</el-tag>
                        </el-badge>
                    </div>
                    <div v-for="(chat, index) in chatText" :key="index">
                        <div v-if="chat.msgType == 'respond'" class="respondMsg">
                            <div class="sysTime">{{chat.date}}</div>
                            <div class="respond">{{chat.uname}}</div>
                        </div>
                        <div v-else-if="chat.msgType == 'msgres'" class="msgresMsg">
                            <div v-if="chat.uname==memberInfo.memberName&&chat.cid===sessionId.slice(0,6)" class="self">
                                <el-card class="box-card" shadow="hover" style="background-color: #409EFF; color: #FFFFFF">
                                    <div>{{chat.msg}}</div>
                                    <div class="msgdate">{{chat.date}} &nbsp;{{chat.uname}}</div>
                                </el-card>
                                <el-avatar class="msgName" :src="imgUrl" :size="50">{{chat.uname}}</el-avatar>
                            </div>
                            <div v-else class="others">
                                 <el-avatar class="msgName" :src="chat.avatar" :size="50">{{chat.uname}}</el-avatar>
                                <el-card class="box-card" shadow="hover">
                                    <div>{{chat.msg}}</div>
                                    <div class="msgdate">{{chat.date}} &nbsp;{{chat.uname}}</div>
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
                            <VEmojiPicker @select="selectEmoji" style="height: 300px; width: 225px"/>
                            <i slot="reference" class="fa fa-smile-o "></i>
                        </el-popover>
                    </div>
                    <el-button class="thisBtn" type="primary" icon="el-icon-s-promotion" circle @click="send"></el-button>
                    <!-- <div>
                        <el-badge :is-dot="msgNum!=0" @click="getChatText" :hidden="msgNum==0" :max="99" class="item" type="primary" style="cursor:pointer; font-size: 10px">聊天记录</el-badge>
                    </div> -->
                    <!-- <el-badge :value="msgNum" :is-dot="msgNum==-1" :hidden="msgNum==0" :max="99" class="item" type="primary">
                        <el-tag type="info" @click="getChatText" style="cursor: pointer;">聊天记录</el-tag>
                    </el-badge> -->
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
            imgUrl: '',
            isDown: true
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
        },
        '$store.state.isloading'() {
            if(this.$store.state.isloading === true) {
                this.$loading({
                    fullscreen: true,
                    lock: true,
                    text: '房间已被房主删除！打开此链接创建聊天室~ http://localhost/#/home/enter'
                })
            }
            
        }
    },
    methods: {
        ...mapState(['watchNew']),
        openmsg() {
            const root = window.sessionStorage.getItem('ROOMROOT')
            if(root && (window.sessionStorage.getItem('FIRSTCRT')=='true')) {
                    this.$notify({
                        title: '房间创建成功！',
                        message: `分享房间链接,即可邀请朋友进入哦!${this.groupInfo.groupUrl}`,
                        type: 'success'
                    });
                    window.sessionStorage.setItem('FIRSTCRT', 'false')
            }
            
        },
        getImeUrl() {
            this.imgUrl = this.memberInfo.memberAvatar
        },
        selectEmoji(emoji) {
            console.log(emoji)//调试
            this.msg += emoji.data
        },
        getChatText() {
            this.$store.dispatch('getChatText')
            console.log(this.chatText.length)
            // this.$loading({
            //     fullscreen: true,
            //     lock: true,
            //     text: '房间已被房主删除！打开此链接创建聊天室~ http://localhost/#/home/enter'
            // })
        },
        send() {
            let transdata = {
                msg: this.msg,
                uname: this.memberInfo.memberName,
                room: this.groupInfo.groupId,
                date: moment().format("HH:mm:ss"),
                cid: this.sessionId.slice(0,6),
                avatar: this.memberInfo.memberAvatar
            }
            // console.log(transdata)
            this.$socket.emit("chat",transdata);
            this.msg = ''
        },
        //阻拦与恢复下降
        noGoDown(isEnter) {
            this.isDown = isEnter
            // console.log(this.isDown)
        },
        //下降
        roolDown() {
            this.$nextTick(function(){
            var div = document.getElementById('dialogue_box');
            div.scrollTop = div.scrollHeight;
            })
        },
        // handleScroll() {
        //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //     if (document.documentElement.scrollTop == 0) {
        //         this.getChatText();

        //     }
        //     // this.$nextTick(function(){
        //     // var div = document.getElementById('dialogue_box');
        //     //     if(div.scrollTop == div.scrollHeight){
        //     //         this.getChatText();//
        //     //     }
        //     // })
        // },
    },
    beforeCreate(){
        const urls = this.$route.path
        console.log(urls)
    },
    created() {
        // const roomid = {
        //     room: this.groupInfo.groupId
        // }
        // this.$socket.emit("online_cnt", roomid)//暂时不用
        // window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
        this.openmsg()
    },
    computed: {
        ...mapState(['chatText','memberInfo','groupInfo','sessionId','msgNum'])
    },
    mounted() {
        // this.getChatText();//使用
        // window.addEventListener('scroll', this.handleScroll, true);
        const bool = true
        this.$store.dispatch('watchNew', bool)
    },
    destroyed() {
        // window.removeEventListener('scroll', this.handleScroll); //离开页面需要移除这个监听的事件
    },
    sockets:{ //在此接收又服务器发送过来的数据 ps：注意此处的方法名要与服务器的发送的事件保持一致才能接收到
        connect() {      //与ws:127.0.0.1:8000连接后回调
            console.log('连接成功');
        },
    },
    updated() {
        if(this.isDown) {
            this.roolDown()
        }
        this.getImeUrl()
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
    border-radius: 10px;
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
.cent {
    display: flex;
    justify-content: center;
}
</style>