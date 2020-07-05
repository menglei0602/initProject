<template>
<div>
  <!-- <base-checkbox v-model="lovingVue"></base-checkbox>lovingVue--{{lovingVue}} -->
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" id="ruleForm1" v-bind="layout">
    <a-form-model-item has-feedback label="Password" prop="pass" id="item123">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" id="item456"/>
    </a-form-model-item>
    <a-form-model-item has-feedback label="Confirm" prop="checkPass">
      <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm', 'ruleForm2')">
        Submit
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('ruleForm', 'ruleForm2')">
        Reset
      </a-button>
    </a-form-model-item>
  </a-form-model>

  <a-form-model ref="ruleForm2" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="Age" prop="age">
      <a-input v-model.number="ruleForm.age" />
    </a-form-model-item>
  </a-form-model>

</div>
</template>
<script>
// import BaseCheckbox from "./BaseCheckBox.vue";
export default {
  // components: {
  //   BaseCheckbox
  // },
  data () {
    let checkPending;
    const checkAge = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      checkPending = setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      lovingVue: true,
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        age: [{ validator: checkAge, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    submitForm (formName, formName2) {
      let i = 0;
      const callback = valid => {
        i++;
        if (valid && i === 2) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      };
      this.$refs[formName].validate(callback);
      this.$refs[formName2].validate(callback);
    },
    resetForm (formName, formName2) {
      this.$refs[formName].resetFields();
      this.$refs[formName2].resetFields();
    }
  }
};

</script>
