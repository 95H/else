<template>
    <div class="home">
        <!-- 同步的vuex -->
        <p>
            <button @click="increase" class="bth">+</button>
            <span>{{$store.state.count}}</span>
        </p>
        <!-- 异步的vuex -->
        <p>
            <button @click="increaseA" class="bth">x</button>
            <span>{{$store.state.count2}}</span>
        </p>
        <!-- 传参 -->
        <p>
            <button @click="increaseB" class="bth">+</button>
            <span>{{$store.state.count3}}</span>
        </p>
        <p>
            {{$store.state.user.username}}
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState('user', ['username'])
    }
}
</script>