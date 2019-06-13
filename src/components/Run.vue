<template>
    <div class="form">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form ref="form" :model="selected" label-width="120px">
                    <el-form-item label="도메인">
                        <el-select v-model="selected.domain" placeholder="Domain">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="키워드">
                        <el-select v-model="selected.keyword" placeholder="Keyword">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="타이틀">
                        <el-select v-model="selected.title" placeholder="Title">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="스크립트">
                        <el-select v-model="selected.script" placeholder="Script">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="채널">
                        <el-select v-model="selected.channel" placeholder="Channel">
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="14">
                <el-col :span="20">
                    <el-form :model="video" label-width="120px">
                        <el-form-item label="영상 경로">
                            <el-input
                                    v-model="video.path"
                                    disabled></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">Search</el-button>
                </el-col>
                <el-table
                    :data="video.videos"
                    size="middle"
                    border
                    max-height="225px"
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
                video: {
                    videoPath: '',
                    videos: [{
                        title: 'video title',
                        result: 'Uploaded'
                    },{
                        title: 'video title',
                        result: 'Uploaded'
                    },{
                        title: 'video title',
                        result: 'Uploaded'
                    },{
                        title: 'video title',
                        result: 'Uploaded'
                    },{
                        title: 'video title',
                        result: 'Uploaded'
                    },]
                }
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        }
    }
</script>

<style scoped>
    .form{
        margin-top: 10px;
    }
</style>