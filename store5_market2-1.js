(function() {

function DecideObento(matsuCount,takeCount,umeCount,onigiriCount)
{
  if(onigiriCount == 0)
  {
    obentoId = 'ONIGIRI';
    return obentoId;
  }
  else if(umeCount == 0)
  {
    obentoId = 'UME';
    return obentoId;
  }
  else if(takeCount == 0)
  {
    obentoId = 'TAKE';
    return obentoId;
  }
  else if(matsuCount == 0)
  {
    obentoId = 'MATSU';
    return obentoId;
  }
  else
  {
    return;
  }
}


function subminPri(product,otherPrice,obento,min){
    minNow=min;
    for (var i = 0; i < ids.length; i++) {
        if(product[i]== obento){
            if(minPri > otherPrice[i]){
                minNow = otherPrice[i]
            }
            else{
                minNow = minNow;
            }
        }
    }
    return minNow;
}

function SetObentoPrice(obentoName, obentoPrice, otherSalesPrice)
{
  switch(obentoName)
  {
    case 'MATSU':
      obentoPrice[0] = otherSalesPrice;
      break;
    case 'TAKE':
      obentoPrice[1] = otherSalesPrice;
      break;
    case 'UME':
      obentoPrice[2] = otherSalesPrice;
      break;
    case 'ONIGIRI':
      obentoPrice[3] = otherSalesPrice;
      break;
  }
  return obentoPrice;
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

  var myStore = ObentoMarket.Store.entry('ニッチくん3',function(day) {
      var histories = ObentoMarket.getHistory();
      var matsuCount = 0;
      var takeCount = 0;
      var umeCount = 0;
      var onigiriCount = 0;
      var activity = {};
      var diff = [];
      var product = [];
      var obentoPrice = [4000, 2500, 1600, 444];
      var minStore;

      if(day == 1)
      {
      activity.obentoId = 'MATSU';
      activity.purchaseNum = 20;
      activity.salesPrice = 3900;
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
        SetObentoPrice(obentoName, obentoPrice, otherSalesPrice);
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

        switch(activity.obentoId)
        {
          case 'MATSU': activity.salesPrice = obentoPrice[0];
            break;
          case 'TAKE': activity.salesPrice = obentoPrice[1];
            break;
          case 'UME': activity.salesPrice = obentoPrice[2];
            break;
          case 'ONIGIRI': activity.salesPrice = obentoPrice[3];
            break;
        }
      activity.purchaseNum = 20;
      }
      return activity;
    }
  );

})();
