// Get profile by user id
export async function getProfileByUserId(userId: string) {
    const client = useSupabaseClient()

    const { data: Profile, error: profileErrror } = await client
    .from('Profiles')
    .select(`
        id, 
        name
    `)
    .eq('user_id', userId)
    .single()
    if(profileErrror) {
        alert('Something went wrong !')
        return
    }
    return Profile
}
