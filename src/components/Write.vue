<template>
  <div class="write-vue-container">
    <div class="input">
      <el-input
        v-model="input.money"
        placeholder="请输入金额"
        style=""
      ></el-input>
      <el-select
        v-model="input.cate"
        placeholder="请选择"
        style="margin-left:30px"
      >
        <el-option
          v-for="item in initCate"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-edit"
        style="margin-left:30px"
        circle
        @click="addBill()"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: {
        money: "",
        cate: ""
      },
      initCate: this.$store.state.initCate,
      addedBill: this.$store.state.addedBill
    };
  },
  methods: {
    addBill() {
      const format = require("date-format");
      let formatObj = {};
      if (this.input.money[0] != "-") {
        formatObj.type = 1;
        formatObj.amount = this.input.money;
      } else {
        formatObj.type = 0;
        formatObj.amount = this.input.money.substr(0);
      }
      let date = new Date();
      formatObj.time = date.getTime();
      formatObj.date = format.asString("yyyy-MM-dd", date);
      formatObj.category = this.input.cate;
      console.log(formatObj);
      this.$store.commit("addBill", formatObj);
      this.input.money = "";
      this.input.cate = "";
    }
  }
};
</script>

<style>
.input {
  display: flex;
  justify-content: space-between;
}
</style>
