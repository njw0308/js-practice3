/* ------------- 지역 변수 전역 변수
function a(){
    var i =0; //var 을 제외하고 쓰면 전역 변수임.  
    return i;
}
for(var i =0 ; i<5 ; i++){
    console.log(a());
}
----------------------------------*/


/* ------------정적 유효범위(static scoping/lexical scoping)
var i =5;
function a(){
    var i = 10;
    b();
}
function b(){
    console.log('i\'s value is' + i); // 5가 나옴.
     //'호출될 때'가 아닌, '정의될 때'의 i 값!! 
}
a();
//-----------------------------------------------*/

/*--------------------------값으로서의 함수와 콜백 
first-class object -- 변수, 매개변수, 리턴값 등등으로 사용
function cal(mode){
    var funcs={
        'plus':function(left, right){return left+ right},
        'minus':function(left,right){return left-right}
    }
    return funcs[mode]
}
console.log(cal('plus')(2,1));

var process = [
    function(input){return input+10},
    function(input){return input*input},
    function(input){return input/2}
]
var input =1;
for(var i = 0; i<process.length; i++){
    input = process[i](input);
}
console.log(input)

function compare(a,b){
    return a-b
}
var numbers = [5,4,2,1,3,10]
console.log(numbers.sort(compare))
--> JS 에서 sort 는 기본적으로 알파벳 순으로 정렬됨.
--> compare라는 callback 함수를 통해서 숫자 기준 정렬.

----------------------------------------------------*/

/* 비동기 콜백과 Ajax
(Async JS and XML)
*/

/* ---------------------클로져 
function outter(){
    var title = 'coding everyday';
    return function(){
        console.log(title);
    }
}
inner = outter()
inner();

----------------------private variable
* title 이라는 변수에 접근할 수 있는 방법.
이 굉장히 제한적임. == 안전함.
function factory_movie(title){
    return {
        get_title : function(){
            return title;
        },
        set_title : function(_title){
            title = _title
        }
    }
}
ghost = factory_movie('Ghost in the shell');
console.log(ghost.get_title())
ghost.set_title("change Ghost")
console.log(ghost.get_title())
-----------------------------------------*/

/* arguments-매개변수가 없음에도 불구하고
--> 약속되어 있는 객체.(유사 배열)
function sum(){
    var i, _sum = 0;
    for(i=0; i <arguments.length; i++){
        console.log(arguments[i]);
        _sum +=arguments[i];
    }
    return _sum;
}
console.log(sum(1,2,3,4))

function one(arg1){
    console.log(
        'one.length :'+ one.length, // 들어오는 매개변수 개수
        'argument.length: '+ arguments.length
    )
}
one('val1','val2')
--------------------------------------------*/

/* ------------------------------ apply 
var o1= {v1:1, v2:2 , v3:3};
function sum(){
    var _sum= 0;
    for(i in arguments[0]){
        _sum +=arguments[0][i]
    }
    return _sum;
}
function sum_apply(){
    var _sum = 0;
    for(name in this){
        _sum += this[name]
    }
    return _sum;
}
console.log(sum(o1))
console.log(sum_apply.apply(o1))
--> apply를 사용하면 'sum_apply 함수'가 o1 의 메소드인 것처럼
기능하도록 할 수 있다.
----------------------------------------*/

/* --------------------------------생성자와 new
--> class 느낌. 함수 자체를 class 처럼 사용하는.

function Person(){}
var p = new Person(); // 함수에 new 를 붙이면 그 return으로 새로운 객체를 '생성' 시킴.

function Person(name){
    this.name = name;
    this.introduce = function(){
        return "My name is" + this.name;
    }
}
var p1 = new Person('Joo');
var p2 = new Person('Doo');
-------------------------------------------*/

/* ------------------------------- 함수와 this
function func(){
    if(window ===this){ // window 는 전역 객체(global object)
        console.log("window ===this");
    }
}
func();

var o = {
    func: function(){
        if(o===this){
            console.log("o===this");
        }
    }
}
o.func()
// --> 어느 객체에 소속되지 않은 경우에 this 는 window를 가르켰음
//     o.func() 라는 얘로 호출을 했을 때 this는 o 를 가리켰지.
//     하지만 script에 그냥 있는 func()를 window.func() 라고 생각하면,
//     o.func() 의 this 가 왜 o 인지 이해할 수 있음.
//    즉!! "this는 그 함수가 소속되어 있는 객체를 가리킨다!!"

var funcThis = null; 
 
function Func(){
    funcThis = this;
}
var o1 = Func();
if(funcThis === window){
    console.log('전역 객체 -window');
}

//우리가 생성자를 호출하게 되면 이 생성자에 대한 호출이 모두 끝난 다음에
//그 때 비로서 o2 라는 변수에 우리가 생성한 객체가 할당이 된다.F
//그 전까지 객체는 만들어져 있지만 실제로 o2 라는 변수에 할당이 되어 있지 않기 때문에 
//우리는 객체를 참조할 수 없음.
var o2 = new Func();
if(funcThis === o2){
    console.log('생성자 - o2');
}

var o = {}
function func(){
    switch(this){
        case o:
            console.log('apply - o')
            break;
        case window:
            console.log('전역객체 -window')
            break;
    }
}
func();
func.apply(o);
---------------------------------------------*/

