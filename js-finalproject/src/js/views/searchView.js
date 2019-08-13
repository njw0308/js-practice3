import {elements} from './base'


export const getInput = () => elements.searchInput.value; // 하나의 value 만 return 하니까 괄호 없어두 됨.

export const clearInput = () => {
    elements.searchInput.value = ''
};

export const clearReuslt = () => {
    elements.searchResList.innerHTML = ''
    elements.searchResPages.innerHTML = '';
};


export const highlightedSelected = id => {

    //Array.from() 메서드는 유사 배열 객체(array-like object)나반복 가능한 객체(iterable object)를 얕게 복사해새로운Array 객체를 만듭니다.
    const resultsArr = Array.from(document.querySelectorAll('.results_link'))
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active')
    })

    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active'); // css style 을 위해 추가.
}

export const limitRecipeTitle = (title, limit = 17) => {
    if(title.length > limit){
        const newTitle = [];
        if(title.length > limit){
            title.split(' ').reduce((acc, cur) => {
                if (acc + cur.length <= limit){
                    newTitle.push(cur);
                }
                return acc + cur.length //얘는 모지? --> 화살표 함수가 한줄로 표현이 안되서 + reduce 의 리턴값
            }, 0)                          // --> 리듀서 함수의 반환 값은 '누산기(acc)에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 하나의 값이 됩니다.
        }

        return `${newTitle.join(' ')} ...`
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>  
    `
    elements.searchResList.insertAdjacentHTML('beforeend', markup)
};

//type : 'prev' or 'next' 
const createButton = (page, type) => {
    return ` 
    <button class="btn-inline results__btn--${type}" data-goto=${type ==='prev' ? page -1 : page +1}>
        <span>Page ${type ==='prev' ? page -1 : page +1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type ==='prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `
}

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage)
    let button;

    if(page ===1 && pages > 1){
        button = createButton(page, 'next')
    }else if(page <pages){
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
    }else if(page === pages){
        button = createButton(page, 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    
    const start = (page -1 ) * resPerPage
    const end= page * resPerPage
    recipes.slice(start, end).forEach(renderRecipe); // 주어진 함수(renderRecipe)를 배열 요소 각각에 대해 실행.

    renderButton(page, recipes.length, resPerPage);
};