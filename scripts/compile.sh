#!/bin/bash
# Expecting to have the game data in the subfolders GTAVC and GTAIII of GAME_DIR defined in gamePath.sh
#git clone --recursive https://github.com/ichlubna/re3LKG.git
# Copy the content of gamefiles to the game data folder
git checkout origin/master
./makeOneBranch.sh GTAIII

git checkout origin/miami
./makeOneBranch.sh GTAVC
