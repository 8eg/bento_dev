(function() {

function maxNumCheck(max, input)
{
  var number;
  if(max > input)
  {
    number = input;
  }
  else
  {
    number = max;
  }
  return number;
}

  var myStore = ObentoMarket.Store.entry('りんご',function(day) {
      var storeInfo = ObentoMarket.Store.getById(myStore.id);
      var histories = ObentoMarket.getHistory();

      var activity = {};
      var purchaseNum = activity.purchaseNum;
      const minPri = 2000;  //最低限わっちゃいけない額：おにぎり１０個分
      const matsuPri = 40;  //松を売って嵐の時に出る利益
      const getMatsuPri = 1200; //松の仕入れ値
      const stromPro = 0.01;  //嵐の確率
      const rate = 0.80;  //全資本あたりの投資率
      const upperline = 100000000;  //これ超えたらおにぎりだけ売る
      const underline = 12000;  //これわったらおにぎり売って凌ぐ

      maxNum = Math.floor((storeInfo.capitalStock - minPri)/(getMatsuPri - stromPro*matsuPri));

      if(day == 1)
      {
        activity.purchaseNum = 300;
        activity.obentoId = 'MATSU';
      }
      else if(day >= 2)
      {
        var yesterday = histories[day - 2];
        var actual = yesterday.storeActuals[myStore.id];
        if(storeInfo.capitalStock < underline)
          {
            activity.purchaseNum = Math.floor(storeInfo.capitalStock/200);
            activity.obentoId = 'ONIGIRI';
            //return;
          }
        else if(storeInfo.capitalStock > upperline)
          {
            activity.purchaseNum = Math.floor((storeInfo.capitalStock/200)*rate);
            activity.obentoId = 'ONIGIRI';
          }
        }
        else
        {
          if(yesterday.weather == ObentoMarket.Weather.SHINE){
            purchaseNumInput = Math.floor((storeInfo.capitalStock/1200)*rate);
            activity.purchaseNum = maxNumCheck(maxNum,purchaseNumInput);
            activity.obentoId = 'MATSU';
          }else if (yesterday.weather == ObentoMarket.Weather.CLOUD)
          {
            purchaseNumInput = Math.floor((storeInfo.capitalStock/1000)*rate);
            activity.purchaseNum = maxNumCheck(maxNum,purchaseNumInput);
            activity.obentoId = 'TAKE';
          }else if (yesterday.weather == ObentoMarket.Weather.RAIN)
          {
            purchaseNumInput = Math.floor((storeInfo.capitalStock/800)*rate);
            activity.purchaseNum = maxNumCheck(maxNum,purchaseNumInput);
            activity.obentoId = 'UME';
          }
          else  //嵐の次の日の竹
          {
            purchaseNumInput = Math.floor((storeInfo.capitalStock/1000)*rate);
            activity.purchaseNum = maxNumCheck(maxNum,purchaseNumInput);
            activity.obentoId = 'TAKE';
          }
        }
      }
      return activity;
    }
  );
})();