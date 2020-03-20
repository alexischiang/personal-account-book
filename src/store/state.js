const format = require("date-format");
const request = require("request");
const csv = require("csvtojson");

function initCsv(filename) {
  let url = "http://localhost:8080/" + filename + ".csv";
  let initData = [];
  return new Promise(resolve => {
    csv()
      .fromStream(request.get(url))
      .subscribe(
        json => {
          initData.push(json);
        },
        () => {},
        () => resolve(initData)
      );
  });
}
let initBill = [];
let initCate = [];
// 读取表格
let num = 0;
initCsv("bill").then(v => {
  // 数据类型初始化请在此处统一完成
  v.forEach(item => {
    // 增加id和isDelted属性
    item.id = num++;
    item.isDeleted = false;
    // 修正amount正负号
    if (item.type == "0") {
      item.amount = Number(item.amount * -1);
    } else {
      item.amount = Number(item.amount);
    }
    // 加入日期显示
    item.date = format.asString("yyyy-MM-dd", new Date(Number(item.time)));
    // 逐条推入数据
    initBill.unshift(item);
  });
});
initCsv("categories").then(v => {
  v.forEach(item => initCate.push(item));
});

export default {
  initBill: initBill,
  initCate: initCate,
  addedBill: []
};
