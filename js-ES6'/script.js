/* let and const 
function Test(test){

    console.log(a) //--> hoisting. "undefined" 라고 나옴
    if(test){
        var a = 'joo';
        var b = 1995;
    }
    console.log(a+b);
}
Test(true)  */

/*
function Test(test){
    
    
    if(test){
        let a = 'joo';
        const b = 1995;
    }
    console.log(a)
}
Test(true); // -->오류. block scope 임. 


function Test(test){
    //console.log(b) // 아예 오류! hoisting이 안된다?
    let a;
    const b = 1995 // const 는 선언과 동시에 초기화 시켜야 함.
    if(test){
        a = 'joo';
    }
    console.log(a+b)
}
Test(true)
*/

/* Block scope!! 전혀 다른 변수라고 생각하면 됨! 
let i = 23;
for (let i =0; i<5; i++){
    console.log(i)
}
console.log(i)
*/


/* IIFE 

//ES6
{
    const a =1;
    let b= 2;
}
console.log(a+ b) --> 오류

//ES5
(function(){
    var c = 3;
})();
console.log(c) --> 오류
*/

/* ---------------------string 

let firstName= 'JOOWOO';
let lastName = 'NAM';
const yearOfBirth = 1995;
function calAge(year){
    return 2019 - year;
}

//ES5
console.log("This is" + firstName + " lalalal~" + lastName);

//ES6
console.log(`This is ${firstName} lalalal ${lastName}.`);

const n = 'Junwoo';
console.log(n.startsWith('J'));
console.log(n.includes('woo'));
console.log(`${firstName} `.repeat(5));
--------------------------*/

/*---------------------------- Arrow func 
const years = [1994, 1995, 2015, 2019];

//ES5
var ages = years.map(function(cur){
    return 2019 - cur;
})
console.log(ages);

//ES6
let ages6 = years.map(cur => 2019 - cur);
console.log(ages6);
ages6= years.map((cur, index) => `${index +1} : ${2019-cur}.`);
console.log(ages6)

ages6 = years.map((cur, index) =>{
    const now = new Date().getFullYear();
    const age = now - cur;
    return `Age ${index+1} : ${age}.`;
})
console.log(ages6)
//---------------------------------------*/

/*--------------------------- Arrow func2 

var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
       
       document.querySelector('.green').addEventListener('click', ()=> {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box5.clickMe()



//ES5
var box6 = { 
    color : 'green',
    position : 1,
    clickMe : function(){
        var self = this;
        document.querySelector('.green').
        addEventListener('click', function(){
            alert( self.color + self.position)// this 라고 하면 window object 이기 떄문에 self 로 치환해서 
        })
    }
}
box6.clickMe()

//ES6
const box6 ={
    color : 'green',
    position : 1,
    clickMe:function(){
        document.querySelector('.green').
        addEventListener('click', ()=>{
            alert(`${this.color} ${this.position}`) // ES5 였다면 this 가 window object를 가리켰을 것임
                                                       arrow function 은 this 를 애초에 갖고 있지 않기때문에, 선언된 순간(즉, 상위 스코프)의 this와 동일한 this를 갖게 됨.
        })
    }
}
box6.clickMe(); 

function Person(name){
    this.name = name;
}

//ES5
Person.prototype.myFriends5 = function(friends){
    var arr = friends.map(function(cur){
        return this.name + cur
    }.bind(this))
    console.log(arr);
}
var friends = ['A', 'B','C'];
new Person('joo').myFriends5(friends)

//ES6
Person.prototype.myFriends5 = function(friends){
    var arr = friends.map(cur => 
         this.name + cur
    )
    console.log(arr);
}
new Person('Doo').myFriends5(friends)

----------------------------------------*/

/*Destructing 

//ES5
var joo =['joo', 25];

//ES6
const [name, age] = ['joo', 25];
const obj ={
    firstName :'JoonWOO',
    lastName : 'NAM'
}
const {firstName, lastName} = obj;
console.log(firstName , lastName);

function clacAge(year){
    const age = new Date().getFullYear()- year;
    return [age, 65 - age]
}
const [a, b]= clacAge(1995)
*/


/* Array 
const boxes = document.querySelectorAll('.box');

// //ES5
var boxesArr5 = Array.prototype.slice.call(boxes)
boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue';
})


//ES6
const boxes = document.querySelectorAll('.box');

const boxesArr6 = Array.from(boxes);
boxesArr6.forEach( cur =>
    cur.style.backgroundColor = 'dodgerblue');

for(const cur of boxesArr6){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent = '바뀌어라~'
}

var ages =[10, 11, 5, 2, 14]
console.log(ages.findIndex( cur => cur>10))
console.log(ages.find(cur => cur > 10));
------------------------------*/

