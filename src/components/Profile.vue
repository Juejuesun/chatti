<template>
    <div>
        
        <el-row type="flex" justify="center">
            <el-col :span="18" label-position="top">
                <h3>Profile</h3>
                <el-input placeholder="Search for message or users... " suffix-icon="el-icon-search"></el-input>
            </el-col>
        </el-row>

        <!-- 卡片1 头像 -->
        <el-row type="flex" justify="center">
            <el-col :span="18">
                <el-card class="box-card">
                    <div class="cont1">
                        <div>
                            <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
                        </div>
                        <div>
                            <h3>Matthew Wiggins</h3>
                        </div>
                        <div>
                            <p>Bootstrap is an open source toolkit for developing web with HTML.</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 卡片2 主体-->
        <el-row type="flex" justify="center">
            <el-col :span="18">
                <el-card class="box-card" :span="18">
                    <div class="cont2">
                        <div>
                            <p>Country</p>
                            <h4>Warsaw, Poland</h4>
                        </div>
                        <div>
                            <i class="el-icon-map-location"></i>
                        </div>
                    </div>
                    <div class="cont2">
                        <div>
                            <p>Phone</p>
                            <h4>+39 02 87 21 43 19</h4>
                        </div>
                        <div>
                            <i class="el-icon-microphone"></i>
                        </div>
                    </div>
                    <div class="cont2">
                        <div>
                            <p>Email</p>
                            <h4>anna@gmail.com</h4>
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
export default {
    
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
