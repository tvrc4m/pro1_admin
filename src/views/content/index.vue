<template>
    <div>
        <div class="card-header" slot="header">
            <span v-if="author.id" class="title">[{{author.name}}]的内容列表</span>
            <span class="title" v-else>内容列表</span>
            <div class="actions">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="primary" size="small" @click="multiadd">批量新增</el-button>
                <el-tooltip :disabled="disabled" content="只能上传txt格式且编码格式为UTF-8。作者id##内容类型[1,2]##类型链接##内容密码##内容描述##发布日期[2018-12-1 10:12:11]" placement="bottom" effect="light">
                    <el-upload style="display: inline-block;" :show-file-list="false" :action="upload_url" :data="upload_data" :on-change="uploadFile" @before-upload="uploadBefore">
                        <el-button size="small" type="primary">批量上传</el-button>
                    </el-upload>
                </el-tooltip>
            </div>
        </div>
        <el-table :data="contents" :fit="true" :stripe="true">
            <el-table-column prop="id" label="ID" width="90px" align="center" :sortable="true"></el-table-column>
            <el-table-column label="内容" align="center" width="90px">
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1">图文</span>
                    <span v-else-if="scope.row.type==2">视频</span>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="内容"></el-table-column>
            <el-table-column prop="password" label="密码" align="center" width="90px"></el-table-column>
            <el-table-column prop="description" :show-overflow-tooltip="true" label="描述" align="center"></el-table-column>
            <el-table-column v-if="!author.id" prop="author_name" label="作者" align="center" width="120px"></el-table-column>
            <el-table-column prop="pub_time" label="发布日期" align="center" width="180px"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" align="center" width="180px"></el-table-column>
            <el-table-column label="操作" align="center" width="180px">
                <template slot-scope="scope">
                    [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                    [<el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>]
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
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox,Pagination,Upload,Tooltip } from 'element-ui'

    import { getContents,getContent,delContent,TypeContent } from '@/api/content'
    import { TypeAuthor,getAuthor } from '@/api/author'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.use(Upload)
    Vue.use(Tooltip)

    @Component({
        components:{
            
        },
        mixins:[]
    })
    export default class AuthorIndex extends Vue{

       @Provide() contents:Array<TypeContent>=[]
       @Provide() author:TypeAuthor|any=[]
       @Provide() filter={author_id:0,page:1}
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() upload_url=process.env.API_URL+"/api/admin/content/upload/content"
       @Provide() upload_data={token:localStorage.getItem("token")}

       add(){
            this.$router.push({name:"contentAdd",query:{author_id:this.author.id}})
       }

       multiadd(){
            this.$router.push({name:"contentMultiAdd",query:{author_id:this.author.id}})
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

       listContents(){
            getContents(this.filter).then(data=>{
                this.contents=data.data.contents
                this.total=data.data.total
            })
       }

       changePage(page){
            this.filter.page=page
            this.listContents()
       }

       uploadFile(file){
            if(file.status=='success'){
                if(file.response.err_no!=0){
                    Message({
                        type:"error",
                        message:file.response.err_msg
                    })
                }else{
                    Message({
                        type:"success",
                        message:'上传成功'
                    })
                    this.listContents()
                }
            }
       }

       uploadBefore(file){
            if(!/\.txt/.test(file.name)){
                Message({
                    type:"error",
                    message:"只支持txt格式"
                })
                return false
            }
            return true
       }

       @Watch('$route')
       changeRoute(newrouter,currentrouter){
            if(newrouter.query.author_id){
                this.filter.author_id=newrouter.query.author_id
            }else{
                this.filter.author_id=0
                this.filter.page=1
                this.author={}
            }
            this.listContents()
       }

       mounted(){
            if(this.$route.query.author_id){
                this.filter.author_id=parseInt(this.$route.query.author_id)
                getAuthor(this.filter.author_id).then(data=>{
                    this.author=data.data
                })
            }
            this.listContents()
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
