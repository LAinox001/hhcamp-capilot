<template>
  <div class="journal-de-bord">
    <div style="padding: 40px 0 0 40px">
      <h1>{{ currentOnglet }}</h1>
    </div>

    <menu class="onglets">
      <li v-for="onglet of onglets" :style="currentOnglet == onglet.text ? `background-color: #1B5259; color: white` : `background-color: ${onglet.couleur}`" class="onglet" @click="changeOnglet(onglet.text)">
        {{ onglet.text }}
      </li>
    </menu>
    <div class="journal-page">
      <div style="overflow-x: auto; height: 100%; position: relative">
        <template v-if="currentOnglet !== 'Boussole des émotions'">
          <form class="form">
            <textarea class="input-textarea" v-model="textAreaText"></textarea>
            <button type="button" @click="submitText" class="btn">Enregistrer dans le journal</button>
          </form>
          <div>
            <div v-for="text of ongletTexts">
              <h3>{{ formatDate(text.date) }}</h3>
              <p>{{ text.text }}</p>
            </div>
          </div>
        </template>
        <BoussoleDesEmotions v-else></BoussoleDesEmotions>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import BoussoleDesEmotions from './BoussoleDesEmotions.vue'

const props = defineProps({
  showBoussole: Boolean,
});


const onglets = [
  {
    couleur: 'white',
    text: 'Sport'
  },
  {
    couleur: 'white',
    text: 'Sorties'
  },
  {
    couleur: 'white',
    text: 'Boussole des émotions'
  },
]

const currentOnglet = ref(props.showBoussole ? onglets[onglets.length - 1].text : onglets[0].text)

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
  textAreaText.value = ''
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
  font-family: "Roboto", sans-serif;
  width: 1024px;
  height: 768px;

  border: solid 1px white;
  
  color: #1B5259;
  background-color: #F0F7DC;
}

.onglets {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 0 40px;
}

.onglet {
  border: solid 2px #1B5259;
  border-radius: 5px 5px 0 0;
  min-width: 100px;
  max-width: 300px;
  cursor: pointer;
  padding: 5px 10px;
}

.journal-page {
  margin: 0 40px 40px 40px; 
  padding: 40px; 
  border: solid 4px #1B5259;
  border-radius: 0 10px 10px 10px;
  height: 60%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-textarea {
  padding: 10px;
  height: 90px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.input-textarea:focus {
  border-color: #1B5259; /* Change to desired focus color */
}

.btn {
  display: inline-block;
  padding: 10px 20px;
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
}

.btn:hover {
  background-color: rgba(27, 82, 89, 0.75); /* Button background color on hover */
  color: #fff; /* Button text color on hover */
  border-color: #1B5259; /* Button border color on hover */
}

</style>