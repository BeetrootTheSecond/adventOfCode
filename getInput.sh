#!/bin/sh
set -e

year=2020
day=$1
#echo $day
if [ -z "$1" ]
  then
    day=$( date +%d )
  else
  day=$1
fi

output_path="$(printf '%s/day_%02d/input.txt' ${year} "${day:?gimme a day}")"
cookie='session=53616c7465645f5f060e7e5f2b95a95dbfbfe4d3fc56671ec29cfaae82f9090a7b194c987b024dcfba09c4ffc2c75820'  # set this from the login session
#echo $output_path

[ -f "$output_path" ] && {
	echo already loaded

	exit
} >&2

#echo "https://adventofcode.com/$year/day/$day/input"
curl --fail -sS -b "$cookie" "https://adventofcode.com/$year/day/$day/input" --create-dirs -o "$output_path"