var colors = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a)
var colors_r = "03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08".split("-").map(a=>"#"+a)
var clr,clr_r

var positionX =[]
var positionY =[]
var clrList =[]
var clr_r_List =[]
var sizeList =[]
let handpose;
let video; //攝影機取得影像，放影像資料
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16


function setup() {
  createCanvas(windowWidth, windowHeight);  
  angleMode(DEGREES);//將方位度數改為角度模式

  for(var j=0;j<10;j++){  
    positionX.push(random(width)) //把花X位置存入到positionX list資料內
    positionY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionX[j],positionY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
    pop()
    }

  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
      predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
	
  
}

function modelReady() {
  console.log("Model ready!");
}


function draw() {
  translate(width, 0);
  scale(-1, 1);
	
	image(video,0,0,width, height)
	 
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指的距離


  for(var j=0;j<positionX.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionX[j],positionY[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
    r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionX[j],positionY[j])
  }
  
	drawKeypoints(); //取得手指位置
  
}
  


function drawFlower(clr,clr_r,size=1){    
  
  push()
  scale(size)
  fill(clr)
  ellipse(0,0,400/1.05,400/0.88) //臉
  fill("#caf0f8")
  triangle(0,-400/20,-400/13,400/13,400/20,400/13) //鼻子

  // fill("#0077b6")
  // ellipse(-25,0,20)//左鼻孔
  // ellipse(25,0,20)//右鼻孔
  fill("#bc4749")

  ellipse(-400/5.3,-400/5,400/6.66,400/10) //眼睛
  ellipse(400/5.3,-400/5,400/6.66,400/10) //眼睛

  fill(0)
  ellipse(-400/5.3,-400/5,400/16)//左眼珠
  ellipse(400/5.3,-400/5,400/16)

  arc(0,-400/3.07,400/1.21,400/1.6,180,0) //瀏海

   
     fill(clr_r)
     arc(0,400/5.3,400/4,400/5.3,0,180)//嘴巴變綠色

pop()

}

function mousePressed(){
  //紀錄資料
  positionX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionX list資料內
  positionY.push(mouseY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionX.length
  //畫圖
  push() 
    translate(positionX[data_length-1],positionY[data_length-1]) //花的座標，原點移到視窗的中心點
    clr = clrList[data_length-1]
    clr_r = clr_r_List[data_length-1]
    drawFlower(clr,clr_r,sizeList[data_length-1]) 
  pop()
      
  }

  function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        fill(0, 255, 0);
        // noStroke();
        if (j == 8) {				
          pointerX8 = map(keypoint[0],0,640,0,width)
          pointerY8 = map(keypoint[1],0,480,0,height)
          pointerZ8 = keypoint[2]
          console.log(pointerZ8)
          if(pointerZ8<-40)
          {
            R_draw(pointerX8,pointerY8)
          }
          
          ellipse(pointerX8, pointerY8, 30, 30);
        } else
        if (j == 4) {   
      fill(255,0,0)
          pointerX4 = map(keypoint[0],0,640,0,width)
          pointerY4 = map(keypoint[1],0,480,0,height)
          // pointerZ = keypoint[2]
          // print(pointerZ)
          ellipse(pointerX4, pointerY4, 30, 30);
      
        } else
        if (j == 14) {
          pointerX14 = keypoint[0];
          pointerY14 =  keypoint[1];
        } else
        if (j == 16) {
          pointerX16 = keypoint[0];
          pointerY16 =  keypoint[1];
        }
        
      }
    
    }
  }

  function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
    push()
      translate(F_x,F_y);
    if(pointerY14<pointerY16){
      drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6))
    }else
    {
      //無名指沒有彎曲，張開無名指，花旋轉
      rotate(frameCount/20)
      drawFlower(F_clr,F_clr_r,F_size)
        
    }
    pop()
  }
  
  function R_draw(handX,handY)
  {
  positionX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionX list資料內
  positionY.push(handY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionX.length
  //畫圖
  push() 
    translate(positionX[data_length-1],positionY[data_length-1]) //花的座標，原點移到視窗的中心點
    clr = clrList[data_length-1]
    clr_r = clr_r_List[data_length-1]
    drawFlower(clr,clr_r,sizeList[data_length-1]) 
  pop()
  
  }