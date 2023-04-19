<template>
    <div ref="chat" class="chat main-screen-height overflow-y-scroll ">

      <div ref="messagesBlock" v-for="messageList, messageListIndex in messages" :key="messageList.page">
        <div v-for="message, index in messageList.messages" :key="index" class="messages py-2 px-4">
          <MessageTimeValue :previous_created_at="getPreviousMessageDate(index, messageListIndex)" :created_at="message.created_at"></MessageTimeValue>
          <MessageOnPage :profile="profile" :message="message"></MessageOnPage>
        </div>

      </div>

    </div>
    <MessageBox :icon-before="'ic:round-insert-emoticon'" :icon-after="'ic:baseline-send'" @send-message="onSendMessage"></MessageBox>
</template>

<script setup lang="ts">
import { getProfileByUserId } from '~~/api/profile.js';
import { sendMessage, getMessages, subscribeToNewMessages } from '~/api/messages';
import { useMessagesStore } from '~~/store/messages';
import { Message } from '~~/types/messages';
import MessageTimeValue from '~~/components/message-time-value.vue';

const client = useSupabaseClient()
const user = useSupabaseUser()

const chat = ref()
const messagesBlock = ref()

// get profile data
const profile = await getProfileByUserId(user.value?.id ? user.value.id : '') 

// // Set initial pagination
const pagination = await getInitialPagination()

// // Get the messages from the database
setInitialMessages(pagination).then(() => {
  nextTick(() => {
    chat.value.scrollTop = chat.value.scrollHeight
  })
})
// // // Subscribe to changes in the Messages table
const MessagesChannel = subscribeToNewMessages(profile?.id ? profile.id : '')

// // Create a ref to store the messages
const messages = useMessagesStore().messages
// let messages = addToMessagesMock()

// Scroll to the bottom of the chat on load
onMounted(() => {

  // Load new messages when the user scrolls to the top of the chat
  chat.value.onscroll = async () => {
    if(chat.value.scrollTop === 0 && pagination.activePage > pagination.pagesLoaded - 1 ) {
      let messagesResponseSecond = await getMessages( pagination.activePage - pagination.pagesLoaded , pagination.itemsPerPage)
      useMessagesStore().addMessagesToTopPage(messagesResponseSecond as Array<Message>)
      nextTick(() => {
        scrollToItem()
      })

    } 
    else if(Math.ceil(chat.value.scrollTop) >= chat.value.scrollHeight - chat.value.clientHeight && pagination.activePage < Math.floor(pagination.totalItems / 10) ) {
      let messagesResponseSecond = await getMessages( pagination.activePage + 1, pagination.itemsPerPage)
      useMessagesStore().addMessagesToBottomPage(messagesResponseSecond as Array<Message>)
    }
  }

})

// On adding new item, keep scroll position on previous item
function scrollToItem() {
    const messagesBlockHeight = messagesBlock.value[2].scrollHeight
    chat.value.scrollTop = chat.value.scrollTop + messagesBlockHeight
}

// Return date from the previous message
function getPreviousMessageDate(messageIndex: number, messageRowIndex: number) {
  if(messageIndex === 0 && messageRowIndex === 0 && messages[messageRowIndex].page === 0) {
    return undefined
  }
  if(messageIndex === 0 && messageRowIndex === 0 && messages[messageRowIndex].page !== 0) {
    return messages[messageRowIndex].messages[messageIndex].created_at
  }
  if(messageIndex === 0) {
    return messages[messageRowIndex - 1].messages[pagination.itemsPerPage - 1].created_at
  }
  return messages[messageRowIndex].messages[messageIndex - 1].created_at
}

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
    await useMessagesStore().addNewMessage({name: profile.name, message: newMessage, created_at: new Date().toString(), profile_id: profile.id})
    chat.value.scrollTop = chat.value.scrollHeight
}

// // Unsubscribe when user left the page
onUnmounted(() => {
  client.removeChannel(MessagesChannel)
})
</script>

<style scoped>
.chat::-webkit-scrollbar {
  display: none;  
}
</style>