<template>
    <div class="form">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form ref="form" :model="selected" label-width="120px">
                    <el-form-item label="도메인">
                        <el-select v-model="selected.domain" placeholder="Domain">
                            <el-option
                                v-for="item in domainList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="키워드">
                        <el-select v-model="selected.keyword" placeholder="Keyword">
                            <el-option
                                v-for="item in keywordList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="타이틀">
                        <el-select v-model="selected.title" placeholder="Title">
                            <el-option
                                v-for="item in titleList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="스크립트">
                        <el-select v-model="selected.script" placeholder="Script">
                            <el-option
                                v-for="item in scriptList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="채널">
                        <el-select v-model="selected.channel" placeholder="Channel">
                            <el-option
                                v-for="item in channelList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="14">
                <el-col :span="19">
                    <el-form label-width="120px">
                        <el-form-item label="영상 경로">
                            <el-input
                                    v-model="videoPath"
                                    disabled></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="onClickSearch">Search</el-button>
                </el-col>
                <el-table
                    :data="videoList"
                    size="middle"
                    border
                    max-height="230px"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                        prop="title"
                        label="Title"
                        width="385"
                        :resizable="false">
                    </el-table-column>
                    <el-table-column
                        prop="result"
                        label="Result"
                        width="100"
                        :resizable="false">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="19"
            style="visibility: hidden">
                1
            </el-col>
            <el-col :span="2">
                <el-button class="button start">시작</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" class="button stop">중지</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    const dialog = require('electron').remote.dialog;

    export default {
        name: "Run",
        data() {
            return {
                selected: {
                    domain: '',
                    keyword: '',
                    title: '',
                    script: '',
                    channel: ''
                },
                scriptList: ['스크립트1', '스크립트2', '스크립트3', '스크립트4'],
                channelList: ['tv', 'videogames', 'school', 'tech', 'news', 'animals',
                            'lifestyle', 'auto', 'people', 'sport', 'kids', 'travel', 'shortfilms',
                            'creation', 'webcam', 'music', 'fun']
            }
        },
        methods: {
            tableRowClassName({row}) {
                if (row.result === 'Failed') {
                    return 'warning-row';
                } else if (row.result === 'Uploaded') {
                    return 'success-row';
                }
                return '';
            },
            onClickSearch() {
                dialog.showOpenDialog({properties: ['openDirectory']}, (filePaths) => {
                    this.$store.commit('setVideoPath', {
                        path: filePaths[0]
                    })
                });
            }
        },
        computed: mapGetters({
            domainList: 'getDomainList',
            keywordList: 'getKeywordList',
            titleList: 'getTitleList',
            videoList: 'getVideoList',
            videoPath: 'getVideoPath'
        })
    }
</script>

<style>
    .form{
        margin-top: 10px;
    }
    .el-table .warning-row {
        background: oldlace;
    }
    .el-table .success-row {
        background: #f0f9eb;
    }
    .el-button {
        margin-left: 2px;
    }
</style>