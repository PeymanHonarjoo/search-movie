<template lang="">
  <div align="center">
    <Card align="center" style="width: 50%; margin-top: 2rem">
      <template #title>
        Movie details
        <v-row
          class="d-flex justify-center"
          style="width: 60%; margin-top: 1rem"
        >
          <v-col cols="12" sm="12" md="6" class="pa-0">
            <v-text-field
              label="Enter movie's name"
              variant="outlined"
              color="blue-darken-2"
              v-model="inputValue"
              @keyup.enter="getMovie()"
              @keyup="getTitle()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="pa-0">
            <v-text-field
              variant="outlined"
              label="Year"
              color="blue-darken-2"
              class="rounded"
              v-model="yearValue"
              @keyup.enter="getMovie()"
              @keyup="getTitle()"
            />
          </v-col>
          <v-col cols="12" sm="6" md="1" class="pa-0">
            <Dropdown
              v-model="selectedPlot"
              :options="plot"
              optionLabel="name"
              placeholder="Plot"
            />
          </v-col>
          <v-col
            cols="12"
            class="pa-0 mb-2"
            v-if="showTitle && inputValue !== ''"
          >
            <Menu style="width: 80%" v-if="showTitle && inputValue !== ''">
              <template #start>
                <button
                  @click="searchMovie"
                  class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
                >
                  <Avatar
                    :image="movieDetails.Poster"
                    class="mr-2"
                    shape="circle"
                    size="xlarge"
                  />
                  <div class="flex flex-column align">
                    <span class="font-bold"> {{ movieDetails.Title }} </span>
                    <span class="text-sm"> {{ movieDetails.Genre }} </span>
                    <span class="text-sm"> {{ movieDetails.Released }} </span>
                  </div>
                </button>
              </template>
            </Menu>
          </v-col>
          <v-col class="pa-0">
            <Button
              icon="pi pi-search"
              label="Search"
              severity="warning"
              @click="getMovie"
            />
          </v-col>
        </v-row>
      </template>
      <template #content>
        <div
          class="card flex align-items-center justify-content-center"
          v-if="isSearched && inputValue !== ''"
        >
          <Card style="width: 60%">
            <template #header>
              <img alt="user header" :src="movieDetails.Poster" />
            </template>
            <template #title> {{ movieDetails.Title }} </template>
            <template #subtitle> {{ movieDetails.Genre }} </template>
            <template #content>
              <div class="text-left px-3">
                Release Date: {{ movieDetails.Released }}<br />
                Writer: {{ movieDetails.Writer }}<br />
                Type:
                <span class="text-capitalize">{{ movieDetails.Type }}</span>
                <br />
                <span v-if="movieDetails.Type === 'series'">
                  Total Seasons: {{ movieDetails.totalSeasons }}</span
                >
                <br v-if="movieDetails.Type === 'series'" />
                <p>Plot: {{ movieDetails.Plot }}</p>
                <div class="d-flex flex-sm-row">
                  <span class="mr-1 d-xs-none">Rating: </span>
                  <Rating v-model="rating" readonly :cancel="false" />
                  <!-- <v-rating
                    v-model="rating"
                    bg-color="orange-lighten-1"
                    color="blue"
                  ></v-rating> -->
                </div>
              </div>
            </template>
            <template #footer> </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "WeatherDetail",
  data() {
    return {
      inputValue: "",
      yearValue: "",
      movieDetails: [],
      isSearched: false,
      title: [],
      showTitle: false,
      selectedPlot: "",
      plot: [{ name: "Short" }, { name: "Full" }],
      rating: 0,
    };
  },
  methods: {
    getMovie() {
      axios
        .get(
          `http://www.omdbapi.com/?t=${this.inputValue}&y=${this.yearValue}&plot=${this.selectedPlot.name}&apikey=7e688678`
        )
        .then((response) => {
          this.movieDetails = response.data;
          this.rating = this.movieDetails.imdbRating / 2;
          this.isSearched = true;
          this.showTitle = false;
          console.log(this.rating);
        });
    },
    getTitle() {
      axios
        .get(
          `http://www.omdbapi.com/?t=${this.inputValue}&y=${this.yearValue}&plot=${this.selectedPlot.name}&apikey=7e688678`
        )
        .then((response) => {
          this.movieDetails = response.data;
          if (this.title.length === 0) {
            this.title.push({ label: this.movieDetails.Title });
          } else {
            this.title.shift();
            this.title.push({ label: this.movieDetails.Title });
          }
          if (this.title[0].label !== undefined && !this.isSearched) {
            this.showTitle = true;
          }
        });
    },
    searchMovie() {
      axios
        .get(
          `http://www.omdbapi.com/?t=${this.title[0].label}&y=${this.yearValue}&plot=${this.selectedPlot.name}&apikey=7e688678`
        )
        .then((response) => {
          this.movieDetails = response.data;
          this.rating = this.movieDetails.imdbRating / 2;
          this.isSearched = true;
          this.showTitle = false;
          console.log(this.isSearched);
          console.log(this.rating);
        });
    },
  },
  watch: {
    inputValue() {
      if (this.inputValue === "" && this.isSearched === true) {
        this.isSearched = false;
        console.log(this.isSearched);
      }
    },
  },
};
</script>
<style lang=""></style>
