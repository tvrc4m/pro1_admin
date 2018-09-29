<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">[{{user.phone}}]订阅的作者列表</span>
            <div class="actions">
                <!-- <el-button type="primary" size="small" @click="goSubcribeAuthor">新增订阅作者</el-button> -->
            </div>
        </div>
        <el-table :data="authors" :fit="true" :stripe="true">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-table :data="scope.row.codes" :fit="true">
                        <el-table-column prop="code" label="邀请码"></el-table-column>
                        <el-table-column prop="expired_time" label="过期时间">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span :class="{expired:scope.row.date_expired<current_timestamp}">{{scope.row.expired_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="props">
                                [<el-button type="text" size="mini" @click="changeExpired(props.row)">修改过期日期</el-button>]
                                [<el-button type="text" size="mini" @click="unbind(scope.row,props.row)">取消绑定</el-button>]
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="100px" align="center" :sortable="true">
            </el-table-column>
            <el-table-column prop="avatar" label="头像" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" style="width: 60px;height: 60px" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="作者" align="center"></el-table-column>
        </el-table>
        <el-dialog title="批量修改过期日期" :visible.sync="show_change_expired" width="30%">
            <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="date_expired" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="show_change_expired=false">取 消</el-button>
                <el-button size="small" type="primary" @click="doChangeExpired">确 定</el-button>
            </span>
        </el-dialog>
        <div class="pagination">
            <el-pagination background @current-change="changePage" :page-size="pageSize" layout="pager,total" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox,Pagination,Dialog,DatePicker } from 'element-ui'

    import { getAuthors,delAuthor,getUserSubscribeAuthor,TypeAuthor } from '@/api/author'
    import { changeExpired,unassign,TypeCode } from '@/api/code'
    import { getUser,TypeUser } from '@/api/user'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.use(Dialog)
    Vue.use(DatePicker)

    @Component({
        components:{
            
        },
        mixins:[]
    })
    export default class AuthorIndex extends Vue{

       @Provide() authors:Array<TypeAuthor>=[]
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() user_id:Number=0
       @Provide() user:TypeUser|any={}
       @Provide() show_change_expired:boolean=false
       @Provide() change={author_id:0,code_id:0}
       @Provide() code:TypeCode|any={}
       @Provide() date_expired:String=''
       @Provide() current_timestamp=(new Date()).getTime()/1000

       goAuthorAdd(){
            this.$router.push("/author/add")
       }

       edit(author_id:any){
            this.$router.push({name:"authorEdit",params:{author_id:author_id}})
       }

       del(author_id:Number){
            MessageBox.confirm("是否确定要删除该作者","提示",{
                showCancelButton:true
            }).then(()=>{
                delAuthor(author_id).then(data=>{
                    Message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.authors=this.authors.filter(item=>{
                        if(item.id!=author_id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       content(author_id:any){
            this.$router.push({"name":"contentList",query:{author_id}})
       }

       subscribe(author_id:any){
            this.$router.push({"name":"codeList",query:{author_id:author_id}})
       }

       sortBySubscribe(a,b){
            console.log(a,b)
       }

       listAuthors(page=1){
              getUserSubscribeAuthor({page,user_id:this.user_id}).then(data=>{
                  this.authors=data.data.authors
                  this.total=data.data.total
              })
       }

       changePage(page){
            this.listAuthors(page)
       }

       goSubcribeAuthor(){

       }

       changeExpired(code:TypeCode){
            this.code=code
            this.show_change_expired=true
       }

       doChangeExpired(){
            if(this.date_expired && this.code.id){
                changeExpired(this.code.id,this.date_expired).then(data=>{
                    this.code.expired_time=this.date_expired
                    this.date_expired=''
                    this.show_change_expired=false
                    Message({
                        type:"success",
                        message:"修改成功"
                    })
                })
            }
       }

       unbind(author:TypeAuthor,code:TypeCode){
            MessageBox.confirm("是否要取消绑定","提示",{
                showCancelButton:true
            }).then(()=>{
                unassign(this.user_id,code.id).then(data=>{
                    author.codes=author.codes.filter(item=>{
                        if(item.id!=code.id){
                            return true
                        }
                    })
                     Message({
                        type:"success",
                        message:"取消绑定成功"
                    })
                })
            })
       }

       @Watch('$route')
       changeRoute(newrouter,currentrouter){
            if(newrouter.query.user_id){
                this.user_id=newrouter.query.user_id
            }else{
                this.user_id=0
            }
            this.listAuthors(1)
       }

       mounted(){
            if(this.$route.params.uid){
                this.user_id=parseInt(this.$route.params.uid)
                getUser(this.user_id).then(data=>{
                    this.user=data.data
                })
            }
            this.listAuthors(1)
       }

    }
</script>

<style lang="scss" scoped>
   .el-button + .el-button{
        margin-left:0 !important;
    }
    .expired{
        color:red;
    }
</style>
