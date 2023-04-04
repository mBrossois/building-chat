<template>
    <div v-show="isOpen" class="menu">
        <button @click="goTo('/')" class="inline-flex min-w-32 justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">Messages</button>
        <button @click="logOut()" class="inline-flex min-w-32 justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">Log out</button>
    </div>
</template>

<script setup lang="ts">
    import { useMenuStore } from '~~/store/menu';
    const router = useRouter()

    // Check if menu is open
    function isOpen(): boolean {
        return useMenuStore().isOpen
    }

    // Redirect to other page
    function goTo(route: string) {
        router.push(route)
    }

    // Log out of supabase
    async function logOut() {
        await useSupabaseAuthClient().auth.signOut()
        await navigateTo('/login')
    }
</script>