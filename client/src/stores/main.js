import { defineStore } from "pinia";
import axios from 'axios';
import Swal from 'sweetalert2';

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    news: [],
    isLogIn: false,
    user:{
      name: '',
      img: ''
    },
    statusForm: {
      content: ''
    },
    allStatus:[],
    oneStatus:{},
    commentForm:{
      content: '',
      postId: 0
    },
    

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    checkLogin(){
      if(localStorage.getItem('access_token')){
        this.isLogIn = true
      }
    },

    changePage(page){
      if(page=='/login' && this.isLogIn){
        localStorage.clear()
        this.isLogIn=false
      }
      console.log('page')
      this.router.push(page)
    },

    async getNews(){
      let data = await axios.get('https://learngo-en-jp.herokuapp.com/news')
      data = data.data.data

      this.news = []
      
      for(let i=0; i<5; i++){
        this.news.push(data[i])
      }

      console.log(this.news)

    },

    async googleSignIn(){
      try { 
        const gtoken = localStorage.getItem('google_token')

        const customer = await axios.post('https://learngo-en-jp.herokuapp.com/login', {}, {headers: {
          google_token: gtoken
        }})

        console.log(customer.data, "<<<<")

        localStorage.setItem('access_token', customer.data.access_token)
        localStorage.setItem('name', customer.data.username)
        localStorage.removeItem('google_token')

        this.isLogin = true
        this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    },

    async newStatus(){
      try {
        let formData = new FormData();
        formData.append('imageInput', this.statusForm.img);
        formData.append('content', this.statusForm.content)

        await axios.post('https://learngo-en-jp.herokuapp.com/newStatus', formData, {headers: {
          access_token: localStorage.getItem('access_token')
        }})

        this.statusForm.content = ''
        this.statusForm.imageUrl = ''

        this.getAll()
      } catch (error) {
        console.log(error)
      }
    },

    imageHandler(e){
      var files = e.target.files;
      this.statusForm.img = files[0]; 
      console.log(this.statusForm) 
    },

    async getAll(){
      try {
        const all = await axios.get('https://learngo-en-jp.herokuapp.com/all')
        this.allStatus = all.data.data
        console.log(this.allStatus)
      } catch (error) {
        console.log(error)
      }
    },

    async postDetails(id){
      try {
        console.log(id, "888")
        const status = await axios.get('https://learngo-en-jp.herokuapp.com/status/'+id)

        this.oneStatus = status.data.message
        console.log(this.oneStatus)
        this.router.push("/read")
      } catch (error) {
        console.log(error)
      }
    },

    async writeComment(id){
      try {
        console.log(id,"<<")
        await axios.post('https://learngo-en-jp.herokuapp.com/newComment', {
          content: this.commentForm.content,
          postId: id
        }, {headers: {
          access_token: localStorage.getItem('access_token')
        }})

        this.commentForm.content = ''

        

      } catch (error) {
        console.log(error)
      }
    },

    
    async translateStatus(status){
      try {
        console.log(status)
        const data = await axios.get('https://learngo-en-jp.herokuapp.com/trans/?status='+status)
        
        Swal.fire('Japanese Translation: ' + data.data.result)
        
      } catch (error) {
        console.log(error)
      }
    },


  },
});
