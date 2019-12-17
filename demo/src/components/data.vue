<template>
    <div>
        <!-- 1 -->
        <p>{{times}}</p>
        <p>-----------------------</p>
        <p>{{date1 | formatDate}}</p>
        <p>{{date1 | formatDate2}}</p>
        <p>{{date1 | formatDate3}}</p>
    </div>
</template>

<script>
import { formatDate } from '@/api/date.js' //1
export default {
    name: 'HelloWorld',
    data() {
        return {
            times: '',
            li: '1562226389000',
            date1: 1562226389000
        }
    },
    methods: {
        init() {
            var date = new Date(1562226389000)
            Date.prototype.Format = function(fmt) {
                var o = {
                    'M+': this.getMonth() + 1, //月份
                    'd+': this.getDate(), //日
                    'h+': this.getHours(), //小时
                    'm+': this.getMinutes(), //分
                    's+': this.getSeconds(), //秒
                    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                    S: this.getMilliseconds() //毫秒
                }
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
                for (var k in o)
                    if (new RegExp('(' + k + ')').test(fmt))
                        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
                return fmt
            }
            this.times = date.Format('yyyyMMdd')
            // date.Format("yyyy-MM-dd hh:mm:ss")
        }
    },
    created() {
        this.init() //1
    },
    filters: {
        formatDate(time) {
            var date = new Date(time)
            return formatDate(date, 'yyyy.MM.dd')
        },
        formatDate2(time) {
            var date = new Date(time)
            return formatDate(date, 'hh:mm:ss')
        },
        formatDate3(time) {
            var date = new Date(time)
            return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss')
        }
    }
}
</script>


<style scoped>
</style>
