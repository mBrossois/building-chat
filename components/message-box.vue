<template>
    <EmojiPicker v-if="isEPOpen" disable-skin-tones class="absolute bottom-16 left-1" :native="true" @select="onSelectEmoji" />

    <form class="message h-14 w-screen absolute bottom-0" @submit.prevent="onSendMessage">

        <Icon v-if="iconBefore" :name="iconBefore" class="mt-3.5 h-7 w-7 absolute ml-2" @click="toggleEmojiPicker"></Icon>
        <input class="w-full h-full indent-11" type="text" placeholder="Write your message here!" v-model="newMessage" />
        <Icon v-if="iconAfter" :name="iconAfter" class="mt-3.5 h-7 w-7 absolute mr-2 right-0" @click="onSendMessage"></Icon>
    </form>
</template>

<script setup lang="ts">
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'

// // import css
import 'vue3-emoji-picker/css'
import { Emoticon } from '~/types/messages'

const props = defineProps<{
    iconBefore?: string,
    iconAfter?: string,
}>()
const emits = defineEmits(['send-message'])
let newMessage = ref('')
let isEPOpen = ref(false)

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
</script>