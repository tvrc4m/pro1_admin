<template>
    <div>
        <div class="card-header" slot="header">
            <span v-if="author.id" class="title">[{{author.name}}]的邀请码列表</span>
            <span v-else class="title">邀请码列表</span>
            <div class="actions">
                <el-button type="warning" size="small" @click="changeExpired">批量修改过期日期</el-button>
                <el-button type="danger" size="small" @click="multidel">批量删除</el-button>
                <el-button type="primary" size="small" @click="add">创建</el-button>
                <el-button type="primary" size="small" @click="multiadd">批量创建</el-button>
            </div>
        </div>
        <el-table :data="codes" :fit="true" :stripe="true" @selection-change="selectChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="100px" align="center" :sortable="true"></el-table-column>
            <el-table-column prop="code" label="邀请码" width="160px" align="center"></el-table-column>
            <el-table-column prop="user_phone" label="用户手机号" width="160px" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.user_id>0">{{scope.row.user_id}}</span>
                    <el-button  v-else type="text" size="mini" @click="assignUser(scope.row)">[分配用户]</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="expired_time" label="过期时间" width="160px" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center" width="180px">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="关联的作者" align="center" :sortable="true" :sort-method="sortBySubscribe">
                <template slot-scope="scope">
                    <span v-for="author in scope.row.authors">{{author.name}},</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                    [<el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>]
                </template>x
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination v-if="total>pageSize" background @current-change="changePage" :page-size="pageSize" layout="pager,total" :total="total"></el-pagination>
        </div>
        <el-dialog title="批量修改过期日期" :visible.sync="multiedit" width="30%">
            <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="date_expired" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="multiedit=false">取 消</el-button>
                <el-button size="small" type="primary" @click="doMultiEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="分配邀请码" :visible.sync="assign" width="30%">
            <el-select ref="assign_select" v-model="user_id" filterable remote placeholder="请输入手机号" :remote-method="searchUser" :loading="searching" style="width: 100%">
            <el-option
              v-for="user in users"
              :key="user.id"
              :label="user.phone"
              :value="user.id">
            </el-option>
          </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="assign=false">取 消</el-button>
                <el-button size="small" type="primary" @click="doAssginUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox,DatePicker,Dialog,Pagination,Select,Option } from 'element-ui'

    import { getCodes,delCode,multiEdit,multiDel,assginUser,TypeCode } from '@/api/code'
    import { getAuthor,TypeAuthor } from '@/api/author'
    import { searchUser } from '@/api/user'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(DatePicker)
    Vue.use(Dialog)
    Vue.use(Pagination)
    Vue.use(Select)
    Vue.use(Option)

    @Component({
        components:{
            
        },
        mixins:[]
    })
    export default class UserIndex extends Vue{

       @Provide() codes:Array<TypeCode>=[]
       @Provide() changed:Array<Number>=[]
       @Provide() multiedit:boolean=false
       @Provide() date_expired:String=''
       @Provide() filter={author_id:0,page:1}
       @Provide() author:TypeAuthor|any={}
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() assign:boolean=false
       @Provide() searching:boolean=false
       @Provide() user_id:any=''
       @Provide() users:Array<{id:Number,name:String}>=[]
       @Provide() assign_code:TypeCode

       add(){
            this.$router.push("/code/add")
       }

       multiadd(){
            this.$router.push({name:"multiAddCode"})
       }

       multidel(){
            if(this.changed.length>0){
                MessageBox.confirm("是否要确认删除？","提示",{
                     showCancelButton:true
                 }).then(()=>{
                    multiDel(this.changed).then(data=>{
                        Message({
                            type:"success",
                            message:"删除成功"
                        })
                    })
                    this.listCodes()
                 })
            }else{
                Message({
                    type:"error",
                    message:"先选择要删除的数据"
                })
            }
       }

       assignUser(code:TypeCode){
            this.assign=true
            this.assign_code=code
       }

       doAssginUser(){
            assginUser(this.user_id,this.assign_code.id).then(data=>{
                this.assign_code.user_id=this.user_id
                this.assign_code.user_phone=this.$refs.assign_select['query']
                this.assign=false
                this.user_id=''
            })
       }

       edit(code_id:any){
            this.$router.push({name:"codeEdit",params:{code_id:code_id}})
       }

       del(code_id:Number){
            MessageBox.confirm("是否确定要删除该邀请码","提示",{
                showCancelButton:true
            }).then(()=>{
                delCode(code_id).then(data=>{
                    Message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.codes=this.codes.filter(item=>{
                        if(item.id!=code_id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       selectChange(val){
            this.changed=[]
            val.forEach(item=>{
                this.changed.push(item.id)
            })
       }

       searchUser(val){
            searchUser(val).then(data=>{
                this.users=data.data
            })
            console.log(val)
       }

       changeExpired(){
            console.log(this.changed)
            if(this.changed.length>0){
                this.multiedit=true
            }else{
                Message({
                    type:"error",
                    message:"先选择要修改的数据"
                })
            }
       }

       doMultiEdit(){
            multiEdit({ids:this.changed,date_expired:this.date_expired}).then(data=>{
                Message({
                    type:"success",
                    message:"修改成功"
                })
                this.codes.map(item=>{
                    this.changed.forEach(id=>{
                        if(item.id==id){
                            item.expired_time=this.date_expired
                        }
                    })
                    return item
                })
                this.multiedit=false
                this.date_expired=''
            })
       }

       sortBySubscribe(a,b){
            console.log(a,b)
       }

       listCodes(){
            getCodes(this.filter).then(data=>{
                this.codes=data.data.codes
                this.total=data.data.total
            })
       }

       changePage(page){
            this.filter.page=page
            this.listCodes()
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
            this.listCodes()
       }

       mounted(){
            if(this.$route.query.author_id){
                this.filter.author_id=parseInt(this.$route.query.author_id)
                getAuthor(this.filter.author_id).then(data=>{
                    this.author=data.data
                })
            }
            this.listCodes()
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
