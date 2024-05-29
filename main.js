objects = [];
status1 = "";

function preload() {
    song = loadSound("Alarm.mp3");
}

function setup() {
    canvas = createCanvas(320, 250);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    console.log("VIDEO LOADED");
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_of_baby").innerHTML = "Status : DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = true;
    console.log(status1);
    objectdetector.detect(video, gotresult);
    console.log("Objectdetector pass");
}


function draw() {
    image(video, 0, 0, 320, 250);
    if (status1 != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status_of_baby").innerHTML = "STATUS : OBJECT DETECTED";

            if (objects[i].label != "person") {
                document.getElementById("status_of_baby_text").innerHTML = "BABY NOT FOUND";
                song.rate(2);
                song.play();

            }

            if (objects[i].label == "") {
                document.getElementById("status_of_baby_text").innerHTML = "BABY NOT FOUND";
                song.rate(2);
                song.play();
            }


            if (objects[i].label == "person") {
                song.pause();
                document.getElementById("status_of_baby_text").innerHTML = "BABY FOUND";

            }

            fill("#000000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function gotresult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}