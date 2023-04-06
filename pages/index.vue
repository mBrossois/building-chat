<script setup lang="ts">
import { ref } from 'vue';
const client = useSupabaseClient()
const user = useSupabaseUser()

// Get the messages from the database
// TODO: add users (email) to the messages
let { data: Messages, error } = await client
  .from('Messages')
  .select(`
    created_at, 
    message,
    sendByUser
  `)
  .range(0, 10)
  if(error) {
    console.log('error', error)
  }

// Subscribe to changes in the Messages table
const MessagesChannel = client.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'Messages' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// Unsubscribe when user left the page
onUnmounted(() => {
  client.removeChannel(MessagesChannel)
})

// Create a ref to store the messages
const messages = ref(Messages)

let newMessage = ''

// Function to send messages
async function sendMessage() {
  console.log(user.value)
  const { data, error } = await client
  .from('Messages')
  .insert([
    { message: newMessage, sendByUser: user.value.id },
  ])
  if (error) {
    console.log('error', error)
    return
  }

  // Add the message to the messages array
  if(!messages.value) {
    messages.value = [{sendByUser: user.value?.id, message: newMessage}]
  } else {
    messages.value.push({sendByUser: user.value?.id, message: newMessage})

  }

  // Clear the input field
  newMessage = ''
}


</script>

<template>
  <div class="h-screen">
    <div  class="chat h-5/6 bg-blue-main overflow-y-scroll ">
      <div v-for="message in messages" :key="message.id" class="messages flex py-2">
        <div class="sender flex-0 max-w-xs p-1">
          <p class="text-white">
            {{ message.sendByUser }}
          </p>
          <p>
            12:00
          </p>
        </div>
        <div class="flex message divide-white bg-white flex-0 p-1 rounded-full">
          <p class="message-text text-black">
            {{ message.message }}
          </p>
        </div>
      </div>
    </div>
    <form class="flex" @submit.prevent="sendMessage">
      <input class="flex-1 p-2" type="text" v-model="newMessage" />
      <button class="p-2 bg-blue-500 text-white" type="submit">Send</button>
    </form>
  </div>
</template>

<style>
.message::before {
  content: '';
  position: relative;
  top: .6rem;
  left: -.2rem;
  width: 1rem;
  height: 1rem;
  border-style: solid;
  border-width: 0 0 0 0;
  border-color: transparent transparent transparent transparent;
  background-color: white;
  transform: rotate(14deg);
}
</style>
