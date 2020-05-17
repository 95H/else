<template>
    <div class='column-box'>
        <div class='column' :class='afterColor'>
            <div class='column-out' :class='afterColor' :style='{height:(min/max)*200+"px",background:formatter(type)}'></div>
            <div class='text'>
                <span>定额</span>
                <i></i>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Hcolumn',
    props: {
        max: {
            type: [String, Number],
            default: 100
        },
        min: {
            type: [String, Number],
            default: 30
        },
        type: {
            type: [String, Number],
            default: 1
        }
    },
    data() {
        return {
            color: [
                {
                    type: 1,
                    background: 'linear-gradient(#01b0cd, #0471ac, #00686e)',
                    afterColor: 'color-01'
                },
                {
                    type: 2,
                    background: 'linear-gradient(#ff8177,#b12a5b)',
                    afterColor: 'color-02'
                }
            ],
            afterColor: ''
        }
    },
    methods: {
        formatter(val) {
            let newBg = this.color.find(i => i.type == val)
            this.afterColor = newBg ? newBg.afterColor : ''
            return newBg ? newBg.background : ''
        }
    }
}
</script>
<style  scoped lang="scss">
.column-box {
    .column {
        position: relative;
        height: 200px;
        width: 50px;
        // margin-top: 30px;
        background: #ccc;
        margin: 10px 70px;
        opacity: 0.5;
        z-index: 999;
        &:before {
            position: absolute;
            top: -10px;
            content: '';
            display: block;
            width: 100%;
            // width: 50px;
            height: 20px;
            border-radius: 50%;
            background: #112e54;
            z-index: 99;
        }

        &:after {
            position: absolute;
            bottom: -10px;
            content: '';
            display: block;
            width: 100%;
            // width: 50px;
            height: 20px;
            border-radius: 50%;
            background: #0266b1;
            z-index: 9;
        }
        .column-out {
            position: absolute;
            bottom: 0;
            left: 0;
            // height: 100px;
            width: 100%;
            // background: linear-gradient(#01b0cd, #0471ac, #00686e);
            opacity: 0.5;
            z-index: 1000;
            &:before {
                position: absolute;
                top: -10px;
                content: '';
                display: block;
                width: 100%;
                // width: 50px;
                height: 20px;
                border-radius: 50%;
                background: #ccc;
                z-index: 99;
            }
            &:after {
                position: absolute;
                bottom: -10px;
                content: '';
                display: block;
                width: 100%;
                // width: 50px;
                height: 20px;
                border-radius: 50%;
                // background: #ff8177;
                background: #0266b1;
                z-index: 9;
            }
        }

        .text {
            /* width: 100px; */
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            top: 30%;
            left: -60px;
        }

        .text span {
            width: 35px;
            font-size: 14px;
            /* color:#fff; */
        }

        .text i {
            border: 1px dashed rgb(1, 175, 213);
            width: 100px;
        }
    }
    .color-01 {
        &::after {
            background: #01b0cd !important;
        }
    }
    .color-02 {
        &::after {
            background: #ff8177 !important;
        }
    }
}
</style>