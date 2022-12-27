<p align="center">
<h1>Vue ToolTip</h1>
</p>

[![npm version](https://img.shields.io/npm/v/vue-tooltip-xd?color=green)](https://www.npmjs.com/package/vue-tooltip-xd)
[![License](https://img.shields.io/npm/l/vue-tooltip-xd)](https://www.npmjs.com/package/vue-tooltip-xd)

# Getting started

1. Install the component:

```
npm i vue-tooltip-xd
```

2. Add the plugin into your app:

```javascript
import { createApp } from "vue";
import App from "./App.vue";

import vueToolTip from "vue-tooltip-xd";
import "vue-tooltip-xd/dist/style.css";

const app = createApp(App);

app.use(vueToolTip);
app.mount("#app");
```

3. Add the Component in yout HTML

<p align="center">
<img src="https://github.com/christoph-xd/vue-tooltip-xd/blob/main/img/tooltip.png" alt="Screenshot"/>
</p>

```html
<vue-tooltip
    placement="bottom"
    content="The ToolTip Text">
    <button>Push Me</button>
</vue-tooltip>
```

The available placement are:

-   top
-   bottom
-   left
-   right

the default value is bottom

4. Style variables

```css
/* colors var */
--clr-vue-tooltip-bg        /*background-color for the ToolTip */
--clr-vue-tooltip-text      /*color for the ToolTip */
/* font var*/
--font-vue-tooltip-family   /*font-family for the ToolTip */
--font-vue-tooltip-size     /*font-size for the ToolTip */
```

Follow the Project at GitHub https://github.com/christoph-xd/vue-tooltip-xd.git .
