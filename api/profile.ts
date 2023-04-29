// Get profile by user id
export async function getProfileByUserId(client: any, userId: string) {

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

// Get profile by profile_id
export async function getProfileByProfileId(profile_id: string) {
    const client = useSupabaseClient()

    const { data: Profile, error: profileErrror } = await client
    .from('Profiles')
    .select(`
        id, 
        name
    `)
    .eq('id', profile_id)
    .single()
    if(profileErrror) {
        alert('Something went wrong !')
        return
    }
    return Profile
}

// Get profile picture by profile_id
export async function getCharacter(profile_id: number) {
    const client = useSupabaseClient()

    const { data: ProfilePicture, error: profileErrror } = await client
    .from('Character')
    .select(`
        profile_id,
        hair_length,
        hair_color,
        face_color,
        shirt_color
    `)
    .eq('profile_id', profile_id)
    .single()
    if(profileErrror) {
        alert('Something went wrong !')
        return
    }
    return ProfilePicture
}
