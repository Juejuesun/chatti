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
                <ChatFooter/>
            </el-footer>
        </el-container>
        <el-aside v-show="isShow">
            <router-view></router-view>
        </el-aside>
    </el-container>
</template>

<script>
import {mapState} from 'vuex'
import ChatHeader from './ChatHeader'
import ChatFooter from './ChatFooter'
export default {
    components: {
        ChatHeader,
        ChatFooter
    },
    data() {
        return {
            isShow: false,
            // chatTexts: this.chatText
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
        getChatText() {
            this.$store.dispatch('getChatText')
            console.log(this.chatText)
        }
    },
    computed: {
        ...mapState(['chatText'])
    },
    mounted() {
        this.getChatText();
    }
}
</script>

<style scoped>
.maincontent{
    height: 400px;
}
</style>