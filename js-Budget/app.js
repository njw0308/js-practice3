//하나 하나의 모듈. 전역 변수를 해치지 않고 각 변수를 보호시키기 위해
var budgetController = (function (){
   
    //많은 지출이 있을거니까 생성자를 위한 함수를 만들어주자.
    var Expense =function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    //계산을 위해
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome >0){
        this.percentage = Math.round((this.value/totalIncome) *100);
        }else{
            this.percentage = -1;
        }
    }
    //리턴값을 위해
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income =function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal=function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current){
            sum += current.value
        });
        data.totals[type] =sum;
    }

    var data ={
        allItems:{
            exp :[],
            inc :[]
        },
        totals :{
            exp :0,
            inc :0

        },
        budget : 0,
        percentage : -1,
    };

    return {
        addItems :function(type, des, val){
            var newItem, ID;

            //create new ID
            if(data.allItems[type].length >0){
            ID = data.allItems[type][data.allItems[type].length -1].id +1;
            }else{
                ID = 0;
            }
            //create new item based on 'inc' or 'exp' type
            if(type ==='exp'){
                newItem = new Expense(ID, des, val);
            }else if(type==='inc'){
                newItem = new Income(ID, des,val);
            }
            
            //Push it into our data structure
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItems : function(type, id){
            var ids, index;
            
            ids =data.allItems[type].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index ,1); //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            }
        },

        calculateBudget:function(){
            //caculate total income , expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            if(data.totals.inc >0){
                data.percentage =Math.round(data.totals.exp / data.totals.inc*100);
            }else{
                data.percentage = -1;
            }

        },

        calculatePercentages:function(){
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc)
            })
        },

        getPercentages:function(){
            var allPerc = data.allItems.exp.map(function(current){
                return current.getPercentage();
            });
            return allPerc;
        },

        getBudget:function(){
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp: data.totals.exp,
                percentage :data.percentage,
            }
        },

        testing:function(){
            return data;
        }
    }

})();

var UIController = (function(){
    
    //반복되는 이름을 하나의 객체로 묶어서 만들자. --> 쉽게 수정하게끔
    var DOMstring = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list',
        budgetLabel :'.budget__value',
        incomeLabel : '.budget__income--value',
        expenseLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container : '.container',
        expensePercLabel :'.item__percentage',
        dataLabel : '.budget__title--month',
    }

    var formatNumber = function(num, type){
        var numSplit, int , dec;
        // + or - before number

        // excaclty 2 decimal points, comma sperating the thousands
        num= Math.abs(num);
        num = num.toFixed(2); // string으로 바뀜. decimal 찍고

        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];
        if(int.length >3){
            int = int.substr(0,int.length-3) +',' +int.substr(int.length-3, 3); // (시작점, 그 시작점에서부터 개수)
        }
        type==='exp'? sign = '-' : sign = '+';
        
        return ( type==='exp'? '-' :'+') + ' ' + int + '.'+dec;
    };
    var nodeListForEach = function(list,callback){
        for(var i=0; i<list.length;i++){
            callback(list[i],i); //재귀 함수.
        }
    }

    return {
        getinput:function(){
            return {
                type : document.querySelector(DOMstring.inputType).value, //inc or exp
                description: document.querySelector(DOMstring.inputDescription).value, //어디다 썼냐
                val : parseFloat(document.querySelector(DOMstring.inputValue).value) //얼마 썼냐
            }
        },

        addListItem:function(obj, type){
            var html, newHtml;
            //Creat HTML string with placeholder text
            if(type ==='inc'){
                element = DOMstring.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }else if(type ==='exp'){
                element =DOMstring.expensesContainer
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace the placeholder text with som actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);//https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML

        },

        deleteListItem: function(selectorID){

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el); //좀 이상하지만 js 에서는 이런 식으로 삭제를 한데. 부모한테 갔다가 자식을 삭제하는.
        },

        clearFields :function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstring.inputDescription + ', ' + DOMstring.inputValue);//한 번에 처리하자. 
            fieldsArr = Array.prototype.slice.call(fields); //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call#%ED%95%A8%EC%88%98_%ED%98%B8%EC%B6%9C_%EB%B0%8F_'this'%EB%A5%BC_%EC%9C%84%ED%95%9C_%EB%AC%B8%EB%A7%A5_%EC%A7%80%EC%A0%95%EC%97%90_call_%EC%82%AC%EC%9A%A9
                                                            //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
            fieldsArr.forEach(function(current){
                current.value = "";
            })
            fieldsArr[0].focus(); //커서를 description쪽으로 옮기는 것.
        },
        displayBudget :function(obj){
            obj.budget >=0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstring.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstring.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage
            if(obj.percentage >=0){
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstring.percentageLabel).textContent = '---';
            }
        },

        displayPercentages : function(percentages){

            var fields = document.querySelectorAll(DOMstring.expensePercLabel);//nodelist. 

            nodeListForEach(fields,function(current, index){
                if(percentages[index] > 0){
                current.textContent = percentages[index] + '%';
                }else{
                    current.textContent = '---';
                }
            });
        },

        
        displayMonth : function(){
            var now ,year , month, months,
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth()
            document.querySelector(DOMstring.dataLabel).textContent = (month+1) +'월' + ' '+ year+'년';
            
        },

        changeType:function(){
            var fields = document.querySelectorAll(
                DOMstring.inputType + ',' +
                DOMstring.inputDescription +',' +
                DOMstring.inputValue
                );
            nodeListForEach(fields ,function(cur){
                cur.classList.toggle('red-focus'); //css 파일에 이미 만들어져있음.
            })
            document.querySelector(DOMstring.inputBtn).classList.toggle('red');
        },

        //다른 모듈에게도 전해주기 위해서.
        getDOMstring: function(){
            return DOMstring;
        }

    }
})();

