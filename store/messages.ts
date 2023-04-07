import { Messages } from "~~/types/messages"

export const useMessagesStore = defineStore('messages', () => {
    const messages: Ref<Array<Messages>> = ref([{
        created_at: '',
        message: '',
        name: ''
    }])
    function addNewMessage(message: Messages) {
      messages.value.push(message)
      
    }
    function setMessages(inCommingMessages: Array<Messages>) {
      messages.value = inCommingMessages

    }
  
    return { messages, setMessages, addNewMessage }
  })