(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var width = 500;
var height = 300;
var canvas = document.getElementById("canvas");

canvas.width = width*2;
canvas.height = height*2;

canvas.style.width = "500px";
canvas.style.height = "300px";

canvas.style.width = width;
canvas.style.height = height;

ctx = canvas.getContext("2d");

canvas.getContext('2d').scale(2,2);   

   
  player = {
    x: width / 2,
    y: 0,
    width: 40,
    height: 25,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false
  },
  guy = {
    x: -95,
    y: 85,
    width: 45,
    height: 35,
    direction: "l",
    count: 0
  }

  ground = {
    x: 0,
    y: 500,
    width: width,
    height: 30
  }
  
  /*
  elevator = {
    x: 100,
    y: 495,
    width: 40,
    height: 40,
    at_top: 0
  } 
  
  briefcase = {
    x: 2900,
    y: 370,
    width: 20,
    height: 12,
    count: 0
  }
  */

  keys = [],
  friction = 0.8,
  gravity = 0.2;

//court house door
/*
door = {
  x: 6835,
  y: 175,
  width: 50,
  height: 75,
  color: "transparent"
};
*/
//put random leaves on the tree
var leaves = []
for (i = 0; i < 6; i++) {
  leaves.push({
    x: Math.random() * (10 - -70) + -70,
    y: Math.random() * (140 - 40) + 40,
    size: Math.random() * (50 - 20) + 20
  });
}

var boxes = [];
// courthouse platform

//tree platforms
boxes.push({
  x: -40,
  y: 250,
  width: 130,
  height: 15
});
boxes.push({
  x: 150,
  y: 180,
  width: 30,
  height: 30
});
//trunk
boxes.push({
  x: -30,
  y: 130,
  width: 7,
  height: 120
});
//top branch
boxes.push({
  x: -85,
  y: 125,
  width: 70,
  height: 7
});
//bottom branch
boxes.push({
  x: -24,
  y: 170,
  width: 20,
  height: 7
});
//player platform
boxes.push({
  x: 215,
  y: 150,
  width: 60,
  height: 60
});
// create random stars
var stars = []
//narth star
  stars.push({
    x: 50,
    y: 30,
    size: 10,
    twinkle: false
  });
for (i=0; i<20; i++){
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 8,
    twinkle: false
  });
}
//create random clouds
var clouds = [];

var drip = {
  x:0,
  y:0,
  offset:0,
  width:2,
  height:2,
  color:"blue"
};

//intitalize some variables
var points = 0;
var drips_collected = 100;
//var points = 0;
var star_twinkler = false;
var sky_change_speed = 0;
var getting_lighter = true;
var head_running_timer_right = 0;
var head_running_timer_left = 0;
var running_timer_right = 0;
var running_timer_left = 0;
var popo_pic_offset = 0;
var right_arrow_count = 0;
var left_arrow_count = 0;
var originx = 0;
var originy = 0;
var right_button_count = 0;
var right_button_count = 0;
var origin = 0;
var gap_length = 180;
var frame_count = 0;
var box_color = 250;
var guy_floating_speed = .3;

canvas.width = width;
canvas.height = height;


