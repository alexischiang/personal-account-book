export default {
  bill: state => {
    return state.addedBill.length == 0
      ? state.initBill
      : state.initBill.concat(state.addBill);
  }
};