/* ----------------------------------- 상속 
function Person(name){
    this.name = name;
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
    return 'My NickName is '+this.name; 
}
 
function Programmer(name){
    this.name = name;
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
    return "hello world";
}
Programmer.prototype.specialCoding = function(){
    return "Excellent!";
}
 
var p1 = new Programmer('joo');
document.write(p1.introduce()+"<br />");
document.write(p1.coding()+"<br />");
 
var p2 = new Programmer('Doo');
console.log(p2.introduce());
console.log(p2.specialCoding());

function Joo(){}
Joo.prototype.marry = true;

function Doo(){}
Doo.prototype = new Joo();

var D = new Doo();
console.log(D.marry);
// 객체 D에서 marry를 찾음. --> 없다면 
-------------------------------------*/

/*
Exectuion Context 3
Execution Context 2
Execution Context 1
Global Execution Context
-----------------------
    EXECUTION STACK

Execution Context? Box, Container 라고 생각

Global? 
1. Code that is NOT inside any func.
2. Associated with the global object.
3. In the browser, that's the 'window object'.
*/

/*
Execution Context Object -
3properties. 
--> 1. Variable object 2. Scope chain 3. "this" variable

1. Creation phase 
   a) Creation of the Variable Object
   b) Creation of the scope chain
   c) Determine value of the 'this' value
2. Execution phase
      The code of the function that generated
      the current execution context is ran
*/

/* ------------------------------------------
function hoisting.
declaration 경우에만 가능함. 
"javaScript가 어떤 코드 구분을 실행하기 전에 함수 선언을 
메모리에 저장하는 방식의 장점 중 하나는 코드에서 선언하기 
전에 함수를 사용할 수 있다는 것입니다."

calculate(1994); // function hoisting

function calculate(year){
    console.log(2019 - year);
}

retirement(1995); // 오류

var retirement = function(year){
    console.log(65 - (2019-year));
}
-----------------------------------*/

/*---------------------- variable hoisting 
console.log(age); // undefined 
var age =23;
console.log(age);

function foo(){
    console.log(age); //undefined
    var age = 65; //own exectuion context
    console.log(age);
}

foo();
console.log(age); //23이 나옴. Global execution context
-----------------------------------------*/

/*----------------------------------- scope chain 
1. Scoping answers the question "where can we access a certain variable?"
2. Each new function creates a scope: the space/environment, in which the variables it defines are accessible.
3. Lexical scoping: a function that is lexicaaly within another function gets access to the scope of the outer function.

var a = 'hello';
first();
function first(){
    var b = "hi";
    second();
    function second(){
        var c = "hey!";
        console.log(a+b+c); 
    }
}
//the difference between execution stack 
// and scope chain
var a = 'hello';
first();
function first(){
    var  b = 'hi';
    second();
    function second(){
        var c = 'hey!';
        third() 
        // 이거는 괜찮아!! 부모의 scope chain은 접근할 수 있으니까.
    }
}
function third(){
    var d = 'Nam';
    console.log(a,d)
    console.log(c,b); // error 
}
-----------------------------------------------*/

/* this variable
1. Regular function call: the this keyword points at the global object.
2. Method call : the this variable points to the object that is calling the method.
*/ 
var Joo ={
    name : 'Joo',
    yearOfBirth : 1995,
    calculateAge : function(){
        console.log(this);
        console.log(2019 - this.yearOfBirth);
        function innerFunction(){
            console.log(this); //window object가 나옴. 2번째 case가 아니니까!
        }
        innerFunction();
    }    
    
}
Joo.calculateAge();

var Doo = {
    name : 'Doo',
    yearOfBirth : 1994,
};

Doo.calculateAge = Joo.calculateAge; //Method Borrowing.
Doo.calculateAge();
