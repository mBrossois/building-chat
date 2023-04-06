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