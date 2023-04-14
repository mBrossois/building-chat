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

export interface Emoticon {
    i: string
    n: string
    r: string
    t: string
    u: string
}

export const MessagesMock: Array<Messages> =[
    {
    page: 0,
    messages: [
        {
        message: 'Hello',
        created_at: '03:24 21-09-1992',
        name: 'Mark de Neut Brossois'
        }
    ]
    },
    {
    page: 1,
    messages: [
        {
        message: 'Hello',
        created_at: '03:24 21-09-1992',
        name: 'Mark de Neut Brossois'
        }
    ]
    }
]

export const addToMessagesMock = () => {
        
        for(let i = 0; i < 30; i++) {
          if(i < 15) {
            MessagesMock[0].messages.push({
              message: `Hello ${i}`,
              created_at: '03:24 21-09-1992',
              name: 'Mark de Neut Brossois'
            })
          } else {
            MessagesMock[1].messages.push({
              message: `Hello ${i}`,
              created_at: '03:24 21-09-1992',
              name: 'Mark de Neut Brossois'
            })
          }
        }
        return MessagesMock
    }