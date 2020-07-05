<template>
  <div>
    <a-button type="primary">
      Primary
    </a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">
      Dashed
    </a-button>
    <a-button type="danger">
      Danger
    </a-button>
    <a-button type="primary">
      按钮
    </a-button>
    <a-button type="link">
      Link
    </a-button>
    <a-input placeholder="Basic usage" />
    <a-date-picker show-time placeholder="Select Time" />
    <span id="test">hzbank</span>
    <a-icon type="vertical-align-bottom" />
  </div>
</template>

<script>
// import { Button, Input } from "ant-design-vue";
// import "ant-design-vue/lib/button/style/css";
export default {
  // components: {
  //   AButton: Button,
  //   AInput: Input
  // }
};
</script>

<style lang="less" scoped>
@import '~@/styles/test.less';
#test{
  color: @text-color;
}
</style>
