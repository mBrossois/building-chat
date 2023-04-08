<template>
    <button @click="onClick()" class="w-80 bg-black text-background-color h-9 hover:bg-gray-50 focus:outline-offset-0">{{ label }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        required: true
    }
})
const emits = defineEmits(['click'])

function onClick() {
    emits('click')
}
</script>
