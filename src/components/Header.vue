<template>
    <el-page-header class="header-el" @back="goBack" title="DailyMotion">
    </el-page-header>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .header-el{
        border-bottom: 1px solid #dcdfe6;
    }
</style>