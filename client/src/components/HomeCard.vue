<script>
import { mapActions, mapWritableState } from 'pinia'
import { useMainStore } from '../stores/main'

export default{
    computed:{
        ...mapWritableState(useMainStore, ["translate"])
    },
    props: ["status"],
    methods:{
        ...mapActions(useMainStore, ["postDetails", "translateStatus"]),

        getDate(date){
            return String(date).substring(0,10)
        },

        imageUrl(url){
            return `data:image/png;base64,${url}`
        },

    }
}
</script>

<template>
<!-- Status Cards -->
            <div class="rounded  overflow-hidden shadow-lg bg-white mb-2">
                <div class="px-6 py-4">
                    <div class="flex flex-row">
                        <div class="basis-1/12 ">
                            <img class="rounded-full w-10 my-auto" v-bind:src=status.User.displayPic alt="">
                        </div>
                        <div class="basis-8/12">
                            <div class="font-bold text-l px-2">{{status.User.username}}</div>
                            <div class="mb-2 px-2">{{getDate(status.createdAt)}}</div>
                        </div>

                        <div class="flex flex-row mt-2">
                            <span class="inline-block px-3 py-1 text-sm text-center font-bold text-purple-700 mr-2 mb-2"><button @click="translateStatus(status.content)">Translate</button></span>
                        </div>

                        <div class="flex flex-row mt-2">
                            <span class="inline-block px-3 py-1 text-sm text-center font-bold text-orange-700 mr-2 mb-2"><button @click="postDetails(status.id)">Read More</button></span>
                        </div>

                      </div>

                      <!-- Status  -->
                    <div class="flex flex-row">
                        <p class="text-gray-700 text-base" style="white-space: pre-wrap;">
                            {{status.content}}
                        </p>
                    </div>

                    <div class="flex flex-row">
                        <img  v-if=" status.imageUrl " class="mx-auto my-3 w-1/3" :src="imageUrl(status.imageUrl)" alt="???">
                    </div>

                </div>
            </div>
</template>