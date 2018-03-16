import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';

Vue.use(VueSocketIO, 'http://127.0.0.1:4000');

// Vue.component('navbar', Navbar);
// Vue.component('chat', Chat);

new Vue({
  el: '#app',
  render: h => h(App)
});

// Vue-Socket.io
// https://github.com/MetinSeylan/Vue-Socket.io