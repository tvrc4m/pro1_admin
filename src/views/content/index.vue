<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">内容列表</span>
            <div class="actions">
                <el-button type="text" size="small" @click="add">新增内容</el-button>
            </div>
        </div>
        <el-table :data="authors" :fit="true" :stripe="true">
            <el-table-column prop="id" label="ID" width="100px" align="center" :sortable="true"></el-table-column>
            <el-table-column prop="avatar" label="头像" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" style="width: 30px;height: 30px" />
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
                    <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>&nbsp;|&nbsp;
                    <el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>&nbsp;|&nbsp;
                    <el-button type="text" size="mini" @click="subscribe(scope.row.id)">订阅码</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn } from 'element-ui'

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

       add(){
            this.$router.push("/content/add")
       }

       edit(author_id:any){
            this.$router.push({name:"authorEdit",params:{author_id:author_id}})
       }

       del(uid:Number){
            console.log(uid)
            // this.$confirm("是否确定要删除该用户","提示",{
            //     showCancelButton:true
            // }).then(()=>{
            //     delAuthor(uid).then(data=>{
            //         this.authors=this.authors.filter(item=>{
            //             if(item.id!=uid){
            //                 return true
            //             }
            //         })
            //     })
            // }).catch(()=>{
                
            // })
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
    @import '~theme/theme.scss';
    
</style>
