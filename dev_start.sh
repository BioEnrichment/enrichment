#!/usr/bin/env bash

if [ ! -f dev_env.sh ]; then
    echo "dev_env.sh not found; please run dev_config.sh first"
    exit 1
fi

tmux kill-server

SHELL=$(which bash) tmux new-session -s "enrichment" -d "heytmux dev_workspace.yml"  

tmux attach -t enrichment


