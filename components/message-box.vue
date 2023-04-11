<template>
    <form class="message h-14 w-screen absolute bottom-0" @submit.prevent="onSendMessage">
      <input class="w-full h-full" type="text" v-model="newMessage" />
    </form>
</template>

<script setup lang="ts">
const emits = defineEmits(['send-message'])
let newMessage = ref('')

function onSendMessage() {
    if (newMessage) {
        emits('send-message', newMessage.value)

        // Clear the input
        newMessage.value = ''
    }
}
</script>