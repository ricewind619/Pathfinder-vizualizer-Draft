


function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}
//***SLIDER */
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// function slider(){
//   var slider = document.getElementById("myRange");
//   var cols = slider.value;
//   console.log("Cols and Rows", slider.value);
//   var rows = slider.value;

// }

// slider.oninput = function() {
// var cols = this.value;
// var rows = this.value;
  
// }
 
function heuristic(a,b){
  var d = //abs(a.i - b.i) + abs(a.j - b.j); 
  dist(a.i,b.i,a.j,b.j);
  return d;
}

function setWalls(){
  if(set_walls===0){
    set_walls=1;
  }

  document.getElementById("setWalls").disabled = true;
  document.getElementById("Instruction").innerHTML = "Create walls by clicking on boxes. Walls cannot be start or end. Click Vizualize to begin."

  // else{
  //   started = false;
  // }
  console.log("START OR STOP?",started);
}

function Reset(){
  window.location.reload("Refresh");

}

function begin() {
  if(started===false){
    started=true;
    console.log("Algo has begun", started);
    document.getElementById("Instruction").innerHTML = "PATHFINDING....";
    document.getElementById("warning").innerHTML = "";
    document.body.style.background = "rgb(90, 145, 22);";
  
  document.getElementById("vizualize").disabled = true;

  }
}

function setStart(){
  if(set_start===0){
    set_start=1;
  }
  slider.disabled = true;
  slider.style.display ="none";
  document.getElementById("label").style.display = "none";
  document.getElementById("Instruction").innerHTML = "Position start by clicking on a box";
  
  document.getElementById("setStart").disabled = true;
  document.body.style.background = "rgb(90, 145, 22)";
  console.log("Value of set_start", set_start);
}

function setEnd(){
  if(set_end===0){
    set_end=1;
  }
  document.getElementById("setEnd").disabled = true;
  document.getElementById("Instruction").innerHTML = "Position End by clicking on a box.<br>End cannot be same as start";
  document.body.style.background = "rgb(90, 145, 22)";
  console.log("Value of set_end", set_end);


}
var start_x,start_y,end_x,end_y, wall_x,wall_y ;
var start_x_distance,start_y_distance,end_x_distance,end_y_distance;
var set_walls = 0;
var started = false;
var ended = false;
var set_start = 0;
var set_end = 0;
var r = document.querySelector(':root');
var rs = getComputedStyle(r);
var canvasX= rs.getPropertyValue('--canvas_x');
var canvasY= rs.getPropertyValue('--canvas_y');

//****SLIDER **/
var slider =document.getElementById("myRange");
// var output =document.getElementById("test");
var rows = slider.value;
var cols = slider.value;
slider.onchange = function (){
  // output.innerHTML = slider.value;
  rows = slider.value;
  cols = slider.value;
  w = canvasX / cols;
  h = canvasY / rows;
  setup();
}
console.log("Slider", slider.value);

//**Trail stuff **////

console.log("Canvas X and CanvasY", canvasX,canvasY);
w = canvasX / cols;
h = canvasY / rows;

  // for (var i =0; i < cols; i ++)
  // {
  //   grid[i] = new Array(rows); 
  // }
  
  // //console.log(grid);

  // for (var i =0; i < cols; i ++)
  // {
  //   for (var j = 0; j < rows; j ++)
  //   {
  //     grid[i][j] =  new Spot(i,j);
  //   }
  // }

  // for (var i =0; i < cols; i ++)
  // {
  //   for (var j = 0; j < rows; j ++)
  //   {
  //     grid[i][j].addNeighbours(grid);
  //   }
  // }





// var rows = 10;
// grid [cols][rows] format 
var grid = new Array(cols);
var openSet = [];
var closeSet = [];
var start;
var end;
var w;
var h;
var path =[];


