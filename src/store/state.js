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
initCsv("bill").then(v => {
  v.forEach(item => {
    item.date = format.asString("yyyy-MM-dd", new Date(Number(item.time)));
    initBill.push(item);
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
