import vueToolTip from "./components/vueToolTip.vue";

export default {
    install: (app) => {
        app.component("vue-tooltip", vueToolTip);
    },
};
