<template>
    <el-form class="settings" label-width="120px">
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="도메인">
                    <el-input
                        v-model="domainPath"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary"
                           @click="onClick('setDomainPath')">Search</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="키워드">
                    <el-input
                        v-model="keywordPath"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary"
                            @click="onClick('setKeywordPath')">Search</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="타이틀">
                    <el-input
                        v-model="titlePath"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary"
                            @click="onClick('setTitlePath')">Search</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="로그인 정보">
                    <el-input
                        v-model="loginPath"
                        disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary"
                            @click="onClick('setLoginPath')">Search</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    const dialog = require('electron').remote.dialog;
    import { mapGetters } from 'vuex'
    export default {
        name: "Settings",
        methods: {
            onClick(commitParameter) {
                dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: [
                    { name: "Text Files", extensions: ['txt']}
                ]
            }, (filePaths) => {
                    this.$store.commit(commitParameter, {
                        path: filePaths[0]
                    })
                })
            }
        },
        computed: mapGetters({
            domainPath : 'getDomainPath',
            keywordPath : 'getKeywordPath',
            titlePath : 'getTitlePath',
            loginPath: 'getLoginPath'
        })
    }
</script>

<style scoped>
    .settings{
        margin-top: 10px;
    }
</style>