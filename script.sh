#!/usr/bin/env bash

URL=$1

getRepos() {
	output=$(curl $URL)
	echo "$output" > "output.html"
	node parse.js 
}

if [[ $URL =~ 'https://github.com' ]]; then
	getRepos
else
	echo "Not valid URL"
fi
