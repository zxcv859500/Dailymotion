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
                        size="mini">Login</el-button>
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
    export default {
        name: "LoginInfo",
        computed: mapGetters({
            loginList: 'getLoginList'
        }),
        methods: {
            handleDelete(index) {
                this.$store.commit('removeLogin', {
                    index: index
                });
            },
            tableRowClassName({row}) {
                if (row.result === 'Failed') {
                    return 'warning-row';
                } else if (row.result === 'Uploaded') {
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