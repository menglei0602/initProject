<template>
  <div>
    <a-modal v-model="visible" title="Modal" ok-text="确认" cancel-text="取消" @ok="onSubmit">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item label="Activity form" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        desc: ""
      },
      visible: true,
      rules: {
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
