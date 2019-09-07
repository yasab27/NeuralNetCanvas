///////////////////// SET UP CANVAS VARIABLES ///////////////

// Get the canvas variable from the DOM
var canvas = document.querySelector("canvas");

// Modify the width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Now we are going to create content variables
// C allows up to manipulate elements in 2D.
var c = canvas.getContext("2d");

////////////// DEFINE CLASSES /////////////////////////////

function Circle(x,y,dx,dy,radius, borderColor, fillColor){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.borderColor = borderColor;
    this.fillColor = fillColor;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.borderColor
        c.lineWidth = 13;
        c.stroke();
        c.fillStyle = this.fillColor
        c.fill();
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

// This class models a "signal" which will be animated moving in between neurons
function Signal(startX, startY, endX, endY){
    
    // Construct the singal object from parameters
    this.startX = startX
    this.startY = startY
    this.endX = endX
    this.endY = endY

    // Current x
    this.currentX = startX
    this.currentY = startY

    // Draw the signal node
    this.draw = function () {
        c.beginPath();
        c.arc(this.currentX, this.currentY, 10, 0, Math.PI * 2, false);
        c.strokeStyle = "white"
        c.lineWidth = 4;
        c.stroke();
        c.fillStyle = "orange"
        c.fill();
    }

    // Move the signal along the desired path until it reaches the end
    this.update = function(){
        var slope = (this.endY - this.startY)/(this.endX - this.startX)

        // If we've reached the end, then reset the position to 0

        if(this.currentX >= endX ){
            this.currentX = this.startX
            this.currentY = this.startY
            return false;
        }

        this.currentX += 2
        this.currentY += slope*2

        this.draw()
    }


}

/////////////////////// DEFINING INITIALIZATION PARAMETERS AND FUNCTIONS ////////////////

// Parameters for first layer
firstLayerXPos = innerWidth/5;
yPos = innerHeight/2;
firstVerticalSpacing = 70;


// Parameters for second layer
secondLayerXPos = 2 * innerWidth / 5;
yPos = innerHeight / 2;
secondVerticalSpacing = 80;

var testNode = new Signal(firstLayerXPos, yPos, secondLayerXPos, yPos, 10, 0.1, 0.1);
var testNode2 = new Signal(firstLayerXPos, yPos, secondLayerXPos, yPos-secondVerticalSpacing, 10, 0.1, 0.1);

// Parameters for third layer
thirdLayerXPos = 3 * innerWidth / 5;
yPos = innerHeight / 2;
thirdVerticalSpacing = 80;

// Parameters for the fourth layer
ouputLayerXPos = 4 * innerWidth / 5;
yPos = innerHeight / 2;
outputLayerVerticalSpacing = 40;

var layerOnePaths = [];
var layerTwoPaths = [];
var layerThreePaths = [];

var allPaths = [layerOnePaths, layerTwoPaths, layerThreePaths]
/// INTIALIZE ALL PATHS:
// Traverse each of the three input Nodes 
for (var i = -1; i < 2; i++) {
    var startXPosition = firstLayerXPos;
    var startYPosition = yPos + (i) * firstVerticalSpacing
    for (var j = -2; j < 3; j++) {
        var endXPosition = secondLayerXPos;
        var endYPosition = yPos + (j) * secondVerticalSpacing;

        var path = {
            startXPosition: startXPosition,
            startYPosition: startYPosition,
            endXPosition: endXPosition,
            endYPosition: endYPosition
        }

        layerOnePaths.push(path)
    }
}

/// DRAW THE ARROWS BETWEEN THE SECOND AND THIRD LAYERS:

// Traverse each of the three input Nodes 
for (var i = -2; i < 3; i++) {
    var startXPosition = secondLayerXPos;
    var startYPosition = yPos + (i) * secondVerticalSpacing
    for (var j = -2; j < 3; j++) {
        var endXPosition = thirdLayerXPos;
        var endYPosition = yPos + (j) * thirdVerticalSpacing;

        var path = {
            startXPosition: startXPosition,
            startYPosition: startYPosition,
            endXPosition: endXPosition,
            endYPosition: endYPosition
        }

        layerTwoPaths.push(path)
    }
}

// DRAW ARROWS BETWEEN THIRD AND OUTPUT LAYER:
for (var i = -2; i < 3; i++) {
    var startXPosition = thirdLayerXPos;
    var startYPosition = yPos + (i) * thirdVerticalSpacing
    for (var j = -1; j < 2; j += 2) {
        var endXPosition = ouputLayerXPos;
        var endYPosition = yPos + (j) * outputLayerVerticalSpacing;

        var path = {
            startXPosition: startXPosition,
            startYPosition: startYPosition,
            endXPosition: endXPosition,
            endYPosition: endYPosition
        }

        layerThreePaths.push(path)
    }
}



/// DRAW THE ARROWS BETWEEN THE FIRST TWO LAYERS:
function drawNetworkLines(){
    c.lineWidth = 2;
    // Traverse each of the three input Nodes 
   for(var i = 0; i < layerOnePaths.length; i++){
       var path = layerOnePaths[i]
       startXPosition = path.startXPosition
       startYPosition = path.startYPosition
       endXPosition = path.endXPosition
       endYPosition = path.endYPosition
       c.beginPath();
       c.moveTo(startXPosition, startYPosition);
       c.lineTo(endXPosition, endYPosition);
       c.strokeStyle = "white";
       c.stroke();
   }

    for (var i = 0; i < layerTwoPaths.length; i++) {
        startXPosition = layerTwoPaths[i].startXPosition
        startYPosition = layerTwoPaths[i].startYPosition
        endXPosition = layerTwoPaths[i].endXPosition
        endYPosition = layerTwoPaths[i].endYPosition
        c.beginPath();
        c.moveTo(startXPosition, startYPosition);
        c.lineTo(endXPosition, endYPosition);
        c.strokeStyle = "white";
        c.stroke();
    }

    for (var i = 0; i < layerThreePaths.length; i++) {
        startXPosition = layerThreePaths[i].startXPosition
        startYPosition = layerThreePaths[i].startYPosition
        endXPosition = layerThreePaths[i].endXPosition
        endYPosition = layerThreePaths[i].endYPosition
        c.beginPath();
        c.moveTo(startXPosition, startYPosition);
        c.lineTo(endXPosition, endYPosition);
        c.strokeStyle = "white";
        c.stroke();
    }
}

function drawNeurons(){
    var inputTop = new Circle(firstLayerXPos, yPos - firstVerticalSpacing, 0, 0, 25, "white", "red");
    var inputMiddle = new Circle(firstLayerXPos, yPos, 0, 0, 25, "white", "red");
    var inputBottom = new Circle(firstLayerXPos, yPos + firstVerticalSpacing, 0, 0, 25, "white", "red");
    inputTop.draw();
    inputMiddle.draw();
    inputBottom.draw();

    var l2Top = new Circle(secondLayerXPos, yPos - 2 * secondVerticalSpacing, 0, 0, 25, "white", "#B58900");
    var l2North = new Circle(secondLayerXPos, yPos - secondVerticalSpacing, 0, 0, 25, "white", "#B58900");
    var l2Middle = new Circle(secondLayerXPos, yPos, 0, 0, 25, "white", "#B58900");
    var l2South = new Circle(secondLayerXPos, yPos + secondVerticalSpacing, 0, 0, 25, "white", "#B58900");
    var l2Bottom = new Circle(secondLayerXPos, yPos + 2 * secondVerticalSpacing, 0, 0, 25, "white", "#B58900");
    l2Top.draw();
    l2North.draw();
    l2Middle.draw();
    l2South.draw();
    l2Bottom.draw();


    var l3Top = new Circle(thirdLayerXPos, yPos - 2 * thirdVerticalSpacing, 0, 0, 25, "white", "#B58900");
    var l3North = new Circle(thirdLayerXPos, yPos - thirdVerticalSpacing, 0, 0, 25, "white", "#B58900");
    var l3Middle = new Circle(thirdLayerXPos, yPos, 0, 0, 25, "white", "#B58900");
    var l3South = new Circle(thirdLayerXPos, yPos + thirdVerticalSpacing, 0, 0, 25, "white", "#B58900");
    var l3Bottom = new Circle(thirdLayerXPos, yPos + 2 * thirdVerticalSpacing, 0, 0, 25, "white", "#B58900");
    l3Top.draw();
    l3North.draw();
    l3Middle.draw();
    l3South.draw();
    l3Bottom.draw();

    var outputTop = new Circle(ouputLayerXPos, yPos - outputLayerVerticalSpacing, 0, 0, 25, "white", "#3FAAA2");
    var outputBottom = new Circle(ouputLayerXPos, yPos + outputLayerVerticalSpacing, 0, 0, 25, "white", "#3FAAA2");
    outputTop.draw();
    outputBottom.draw();

}

drawNetworkLines();
drawNeurons();

// Generate all potential signals
var allSignals = [[],[],[]]
for(var i = 0; i < allPaths.length; i++){
    for(var j = 0; j < allPaths[i].length; j++){
        var path = allPaths[i][j];
        var currentSignal = new Signal(path.startXPosition, path.startYPosition, path.endXPosition, path.endYPosition)
        allSignals[i].push(currentSignal)
    }
}

var i = 0;
var frameCounter = 0;
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    //Draw a circle and update it.
    drawNetworkLines()
    for(var j = 0; j < allSignals[i].length; j++){
        allSignals[i][j].update()
    }
    drawNeurons();

    frameCounter++;
    if(frameCounter >= (innerWidth/5)/(2)){
        i++;
        frameCounter = 0;
    }

    if(i >= 3){
        i = 0;
    }
}

animate();