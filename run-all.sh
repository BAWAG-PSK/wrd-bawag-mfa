#!/usr/bin/env bash

sh -c '
npm run start:proxy &
npm run start:login &
npm run start:quiz &
npm run start:tic-tac-toe &
npm run start:statistics &
npm run start:profile &
npm run start:cl &
wait'
