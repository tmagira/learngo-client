import { defineStore } from "pinia";
import axios from 'axios';

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    news: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    changePage(page){
      console.log('page')
      this.router.push(page)
    },

    async getNews(){
      const options = {
        method: 'GET',
        url: 'https://east-china-news.p.rapidapi.com/japan',
        headers: {
          'X-RapidAPI-Key': 'd1a4221978msh5fbc3b65fc94825p195a8ajsna694357f70a6',
          'X-RapidAPI-Host': 'east-china-news.p.rapidapi.com'
        }
      };

      let data = await axios.request(options)
      data = data.data

      this.news = []
      
      for(let i=0; i<5; i++){
        this.news.push(data[i])
      }

      console.log(this.news)

    },

    
  },
});
