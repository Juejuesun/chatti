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
        <el-aside>
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
    }
}
</script>

<style scoped>
.maincontent{
    height: 400px;
}
</style>