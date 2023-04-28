<template>
  <div class="h-full w-full absolute bg-background-color">
    <Header></Header>
    <Menu></Menu>
    <NuxtPage></NuxtPage>
    <TabletDevToolsMainComponent />

  </div>
</template>

<style>
.main-screen-height {
  height: calc(100% - 3.5rem - 3.5rem);
}
</style>