function update() {
  frame_count++;


  // check keys
  if (keys[38] || keys[32]) {
    // up arrow or space
    if (!player.jumping && player.grounded) {
      player.jumping = true;
      player.grounded = false;
      player.velY = -player.speed * 2;
    }
  }

  //put a gap in the path every 50 blocks
  /*
  if (boxes.length % 50 === 0) {
    next_blockx = boxes[boxes.length - 1].x + boxes[boxes.length - 1].width - 2 + gap_length;
  } else {
  */
    next_blockx = boxes[boxes.length - 1].x + boxes[boxes.length - 1].width - 2;
      //next_blockx = boxes[boxes.length - 1].x + boxes[boxes.length - 1].width;
 // }
  
  
  next_blocky = boxes[boxes.length - 1].y;

  var box_width = 25;
  //var box_width = (Math.random() * (160 - 50) + 50) - box_width;
  var box_height = (Math.random() * (80 - 50) + 50) - box_width;

  random_number = Math.random();
  var box_y_offset = 0;
  if (random_number >.8){
    var box_y_offset = 25;
    } else if (random_number<.2){
    var box_y_offset = -25;
  }
  
//don't let boxes get too high or low 
  if (boxes[boxes.length-1].y+box_y_offset<70 || boxes[boxes.length-1].y+box_y_offset>height-10){
    box_y_offset = -box_y_offset;
  }

  if (keys[39]) {
    // right arrow
    right_arrow_count ++;
    if (player.x > 249) {
      guy.direction = "l";
      originx = originx - 2;
      right_button_count++;
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].x = boxes[i].x - 2;
      }
      for (var i = 0; i < clouds.length; i++) {
        clouds[i].x = clouds[i].x - .5;
      }
      for (var i = 0; i < leaves.length; i++) {
        leaves[i].x = leaves[i].x - 2;
      }
      guy.x = guy.x - 2;
      dir = colCheck(player, boxes[boxes.length-1]);
      dir2 = colCheck(player, boxes[boxes.length-2]);
      if (dir !== null || dir2 !== null){
        boxes.push({
          x: next_blockx,
          y: next_blocky+box_y_offset,
          width: box_width,
          height: box_height,
          on: 0,
          water: false,
          dandelion: Math.random(),
          topiary: false
        });
      }
    } else {
      player.x++;
    }
  }

  if (keys[37]) {
  	left_arrow_count++;
    // left arrow
    if (player.x < 251) {
      guy.direction = "r";
      originx = originx + 2;
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].x = boxes[i].x + 2;
      }
      for (var i = 0; i < clouds.length; i++) {
        clouds[i].x = clouds[i].x + 1;
      }
      for (var i = 0; i < leaves.length; i++) {
        leaves[i].x = leaves[i].x + 2;
      }
      guy.x = guy.x + 2;
    } else {
      player.x--;
    }
  }


  player.velX *= friction;
  player.velY += gravity;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();

  //blue sky background
  ctx.beginPath();
  
  
  if (getting_lighter === true){
    sky_change_speed -=.1;
    if (sky_change_speed < -300){
      getting_lighter = false;
    }
  } else {
    sky_change_speed +=.1;
    if (sky_change_speed > height){
      getting_lighter = true;
    }
  }
    
    var grd=ctx.createLinearGradient(0,height+sky_change_speed,0,0+sky_change_speed);
  

    grd.addColorStop(0,"#99ffff");//light blue
    grd.addColorStop(1,"#19334d");//dark blue 
    ctx.fillStyle=grd;

  ctx.fillRect(0, 0, width, height);

  if (frame_count % 20 === 0){
    star_twinkler = !star_twinkler;
  }
  
  for (i=0;i<stars.length;i++){
    if (frame_count % (30*(i+1)) === 0){
      stars[i].twinkle = !stars[i].twinkle;
    }
    ctx.fillStyle="white";
    if (stars[i].twinkle === true){
      ctx.fillRect(stars[i].x,stars[i].y,.5,stars[i].size*1.5);
      ctx.fillRect(stars[i].x-stars[i].size/2+.25,stars[i].y+(stars[i].size*1.5)/2-1,stars[i].size,.5);
    } else {
      ctx.fillRect(stars[i].x,stars[i].y,1,stars[i].size*1.5);
      ctx.fillRect(stars[i].x-stars[i].size/2+.25,stars[i].y+(stars[i].size*1.5)/2-1,stars[i].size,.9);
    }
    
  }
  
if (guy.count>0){
  stars[0].x=450;
}  
  //north star circle
