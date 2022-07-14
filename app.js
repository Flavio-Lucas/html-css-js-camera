
const CameraEnum = {
    USER: 'user',
    ENVIRONMENT: 'environment',
}

const currentFacingMode = CameraEnum.USER;

// Set constraints for the video stream
var constraints = { video: { facingMode: { exact: 'user' } }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraToggle = document.querySelector("#camera--toggle");
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}

async function toggleCamera() {
    if (constraints.video.facingMode.exact === CameraEnum.USER) {
        currentFacingMode = CameraEnum.ENVIRONMENT;
    }
    if (constraints.video.facingMode.exact === CameraEnum.ENVIRONMENT) {
        currentFacingMode = CameraEnum.USER;
    }
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

cameraToggle.onclick = function () {
    cameraStart();
}
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
