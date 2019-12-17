<template>
    <div>
        <div class="demo">
            气泡一
        </div>
        <div></div>
        <div class="demo2">
            气泡二
        </div>
        <div></div>
        <div class="tag"></div>
    </div>
</template>

<script>
export default {
    name: 'bubble',
    data() {
        return {}
    }
}
</script>
<style lang="css">
/*第一个气泡demo,只能变背景色*/
.demo,
.demo2 {
    background-color: #3c9;
    padding: 8px;
    display: inline-block;
    position: relative;
    left: 15px;
    top: 5px;
    z-index: 99;
    color: #fff;
    font-weight: 100;
    font-size: 14px;
}

.demo::before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 20px;
    height: 15px;
    background-color: #3c9;
    border-top-right-radius: 10% 50%;
    border-top-left-radius: 100% 50%;
    top: 10px;
    left: -15px;
    z-index: 1;
}

.demo::after {
    content: '';
    display: inline-block;
    position: absolute;
    border-top-left-radius: 50% 50%;
    border-top-right-radius: 50% 50%;
    width: 25px;
    height: 15px;
    background-color: #fff;
    top: 15px;
    left: -25px;
    z-index: 2;
}

/* 第二个气泡demo*/
.demo2 {
    background-color: #fff;
    margin-top: 20px;
    border: 1px solid orange;
    color: #333;
    font-weight: 400;
}

.demo2::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-right: 10px solid orange;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    left: -10px;
    top: 11px;
}

.demo2::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-right: 10px solid #fff;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    left: -8px;
    top: 11px;
}

.tag {
    width: 300px;
    height: 100px;
    border: 5px solid #09f;
    position: relative;
    background-color: #fff;
    margin-top: 10px;
}

.tag:before,
.tag:after {
    content: '';
    display: block;
    border-width: 20px;
    position: absolute;
    bottom: -40px;
    left: 100px;
    border-style: solid dashed dashed;
    border-color: #09f transparent transparent;
    font-size: 0;
    line-height: 0;
}

.tag:after {
    bottom: -33px;
    border-color: #fff transparent transparent;
}
</style>
