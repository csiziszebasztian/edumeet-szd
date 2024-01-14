#!/bin/bash

#Paths
app="./app/public"
server="./server/config"

# Define source and destination paths
declare -A paths=(
 ["$app/config.example.js"]="$app/config.js"
 ["$server/config.example.js"]="$server/config.js"
 ["$server/config.example.yaml"]="$server/config.yaml"
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