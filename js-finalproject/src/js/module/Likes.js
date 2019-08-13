export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }
        this.likes.push(like)
        this.persistData()
        return like

    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id) 
        this.likes.splice(index, 1)
        this.persistData()
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1 
    }

    getNumLikes() {
        return this.likes.length
    }

    //locacl storage 에 저장하는 방법.
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))

    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'))
        
        // local storage를 통해 likes 수정.
        if (storage) this.likes = storage

    }

    
}