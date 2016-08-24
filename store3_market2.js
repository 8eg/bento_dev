(function() {
  // ここから
  /*
  function something() {

  }
  */
  // ここまでの領域は好きに編集できます。

  var myStore = ObentoMarket.Store.entry('おにぎりくん',
    function(day) {
      // something();
      return {
        obentoId: 'ONIGIRI',
        purchaseNum: 50,
        salesPrice: 444
      }
    }
  );

})();
