<template>
    <div>
        <el-row style="margin-bottom:20px;float:right;">
            <el-button type="primary" size="small">新增账户</el-button>
        </el-row>
        <el-table :data="accounts">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.date_add}}</span>
                </template>
            </el-table-column>
            <el-table-column label="订阅的作者">
                <template slot-scope="scope">
                    <span>查看</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" circle icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Row,Col,Button,Table,TableColumn } from 'element-ui'

    import formatMixin from '@/mixin/format'

    import { Component,Provide,Vue } from 'vue-property-decorator'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)

    type Account={
        id:Number,
        name:String,
        phone:String,
        date_add:Number
    }

    @Component({
        components:{
            
        },
        mixins:[formatMixin]
    })
    export default class AccountIndex extends Vue{

       @Provide() accounts:Array<Account>=[]

       mounted(){
            var account:Account={id:1,name:"t.wei",phone:"15763951212",date_add:1201292922}
            this.accounts=[account]
       }

    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';
    
</style>
<style lang="css">
   
</style>
