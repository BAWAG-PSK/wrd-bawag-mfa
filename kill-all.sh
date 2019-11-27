#!/usr/bin/env bash
# see https://unix.stackexchange.com/questions/204480/run-multiple-commands-and-kill-them-as-one-in-bash

sh -c '
npm run kill:proxy &
npm run kill:login &
npm run kill:quiz &
npm run kill:tic-tac-toe &
npm run kill:statistics &
npm run kill:profile &
npm run kill:cl &'

# Press Ctrl+C to kill them all
