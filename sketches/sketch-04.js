const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const palettes = require('/usr/local/lib/node_modules/nice-color-palettes');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: false
};

const sketch = () => {
  return ({ context, width, height, frame}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 100;
    const rows = 100;
    const numCells = cols * rows;

    const gridw = width * 1;
    const gridh = height * 1;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    const palette = random.pick(palettes).slice(0, 5);//
    const colors = random.pick(palette)

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const n = random.noise2D(x + frame * 5, y + frame * 10, frequency = 0.001, amplitude = 3);
      const angle = n * Math.PI * 0.2;
      //const scale = (n + 1) / 2 * 30;
      const scale = math.mapRange(n, -1, 1, 300, 500);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.rotate(angle);

      context.lineWidth = scale;
      //context.strokeStyle = "black";//colors;
      const test_colors = ["black", "red", "orange", "yellow", "green", "blue"];
      if (i % 7 == 0) {
          context.strokeStyle = random.pick(test_colors);

        } else {
         context.strokeStyle = "black";
         }

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w *  0.5, 0);
      context.stroke();


      context.restore();



    }

  };
};

canvasSketch(sketch, settings);
