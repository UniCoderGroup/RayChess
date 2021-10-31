<template>
    <v-line :x="x * style.width"
            :y="y * style.height"
            :points="points"
            :stroke="color"
            :strokeWidth="style.strokeWidth"
            @onclick="handleClick" />
    )
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import * as _r from '@/core/Core'
    export default defineComponent({
        props: {
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            style: {
                type: Object as PropType<_r.MirrorStyle>,
                required: true
            },
            type: {
                type: Number,
                required: true
            },
            handleClick: {
                type: Function as PropType<()=>void>
            }
        },
        data() {
            return {
                msg: "",
                msgs: new Array<{ id: number, content: string }>(0),
                nmsg: 0
            }
        },
        computed: {
            points(): number[] {
                let w = this.style.width;
                let h = this.style.height;
                let lt = [0, 0];
                let rt = [w, 0];
                let lb = [0, h];
                let rb = [w, h];
                let points: number[] = [];
                switch (this.type) {
                    case _r.TypeOfMirror.Left:
                        points = lt.concat(lb);
                        break;
                    case _r.TypeOfMirror.Right:
                        points = rt.concat(rb);
                        break;
                    case _r.TypeOfMirror.Top:
                        points = lt.concat(rt);
                        break;
                    case _r.TypeOfMirror.Bottom:
                        points = lb.concat(rb);
                        break;
                    case _r.TypeOfMirror.Slash:
                        points = rt.concat(lb);
                        break;
                    case _r.TypeOfMirror.BackSlash:
                        points = lt.concat(rb);
                        break;
                }
                return points;
            }
        }
    });
</script>

<style scoped>
</style>