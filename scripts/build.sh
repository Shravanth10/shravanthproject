#!/usr/bin/env bash

echo -e "\n\n########### Building Source module ########### "
echo -e "1. Clearing target/"
rm -rf target/
if [[ $? -eq 0 ]];then
   echo -e "\t Cleared target/ successfully"
else
   echo -e "\t Error while clearing target/"
   exit 1
fi

echo -e "2. Downloading npm dependencies"
npm install --force
if [[ $? -eq 0 ]];then
   echo -e "\t Downloaded dependencies"
else
   echo -e "\t Failed to download dependencies"
   exit 1
fi

echo -e "3. Transpiling TS into JS"
node_modules/.bin/tsc -b --verbose --extendedDiagnostics
if [[ $? -eq 0 ]];then
   echo -e "\t Transpiled TS into JS in target/ successfully"
else
   echo -e "\t Failed while transpiling TS into JS"
   exit 1
fi

echo -e "Source module compiled successfully."
