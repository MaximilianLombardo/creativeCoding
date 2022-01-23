const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');



const settings = {
  dimensions: [ 1920, 1080 ],
  animate: true
};

let textBorder = '|M*A*K*S|';
let text       = '|M*A*K*S|';

let fontSize = 1200;
let fontFamily = 'Courier New';
let manager

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {

  const cell = 10;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;


  return ({ context, width, height, frame }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    const fontScale = math.mapRange(frame/20, 0, 10, 1, 5);
    const fontScaleClamped = math.clamp(fontScale, 1, 5);

    fontSize = cols/fontScaleClamped;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(text)
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    //Math.sin(frame/20)

    const borderAdjust = Math.sin(frame/0.05) * 10;

    typeContext.fillText(text, 0, 0);
    typeContext.fillText(text, 0, borderAdjust * .15);
    typeContext.fillText(text, 0, borderAdjust * -.15);
    //typeContext.fillText(text, 0, borderAdjust * 5);
    //typeContext.fillText(text, 0, borderAdjust * -5);
    typeContext.globalAlpha = 0.2;
    typeContext.fillText(text, 0, borderAdjust * 40);
    typeContext.fillText(text, 0, borderAdjust * -40);
    //typeContext.fillText(text, 0, 30);
    //typeContext.fillText(text, 0, -30);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    //context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      const n = random.noise2D(x + frame * 10, y + frame * 10, frequency = 0.01, amplitude = 4);
      const angle = n * Math.PI * 0.2;
      const scale = math.mapRange(n, -1, 1, 1, 4);

      context.font = `${cell * 1}px ${fontFamily}`;
      if(Math.random() < 0.1) context.font = `${cell * scale}px ${fontFamily}`;

      context.fillStyle = random.pick(['white', 'white', 'white' ,
                                       'white', 'white' , 'white',
                                       'white' , 'white', 'white',
                                       '#fc032c', '#03a9fc', '#6ffc03']);

      //context.fillStyle

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      if(Math.random() < 0.1) context.rotate(angle);
      //context.fillRect(0, 0, cell, cell);

      //context.beginPath();
      //context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      //context.fill();

      context.fillText(glyph, 0, 0);

      context.restore();

    };
  };
};

const getGlyph = (v) => {
  if(v < 50) return '';
  //if(v < 100) return '-';
  //if(v < 150) return '.';
  //if(v < 200) return '+';

  const glyphs = 'œ∑´®†¥¨ˆøπåß˚Ω≈ç√'.split('');

  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);

};

start();

//canvasSketch(sketch, settings);
