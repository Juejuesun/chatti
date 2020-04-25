<template>
    <div>
        <div class="cont">
            <el-input placeholder="Search for message or users... " suffix-icon="fa fa-smile-o" v-model="msg"></el-input>
            <el-button class="thisBtn" type="primary" icon="el-icon-s-promotion" circle @click="send"></el-button>
        </div>
        <!-- <i class="fa fa-smile-o"></i> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
    mounted() {
        // this.socket = io("http://localhost:8081");
        // this.scokets.subscribe('broadcastMsg',data => {
        //     console.log(data)
        // })
    },
    methods: {
        send() {
            let transdata = {
                msg:this.msg,
                username:'haha'
            }
            this.$socket.emit("msg",transdata);
            this.msg = ''
            this.$socket.on('broadcastMsg',data=>{
                console.log(data)
            })
            // this.$socket.on("clientNum",num => {
            //     console.log(num)
            // })
            // this.$socket.clientNum(data => {
            //     console.log(data)
            // })
        }
    },
    scokets: {
        connect(){
            console.log('成功')
        },
        clientNum(data){
            console.log("人数",data)
        },
        broadcastMsg(data) {
            console.log(data)
        }
    }
}
</script>

<style scoped>
.cont{
    display: flex;
    flex: 1;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    margin-top: 15px;
}
.thisBtn{
    margin-left: 10px;
}
</style>