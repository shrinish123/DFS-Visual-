

//  global variables

 var grid =[];
var w = 40;
var current;
var width =600;
var rows = width/w;
var cols = width/w;

var stack =[];

 /////////// The Setup function //////////////////


function setup() {
  createCanvas(600,600);
 
   // Creating new cells and pushing them in the grid

   for(var i=0;i<rows;i++){
     for(var j=0;j<cols;j++){

       var square = new Square(i,j);
       grid.push(square);
     }
   }
   frameRate(10);

   current = grid[0];



}

///////////   The draw function //////////////

function draw() {
  background(51);
  
  for(var i=0;i<grid.length;i++){

      grid[i].show();
      
  }
  current.highlight();
  current.visited = true;
  

  var next = current.checkNeighbors();


   if(next){
     stack.push(current);
     current = next;
   }
   else if(stack.length >0){
     current = stack.pop();
   }

}

/////////////// Square constructor ////////////////////


function index(i,j){

  if(i<0 || j<0 || i > rows-1 || j > cols -1 ){

    return -1;
  }
  return i*cols + j;
}

// function playground () {   

//   console.log(stack);
// }
// playground();

function Square(i,j){

   this.i =i;
   this.j =j;
   this.visited = false;

   this.show = function() {
     
    var x = this.j*w; 
    var y = this.i*w;


    if(this.visited){

      noStroke();
      fill(255,204,0);
      rect(x,y,w,w);
    }
   }

   this.highlight =function() {

    var x = this.j*w; 
    var y = this.i*w;

     noStroke();
     fill('green');
     rect(x,y,w,w);
   }

   this.checkNeighbors = function(){

       var neighbors =[];

       var top = grid[index(i-1,j)];
       var right = grid[index(i,j+1)];
       var bottom= grid[index(i+1,j)];
       var left = grid[index(i,j-1)];

       if(top && !top.visited){
         neighbors.push(top);
       }
       if(right && !right.visited){
        neighbors.push(right);
      }
      if(bottom && !bottom.visited){
        neighbors.push(bottom);
      }
      if(left && !left.visited){
        neighbors.push(left);
      }

      // console.log(neighbors);

      if(neighbors.length >0 )
      {
        var r = Math.floor(Math.random()*neighbors.length);
        return neighbors[r];
      }
      else{
        return undefined;
      }

   }
}

