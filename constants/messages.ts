import { Messages } from "~~/types/messages"

// Translate numbers to three letter months in french
export enum MONTHS {
    'Jan' = 0,
    'Fev' = 1,
    'Mar' = 2,
    'Avr' = 3,
    'Mai' = 4,
    'Jun' = 5,
    'Jul' = 6,
    'Aou' = 7,
    'Sep' = 8,
    'Oct' = 9,
    'Nov' = 10,
    'Dec' = 11
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