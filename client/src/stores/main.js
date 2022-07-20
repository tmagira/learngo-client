import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    changePage(page){
      console.log('page')
      this.router.push(page)
    },
    
  },
});
