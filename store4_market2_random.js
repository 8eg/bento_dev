 (function() {
  

  var myStore = ObentoMarket.Store.entry('1/4の確率でうろちょろ',function(day) {

     var rand = Math.floor(Math.random()*4)+1;
     var storeInfo = ObentoMarket.Store.getById(myStore.id);
     var histories = ObentoMarket.getHistory();
     
     var activity = {};
     var purchaseNum = activity.purchaseNum;
     //const minPri = 2000;
     //const matsuPri = 40;
     //const getMatsuPri = 1200;
     //const stromPro = 0.01;
     //const rate = 0.80;
     //const rand = 1 //Math.floor(Math.random()*6)+1; //1~7の整数型変数を生成
     //const upperline = 100000000;
     //const underline = 12000;
     
     //maxNum = Math.floor((storeInfo.capitalStock - minPri)/(getMatsuPri - stromPro*matsuPri));
     
     if(rand==1){
     activity.obentoId = 'ONIGIRI';
     activity.purchaseNum= 10;
     activity.salesPrice= 444;
     }
     else if(rand==2){
     activity.obentoId = 'MATSU';
     activity.purchaseNum= 10;
     activity.salesPrice= 4000;
     }
     else if(rand==3){
     activity.obentoId = 'TAKE';
     activity.purchaseNum= 10;
     activity.salesPrice= 2500;
     }
     else{
     activity.obentoId = 'UME';
     activity.purchaseNum= 10;
     activity.salesPrice= 1600;
     }
     return activity;
     }
     );
  })();








