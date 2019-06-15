<template>
    <el-menu
            default-active="1"
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
        <el-menu-item index="LoginInfo">
            <i class="el-icon-info"></i>
            <span>Login Info</span>
        </el-menu-item>
        <el-menu-item @click="close">
            <i class="el-icon-close"></i>
            <span>Exit</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import { remote } from 'electron'
    export default {
        name: "Nav",
        data() {
            return {
                w: remote.getCurrentWindow(),
            }
        },
        methods: {
            close() {
                this.w.close();
            }
        }
    }
</script>

<style scoped>

</style>