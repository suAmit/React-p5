import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(300, 300);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(p.width / 2, p.height / 2, 100, 100);
  };
};

export default sketch;
