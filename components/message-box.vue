<template>
    <div v-if="isEPOpen === true && status === 'ready'">
        <VueEmojiPicker disable-skin-tones class="absolute bottom-16 left-1" :native="true" @select="onSelectEmoji" />
    </div>

    <form class="message h-14 w-screen absolute bottom-0 flex bg-white" @submit.prevent="onSendMessage">

        <Icon v-if="iconBefore" :name="iconBefore" class="mt-3.5 h-7 w-8 ml-2 pr-1" @click="toggleEmojiPicker"></Icon>
        <textarea class="flex-1 resize-none" rows="1" colls="50" maxlength="500" placeholder="Write your message here!" v-model="newMessage" />
        <Icon v-if="iconAfter" :name="iconAfter" class="mt-3.5 h-7 w-8 mr-2 right-0 pl-1.5" @click="onSendMessage"></Icon>
    </form>
</template>

<script setup lang="ts">
import 'vue3-emoji-picker/css'
// import VueEmojiPicker from 'vue3-emoji-picker'

import { Emoticon } from '~/types/messages'

const props = defineProps<{
    iconBefore?: string,
    iconAfter?: string,
}>()
const emits = defineEmits(['send-message'])
let newMessage = ref('')
let isEPOpen = ref(false)
let status = ref('init')

const { $VueEmojiPicker } = useNuxtApp()
const VueEmojiPicker = $VueEmojiPicker

function toggleEmojiPicker() {
    isEPOpen.value = !isEPOpen.value
}

// event callback
function onSelectEmoji(emoji: Emoticon) {
    // Add regex to add emoji as unicode to the input
    newMessage.value += String.fromCodePoint(parseInt(emoji.u, 16))
    toggleEmojiPicker()
}

function onSendMessage() {
    if (newMessage) {
        emits('send-message', newMessage.value)

        // Clear the input
        newMessage.value = ''
    }
}

onMounted(() => {
    // Focus the input
    nextTick(() => {
        status.value = 'ready'
    })
})
</script>