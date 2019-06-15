import Vue from 'vue';
import Vuex from 'vuex';

const fs = require('fs');
const path = require('path');

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        domainPath: '',
        domain: [],
        keywordPath: '',
        keyword: [],
        titlePath: '',
        title: [],
        loginPath: '',
        login: [],
        videoPath: '',
        video: []
    },
    getters: {
        getDomainPath (state) {
            return state.domainPath;
        },
        getKeywordPath (state) {
            return state.keywordPath;
        },
        getTitlePath (state) {
            return state.titlePath;
        },
        getLoginPath (state) {
            return state.loginPath;
        },
        getVideoPath (state) {
            return state.videoPath;
        },
        getDomainList (state) {
            return state.domain;
        },
        getKeywordList (state) {
            return state.keyword;
        },
        getTitleList (state) {
            return state.title;
        },
        getLoginList (state) {
            return state.login;
        },
        getVideoList (state) {
            return state.video;
        }
    },
    mutations: {
        setDomainPath (state, payload) {
            state.domainPath = payload.path;

            let domainList = [];

            const text = fs.readFileSync(state.domainPath, 'utf-8');
            text.split('\n').forEach((ele) => {
                if (ele.trim() !== String(''))
                    domainList.push(ele);
            });
            state.domain = domainList;
        },
        setKeywordPath (state, payload) {
            state.keywordPath = payload.path;

            let keywordList = [];

            const text = fs.readFileSync(state.keywordPath, 'utf-8');
            text.split('\n').forEach((ele) => {
                if (ele.trim() !== String(''))
                    keywordList.push(ele);
            });
            state.keyword = keywordList;
        },
        setTitlePath (state, payload) {
            state.titlePath = payload.path;

            let titleList = [];

            const text = fs.readFileSync(state.titlePath, 'utf-8');
            text.split('\n').forEach((ele) => {
                if (ele.trim() !== String( ''))
                    titleList.push(ele);
            });
            state.title = titleList;
        },
        setLoginPath (state, payload) {
            state.loginPath = payload.path;

            let loginList = [];

            const text = fs.readFileSync(state.loginPath, 'utf-8');
            text.split('\n').forEach((ele, index) => {
                if (ele.trim() !== String('')) {
                    const account = ele.split(/[ \t]+/);
                    loginList.push({
                        id: account[0],
                        password: account[1],
                        index: index,
                        state: 'Ready'
                    })
                }
            });
            state.login = loginList;
        },
        setVideoPath (state, payload) {
            state.videoPath = payload.path;

            let videos = [];

            fs.readdirSync(state.videoPath).forEach((ele) => {
                if (!fs.lstatSync(path.join(state.videoPath, ele)).isDirectory()) {
                    const video = {
                        title: ele,
                        result: 'Ready'
                    };
                    videos.push(video);
                }
            });
            state.video = videos;
        },
        removeLogin (state, payload) {
            state.login.splice(payload.index, 1);
        }
    }
});

export default store;