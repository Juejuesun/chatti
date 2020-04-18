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

export default {
    components: {
        Profile,
        Settings
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