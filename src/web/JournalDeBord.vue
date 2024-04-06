<template>
    <div class="journal-de-bord">
        <menu class="onglets">
            <li v-for="onglet of onglets" class="onglet" @click="changeOnglet(onglet)">
                {{ onglet }}
            </li>
        </menu>
        <h1>{{ currentOnglet }}</h1>
        <form>
            <textarea v-model="textAreaText"></textarea>
            <button type="button" @click="submitText">Enregistrer dans le journal</button>
        </form>
        <div>
            <div v-for="text of ongletTexts">
                <h3>{{ formatDate(text.date) }}</h3>
                <p>{{ text.text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'

const onglets = [
    'Sport',
    'Sorties',
    'Boussole des émotions'
]

const currentOnglet = ref(onglets[0])

const textAreaText = ref('')

const ongletTexts = ref()

onMounted(() => {
    changeOnglet(currentOnglet.value)
})

const submitText = () => {
    ongletTexts.value.push({
        date: new Date(),
        text: textAreaText.value
    })
    localStorage.setItem(currentOnglet.value, JSON.stringify(ongletTexts.value))
    textAreaText.value = ""
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-fr', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}

function changeOnglet(onglet) {
    currentOnglet.value = onglet
    ongletTexts.value = JSON.parse(localStorage.getItem(onglet))
    if (ongletTexts.value == null) {
        ongletTexts.value = []
    }
}

</script>

<style scoped>
.journal-de-bord {
    width: 1024px;
    height: 768px;

    border: solid 1px white;
}

.onglets {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}

.onglet {
    border: solid 1px white;
    min-width: 100px;
    max-width: 300px;
    cursor: pointer;
}
</style>