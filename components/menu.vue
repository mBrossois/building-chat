<template>
    <div v-show="isOpen()" class="menu absolute h-full w-full bg-blue-lightest px-2 pt-5">
        <NavItem text="Messages"></NavItem>
        <NavItem text="Neighbours"></NavItem>
        <NavItem text="Profile"></NavItem>
        <NavItem text="Settings"></NavItem>
        <NavItem :preventDefault="true" text="Log out" @onClick="logOut"></NavItem>
    </div>
</template>

<script setup lang="ts">
    import { useMenuStore } from '~/store/menu';
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
        useMenuStore().toggleMenu()
    }
</script>