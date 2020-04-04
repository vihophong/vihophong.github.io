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
  images = [];
  for (let i = 1; i < N_TRAIN_SAMPLES; i++) {
    let p = loadImage(`images-xray/p_${i}.jpg`)
    let n = loadImage(`images-xray/n_${i}.jpg`)
    images.push({
      image: p,
      label: 'positive'
    })
    images.push({
      image: n,
      label: 'negative'
    })
  }
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
  const options = {
    task: 'imageClassification',
    debug: false,
    inputs:[IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
  }

  // construct the neural network
  nn = ml5.neuralNetwork(options);

  // add data
  for(let i = 0; i < images.length; i++){
    const item = images[i];
    // get back the image array
    item.image.loadPixels()
    const imageArray = Array.from(item.image.pixels);
    const labels = item.label;
    nn.addData({pixelArray:imageArray}, {label: labels});
  }

  // normalize the data
  nn.normalizeData();
  $('.progress-bar').hide();
}

$("#predict-button").click(async function () {
  // train
  const TRAINING_OPTIONS = {
    batchSize: 24,
    epochs: 32,
  }
  await nn.train(TRAINING_OPTIONS, whileTraining, finishedTraining);
});

function whileTraining(epoch, loss) {
  console.log(`epoch: ${epoch}, loss:${loss}`);
}

function finishedTraining() {
  console.log("finished training");
  testA.loadPixels();
  const test = Array.from(testA.pixels);
  nn.classify([test], gotResults)
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return
  }
  $("#prediction-list").empty();
  $("#prediction-list").append(`<li>`);
  $("#prediction-list").append(result[0].label);
  $("#prediction-list").append(` confidence = `);
  $("#prediction-list").append(result[0].confidence);
  $("#prediction-list").append(`</li>`);
  $("#prediction-list").append(`<li>`);
  $("#prediction-list").append(result[1].label);
  $("#prediction-list").append(` confidence = `);
  $("#prediction-list").append(result[1].confidence);
  $("#prediction-list").append(`</li>`);
  console.log(result);
}
