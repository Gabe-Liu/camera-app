// Set constraints for the video stream
const imgArr = [];
var constraints = { 
    video: { 
        // facingMode: "user" 
        facingMode: "environment" 
    }, 
    audio: false 
};
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    num = document.querySelector("#num");
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    imgArr.push(cameraOutput.src);
    num.innerText = 8 - imgArr.length;    
    cameraOutput.classList.add("taken");
    if (imgArr.length === 8) {
        $('.matrix-box').addClass('show');
        $("#camera").hide();
        $('[data-index]').each(function(index) {
            const $this = $(this);
            $this.css({
                'background-image': 'url(' + imgArr[ $this.attr('data-index') - 1] + ')'
            })
        })
    }
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

$(function(){
    let i = 0; // 初始位置，
    let speed = 40; // 转动速度
    let count; // 总变化次数
    let nowcount; // 当前的变化位置
    let num = 8; // 一圈的數量
    let play = false;
    let randomN = 0;

    $('.close').on('click', function() {
        $('.award').removeClass('show');
    });

    $('.start-btn').on('click', function(){
        randomN = Math.ceil(Math.random() * 7);
        // this.lottery_award = this.prizes[randomN];
        initMatrixBingo();
    });

    function initMatrixBingo() {
        play = true;
        speed = 40;
        count = num * 8 + randomN; // 总变化次数
        nowcount = 0; // 当前的变化位置
        i = 0; // 初始位置，
        console.log(randomN);
        run();
    }

    function run() { // 利用递归模拟setinterval的实现
        if (nowcount >= count) {
        // console.log('得獎');     
        console.log(randomN)
            $('.award').addClass('show');
            $('#win-img').attr('src', imgArr[randomN - 1]);
        }else {
          nowcount += 1;
          speed += 1;
          if (nowcount > count - 30 ) {
            speed += 5;
          }
          if (nowcount > count - 10 ) {
            speed += 20;
          }
          if (nowcount > count - 5 ) {
            speed += 35;
          }

          $('[data-index]').removeClass('active');
          if (nowcount % 8 === 0) {
            $('[data-index=8]').addClass('active');
          }else {
            $('[data-index=' + nowcount % 8 + ']').addClass('active');
          }
          
          
          setTimeout(() => {
            run();
          }, speed);
        }
      }
});