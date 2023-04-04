<template>
    <div class="flex bg-blue-header text-white h-14 items-center">
        <h1 class="text-2xl ml-5">Building chat</h1>
        <h2 class="text-lg ml-7 grow"> {{ getActiveRoute() }}</h2>
        <Icon @click="openMenu" name="ic:baseline-menu" class="h-10 w-10 justify-self-end mr-2"></Icon>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '~~/store/menu';

const route = useRoute()
const routes: {[key: string]: string} = {
    'login': 'Login',
    'profile': 'Profile',
    '/': 'Messages'
}

function getActiveRoute(): string {
    return routes[getRoute()]
}

function getRoute(): string {
    return route.path
}

function openMenu() {
    useMenuStore().toggleMenu()
}

</script>