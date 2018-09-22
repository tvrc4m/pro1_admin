<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">用户列表</span>
            <div class="actions">
                <el-button type="primary" size="small" @click="goUserAdd">新增账户</el-button>
            </div>
        </div>
        <el-table :data="users" :fit="true" :stripe="true">
            <el-table-column prop="id" label="UID" width="100px" align="center" :sortable="true"></el-table-column>
            <el-table-column prop="phone" label="手机号" width="160px" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center" width="180px">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                    [<el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>] 
                    [<el-button type="text" size="mini" @click="subscribe(scope.row.id)">订阅作者</el-button>]
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination v-if="total>pageSize" background @current-change="changePage" :page-size="pageSize" layout="pager,total" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox,Pagination } from 'element-ui'

    import { getUsers,delUser,TypeUser } from '@/api/user'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    
    @Component({
        components:{
            
        },
        mixins:[]
    })
    export default class UserIndex extends Vue{

       @Provide() users:Array<TypeUser>=[]
       @Provide() total=0
       @Provide() pageSize=20

       goUserAdd(){
            this.$router.push("/user/add")
       }

       edit(uid:any){
            this.$router.push({name:"userEdit",params:{uid:uid}})
       }

       del(uid:any){
            MessageBox.confirm("是否确定要删除该用户","提示",{
                showCancelButton:true
            }).then(()=>{
                delUser(uid).then(data=>{
                    Message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.users=this.users.filter(item=>{
                        if(item.id!=uid){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       sortBySubscribe(a,b){
            console.log(a,b)
       }

       subscribe(user_id:any){
            this.$router.push({name:"userAuthor",params:{uid:user_id}})
       }

       listUsers(page=1){
            getUsers({page}).then(data=>{
                this.users=data.data.users
                this.total=data.data.total
            })
       }

       changePage(page){
            this.listUsers(page)
       }

       mounted(){
            this.listUsers(1)
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
