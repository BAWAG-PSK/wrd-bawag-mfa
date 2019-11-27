# Statistics Micro Frontend

Purpose: Generate insights about the user's:
- strength/weaknesses
- habits

## TODO

Use the provided mock data: 
`/src/app/core/statistics/fixtures/statistics.fixture.ts`

Visualize the gaming data using [ngx-charts](https://swimlane.gitbook.io/ngx-charts/).

####Address the following questions

##### 1) Strongest/Weakest field of knowledge

Correct/Incorrect answers per category?
e.g .pie diagram for each category

##### 2) Play-intense days

How many games on which days (Mon-Sun)?
e.g. histogram

##### 3) Best gaming time

Interval of 2h - when are most correct answers given?

##### 4) Worst gaming time

Interval of 2h - when are most incorrect answers given?


## Run standalone (Development mock mode)

`npm run serve:mock`

## Run in composition layer (Production mock mode)

`npm run serve:ext:mock`

## Deploy to Azure

`npm run deploy`
