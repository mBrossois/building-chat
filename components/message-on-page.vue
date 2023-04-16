<template>
    <div class="sender flex">
        <div class="sender flex-0 max-w-xs p-1 self-end">
            <ProfilePicture :scale=".65"></ProfilePicture>
          </div>
          <div class="flex message divide-white flex-0 p-1 w-full ">
            <div class="triangle-conversation border-solid border-r-black border-r-[12px] border-y-transparent border-y-4 border-l-0 h-min self-end mb-6"></div>
            <div class="text-white bg-black w-full px-1.5 pt-0.5">
              <p class="flex justify-between text-xs">
                <span class="">{{ message.name }}</span>
                <span class="text-xs text-gray-400">{{ message.floor }}</span>
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

console.log(props.message.profile_id)
console.log(props.profile)
console.log(props.message.profile_id == (props.profile ? props.profile.id : ''))

</script>