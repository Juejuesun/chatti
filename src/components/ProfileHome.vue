<template>
    <el-container>
        <!-- 左边区 -->
        <el-aside class="bg">
            <profile/>
        </el-aside>
        <el-main>
            <settings/>
        </el-main>
    </el-container>
</template>

<script>
import Profile from './Profile.vue'
import Settings from './Settings.vue'
import {mapState} from 'vuex'

export default {
    components: {
        Profile,
        Settings,
    },
    data() {
        return {
            len: 0
        }
    },
    computed: {
        ...mapState(['chatText','memberInfo'])
    },
    methods: {
        tip() {
            this.$notify.info({
                title: '消息',
                message: '它发了消息'
            });
        }
    },
    watch: {
        '$store.state.chatText'() {
            let newchat = this.chatText[this.chatText.length-1]
            console.log(newchat)
            if(newchat.msgType === 'msgres') {
                this.$notify.info({
                    title: 'New',
                    message: `${newchat.uname}发了消息：${newchat.msg}`
                });  
            }else {
                 this.$notify.info({
                    title: 'Tip',
                    message: newchat.uname
                });
            }
            if(this.$route.name === "profilehome") {
                const bool = false
                this.$store.dispatch('watchNew', bool)
            }
        }
    }
}
</script>

<style scoped>
.bg {
    background-color: #EBEEF5;
    padding: 10px;
    padding-bottom: 20px;
    margin-top: 0;
}
</style>