ctx.beginPath();
ctx.arc(stars[0].x+.5,stars[0].y+6.5,1.5,0,2*Math.PI);
ctx.strokeStyle="yellow",
ctx.stroke();
  
  //falling
  falling_speed = 5;
  if (player.y > height - player.height - 5) {
    if (originy > -200) {
      originy -= falling_speed;
      for (i = 0; i < boxes.length; i++) {
        boxes[i].y -= falling_speed;
      }
      for (i = 0; i < leaves.length; i++) {
        leaves[i].y -= falling_speed;
      }

      for (i = 0; i < clouds.length; i++) {
        clouds[i].y -= falling_speed;
      }
      guy.y -= falling_speed;
      //elevator.y -= falling_speed;
      ground.y -= falling_speed;
      player.y -= falling_speed;
      //door.y -= falling_speed;
      //briefcase.y -= falling_speed;
    }
  }

  player.grounded = false;

// collision check boxes
  for (var i = 0; i < boxes.length; i++) {
    if ((boxes[i].x + boxes[i].width > 0) && (boxes[i].x < width)) {
      var dir = colCheck(player, boxes[i]);
      if (dir === "l" || dir === "r") {
        player.velX = 0;
        player.jumping = false;
      } else if (dir === "b") {
        player.grounded = true;
        player.jumping = false;
        boxes[i].on = 1;
      } else if (dir === "t") {
        player.velY *= -1;
      }
    }
      //if (boxes[i].dandelion>.9){ // jump over dandelions
        //if (player.x<boxes[i].x && player.x+player.width>boxes[i].x+boxes[i].width-2 && player.y<boxes[i].y-50){
          //boxes[i].dandelion++;
        //}
      //}
  } //end loop over boxes



  var dir = colCheck(player, ground);
  if (dir === "b") {
    player.grounded = true;
    player.jumping = false;
  }

  //make the elevator go up and down  
  if(originy<0){
  	var dir = colCheck(player, guy);
  	if (dir === "b"){
    for (i = 0; i < boxes.length; i++) {
      boxes[i].y += guy_floating_speed;
    }
    for (i = 0; i < leaves.length; i++) {
      leaves[i].y += guy_floating_speed;
    }
    for (i = 0; i < clouds.length; i++) {
      clouds[i].y += guy_floating_speed;
    }
    guy.y -= guy_floating_speed/5;
    //elevator.y += guy_floating_speed;
    originy += guy_floating_speed;
    ground.y += guy_floating_speed;
    //door.y += guy_floating_speed;
    //briefcase.y += guy_floating_speed;
    }
  }
  
  
  

  ctx.fillStyle = "transparent";









  //collision check guy
 	//ctx.rect(guy.x, guy.y, guy.width, guy.height);
  //ctx.fillRect(guy.x, guy.y, guy.width, guy.height);
  var dir = colCheck(player, guy);
  if (dir === "l" || dir === "r") {
    player.velX = 0;
    player.jumping = false;
    guy.count++;
  } else if (dir === "b") {
    player.grounded = true;
    player.jumping = false;
    guy.count++;
  } else if (dir === "t") {
    player.velY *= -1;
    guy.count++;
  }
  if (guy.count>0){

    	guy.y-=guy_floating_speed;
    
    if (guy.direction === "l" && guy.x<player.x-150) {
      guy.x = player.x - 150;
    } else if (guy.direction === "r" && guy.x>player.x+150) {
      guy.x = player.x + 150;
    }
  } 
