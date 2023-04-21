<template>
    <div ref="chat" class="chat main-screen-height overflow-y-scroll ">
      <div v-if="status === 'ready'">
        <div ref="messagesBlock" v-for="messageList, messageListIndex in messages" :key="messageList.page">
          <div v-for="message, index in messageList.messages" :key="index" class="messages py-2 px-4">
            <MessageTimeValue :previous_created_at="getPreviousMessageDate(messageList, message)" :created_at="message.created_at"></MessageTimeValue>
            <MessageOnPage :profile="profile" :message="message"></MessageOnPage>
          </div>

        </div>
      </div>

      <div v-if="status === 'loading'" class="flex justify-center">
        <Loading></Loading>
      </div>

    </div>
    <MessageBox :icon-before="'ic:round-insert-emoticon'" :icon-after="'ic:baseline-send'" @send-message="onSendMessage"></MessageBox>
</template>

<script setup lang="ts">
import { getProfileByUserId } from '~~/api/profile.js';
import { sendMessage, getMessages, subscribeToNewMessages } from '~/api/messages';
import { useMessagesStore } from '~~/store/messages';
import { Message, Messages } from '~~/types/messages';
import MessageTimeValue from '~~/components/message-time-value.vue';

const client = useSupabaseClient()
const user = useSupabaseUser()

const chat = ref()
const messagesBlock = ref()

// Set state
const status = ref('loading')

// get profile data
const profile = await getProfileByUserId(client, user.value?.id ? user.value.id : '') 

// // Set initial pagination
const pagination = await getInitialPagination()

// // Get the messages from the database
setInitialMessages(client, pagination).then(() => {
  nextTick(() => {
    if(chat.value && chat.value.scrollHeight) {
      chat.value.scrollTop = chat.value.scrollHeight
    }
  })
})
// // // Subscribe to changes in the Messages table
const MessagesChannel = subscribeToNewMessages(client, profile?.id ? profile.id : '')

// // Create a ref to store the messages
const messages = useMessagesStore().messages
// let messages = addToMessagesMock()

// Scroll to the bottom of the chat on load
onMounted(() => {

  // Load new messages when the user scrolls to the top of the chat
  chat.value.onscroll = async () => {
    if(chat.value.scrollTop === 0 && pagination.activePage > pagination.pagesLoaded - 1 ) {
      let messagesResponseSecond = await getMessages(client, pagination.activePage - pagination.pagesLoaded , pagination.itemsPerPage)
      useMessagesStore().addMessagesToTopPage(messagesResponseSecond as Array<Message>)
      nextTick(() => {
        scrollToItem()
      })

    } 
    else if(Math.ceil(chat.value.scrollTop) >= chat.value.scrollHeight - chat.value.clientHeight && pagination.activePage < Math.floor(pagination.totalItems / 10) ) {
      let messagesResponseSecond = await getMessages(client, pagination.activePage + 1, pagination.itemsPerPage)
      useMessagesStore().addMessagesToBottomPage(messagesResponseSecond as Array<Message>)
    }
  }

  status.value = 'ready'

})

// On adding new item, keep scroll position on previous item
function scrollToItem() {
    const messagesBlockHeight = messagesBlock.value[2].scrollHeight
    chat.value.scrollTop = chat.value.scrollTop + messagesBlockHeight
}

// Return date from the previous message
function getPreviousMessageDate(messagesPage: Messages, currentMessage: Message) {
    const messageId = messagesPage.messages.findIndex(value => value.id === currentMessage.id)
    const currentPage = messagesPage.page
    const previousPageList = messages.find(value => value.page === currentPage - 1)
    if(messageId > 0) {
      return messagesPage.messages[messageId - 1].created_at
    } else if(messageId === 0 && currentPage === 0) {
      return ''
    } else if(messageId === 0 && previousPageList && previousPageList.messages && previousPageList.messages.at(-1) ) {
        return previousPageList.messages.at(-1)?.created_at
    }
    return currentMessage.created_at
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
    const result = await sendMessage(client, newMessage, profile.id)
    // Add the message to the messages array
    if(result) {
      alert('Something went wrong !')
      return 
    }
    await useMessagesStore().addNewMessage({id: messages.find,name: profile.name, message: newMessage, created_at: new Date().toString(), profile_id: profile.id})
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