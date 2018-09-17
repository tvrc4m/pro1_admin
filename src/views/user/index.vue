<template>
    <div>
        <el-row style="margin-bottom:20px;float:right;">
            <el-button type="primary" size="small" @click="goUserAdd">新增账户</el-button>
        </el-row>
        <el-table :data="users">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="订阅的作者">
                <template slot-scope="scope">
                    <span>查看</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" circle icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn } from 'element-ui'

    import formatMixin from '@/mixin/format'
    import {getUsers} from '@/api/user'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)

    type User={
        id:Number,
        phone:String,
        date_add:Number,
        create_time:String
    }

    @Component({
        components:{
            
        },
        mixins:[formatMixin]
    })
    export default class UserIndex extends Vue{

       @Provide() users:Array<User>=[]

       goUserAdd(){
            this.$router.push("/user/add")
       }

       mounted(){
            getUsers().then(data=>{
                this.users=data.data
            })
       }

    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';
    
</style>
<style lang="css">
   
</style>
