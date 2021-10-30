<template>
    <v-stage :config="configKonva">
        <v-layer>
            <v-circle :config="configCircle"></v-circle>
        </v-layer>
    </v-stage>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    @Options({
        props: {
            msg: String
        }
    })
    export default class Board extends Vue {
        ctx: CanvasRenderingContext2D | null = null
        msg!: string
        data() {
            return {
                configKonva: {
                    width: 200,
                    height: 200
                },
                configCircle: {
                    x: 100,
                    y: 100,
                    radius: 70,
                    fill: "red",
                    stroke: "black",
                    strokeWidth: 4
                }
            };
        }
    }
</script>

<style scoped>

</style>
