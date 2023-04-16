import { getProfileByProfileId } from './profile';
import { useMessagesStore } from '~~/store/messages';
import { Messages } from '~~/types/messages';

// This is the function that is called when a user sends a message
export async function sendMessage(newMessage: string, profile_id: string) {
    const client = useSupabaseClient()

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
export async function getMessages(activePage: number, pageSize: number) {
  const client = useSupabaseClient()
  
  const { data: Messages, error } = await client
  .from('Messages')
  .select(`
    created_at, 
    message,
    profile_id,
    Profiles (name, floor)
  `)
  .range(activePage * pageSize, activePage * pageSize + pageSize)
  if(error) {
    alert('Something went wrong !')
    return 
  }
  const messages = Messages.map((message: any) => {
    return {
      created_at: formatDate(new Date(message.created_at)),
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
export const subscribeToNewMessages = (profile_id: string) => {
  const client = useSupabaseClient()

  return client.channel('listen-messages-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'Messages' },
    async (payload) => {
      if(payload.new.profile_id !== profile_id) {
        const newMessage = payload.new as Messages
        const profile = await getProfileByProfileId(newMessage.profile_id ? newMessage.profile_id : '')
        useMessagesStore().addNewMessage({created_at: formatDate(new Date(newMessage.created_at)), message: newMessage.message, name: profile ? profile.name : 'Anonymous', floor: profile.floor })
      }
    }
  )
  .subscribe()

}
