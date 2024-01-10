#!/bin/bash

# Define source and destination paths
declare -A paths=(
 ["../app/public/config/config.js"]="./configs/app/config.js"
 ["../server/config/config.js"]="./configs/server/config.js"
 ["../server/config/config.yaml"]="./configs/server/config.yaml"
 # Add more paths as needed
)

# Loop over the paths array
for source in "${!paths[@]}"; do
 destination=${paths[$source]}

 # Create the destination directory if it doesn't exist
 mkdir -p $(dirname "$destination")

 # Copy the source file to the destination
 cp "$source" "$destination"
done