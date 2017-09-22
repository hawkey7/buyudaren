var WEB_SIZE=[
  null,
  {x: 335, y: 375, w: 92, h: 92},
  {x: 10, y: 411, w: 130, h: 116},
  {x: 172, y: 369, w: 146, h: 131},
  {x: 244, y: 192, w: 183, h: 158},
  {x: 0, y: 245, w: 171, h: 164},
  {x: 240, y: 0, w: 193, h: 190},
  {x: 23, y: 20, w: 206, h: 212}
];
class Web{
  constructor(type){
    this.type = type || 1;
    this.x = 0;
    this.y = 0;
    this.w = WEB_SIZE[this.type].w;
    this.h = WEB_SIZE[this.type].h;
    this.scale = 0.5;
    this.move();
  }
  draw(gd){
    var x=BULLET_SIZE[this.type].x;
    var y=BULLET_SIZE[this.type].y;
    gd.save();
    gd.translate( this.x,this.y )
    gd.scale( this.scale , this.scale )
    gd.drawImage(JSON['web'],
      WEB_SIZE[this.type].x,WEB_SIZE[this.type].y,this.w,this.h,
      -this.w/2,-this.h/2,this.w,this.h
    );
    gd.restore();
  }
  move(){
    clearInterval(this.timer);
    this.timer = setInterval(function(){
      this.scale += (1 - this.scale)/8;
    }.bind(this),16)
  }
}