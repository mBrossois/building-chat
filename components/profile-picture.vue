<template>
    <div class="background absolute overflow-hidden h-28 w-28 bg-window-bg">
        <div class="reflection absolute bg-white h-4 w-40 -rotate-45 origin-left -bottom-1 -left-1"></div>
        <div class="hair absolute w-16 h-14 rounded-full top-5 left-6"></div>
        <div class="shirt absolute border-solid left-6 border-b-[3em] border-x-transparent border-x-[2em] border-t-0 bottom-0"></div>
        <div class="face absolute w-14 h-14 rounded-full top-7 left-7">
            <div class="eyes bg-black w-2 h-2 rounded-full mt-4 ml-3 before:absolute before:bg-black before:w-2 before:h-2 before:rounded-full before:ml-6"></div>
        </div>
    </div>
</template>

<style>
.face {
    background-color: #FFE7AB;
}
.hair {
    background-color: #B87B1F;
}
.shirt {
    border-bottom-color: #2D41F1;
}
</style>