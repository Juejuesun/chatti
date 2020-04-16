<template>
    <el-container>
        <!-- 左边区 -->
        <el-aside>
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

<style>

</style>