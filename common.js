var JSON={};//{'fish1':oImg,xx,xx}存资源
    function loadImage(arr,success,loading){
      var oLoading = document.querySelector('#loading');
      for(let i = 0 ; i < arr.length; i++){
        var oImg = new Image();
        oImg.src = 'img/'+arr[i]+'.png'
        // loading && loading(oLoading,i+1,arr.length);
        oImg.onload = function(){
          JSON[arr[i]]=this;
          if( i == arr.length-1 ){
            success();
          }
        }
      }
    }

    function rand(n,m){
      return parseInt(Math.random()*(m-n+1))+n;
    }
    function fillzero(n){
      if( n<10 ){
        return '000000';
      }else if ( n<100 ){
        return '0000' + n;
      }else if( n<1000 ){
        return '000' + n;
      }else if( n<10000 ){
        return '00' + n;
      }else if( n<100000 ){
        return '0' + n;
      }else{
        return n;
      } 
    }
    function d2a(n){
      return n*Math.PI/180;
    }
    function a2d(n){
      return n*180/Math.PI;
    }