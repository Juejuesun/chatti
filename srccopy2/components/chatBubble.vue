<template>
    <el-card class="box-card" shadow="hover">
        <div>{{msgbubble}}</div>
        <!-- <div>{{uname}}</div> -->
        <div class="msgdate">{{datebubble}}</div>
    </el-card>
</template>

<script>
export default {
    props:{
		msgbubble: String,
		datebubble: String,
	},
    data() {
        return {
            msg: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念',
            uname: 'Lauv',
            date: '20:32:50'
        }
    }
}
</script>

<style scoped>
.box-card{
    width: 380px;
    background-color: #EBEEF5;
}
.msgdate{
    font-size: 10px;
    margin-top: 10px;
}
</style>