import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []
    }

    addItem(count, unit, ingredient){
        const item  = {
            id : uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item)
        return item;
    }

    deleteItem(id) {

        const index = this.items.findIndex(el => el.id === id);
        // [2,4,8] splice(1,2) 1번 인덱스에서 시작해서 얼마나 많이 가져올꺼냐.--> return [4,8] , original array - [2]
        // [2,4,8] slice(1,2) 1번 인덱스에서 2번 미만까지.--> return 4, original array - [2,4,8]
        this.items.splice(index, 1)
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount
    }


}