if (player.jumping === true && guy.count>0){
    	guy.y+=.7;
    }

  //push clouds
  if(frame_count % 200 === 0 && keys[39]){
    clouds.push({
    x: width+100,
    y: Math.random() * (height - -20) + -20,
    size: Math.random()*(70-30)+30,
    //bump1_size: Math.random()*(70-30)+30,
    //bump1_x:   
  });
  }
  
  //splice clouds outside frame
    if (clouds.length>0 && clouds[0].x < -300){
      clouds.splice(0,1);
    }
    if (clouds.length>0 && clouds[clouds.length-1].x > width+500){
      clouds.splice(clouds[clouds.length-1],1);
    }
  
  //splice boxes outside frame
    if (boxes.length>7 && boxes[7].x < -300){
      boxes.splice(7,1);
    }
    if (boxes.length>7 && boxes[boxes.length-1].x > width+200){
      boxes.splice(boxes.length-1,1);
    }
  
  
  if (player.grounded) {
    player.velY = 0;
  }

  player.x += player.velX;
  player.y += player.velY;

  requestAnimationFrame(update); 

  for (var i = 0; i < clouds.length; i++) {
    clouds[i].x -=.03; //clouds slowly move left
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.beginPath();
    ctx.arc(clouds[i].x+40,clouds[i].y-30,clouds[i].size,0,2*Math.PI);//top bump
    ctx.fill();
    ctx.beginPath();
    ctx.arc(clouds[i].x+80,clouds[i].y,clouds[i].size,0,2*Math.PI);//right bump 
    ctx.fill();
    ctx.beginPath();
    ctx.arc(clouds[i].x,clouds[i].y,clouds[i].size,0,2*Math.PI);//left bump (main)
    ctx.fill();
  } 

  
  // draw leaves on tree
  for (var i = 0; i < leaves.length; i++) {
    ctx.fillStyle = "rgba(0,100,50,.5)";
    ctx.beginPath();
    ctx.arc(leaves[i].x,leaves[i].y,leaves[i].size,0,2*Math.PI);
    ctx.fill();
    //ctx.fillRect(leaves[i].x, leaves[i].y, leaves[i].size, leaves[i].size);
  }





// player running movement
if (right_arrow_count>0 && right_arrow_count % 8 === 0){
	running_timer_right++;
  right_arrow_count++;
}
if (left_arrow_count>0 && left_arrow_count % 8 === 0){
	running_timer_left++;
  left_arrow_count++;
}
if (guy.direction === "l"){
	if(player.jumping===true){
	popo_pic_offset = player.width*5; //jumping player pic
} else if (running_timer_right % 2 === 0){
		popo_pic_offset = player.width*3;
  } else {
    popo_pic_offset = player.width*4;
  }
} else if (guy.direction === "r"){
if(player.jumping===true){
	popo_pic_offset = player.width*2; //jumping player pic
} else if (running_timer_left % 2 === 0){
		popo_pic_offset = player.width;
  } else {
    popo_pic_offset=0;
  }
}




// head running movement
if (right_arrow_count>0 && right_arrow_count % 12 === 0){
	head_running_timer_right++;
  right_arrow_count++;
}
if (left_arrow_count>0 && left_arrow_count % 12 === 0){
	head_running_timer_left++;
  left_arrow_count++;
}
if (guy.direction === "l"){
	if(player.jumping===true){
  head_pic_offset=guy.width*5;
} else if (head_running_timer_right % 2 === 0){
    head_pic_offset=guy.width*3;
  } else {
    head_pic_offset=guy.width*4;
  }
} else if (guy.direction === "r"){
if(player.jumping===true){
  head_pic_offset= guy.width*2;
} else if (head_running_timer_left % 2 === 0){
    head_pic_offset = guy.width;
  } else {
    head_pic_offset=0;
  }
}



if (guy.count < 1){
	head_pic_offset = 0;
}

  
var image = document.getElementById("head_pic")
  ctx.drawImage(image, head_pic_offset, 0, 45, 150, guy.x, guy.y-5, 40, 150); 



