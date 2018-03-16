<template>
    <div class="row">
      <div class="col-md-6 offset-md-3 col-sm-12">
        <h1 class="text-center">
          Simple Chat
          <button v-on:click="clearChat" class="btn btn-danger">Clear</button>
        </h1>
        <div v-if="notification" v-bind:class="alertClass" class="alert" role="alert">{{ notification }}</div>
        <div id="chat">
          <input type="text" v-model="username" class="form-control" placeholder="Enter name...">
          <br>
          <div class="card">
            <div class="card-block">
              <div id="messages-container">
                <div class="chat-message" v-for="message in messages" :key="message._id">
                  <b>{{ message.name }}:</b> {{ message.message }}
                </div>
              </div>
            </div>
          </div>
          <br>
          <input type="text" v-model="messageToSend" v-on:keyup.enter="sendMessage" id="textarea" class="form-control" placeholder="Enter message...">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
      notification: '',
      alertClass: 'alert-info',
      username: '',
      messageToSend: '',
      messages: []
    }
  },
  methods: {
    showNotification (data) {
      this.notification = data.message;
      this.alertClass = data.alertClass;
      setTimeout(() => {
        this.notification = '';
        this.alertClass = '';
      }, 4000);
    },
    sendMessage (event) {
      if (event.which === 13 && event.shiftKey == false) {
        let newMessage = {
          name: this.username,
          message: this.messageToSend
        };
        this.$socket.emit('input', newMessage);
        this.messageToSend = '';
        this.messages.push(newMessage);
        // console.log('Message successfully sent');
      }
    },
    clearChat() {
      this.$socket.emit('DeleteAllMessages');
    }
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    output (data) {
      if (data.length) {
        this.messages = data;
      }
    },
    notification (data) {
      // Show notification
      this.showNotification(data);
    },
    cleared() {
      // Clear all messages
      this.messages = [];
    }
  }
}
</script>

<style>
  #messages-container {
    height: 300px;
    padding: 5px;
    overflow-y: auto;
  }

  .chat-message {
    padding-top: 3px;
  }
</style>
