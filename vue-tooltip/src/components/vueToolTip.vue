<script setup>
import { arrow, computePosition, flip, offset, shift } from "@floating-ui/dom";
import { ref } from "vue";

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    placement: {
        type: String,
        required: false,
        default: "bottom",
    },
    space: {
        type: Number,
        required: false,
        default: 8,
    },
});

const referenceRef = ref();
const floatingRef = ref();
const arrowRef = ref();
const isHidden = ref(true);

async function calculatePosition() {
    const { x, y, middlewareData, placement } = await computePosition(
        referenceRef.value,
        floatingRef.value,
        {
            placement: props.placement,
            middleware: [
                offset(props.space),
                flip(),
                shift({ padding: 5 }),
                arrow({ element: arrowRef.value }),
            ],
        }
    );

    Object.assign(floatingRef.value.style, {
        left: `${x}px`,
        top: `${y}px`,
    });

    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    const opposedSide = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom",
    }[placement.split("-")[0]];

    Object.assign(arrowRef.value.style, {
        left: arrowX ? `${arrowX}px` : "",
        top: arrowY ? `${arrowY}px` : "",
        bottom: "",
        right: "",
        [opposedSide]: "-4px",
    });
}

function hide() {
    isHidden.value = true;
}

function show() {
    isHidden.value = false;
    calculatePosition();
}
</script>

<template>
    <div class="wrapper">
        <div
            ref="referenceRef"
            class="ref"
            @blur="hide"
            @focus="show"
            @mouseenter="show"
            @mouseleave="hide">
            <slot />
        </div>
        <div
            ref="floatingRef"
            :class="['floating', isHidden && 'hidden']">
            {{ props.content }}
            <div
                ref="arrowRef"
                class="arrow"
                :style="{
                    width: space * 2 + 'px',
                    height: space * 2 + 'px',
                }"></div>
        </div>
    </div>
</template>
<style lang="scss">
$--clr-sofia-gray-100: #37393d;
$backgroud-color: $--clr-sofia-gray-100;
.wrapper {
    display: inline-block;
    .ref {
        display: inline-block;
    }
    .floating {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 50;
        background-color: $backgroud-color;
        font-size: medium;
        color: white;
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        border-radius: 0.5rem;
        cursor: default;
        white-space: pre-wrap;
        .arrow {
            position: absolute;
            z-index: -1;

            background-color: $backgroud-color;
            height: 8px;
            width: 8px;
            rotate: 45deg;
        }
    }
    .hidden {
        display: none;
    }
}
</style>
