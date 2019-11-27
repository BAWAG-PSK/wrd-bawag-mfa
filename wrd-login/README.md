# Login Micro Frontend

Purpose: Intermediary micro frontend to show case the private event bus
### To login, introduce the credentials: 
username: `weAreDevelopers`   
password: `123`

## TODO

The credentials for a successful login can be found either in `wrd-login/src/app/core/service/login-mock.service.ts` for mock mode, 
or in the proxy `wrd-proxy/src/index.ts`.

Extend the current application

#### Implement the following

##### 1) Make the "eye" button show the password on click and show dots if pressed again:
Hint: use clarity to provide the "eye-hide" image!

##### 2) Create a new Quiz for one new category with backend API:
After a unsuccessful login, show an alert that indicates that the credentials are wrong. 

##### 3) Create an animation on login failed, that makes the user better understand that the password is wrong.

## Run standalone (Development mock mode)

`npm run serve:mock`

## Run standalone (Development mode)

Will use the real services (`core.module.mock` vs `core.module`)  
`npm run serve`

## Run in composition layer (Production mock mode)

`npm run serve:ext:mock`

## Deploy to Azure

`npm run deploy`
