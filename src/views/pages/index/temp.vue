<template>
  <div class="clickAgain">
    <div @click="btnClick">
      <slot></slot>

    </div>
  </div>

</template>

<script>
export default {
  name: "clickAgain",
  data () {
    return {};
  },
  methods: {
    btnClick () {
      if (this.is_click) {
        return false;
      }
      this.$emit("btnClick");
      this.is_click = true;
      setTimeout(() => {
        this.is_click = false;
      }, 2000);
    }
  }
};
</script>
