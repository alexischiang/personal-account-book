<template>
  <div>
    <el-table
      class="bill-table"
      ref="filterTable"
      :data="unDeletedBill"
      style="width: 100%;"
      show-summary
      :default-sort="{ prop: 'date', order: 'descending' }"
      :summary-method="getSummaries"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        column-key="date"
        :filters="getMonthFilter"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="amount" label="金额" sortable>
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.amount >= 0 ? 'primary' : 'danger'"
            disable-transitions
            >{{ scope.row.amount }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="类别"
        :filters="getCateFilter"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.category === '家' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.category.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initBill: this.$store.state.initBill,
      initCate: this.$store.state.initCate,
      addedBill: this.$store.state.addedBill
    };
  },
  computed: {
    bill() {
      return this.$store.getters.bill;
    },
    unDeletedBill() {
      return this.$store.getters.unDeletedBill;
    },
    getCateFilter() {
      let res = [];
      for (let i of this.initCate) {
        res.push({
          text: i.name,
          value: i.id
        });
      }
      return res;
    },
    getMonthFilter() {
      return this.$store.getters.monthFilter;
    }
  },
  methods: {
    filterTag(value, row) {
      return row.category.id === value;
    },
    filterHandler(value, row) {
      let date = row["date"];
      let a = date.split("-");
      let num = Number(a[0] + a[1]);
      if (value == num) {
        return true;
      } else {
        return false;
      }
    },
    handleDelete(row) {
      this.$store.commit("deleteRow", row);
    },
    getSummaries(param) {
      const { data } = param;
      const showArr = [];
      showArr[3] = "";
      let total = 0;
      let income = 0;
      let outcome = 0;
      data.forEach(item => {
        let money = Number(item.amount);
        total += money;
        money >= 0
          ? (income = parseFloat((income + money).toFixed(10)))
          : (outcome = parseFloat((outcome + money).toFixed(10)));
      });
      showArr[0] = `合计:${total}元`;
      showArr[1] = `收入:${income}元`;
      showArr[2] = `支出:${outcome}元`;
      return showArr;
    }
  }
};
</script>

<style>
.el-table__footer-wrapper {
  position: sticky;
  bottom: 0;
}
.bill-table {
  overflow: visible !important;
  box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
}
</style>
