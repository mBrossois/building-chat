<template>
    <div class="flex bg-blue-header text-white h-14 items-center">
        <h1 class="text-2xl ml-5">Building chat</h1>
        <h2 class="text-lg ml-7 grow"> {{ activeRoute }}</h2>
        <Icon v-if="showOnRoute" @click="openMenu" name="ic:baseline-menu" class="h-10 w-10 justify-self-end mr-2"></Icon>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '~~/store/menu';
import { showMenuOnRoutes, routes } from '~~/types/routes';

const route = useRoute()

const showOnRoute = ref(showMenuOnRoutes.includes(route.path))
const activeRoute = ref(routes[route.path])

watchEffect(() => {
    showOnRoute.value = showMenuOnRoutes.includes(route.path)
    activeRoute.value = routes[route.path]
})

function openMenu() {
    useMenuStore().toggleMenu()
}

</script>