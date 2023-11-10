import * as sentry from "@sentry/astro";

Sentry.init({
    dsn: 'https://3ec5190943c3445d314ff2144751d8c1@o436943.ingest.sentry.io/4505986690973696',
    integrations: [
        new BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ["localhost", /^https:\/\/mckerlie\.io\/api/],
        }),
        new sentry.Replay({
            maskAllText: false,
        }),
    ],
    environment: process.env.SENTRY_ENVIRONMENT,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
});