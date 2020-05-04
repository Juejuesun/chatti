<template>
    <div>
        <el-card class="box-card" shadow="never" style="border-style: none;">
            <div class="look">
                <router-link to="/home/chatroom/edit" class="contin">
                    <div>EditInfo</div>
                    <div><i class="fa fa-sliders"></i></div>
                </router-link>
            </div>
            <div class="look">
                <div class="contin" @click="deleteRoom">
                    <div>Delete</div>
                    <div><i class="el-icon-delete"></i></div>
                </div>
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
        deleteRoom() {
            // const {data: res} = await this.$http.delete('http://localhost:3000/delh',this.sessionId) //测试接口
            const root = window.sessionStorage.getItem('ROOMROOT')
            let ssid = {
                sid: this.sessionId
            }
           
            if(root) {
                this.$confirm('此操作将解散房间, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                // }).then(() => {//测试
                }).then(async () => {//正式
                    const {data: res} = await this.$http.delete('v1/rooms',{params: ssid})//正式用
                    // console.log(res)
                    if(res.code === 0) //正式使用
                    this.$store.dispatch('clearChatText')
                    console.log('ccc')
                    this.$message({
                        type: 'success',
                        message: '房间已解散!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }else {
                this.$message({
                        type: 'warning',
                        message: '抱歉！您不是房主，无此操作权限！'
                    });
            }
            
            
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
    text-decoration:none !important;
    color: #909399;
}
.look :hover{
    color: #409EFF;
}
.look {
    cursor: pointer;
}
</style>