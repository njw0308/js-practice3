import axios from 'axios';
import {key, proxy} from '../config'


export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    
    async getRecipe() {
        try{
            const res = await  axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`) 
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url
            this.url = res.data.recipe.source_url
            this.ingredients = res.data.recipe.ingredients

            console.log(res);
        }catch(error){
            console.log(error)
        }
    }

    calcTime() {
        const numIng = this.ingredients.length
        const periods=  Math.ceil(numIng /3)
        this.time = periods * 15
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units  = [...unitShort, 'kg' , 'g'];

        //map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 '함수를 호출한 결과를 모아' 새로운 배열을 반환합니다
        const newIngredients = this.ingredients.map(el => {
            // 단위를 일치화
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit , i) => {
                ingredient = ingredient.replace(unit , unitShort[i])
            })
            // 괄호들 삭제
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");            

            // 파싱
            const arrIng = ingredient.split(' ')
            //findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 만족하는 요소가 없으면 -1을 반환합니다
            //includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다. return 은 true or false.
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2))
            
            let objIng;
            if(unitIndex > -1) {
                //unit 이 있는 경우
                const arrCount = arrIng.slice(0, unitIndex)
                
                let count;
                if (arrCount.length ===1){
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    //eval() 은 문자로써 표현된 자바스크립트 코드를 실행하는 함수입니다.
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }
                objIng = {
                    count, //이미 위에 정의되 있으니까 이렇게 써도 알아서 객체처럼 표현됨.
                    unit : arrIng[unitIndex],
                    ingredient : arrIng.slice(unitIndex+1).join(' ')
                }

            }else if(parseInt(arrIng[0] , 10)) {
                // unit이 없지만 , element 가 number인 경우
                objIng = {
                    count : parseInt(arrIng[0] , 10),
                    unit : '',
                    ingredient : arrIng.slice(1).join(' ')
                }
            }
            else if(unitIndex ===-1) {
                //unit 이 없는 경우, number도 아닌 경우
                objIng = {
                    count : 1,
                    unit : '',
                    ingredient 
                }
            }

            return objIng
        })
        this.ingredients = newIngredients
    }

    updateServings (type) {
        // servings
        const newServings = type === `dec`? this.servings - 1 : this.servings +1;

        //ingredients - 우리가 파싱했던 array 
        this.ingredients.forEach( ing => {
            ing.count = ing.count * (newServings / this.servings )
        })

        this.servings = newServings
    }
}