/* spread operator 
function addFourAges(a,b,c,d){
    return a+b+c+d;
}
ages = [10,2,5,3];
const sum = addFourAges(...ages); // spread! 한 마디로 원소를 낱개별로 뿌려주는
console.log(sum);

const test= ['a','b','c','d']
const test2 = [ 'a2','b2','c2','d2']
const bigtest = [...test, ...test2]
console.log(bigtest);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box')

const all = [h, ...boxes];
Array.from(all).forEach(cur => 
    cur.style.color='purple')
-----------------------------------------*/

/*Rest parameters

//ES5
function isFullAge5(){
    var argsArr = Array.prototype.slice.call(arguments);
    console.log(argsArr);
}
isFullAge5(1,2,3);

//ES6
function isFullAge6(...years){
    console.log(years); // more easier  looks better 
}
isFullAge6(1,2,3);

function isFullAge6_2(limit,...years){
    console.log(`limit : ${limit} years : ${years}`)
    years.forEach(cur => console.log(cur > limit));
}
isFullAge6_2(1, 1,2,3);
-------------------------------*/

/* default parameter 
function test(name, age = 19){
    this.name = name;
    this.age = age;
}
var Joo = new test('joo', 25);
console.log(Joo);
var Doo = new test('doo')
console.log(Doo) // default 로 age =19 가 된다.
--------------------------------*/

/*MAPS 
const question = new Map();
question.set('question','how old are you?');
question.set(1,25);
question.set(2,24);
question.set(3,0); //나중에 지울 것

question.set('correct' , 1);
question.set(true, '정답!');
question.set(false, '땡');

console.log(question.get('question'));
console.log(question.size);
if(question.has(3)){
    question.delete(3);
}

//question.clear(); //모든걸 삭제
question.forEach((value,key) => //parameter 순서가 value가 첫 번째임!
console.log(`tihs is ${key}// its value is ${value}`));

for (let [key, value] of question.entries()){
    if(typeof(key) ==='number'){
    console.log(`tihs is ${key}// its value is ${value}`);
    }
}
const ans = parseInt(prompt("Write the correct answer"));
console.log(question.get(ans===question.get('correct')));

-------------------------------------------------*/

/* classes 

//ES6
class Person6{
    constructor(name, age, job){
        this.name = name;
        this.age = age;
        this.job= job;
    }
    
    calculateAge(){
        console.log("WORKS");
    }

    static greeting(){
        console.log("HELLO");
    }
}

const joo = new Person6('joo', 25, 'stu');
joo.calculateAge();
Person6.greeting();
-------------------------------------*/

/* subclass 
class Person6{
    constructor(name, age, job){
        this.name = name;
        this.age = age;
        this.job= job;
    }
    
    calculateAge(){
        console.log("WORKS");
    }

    static greeting(){
        console.log("HELLO");
    }
}

class Athlete6 extends Person6 {
    constructor(name, age, job, olympic, medals){
        super(name, age, job);
        this.olympic= olympic;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const Doo = new Athlete6('Doo', 26, 'swimmer', 3, 10);
Doo.wonMedal();
Doo.calculateAge();
------------------------------*/

/* practice 
class Element{
    constructor(name, buildYear){
        this.name= name;
        this.buildYear = buildYear;
    }
}
class Park extends Element{
    constructor(name, buildYear, area, numTrees){
        super(name, buildYear);
        this.area = area;
        this.numTrees= numTrees;
    }

    treeDensity(){
        const density = this.numTrees /this.area;
        console.log(`Park name : ${this.name}, Density: ${density} `);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size=3){
        super(name, buildYear);
        this.length =length;
        this.size =size;
    }
    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny')
        classification.set(2, 'small')
        classification.set(3, 'normal')
        classification.set(4, 'big')
        classification.set(5, 'huge')
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)}`)
    }
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


function calc(arr){
    const sum = arr.reduce((prev, cur, index) => prev +cur, 0);
    return [sum, sum/ arr.length];
}

function reportPark(p){
    
    //Density
    p.forEach(cur => cur.treeDensity());
    
    //Average age 
    const ages =p.map(cur => new Date().getFullYear() - cur.buildYear);
    const [totalAge, avgAge] = calc(ages);

}

function reportStreet(s){


}
reportPark(allParks);
reportStreet(allStreets);
*/