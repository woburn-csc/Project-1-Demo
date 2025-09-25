// URL to your exported Teachable Machine model folder
const URL = "./my_model/";

let model, webcam, labelContainer, maxPredictions;

const startButton = document.getElementById("start-button")
// Runs async func when button is presed
startButton.addEventListener('click', run_model)
// Initialize the model and webcam

/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression 
containing some mobile devices keywords 
to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details
it returns boolean value*/
let isMobileDevice = regexp.test(details);



const modelBox = document.getElementById("model-box");
async function run_model() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // Load the model and metadata
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();



 
  
  webcam = new tmImage.Webcam(400, 400, !isMobileDevice);


  

  
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // Append webcam canvas to the page
  document.getElementById("webcam-container").appendChild(webcam.canvas);

  // Prepare labels
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    temp = document.createElement("div");
    temp.className = "labels";
    labelContainer.appendChild(temp);
  }
}

// Animation loop
async function loop() {
  webcam.update(); // update webcam frame
  await predict(); // make prediction
  window.requestAnimationFrame(loop);
}

// Make predictions
async function predict() {
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const name = prediction[i].className;
    const probability = prediction[i].probability.toFixed(2);
    const classPrediction = `-${name}: ${probability}`;
    labelContainer.childNodes[i].innerHTML = classPrediction + '\n';
    if (prediction[i].probability > 0.7) {
      labelContainer.childNodes[i].style.color = " rgb(0, 255, 128)";

    }
    else {
      labelContainer.childNodes[i].style.color = " rgb(177, 237, 255)";

    }
  }

}




