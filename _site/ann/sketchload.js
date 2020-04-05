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

let images;
let testA;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function preload() {
  testA = loadImage(`images-xray/p_80.jpg`)
  $("#selected-image").attr("src", `images-xray/p_80.jpg`);
  $("#test-list").empty();
  $("#test-list").attr("color", "red");
  $("#test-list").append("Tested positive for Covid-19");  
}

$("#random-image-button").click(async function () {
    let irnd1 = getRandomInt(2)
    let irnd2 = getRandomInt(20)+80
    if (irnd1==0){
	testA = loadImage(`images-xray/p_${irnd2}.jpg`)
	$("#selected-image").attr("src", `images-xray/p_${irnd2}.jpg`);
	$("#test-list").empty();
	$("#test-list").attr("color", "red");
  	$("#test-list").append("Tested positive for Covid-19");
    }else{
	testA = loadImage(`images-xray/n_${irnd2}.jpg`)
	$("#selected-image").attr("src", `images-xray/n_${irnd2}.jpg`);
	$("#test-list").empty();
	$("#test-list").attr("color", "green");
  	$("#test-list").append("Normal");
    }
});

$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		testA = loadImage(dataURL)
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();		
	}
	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);	
});

function setup() {
  $('.progress-bar').show();
  const classifier = ml5.imageClassifier("./model3/model.json", modelLoaded);
  classifier.predict(document.getElementById('selected-image'), function(err, results) {
    console.log(results);
  });
  $('.progress-bar').hide();
}

function modelLoaded()
{
    console.log("Model Loaded");
}

$("#predict-button").click(async function () {
  
});