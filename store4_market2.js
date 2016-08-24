(function() {

function DecideObento(matsuCount,takeCount,umeCount,onigiriCount)
{
  if(matsuCount == 0)
  {
    obentoId = 'MATSU';
    return obentoId;
  }
  else if(takeCount == 0)
  {
    obentoId = 'TAKE';
    return obentoId;
  }
  else if(umeCount == 0)
  {
    obentoId = 'UME';
    return obentoId;
  }
  else
  {
    obentoId = 'ONIGIRI';
    return obentoId;
  }
}

  var myStore = ObentoMarket.Store.entry('ニッチくん',function(day) {
      var histories = ObentoMarket.getHistory();
      var matsuCount = 0;
      var takeCount = 0;
      var umeCount = 0;
      var onigiriCount = 0;
      var activity = {};

      if(day == 1)
      {
      activity.obentoId = 'ONIGIRI';
      activity.purchaseNum = 20;
      activity.salesPrice = 444;
      }
      else if(day >= 2)
      {
      var yesterday = histories[day - 2];
      var ids = ObentoMarket.Store.getCompetitorIds(myStore.id);
      for (var i = 0; i < ids.length; i++) {
        var storeInfo = ObentoMarket.Store.getById(ids[i]);
        var actual = yesterday.storeActuals[ids[i]];
        obentoName = actual.obentoId;
        switch(obentoName)
          {
            case 'MATSU': matsuCount++;
              break;
            case 'TAKE' : takeCount++;
              break;
            case 'UME' : umeCount++;
              break;
            case 'ONIGIRI' : onigiriCount++;
              break;
          }
        }
      activity.obentoId = DecideObento(matsuCount,takeCount,umeCount,onigiriCount);
      activity.purchaseNum = 20;
      activity.salesPrice = 444;
      }
      return activity;
    }
  );

})();
