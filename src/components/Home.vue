<template>
    <el-container>
        <!-- 侧边区 -->
        <el-aside width="10%">
            <!-- <div class="sidecont">
                <router-link to="/home/enter">
                    <i class="el-icon-edit-outline"></i>
                </router-link>
                <router-link to="/home/chatroom">
                    <i class="el-icon-chat-square"></i>
                </router-link>
                <router-link to="/home/profilehome">
                    <i class="el-icon-user"></i>
                </router-link>
            </div> -->
            <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
                <el-avatar :size="50" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fit">
                <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image> -->
                </el-avatar>
                <el-menu-item index="enter" v-show="isShowState">
                    <router-link to="/home/enter">
                        <i class="el-icon-edit-outline"></i>
                    </router-link>
                </el-menu-item>
                <el-menu-item index="chatroom" v-show="!isShowState">
                    <router-link to="/home/chatroom">
                        <i class="el-icon-chat-square"></i>
                    </router-link>
                </el-menu-item>
                <el-menu-item index="profilehome" v-show="!isShowState">
                     <router-link to="/home/profilehome">
                        <i class="el-icon-user"></i>
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4" disabled>
                    <i class="el-icon-setting"></i>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <!-- <div>Main</div> -->
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['defaultActive','isShowState'])
    },
    methods: {
        ...mapState(['getGroupInfo'])
    },
    mounted() {
        this.getGroupInfo()
    }
}
</script>

<style scoped>
i{
    font-size: 20px;
    color: #909399;
}
.sidecont{
    /* padding-top: 50%; */
    height: 100%;
    /* width: 10%; */
    display: flex;
    /* flex: 1; */
    /* flex-direction: column; */
    align-items: center;
    /* position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%); */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 25%; */
    min-height: 100%;
    /* margin: 0; */
}
</style>