<template>
  <div class="h-screen">
    <div  class="chat h-5/6 bg-blue-main overflow-y-scroll ">
      <div v-for="message in messages" :key="message.id" class="messages flex py-2">
        <div class="sender flex-0 max-w-xs p-1">
          <p class="text-white">
            {{ message.name ? message.name : 'Anonymous' }}
          </p>
          <p>
            {{ message.created_at }}
          </p>
        </div>
        <div class="flex message divide-white bg-white flex-0 p-1 rounded-full">
          <p class="message-text text-black">
            {{ message.message }}
          </p>
        </div>
      </div>
    </div>
    <form class="flex" @submit.prevent="onSendMessage">
      <input class="flex-1 p-2" type="text" v-model="newMessage" />
      <button class="p-2 bg-blue-500 text-white" type="submit">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getProfileByUserId } from '~~/api/profile.js';
import { sendMessage, getMessages, subscribeToNewMessages } from '~/api/messages';
import { useMessagesStore } from '~~/store/messages';
import { Messages } from "~~/types/messages"
import { formatDate } from '~~/utils';

const client = useSupabaseClient()
const user = useSupabaseUser()

let newMessage = ''

// get profile data
const profile = await getProfileByUserId(user.value?.id ? user.value.id : '') 

// Get the messages from the database
let messagesResponse = await getMessages()
useMessagesStore().setMessages(messagesResponse as Messages[])


// Subscribe to changes in the Messages table
const MessagesChannel = subscribeToNewMessages(user.value?.id ? user.value.id : '')

// Create a ref to store the messages
const messages = useMessagesStore().messages

// Function to send messages
async function onSendMessage(id: number){
    // Todo: clean up alert
    if(!profile || !user.value) {
      alert('Something went wrong !')
      return 
    }
    if(!newMessage) {
      alert('Please enter a message !')
      return 
    }
    const result = await sendMessage(newMessage, user.value.id, profile.id)
    // Add the message to the messages array
    if(result) {
      alert('Something went wrong !')
      return 
    }
    if(!messages) {
      useMessagesStore().setMessages([{id: id++ + '', name: profile.name, message: newMessage, created_at: formatDate(new Date())}])
    } else {
      useMessagesStore().addNewMessage({id: id++ + '', name: profile.name, message: newMessage, created_at: formatDate(new Date())})
    }

  // Clear the input field
  newMessage = ''  

}

// Unsubscribe when user left the page
onUnmounted(() => {
  client.removeChannel(MessagesChannel)
})
</script>

<style scoped>
* {}
</style>