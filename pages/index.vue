<script setup lang="ts">
import { ref } from 'vue';
const client = useSupabaseClient()

// Check if user is allowed to access this page
const { data } = await useAsyncData('Messages', async () => {
  const { data } = await client.from('Messages').select('*').range(0, 10)
  return data
})

console.log(data)
// Connect to supabSase
// const client = useSupabaseClient()
// console.log(client)


// Get the messages send to the chat from supabase
// const { data: restaurant } = await useAsyncData('restaurant', async () => {
//   const { data } = await client.from('restaurants').select('name, location').eq('name', 'My Restaurant Name').single()
//   return data

// mock data for messages
const messages = ref([
  {
    id: 0,
    s : 'Mark',
    m : 'Hey'
  },
  {
    id: 1,
    s : 'Jimmy',
    m : 'Hey'
  },
  {
    id: 2,
    s : 'Emma',
    m : 'Hello'
  }
])

let newMessage = ''

// Function to send messages
const sendMessage = () => {
  messages.value.push({id: messages.value.length,s: 'Me', m: newMessage})
  newMessage = ''
}


</script>

<template>
  <div class="h-screen">
    <div  class="chat h-5/6 bg-blue-main overflow-y-scroll ">
      <div v-for="message in messages" :key="message.id" class="messages flex py-2">
        <div class="sender flex-0 max-w-xs p-1">
          <p class="text-white">
            {{ message.s }}
          </p>
          <p>
            12:00
          </p>
        </div>
        <div class="flex message divide-white bg-white flex-0 p-1 rounded-full">
          <p class="message-text text-black">
            {{ message.m }}
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
