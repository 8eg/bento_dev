(function() {

function DecideObento(matsuCount,takeCount,umeCount,onigiriCount)
{
  if(takeCount == 0)
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

function SetDeadPri(obentoName)
{
  switch (obentoName){
  case 'MATSU':
    return 3000;
    break;
  case 'TAKE':
    return 2000;
    break;
  case 'UME':
    return 1333;
    break;
  case 'ONIGIRI':
    return 400;
    break;
  }
}

function SetObentoPrice(obentoName, obentoPrice, otherSalesPrice)
{
  switch(obentoName)
  {
    case 'MATSU':
    if(otherSalesPrice < obentoPrice[0]){
      obentoPrice[0] = otherSalesPrice;
      break;
      }
    else{
      obentoPrice[0] = obentoPrice[0];
      break;
      }
    }
    case 'TAKE':
    if(otherSalesPrice < obentoPrice[1]){
      obentoPrice[1] = otherSalesPrice;
      break;
    }
    else{
      obentoPrice[1] = obentoPrice[1];
      break;
    }
    case 'UME':
    if(otherSalesPrice < obentoPrice[2]){
      obentoPrice[2] = otherSalesPrice;
      break;
    }
    else{
      obentoPrice[2] = obentoPrice[2];
      break;
    }
    case 'ONIGIRI':
    if(otherSalesPrice < obentoPrice[3]){
      obentoPrice[3] = otherSalesPrice;
      break;
    }
    else{
      obentoPrice[3] = obentoPrice[3];
      break;
    }
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

  var myStore = ObentoMarket.Store.entry('ニッチくん最新',function(day) {
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
      var enemyRate = [];
      var yesterday = histories[day - 2];
      var myActual = yesterday.storeActuals[myStore.id];

      if(day == 1)
      {
      activity.obentoId = 'MATSU';
      activity.purchaseNum = 20;
      activity.salesPrice = 3000;
      }

      else if(day >= 2)
      {
        if(myActual.gain =< 0)  //収入が負の時
        {
          var yesterday = histories[day - 2];
          var ids = ObentoMarket.Store.getCompetitorIds(myStore.id);
          for (var i = 0; i < ids.length; i++) {
            var storeInfo = ObentoMarket.Store.getById(ids[i]);
            var actual = yesterday.storeActuals[ids[i]];
            obentoName = actual.obentoId;
            otherSalesPrice = actual.salesPrice;
            enemyCapital = actual.capitalStock;
            SetObentoPrice(obentoName, obentoPrice, otherSalesPrice);  //やすかったら上書きする機能に帰る
            diff[i] = (standardPrice(obentoName) - otherSalesPrice)/standardPrice(obentoName);
            enemyRate[i] = actual.cost/actual.capitalStock;  //投資率
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
            //ニッチな弁当がない場合
            if(matsuCount!=0 && takeCount!=0 && umeCount!=0 && onigiriCount!=0)
            {
              minStore = diff.indexOf(Math.min.apply(null,diff));
              activity.obentoId = product[minStore];
            }
            else  //ニッチな弁当がある場合
            {
              activity.obentoId = DecideObento(matsuCount,takeCount,umeCount,onigiriCount);
              SetDeadPri(activity.obentoId);  //損益分岐点の価格に設定
            }

       //買う弁当の価格を取得
        switch(activity.obentoId)
        {
          case 'MATSU':
          if(obentoPrice[0]> matsuBase)
          {
            activity.salesPrice = obentoPrice[0];
            break;
          }
          else
          {
            activity.salesPrice = matsuBase;
            break;
          }
          case 'TAKE':
          if(obentoPrice[1]> takeBase)
          {
            activity.salesPrice = obentoPrice[1];
            break;
          }
          else
          {
            activity.salesPrice = takeBase;
            break;
          }
          case 'UME':
          if(obentoPrice[2] > umeBase)
          {
            activity.salesPrice = obentoPrice[2];
            break;
          }
          else
          {
            activity.salesPrice = umeBase;
            break;
          }
          case 'ONIGIRI':
          if(obentoPrice[3] > onigiriBase)
          {
            activity.salesPrice = obentoPrice[3];
            break;
          }
          else
          {
            activity.salesPrice = onigiriBase;
            break;
          }
        }
          activity.purchaseNum = 20;
        }
        else  //収入が正の時
        {
          activity.purchaseNum = 20;
          activity.obentoId = myActual.obentoId;
          activity.salesPrice = myActual.salesPrice;
        }
      }
      return activity;
    }
  );

})();
