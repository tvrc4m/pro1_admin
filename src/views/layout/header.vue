<template>
    <div class="container">
        <slot name="top"></slot>
        <div v-if="$slots.default" class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    
    export default Vue.extend({
        components: {
        },
        props: {
            title: String,
            content: String,
            logo: String,
            action: String,
            extraContent: String,
            breadcrumbNameMap: Object,
            tabList: Array,
            tabActiveKey: String
        }
    })
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';

    .container {
        margin: 24px 24px 0;
    }
    .content{
        margin-top:24px;
    }

    @media screen and (max-width: $screen-sm) {
        .container {
            margin: 24px 0 0;
        }
    }
</style>
