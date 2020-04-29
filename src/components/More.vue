<template>
    <div>
        <el-card class="box-card">
            <router-link to="/home/chatroom/edit" class="contin">
                <div>Mute</div>
                <div><i class="fa fa-sliders"></i></div>
            </router-link>
            <div class="contin" @click="deleteRoom">
                <div>Delete</div>
                <div><i class="el-icon-delete"></i></div>
            </div>
        </el-card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['sessionId'])
    },
    methods: {
        async deleteRoom() {
            const {data: res} = await this.$http.delete('http://localhost:3000/delh',this.sessionId) //测试接口
            let ssid = {
                sid: this.sessionId
            }
            // const {data: res} = await this.$http.delete('v1/rooms',{params: ssid})//正式用
            // const res = JSON.parse(resj)
            console.log(res)
            alert('删除成功！')
        }
    }
}
</script>

<style scoped>
.box-card{
    width: 150px;
    height: 80px;
}
.contin{
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-bottom: 10px;
    /* margin-top: 10px; */
}

</style>