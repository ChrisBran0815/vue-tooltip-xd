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

const hide = () => {
    isHidden.value = true;
};

const show = () => {
    isHidden.value = false;
    calculatePosition();
};
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
$background-color: #37393d;
$text-color: white;
$font-family: "Roboto", sans-serif;
$font-size: medium;
$animation-time: 0.25s;
$padding-tooltip: 0.25rem 0.5rem 0.25rem 0.5rem;

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

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
        background-color: var(--clr-vue-tooltip-bg, $background-color);
        font-family: var(--font-vue-tooltip-family, $font-family);
        font-size: var(--font-vue-tooltip-size, $font-size);
        color: var(--clr-vue-tooltip-text, $text-color);
        padding: var(--p-vue-tooltip-inside, $padding-tooltip);
        border-radius: 0.5rem;
        cursor: default;
        white-space: pre-wrap;
        animation: fadeIn var(--time-vue-tooltip, $animation-time) ease-in-out
            forwards;
        .arrow {
            position: absolute;
            z-index: -1;
            background-color: var(--clr-vue-tooltip-bg, $background-color);
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
