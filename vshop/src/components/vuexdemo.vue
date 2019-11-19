<template>
    <div class="box">
        <!-- 同步的vuex -->
        <button @click="add">+</button>
        <span>{{$store.state.num}}</span>
        {{num}}
        <p>
            <!-- 异步的vuex -->
            <button @click="btn_l">-</button>
            <span>{{$store.state.num1}}</span>
            {{num1}}
        </p>
        <p>
            <!-- 参数一个 -->
            <button @click="increaseB">-</button>
            <span>{{$store.state.num2}}</span>
        </p>
    </div>
</template>
<script>
// 函数参数的结构赋值
// 在函数的参数里面可以进行结构赋值
let obj = { name: 'lili', age: 30 }
function fn({ name = 'll' }) {
    console.log(name)
}
fn(obj)
// 可以设置默认值

import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        // ...mapState(['num']),
        ...mapState({
            num: state => state.num1,
            num1: state => state.num
        })
    },
    methods: {
        // 同步触发
        add() {
            this.$store.commit('ad1')
        },
        // 异步触发
        btn_l() {
            this.$store.dispatch('add')
        },
        ...mapMutations({
            increase: ''
        }),
        // increaseB(){
        //   this.$store.commit('minucount',3)
        // },
        // 多个参数
        increaseB() {
            // this.$store.commit('minucount',{a:10,b:20})
            this.$store.commit({ type: 'minucount', a: 10, b: 12 })
        }
    }
}
</script>
<style scoped lang="scss">
button {
    width: 100px;
    height: 50px;
    background: palevioletred;
}
</style>


