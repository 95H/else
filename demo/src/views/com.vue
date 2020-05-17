<template>
    <div>
        <hcolumn :max='100' :min='50' type='2'></hcolumn>
        <div id='container'></div>
        <div id='container2'></div>
    </div>
</template>


<script>
import { Chart } from '@antv/g2'
import { DataView } from '@antv/data-set'
export default {
    data() {
        return {
            chart: null,
            data: [{ type: '总计', value: 23.6 }]
        }
    },
    mounted() {
        this.test1()
        this.test2()
    },
    methods: {
        test1() {
            const chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 300
            })
            console.log(chart)
            chart.data(this.data)
            chart.legend(false)
            chart.tooltip({
                showMarkers: false
            })
            chart.facet('rect', {
                fields: ['type'],
                paddings: 20,
                showTitle: false,
                eachView: (view, facet) => {
                    console.log(view, facet)
                    let data = facet.data
                    data.push({ type: '其他', value: 100 - data[0].value })
                    view.data(data)
                    view.coordinate('theta', {
                        radius: 0.5,
                        innerRadius: 0.7
                    })
                    view.interval()
                        .adjust('stack')
                        .position('value')
                        .color('type', ['#f0657d', '#ccc'])
                        .style({
                            stroke: '#fff',
                            lineWidth: 3
                        })
                        .state({
                            active: {
                                style: element => {
                                    const shape = element.shape
                                    return {
                                        lineWidth: 1,
                                        stroke: shape.attr('fill'),
                                        strokeOpacity: shape.attr('fillOpacity')
                                    }
                                }
                            }
                        })
                    view.annotation().text({
                        position: ['50%', '50%'],
                        content: data[0].type,
                        style: {
                            fontSize: 12,
                            fill: '#8c8c8c',
                            fontWeight: 300,
                            textBaseline: 'bottom',
                            textAlign: 'center'
                        },
                        offsetY: 20
                    })

                    view.annotation().text({
                        position: ['50%', '50%'],
                        content: data[0].value,
                        style: {
                            fontSize: 18,
                            fill: '#000',
                            fontWeight: 300,
                            textAlign: 'center'
                        },
                        offsetY: -10
                    })

                    view.interaction('element-active')
                }
            })
            this.chart = chart
            this.chart.render()
        },
        test2() {
            const data = [
                { value: 251, type: '大事例一', name: '子事例一' },
                { value: 610, type: '大事例二', name: '子事例三' }
            ]
            // 通过 DataSet 计算百分比
            const dv = new DataView()
            dv.source(data).transform({
                type: 'percent',
                field: 'value',
                dimension: 'type',
                as: 'percent'
            })
            const chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 300,
                padding: 0
            })
            chart.data(dv.rows)
            chart.scale({
                percent: {
                    formatter: val => {
                        val = (val * 100).toFixed(2) + '%'
                        return val
                    }
                }
            })
            chart.coordinate('theta', {
                radius: 0.3
            })
            chart.tooltip({
                showTitle: false,
                showMarkers: false
            })
            chart.legend(false)
            chart
                .interval()
                .adjust('stack')
                .position('percent')
                .color('type')
                .label('type', {
                    offset: -10
                })
                .tooltip('name*percent', (item, percent) => {
                    percent = (percent * 100).toFixed(2) + '%'
                    return {
                        name: item,
                        value: percent
                    }
                })
                .style({
                    lineWidth: 1,
                    stroke: '#fff',
                    background: '#fff'
                })

            const outterView = chart.createView()
            const dv1 = new DataView()
            dv1.source(data).transform({
                type: 'percent',
                field: 'value',
                dimension: 'name',
                as: 'percent'
            })

            outterView.data(dv1.rows)
            outterView.scale({
                percent: {
                    formatter: val => {
                        val = (val * 100).toFixed(2) + '%'
                        return val
                    }
                }
            })

            outterView.coordinate('theta', {
                innerRadius: 0.5 / 0.75,
                radius: 0.75,
                background: 'yellow'
            })
            outterView
                .interval()
                .adjust('stack')
                .position('percent')
                .color('name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'])
                .label('name')
                .tooltip('name*percent', (item, percent) => {
                    percent = (percent * 100).toFixed(2) + '%'
                    return {
                        name: item,
                        value: percent
                    }
                })
                .style({
                    lineWidth: 1,
                    stroke: '#fff',
                    radius: 0.25,
                    backgrounf: '#ddd'
                })
            chart.interaction('element-highlight')
            chart.render()
        }
    }
}
</script>
<style>
</style>