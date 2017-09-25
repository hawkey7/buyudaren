var FISH_SIZE=[
  null,
  {w: 55, h: 37, collR: 17},
  {w: 78, h: 64, collR: 24},
  {w: 72, h: 56, collR: 20},
  {w: 77, h: 59, collR: 22},
  {w: 107, h: 122, collR: 29}
];
class Fish{
  constructor(type){
    this.type = type;
    this.x = 0;
    this.y = 0;
    this.rotate = 230 ;
    this.speed = (8-this.type)/5 + 1;
    this.cur = 0;
    this.collR = FISH_SIZE[this.type].collR;
    this.move();
  }
  draw(gd){
    var w = FISH_SIZE[this.type].w;
    var h = FISH_SIZE[this.type].h;
    //开始canvas画图
    gd.save();
    gd.translate( this.x  , this.y  );
    gd.rotate(d2a( this.rotate ));
    if( this.rotate > 90 && this.rotate < 270 ){
      gd.scale(1,-1)
    }
    gd.drawImage( JSON['fish'+this.type],
      0,this.cur*h,w,h,
      -w/2,-h/2,w,h
     );
    gd.restore();
  }
  move(){
    this.timer1 = setInterval(function(){//游走定时器
      this.x += this.speed*Math.cos(d2a(this.rotate));
      this.y += this.speed*Math.sin(d2a(this.rotate));
      // console.log( Math.sin(this.rotate) )
    }.bind(this),30)
    this.timer2 = setInterval(function(){//摆尾换图定时器
      this.cur++;
      if( this.cur==4 ) this.cur =0 ;
    }.bind(this),300)
  }
  die(){
    this.cur = 4
    this.timer3 = setInterval(function(){//摆尾换图定时器
      this.cur++;
      if( this.cur==9 ) {
        clearInterval(this.timer3) ;
      }
    }.bind(this),150)
  }
}
// var SHARK_SIZE=[
//   {w: 509, h: 270}
// ]
class Shark extends Fish{//位置,碰撞体积,角度需要指定
  constructor(type){
    super(type);
    this.speed = 1;
    this.rotate = 0;
    this.collR = 150;
    this.cur =0;
  }
  draw(gd){
    //开始canvas画图
    gd.save();
    gd.translate( this.x  , this.y  );
    gd.rotate(d2a( this.rotate ));
    if( this.rotate > 90 && this.rotate < 270 ){
      gd.scale(1,-1)
    }
    if( this.type==1 ){
      this.w = 509;
      this.h = 270;
    }else{
      this.w = 516;
      this.h = 273;
    }
    gd.drawImage( JSON['shark'+this.type],
      0,this.cur*this.h,this.w,this.h,
      -this.w/2,-this.h/2,this.w,this.h
    );
    gd.restore();
  }
  move(){
    this.timer1 = setInterval(function(){//游走定时器
      this.x += this.speed*Math.cos(d2a(this.rotate));
      this.y += this.speed*Math.sin(d2a(this.rotate));
      // console.log( Math.sin(this.rotate) )
    }.bind(this),30)
    this.timer2 = setInterval(function(){//摆尾换图定时器
      this.cur++;
      if( this.cur==8 ) this.cur =0 ;
    }.bind(this),300)
  }
  die(){
    this.cur = 8;
    this.timer3 = setInterval(function(){//摆尾换图定时器
      this.cur++;
      if( this.cur==12 ) {
        clearInterval(this.timer3) ;
      }
    }.bind(this),150)
  }
}