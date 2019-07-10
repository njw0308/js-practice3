/*  ----------data type-----------
var firstname = "NAM";
console.log(firstname);

var age = 25;
console.log(age);

var bool = true;
console.log(bool)

var undefined;
------------------------------- */

/* -----------형 변환 -------------/
console.log(firstname + ' ' + age) 

alert("쭈몬여친 궁디 짱커!!!")

var name = prompt("뚜몬 남친의 이름은?")
console.log(name)
console.log(typeof name);

-------------------------------*/
var now = 2019
var Jooyear  = 1995
var Dooyear = 1994

var younger = Jooyear > Dooyear

if(Jooyear ===1995 && Dooyear ===1995){
    console.log("동갑")
} else if(Jooyear < Dooyear){
    console.log("준우가 어립니다.")
}else {
    console.log("뚜몬이가 어립니다.")
}

var age = 25
switch(true){
    case age<10:
        console.log("joonwoo's age under 10");
        break;
    case age >10:
        console.log("joonwoo's age is over 10 ");
        break;
    default:
        console.log("joonwoo's age is undefined")
}

var falsy_value1 = 0
var falsy_value2 = NaN
var falsy_value3 = ''
var falsy_value4 = null
if(falsy_value4){
    console.log("true")
}else{
    console.log("false")
}

if(age =='25'){
    console.log("equality operation data type coercion")
}else{
    console.log("equality operation NOT data type coercion")   
}

/* 2가지 다른 function 활용법. 
declaration 과 expression. 
expression 은 다른 언어에서는 좀 보기 힘든거 같음.
파이썬의 람다 함수 느낌!?
*/
function test(a,b){
    console.log(a+'\'s age is ' + b);
}

test('joonwoo', 15)

var test = function test_function_expression(a,b){
    return (a+'\'s age is ' + b);
}

console.log(test('joonwoo', 12))

var names = ['jjoo','ddoo']
var year = new Array(1995, 1994);

console.log(names[1])
console.log(names.length)
console.log(year)

var before_tip = new Array(124, 48,268)
function tip_calculate(bill){
    if(bill<=50){
        return bill*0.2;
    }
    else if(bill>50 && bill<=200){
        return bill*0.15;
    }
    else{
        return bill*0.1;
    }
}
var after_tip = [
    before_tip[0] + tip_calculate(before_tip[0]),
    before_tip[1] + tip_calculate(before_tip[1]),
    before_tip[2] + tip_calculate(before_tip[2])
];
console.log(after_tip)

/* 
파이썬의 딕셔너리하고 비슷한 느낌.
JS 에서는 object 라고 칭하더라.
*/
var Joo={
    name : 'joonwoo',
    familyname : 'Nam',
    job : 'student',
    birthyear : 1995
}
console.log(Joo.birthyear);

var Doo = new Object();
Doo.name = 'dooyong';
Doo.familyname = 'Choi';
Doo.job = 'developer'
console.log(Doo)

/* 
Method 를 만드는 방법.
*/
Joo.calAge = function(birthyear){
    return 2019 -birthyear
}
console.log(Joo.calAge(Joo.birthyear))

var Joo={
    name : 'joonwoo',
    familyname : 'Nam',
    job : 'student',
    birthyear : 1995,
    calAge : function(){
        this.age = 2019 - this.birthyear;
    }
}
Joo.calAge()
console.log(Joo)

var john = {
    fullname:'john smith',
    bills : [124, 48, 268, 180 ,42],
    calTips: function(){
        this.tips=[];
        this.final= [];
        for (var i=0; i<this.bills.length; i++){
            var percentage;
            var bill = this.bills[i];

            if(bill < 50){
                percentage = .2;
            }else if(bill>=50 && bill<200){
                percentage = .15;
            }else{
                percentage = .1;
            }
            this.tips[i] = bill*percentage;
            this.final[i] = bill + bill*percentage;
        }
    }
}
john.calTips();
console.log(john);