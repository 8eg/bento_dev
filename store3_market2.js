(function() {
  // ここから
  /*
  function something() {

  }
  */
  // ここまでの領域は好きに編集できます。

  var myStore = ObentoMarket.Store.entry('サンプル鉾之原商会',
    function(day) {
      // something();
      return {
        obentoId: 'MATSU',
        purchaseNum: 200,
        salesPrice: 3900
      }
    }
  );

})();
