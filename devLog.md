# 需求表

- ✅ 加载我们所提供的数据;

- ✅ 以列表的形式展示账单内容，并且提供下拉框选择月份进行筛选，其中列表中所展示的账单为选择月份的账单；

- ✅ 支持使用者添加账单;

- ✅ 简单地统计并展示所选月份的收入和支出总金额。

以上为本题目的基本需求，而如果你需要应聘的岗位为高级前端工程师或以上岗位，则需要完成以下附加需求：

- ✅ 对账单分类进行二次筛选；

- 对选择月份内的所有账单根据账单分类进行支出金额统计，并进行排序。

## 如何引入 csv

使用 npm csvtojson 库，在`store/index.js`中封装了一个 initCsv 函数

⚠️ 因为是异步操作导致一开始无法正确处理时间（还未完全解析 csv），用 promise 包装解决。其实也可以在 subcribe 中做 transform

⚠️ 统一 import from 比 require 更好做 tree-shaking

## 时间处理（秒数转日期）

使用 date-format 库

## 删除操作

尝试 id timestamp 作为删除依据但无法做到动态
想法： json.stringify 找到对应 item 删除

最终使用 id + isDeleted 属性

## 入账 0.33 显示 bug

`(income = parseFloat((income + money).toFixed(10)))`解决

## 渐变背景消耗大量 cpu 资源
