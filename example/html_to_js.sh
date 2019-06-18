#!/usr/bin/env bash

HTML_FILE=$1
JS_FILE=$2

echo "export default \`" > $JS_FILE
cat $HTML_FILE >> $JS_FILE
echo "\`;" >> $JS_FILE