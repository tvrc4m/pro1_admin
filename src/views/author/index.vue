<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">作者列表</span>
            <div class="actions">
                <el-button type="primary" size="small" @click="goAuthorAdd">新增作者</el-button>
            </div>
        </div>
        <el-table :data="authors" :fit="true" :stripe="true" :sort-change="sortChange">
            <el-table-column prop="id" label="ID" width="80px" align="center" :sortable="true"></el-table-column>
            <el-table-column prop="avatar" label="头像" align="center" width="100px">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" style="width: 60px;height: 60px" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="作者" align="center" :filters="filter_authors"></el-table-column>
            <el-table-column label="广告图片" align="center" width="100px">
                <template slot-scope="scope">
                    <img :src="scope.row.ad_img" alt="" style="width:60px;height:60px">
                </template>
            </el-table-column>
            <el-table-column prop="ad_redirect" label="广告跳转链接" align="center" :filters="filter_authors"></el-table-column>
            <el-table-column prop="content_count" label="内容数量" align="center" width="120px;"></el-table-column>
            <el-table-column prop="unused_count" label="剩余订阅码" align="center" width="120px;"></el-table-column>
            <el-table-column label="创建时间" align="center" width="170px">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                    [<el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>]
                    [<el-button type="text" size="mini" @click="content(scope.row.id)">内容</el-button>]
                    [<el-button type="text" size="mini" @click="subscribe(scope.row.id)">订阅码</el-button>]
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @current-change="changePage" :page-size="pageSize" layout="pager,total" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox,Pagination } from 'element-ui'

    import { getAuthors,delAuthor,getUserSubscribeAuthor,TypeAuthor,allAuthors } from '@/api/author'
    import { getUser,TypeUser } from '@/api/user'

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
    export default class AuthorIndex extends Vue{

       @Provide() authors:Array<TypeAuthor>=[]
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() user_id:Number=0
       @Provide() user:TypeUser|any={}
       @Provide() filter_authors:Array<{text:String,value:Number}>=[]

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
            getAuthors({page}).then(data=>{
                this.authors=data.data.authors
                this.total=data.data.total
            })
       }

       changePage(page){
            this.listAuthors(page)
       }

       goSubcribeAuthor(){

       }

       sortChange(prop){
            
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
            this.listAuthors(1)

            allAuthors().then(data=>{
                console.log(data)
                data.data.forEach(item=>{
                    this.filter_authors.push({text:item.name,value:item.id})
                })
            })
       }

    }
</script>

<style lang="scss" scoped>
   .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
