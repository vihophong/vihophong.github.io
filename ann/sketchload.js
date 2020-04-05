// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let nn;
const IMAGE_WIDTH = 224;
const IMAGE_HEIGHT = 224;
const IMAGE_CHANNELS = 4;

const N_TRAIN_SAMPLES = 80;


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();		
	}
	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);	
});

function preload() {
  $('.progress-bar').show();
  classifier = ml5.imageClassifier("./model/model.json", modelLoaded);
  $("#selected-image").attr("src", `images-xray/p_80.jpg`);
  $("#test-list").empty();
  $("#test-list").attr("color", "red");
  $("#test-list").append("Tested positive for Covid-19");  
  $('.progress-bar').hide();
}


$("#random-image-button").click(async function () {
    let irnd1 = getRandomInt(2)
    let irnd2 = getRandomInt(20)+80
    if (irnd1==0){
	$("#selected-image").attr("src", `images-xray/p_${irnd2}.jpg`);
	$("#test-list").empty();
	$("#test-list").attr("color", "red");
  	$("#test-list").append("Tested positive for Covid-19");
    }else{
	$("#selected-image").attr("src", `images-xray/n_${irnd2}.jpg`);
	$("#test-list").empty();
	$("#test-list").attr("color", "green");
  	$("#test-list").append("Normal");
    }
});

function setup() {
    
}

function modelLoaded()
{
    console.log("Model Loaded");
}

$("#predict-button").click(async function () {
    await classifier.predict(document.getElementById('selected-image'), gotResults);
});

function gotResults(err, results) {
    console.log(results);
    $("#prediction-list").empty();
    $("#prediction-list").append(`<li>`);
    $("#prediction-list").append(results[0].label);
    $("#prediction-list").append(` confidence = `);
    $("#prediction-list").append(results[0].confidence*100);
    $("#prediction-list").append(` %</li>`);
    $("#prediction-list").append(`<li>`);
    $("#prediction-list").append(results[1].label);
    $("#prediction-list").append(` confidence = `);
    $("#prediction-list").append(results[1].confidence*100);
    $("#prediction-list").append(` %</li>`);
}