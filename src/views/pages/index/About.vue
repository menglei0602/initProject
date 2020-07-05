<script>
import { Chart } from "@antv/g2";
export default {
  mounted () {
    const data = [
      { feature: "Battery", value: 0.22, phone: "iPhone" },
      { feature: "Brand", value: 0.28, phone: "iPhone" },
      { feature: "Contract", value: 0.29, phone: "iPhone" },
      { feature: "Design", value: 0.17, phone: "iPhone" },
      { feature: "Internet", value: 0.22, phone: "iPhone" },
      { feature: "Large", value: 0.02, phone: "iPhone" },
      { feature: "Price", value: 0.21, phone: "iPhone" },
      { feature: "Smartphone", value: 0.5, phone: "iPhone" },
      { feature: "Battery", value: 0.27, phone: "Samsung" },
      { feature: "Brand", value: 0.16, phone: "Samsung" },
      { feature: "Contract", value: 0.35, phone: "Samsung" },
      { feature: "Design", value: 0.13, phone: "Samsung" },
      { feature: "Internet", value: 0.2, phone: "Samsung" },
      { feature: "Large", value: 0.13, phone: "Samsung" },
      { feature: "Price", value: 0.35, phone: "Samsung" },
      { feature: "Smartphone", value: 0.38, phone: "Samsung" },
      { feature: "Battery", value: 0.26, phone: "Nokia Smartphone" },
      { feature: "Brand", value: 0.1, phone: "Nokia Smartphone" },
      { feature: "Contract", value: 0.3, phone: "Nokia Smartphone" },
      { feature: "Design", value: 0.14, phone: "Nokia Smartphone" },
      { feature: "Internet", value: 0.22, phone: "Nokia Smartphone" },
      { feature: "Large", value: 0.04, phone: "Nokia Smartphone" },
      { feature: "Price", value: 0.41, phone: "Nokia Smartphone" },
      { feature: "Smartphone", value: 0.3, phone: "Nokia Smartphone" }
    ];

    const chart = new Chart({
      container: "mountNode",
      autoFit: false,
      width: 600,
      height: 300
    });

    chart.data(data);
    chart.point().position("feature*value");
    chart.render();
  },
  render () {
    return <div id="mountNode"></div>;
  }
};
</script>

<style lang="less" scoped>
</style>
