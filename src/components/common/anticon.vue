<template>
    <i :class="['anticon', anticon_type]"></i>
</template>
<script lang="ts">
    import { Component,Prop,Vue } from 'vue-property-decorator'

    @Component({})
    export default class AntIcon extends Vue{

        @Prop({required:true}) type:string

        get anticon_type():string{
            return 'anticon-'+this.type
        }
    }
</script>