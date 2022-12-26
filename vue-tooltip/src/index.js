import vueToolTip from "./components/vueToolTip.vue";

export default {
    install: (app, options) => {
        app.component("vue-tooltip", vueToolTip);
    },
};
