<template>
    <div ref="background" class="background relative overflow-hidden bg-window-bg z-0">
        <div class="reflection absolute bg-white -rotate-45 origin-left"></div>
        <div class="hair absolute rounded-full"></div>
        <div class="shirt absolute border-solid bottom-0"></div>
        <div class="face absolute rounded-full">
            <div class="eyes bg-black rounded-full before:absolute before:bg-black before:rounded-full before:ml-6"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/store/profile'

const props = defineProps<{
    scale: number,
    profileId?: number,
}>()

const profilePicture = await useProfileStore().getProfilePicture(props.profileId ? props.profileId : -1)

const background = ref()

const cssProperties = ref({
    window: {
        windowHeight: `${props.scale ? 7 * props.scale + 'rem' : '7rem'}`,
        windowWidth: `${props.scale ? 7 * props.scale + 'rem' : '7rem'}`,
    },
    reflection: {
        reflectionHeight: `${props.scale ? 1 * props.scale + 'rem' : '1rem'}`,
        reflectionWidth: `${props.scale ? 10 * props.scale + 'rem' : '10rem'}`,
        reflectionBottom: `${props.scale ? -.25 * props.scale + 'rem' : '-.25rem'}`,
        reflectionLeft: `${props.scale ? -.25 * props.scale + 'rem' : '-.25rem'}`,
    },
    hair: {
        hairHeight: `${props.scale ? 3.5 * props.scale + 'rem' : '3.5rem'}`,
        hairWidth: `${props.scale ? 4 * props.scale + 'rem' : '4rem'}`,
        hairTop: `${props.scale ? 1.25 * props.scale + 'rem' : '1.25rem'}`,
        hairLeft: `${props.scale ? 1.5 * props.scale + 'rem' : '1.5rem'}`,
    },
    shirt: {
        shirtBorderBottom: `${props.scale ? 3 * props.scale + 'em' : '3.5em'}`,
        shirtBorderLeft: `${props.scale ? 2 * props.scale + 'em' : '2em'}`,
        shirtBorderRight: `${props.scale ? 2 * props.scale + 'em' : '2em'}`,
        shirtLeft: `${props.scale ? 1.5 * props.scale + 'rem' : '1.5rem'}`,
    },
    face: {
        faceWidth: `${props.scale ? 3.5 * props.scale + 'rem' : '3.5rem'}`,
        faceHeight: `${props.scale ? 3.5 * props.scale + 'rem' : '3.5rem'}`,
        faceTop: `${props.scale ? 1.75 * props.scale + 'rem' : '1.75rem'}`,
        faceLeft: `${props.scale ? 1.75 * props.scale + 'rem' : '1.75rem'}`,
    },
    eyes: {
        eyesWidth: `${props.scale ? 0.5 * props.scale + 'rem' : '0.5rem'}`,
        eyesHeight: `${props.scale ? 0.5 * props.scale + 'rem' : '0.5rem'}`,
        eyesMTop: `${props.scale ? 1 * props.scale + 'rem' : '1rem'}`,
        eyesMLeft: `${props.scale ? 0.75 * props.scale + 'rem' : '0.75rem'}`,
        eyesBeforMleft: `${props.scale ? 1.5 * props.scale + 'rem' : '1.5rem'}`,
    }
})

onMounted(() => {
    // set Window css properties
    background.value.style.setProperty('--window-height', cssProperties.value.window.windowHeight)
    background.value.style.setProperty('--window-width', cssProperties.value.window.windowWidth)

    // Set reflection css properties
    background.value.style.setProperty('--reflection-height', cssProperties.value.reflection.reflectionHeight)
    background.value.style.setProperty('--reflection-width', cssProperties.value.reflection.reflectionWidth)
    background.value.style.setProperty('--reflection-bottom', cssProperties.value.reflection.reflectionBottom)
    background.value.style.setProperty('--reflection-left', cssProperties.value.reflection.reflectionLeft)

    // Set hair css properties
    background.value.style.setProperty('--hair-height', cssProperties.value.hair.hairHeight)
    background.value.style.setProperty('--hair-width', cssProperties.value.hair.hairWidth)
    background.value.style.setProperty('--hair-top', cssProperties.value.hair.hairTop)
    background.value.style.setProperty('--hair-left', cssProperties.value.hair.hairLeft)

    // Set shirt css properties
    background.value.style.setProperty('--shirt-border-bottom', cssProperties.value.shirt.shirtBorderBottom)
    background.value.style.setProperty('--shirt-border-left', cssProperties.value.shirt.shirtBorderLeft)
    background.value.style.setProperty('--shirt-border-right', cssProperties.value.shirt.shirtBorderRight)
    background.value.style.setProperty('--shirt-left', cssProperties.value.shirt.shirtLeft)

    // Set face css properties
    background.value.style.setProperty('--face-width', cssProperties.value.face.faceWidth)
    background.value.style.setProperty('--face-height', cssProperties.value.face.faceHeight)
    background.value.style.setProperty('--face-top', cssProperties.value.face.faceTop)
    background.value.style.setProperty('--face-left', cssProperties.value.face.faceLeft)

    // Set eyes css properties
    background.value.style.setProperty('--eyes-width', cssProperties.value.eyes.eyesWidth)
    background.value.style.setProperty('--eyes-height', cssProperties.value.eyes.eyesHeight)
    background.value.style.setProperty('--eyes-m-top', cssProperties.value.eyes.eyesMTop)
    background.value.style.setProperty('--eyes-m-left', cssProperties.value.eyes.eyesMLeft)
    background.value.style.setProperty('--eyes-before-m-left', cssProperties.value.eyes.eyesBeforMleft)
})
</script>

<style>
.background{
    height: var(--window-height);
    width: var(--window-width);
}
.reflection {
    height: var(--reflection-height);
    width: var(--reflection-width);
    bottom: var(--reflection-bottom);
    left: var(--reflection-left);
}
.face {
    height: var(--face-height);
    width: var(--face-width);
    top: var(--face-top);
    left: var(--face-left);
    background-color: #FFE7AB;
}
.hair {
    height: var(--hair-height);
    width: var(--hair-width);
    top: var(--hair-top);
    left: var(--hair-left);
    background-color: #B87B1F;
}
.shirt {
    border-bottom: var(--shirt-border-bottom) solid;
    border-left: var(--shirt-border-left) solid transparent;
    border-right: var(--shirt-border-right) solid transparent;
    left: var(--shirt-left);
    border-bottom-color: #2D41F1;
}
.eyes {
    height: var(--eyes-height);
    width: var(--eyes-width);
    margin-top: var(--eyes-m-top);
    margin-left: var(--eyes-m-left);
}
.eyes:before {
    height: var(--eyes-height);
    width: var(--eyes-width);
    margin-left: var(--eyes-before-m-left);
}
</style>