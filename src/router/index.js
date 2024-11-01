import { createRouter, createWebHistory } from "vue-router";
import WeatherDetail from "../components/WeatherDetail.vue";
import Home from "@/components/Home.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: "/weather/:city",
    name: "WeatherDetail",
    component: WeatherDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;