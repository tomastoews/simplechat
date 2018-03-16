<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <chat></chat>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Chat from './components/Chat.vue';

export default {
 components: {
   navbar: Navbar,
   chat: Chat
 } 
}
</script>
