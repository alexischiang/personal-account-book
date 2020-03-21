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
      <div class="select-pick">
        <el-select v-model="input.cate" placeholder="请选择">
          <el-option
            v-for="item in initCate"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="select-input">
        <el-input
          v-model="newCate"
          diff="select"
          placeholder="新增类别"
        ></el-input>
        <i class="el-icon-circle-plus-outline" @click="addCate()"></i>
      </div>
    </div>
    <div class="button">
      <el-button
        type="primary"
        icon="el-icon-check"
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
      showTip: false,
      newCate: ""
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
      // 检查输入格式是否符合最高精度两位小数的数字
      !/^(\d+\.?)?\d{0,2}$/.test(this.input.money)
        ? (this.showTip = true)
        : (this.showTip = false);
    },
    addCate() {
      let obj = {};
      // 生成随机字符串id
      function randomString() {
        let chars = "abcdefhijkmnprstwxyz2345678";
        let res = "";
        for (let i = 0; i < 10; i++) {
          res += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return res;
      }
      obj.id = randomString();
      obj.name = this.newCate;
      obj.type = 0;
      this.$store.commit("addCate", obj);
      this.newCate = "";
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
    width: 100%;
    height: 90px;
    font-size: 40px;
    font-weight: 700;
    background: transparent;
    border: 1px rgba($color: #ffff, $alpha: 0.7) solid;
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
  flex: 6;
  position: relative;
  .tip {
    font: 400 11px system-ui;
    width: 600px;
    height: 80px;
    font-size: 40px;
    font-weight: 100;
    line-height: 80px;
    text-align: right;
    color: rgba($color: #fff, $alpha: 0.5);
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

.select {
  margin-left: 20px;
  flex: 2;
  display: flex;
  flex-direction: column;

  .select-pick {
    margin-bottom: 10px;
    flex: 1;
    .el-input {
      input {
        border: 1px rgba($color: #ffff, $alpha: 0.5) solid;
        color: white;
        background: transparent;
        width: 200px;
        height: 40px;
        font-size: 20px;
        font-weight: 400;
        &::placeholder {
          color: rgba($color: #fff, $alpha: 0.3);
          font-weight: 100;
        }

        &:hover {
          border: 1px rgba($color: #ffff, $alpha: 1) solid;
          transition: border 0.3s;
        }
      }
    }
    .el-select .el-input.is-focus .el-input__inner {
      border-radius: 5px;
      border: 1px rgba($color: #ffff, $alpha: 1) solid;
    }
    .el-select .el-input__inner:focus {
      border-radius: 5px;
      border: 1px rgba($color: #ffff, $alpha: 0.5) solid;
    }
    .el-input.el-input--suffix {
      width: 100%;
    }
  }
  .select-input {
    position: relative;
    flex: 1;
    input {
      border: 1px rgba($color: #ffff, $alpha: 0.5) solid;
      color: white;
      background: transparent;
      width: 200px;
      height: 40px;
      font-size: 20px;
      font-weight: 400;
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
    i {
      color: rgba($color: #fff, $alpha: 0.5);
      font-size: 21px;
      position: absolute;
      right: 8px;
      top: 10px;
      cursor: pointer;
    }
    i:hover {
      color: rgba($color: #fff, $alpha: 1);
      transition: color 0.5s;
    }
  }
}

.button {
  flex: 2;
  margin-left: 20px;
  position: relative;
  button {
    border-radius: 10px;
    border: 1px rgba($color: #ffff, $alpha: 0.5) solid;
    width: 100%;
    height: 100%;
    background: transparent;

    i {
      font-size: 50px;
    }
  }
  .el-button--primary:hover {
    transition: background 0.5s;
  }
}
.el-select-dropdown.el-popper {
  top: 140px !important;
}
</style>
