#!/usr/bin/env bash

red='\e[1;31m%s\e[0m\n'
green='\e[1;32m%s\e[0m\n'

printf "%s\n" "Checking for correct node version..."

if [[ $(node --version) != v9* ]];
then
    printf "$red\n" "I need node v9.x.x"
    exit 1
else
    printf "$green\n" "Found node v9.x.x"
fi

printf "Linking modules..."

(cd ldf-facade && npm link)
(cd eri-config && npm link)

(cd eri-microservice-uniprot && npm install --link)
(cd eri-microservice-rhea && npm install --link)
(cd eri-microservice-chebi && npm install --link)
(cd eri-cerebrum && npm install --link)



if [ -z "$ENRICHMENT_CONFIG" ]; then
    export ENRICHMENT_CONFIG=$(pwd)/enrichment.json
fi

rm -f env.sh
printf "export %s=%s\n" "PATH" "$PATH" >> env.sh
printf "export %s=%s\n" "ENRICHMENT_CONFIG" "$ENRICHMENT_CONFIG" >> env.sh







