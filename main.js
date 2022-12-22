song = "";
played_song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
HarryPotter = "";
PeterPan = "";

function preload() {
    HarryPotter = loadSound("HarryPotter.mp3");
}

function setup() {
    canvas = createCanvas(650, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video, 0, 0, 650, 600);

    fill("black");
    stroke("black");

    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 25);
        if(leftWristY > 0 && leftWristY <= 500)
        {
            HarryPotter.play();
            played_song = "HarryPotter";
        }

    }
    
    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 25);
        if(rightWristY > 100 && rightWristY <= 500)
        {
            PeterPan.play();
            played_song = "PeterPan";
        }
    }
}

function play(){
    HarryPotter.play();
    HarryPotter.setVolume(1);
    HarryPotter.rate(1);
    played_song = "HarryPotter";
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("LeftWrist X = " + leftWristX + "LeftWristY = " + leftWristY +
                    "rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
    }
}

function stop_audio() {
    if(played_song == "HarryPotter"){
         song.stop();
    }
    else if(played_song == "PeterPan"){
        song.stop();
   }
}