//draw popo
var image = document.getElementById("popo_pic")
  ctx.drawImage(image, popo_pic_offset, 0, player.width, player.height, player.x, player.y, player.width, player.height);
  

 
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  

  
  
  
  // begin loop over boxes for grass and water
  for (var i = 0; i < boxes.length; i++) { 
    ctx.fillStyle = "brown";
    ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
    var grd=ctx.createLinearGradient(boxes[i].x,boxes[i].x,260,260);
    grd.addColorStop(0,"#29a329");
    grd.addColorStop(1,"#99ff33");
    ctx.fillStyle=grd; //green gradient inside boxes
    ctx.fillRect(boxes[i].x + 2, boxes[i].y + 2, boxes[i].width - 7, boxes[i].height - 7);
    
    if (boxes[i].water===true && i === boxes.length-1){ //begin water pics
      var image = document.getElementById("end_water_pic"); //overflowing water pic
      ctx.drawImage(image, 0, 0, image.width, image.height, boxes[i].x, boxes[i].y-25, image.width, image.height);
      
      ctx.beginPath(); //begin drip
      drip.x=boxes[i].x+44;
      drip.y=boxes[i].y+70+drip.offset;
      ctx.arc(drip.x, drip.y, drip.width, 0, 2*Math.PI);
      ctx.strokeStyle="lightblue";
      ctx.lineWidth=3;
      ctx.stroke();
      ctx.fillStyle=drip.color;
      ctx.fill();
      
    } else if (i>5 && ((boxes[i].y > boxes[i-1].y)||(boxes[i-1].water===true && boxes[i].y>=boxes[i-1].y))){
      boxes[i].water = true;
      if (boxes[i].y > boxes[i-1].y && boxes[i-1].water === true){
        var image = document.getElementById("sloping_water_pic"); //sloping water pic
        ctx.drawImage(image, 0, 0, 45, 150, boxes[i].x, boxes[i].y-50, 40, 150);
      } else {
          var image = document.getElementById("water_pic"); //regular water pic
          ctx.drawImage(image, 0, 0, 45, 150, boxes[i].x, boxes[i].y-25, 40, 150);
        }
    }
  }
  

  
   // draw drip counter
  ctx.fillStyle="yellow";
  ctx.fillRect(10,280,104,10);
  ctx.fillStyle="blue";
  ctx.fillRect(12,282,drips_collected,6);
  ctx.fillStyle="black";
  ctx.font = "18px Arial";
  ctx.fillText(points,140,290);
  

 
    // draw dandelions and topiary
        for (var i=7; i<boxes.length; i++){
          if (boxes[i].water === false){
            
            if (boxes[i].dandelion>.9){ // jump over dandelions
             if (player.x<boxes[i].x && player.x+player.width>boxes[i].x+boxes[i].width-2 && player.y<boxes[i].y-50){
               if (drips_collected>=5){
                 boxes[i].dandelion++;
               }
           }
         }
         if (boxes[i].dandelion>2 && boxes[i].dandelion<3){
           drips_collected-=5;
           points++;
           boxes[i].dandelion++;
         } else if (boxes[i].dandelion>3){
             if (boxes[i].y<boxes[i-1].y && boxes[i].y<boxes[i+1].y){
               var image = document.getElementById("mailbox_pic"); // draw mailbox
               ctx.drawImage(image, 0, 0, 40, 90, boxes[i].x-8, boxes[i].y-90, 40, 90);
               drips_collected = 100;
             } else {
          var image = document.getElementById("topiary_pic");
           //if (i % 2 === 0){
            ctx.drawImage(image, 0, 0, 26, 70, boxes[i].x, boxes[i].y-70, 26, 70);
           //} else {
             //ctx.drawImage(image, 26, 0, 26, 70, boxes[i].x, boxes[i].y-70, 26, 70);
           //} 
          }     
         } else if (boxes[i].dandelion > .9){
             var image = document.getElementById("dandelion_pic");
             ctx.drawImage(image, 0, 0, 22, 70, boxes[i].x, boxes[i].y-70, boxes[i].width, 70);  
         }
        }
       }

  
  
      // draw grass pics 
  for (var i=5;i<boxes.length;i++){
    
    
    if (boxes[i].water===false && boxes[i].y>boxes[i+1].y && boxes[i+1].y>boxes[i+2].y){
      var image = document.getElementById("upup_pic"); //upup pic
      ctx.drawImage(image, 0, 0, 69, image.height, boxes[i].x, boxes[i].y-image.height, 69, image.height);  
    }
    
    
    
    if (i>7 && boxes[i].water===false && boxes[i].y===boxes[i-3].y&& boxes[i].y===boxes[i-2].y&& boxes[i].y===boxes[i-1].y && boxes[i-4].y!==boxes[i].y&& boxes[i].y<90){
      var image = document.getElementById("foot_pic"); //foot pic
      ctx.drawImage(image, 0, 0, image.width, image.height, boxes[i-3].x, boxes[i-3].y+boxes[i-3].height, image.width, image.height);
      var image = document.getElementById("right_foot_pic"); //right foot pic
      ctx.drawImage(image, 0, 0, image.width, image.height, boxes[i-3].x+boxes[i-3].width-10, boxes[i].y+boxes[i].height, image.width, image.height);
    }
    
    
    
    if (boxes[i].water===false && boxes[i].y<boxes[i+1].y && boxes[i+1].y<boxes[i+2].y){
      var image = document.getElementById("downdown_pic"); //upup pic
      ctx.drawImage(image, 0, 0, 69, image.height, boxes[i].x, boxes[i].y-image.height+49, 69, image.height);
    }
    
    
    if (boxes[i].water === false){
      if (boxes[i-1].water === true){ 
        if (boxes[i+1].water === true){
          var image = document.getElementById("water_grass_middle_pic"); // middle grass
          ctx.drawImage(image, 0, 0, image.width, image.height, boxes[i].x-10, boxes[i].y-21, image.width, image.height);
        } else {
          var image = document.getElementById("water_grass_right_pic"); // right grass
          ctx.drawImage(image, 0, 0, image.width, image.height, boxes[i].x-8, boxes[i].y-image.height, image.width, image.height);
        }  
      } else if (boxes[i+1].water === true) {
          var image = document.getElementById("water_grass_left_pic"); //left grass
          ctx.drawImage(image, 0, 0, image.width, image.height, boxes[i].x, boxes[i].y-21, image.width, image.height); 
      } else if (boxes[i+2].water === true || boxes[i-2].water === true){
          var image = document.getElementById("grass_pic"); //regular grass
          ctx.drawImage(image, 0, 0, image.width, image.height, boxes[i].x+1, boxes[i].y-10, image.width, image.height); 
      }
    }  
  }
 
  
  
  
  
  
