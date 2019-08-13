import axios from 'axios';
import {key, proxy} from '../config'

export default class Search{
    constructor(query){ //생성자
        this.query = query;

    }

    async getResults(){
        try{
            // fetch 랑 비슷한데, 더 좋데! 다운 받아야 하는 모듈임. json 데이터를 자동으로 retunn 해준데, 그리고 모든 브라우저에서 적용이 가능하댜. error handling 에도 좋데!
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`) 
            this.results =  res.data.recipes;
            //console.log(this.results);
        }catch(error){
            alert(error);
        }
    }

}