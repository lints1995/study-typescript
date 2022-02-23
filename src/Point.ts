// 模块
// 1.定义一个接口
interface Point {
  X: number; // 接口关联到class类中的getter/setter
  Y: number;
  drawPoint: () => void;
  calcDistances: (p: Point) => number;
}

// 实现Point接口
export class OPoint implements Point {
  // public、private,protected 访问修饰符，通过修饰符控制外界访问类内部便变量，默认public
  constructor(private x: number, private y: number) {} // 设置为私有变量保护类内部变量不被暴出去
  drawPoint() {
    console.log({ x: this.x, y: this.y });
  }
  calcDistances(p: Point) {
    return Math.pow(p.X - this.x, 2) + Math.pow(p.Y - this.y, 2);
  }
  // 采用getter，setter 来访问和设置内部变量防止外部串改
  get X() {
    return this.x;
  }
  set X(val) {
    if (val < 0) throw new Error("值不能是负数");
    this.x = val;
  }
  get Y() {
    return this.y;
  }
  set Y(val) {
    if (val < 0) throw new Error("值不能是负数");
    this.y = val;
  }
}
