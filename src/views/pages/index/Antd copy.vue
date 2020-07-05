<template>
  <div>
    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="danger">Danger</a-button>
    <a-button type="primary">按钮</a-button>
    <a-button type="link">Link</a-button>
    <a-input placeholder="Basic usage" />
    <a-date-picker show-time placeholder="Select Time" />
    <span id="test">hzbank</span>
    <a-icon type="vertical-align-bottom" />
    <div id="main" ref="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// import { Button, Input } from "ant-design-vue";
// import "ant-design-vue/lib/button/style/css";
export default {
  components: {
    // AButton: Button,
    // AInput: Input
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = this.echarts.init(this.$refs.main);
    console.log(myChart);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/test.less";
#test {
  color: @text-color;
}
</style>
