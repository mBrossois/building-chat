export const useProfileStore = defineStore('profile', () => {
    const profilePicture = ref(null)

    function getProfilePicture(profileId: number) {
      if(!profilePicture.value) {
        console.log('empty')
      } else {
        console.log('not empty')
      }
    }
  
    return { getProfilePicture }
  })