import { Message, MessagePagination, Messages } from "~~/types/messages"

export const useMessagesStore = defineStore('messages', () => {
  // Messages
  const messages: Ref<Array<Messages>> = ref([])

    function addNewMessage(message: Message) {
      if( messagePagination.value.activePage > (Math.floor(messagePagination.value.totalItems / 10) - messagePagination.value.pagesLoaded) ) {
        messages.value[messages.value.length - 1].messages.push(message)
      }      
    }

    function initialMessages(initialMessages: Array<Message[]>) {
      for(let i = 0; i < initialMessages.length; i++) {
        console.log(messagePagination.value.pagesLoaded - i)
        messages.value.push({
          page: messagePagination.value.activePage - (messagePagination.value.pagesLoaded - i - 1),
          messages: initialMessages[i]
        })
      }
    }

    // Load messages for page
    function loadMessagesForPage(message: Array<Message>) {
      const messagesForPage = {
        page: messagePagination.value.activePage,
        messages: message
      }

      messages.value.push(messagesForPage)
    }

    // Add new messages to top of the page
    function addMessagesToTopPage(message: Array<Message>) {
      const page = {
        page: messagePagination.value.activePage - messagePagination.value.pagesLoaded,
        messages: message
      }
      messagePagination.value.activePage -= 1
      messages.value.unshift(page)
      messages.value.pop()
    }

    function addMessagesToBottomPage(message: Array<Message>) {
      messagePagination.value.activePage += 1
      const page = {
        page: messagePagination.value.activePage,
        messages: message
      }
      messages.value.push(page)
      messages.value.shift()
    }

    // Pagination
    const messagePagination: Ref<MessagePagination> = ref({
      activePage: 0,
      itemsPerPage: 10,
      pagesLoaded: 3,
      totalItems: 0
    })
    
    function initialPagination(totalItems: number) {
      messagePagination.value.totalItems = totalItems
      messagePagination.value.activePage = Math.floor(totalItems / 10)
    }

    function changePage(counter: number) {
      messagePagination.value.activePage += counter
    }

    function setPage(page: number) {
      messagePagination.value.activePage = page
    }

    function addItem() {
      messagePagination.value.totalItems += 1
    }
  
    return { messages, setPage, addMessagesToBottomPage, addNewMessage, loadMessagesForPage, initialMessages, addMessagesToTopPage, messagePagination, initialPagination, changePage, addItem }
  })