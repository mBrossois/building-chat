import VueEmojiPicker from 'vue3-emoji-picker'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            VueEmojiPicker: VueEmojiPicker,
        },
    }
})