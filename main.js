var ModelCocossd = "";
var objectsList = [];
var detectionStatus = false;

function setup() {
    ModelCocossd = ml5.objectDetector('cocossd', ModelCocossdLoaded);

    canvas = createCanvas(1125, 625);

    video.hide();
}

function ModelCocossdLoaded() {
    console.log("El modelo Cocossd fue exitoso en cargar...");
    detectionStatus = true;
}

function preload() {
    video = createVideo("video.mp4");
}

function draw() {
    image(video, 0, 0, 1125, 625);
    video.size(1125, 625);

    if (detectionStatus) {
        ModelCocossd.detect(canvas, getResults);

        for (var i = 0; i < objectsList.length; i++) {
            var label = objectsList[i].label;
            
            var probability = objectsList[i].confidence;
            probability = Math.round(probability * 100);
    
            var x = objectsList[i].x;
            var y = objectsList[i].y;
    
            var objectWidth = objectsList[i].width;
            var objectHeight = objectsList[i].height;
    
            
            fill("dodgerblue");
            rect(x, y, textWidth(label), 30);
            
            fill("white");
            textSize(20);
            text(label + " " + probability + "%", x, y + 20);
    
            noFill();
            stroke("dodgerblue");
            strokeWeight(3);
            rect(x, y, objectWidth, objectHeight);
    }
    document.getElementById("objectList-objectDetected").innerText = objectsList.length + " Detected Objects, Objects Detected 👍"
    }
    
}

function getResults(error, results) {
    if (!error) {
        console.log(results);
        objectsList = results;
    }
}

function buttonStart() {
    video.loop();
    video.speed(1);
    video.volume(0);
}