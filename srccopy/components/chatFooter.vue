<template>
<!-- 注意，此组件没有使用，只用于调试 -->
    <div>
        <div class="cont">
            <el-input placeholder="Send your message..." style="width: 80%;"  v-model="msg" @keyup.enter.native="send"></el-input>
            <el-popover placement="top" trigger="click" visible-arrow="true" >
                   <VEmojiPicker @select="selectEmoji" />
                    <!-- <el-button slot="reference">click 激活</el-button> -->
                    <i slot="reference" class="fa fa-smile-o emojiwin"></i>
                </el-popover>
            <!-- <div class="emojiwin" @click="showEmojiBord=!showEmojiBord"><i class="fa fa-smile-o"></i></div> -->
            <el-button class="thisBtn" type="primary" icon="el-icon-s-promotion" circle @click="send"></el-button>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import VEmojiPicker from 'v-emoji-picker';

export default {
    components: {
        VEmojiPicker
        // chatBubble
    },
    data() {
        return {
            // chatTexts: this.chatText
            msg: '',
            showEmojiBord: false
        }
    },
    methods: {
        selectEmoji(emoji) {
            // console.log(emoji)
            this.msg += emoji.data
        },
        send() {
            let transdata = {
                msg: this.msg,
                name: this.memberInfo.memberName,
                room: this.groupInfo.groupId,
                date: moment().format("HH:mm:ss")
            }
            // console.log(transdata)
            this.$socket.emit("chat",transdata);
            this.msg = ''
        },
    },
    computed: {
        ...mapState(['chatText','memberInfo','groupInfo'])
    },
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
    margin: 5px;
    margin-left: 10px;
    margin-top: 0;
}
.emojiwin {
    margin: 5px;
    margin-right: 0;
    font-size: 23px;
    color: #909399;
}
</style>