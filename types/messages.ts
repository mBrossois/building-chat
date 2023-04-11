export interface Message {
    created_at: string
    message: string
    name: string
    profile_id?: string
}

export interface Messages {
        page: number,
        messages: Array<Message>
}

export interface MessagePagination {
    activePage: number
    itemsPerPage: number
    totalItems: number
    pagesLoaded: number
}