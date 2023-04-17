<template>
    <p v-if="isTimeShown" class="text-center">{{timeStamp}}</p>
</template>

<script setup lang="ts">
import { MONTHS } from '~/constants/messages'

const props = defineProps<{
    previous_created_at?: string
    created_at: string
}>()

const isTimeShown = computed(() => {
    if(props.previous_created_at) {
        let previousDate = new Date(props.previous_created_at)
        let currentDate = new Date(props.created_at)
        let diff = currentDate.getTime() - previousDate.getTime()
        if(diff > 300000) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return true
    }
})

const showDate = (nowDay: number, nowMonth: number, nowYear: number, messageDay: number, messageMonth: number, messageYear: number) => {
    if(nowDay !== messageDay || nowMonth !== messageMonth || nowYear !== messageYear) {
        return true
    }
    else {
        return false
    }
}

const timeStamp = computed(() => {
    const date = new Date(props.created_at)
    const now = new Date()
    let hours: number | string = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minutes: number | string = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let time = `${hours}:${minutes}`

    const showMessageDate = showDate(now.getDate(), now.getMonth(), now.getFullYear(), date.getDate(), date.getMonth(), date.getFullYear())
    if(showMessageDate) {
        const years = date.getFullYear() 
        const months = getKeyByValue(MONTHS, date.getMonth())
        const days: number | string = (date.getDate() < 10 ? '0' : '')  + date.getDate()
        time = `${time} ${months} ${days} ${years}`
    }

    return time
})
</script>