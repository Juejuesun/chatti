<template>
    <div>
        <el-card class="box-card">
            <router-link to="/home/chatroom/edit" class="contin">
                <div>Mute</div>
                <div><i class="fa fa-sliders"></i></div>
            </router-link>
            <div class="contin">
                <div>Delete</div>
                <div><i class="el-icon-delete"></i></div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

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