function Spot(i,j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.isStart = false;
  this.isEnd = false;
  this.neighbours = [];
  this.previous = undefined;
  this.wall = false;
//**********BEFORE UPDATES ANY *****/

// this.dragged = function (){

//   var x_distance = (mouseX - this.i*w);
//   var y_distance = (mouseY - this.j*h);
//   var start_x_distance =(mouseX - start_x);
//   var start_y_distance =(mouseY - start_y);
//   var end_x_distance =(mouseX - end_x);
//   var end_y_distance =(mouseY - end_y);

//   if(set_walls===1){

//       if(slider.value>5){

//           //**WALL CONSTRUCTOR***/// */ 30% chance of obstacle
//           // if((mouseX>0 && mouseX<=canvasX )&& (mouseY>0 && mouseY<=canvasY))
//           // {


//           if (random(1)< 0.25){
//             this.wall = true;
//           }
//         // } REMOVE THIS FOR THE MOUSEX&Y LIMITS
//       }

//     // document.getElementById("setWalls").disabled = true;
//     // document.getElementById("Instruction").innerHTML = "Set walls by clicking on boxes. Walls cannot be start or end. <br> Click Vizualize to begin."
//     if(slider.value<=5){
//       if(x_distance<=(w - 1) && mouseX >= (this.i*w) && 
//       y_distance<=(h - 1) && mouseY >=(this.j*h)) {
//         wall_x=this.i;
//         wall_y=this.j;
//         console.log("Wall's x and y", wall_x, wall_y);
//         if((wall_x===start_x && wall_y===start_y) ||(wall_x===end_x && wall_y===end_y))
//         {
//           document.getElementById("Instruction").style.fontSize="large";
//           document.getElementById("Instruction").innerHTML="WALLS CANNOT BE START OR END.<br>CLICK ON ANOTHER BOX OR SET VIZUALIZE";
//           document.body.style.background= "rgb(135,206,235)";       
//         }
//         else{       
        
//           if(this.wall===false){
//             this.wall = true;
//           }
//           document.getElementById("Instruction").innerHTML = "Keep selecting walls or set vizualize";
//           document.body.style.background = "rgb(135,206,235)";
//        }
//       }
//     }//most recent
//   }


// }

this.clicked = function() {
  
  var x_distance = (mouseX - this.i*w);
  var y_distance = (mouseY - this.j*h);
  var start_x_distance =(mouseX - start_x);
  var start_y_distance =(mouseY - start_y);
  var end_x_distance =(mouseX - end_x);
  var end_y_distance =(mouseY - end_y);
  var x1=mouseX;
  var y1=mouseY;


  //var click_distance = dist(mouseX, mouseY, this.x, this.y);

  if(set_start === 1){
        if(x_distance<=(w - 1) && mouseX >= (this.i*w) && 
      y_distance<=(h - 1) && mouseY >=(this.j*h)) {
        this.isStart=true;
        start_x=this.i;
        start_y=this.j;
        console.log("Start's x and y", start_x,start_y);
        set_start = 2;
        console.log("Value of set_start", set_start);
        start=grid[start_x][start_y];
        document.getElementById("setEnd").disabled = false;
        document.getElementById("Instruction").innerHTML = "Click Set End button";
        document.body.style.background = "rgb(90, 145, 22)";

      }
        
  }

  if(set_end === 1){
    
    



    if(x_distance<=(w - 1) && mouseX >= (this.i*w) && 
  y_distance<=(h - 1) && mouseY >=(this.j*h)) {
     
    /***INSERT EXCEPTION HERE */   
        
        end_x=this.i;
        end_y=this.j;
        console.log("End's x and y", end_x, end_y);
          if(end_x===start_x && end_y===start_y){
            document.getElementById("warning").innerHTML="";
            document.getElementById("Instruction").innerHTML = "END CANNOT BE START.CLICK ON ANOTHER BOX.";
            document.body.style.background= "rgb(90, 145, 22)";
          }
          else{
            this.isEnd=true;
            end_x=this.i;
            end_y=this.j;
            end=grid[end_x][end_y];
            console.log("End's x and y", end_x,end_y);
            end=grid[end_x][end_y];
            set_end = 2;
            console.log("Value of set_end", set_end);
            document.getElementById("setWalls").disabled = false;
            document.getElementById("vizualize").disabled = false;
            document.getElementById("Instruction").innerHTML = "Click on Set Walls button";
            // document.getElementById("warning").innerHTML = "";
            document.body.style.background = "rgb(90, 145, 22)";
          }
      }/**INSERT } AFTER THIS */
    
  }

  

  if(set_walls===1){



    //**WALL CONSTRUCTOR***/// */ 30% chance of obstacle
        if(slider.value>5){

         

            if((x1>0) && (x1<canvasX) && (y1>0) && (y1<canvasY) ){
              console.log("MouseX",mouseX);
              console.log("MouseY",mouseY);


              if (random(1)< 0.05){
                  this.wall = true;
                  start.wall=false;
                  end.wall=false;

              }
            }
        }  
    

    // document.getElementById("setWalls").disabled = true;
    // document.getElementById("Instruction").innerHTML = "Set walls by clicking on boxes. Walls cannot be start or end. <br> Click Vizualize to begin."
      if(slider.value<=5){
      
      if(x_distance<=(w - 1) && mouseX >= (this.i*w) && 
      y_distance<=(h - 1) && mouseY >=(this.j*h)) {

        


        wall_x=this.i;
        wall_y=this.j;
        console.log("Wall's x and y", wall_x, wall_y);
        if((wall_x===start_x && wall_y===start_y) ||(wall_x===end_x && wall_y===end_y))
        {
          document.getElementById("Instruction").style.fontSize="large";
          document.getElementById("Instruction").innerHTML="WALLS CANNOT BE START OR END.<br>CLICK ON ANOTHER BOX OR SET VIZUALIZE";
          document.body.style.background= "rgb(90, 145, 22)";       
        }
        else{       

          // if (random(1)< 0.1){
          //   this.wall = true;
          // }
        
          
          if(this.wall===false){
            
            this.wall = true;
          }
          document.getElementById("Instruction").innerHTML = "Keep selecting walls or set vizualize";
          document.body.style.background = "rgb(90, 145, 22)";
       }
      }
    }//most recently placed
  }

};



//**WALL CONSTRUCTOR***/// */ 30% chance of obstacle
  // if (random(1)< 0.25){
  //   this.wall = true
  // }
  this.show = function (col) {
     
    fill(col);
    if (this.wall){
      fill(0,255,255);
    }
    if(this.isStart){
      fill(255,192,203);
    }
    if(this.isEnd){
      fill(139,169,13);
    }
    noStroke();
    rect(this.i*w , this.j*h , w-1, h-1);
  };

  this.addNeighbours = function(grid) {

    var i = this.i;
    var j =this.j;
    if (i < cols - 1 ){
    this.neighbours.push(grid[i+1][j]);
    }
    if (i > 0 ){
    this.neighbours.push(grid[i-1][j]);
    }
    if (j < rows - 1 ){
    this.neighbours.push(grid[i][j+1]);
    }
    if (j > 0 ){
    this.neighbours.push(grid[i][j-1]);
    }
  };
}


