#!/usr/bin/env bash

sh -c '
npm run start:proxy &
npm run start:login:mock &
npm run start:quiz:mock &
npm run start:tic-tac-toe:mock &
npm run start:statistics:mock &
npm run start:profile:mock &
npm run start:cl:mock &
wait'
