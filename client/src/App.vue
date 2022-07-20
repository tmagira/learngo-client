<script>
import { RouterLink, RouterView } from "vue-router";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
import News from "./components/News.vue";

export default{
    components: { SideBar, Footer, News }
}
</script>

<template>
    <!-- Main Menu -->
    <main class="flex flex-col">
        <div class="flex overflow-hidden">

        <!-- Sidebar -->
        <SideBar />
          
          
        <!-- Homepage -->
        <section class="p-5" style="width:900px">

          <router-view />
          

           
                
        </section>

        <section>
            <!-- News -->
            <News />
            
        </section>

 
        
        </div>

        <!-- Footer -->
        <Footer />

      </main>
 
    
</template>

