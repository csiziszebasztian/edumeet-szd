#!/bin/bash

# Define source and destination paths
declare -A paths=(
 ["./configs/app/config.example.js"]="./configs/app/config.js"
 ["./configs/server/config.example.js"]="./configs/server/config.js"
 ["./configs/server/config.example.yaml"]="./configs/server/config.yaml"
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