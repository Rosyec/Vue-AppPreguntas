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
    console.log(value);
    console.log(value);
    if ( value.length === 0 ) result.value = { answer: '', forced: false, image: '' };
    if( !value.includes('?') ) return;
    console.log(value);
    handle.getResult();
});

const getResult = async () => {
    try {
        const answer = await getAnswer();
        result.value = answer;
    } catch (error) {
        console.log('Error Simulado: ', error);
        result.value.answer = 'Fallo la conexion al API';
        result.value.image = '';        
    }
}

const handle = {
    //Esto es para poder testear si la funcion getResult es llamada.
  getResult,
  result
}

defineExpose({ handle });
//Exponemos el objeto handle para poderlo testear.

</script>

<template>
    <div class="container text-center">
        <div>
            <h1>¡Realizar Pregunta!</h1><br>
        </div>
        <div class="row">
            <div class="col-md-8">
                <input
                class="form-control"
                type="text"
                name="pregunta"
                placeholder="No olvides dejar al final de cada pregunta un '?'"
                v-model="question">
            </div>
        </div>
        <div class="row">
            <div class="col-md-10">
                <h2 aria-label="answer" class="mt-3" v-show="result.answer"> {{ result.answer === 'yes' ? 'Si' : 'No' }} </h2>
                <img class="mt-3" width="200" height="200" v-show="result.image" :src="result.image" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'Roboto';
    src: url(../assets/fonts/Roboto-Medium.ttf) format("truetype");
}
.container {
    min-height: 90vh;
}

.row {
    justify-content: center;
}

input {
    padding: 0.8em;
    text-align: center;
    border-radius: 999px 999px 999px 999px;
    font-family: Roboto;
    color: brown;
    box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.3);
}

img {
    border-radius: 999px 999px 999px 999px;
}

* {
    margin: 0;
    padding: 0;
}
</style>