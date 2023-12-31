// import { createApp } from 'vue';

// const app = createApp({});

// export const eventBus = app


// eventBus.js

import { createApp } from 'vue';

const app = createApp({});
const eventBus = app;

export const provideEventBus = () => {
  app.provide('eventBus', eventBus);
};
