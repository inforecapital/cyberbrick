/**
 * Created by Jacob Xie on 1/28/2021
 */

import React from "react"
import {EChartOption} from "echarts"
import ReactEcharts from "echarts-for-react"

const data = [
  {time: '2008', 'trick': .3, 'alpha': 59.4, 'beta': 67.8, 'trend1': 53.4, 'area1': .1, 'trend2': 13.4, 'area2': .9},
  {time: '2009', 'trick': .2, 'alpha': 68.9, 'beta': 59.9, 'trend1': 52.1, 'area1': .2, 'trend2': 22.1, 'area2': .11},
  {time: '2010', 'trick': .1, 'alpha': 71.1, 'beta': 79.6, 'trend1': 49.2, 'area1': .4, 'trend2': 39.2, 'area2': .22},
  {time: '2011', 'trick': .2, 'alpha': 62.1, 'beta': 73.3, 'trend1': 59.6, 'area1': .2, 'trend2': 49.6, 'area2': .25},
  {time: '2012', 'trick': .4, 'alpha': 60.5, 'beta': 75.6, 'trend1': 56.5, 'area1': .9, 'trend2': 26.5, 'area2': .45},
  {time: '2013', 'trick': .5, 'alpha': 55.3, 'beta': 79.5, 'trend1': 58.8, 'area1': .6, 'trend2': 18.8, 'area2': .23},
  {time: '2014', 'trick': .3, 'alpha': 58.1, 'beta': 82.2, 'trend1': 63.2, 'area1': .3, 'trend2': 33.2, 'area2': .54},
  {time: '2015', 'trick': .7, 'alpha': 62.4, 'beta': 85.4, 'trend1': 62.5, 'area1': .2, 'trend2': 42.5, 'area2': .38},
  {time: '2016', 'trick': .8, 'alpha': 61.8, 'beta': 81.2, 'trend1': 53.2, 'area1': .1, 'trend2': 23.2, 'area2': .48},
  {time: '2017', 'trick': .9, 'alpha': 43.3, 'beta': 77.8, 'trend1': 58.7, 'area1': .8, 'trend2': 18.7, 'area2': .29},
  {time: '2018', 'trick': .8, 'alpha': 83.1, 'beta': 73.4, 'trend1': 55.1, 'area1': .2, 'trend2': 35.1, 'area2': .12},
  {time: '2019', 'trick': .6, 'alpha': 86.4, 'beta': 65.2, 'trend1': 82.5, 'area1': .5, 'trend2': 22.5, 'area2': .19},
  {time: '2020', 'trick': .3, 'alpha': 72.4, 'beta': 53.9, 'trend1': 39.1, 'area1': .1, 'trend2': 19.1, 'area2': .8},
]

const chartOption: EChartOption = {
  tooltip: {},
  legend: {
    data: ['trick', 'alpha', 'trend1', 'trend2']
  },
  dataset: [
    {
      source: data
    }
  ],
  xAxis: [
    {type: 'category'},
  ],
  yAxis: [
    {
      type: "value",
      name: "Line",
      position: "left",
    },
    {
      type: "value",
      name: "Scatter1",
      position: "right",
      splitLine: {show: false}
    },
    {
      type: "value",
      name: "Scatter2",
      position: "right",
      splitLine: {show: false},
      offset: 100
    },

  ],
  series: [
    {
      type: 'line',
      yAxisIndex: 0,
      name: "trick",
      encode: {
        x: "time",
        y: "trick",
        tooltip: ["trick"]
      }
    },
    {
      type: 'scatter',
      yAxisIndex: 1,
      name: "alpha",
      encode: {
        x: "time",
        y: "alpha",
        tooltip: ["time", "alpha", "beta"]
      },
      symbolSize: (data: Record<string, number>) => (data["beta"] || 50)
    },
    {
      type: 'scatter',
      yAxisIndex: 1,
      name: "trend1",
      encode: {
        x: "time",
        y: "trend1",
        tooltip: ["time", "trend1", "area1"]
      },
      symbolSize: (data: Record<string, number>) => data["area1"]
    },
    {
      type: 'scatter',
      yAxisIndex: 2,
      name: "trend2",
      encode: {
        x: "time",
        y: "trend2",
        tooltip: ["time", "trend2", "area2"]
      },
      symbolSize: (data: Record<string, number>) => data["area2"]
    },
  ],
  visualMap: [
    {
      show: false,
      dimension: "beta",
      seriesIndex: [1],
      min: 0,
      max: 100,
      inRange: {
        symbolSize: [0, 100]
      }
    },
    {
      show: false,
      dimension: "area1",
      seriesIndex: [2],
      min: 0,
      max: 1,
      inRange: {
        symbolSize: [0, 100]
      }
    },
    {
      show: false,
      dimension: "area2",
      seriesIndex: [3],
      min: 0,
      max: 1,
      inRange: {
        symbolSize: [0, 100]
      }
    },
  ]
}


interface LineScatterProps {
  chartHeight: number
  theme: string
}

/**
 * multi y-axes line & scatter mixin plot
 */
export const LineScatter = (props: LineScatterProps) => {

  return (
    <ReactEcharts
      option={chartOption}
      opts={{height: props.chartHeight}}
      theme={props.theme}
    />
  )
}

