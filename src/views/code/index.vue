<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">邀请码列表</span>
            <div class="actions">
                <el-button type="primary" size="small" @click="changeExpired">批量修改过期日期</el-button>
                <el-button type="primary" size="small" @click="add">创建邀请码</el-button>
            </div>
        </div>
        <el-table :data="codes" :fit="true" :stripe="true" @selection-change="selectChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="100px" align="center" :sortable="true"></el-table-column>
            <el-table-column prop="code" label="邀请码" width="160px" align="center"></el-table-column>
            <el-table-column prop="user_id" label="用户ID" width="160px" align="center"></el-table-column>
            <el-table-column prop="user_phone" label="用户手机号" width="160px" align="center"></el-table-column>
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
        <el-dialog title="批量修改过期日期" :visible.sync="multiedit" width="30%">
            <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="date_expired" type="date" placeholder="选择日期"></el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="multiedit=false">取 消</el-button>
                <el-button size="small" type="primary" @click="doMultiEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn,Message,MessageBox,DatePicker,Dialog } from 'element-ui'

    import { getCodes,delCode,multiEdit,TypeCode } from '@/api/code'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(DatePicker)
    Vue.use(Dialog)

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

       add(){
            this.$router.push("/code/add")
       }

       edit(code_id:any){
            this.$router.push({name:"codeEdit",params:{code_id:code_id}})
       }

       del(code_id:Number){
            MessageBox.confirm("是否确定要删除该用户","提示",{
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
            val.forEach(item=>{
                this.changed.push(item.id)
            })
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
                this.multiedit=false
                this.date_expired=''
            })
       }

       sortBySubscribe(a,b){
            console.log(a,b)
       }

       mounted(){
            getCodes().then(data=>{
                this.codes=data.data
            })
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>