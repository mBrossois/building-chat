<template>
    <div ref="chat" class="chat main-screen-height overflow-y-scroll ">
      <div v-for="message, index in messages" :key="index" class="messages flex py-2">
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
    <MessageBox @send-message="onSendMessage"></MessageBox>
</template>

<script setup lang="ts">
import { getProfileByUserId } from '~~/api/profile.js';
import { sendMessage, getMessages, subscribeToNewMessages, getMessagesLength } from '~/api/messages';
import { useMessagesStore } from '~~/store/messages';
import { Messages } from "~~/types/messages"
import { formatDate } from '~~/utils';

const client = useSupabaseClient()
const user = useSupabaseUser()

const chat = ref()

// get profile data
const profile = await getProfileByUserId(user.value?.id ? user.value.id : '') 

// Get length of messages
const messagesLength = await getMessagesLength()

// Get the messages from the database
let messagesResponse = await getMessages()
useMessagesStore().setMessages(messagesResponse as Messages[])

// Subscribe to changes in the Messages table
const MessagesChannel = subscribeToNewMessages(profile?.id ? profile.id : '')

// Create a ref to store the messages
const messages = useMessagesStore().messages

// Scroll to the bottom of the chat when a new message is added
watch(messages, () => {
  chat.value.scrollTop = chat.value.scrollHeight
})

// Function to send messages
async function onSendMessage(newMessage: string){
    // Todo: clean up alert
    if(!profile) {
      alert('Something went wrong !')
      return 
    }
    if(!newMessage) {
      alert('Please enter a message !')
      return 
    }
    const result = await sendMessage(newMessage, profile.id)
    // Add the message to the messages array
    if(result) {
      alert('Something went wrong !')
      return 
    }
    if(!messages) {
      useMessagesStore().setMessages([{name: profile.name, message: newMessage, created_at: formatDate(new Date())}])
    } else {
      useMessagesStore().addNewMessage({name: profile.name, message: newMessage, created_at: formatDate(new Date())})
    }
}

// Unsubscribe when user left the page
onUnmounted(() => {
  client.removeChannel(MessagesChannel)
})
</script>

<style scoped>
* {}
</style>