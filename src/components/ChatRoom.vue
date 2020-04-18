<template>
    <el-container>
        <el-container>
            <el-header>
                <ChatHeader/>
            </el-header>
             
            <el-main class="maincontent">
                <div>
                    Main
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
import ChatHeader from './ChatHeader'
import ChatFooter from './ChatFooter'
export default {
    components: {
        ChatHeader,
        ChatFooter
    },
    data() {
        return {
            isShow: false
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
    }
}
</script>

<style scoped>
.maincontent{
    height: 400px;
}
.bg {
    /* background: red; */
}
</style>