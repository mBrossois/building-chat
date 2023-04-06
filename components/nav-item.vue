<template>
    <button @click="closeMenu()" class="min-w-full py-2 px-4 mb-4 text-black text-left text-2xl border-b-2 border-solid border-black hover:bg-gray-50 focus:outline-offset-0">{{ text }}</button>
</template>

<script setup lang="ts">
import { useMenuStore } from '~~/store/menu';
const props = defineProps({
  text: String!,
  preventDefault: Boolean
})
const emits = defineEmits(['onClick'])


async function closeMenu() {
    emits('onClick')
    if(!props.preventDefault) {
        useMenuStore().toggleMenu()
    }
}
</script>