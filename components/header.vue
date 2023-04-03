<template>
    <div class="flex bg-blue-header text-white">
        <h1 class="text-2xl">Building chat</h1>
        <h2 class="text-lg"> {{ getActiveRoute() }}</h2>
    </div>
</template>

<script setup lang="ts">
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

</script>