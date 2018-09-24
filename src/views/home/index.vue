<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">dashboard</span>
            <div class="actions">
                <el-button type="primary" size="small" @click="clearCode">清除过期验证码</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Row,Col,Message,MessageBox,Button } from 'element-ui'

    import { clearExpiredCode } from '@/api/code'

    import { Component,Provide,Vue } from 'vue-property-decorator'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)

    @Component({
        components:{
            
        },
        mixins:[]
    })

    export default class HomeIndex extends Vue{

       clearCode(){
            MessageBox.confirm("是否确认要删除?","提示",{

            }).then(()=>{
                clearExpiredCode().then(data=>{
                    Message({
                        type:"success",
                        message:"清除成功"
                    })
                })
            })
       }
    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';
    @import '~utils/utils.scss';
    
</style>
<style lang="css">
    .ram-calc .ram-input{
        width: 80px !important;
        display: inline-block;
    }
    .ram-calc .el-input__inner{
        height: 32px !important;
        line-height: 32px !important;
        width: 80px !important;
    }
</style>
