<template>
    <v-stage :config="configKonva">
        <v-layer>
            <v-circle :config="configCircle"></v-circle>
            <mirror :x="1" :y="1" :style="mirrorStyle" :type="type"></mirror>
        </v-layer>
    </v-stage>
</template>

<script lang="ts">
    import Mirror from "@/components/BoardMirror.vue"
    import * as _r from '@/core/Core'
    import { defineComponent } from "vue";
    export default defineComponent({
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
                },
                mirrorStyle: {
                    height: 10,
                    width: 10,
                    strokeWidth:2
                } as _r.MirrorStyle,
                type: _r.TypeOfMirror.Left
            };
        },
        components: {
            "mirror": Mirror
        }
    });
</script>

<style scoped>
</style>
