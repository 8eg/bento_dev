(function() {

//ニッチなお弁当を次の購入弁当に決定する
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

//前日の最低弁当取引価格を保存する
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

//今は使ってない
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

//標準価格を返す
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

  var myStore = ObentoMarket.Store.entry('ニッチくん2',function(day) {
      var histories = ObentoMarket.getHistory();
      var matsuCount = 0;
      var takeCount = 0;
      var umeCount = 0;
      var onigiriCount = 0;
      var activity = {};
      var diff = [];
      var product = [];
      var obentoPrice = [4000, 2500, 1600, 444];  //最低取引価格を格納する配列
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
      var ids = ObentoMarket.Store.getCompetitorIds(myStore.id); //市場にいる他店舗のIDを全てゲット
      for (var i = 0; i < ids.length; i++) {
        var storeInfo = ObentoMarket.Store.getById(ids[i]);   //IDを元に店情報を取得
        var actual = yesterday.storeActuals[ids[i]];          //昨日の店情報ハッシュを取得
        obentoName = actual.obentoId;
        otherSalesPrice = actual.salesPrice;                  //その店の昨日の販売価格
        SetObentoPrice(obentoName, obentoPrice, otherSalesPrice); //最低取引価格を更新
        diff[i] = (standardPrice(obentoName) - otherSalesPrice)/standardPrice(obentoName);  //標準価格と販売価格の差を算出
        product[i] = obentoName;  //販売したおべんとうの名前を配列に格納
        //お弁当が存在したら弁当カウントをあげる
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
        //ニッチな弁当が存在しない時
        if(matsuCount!=0 && takeCount!=0 && umeCount!=0 && onigiriCount!=0)
        {
          minStore = diff.indexOf(Math.min.apply(null,diff));   //最も販売価格が標準化価格に近かった店の番号を取得
          activity.obentoId = product[minStore]; //その店が売っていた弁当名を取得
        }
        //ニッチな弁当が存在する時
        else
        {
          //次に買う弁当はニッチな弁当にする
          activity.obentoId = DecideObento(matsuCount,takeCount,umeCount,onigiriCount);
        }
        //買う弁当の価格を取得
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
      activity.purchaseNum = 20;  //購入数
      }
      return activity;
    }
  );

})();
