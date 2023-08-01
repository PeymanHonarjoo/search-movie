<template>
  <div class="home">
    <Movie />
  </div>
</template>

<script>
// @ is an alias to /src
import Movie from "../components/MovieDetail.vue";
export default {
  name: "HomeView",
  components: { Movie },
};
</script>
