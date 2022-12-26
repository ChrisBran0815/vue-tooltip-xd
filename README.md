# Getting started

1. Install the plugin:

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
