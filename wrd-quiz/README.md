# Quiz Micro Frontend

Purpose: Quiz game with different categories/topics

## TODO

The format of the quiz (1 quiz per category) can be seen here: 
`src/app/core/quiz/fixtures/quiz.fixture.ts`

Extend the current application

#### Implement the following

##### 1) Dashboard where different quiz-categories can be chosen

E.g. 4 big image buttons: "IT", "Geography", "History", "Animals"

Put this dashboard (quiz-selector) into the `features` folder.
Categories: Geography, History, Animals, Sports or whatever [opentdb](https://opentdb.com/api_config.php) offers.

##### 2) Create a new Quiz for one new category with backend API

As backend use [opentdb](https://opentdb.com/api_config.php).

##### a) Generate API URL
API Helper:
- Number of Questions: `10`
- Category: one that you just provided
- Difficulty: as you wish
- Type: `Multiple Choice`
- Encoding: `Default Encoding`

-> `GENERATE API URL`
e.g. `https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple`

##### b) Configure Reverse Proxy
`config/default.json` -> `apiUrl`: `https://opentdb.com/api.php`
That means that when invoked by UI as `/api/quiz`, the proxy goes to `https://opentdb.com/api.php`.

##### c) Adapt UI 
Call endpoint via e.g. `/api/quiz?amount=10&category=22&difficulty=hard&type=multiple` 
and map the response, e.g.
```
{
  "category": "Geography",
  "type": "multiple",
  "difficulty": "hard",
  "question": "What country is not a part of Scandinavia?",
  "correct_answer": "Finland",
  "incorrect_answers": [
    "Norway",
    "Sweden",
    "Denmark"
  ]
}
```

to our data model, see `src/app/core/quiz/fixtures/quiz.fixture.ts`.

## Run standalone (Development mock mode)

`npm run serve:mock`

## Run standalone (Development mode)

Will use the real services (`core.module.mock` vs `core.module`)
`npm run serve`

## Run in composition layer (Production mock mode)

`npm run serve:ext:mock`

## Deploy to Azure

`npm run deploy`
