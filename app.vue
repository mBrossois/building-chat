<template>
  <div class="h-full w-full absolute bg-background-color">
    <Header></Header>
    <Menu></Menu>
    <NuxtPage></NuxtPage>
  </div>
</template>

<style>
.main-screen-height {
  height: calc(100vh - 56px - 56px);
}
</style>