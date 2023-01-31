<script setup lang="ts">
import type { Answer } from '@/interfaces/answer.interface';
import { ref, watch, type Ref, } from 'vue';
import { getAnswer } from "../services/getAnswer.service";

let question: Ref<string> = ref('');
let result: Ref<Answer> = ref({
    answer: '',
    forced: false,
    image: ''
});

watch(question, (value, oldValue) => {
    if ( value.length === 0 ) result.value = { answer: '', forced: false, image: '' };
    if( !value.includes('?') ) return;
    getResult();
    
});

const getResult = async () => {
    const answer = await getAnswer();
    result.value = answer;
}

</script>

<template>
    <div class="content">
        <div>
            <h1>¡Realizar Pregunta!</h1><br>
        </div>
        <div>
            <input
              class="form-control"
              type="text"
              name="pregunta"
              placeholder="No olvides dejar al final de cada pregunta un '?'"
              v-model="question">
        </div>
        <div>
            <!-- <h5 class="mt-3"> {{ question }} </h5> -->
            <h2 class="mt-3" v-show="result.answer"> {{ result.answer === 'yes' ? 'Si' : 'No' }} </h2>
            <img class="mt-3" width="300" height="300" v-show="result.image" :src="result.image" alt="">
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'Roboto';
    src: url(../assets/fonts/Roboto-Medium.ttf) format("truetype");
}
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
}

input {
    width: 500px;
    padding: 0.8em;
    text-align: center;
    border-radius: 999px 999px 999px 999px;
    font-family: Roboto;
    color: brown;
    box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.3);
}

img {
    border-radius: 999px 999px 999px 999px;
    box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.3);
}

* {
    margin: 0;
    padding: 0;
}
</style>