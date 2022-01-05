const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  //dimensions: [ 1080, 1080 ]
  // Enable an animation loop
  animate: false,
  // Set loop duration to 3
  duration: 10,
  // Use a small size for better GIF file size
  dimensions: [ 1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'red';//background
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';//first set of rectangles

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.00005;
    const h = height * random.range(0, 0.25);
    let x, y;
    let xTwo, yTwo;

    const num = 10000;
    const radiusInner = width * 0.1
    const radius = width * 0.3;
    const radiusTwo = width * 0.325;
    const radiusThree = width * 0.35;

    for(let i = 0; i < num; i ++) {

      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      xInner = cx + radiusInner * Math.sin(angle);
      yInner = cy + radiusInner * Math.cos(angle);

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      xTwo = cx + radiusTwo * Math.sin(angle);
      yTwo = cy + radiusTwo * Math.cos(angle);

      xThree = cx + radiusThree * Math.sin(angle);
      yThree = cy + radiusThree * Math.cos(angle);

      // - Inner rectangles - Iris - layer 3

      context.save();
      context.translate(xInner, yInner);
      context.rotate(-angle);
      context.scale(random.range(1, 10), random.range(1, 2));

      context.fillStyle = 'white';//'#42b3f5';
      context.beginPath();
      //context.rect(-w * 0.5, -h * 0.5, w, h);
      context.rect(-w * 0.5, random.range(0, -h * 0.1), w, random.range(-h * 0.15, h * 0.5));
      context.fill();
      context.restore();

      // - white rectanlges - layer 1
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(1, 10), random.range(0.5, 1));

      context.beginPath();
      //context.rect(-w * 0.5, -h * 0.5, w, h);
      context.rect(-w * 0.5, random.range(0, -h * 0.1), w, random.range(h * 0.45, h * 0.5));
      context.fill();
      context.restore();

      // - orange rectangles - layer 2

      context.save();
      context.translate(xTwo, yTwo);
      context.rotate(-angle);
      context.scale(random.range(1, 10), random.range(1, 2));

      context.fillStyle = 'yellow';
      context.beginPath();
      //context.rect(-w * 0.5, -h * 0.5, w, h);
      context.rect(-w * 0.5, random.range(0, -h * 0.1), w, random.range(0, h * 0.5));
      context.fill();
      context.restore();

      if (i % 7 == 0 ){ //not sure if this is working
        // - blue overlay rectangles - layer 2a

        context.save();
        context.translate(xTwo, yTwo);
        context.rotate(-angle);
        context.scale(random.range(1, 10), random.range(1, 2));

        context.fillStyle = 'blue';
        context.beginPath();
        //context.rect(-w * 0.5, -h * 0.5, w, h);
        context.rect(-w * 0.01, random.range(0, -h * 0.01), w, random.range(0, h * 0.01));
        context.fill();
        context.restore();
      }
      // - blue overlay rectangles - layer 2a

      context.save();
      context.translate(xTwo, yTwo);
      context.rotate(-angle);
      context.scale(random.range(1, 10), random.range(1, 2));

      context.fillStyle = 'blue';
      context.beginPath();
      //context.rect(-w * 0.5, -h * 0.5, w, h);
      context.rect(-w * 0.5, random.range(0, -h * 0.1), w, random.range(0, h * 0.5));
      context.fill();
      context.restore();

      // - x rectangles - layer 3

      context.save();
      context.translate(xThree, yThree);
      context.rotate(-angle);
      context.scale(random.range(1, 10), random.range(1, 2));

      context.fillStyle = 'orange';
      context.beginPath();
      //context.rect(-w * 0.5, -h * 0.5, w, h);
      context.rect(-w * 0.5, random.range(0, -h * 0.1), w, random.range(0, h * 0.5));
      context.fill();
      context.restore();


      // - black background shapes
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(1, 2);

      context.strokeStyle = 'black';
      context.beginPath();

      //context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(0, -1), slice * random.range(1, 5));
      context.arc(0, 0, radius * random.range(0.5, 1), slice * random.range(0, -1), slice * random.range(1, 5));
      context.stroke();

      context.restore();



    }

  };
};

canvasSketch(sketch, settings);
