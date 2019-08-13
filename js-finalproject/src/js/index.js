import Search from './module/Search'
import Recipe from './module/Recipe'
import List from './module/List'
import Likes from './module/Likes'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
import {elements, renderLoader, clearLoader} from './views/base'

/* global state of the app

1. search object
2. current recipe object
3. shopping list object
4. liked recpies

*/
const state = {};

const controlSearch = async ()=>{
    const query = searchView.getInput();

    if (query){
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearReuslt();
        renderLoader(elements.searchRes)

        try {
            await state.search.getResults();

            clearLoader();

            searchView.renderResults(state.search.results)
        } catch(error){
            console.log(error)
            alert('error')
            clearLoader()
        }
        
    }
}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
})



elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline') // "closest" 메소드. button 의 HTML 전체 DOM 을 다 갖고오는 것. 일부만 가져오는 것이 아니라.
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearReuslt();
        searchView.renderResults(state.search.results, goToPage)
    }
})

//Recipe controller
const controlRecipe = async () =>{
    // URL 에서 변하는 hash 값 얻어오기.
    const id = window.location.hash.replace('#', '');    
    
    if(id){
        
        recipeView.clearRecipe();
        renderLoader(elements.recipe) //loading motion
    
        // 선택된 item 강조하기.
        if (state.search) searchView.highlightedSelected(id)
    
        try {
            state.recipe = new Recipe(id)
            
            //---TESTING
            // console.log(state.recipe)  //--> 이미 parseIngredients() 함수가 적용된 얘가 console 에 찍히더라!
            // window.r = state.recipe
            // console.log('-----')
            // console.log(r)
            // console.log('------')
            //------TESTING END 

            await state.recipe.getRecipe(); //getRecipe 자체가 async function 임. --> promise 객체를 return 
            state.recipe.parseIngredients()


            state.recipe.calcTime()
            state.recipe.calcServings();


             // render recipe.
            clearLoader()
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))
  

        } catch (error){
            console.log(error)
            alert('error');
        }

    } 
}

//window.addEventListener('hashchange', controlRecipe);// hashchange 라는 하나의 event 
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)) // 2개의 event 를 하나로 묶음.

/* List controller */
const controlList = () => {
    // state 에 list를 새로 추가해주자.
    if( !state.list) state.list = new List();

    // list 에 추가시키기.
    state.recipe.ingredients.forEach( el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderItem(item)
    })
}

// list 에 있는 아이템들을 update 하고 delete 하기 .
elements.shopping.addEventListener('click', e => {
    //HTMLElement.dataset 속성은 HTML이나 DOM 요소의 커스텀 데이터 속성(data-*)에 대한 읽기와 쓰기 접근을 허용합니다.
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id)
        listView.deleteItem(id);

    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value)
        state.list.updateCount(id, val)
    }
})

/* like controller */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes()
    const currentID = state.recipe.id

    // 유저가 likes 했냐 안했냐에 따라 나누기.
    if (!state.likes.isLiked(currentID)) {
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img)
        likesView.toggleLikeBtn(true)
        likesView.renderLike(newLike)

    } else {
        state.likes.deleteLike(currentID)
        likesView.toggleLikeBtn(false)
        likesView.deleteLike(currentID)

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes())

}

// 페이지가 로드될 때.
window.addEventListener('load', () => {
    state.likes = new Likes()

    // restore likes 
    state.likes.readStorage()

    likesView.toggleLikeMenu(state.likes.getNumLikes())

    state.likes.likes.forEach( like => likesView.renderLike(like))
})



//handling recipe button click. (serving 줄이기 늘리기) + event delegation(더 큰 상위 recipe 에서 , 그 하위 자식들의 이벤트를 위임받아 처리해줌)
elements.recipe.addEventListener('click' , e => {
    // * 는 child element 를 의미. 
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredient(state.recipe)
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredient(state.recipe)
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        
        // 쇼핑리스트에 추가.
        controlList()
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //likecontroller
        controlLike()

    }

})

