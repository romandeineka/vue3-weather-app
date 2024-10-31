<script>
import axios from "axios";

export default {
  data() {
    return {
      city: "",
      error: "",
      info: null,
    };
  },
  computed: {
    cityName() {
      return "<" + this.city + ">";
    },
    showTemp() {
      return "Temperature: " + this.info.main.temp;
    },
    showFeelsLike() {
      return "It feels like: " + this.info.main.feels_like;
    },
    showMiniTemp() {
      return "Minimum temperature: " + this.info.main.temp_min;
    },
    showMaxTemp() {
      return "Maximum Temperature: " + this.info.main.temp_max;
    },
  },
  methods: {
    getWeather() {
      if (this.city.trim().length < 2) {
        this.error = "The length of the city must be more than 1 character";
        return;
      }
      this.error = "";

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=baccc13178cdfa5a0b494b060c8d7e8f`
        )
        .then((res) => (this.info = res.data));
    },
  },
};
</script>

<template>
  <div class="wrap">
    <h1>Weather applications</h1>
    <p>Find the weather in {{ city.length === 0 ? "your city" : cityName }}</p>
    <input v-model="city" type="text" />
    <p class="error">{{ error }}</p>
    <button @click="getWeather()" v-if="city !== ''">Get the weather</button>
    <button v-else>Enter the city</button>

    <div class="show-temp" v-if="this.info !== null">
      <p>{{ showTemp }}</p>
      <p>{{ showFeelsLike }}</p>
      <p>{{ showMiniTemp }}</p>
      <p>{{ showMaxTemp }}</p>
    </div>
  </div>
</template>

<style>
.wrap {
  height: 600px;
  width: 1000px;
  text-align: center;
  background-color: black;
  color: bisque;
  border-radius: 50px;
}

.wrap h1 {
  padding-block: 30px;
}
.wrap p {
  margin-bottom: 20px;
}
.wrap input {
  outline: none;
  width: 200px;
  height: 25px;
  border: none;
  border-radius: 5px;
  padding-inline: 5px;
  font-size: 18px;
  margin-right: 15px;
}
.wrap input:focus {
  background-color: dimgray;
}
.wrap button {
  background-color: yellow;
  border: none;
  width: 140px;
  height: 25px;
  border-radius: 5px;
}
.wrap button:hover {
  background-color: chocolate;
}
.error {
  color: red;
  margin-top: 10px;
}
.show-temp {
  margin-top: 20px;
}
</style>
