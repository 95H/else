<template>
    <div>
        <div class='box'></div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        init() {
            for (var i = 1; i <= 5; i++) {
                setTimeout(function timer() {
                    console.log(i)
                }, i * 1000)
            }
        }
    },
    created() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
</style>