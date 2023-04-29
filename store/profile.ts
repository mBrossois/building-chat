import { getCharacter } from "~/api/profile"
import { ProfilePicture } from "~~/types/profile"

export const useProfileStore = defineStore('profile', () => {
    const profilePicture: Ref<Array<ProfilePicture>> = ref([])

    const defaultPicture: ProfilePicture = {
      profile_id: -1,
      hair_length: 2,
      hair_color: '#B87B1F',
      shirt_color: '#B87B1F',
      face_color: '#FFE7AB'
    }

    const filterProfileId = (profile_id: number) => {
      return profilePicture.value.find(value => value.profile_id === profile_id)
    }

    async function getProfilePicture(profileId: number) {
      if(profileId === -1) {
        return defaultPicture
      }
      else if(profilePicture.value.length > 0 && filterProfileId(profileId)) {
        return profileId
      } else {
        const result = await getCharacter(profileId) 
        if(!result) {
          return defaultPicture
        }
        profilePicture.value.push(result)
        return result
      }
    }
  
    return { getProfilePicture }
  })