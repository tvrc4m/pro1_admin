<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">邀请码列表</span>
            <div class="actions">
                <el-button type="text" size="small" @click="add">创建邀请码</el-button>
            </div>
        </div>
        <el-table :data="codes" :fit="true" :stripe="true">
            <el-table-column prop="id" label="ID" width="100px" align="center" :sortable="true"></el-table-column>
            <el-table-column prop="code" label="邀请码" width="160px" align="center"></el-table-column>
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
                    <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>&nbsp;|&nbsp;
                    <el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>&nbsp;|&nbsp;
                    <el-button type="text" size="mini" @click="subscribe(scope.row.id)">订阅作者</el-button>
                </template>x
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Button,Table,TableColumn } from 'element-ui'

    import { getCodes,delCode } from '@/api/code'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)

    type Code={
        id:Number,
        code_id:Number,
        code:String,
        year:Number,
        month:Number,
        date_expired:Number,
        date_add:Number,
        expired_time:String,
        create_time:String,
        authors:Array<{id:Number,name:String}>
    }

    @Component({
        components:{
            
        },
        mixins:[]
    })
    export default class UserIndex extends Vue{

       @Provide() codes:Array<Code>=[]

       add(){
            this.$router.push("/code/add")
       }

       edit(uid:any){
            this.$router.push({name:"codeEdit",params:{uid:uid}})
       }

       del(uid:Number){
            console.log(uid)
            // this.$confirm("是否确定要删除该用户","提示",{
            //     showCancelButton:true
            // }).then(()=>{
            //     delUser(uid).then(data=>{
            //         this.codes=this.codes.filter(item=>{
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
            getCodes().then(data=>{
                this.codes=data.data
            })
       }

    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';
    
</style>
