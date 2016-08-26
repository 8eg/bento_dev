# coding: UTF-8
import numpy as np


def weight_update(now,weight):
    """
    天候に応じて翌日の天候の発生確率を操作する関数
    """
    if now==0:
        weight = [0.49,0.25,0.25,0.01]
    elif now==1:
        weight = [0.25,0.49,0.25,0.01]
    elif now ==2:
        weight = [0.25,0.25,0.49,0.01]
    elif now ==3:
        weight =[0.33,0.33,0.33,0.01]
    return weight

def p_return(max_num, input):
    """
    max_numによる安全性の担保をする奴
    与えられた仕入数に関し検閲をし危険可能性を回避
    """
    if max_num>input:
        ans = input
    else:
        ans = max_num
    return ans


def run_test(rate):
    """
    実際にゲームの再現を行う関数
    """
    storm_count =[]   #嵐の発生日を記録する配列
    climates = [0,1,2,3] #順に晴、雲、雨、嵐
    weight =[0.33,0.33,0.33,0.01] #発生確率→これも順に晴、雲、雨、嵐
    climate = np.random.choice(climates, p=weight) #ランダムを引き起こすがweightによる確率操作を行う
    capital = 1000000 #資産、初期値に100万をセット
    
    choise = 1
    """
    ↑買うものをセット、choiseが取りうる値は0,1,2,3
    0:松
    1:竹
    2:梅
    3:おにぎり　を意味する
    """
    
    
    
    buy_price = [1200,1000,800,200] #仕入れ原価の配列順に　松, 竹, 梅, おにぎり
    sale_price= [4000,2500,1600,444]#標準価格の配列↑と同じ順
    
    win_rate = [[0.31,0.305,0.305,0.01],
                [0.405,0.42,0.405,0.01],
                [0.505,0.505,0.52,0.01],
                [0.451,0.451,0.451,0.5]
                ]
    """
    各商品の天候における販売率をセットしている
    winrate[choise][climate] で目的の販売率にアクセス
    """

    #ここから下が実際の年間ゲーム再現
    for time in range(360):
        #最初に意思決定時のmax numberをセット、式を解くと下記になる
        max_num = (capital - 2000)/1160
        
        throw = capital*rate #実際に投資を試みる金額をまずは出す
        p_num = throw/buy_price[choise] #その投資金額で商品を買おうとする時の購買予定数を出す
        throw = p_num * buy_price[choise] #上式では商は切り捨てられるため、それを基に実際の投資予定金を出す
        if capital <12000: #安全戦略条件、12000円以下かの条件分岐
            #おにぎり戦法に入る
            choise = 3 #買うのはおにぎり
            #おにぎり戦法における戦略変化により意思決定を変更（以下2行）
            p_num = capital/buy_price[choise]
            throw = p_num * buy_price[choise]
        #capital = capital - throw
        
        climate = np.random.choice(climates, p=weight) #天候をランダムジェネレイト
        p_num = p_return(max_num, p_num) #マックスナンバーチェック
        
        expect_result = sale_price[choise]*win_rate[choise][climate]*p_num - buy_price[choise]*p_num
        #↑実際の期待値  = (標準価格 * 販売率 * 個数)  - (原価 * 個数)
        
        capital += expect_result
        #期待利得を現在資産に組み込む
        
        choise = climate #次の選択を今の天気に基づいたものにする
        if climate == 3:#天候があらしだったら、、、、
            storm_count.append(time) #いちおかぞえる
            choise = 1 #つぎかうのは竹にする
        
        weight=weight_update(climate,weight) #天候の発生確率を操作
        #print "期待",int(expect_result)
        #print int(capital), climate
    return int(capital), storm_count, len(storm_count)#最終資産, 嵐の発生日時群, 発生回数を返す 

def test(rate,count):
    for each in range(count):
        ans = run_test(rate)
        print ans
        
