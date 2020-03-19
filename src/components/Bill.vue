<template>
  <div>
    <el-table
      ref="filterTable"
      :data="bill"
      style="width: 100%;"
      show-summary
      border
      highlight-current-row
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        column-key="date"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' }
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="amount" label="金额">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type == 1 ? 'primary' : 'danger'"
            disable-transitions
            >{{ scope.row.amount }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="类别"
        :filters="[
          { text: '车贷', value: '1bcddudhmh' },
          { text: '车辆保养', value: 'hc5g66kviq' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.category === '家' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.category }}</el-tag
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
      // bill: this.$store.getters.bill, 无法监听
      initBill: this.$store.state.initBill,
      initCate: this.$store.state.initCate,
      addedBill: this.$store.state.addedBill
    };
  },
  computed: {
    bill() {
      return this.addedBill.reverse().concat(this.initBill);
    }
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.category === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>
