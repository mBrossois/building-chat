<template>
    <div v-show="isOpen()" class="menu absolute h-full w-full bg-main-color px-2 pt-5 z-50">
        <NavItem text="Home"></NavItem>
        <NavItem text="Messages"></NavItem>
        <NavItem text="Neighbours"></NavItem>
        <NavItem text="Profile"></NavItem>
        <NavItem text="Settings"></NavItem>
        <NavItem :preventDefault="true" text="Log out" @onClick="logOut"></NavItem>
    </div>
</template>

<script setup lang="ts">
    import { useMenuStore } from '~/store/menu';
    import { useProfileStore } from '~~/store/profile';
    // Check if menu is open
    function isOpen(): boolean {
        return useMenuStore().isOpen
    }
    
    // Log out of supabase
    async function logOut() {
        await useSupabaseAuthClient().auth.signOut()
        await navigateTo('/login')
        useProfileStore().resetProfileId()
        useMenuStore().toggleMenu()
    }
</script>