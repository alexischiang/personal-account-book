import format from "date-format";
export default {
  // 每发生一次变化都会重新执行一遍内部函数（缺点）
  bill: state => {
    // 拼接初始数据与用户数据
    let bill =
      state.addedBill.length == 0
        ? state.initBill
        : state.addedBill.reverse().concat(state.initBill);
    // 将category变更为详细的对象
    bill.forEach(item => {
      for (let i of state.initCate) {
        if (item.category == i.id) {
          item.category = i;
        }
      }
    });
    // 为每条账目增加id标识方便crud操作

    return bill;
  },
  monthFilter: (state, getters) => {
    // 1.初始一个数组 格式[{text:'',value:''}]
    let bill = getters.bill;
    let res = [];
    // 2.循环bill 推入包含的月份
    bill.forEach(item => {
      let obj = {};
      let date = new Date(Number(item.time));
      obj = {
        text: format.asString("yyyy-MM", date),
        value: Number(
          format.asString("yyyy", date) + format.asString("MM", date)
        )
      };
      let flag = 0;
      // 去重
      for (let i = 0; i < res.length; i++) {
        if (JSON.stringify(res[i]) === JSON.stringify(obj)) {
          flag = 1;
        }
      }
      if (flag == 0) {
        res.push(obj);
      }
    });
    // 冒泡排序
    for (let i = 0; i < res.length - 1; i++) {
      for (let j = 0; j < res.length - i - 1; j++) {
        if (res[j]["value"] > res[j + 1]["value"]) {
          let temp = res[j];
          res[j] = res[j + 1];
          res[j + 1] = temp;
        }
      }
    }

    return res.reverse();
  },
  unDeletedBill(state, getters) {
    return getters.bill.filter(item => !item.isDeleted);
  }
};
