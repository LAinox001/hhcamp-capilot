<template>
<!--    <div v-for="(emotion, index) of emotions" :key="index">-->
<!--        <h3>{{ formatDate(emotion.date) }}</h3>-->
<!--        <p style="font-size: 40px">{{ emotion.emoji }} {{ emotion.value }}</p>-->
<!--        <template v-if="emotion.description === '' || emotion.description == null">-->
<!--            <textarea v-model="textareaValues[index]"></textarea>-->
<!--            <button @click="submitTextarea(textareaValues[index], index)">Enregistrer la description</button>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--            {{emotion.description}}-->
<!--        </template>-->
<!--    </div>-->
    <div style="display: flex; gap: 107px; padding-left: 70px">
        <div v-for="day of days">{{day}}</div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 50px; position: absolute; left: 0; top: 65px">
        <div v-for="week of weeks">{{week}}</div>
    </div>
    <div class="grid-container">
        <div v-for="(emotion, index) of emotionsCopy"  :key="index"
             class="grid-item"
             :class="emotion.emoji === '' ? 'empty-grid': index === currentIndex ? 'active-date':''"
             @click="currentEmotion = emotion; currentIndex = index">{{emotion.emoji}}</div>
    </div>
    <div style="display: flex; gap: 10px">
        <p>Description</p>
        <template v-if="currentEmotion.description === '' || currentEmotion.description == null">
            <textarea class="input-textarea" v-model="currentEmotionEdition" style="width: 60%"></textarea>
            <button class="btn" @click="submitTextarea(currentEmotionEdition, currentIndex)">Enregistrer</button>
        </template>
        <p v-else>{{currentEmotion.description}}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const days = [
    "L",
    "M",
    "M",
    "J",
    "V",
    "S",
    "D",
]

const weeks = [
    "1",
    "2",
    "3",
    "4",
    "5",
]

const emotions = ref(JSON.parse(localStorage.getItem("compassEmotions")) || []);
const emotionsCopy = emotions.value;
if (emotionsCopy.length < 30) {
    for (let i = emotionsCopy.length; i < 30; i++){
        emotionsCopy.push({emoji: ''})
    }
}
const textareaValues = []
emotions.value.forEach(emotion => {
    textareaValues.push(emotion.description || "");
})

const currentEmotion = ref(emotions.value[0]);
const currentIndex = ref(0);
const currentEmotionEdition = ref("");

function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-fr', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

function submitTextarea(text, index) {
    emotions.value[index].description = text;
    localStorage.setItem("compassEmotions", JSON.stringify(emotions.value));
    currentEmotionEdition.value = "";
}
</script>

<style scoped>

.grid-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 7 columns */
    grid-template-rows: repeat(5, 1fr); /* 4 rows */
    gap: 10px; /* Gap between grid items */
    padding: 20px; /* Padding around the grid container */
}

.grid-item {
    background-color: #1B5259; /* Blue background color */
    color: #fff; /* White text color */
    padding: 20px; /* Padding inside grid items */
    text-align: center; /* Center text */
    border-radius: 5px;
}
.empty-grid {
    border: solid 2px #1B5259;
    background-color: white !important;
}
.active-date {
    background-color: rgba(27, 82, 89, 0.5);
}


.input-textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    height: 20px;
}

.input-textarea:focus {
    border-color: #1B5259; /* Change to desired focus color */
}

.btn {
    display: inline-block;
    padding: 10px 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid #1B5259; /* Button border color */
    color: white; /* Button text color */
    background-color: #1B5259; /* Button background color on hover */
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    flex-grow: 1;
}

.btn:hover {
    background-color: rgba(27, 82, 89, 0.75); /* Button background color on hover */
    color: #fff; /* Button text color on hover */
    border-color: #1B5259; /* Button border color on hover */
}
</style>