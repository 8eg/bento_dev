(function() {

  var myStore = ObentoMarket.Store.entry('葉加瀬',function(day) {
      var storeInfo = ObentoMarket.Store.getById(myStore.id);
      var histories = ObentoMarket.getHistory();

      var activity = {};
      const minOniPri = 2000;
      const matsuPri = 40;
      const getMatsuPri = 1200;
      const stromPro = 0.1;
      maxNum = Math.floor((minOniPri - storeInfo.capitalStock)/(stromPro*matsuPri - getMatsuPri))-3;
      if(day == 1)
      {
        activity.purchaseNum = 300;
        activity.obentoId = 'TAKE';
      }
      else if(day >= 2){
        var yesterday = histories[day - 2];
        var actual = yesterday.storeActuals[myStore.id];
        if(yesterday.weather == ObentoMarket.Weather.SHINE){
          activity.purchaseNum = 300;
          activity.obentoId = 'MATSU';
        }else if (yesterday.weather == ObentoMarket.Weather.CLOUD){
          activity.purchaseNum = 300;
          activity.obentoId = 'TAKE';
        }else if (yesterday.weather == ObentoMarket.Weather.RAIN){
          activity.purchaseNum = 300;
          activity.obentoId = 'UME';
        }
        else
        {
          activity.purchaseNum = 300;
          activity.obentoId = 'TAKE';
        }
      }


      return activity;
    }
  );

})();