//move drip
  drip.offset+=3;
  if (drip.y>400){
    drip.offset=0;
  }
  if (drip.y>player.y+2 && drip.y<player.y+player.height){
    if (drip.x>player.x && drip.x<player.x+player.width){
      if (drips_collected<100){
        drips_collected+=5;
      }
      drip.offset=0;
    }
  }
  



  
  
  
} //end of update function



function colCheck(shapeA, shapeB) {
  

  // get the vectors to check against
  var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
    vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
    // add the half widths and half heights of the objects
    hWidths = (shapeA.width / 2) + (shapeB.width / 2),
    hHeights = (shapeA.height / 2) + (shapeB.height / 2),
    colDir = null;

  // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    // figures out on which side we are colliding (top, bottom, left, or right)
    var oX = hWidths - Math.abs(vX),
      oY = hHeights - Math.abs(vY);
    if (oX >= oY) {
      if (vY > 0) {
        colDir = "t";
        //shapeA.y += oY;
      } else {
        colDir = "b";
        shapeA.y -= oY;
      }
    } else {
      if (vX > 0) {
        colDir = "l";
        //shapeA.x += oX;
      } else {
        colDir = "r";
        //shapeA.x -= oX;
      }
    }
  }
  

  
  
  return colDir;
} // end colcheck function



document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});


window.addEventListener("load", function() {
  update();
});
