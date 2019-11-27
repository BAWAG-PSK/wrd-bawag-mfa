# We Are Developers (WRD) BAWAG P.S.K. Micro Frontend Architecture (MFA)

This is the repository of the workshop  [Black Magic: Micro Frontends without Web Components](https://www.wearedevelopers.com/events/congress-vienna/workshops/).

Do you want to know how to develop a huge frontend app with low risk by applying divide and conquer? 
And are you also curios about the possibility of fully vertical and autonomous teams that work in parallel on that app? 

You will not only learn about the core idea of Micro Frontends, but also write one. 

In detail, after this Workshop you will know: 

- how to create an application that is based on a Micro Frontend Architecture which is based entirely on Angular but NOT Angular Elements and works in IE 11 
- how communication can be set up in such an architecture (DOM-Events vs. Event-Bus) - how Micro Frontends can be wired together to a single app SPA 
- how to support uniform styling throughout Micro Frontends 
- how to develop a Micro Frontend standalone using Webpack features like Hot-Module-Replacement (HMR) 
- how to bundle and deploy a Micro Frontend standalone with a bundle size < 20 kB

## Included projects

Each project contains a README.md with instructions (what to do during the workshop).
For the sake of simplicity we included every "sub-project" in the same repository as the parent-project.
In a real-world scenario those would be separate repositories.

***You can develop each micro frontend standalone or in the context of the whole application.***
Because we are focusing on the fronted part and do not write backend services, we will use the mock-mode
for developing our micro frontends.
Run:
- `npm run serve:mock` to develop the micro frontend standalone (own index.html) in mock-mode
- `npm run serve:ext:mock` to build it for the composition layer (as feature module) but with mock-configuration

To run the whole application (composition layer, proxy, micro frontends) you have to:
- run the reverse proxy
- run the composition layer
- run each micro frontend in "ext" or "prod" mode

### wrd-proxy

The reverse proxy that is the glue between micro frontends and micro services.
It has two configured environments (NODE_ENV):
- default (`npm start`): for local development
- azure(`npm run start:azure`): for loading the (in Azure) deployed micro frontends

***This project is not deployed to Azure!*** You have to start it with the azure-configuration
to see what other teams have deployed.

### wrd-cl

The composition layer serves the `index.html` and provides the root modules (`BrowserModule`).
It contains the root-router (`RouterModule.forRoot(...)`) and is responsible to load other micro frontends.
Besides that, it provides external libraries (angular, clarity design, etc.) to those micro frontends,
so their bundle size is reduced.

***This project is already provided and deployed, you must not make any changes here.***

### wrd-login

The micro frontend that handles the login process. After successful login it sends an event
via the private event-bus to the composition layer.

### wrd-quiz

A quiz game micro frontend.

### wrd-tic-tac-toe

A tic-tac-toe game micro frontend.

### wrd-statistics

A micro frontend that displays game statistics.

### wrd-profile

A micro frontend that allows the user to edit its user profile.

### wrd-web-libs

A library project that contains the shared library (private event-bus).

***You must not make any changes here.***

### wrd-nexus

A fake nexus that serves the library project (from wrd-web-libs).

***You must not make any changes here.***
