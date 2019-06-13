<template>
    <el-menu
            default-active="2"
            class="el-menu-vertical"
            :router="true">
        <el-menu-item index="Run">
            <i class="el-icon-check"></i>
            <span>Run</span>
        </el-menu-item>
        <el-menu-item index="Settings">
            <i class="el-icon-setting"></i>
            <span>Settings</span>
        </el-menu-item>
        <el-menu-item index="Exit">
            <i class="el-icon-close"></i>
            <span>Exit</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>

</style>