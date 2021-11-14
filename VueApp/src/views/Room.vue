<template>
    <h3>Room <code>{{$route.params.id}}</code></h3>
    <div style="align-content:center">
        <div style="display:inline-block">
            <board></board>
        </div>
    </div>
    <div style="width:60%; left:20%; position:relative;border:1px solid black;margin:2px">
        <h4>Chat here:</h4>
        <input v-model.trim="msg" placeholder="enter msg"/>
        <button :disabled="disabled" @click="submit">Submit</button>
        <div style="width:90%; left:5%; position:relative">
            <p align="left" style="border:solid black 1px;align-content:baseline" v-for="msg in msgs" v-html="msg.content" :key="msg.id" />
        </div>
    </div>
</template>

<script lang="ts">
    import Board from '@/components/Board.vue'
    import { defineComponent } from 'vue';
    import axios from "axios";


    export default defineComponent({
        data() {
            return {
                msg: "",
                msgs: new Array<{ id: number, content: string }>(0),
                nmsg: 0
            }
        },
        computed: {
            disabled(): boolean {
                return this.msg === "";
            }
        },
        methods: {
            submit() {
                var path = `/room/${this.$route.params.id}/chat/add`;
                var data = {
                    content: this.msg
                };
                axios.post(path, data, { baseURL: "http://localhost:1234", withCredentials: true }).then((res) => {
                    console.log(`posted msg [ ${this.nmsg}] res.data: `, res.data);
                });
                this.msgs.push({ id: this.nmsg, content: this.msg });
                this.msg = "";
                this.nmsg++;
            }
        },
        beforeMount() {
            var path = `/room/${this.$route.params.id}/chat/all`;
            axios.get(path, { baseURL: "http://localhost:1234", withCredentials: true }).then((res) => {
                if (res.status !== 200) {
                    throw new Error("Cannot get all chat messages.");
                }
                console.log(res.data);
                this.msgs = res.data;
                this.nmsg = this.msgs.length;
            });
        },
        components: {
            "board": Board
        }
    });
</script>

<style scoped>
</style>