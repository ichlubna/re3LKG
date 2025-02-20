#!/bin/bash
set -e
source gamePath.sh
if [ -z "$1" ]; then
    echo "Use one argument representing the game name GTAVC or GTAIII"
    exit 1
fi
BUILD_DIR=../bin/linux-amd64-librw_gl3_glfw-oal/Release/
CURRENT_PATH=$(pwd)
rm -rf $BUILD_DIR/*
cd ..
premake5 --with-librw gmake2
cd build
make config=release_linux-amd64-librw_gl3_glfw-oal
if [ $? -ne 0 ]; then
    echo "Compilation went wrong!"
    exit 1
fi
cd ../vendor/librw/src/gl/shaders/
make
cd $CURRENT_PATH/
GAME=$GAME_DIR/$1
if [ -z "$( ls -A $BUILD_DIR )" ]; then
    exit 1
fi
if [ -d "$GAME" ]; then
    cp $BUILD_DIR/* $GAME/App_Executables/reBin
else
    echo "Directory with the game does not exist"   
fi

