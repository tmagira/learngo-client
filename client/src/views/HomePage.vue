<script>
import SearchBar from "../components/SearchBar.vue";
import WriteStatus from "../components/WriteStatus.vue";
import HomeCard from "../components/HomeCard.vue";
export default{
    name: "HomePage",
    components: { SearchBar, WriteStatus, HomeCard }
}
</script>

<template>
            <SearchBar />
            <WriteStatus />

            <HomeCard />

</template>