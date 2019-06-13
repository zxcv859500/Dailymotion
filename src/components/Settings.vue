<template>
    <el-form :model="path" label-width="120px">
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="도메인">
                    <el-input
                        v-model="path.domain"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">Search</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="키워드">
                    <el-input
                        v-model="path.keyword"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">Search</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="타이틀">
                    <el-input
                        v-model="path.title"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">Search</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="로그인 정보">
                    <el-input
                        v-model="path.login"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">Search</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "Settings",
        data() {
            return {
                path: {
                    domain: '',
                    title: '',
                    keyword: '',
                    login: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>