window.onload = function () {
  var oC=document.querySelector('#c1');
  var gd=oC.getContext('2d');
  loadImage(resource,init);
  function loading( obj,cur,sum ){
    obj.innerHTML = '正在努力加载中...'+parseInt((cur/sum)*100)+"%"
    // console.log()
    if( parseInt((cur/sum)*100)==100 ){
        obj.style.display = 'none';
    }
  }
  function init(){
    var c = new Cannon(1);
    var arrBullet=[]; //收集炮弹
    var arrFish=[];//收集鱼类
    var arrWeb=[];//收集网
    var arrDead=[];//收集死鱼
    var arrCoin=[];//收集金币
    var score=2000;//计算分数

    setInterval(function(){
      gd.clearRect(0,0,oC.width,oC.height);

      //画鱼
      if( Math.random()<0.09 ){
        var f = new Fish( rand(1,5) );
        if( Math.random()<0.5 ){//一般几率从左边出现
          f.x = -100;
          f.rotate = rand( -50 , 50 );
        }else{
          f.x = oC.width + 100; ;
          f.rotate = rand( 130 , 230 );
        }
        f.y = rand( 100,oC.height-100 )
        arrFish.push(f);
      }
      if( Math.random()<0.004 ){
        var s = new Shark( rand(1,2) );
        if( Math.random()<0.5 ){//一般几率从左边出现
          s.x = -400;
          s.rotate = rand( -50 , 50 );
        }else{
          s.x = oC.width + 400; ;
          s.rotate = rand( 130 , 230 );
        }
        s.y = rand( 100,oC.height-100 )
        arrFish.push(s);
      }
      //鱼的绘制和性能优化
      for(var i=0;i<arrFish.length;i++){
        arrFish[i].draw(gd);
        if(  arrFish[i].constructor == Fish && ( arrFish[i].x<-100 || arrFish[i].x>oC.width+100 ||arrFish[i].y<-100 ||
          arrFish[i].y>oC.height+100)
        ){
          clearInterval(arrFish[i].timer1);
          clearInterval(arrFish[i].timer2);
          arrFish.splice(i--,1);//剔除实例
          // console.log(a)
        }else if(
          arrFish[i].constructor == Shark && 
          (arrFish[i].x<-500 ||
          arrFish[i].x>oC.width+500 ||
          arrFish[i].y<-500 ||
          arrFish[i].y>oC.height+500)
          ){
          clearInterval(arrFish[i].timer1);
          clearInterval(arrFish[i].timer2);
          arrFish.splice(i--,1);//剔除实例
        }
      }

      //统一绘制炮弹
      //炮弹性能优化
      for(var i=0;i<arrBullet.length;i++){
        arrBullet[i].draw(gd);
        if(
          arrBullet[i].x<-100 ||
          arrBullet[i].x>oC.width+100 ||
          arrBullet[i].y<-100 ||
          arrBullet[i].y>oC.height+100
        ){
          clearInterval(arrBullet[i].timer);
          arrBullet.splice(i--,1);//剔除实例
        }
      }

      //网的绘制
      for(var i=0;i<arrWeb.length;i++){
        arrWeb[i].draw(gd);
      }

      //死鱼的绘制
      for(var i=0;i<arrDead.length;i++){
        arrDead[i].draw(gd);
      }

      //统一绘制金币
       for(var i=0;i<arrCoin.length;i++){
         arrCoin[i].draw(gd);
       }

      
      //画底部
      gd.drawImage(JSON['bottom'],
        0,0,765,70,
        0,532,765,70
      );
      //画炮弹的加减
      gd.drawImage(JSON['bottom'], //减号
        136,73,37,30,
        370,570,37,30
      );
      gd.drawImage(JSON['bottom'], //加号
        45,75,39,29,
        450,570,39,29
      );
      
      //画分数
      var _score = fillzero(score);
      for ( var i = 0 ; i < _score.length ; i++ ){
        gd.drawImage(JSON['number_black'], 
          0,216-(_score[i]*24),20,24,
          17+i*24,575,20,24
        );
      }
      

      //画炮
      c.draw(gd)

      //子弹和鱼碰撞
      for ( var j = 0 ; j < arrBullet.length ; j++ ){
        for ( var i = 0 ; i < arrFish.length ; i++ ){
          var x = arrFish[i].x - arrBullet[j].x
          var y = arrFish[i].y - arrBullet[j].y
          var l = Math.sqrt(x*x + y*y);
          if( l < arrFish[i].collR ){//实现碰撞,渔网出现
            var w = new Web(c.type);
            w.x = arrBullet[j].x;
            w.y = arrBullet[j].y;
            arrWeb.push(w);
            setTimeout(function(){
              clearInterval(arrWeb[0].timer)
              arrWeb.splice(0,1);
            },500)
            clearInterval(arrBullet[j].timer);//炮弹剔除
            arrBullet.splice(j--,1);
            //渔网内的所有鱼都被捕获
            for( var k = 0 ; k < arrFish.length ; k++ ){
              var x = arrFish[k].x - w.x ;
              var y =  arrFish[k].y - w.y ; 
              var l = Math.sqrt(x*x + y*y);
              if( l < w.w/2 || l<arrFish[k].collR  ){
                //出金币
                if( arrFish[k].constructor==Fish && Math.random() < 0.1*(8 - arrFish[k].type) && Math.random()<0.3+0.05*c.type || ( arrFish[k].constructor==Shark && Math.random() < 0.02*(3-arrFish[k].type) ) ){
                  var coin = new Coin(arrFish[k].type);
                  coin.x=arrFish[k].x;
                  coin.y=arrFish[k].y;
                  arrCoin.push(coin);
                  setTimeout(function(){
                    arrCoin.shift();
                  },1000)
                  if( arrFish[k].constructor==Fish ){
                    coin.point = arrFish[k].type*5;
                    score += arrFish[k].type*5;
                  }else{
                    coin.point = arrFish[k].type*100;
                    score += arrFish[k].type*100;
                  }
                  
                  //死鱼处理
                  clearInterval(arrFish[k].timer1);
                  clearInterval(arrFish[k].timer2);
                  arrFish[k].die();//死鱼动画
                  arrDead.push(arrFish[k]);
                  setTimeout(function(){
                    arrDead.splice(0,1);
                  },500)
                  arrFish.splice(k--,1);//鱼剔除
                }
              }
            }
            if( j<0 ){
              break;
            }
          }
        }
      }
    },30);
    //交互  
    oC.onclick=function(ev){
      if( ev.offsetX > 370 && ev.offsetX < 370+37 && ev.offsetY > 570 && ev.offsetY < 570+30 ){//减号
        gd.drawImage(JSON['bottom'], 
          91,73,37,30,
          370,570,37,30
        );
        c.type--
        if( c.type == 0  ){
          c.type = 7;
        }
      }else if(  ev.offsetX > 450 && ev.offsetX < 450+39 && ev.offsetY > 570 && ev.offsetY < 570+29 ){//加号
        gd.drawImage(JSON['bottom'], 
          0,75,39,29,
          450,570,39,29
        );
        c.type++
        if( c.type == 8  ){
          c.type=1;
        }
      }else{
        // console.log(arrBullet )
        // console.log(arrFish )
        // console.log(arrDead )
        // console.log(arrWeb )
        // console.log(arrCoin )
        // console.log( )
        score -= c.type;
        var x=ev.offsetX-c.x;
        var y=ev.offsetY - c.y;
        var d = a2d(Math.atan2(y,x)) + 90;
        c.rotate=d;//规定炮角度
        //发射动作
        c.emit();

        //出炮弹
        var b = new Bullet(c.type);
        b.rotate=c.rotate;
        b.x=c.x;
        b.y=c.y;
        arrBullet.push(b);
      }
    };
  }
}