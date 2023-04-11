import { getMessages, getMessagesLength } from "~~/api/messages"
import { useMessagesStore } from "~~/store/messages"
import { Message, MessagePagination } from "~~/types/messages"

export async function getInitialPagination() {
    // Set initial pagination
    const messagesLength = await getMessagesLength()
    useMessagesStore().initialPagination(messagesLength ?? 0)
    return useMessagesStore().messagePagination
}

export async function setInitialMessages(pagination: MessagePagination) {
    let messages = []
    for(let i = pagination.pagesLoaded; i > 0; i--) {
        messages.push(await getMessages( pagination.activePage - (i - 1), pagination.itemsPerPage))
    }
    useMessagesStore().initialMessages(messages as Array<Message[]>)
}