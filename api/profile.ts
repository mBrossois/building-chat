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
export async function getProfileByProfileId(profile_id: number) {
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

    const { data: Character, error: error } = await client
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
    if(error) {
        alert(error.message)
        return
    }
    return Character
}

// Get all profile pictures
export async function getAllCharacters() {
    const client = useSupabaseClient()

    const { data: Character, error: error } = await client
    .from('Character')
    .select(`
        profile_id,
        hair_length,
        hair_color,
        face_color,
        shirt_color
    `)
    if(error) {
        alert(error.message)
        return
    }
    return Character
}