<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <p>Welcome to RayChess!</p>
        <input v-model.trim="roomid" placeholder="enter room id..."/>
        <router-link :to="roomaddr"><button :disabled="disabled">Join</button></router-link>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        data() {
            return {
                roomid: ""
            }
        },
        computed:{
            roomaddr(): string {
                return "/room/" + this.roomid;
            },
            disabled(): boolean {
                return this.roomid==="";
            }
        }
    });
</script>

<style scoped>
</style>