/*-------------------------- prototype 
1. Every JS object has a prototype property, which
makes inheritance possible in JS.
2. The prototype property of an object is where
we put methods and properites that we want other objects to inherit.
3. The constructor's prototype property is NOT the prototype of the 
Constructor itself, it's the prototype of ALL instances that are created through it.
4. When a certain method(or property) is called, the search starts in
the object itself, and if it cannot be found, the search moves on to the
object's prototype. This continues until the method is found: prototype chain.

function Person(name, yeafOfBirth , job){
    this.name = name;
    this.yearOfBirth = yeafOfBirth;
    this.job = job;
    this.calAge = function(){
        console.log(2019 - this.yeafOfBirth);
    }
}
var Person2 =function(name, yeafOfBirth , job){
    this.name = name;
    this.yearOfBirth = yeafOfBirth;
    this.job = job;
}
Person2.prototype.calAge2 = function(){
    console.log(2019-this.yearOfBirth);
}

var Joo = new Person('JOO', 1995, 'student');
console.log(Joo);
console.log(Joo.hasOwnProperty('calAge'))
var Doo = new Person2("DOO" , 1994, 'developer');
console.log(Doo);
console.log(Joo.hasOwnProperty('calAge2'))
----------------------------------*/

/* ---------------------primitives and object 
var obj = {
    name :'joo',
    city : 'incheon'
}
var obj2= obj;
obj2.name = 'Doo' 
console.log(obj); //obj가 수정됨!! 깊은복사!

var a= 2;
var b= a;
b =1 ;
console.log(a); // primitive 는 괜찮음! 얕은복사!
------------------------------------------*/

/* ------------------------returning fucn 
function interview(job){
    if(job==='designer'){
        return function(name){
            console.log('design' +name );
        }
    }else if(job ==='teacher'){
        return function(name){
            console.log('teach ' +name);
        }
    }else{
        return function(name){
            console.log('hello' + name);
        }
    }
}

var design = interview('designer');
design('joo');
var teach = interview('teacher');
teach('doo');
-----------------------------------*/

/* ------------------------data privacy
(function (){
    var score = Math.random() *10;
    console.log(score>=5);
})();

--------------------------------------*/

/* closure
"An inner function has always access to the variables
and parameters of its outer function ,even after the outer function
has returned.""
function Love(name){
    var text = " loves "
    return function(target){
        console.log(name + text + target);
    }
}
var who = Love("JOO");
who("DOO");
Love("joo")("doo");
---------------------------------------*/

/* ----------------------Bind , call and apply
var Joo = {
    name : 'Joo',
    age : 25,
    job : 'stu',
    presentation : function(style, timeOfDay){
        if(style ==='formal'){
            console.log('formal ' + timeOfDay+
            this.name + '/' +
            this.age + '/'+
            this.job);
        }else if(style ==='friendly'){
            console.log('friendly '+ timeOfDay+
            this.name + '/' +
            this.age + '/'+
            this.job);
        }
    }
}
var Doo ={
    name : 'DOO',
    age : 26,
    job : 'developer'
}
Joo.presentation('formal', 'night');

// Doo.presentation = Joo.presentation
// Doo.presentation('friendly', 'morning');

Joo.presentation.call(Doo, 'friendly', 'morning');

var JooFormal = Joo.presentation.bind(this, 'formal'); //매개변수 하나를 미리 지정하는 느낌.
JooFormal('afternoon')
------------------------------------*/

/* practice */

(function(){
    function Question(question, answers, correct){
        this.question = question;
        this.answer = answers;
        this.corret = correct;
    };
    
    Question.prototype.showQ = function(){
        console.log(this.question);
        for(var i=0; i<this.answer.length ;i++){
            console.log(i +': '+this.answer[i])
        }
    }
    Question.prototype.check = function(ans){
        if(ans===this.corret){
            console.log("정답!");
        }else{
            console.log("땡!");
        }
    }
    
    var Q1 = new Question("DOO LOVE JOO?",
    ["Yes" , "No"], 0);
    
    var Q2 = new Question("JOO LOVE DOO?" , 
    ["Yes" ,"No"], 0)
    
    var questions = [Q1, Q2];
    
    var n = Math.floor(Math.random()*questions.length);
    
    questions[n].showQ();
    
    var answer = parseInt(prompt("정답을 선택해주세요."));
    
    questions[n].check(answer);
})(); // 변수 보호. invoked function
