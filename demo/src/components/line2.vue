<template>
  <div>
    <div id="pCharts2" style="width:100%;height:300px"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {};
  },
  props: ["date"],
  mounted() {
    this.drawIt();
  },
  methods: {
    drawIt() {
      let myCharts = echarts.init(document.getElementById("pCharts2"));
      var option = {
        title: {
          text: "重点水体区域分布年际对比",
          x: "center",
          y: "top"
        },
        legend: {
          data: ["室内温度满足率", "节能率", "策略执行"],
          y: "26"
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            align: "left"
          }
        },
        grid: {
          top: "22%",
          left: "1%",
          right: "1%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            `${this.date}.1`,
            `${this.date}.2`,
            `${this.date}.3`,
            `${this.date}.4`,
            `${this.date}.5`,
            `${this.date}.6`,
            `${this.date}.7`,
            `${this.date}.8`,
            `${this.date}.9`,
            `${this.date}.10`,
            `${this.date}.11`,
            `${this.date}.12`,
            `${this.date}.13`,
            `${this.date}.14`,
            `${this.date}.15`,
            `${this.date}.16`,
            `${this.date}.17`,
            `${this.date}.18`,
            `${this.date}.19`,
            `${this.date}.20`,
            `${this.date}.21`,
            `${this.date}.22`,
            `${this.date}.23`,
            `${this.date}.24`,
            `${this.date}.25`,
            `${this.date}.26`,
            `${this.date}.27`,
            `${this.date}.28`,
            `${this.date}.29`,
            `${this.date}.30`,
            `${this.date}.31`
          ]
        },
        yAxis: [
          {
            name: "室内温度满足率",
            type: "value",
            max: 100,
            splitLine: {
              show: false
            }
          },
          {
            name: "节能率",
            nameLocation: "start",
            max: 50,
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "室内温度满足率",
            type: "line",
            data: [
              80,
              85,
              90,
              85,
              80,
              85,
              90,
              85,
              80,
              85,
              90,
              85,
              80,
              85,
              90,
              85,
              80,
              85,
              90,
              85,
              80,
              85,
              90,
              85,
              80,
              85,
              90,
              85,
              80,
              85,
              90
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#B42E29"
                  }
                }
              }
            }
          },
          {
            name: "节能率",
            type: "line",
            data: [
              50,
              77,
              88,
              76,
              50,
              77,
              88,
              76,
              50,
              77,
              88,
              76,
              50,
              77,
              88,
              76,
              50,
              77,
              88,
              76,
              50,
              77,
              88,
              76,
              50,
              77,
              88,
              76,
              50,
              77,
              88
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "bottom",
                  textStyle: {
                    color: "#2D3E4C"
                  }
                }
              }
            }
          },
          {
            name: "策略执行",
            type: "line",
            yAxisIndex: 1,
            data: [
              5,
              3,
              3,
              2,
              5,
              3,
              3,
              2,
              5,
              3,
              3,
              2,
              5,
              3,
              3,
              2,
              5,
              3,
              3,
              2,
              5,
              3,
              3,
              2,
              5,
              3,
              3,
              2,
              5,
              3,
              3
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#5F97A0"
                  }
                }
              }
            }
          }
        ]
      };
      myCharts.setOption(option);
        console.log(myCharts);

      myCharts.on("click", param => {
        if (param.seriesName == "室内温度满足率") {
          this.$router.push({ path: "/tab", query: { num: 1 } });
        } else if (param.seriesName == "节能率") {
          this.$router.push({ path: "/tab", query: { num: 2 } });
        } else if (param.seriesName == "策略执行") {
          this.$router.push({ path: "/tab", query: { num: 3 } });
        }
      });
    }
  }
};
</script>
