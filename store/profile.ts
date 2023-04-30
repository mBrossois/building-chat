import { getAllCharacters, getCharacter } from "~/api/profile"
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

    async function getProfilePicture(profileId: number): Promise<ProfilePicture> {
      if(profileId === -1) {
        return defaultPicture
      }
      else if(profilePicture.value.length > 0 && filterProfileId(profileId)) {
        return filterProfileId(profileId)!
      } else {
        const result = await getCharacter(profileId) 
        if(!result) {
          return defaultPicture
        }
        profilePicture.value.push(result)
        return result
      }
    }

    async function getAllProfilePictures() {
      if(profilePicture.value.length === 0) {
        const result = await getAllCharacters()
        if(!result) {
          console.log("Couldn't find any pictures")
        } else {
          profilePicture.value = result
        }
      }
    }
  
    return { getProfilePicture, getAllProfilePictures }
  })