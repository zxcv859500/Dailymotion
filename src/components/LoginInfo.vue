<template>
    <div class="login-info">
        <el-table
            :data="loginList"
            size="middle"
            border
            max-height="360px"
            :row-class-name="tableRowClassName">
        <el-table-column
                prop="id"
                label="ID"
                :resizable="false"
                width="330">
        </el-table-column>
        <el-table-column
                prop="password"
                label="Password"
                :resizable="false"
                width="330">
        </el-table-column>
        <el-table-column
                label="Operations"
                width="200">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="onClickLogin(scope.$index)">Login</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import dm from 'dailymotion-sdk';
    export default {
        name: "LoginInfo",
        computed: mapGetters({
            loginList: 'getLoginList'
        }),
        data() {
            return {
                flag: false
            }
        },
        methods: {
            handleDelete(index) {
                this.$store.commit('removeLogin', {
                    index: index
                });
            },
            onClickLogin(index) {
                this.flag = false;
                const dmApiKey = '8d05b3d96130d282210e';
                const dmSecretKey = '9ff5546026c1c915d611cb4493e09f80dc63a850';

                const client = new dm.client(dmApiKey, dmSecretKey);
                client.setCredentials("password", {
                    username: this.loginList[index].id,
                    password: this.loginList[index].password
                });

                client.createToken((err) => {
                    if(err || client.credentials.access_token === undefined) {
                        this.flag = true;
                        this.loginList[index].state = "Failed"
                    } else {
                        this.flag = true;
                        this.loginList[index].state = "Logged"
                    }
                });

                setTimeout(() => {
                    if (this.flag === false) {
                        this.onClickLogin(index);
                    }
                }, 5000);
            },
            tableRowClassName({row}) {
                if (row.state === 'Failed') {
                    return 'warning-row';
                } else if (row.state === 'Logged') {
                    return 'success-row';
                }
                return '';
            }
        }
    }
</script>

<style>
    .login-info {
        margin-top: 10px;
    }
    .el-table .warning-row {
        background: oldlace;
    }
    .el-table .success-row {
        background: #f0f9eb;
    }
</style>