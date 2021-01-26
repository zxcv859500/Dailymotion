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
            <el-col :span="18"
            style="visibility: hidden">
                1
            </el-col>
            <el-col :span="1">
                <i v-if="loading" class="el-icon-loading"></i>
                <i v-else class="el-icon-view"></i>
            </el-col>
            <el-col :span="2">
                <el-button class="button start" @click="onClickRun">시작</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" @click="onClickStop" class="button stop">중지</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    const dialog = require('electron').remote.dialog;
    import dm from 'dailymotion-sdk';
    const path = require('path');
    const sf = require('sf');
    const fs = require('fs');

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
                            'creation', 'webcam', 'music', 'fun'],
                timeId: null,
                current: {
                    loginIndex: 0,
                    videoIndex: 0,
                    count: 1
                },
                flag: false,
                loading: false
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
            },
            onClickRun() {
                this.loading = true;
                this.timeId = setInterval(() => {
                    if (this.videoList.length <= 0) {
                        this.onClickStop();
                        return null;
                    }
                    if (this.current.count >= 5) {
                        this.current.count = 1;
                        this.current.loginIndex++;
                        if (this.current.loginIndex >= this.loginList.length) {
                            this.current.loginIndex = 0;
                        }
                    }
                    Array.prototype.randomElement = function () {
                        return this[Math.floor(Math.random() * this.length)]
                    };

                    const title = this.titleList.randomElement(),
                        keyword = this.keywordList.randomElement(),
                        domain = this.domainList.randomElement();

                    const genTitle = this.gen({
                        title: title,
                        keyword: keyword,
                        domain: domain,
                        script: this.scriptList.randomElement()
                    });

                    this.Run({
                        username: this.loginList[this.current.loginIndex].id,
                        password: this.loginList[this.current.loginIndex].password
                    }, {
                        videoPath: this.videoPath,
                        title: this.videoList[this.current.videoIndex].title
                    }, {
                        title: genTitle,
                        tags: sf('{keyword},{title},{domain}', {
                            keyword: keyword,
                            title: title,
                            domain: domain
                        }),
                        channel: this.channelList.randomElement(),
                        description: genTitle
                    }, 5);
                    if (this.videoList[this.current.videoIndex].result !== 'Ready') {
                        this.current.videoIndex++;
                        this.current.count++;
                    }
                }, 60000 * 15);
            },
            onClickStop() {
                this.loading = false;
                clearInterval(this.timeId);
            },
            Run(loginInfo, videoInfo, meta, tryCnt) {
                this.flag = false;
                const dmApiKey = '8d05b3d96130d282210e';
                const dmSecretKey = '9ff5546026c1c915d611cb4493e09f80dc63a850';

                if (this.videoList[this.current.videoIndex].result === 'Uploaded') return;
                if (tryCnt >= 5) {
                    this.flag = true;
                    this.videoList[this.current.videoIndex].result = "Failed";
                }

                const client = new dm.client(dmApiKey, dmSecretKey, ['manage_videos']);
                client.setCredentials("password", {
                    username: loginInfo.username,
                    password: loginInfo.password
                });
                client.createToken((err)=>{
                    if (err || client.credentials.access_token === undefined) {
                        this.flag = true;
                        console.log("Error! " + JSON.stringify(err));
                        this.videoList[this.current.videoIndex].result = "Failed";
                    } else {
                        console.log("username : " + loginInfo.username + " count : " + this.current.count);
                        client.upload({
                            filepath: path.join(videoInfo.videoPath, videoInfo.title),
                            meta: {
                                title: meta.title,
                                tags: meta.tags,
                                channel: meta.channel,
                                description: meta.description,
                                published: 'true'
                            },
                            done: (err, res) => {
                                if (err) {
                                    this.flag = true;
                                    console.log("Error! " + JSON.stringify(err));
                                    this.videoList[this.current.videoIndex].result = "Failed";
                                } else if (res) {
                                    this.flag = true;
                                    this.videoList[this.current.videoIndex].result = "Uploaded";

                                    fs.unlink(path.join(videoInfo.videoPath, videoInfo.title), (err) => {
                                        if (err) console.log(err);
                                    })
                                } else {
                                    this.flag = true;
                                    console.log("Error! " + JSON.stringify(err));
                                    this.videoList[this.current.videoIndex].result = "Failed";
                                }
                            }
                        })
                    }
                });

                setTimeout(() => {
                    if (this.flag === false) {
                        this.Run(loginInfo, videoInfo, meta, tryCnt++);
                    }
                }, 5000);
            },
            gen(selected) {
                const special = [
                    { left: '⊆', right: '⊇' },
                    { left: '▶', right: '◀'},
                    { left: '【', right: '】'},
                    { left: '『', right: '』'},
                    { left: '〔 ', right: '〕'}
                ];
                const fill = (str) => {
                    let result = [];
                    str.split("").forEach((ele) => {
                        result.push(ele);
                    });

                    return result.join('-');
                };
                let base;
                let keyword = selected.keyword,
                    domain = selected.domain,
                    title = selected.title;
                let lanLeft, lanRight;

                Array.prototype.randomElement = function () {
                    return this[Math.floor(Math.random() * this.length)]
                };

                const ranSpe = special.randomElement();

                if (selected.script === '스크립트1' || selected.script === '스크립트3') {
                    //keyword = fill(keyword);
                    //domain = fill(domain);
                    //title = fill(title);
                }

                if (selected.script === '스크립트1' || selected.script === '스크립트2') {
                    let chi = [];

                    let text = fs.readFileSync(path.join(__static, 'chiness.txt'), 'utf-8');
                    text = text.replace(/(\s*)/g, "");
                    text.split(',').forEach((ele) => {
                        chi.push(ele);
                    });
                    lanLeft = chi.randomElement();
                    lanRight = chi.randomElement();

                } else if (selected.script === '스크립트3' || selected.script === '스크립트4') {
                    let jap = [];

                    let text = fs.readFileSync(path.join(__static, 'japan.txt'), 'utf-8');
                    text = text.replace(/(\s*)/g, "");
                    text.split(',').forEach((ele) => {
                        jap.push(ele);
                    });
                    lanLeft = jap.randomElement();
                    lanRight = jap.randomElement();
                }
                base = sf('{title}{leftJap}{leftSpe} {domain} {rightSpe}{rightJap}{keyword}',
                    { title: title, keyword: keyword, domain: domain,
                        leftJap: lanLeft, rightJap: lanRight,
                        leftSpe: ranSpe.left, rightSpe: ranSpe.right });
                return base;
            }
        },
        computed: mapGetters({
            domainList: 'getDomainList',
            keywordList: 'getKeywordList',
            titleList: 'getTitleList',
            videoList: 'getVideoList',
            videoPath: 'getVideoPath',
            loginList: 'getLoginList'
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
    .el-icon-loading {
        margin-top: 10px;
    }
    .el-icon-view {
        margin-top: 10px;
    }
</style>