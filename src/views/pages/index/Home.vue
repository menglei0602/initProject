<template>
  <div id="c1">

  </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  mounted () {
    const data = [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 }
    ];

    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: "c1", // 指定图表容器 ID
      renderer: "svg", // 使用 svg 进行渲染
      width: 600, // 指定图表宽度
      height: 300 // 指定图表高度
    });

    // Step 2: 载入数据源
    chart.data(data);

    // Step 3：创建图形语法，绘制柱状图
    chart.interval().position("genre*sold");
    chart.option("slider", {
      end: 0.8
    });
    // Step 4: 渲染图表
    chart.render();
  }
};
</script>

<style lang="less" scoped>
</style>