function setup() {
  
  // var r = document.querySelector(':root');
  // var rs = getComputedStyle(r);
  // var canvasX= rs.getPropertyValue('--canvas_x');
  // var canvasY= rs.getPropertyValue('--canvas_y');
  // console.log("Canvas X and CanvasY", canvasX,canvasY);
  
  var cnv = createCanvas(canvasX, canvasY);
  cnv.parent("container");
  console.log("A* algorithm");
  //button_1=document.getElementById("start");
  // rows=slider.value;
  // cols=slider.value;
  // w = canvasX / cols;
  // h = canvasY / rows;
//create();
  // Making a 2D array
  for (var i =0; i < cols; i ++)
  {
    grid[i] = new Array(rows); 
  }
  
  //console.log(grid);

  for (var i =0; i < cols; i ++)
  {
    for (var j = 0; j < rows; j ++)
    {
      grid[i][j] =  new Spot(i,j);
    }
  }

  for (var i =0; i < cols; i ++)
  {
    for (var j = 0; j < rows; j ++)
    {
      grid[i][j].addNeighbours(grid);
    }
  }


}

function draw() {

  
  // var r = document.querySelector(':root');
  // var rs = getComputedStyle(r);
  // var canvasX= rs.getPropertyValue('--canvas_x');
  // var canvasY= rs.getPropertyValue('--canvas_y');
  // console.log("Canvas X and CanvasY", canvasX,canvasY);

  // var slider =document.getElementById("myRange");
  // var output =document.getElementById("test");
  // output.innerHTML = slider.value;
  // var cols = slider.value; 
  // var rows = slider.value;  
  // w = canvasX / cols;
  // h = canvasY / rows;
  //   slider.oninput = function () {
  //   output.innerHTML = slider.value;
  //   var cols = slider.value; 
  //   var rows = slider.value;
  //   w = canvasX / cols;
  //   h = canvasY / rows;
  //   redraw();
  // }

//  // Making a 2D array
//   for (var i =0; i < cols; i ++)
//   {
//     grid[i] = new Array(rows); 
//   }
  
//   //console.log(grid);

//   for (var i =0; i < cols; i ++)
//   {
//     for (var j = 0; j < rows; j ++)
//     {
//       grid[i][j] =  new Spot(i,j);
//     }
//   }

//   for (var i =0; i < cols; i ++)
//   {
//     for (var j = 0; j < rows; j ++)
//     {
//       grid[i][j].addNeighbours(grid);
//     }
//   }


  if(set_start===2){
    start = grid[start_x][start_y];
    end = grid[cols - 1][rows - 1];
    start.wall=false;
    end.wall=false; 
  //Starting the process
    openSet.push(start);
    set_start=3;
    console.log("Set start is now", set_start);
  }

  if(set_end===2){
    //start = grid[start_x][start_y];
    end = grid[end_x][end_y];
    start.wall=false;
    end.wall=false; 
  //Starting the process
    //openSet.push(start);
    set_end=3;
    console.log("Set_end is now", set_end);
  }

      background(255);

      if (ended === false)  {
        
        for (var i =0; i < cols; i ++)
        {
          for (var j = 0; j < rows; j ++)
          {
          
            grid[i][j].show(color(220,220,220));

          }
        }  
      }//THIS IS GRID CONSTRUCT
      
      if(started){

          if (openSet.length > 0){
            console.log("open set", openSet);
            //we can keep going

            var winner = 0;
            for(var i=0; i < openSet.length; i++){
              if (openSet[i].f < openSet[winner].f){
                winner=i;

              }
            }

              var current = openSet[winner];

              if (current === end){
                //add path
                noLoop();
                document.getElementById("Instruction").innerHTML = "PATH HAS BEEN FOUND!!";
                document.body.style.background= "rgb(90, 145, 22)";
                
                console.log("DONE!");
              }

                  
              removeFromArray(openSet, current);
              closeSet.push(current);
              
              var neighbours = current.neighbours;
              for ( var i = 0; i < neighbours.length; i++)
              {
                  var neighbour = neighbours[i];

                  if(!closeSet.includes(neighbour) && !neighbour.wall){
                    var tempG = current.g + heuristic(neighbour,current);

                    var newPath = false;
                    if(openSet.includes(neighbour)){
                      if (tempG < neighbour.g){
                        neighbour.g = tempG;
                        newPath=true;
                      }
                    }else{
                      neighbour.g= tempG;
                      newPath=true;
                      openSet.push(neighbour);
                    }

                    if(newPath){

                    neighbour.h = heuristic(neighbour, end); 
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                    }
                  }
              }


          }//**If OPEN SET's } */

          else {  
            console.log("no solution");
            document.getElementById("Instruction").innerHTML = "NO PATH FOUND...";
            document.getElementById("Instruction").style.color= "white";
            document.body.style.background= "rgb(90, 145, 22)";
            
            
            ended = true;
            noLoop();
            //return;  // no solution  
            //         
          }//**ELSE's }} */
          //Draw current state of everything


          for (var i =0; i < openSet.length; i ++){
            
            //     //open set is Green
                openSet[i].show(color(255,255,0));
            
              }//THIS IS OPENSET

          for (var i =0; i < closeSet.length; i ++){
            
            //closed set is RED
            closeSet[i].show(color(255,0,0));

          }//THIS IS CLOSED SET

          
        
        if(ended===false){  //draw the PATH
          path =[];
          var temp = current;
          path.push(temp);
            while (temp.previous){
              path.push(temp.previous);
              temp=temp.previous;
            }
        }

          for (var i=0; i< path.length; i++){
            path[i].show(color(0,0,255));
            //Path is BLUE
          }//THIS IS PATH
      }//THIS IS STARTED'S



}//***This is Draw's } */

//****BEFORE UPDATE***** */
function mousePressed() {

  for (var i =0; i < cols; i ++)
  {
    for (var j = 0; j < rows; j ++)
    {
    
      grid[i][j].clicked();

    }
    
  }

}

// function mouseDragged() {

//   for (var i =0; i < cols; i ++)
//   {
//     for (var j = 0; j < rows; j ++)
//     {
    
//       grid[i][j].dragged();

//     }
    
//   }

// }
