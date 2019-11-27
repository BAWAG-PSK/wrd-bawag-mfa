# Profile Micro Frontend

Purpose: changeable user profile

## TODO

##### 1) Avatar Selector

Extend the current profile-page with an avatar selector.
Use [ngx-avatar](https://www.npmjs.com/package/ngx-avatar) for this.
Tasks:

- add some new avatar files (assets folder)
- provide the user with different choices (avatar selector)
- extend the form group with the path to the avatar file
- save the profile (inside the service) to local storage

##### 2) Load Profile

When the profile page opens:

- check if a saved profile is available in local storage
- if so: load and display it

##### 3) Styling & Validation

Make the page look nice (save button to right side) and
trigger clarity validations (on inputs) on click on save button.

##### 4) Deploy

Don't forget to deploy (`npm run deploy`)!
Does the image get displayed correctly?
Maybe you have to refer to it with an absolute path ;-)

## Run standalone (Development mock mode)

`npm run serve:mock`

## Run standalone (Development mode)

Will use the real services (`core.module.mock` vs `core.module`)
`npm run serve`

## Run in composition layer (Production mock mode)

`npm run serve:ext:mock`

## Deploy to Azure

`npm run deploy`
