 class Coin {
  constructor(type){
    this.type=type||1;
    this.x=0;
    this.y=0;
    this.cur=0;
    this.timer=null;
    this.scale=1;
    this.point=0;
    this.move();
    this.flag=true;
    
  }
  draw(gd,point){
    gd.save();
    // console.log(this.flag)
    if( this.flag ){
     var _point = this.point+"";
     // console.log(_point[0])
     // console.log(typeof _point)
     for( var i = 0 ; i < _point.length ; i++ ){
       gd.drawImage(JSON['coinText'],
         _point[i]*36,0,36,49,
         this.x+36*i,this.y,36,49
       );
     }
     gd.drawImage(JSON['coinText'],
         10*36,0,36,49,
         this.x+36*_point.length,this.y,36,49
       );
    }else{
     gd.translate(this.x+60/2,this.y+60/2);
     gd.scale(this.scale,this.scale);
     switch (this.type){
       case 1:
       case 2:
         gd.drawImage(JSON['coinAni1'],
           0,this.cur*60,60,60,
           -60/2,-60/2,60,60
         );
         break;
       case 3:
       case 4:
       case 5:
         gd.drawImage(JSON['coinAni2'],
           0,this.cur*60,60,60,
           -60/2,-60/2,60,60
         );
         break;
     }
    }
    gd.restore();
  }
  move(){
   setTimeout(function(){
     this.flag = false;
     this.playSong();
     clearInterval(this.timer);
     this.timer=setInterval(function(){
       this.cur++;
       if(this.cur==10){
         this.cur=0;
       }
       this.x += (0-this.x)/8;
       this.y += (600-this.y)/8;
       this.scale-=0.05;
       if(this.scale<0){
         clearInterval(this.timer);
       }
     }.bind(this),30);
   }.bind(this),600)
    
  }
  playSong(){
    var oA=new Audio();
    oA.src='./snd/coin.wav';
    oA.play();
  }
}