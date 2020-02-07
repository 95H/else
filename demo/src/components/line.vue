<template>
  <div>
    <div id="pCharts" style="width:100%;height:300px"></div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      dataX: [
        {
          value: -1.1618426259,
          date: "00:00",
          l: -2.6017329022,
          u: 0.2949717757
        },
        {
          value: -0.5828247293,
          date: "01:00",
          l: -1.3166963635,
          u: 0.1324086347
        },
        {
          value: -0.3790770636,
          date: "02:00",
          l: -0.8712221305,
          u: 0.0956413566
        },
        {
          value: -0.2792926002,
          date: "03:00",
          l: -0.6541832008,
          u: 0.0717120241
        },
        {
          value: -0.2461165469,
          date: "04:00",
          l: -0.5222677907,
          u: 0.0594188803
        },
        {
          value: -0.2017354137,
          date: "05:00",
          l: -0.4434280535,
          u: 0.0419213465
        },
        {
          value: -0.1457476871,
          date: "06:00",
          l: -0.3543957712,
          u: 0.0623761171
        },
        {
          value: -0.002610973,
          date: "07:00",
          l: -0.3339911495,
          u: 0.031286929
        },
        {
          value: -0.0080692734,
          date: "08:00",
          l: -0.2951839941,
          u: 0.0301762553
        },
        {
          value: -0.0296490933,
          date: "09:00",
          l: -0.2964395801,
          u: -0.0029821004
        },
        {
          value: 0.001317397,
          date: "10:00",
          l: -0.2295443759,
          u: 0.037903312
        },
        {
          value: -0.0117649838,
          date: "11:00",
          l: -0.2226376418,
          u: 0.0239720183
        },
        {
          value: 0.0059394263,
          date: "12:00",
          l: -0.2020479849,
          u: 0.0259489347
        },
        {
          value: -0.0115565898,
          date: "13:00",
          l: -0.2042048037,
          u: 0.0077863806
        },
        {
          value: 0.0041183019,
          date: "14:00",
          l: -0.1837263172,
          u: 0.0137898406
        },
        {
          value: 0.0353559544,
          date: "15:00",
          l: -0.136610008,
          u: 0.051403828
        },
        {
          value: 0.0070046011,
          date: "16:00",
          l: -0.1569988647,
          u: 0.0202266411
        },
        {
          value: -0.0004251807,
          date: "17:00",
          l: -0.1410340292,
          u: 0.0273410185
        },
        {
          value: -0.0035461023,
          date: "18:00",
          l: -0.1438653689,
          u: 0.0165445684
        },
        {
          value: 0.007797889,
          date: "19:00",
          l: -0.1291975355,
          u: 0.0232461153
        },
        {
          value: 0.0025402723,
          date: "20:00",
          l: -0.133972479,
          u: 0.0116753921
        },
        {
          value: -0.005317381,
          date: "21:00",
          l: -0.1269266586,
          u: 0.0129723291
        },
        {
          value: -0.0075841521,
          date: "22:00",
          l: -0.1283478383,
          u: 0.0056371616
        },
        {
          value: -0.0391388721,
          date: "23:00",
          l: -0.1571172198,
          u: -0.0311678828
        },
        {
          value: 0.0075430252,
          date: "24:00",
          l: -0.1097354417,
          u: 0.0141132062
        }
      ]
    };
  },
  mounted() {
    this.drawIt();
  },
  methods: {
    drawIt() {
      let myCharts = echarts.init(document.getElementById("pCharts"));
      var base = -this.dataX.reduce(function(min, val) {
        return Math.floor(Math.min(min, val.l));
      }, Infinity);
      var option = {
        title: {
          text: "Confidence Band",
          subtext: "Example in MetricsGraphics.js",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: "#ccc",
              borderColor: "#aaa",
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,

              color: "#222"
            }
          },
          formatter: function(params) {
            return params[2].name + "<br />" + params[2].value;
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.dataX.map(function(item) {
            return item.date;
          }),
          axisLabel: {
            formatter: function(value, idx) {
              // console.log(value);
              // console.log(idx);

              // var date = new Date(value);
              // return idx === 0
              //   ? value
              //   : [date.getMonth() + 1, date.getDate()].join("-");
              return value
            }
          },
          splitLine: {
            show: false
          },
          boundaryGap: false
        },
        yAxis: {
          axisLabel: {
            formatter: function(val) {
              // console.log(val)
              // console.log(base)
              return val*100
              // return (val - base) * 100 + "%";
            }
          },
          axisPointer: {
            label: {
              formatter: function(params) {
                return ((params.value - base) * 100).toFixed(1) + "%";
              }
            }
          },
          splitNumber: 3,
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "L",
            type: "line",
            data: this.dataX.map(function(item) {
              return item.l + base;
            }),
            lineStyle: {
              opacity: 0
            },
            stack: "confidence-band",
            symbol: "none"
          },
          {
            name: "U",
            type: "line",
            data: this.dataX.map(function(item) {
              return item.u - item.l;
            }),
            lineStyle: {
              opacity: 0
            },
            areaStyle: {
              color: "#ccc"
            },
            stack: "confidence-band",
            symbol: "none"
          },
          {
            type: "line",
            data: this.dataX.map(function(item) {
              return item.value + base;
            }),
            hoverAnimation: false,
            symbolSize: 6,
            itemStyle: {
              color: "#c23531"
            },
            showSymbol: false
          }
        ]
      };
      myCharts.setOption(option);
    }
  }
};
</script>