<template>
    <el-container>
        <!-- 侧边区 -->
        <el-aside width="15%">
            <div class="sidecont">
                <router-link to="/home/enter">
                    <i class="el-icon-edit-outline"></i>
                </router-link>
                <router-link to="/home/chatroom">
                    <i class="el-icon-chat-square"></i>
                </router-link>
                <router-link to="/home/profilehome">
                    <i class="el-icon-user"></i>
                </router-link>
            </div>
        </el-aside>
        <el-main>
            <!-- <div>Main</div> -->
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {

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
</style>