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
  else if(onigiriCount == 0)
  {
    obentoId = 'ONIGIRI';
    return obentoId;
  }
  else
  {
    return;
  }
}

function DcidePrice(matsuCount,takeCount,umeCount,onigiriCount)
{
  if(matsuCount == 0)
  {
    salesPrice = 4000;
    return salesPrice;
  }
  else if(takeCount == 0)
  {
    salesPrice = 2500;
    return salesPrice;
  }
  else if(umeCount == 0)
  {
    salesPrice = 1600;
    return salesPrice;
  }
  else
  {
    salesPrice = 444;
    return salesPrice;
  }
}

function standardPrice(obentoName)
{
  switch (obentoName){
  case 'MATSU':
    return 4000;
    break;
  case 'TAKE':
    return 2500;
    break;
  case 'UME':
    return 1600;
    break;
  case 'ONIGIRI':
    return 444;
    break;
  }
}

function secondChoice()
{
  obentoName = actual.obentoId;
  otherSalesPrice = actual.salesPrice;
  diff[i] = standardPrice(obentoName) - otherSalesPrice;
  product[i] = obentoName;
  minStore = diff.indexOf(Math.min.apply(null,diff));

}

  var myStore = ObentoMarket.Store.entry('ニッチくん2',function(day) {
      var histories = ObentoMarket.getHistory();
      var matsuCount = 0;
      var takeCount = 0;
      var umeCount = 0;
      var onigiriCount = 0;
      var activity = {};
      var diff = [];
      var product = [];
      var minStore;

      if(day == 1)
      {
      activity.obentoId = 'UME';
      activity.purchaseNum = 20;
      activity.salesPrice = 1600;
      }
      else if(day >= 2)
      {
      var yesterday = histories[day - 2];
      var ids = ObentoMarket.Store.getCompetitorIds(myStore.id);
      for (var i = 0; i < ids.length; i++) {
        var storeInfo = ObentoMarket.Store.getById(ids[i]);
        var actual = yesterday.storeActuals[ids[i]];
        obentoName = actual.obentoId;
        otherSalesPrice = actual.salesPrice;
        diff[i] = (standardPrice(obentoName) - otherSalesPrice)/standardPrice(obentoName);
        product[i] = obentoName;
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
        if(matsuCount!=0 && takeCount!=0 && umeCount!=0 && onigiriCount!=0)
        {
          minStore = diff.indexOf(Math.min.apply(null,diff));
          activity.obentoId = product[minStore];
        }
        else
        {
          activity.obentoId = DecideObento(matsuCount,takeCount,umeCount,onigiriCount);
        }
      activity.salesPrice = DcidePrice(matsuCount,takeCount,umeCount,onigiriCount)
      activity.purchaseNum = 20;
      }
      return activity;
    }
  );

})();
