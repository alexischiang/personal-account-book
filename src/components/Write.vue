<template>
  <div class="write-view-container">
    <div class="input">
      <el-input
        v-model="input.money"
        placeholder="请输入金额,如123或-123"
        diff="input"
        @input="checkInput()"
      ></el-input>
      <div class="tip" :class="{ showTip: showTip }">
        格式错误
      </div>
    </div>
    <div class="select">
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
import format from "date-format";
export default {
  data() {
    return {
      input: {
        money: "",
        cate: ""
      },
      initCate: this.$store.state.initCate,
      addedBill: this.$store.state.addedBill,
      showTip: false
    };
  },
  computed: {
    bill() {
      return this.$store.getters.bill;
    }
  },
  methods: {
    addBill() {
      // 用户新增账单数据结构统一在这里规定
      let formatObj = {};
      // id & idDeleted
      formatObj.id = this.bill.length;
      formatObj.isDeleted = false;
      // type & amount
      if (this.input.money[0] != "-") {
        formatObj.type = 1;
        formatObj.amount = this.input.money;
      } else {
        formatObj.type = 0;
        formatObj.amount = this.input.money.substr(0);
      }
      // time & date & category
      let date = new Date();
      formatObj.time = date.getTime();
      formatObj.date = format.asString("yyyy-MM-dd", date);
      formatObj.category = this.input.cate;
      // 执行新增方法
      this.$store.commit("addBill", formatObj);
      // 清空输入
      this.input.money = "";
      this.input.cate = "";
    },
    checkInput() {
      !/^(\d+\.?)?\d{0,2}$/.test(this.input.money)
        ? (this.showTip = true)
        : (this.showTip = false);
    }
  }
};
</script>

<style lang="scss">
.write-view-container {
  display: flex;
}
.el-input {
  input[diff="input"] {
    width: 600px;
    height: 80px;
    font-size: 40px;
    font-weight: 700;
    background: transparent;
    border: 1px rgba($color: #ffff, $alpha: 0.5) solid;
    color: white;

    &::placeholder {
      color: rgba($color: #fff, $alpha: 0.3);
      font-weight: 100;
    }

    &:hover {
      border: 1px rgba($color: #ffff, $alpha: 1) solid;
      transition: border 0.3s;
    }

    &:focus {
      border: 1px rgba($color: #ffff, $alpha: 1) solid;
    }
  }
}

.input {
  position: relative;
  .tip {
    font: 400 11px system-ui;
    width: 600px;
    height: 80px;
    font-size: 40px;
    font-weight: 100;
    line-height: 80px;
    text-align: right;
    color: rgba($color: #fff, $alpha: 0.3);
    top: 0;
    right: 17px;
    display: none;
    position: absolute;
  }
  .tip.showTip {
    display: block;
    pointer-events: none;
  }
}
</style>
