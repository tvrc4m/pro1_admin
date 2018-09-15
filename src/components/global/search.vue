<template>
    <span class="headerSearch">
        <el-input type="text" v-model="value" placeholder="区块/交易/地址/账户" @keyup.enter.native="onSearch">
            <el-button slot="suffix" type="primary" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>
    </span>
</template>

<script lang="ts">
    
    import { Component,Provide,Prop,Vue } from 'vue-property-decorator'
    import { Input,Button } from 'element-ui'

    Vue.use(Input)
    Vue.use(Button)

    @Component({})
    export default class Search extends Vue{

        @Provide() value:string=''

        onSearch(){
            let value=this.value
            console.log(value)
            if(value && value.trim()){
                value = value.trim();
                let len = value.length;
                if(len == 53){
                    if(value.toLowerCase().indexOf("eos") === 0){
                        // window.location = window.location.origin + '/address/'+value;
                    }
                }else if(len == 64){
                    if(value.toLowerCase().indexOf('000') === 0){
                        this.$router.push({name:"blockDetail",params:{block:value}})
                    }else{
                        this.$router.push({name:"trxDetail",params:{trx:value}})
                    }
                } else if(len <= 12){
                    // if(!isNaN(value)){
                        // this.$router.push({name:"blockDetail",params:{block:value}})
                    // }else{
                        this.$router.push({name:"accountDetail",params:{account:value}})
                    // }
                }
            }         
        }
    }
</script>

<style lang="scss">
    .headerSearch {
        .el-input--suffix .el-input__inner {
            width: 600px;
            background: transparent;
            border-radius: 5px;
            /deep/ .el-input {
                /deep/ .el-input__inner {
                    border-radius: 0;
                    padding-left: 10px;
                    padding-right: 0;
                    box-shadow: none !important;
                    border: 1px solid #d9d9d9;
                }
            }
        }
    }
    .el-input__suffix{
        right: 0 !important;
    }
</style>
