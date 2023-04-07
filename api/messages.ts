import { getProfileByUserId } from './profile';
import { useMessagesStore } from '~~/store/messages';
import { Messages } from '~~/types/messages';

// This is the function that is called when a user sends a message
export async function sendMessage(newMessage: string, user_id: string, profile_id: string) {
    const client = useSupabaseClient()

    const { data, error } = await client
    .from('Messages')
    .insert([
      { message: newMessage, user_id: user_id, profile_id: profile_id},
    ])
    if (error) {
      return "Something went wrong"
    }
    return data
}  

// Function to get all messages
export async function getMessages() {
  const client = useSupabaseClient()

  const { data: Messages, error } = await client
  .from('Messages')
  .select(`
    created_at, 
    message,
    Profiles (name)
  `)
  .range(0, 10)
  if(error) {
    alert('Something went wrong !')
    return 
  }
  const messages = Messages.map((message: any) => {
    return {
      created_at: formatDate(new Date(message.created_at)),
      message: message.message,
      name: message.Profiles.name
    }
  })
  return messages
}

// Subscribe to new messages
export const subscribeToNewMessages = (userId: string) => {
  const client = useSupabaseClient()

  return client.channel('listen-messages-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'Messages' },
    async (payload) => {
      if(payload.new.user_id !== userId) {
        const newMessage = payload.new as Messages
        const profile = await getProfileByUserId(newMessage.user_id)
        useMessagesStore().addNewMessage({id: newMessage.id, created_at: newMessage.created_at, message: newMessage.message, name: profile.name ? profile.name : 'Anonymous' })
      }
    }
  )
  .subscribe()

}