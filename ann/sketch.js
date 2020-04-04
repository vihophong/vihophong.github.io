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
const IMAGE_CHANNELS = 3;

let images;
let testA;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function preload() {
  images = [];
  for (let i = 1; i < 7; i++) {
    let a = loadImage(`images-xray/p_${i}.jpg`)
    let b = loadImage(`images-xray/n_${i}.jpg`)
    images.push({
      image: a,
      label: 'p'
    })
    images.push({
      image: b,
      label: 'n'
    })
  }
  testA = loadImage(`images-xray/test_p_0.jpg`)
}

$("#random-image-button").click(async function () {
    let irnd1 = getRandomInt(2)
    let irnd2 = getRandomInt(20)
    if (irnd1==0){
	testA = loadImage(`images-xray/test_p_${irnd2}.png`)
	$("#selected-image").attr("src", `images/test_p_${irnd2}.png`);
    }else{
	testA = loadImage(`images-xray/test_n_${irnd2}.png`)
	$("#selected-image").attr("src", `images/test_n_${irnd2}.png`);
    }
});

function setup() {
  $('.progress-bar').show();
  const options = {
    task: 'imageClassification',
    debug: true,
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

  // train
  const TRAINING_OPTIONS = {
    batchSize: 2,
    epochs: 10,
  }
  nn.train(TRAINING_OPTIONS, finishedTraining)
  $('.progress-bar').hide();
}

function finishedTraining() {
  console.log("finished training");
}

$("#predict-button").click(async function () {
  testA.loadPixels();
  const test = Array.from(testA.pixels);
  nn.classify([test], gotResults)
});

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return
  }
  $("#prediction-list").empty();
  $("#prediction-list").append(`<li>$result</li>`);
  console.log(result);
}
