import { getProfileByProfileId } from './profile';
import { useMessagesStore } from '~~/store/messages';
import { Messages } from '~~/types/messages';

// This is the function that is called when a user sends a message
export async function sendMessage(client: any, newMessage: string, profile_id: string) {
    const { data, error } = await client
    .from('Messages')
    .insert([
      { message: newMessage, profile_id: profile_id},
    ])
    if (error) {
      return "Something went wrong"
    }
    return data
}  

// Function to get all messages
export async function getMessages(client: any, activePage: number, pageSize: number) {  
  const { data: Messages, error } = await client
  .from('Messages')
  .select(`
    id,
    created_at, 
    message,
    profile_id,
    Profiles (name, floor)
  `)
  .range(activePage * pageSize, activePage * pageSize + pageSize - 1)
  if(error) {
    alert('Something went wrong !')
    return 
  }
  const messages = Messages.map((message: any) => {
    return {
      id: message.id,
      created_at: message.created_at,
      message: message.message,
      name: message.Profiles.name,
      floor: message.Profiles.floor,
      profile_id: message.profile_id
    }
  })

  return messages
}

// Get lenght of messages
export async function getMessagesLength() {
  const client = useSupabaseClient()

  const { count, error } = await client
  .from('Messages')
  .select('*', { count: 'exact', head: true })
  if(error) {
    alert('Something went wrong !')
    return
  }
  return count
}

// Subscribe to new messages
export const subscribeToNewMessages = (client: any, profile_id: number) => {

  return client.channel('listen-messages-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'Messages' },
    async (payload) => {
      if(payload.new.profile_id !== profile_id) {
        const newMessage = payload.new as Messages
        const profile = await getProfileByProfileId(newMessage.profile_id ? newMessage.profile_id : '')
        useMessagesStore().addNewMessage({id: newMessage.id, created_at: newMessage.created_at, message: newMessage.message, name: profile ? profile.name : 'Anonymous', floor: profile.floor })
      }
    }
  )
  .subscribe()

}
