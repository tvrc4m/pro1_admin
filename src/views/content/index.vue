<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">内容列表</span>
            <div class="actions">
                <el-button type="text" size="small" @click="add">新增内容</el-button>
            </div>
        </div>
        <el-table :data="contents" :fit="true" :stripe="true">
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
                    [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                    [<el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>]
                    [<el-button type="text" size="mini" @click="subscribe(scope.row.id)">订阅码</el-button>]
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox } from 'element-ui'

    import { getContents,getContent,delContent,TypeContent } from '@/api/content'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)

    @Component({
        components:{
            
        },
        mixins:[]
    })
    export default class AuthorIndex extends Vue{

       @Provide() contents:Array<TypeContent>=[]

       add(){
            this.$router.push("/content/add")
       }

       edit(content_id:any){
            this.$router.push({name:"contentEdit",params:{content_id:content_id}})
       }

       del(content_id:Number){
            MessageBox.confirm("是否确定要删除该内容","提示",{
                showCancelButton:true
            }).then(()=>{
                delContent(content_id).then(data=>{
                    Message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.contents=this.contents.filter(item=>{
                        if(item.id!=content_id){
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

       mounted(){
            getContents().then(data=>{
                this.contents=data.data
            })
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
