<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">作者列表</span>
            <div class="actions">
                <el-button type="primary" size="small" @click="goAuthorAdd">新增作者</el-button>
            </div>
        </div>
        <el-table :data="authors" :fit="true" :stripe="true">
            <el-table-column prop="id" label="ID" width="100px" align="center" :sortable="true"></el-table-column>
            <el-table-column prop="avatar" label="头像" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" style="width: 60px;height: 60px" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="作者" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center" width="180px">
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
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox } from 'element-ui'

    import {getAuthors,delAuthor} from '@/api/author'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)

    type Author={
        id:Number,
        name:String,
        avatar:String,
        status:Number,
        date_add:Number,
        create_time:String
    }

    @Component({
        components:{
            
        },
        mixins:[]
    })
    export default class AuthorIndex extends Vue{

       @Provide() authors:Array<Author>=[]

       goAuthorAdd(){
            this.$router.push("/author/add")
       }

       edit(author_id:any){
            this.$router.push({name:"authorEdit",params:{author_id:author_id}})
       }

       del(author_id:Number){
            MessageBox.confirm("是否确定要删除该用户","提示",{
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

       mounted(){
            getAuthors().then(data=>{
                this.authors=data.data
            })
       }

    }
</script>

<style lang="scss" scoped>
   .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
