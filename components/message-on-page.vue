<template>
    <div v-if="isCurrentUser" class="message-box-sender flex"> 
        
          <div class="flex message flex-0 p-1 w-full ">
            <div class="text-white bg-black w-full px-2.5 pt-2.5">
              <p class="flex justify-between text-xs">
                Me
              </p>
              <p class="message-text pt-3 pb-2.5">
                {{ message.message }}
              </p>
            </div>
            <div class="triangle-conversation border-solid border-l-black border-l-[12px] border-y-transparent border-y-4 border-r-0 h-min self-end mb-6"></div>
          </div>
          <div class="sender flex-0 max-w-xs p-1 self-end">
            <ProfilePicture :scale=".65"></ProfilePicture>
          </div>
    </div>
    <div v-else class="message-box-others flex">
        <div class="sender flex-0 max-w-xs p-1 self-end">
            <ProfilePicture :scale=".65"></ProfilePicture>
          </div>
          <div class="flex message flex-0 p-1 w-full ">
            <div class="triangle-conversation border-solid border-r-black border-r-[12px] border-y-transparent border-y-4 border-l-0 h-min self-end mb-6"></div>
            <div class="text-white bg-black w-full px-2.5 pt-2.5">
              <p class="flex justify-between text-xs">
                <span class="">{{ message.name }}</span>
                <span class="text-xs text-gray-400">Floor {{ message.floor }}</span>
              </p>
              <p class="message-text pt-3 pb-2.5">
                {{ message.message }}
              </p>
            </div>
            
          </div>
    </div>
</template>

<script setup lang="ts">
import { Message } from '~/types/messages';
import { Profile } from '~/types/profile';  

const props = defineProps<{
    message: Message
    profile?: Profile
}>()

// Check if messages is from the current user
const isCurrentUser = computed(() => {
    return props.message.profile_id === props.profile?.id
})
</script>