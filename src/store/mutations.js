export default {
  addBill(state, Obj) {
    state.addedBill.unshift(Obj);
  },
  deleteRow(state, obj) {
    let totalBill = state.addedBill.concat(state.initBill);
    totalBill.forEach(item => {
      if (obj.id == item.id) {
        item.isDeleted = true;
      }
    });
  }
};
