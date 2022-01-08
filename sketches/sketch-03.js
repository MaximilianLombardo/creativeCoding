const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const palettes = require('/usr/local/lib/node_modules/nice-color-palettes');


const settings = {
  // Use a small size for better GIF file size
  dimensions: [ 1080, 1080 ],
  animate: true
};

const animate = () => {
  console.log('hi');
  requestAnimationFrame(animate);
};

//animate();

const sketch = ({ context, width, height }) => {
  const agents = [];
  const palette = random.pick(palettes).slice(0, 5);

  for (let i = 0; i < 1000; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y, random.pick(palette)));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++){
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 150) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 0.01, 0.1);

        context.strokeStyle = random.pick(palette);
        context.beginPath();

        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);

        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });

  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx**2 + dy**2);
  }
}

class Agent {

  constructor(x, y, color) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(2, 4);
    this.color = color;
  }

  update() {
    this.pos.x += this.vel.x * 10;
    this.pos.y += this.vel.y * 1;
    //this.color = random.pick(palette);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  draw(context) {
    context.fillStyle = this.color;

    context.save()
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 1;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
