<script>
import axios from "axios";
import { VTextField } from "vuetify/components";

export default {
  components: {
    VTextField,
  },
  data() {
    return {
      city: "",
      error: "",
      cities: [],
    };
  },
  computed: {
    cityName() {
      return "<" + this.city + ">";
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
        .then((res) => {
          this.cities.push({
            name: this.city,
            temp: res.data.main.temp,
            feels_like: res.data.main.feels_like,
            humidity: res.data.main.humidity,
          });
          this.city = "";
        })
        .catch((err) => {
          this.error = "City not found!";
        });
    },
    removeCard(index) {
      this.cities.splice(index, 1);
    },
  },
};
</script>

<template>
  <div class="wrap">
    <h1>Weather applications</h1>
    <p>Find the weather in {{ city.length === 0 ? "your city" : cityName }}</p>
    <v-text-field
      v-model="city"
      label="Enter City"
      @keyup.enter="getWeather"
      outlined
      class="mb-3"
      style="width: 50%; margin: auto"
    ></v-text-field>
    <p>{{ error }}</p>
    <button class="btn-enter" @click="getWeather" v-if="city !== ''">
      Get the weather
    </button>
    <button class="btn-enter" v-else>Enter the city</button>
   
    <div class="cards">
      <div
        v-for="(city, index) of cities"
        :key="city.name"
        class="show-temp"
        v-if="this.cities.length > 0"
      >
        <h2>{{ city.name }}</h2>
        <button class="btn-remove" @click="removeCard(index)">x</button>
        <p>Temp: {{ city.temp }}</p>
        <p>Feels like: {{ city.feels_like }}</p>

        <button
          class="btn-full_info"
          @click="
            $router.push({ name: 'WeatherDetail', params: { city: city.name } })
          "
        >
          Full report
        </button>
      </div>
    </div>
  </div>
</template>
<style skoped>
.wrap {
  height: 600px;
  width: 1000px;
  text-align: center;
  background-color: cadetblue;
  color: bisque;
  border-radius: 50px;
}
.cards {
  display: flex;
  justify-content: space-around;
  gap: 10px;
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
.btn-enter {
  background-color: blue;
  border: none;
  width: 140px;
  height: 25px;
  border-radius: 5px;
}
.btn-enter:hover {
  background-color: darkblue;
}
.error {
  color: red;
  font-size: 20px;
  margin-top: 10px;
}
.show-temp {
  margin-top: 20px;
  position: relative;
  border: 2px solid gray;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  color: black;
}
.btn-remove {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  width: 20px;
  height: 20px;
}
.btn-full_info {
  position: relative;
  border: none;
  background: white;
  width: 100%;
  cursor: pointer;
}
.btn-full_info::before {
  position: absolute;
  content: "";
  top: -5px;
  left: 0px;
  width: 100%;
  height: 1px;
  background: gray;
}
</style>
