<script>
import axios from "axios";
export default {
  data() {
    return {
      weatherData: null,
      error: "",
      
    };
  },
  computed: {
    city() {
      return this.$route.params.city;
    },
  },
  mounted() {
    this.fetchWeatherDetails();
  },
  methods: {
    fetchWeatherDetails() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=baccc13178cdfa5a0b494b060c8d7e8f`
        )
        .then((res) => {
          this.weatherData = res.data;
        })
        .catch((err) => {
          console.error("Error fetching detailed weather:", err);
          if (err.response && err.response.status === 404) {
            this.error =
              "City not found! Please check that the input is correct.";
          } else {
            this.error =
              "Сталася помилка при отриманні даних. Спробуйте пізніше.";
          }
        });
    },
  },
};
</script>

<template>
  <p class="error">{{ error }}</p>
  <div class="detail-wrap" v-if="weatherData">
    <h2>Weather Details for {{ city }}</h2>
    <img
      v-if="weatherData"
      :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
      alt="Weather Icon"
    />
    <p>Description: {{ weatherData.weather[0].description }}</p>
    <p>Temperature: {{ weatherData.main.temp }}°C</p>
    <p>Fells like: {{ weatherData.main.feels_like }}°C</p>
    <p>Minimum temperature: {{ weatherData.main.temp_min }}°C</p>
    <p>Maximum temperature: {{ weatherData.main.temp_max }}°C</p>
    <p>Wind speed: {{ weatherData.wind.speed }}m/s</p>
    <p>Wind direction: {{ weatherData.wind.deg }}°</p>
    <p>Humidity: {{ weatherData.main.humidity }}%</p>
    <p>Pressure: {{ weatherData.main.pressure }} hPa</p>
  </div>
</template>

<style skoped>
.detail-wrap {
  text-align: center;
  padding: 20px;
  background-color: aquamarine;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
