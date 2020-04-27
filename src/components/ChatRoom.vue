<template>
    <el-container>
        <el-container>
            <el-header>
                <ChatHeader/>
            </el-header>
             
            <el-main class="maincontent">
                <div>
                    Main
                    <ul>
                        <li v-for="(chat, index) in chatText" :key="index">
                            <h5>{{chat.uname}}</h5>
                            <p>{{chat.msg}}</p>
                        </li>
                    </ul>
                </div>
            </el-main>
            <el-footer>
                <!-- <ChatFooter/> -->
                <div class="cont">
                    <el-input placeholder="Search for message or users... " suffix-icon="fa fa-smile-o" v-model="msg"></el-input>
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
// import ChatFooter from './ChatFooter'
export default {
    components: {
        ChatHeader,
        // ChatFooter
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
            if(to.path === '/home/chatroom') {
                this.isShow = false
            } else {
                this.isShow = true
            }
        }
    },
    methods: {
        // ...mapState(['getGroupInfo']),
        getChatText() {
            this.$store.dispatch('getChatText')
            console.log(this.chatText)
        },
        send() {
            let transdata = {
                msg:this.msg,
                uname:this.memberInfo.memberName,
                room: this.groupInfo.groupId
            }
            this.$socket.emit("chat",transdata);
            this.msg = ''
        }
    },
    computed: {
        ...mapState(['chatText','memberInfo','groupInfo'])
    },
    // mounted() {
    //     // this.getChatText();
    //     // this.$socket.emit('login','haha');
        
    // },
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
                uname: data.uname,
                msg: data.msg
            }
            this.chatText.push(chatmsg)//调试时使用
        },
        response(respond) {
            console.log(respond)
            let joinmsg = {
                 uname: respond
            }
            this.chatText.push(joinmsg)//调试时使用
        }
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
    margin-left: 10px;
}
</style>