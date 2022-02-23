// 申明一个只包含number类型的数组
let arr1: number[] = [1, 2];
// 采用泛型申明
let arr2: Array<number> = [1, Number("2"), 3];
let arr3 = ["2", 1];

// 声明一个元祖(Tuple)，元祖是固定长度，固定类型的特殊数组
let arr4: [string, number] = ["aaaa", 2];
// 元祖两个bug
// 可以使用push 怎加元素
arr4.push(3);
// 一定要指定数据类型，不指定就是个正常的数组

// 联合类型 Union
// 只能存储指定的数据类型，其他的不能被保存
let union: string | number;
union = 1;
union = "aa";
// union = true;

// 字面量类型（Literal）， 指定联合类型的数值和类型,
// union2的赋值只能是指定的‘1 | 2 | "aa"’之中的值
let union2: 1 | 2 | "aa";
// union2 = 3;
union2 = 1;

// 枚举类型（Enum）,访问foo.red默认是从0开始,也可以指定枚举中的数据
enum Color1 {
  red,
  blue,
  green,
}
console.log(Color1.red); // 0
enum Color2 {
  red = 2, //2
  blue, //3
  green, //4
}
enum Color3 {
  red = "red",
  blue = "blue",
  green = "green",
}
console.log(Color3.red); // red

// 动态类型
// any和 unknown
// 定义任何类型
let any1: any = 1;
any1 = "a";
// any1(); // 这个函数是不存在的但是any类型能被调用
// unknown类型必须是确定了类型后才能使用
let unknownValue: unknown = 6;
if (typeof unknownValue === "string") {
  unknownValue.toUpperCase();
}
if (typeof unknownValue === "function") {
  unknownValue(); // unknown 要检测类型后才能被使用，会自动检测错误
}
console.log(unknownValue);

// 函数类型 void、undefined、never
function printString(): void {
  console.log("11111");
}
// 直接返回的就是undefined
// function printString(): undefined {
//   console.log("11111");
//   return;
// }
// never 永远都执行不完就声明为never
// function loop(): never {
//   while (true) {
//     console.log("loop");
//   }
// }
console.log(printString());

// 类型适配（类型断言）
let msg: any;
msg = "abc"; // 类型声明的是any ，赋值成字符串也不能改变any的类型
msg.endsWith("c");

//类型适配，告诉ts转换类型为string
// 第一种方法
let str1 = (<string>msg).length;
// 第二种方法
let str2 = (msg as string).length;

// 函数类型
let log2 = (msg: string) => console.log(msg);
log2("a");
// log2(1); // 类型错误

// 多个参数函数
let log3 = (val1: string, val2: number) => {
  console.log(val1, val2);
};
console.log(log3("1", 2)); // 参数必须传全

// ?表示可选参数，如果不传val2默认undefined
let log4 = (val1: string, val2?: number) => {
  console.log(val1, val2);
};
console.log(log4("1"));

// 初始化参数值
let log5 = (val1: string, val2: number = 2) => {
  console.log(val1, val2);
};
console.log(log5("1", 6));

// 对象
// interface
// 限制函数的传入参数类型，防止误传参数
// function printPoint(point) {
//   console.log({ x: point.x, y: point.y });
// }
interface Point1 {
  x: number;
  y: number;
}
function printPoint(point: Point1) {
  console.log({ x: point.x, y: point.y });
}

printPoint({ x: 1, y: 2 });
// printPoint({ a: "xxxx", b: "abc" });

// 类
// 1.定义一个接口
interface Point {
  X: number; // 接口关联到class类中的getter/setter
  Y: number;
  drawPoint: () => void;
  calcDistances: (p: Point) => number;
}

// 实现Point接口
class OPoint implements Point {
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

let point1 = new OPoint(1, 2);
point1.X = 10;
point1.Y = 20;
console.log(point1.X, point1.Y);

// 泛型
let arr6: Array<string> = ["1", "2"];

let lastEl = <T>(arr: T[]) => {
  return arr[arr.length - 1];
};

let l1 = lastEl([1, 2, 3, 4]); // 不指定类型自动适配
let l2 = lastEl<string | number>(["1", 2, 3, 4]); // 指定类型为string和number

// 多个参数的泛型
// Y = number可以定义泛型的默认类型
let makeTuple = <T, Y = number>(x: T, y: Y) => [x, y];
const v1 = makeTuple("1", 2); //  TS 自动转换
const v2 = makeTuple<boolean>(true, 2); // 显示指定参数类型
