<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
import CommentCard from '../components/CommentCard.vue';
import WriteComment from '../components/WriteComment.vue';

export default{
    data() {
        return {
            username: localStorage.getItem("name"),
            displayPic: localStorage.getItem("displayPic")
        };
    },
    computed: {
        ...mapState(useMainStore, ["oneStatus", "isLogIn"])
    },
    methods: {
        ...mapActions(useMainStore, ["postDetails"]),

        getDate(date) {
            return String(date).substring(0, 10);
        },

        imageUrl(url){
            return `data:image/png;base64,${url}`
        },
    },
    components: { CommentCard, WriteComment },
    
    created(){
        console.log(this.oneStatus, '><><><><>');
        this.postDetails(this.oneStatus.id)
    },
    mounted(){
        this.postDetails(this.oneStatus.id)
    },
    
}
</script>

<template>
<!-- Status Cards -->
            <div class="rounded  overflow-hidden shadow-lg bg-white mb-2">
                <div class="px-6 py-4">
                    <div class="flex flex-row">
                        <div class="basis-1/12 ">
                            <img class="rounded-full w-10 my-auto" v-bind:src=oneStatus.User.displayPic alt="">
                        </div>
                        <div class="basis-9/12">
                            <div class="font-bold text-l px-2">{{oneStatus.User.username}}</div>
                            <div class="mb-2 px-2">{{getDate(oneStatus.createdAt)}}</div>
                        </div>

                      </div>

                      <!-- Status  -->
                    <div class="flex flex-row">
                        <p class="text-gray-700 text-base" style="white-space: pre-wrap;">
                            {{oneStatus.content}}
                        </p>

                        
                    </div>

                    <div class="flex flex-row">
                        <img  v-if="oneStatus.imageUrl " class="mx-auto my-3 w-1/3" :src="imageUrl(oneStatus.imageUrl)" alt="???">
                    </div>

                </div>
            </div>

<WriteComment :id="oneStatus.id" v-if="isLogIn"/>

<!-- Comments -->

<CommentCard v-for="comment in oneStatus.Comments" :comment="comment" />

</template>