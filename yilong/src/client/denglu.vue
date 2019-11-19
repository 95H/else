<template>
    <div id="denglu">
        <header>
            <div class="logo"></div>
        </header>
        <div class="cont">
            <div class="cont_l">
                <a href=""><img src="../static/login_banner.jpg"></a>
            </div>
            <div class="cont_r">
                <div class="controls">
                    <div></div>
                    <div></div>
                </div>
                <div class="content">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="cont_top">
            <a href="">
                立即注册
                <i></i>
            </a>
        </div>
        <footer>
            <p>
                <a href="">
                    <span class="icon_1"></span>iPhone / iPad</a>
                <a href="">
                    <span class="icon_2"></span>Android</a>
            </p>
            <p>
                <a href="">代理合作</a>|
                <a href="">广告服务</a>|
                <a href="">联系我们</a>
                &nbsp; &nbsp; &nbsp; &nbsp;© 2000 - 2017 北京艺龙信息技术有限公司, eLong, Inc or its affiliates. All Rights Reserved
            </p>
        </footer>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'denglu'
}
</script>

<style lang="scss" scoped="" type="text/css">
#denglu {
    width: 100%;
    height: 100%;
    background: #e8eff6;
    header {
        width: 1000px;
        height: 50px;
        padding: 25px 0;
        margin: 0 auto;
        .logo {
            width: 113px;
            height: 48px;
            background: red;
            background: url(../static/myelong_login.png) 0 0 no-repeat;
            img {
                width: 113px;
                height: 48px;
            }
        }
    }
    .cont {
        width: 1000px;
        height: 350px;
        width: 1000px;
        margin: 0px auto;
        background-color: #fff;
        .cont_l {
            width: 620px;
            height: 350px;
            float: left;
        }
        .cont_r {
            width: 285px;
            height: 322px;
            padding: 24px 45px 0px;
            float: right;
            background: green;
            .controls {
                width: 285px;
                height: 12px;
                background: green;
            }
        }
    }
    .cont_top {
        width: 1000px;
        margin: 0 auto;
        margin-top: 20px;
        height: 15px;
        padding-right: 12px;
        text-align: right;
        color: #999999;
        font-size: 12px;
        line-height: 15px;
        a {
            margin-left: 5px;
            color: #3365cb;
            i {
                display: inline-block;
                width: 15px;
                height: 15px;
                vertical-align: -4px;
                margin-left: 3px;
                background: url(../static/myelong_login.png) 0 -430px no-repeat;
            }
        }
    }
    footer {
        width: 1000px;
        height: 60px;
        margin: 0 auto;
        text-align: center;
        padding: 50px 0 30px;
        p {
            width: 1000px;
            height: 30px;
            color: #555555;
            font-size: 12px;
            line-height: 30px;
            a {
                color: #555555;
                font-size: 12px;
                margin: 0 5px;
                span {
                    width: 18px;
                    height: 22px;
                    margin: 0 5px 0 30px;
                    background: url(../static/myelong_login.png) 0 -277px no-repeat;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>