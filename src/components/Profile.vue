<template>
    <div>
        
        <el-row >
            <el-col :span="24">
                <h3>Profile</h3>
                <!-- <el-input placeholder="Search for message or users... " suffix-icon="el-icon-search"></el-input> -->
            </el-col>
        </el-row>

        <!-- 卡片1 头像 -->
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="cont1">
                        <div>
                            <el-avatar :size="80" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fit">
                                <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image> -->
                            </el-avatar>
                            
                        </div>
                        <div>
                            <h3>{{memberInfo.memberName}}</h3>
                        </div>
                        <div>
                            <p>{{memberInfo.memberDes}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 卡片2 主体-->
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-card class="box-card" >
                    <div class="cont2">
                        <div>
                            <p>Country</p>
                            <h4>{{memberInfo.memberCountry}}</h4>
                        </div>
                        <div>
                            <i class="el-icon-map-location"></i>
                        </div>
                    </div>
                    <div class="cont2">
                        <div>
                            <p>Phone</p>
                            <h4>{{memberInfo.memberPhone}}</h4>
                        </div>
                        <div>
                            <i class="el-icon-microphone"></i>
                        </div>
                    </div>
                    <div class="cont2">
                        <div>
                            <p>Email</p>
                            <h4>{{memberInfo.memberEmail}}</h4>
                        </div>
                        <div>
                            <i class="el-icon-message"></i>
                        </div>
                    </div>
                    <div class="cont2">
                        <div>
                            <p>Time</p>
                            <h4>10:00 am</h4>
                        </div>
                        <div>
                            <i class="el-icon-time"></i>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapState} from 'vuex'
// import axios from 'axios'

export default {
    data() {
        return {
        //    groupInfo: {}
        }
    },
    computed: {
        ...mapState(['memberInfo'])
    }
}
</script>

<style scoped>
.cont2{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.cont1{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.el-image{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.box-card{
    margin-top: 15px;
    margin-bottom: 10px;
}
</style>
