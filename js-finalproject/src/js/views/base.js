export const elements = {
    searchInput : document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchRes : document.querySelector('.results'),
    searchResList : document.querySelector('.results__list'),
    searchResPages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    shopping : document.querySelector('.shopping__list'),
    likesMenu : document.querySelector('.likes__field'),
    likesList : document.querySelector('.likes__list')
}

export const elementString = {
    loader : 'loader',
}

// loading motion. 
export const renderLoader = parent => {
    const loader = `
    <div class="${elementString.loader}">
        <svg>
            <use href = "img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

// loading 이 완료되면 loading motion 을 없애줘야지.
export const clearLoader = () => {
    const loader  = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}