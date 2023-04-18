export interface Message {
    created_at: string
    message: string
    name: string
    floor?: number
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

export interface Emoticon {
    i: string
    n: string
    r: string
    t: string
    u: string
}
