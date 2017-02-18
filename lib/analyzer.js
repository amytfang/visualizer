const data = function() {
  const ctx = new AudioContext();
  const audio = document.getElementById('song');
  const audioSrc = ctx.createMediaElementSource(audio);
  const analyser = ctx.createAnalyser();
  const canvas = document.getElementById('canvas');
  const ctxCanvas = canvas.getContext('2d');
  ctxCanvas.fillStyle = 'black';


  audioSrc.connect(analyser);
  analyser.connect(ctx.destination);
  // analyser.fftSize = 128;

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);

  function renderFrame() {
     analyser.getByteFrequencyData(frequencyData);
     ctxCanvas.clearRect(0, 0, 1200, 300);
     frequencyData.forEach((value, i) => {
       ctxCanvas.fillRect(i*2, 300-value, 1, 1);
     });
     console.log(frequencyData.length);
     requestAnimationFrame(renderFrame);
  }

  audio.play();
  renderFrame();
};

module.exports = data;
