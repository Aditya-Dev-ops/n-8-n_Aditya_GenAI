// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Sentry.init({
//   dsn: "https://698e52fec06cdf6e49a6a78c45544ff2@o4504583782531072.ingest.us.sentry.io/4511029707669504",

//   // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
//   tracesSampleRate: 1,

//   // Enable logs to be sent to Sentry
//   enableLogs: true,

//   // Enable sending user PII (Personally Identifiable Information)
//   // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
//   sendDefaultPii: true,
// });


// Import with `import * as Sentry from "@sentry/nextjs"` if you are using ESM

Sentry.init({
  dsn: "https://698e52fec06cdf6e49a6a78c45544ff2@o4504583782531072.ingest.us.sentry.io/4511029707669504",
  // Tracing must be enabled for agent monitoring to work
  tracesSampleRate: 1.0,
  // Add data like inputs and responses to/from LLMs and tools;
  // see https://docs.sentry.io/platforms/javascript/data-management/data-collected/ for more info
  sendDefaultPii: true,

});