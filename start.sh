#!/usr/bin/env bash

if [ ! -f env.sh ]; then
    echo "env.sh not found; please run config.sh first"
    exit 1
fi

tmux kill-server

SHELL=$(which bash) tmux new-session -s "enrichment" -d "heytmux workspace.yml"  

tmux attach -t enrichment


