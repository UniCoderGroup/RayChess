<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Board msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Board from '@/components/Board.vue'; // @ is an alias to /src

@Options({
  components: {
    Board,
  },
})
export default class Home extends Vue {}
</script>