//서로 연관이 없는 모듈 2개의 행동을 이어주기 위한 다리 역할
var controller = (function(budgetCtrl, UICtrl){

    //Event 관련된 것들을 전부 모아 하나의 func 로 만들어주자.
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstring();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        //key press --> 따로 html 상에 쿼리가 있는 것이 아님. 
        document.addEventListener('keypress', function(event){
            //enter 의 keycode 가 13이다.
            if(event.keyCode ===13||event.which ===13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem); // event delegation 

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };

    var updateBudget = function(){
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. return the budget
        var budget = budgetController.getBudget();

        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentage = function(){

        //1. Calculate the percentage for each
        budgetCtrl.calculatePercentages();

        // 2. return the percentage 
        var percentages = budgetCtrl.getPercentages();

        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function(){
        var input, newItem;

        //1. Get the field input data
        input = UICtrl.getinput(); //--> 매개변수 없는 함수라서 바로 () 연산을 통해 호출.
        
        if(input.description !== "" && !isNaN(input.val) && input.val >0){
            //2. Add the item to the budget controller
            newItem= budgetCtrl.addItems(input.type, input.description, input.val)
            
            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type); 
            
            //3-2. clear the field
            UICtrl.clearFields();

            //4. Calculate and update budget
            updateBudget();
            console.log("It works");

            //5. Calculate and update percentage 
            updatePercentage();
        }
    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;//DOM traverse, 부모 요소 container 를 들고왔음 event에 
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete the item from data structure 
            budgetCtrl.deleteItems(type, ID);

            //2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            //3 . update and show the new Budget
            updateBudget();
            
            //4. Calculate and update percentage 
            updatePercentage();

        }
    };

    return {
        init : function(){
            console.log('Application started');
            UICtrl.displayMonth();
            UICtrl.displayBudget(
                {
                budget : 0,
                totalInc : 0,
                totalExp: 0,
                percentage :'---',
                } );
            setupEventListeners();
            }
        }
    
    
})(budgetController, UIController);

//return 으로 객체를 주고 init 메소드를 시작!
controller.init();



/* event delegation
event bubbling --> target element --> event delegation
부모에 접근하면 자식한테까지 접근이 가능함. 
bubbling or capture
https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%9C%84%EC%9E%84---event-delegation
*/