<template>
    <button @click="closeMenu()" :class="{'font-bold': activeRoute === text}" class="min-w-full py-2 px-4 mb-4 text-white text-left text-2xl border-b border-solid border-white hover:bg-gray-50 focus:outline-offset-0">{{ text }}</button>
</template>

<script setup lang="ts">
import { useMenuStore } from '~~/store/menu';
import { routes } from '~/types/routes';
const props = defineProps({
  text: String!,
  preventDefault: Boolean
})
const emits = defineEmits(['onClick'])

const route = useRoute()

const activeRoute = ref(routes[route.path])

watchEffect(() => {
    activeRoute.value = routes[route.path]
})

async function closeMenu() {
    emits('onClick')
    if(!props.preventDefault) {
        useMenuStore().toggleMenu()
    }
}
</script>