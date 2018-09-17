<template>
    <div>
        
    </div>
</template>

<script lang="ts">
    import { Row,Col } from 'element-ui'

    import formatMixin from '@/mixin/format'

    import { Component,Provide,Vue } from 'vue-property-decorator'

    Vue.use(Row)
    Vue.use(Col)

    @Component({
        components:{
            
        },
        mixins:[formatMixin]
    })

    export default class HomeIndex extends Vue{

       
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
