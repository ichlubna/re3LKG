#!/bin/bash
set -e
source gamePath.sh
CURRENT_PATH=$(pwd)
./makeOneBranch.sh $1
cd $GAME_DIR/$1/App_Executables/
./reBin
cd $CURRENT_PATH

