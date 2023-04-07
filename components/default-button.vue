<template>
    <button @click="onClick()" class="w-80 bg-black py-2 px-4 mt-2.5 text-background-color hover:bg-gray-50 focus:outline-offset-0">{{ label }}</button>
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
