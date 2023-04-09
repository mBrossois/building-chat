import { Messages } from "~~/types/messages"

export const useMessagesStore = defineStore('messages', () => {
  // Messages
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

    // Pagination
    const messagePagination = ref({
      activePage: 0,
      itemsPerPage: 10,
      totalItems: 0
    })
    
    function initialPagination(totalItems: number) {
      messagePagination.value.totalItems = totalItems
      messagePagination.value.activePage = totalItems / 10
      console.log(totalItems / 10)
    }

    function changePage(counter: number) {
      messagePagination.value.activePage += counter
    }

    function addItem() {
      messagePagination.value.totalItems += 1
    }
  
    return { messages, setMessages, addNewMessage, messagePagination, initialPagination, changePage, addItem }
  })