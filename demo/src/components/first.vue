<template>
<div>
    <line-echart></line-echart>
    <div style="margin-top:50px">
        <line-echart2 :date='date'></line-echart2>
    </div>
</div>
</template>

<script>
import lineEchart from './line'
import lineEchart2 from './line2'
export default {
    data() {
        return {
            date:2
        }
    },
    components: {
        lineEchart,
        lineEchart2
    },
    methods: {},
    mounted() {}
}
</script>
