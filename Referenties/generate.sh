#!/bin/sh

for f in "alles"
do
    python bittexurl.py -i $f.bib -o $f-en.bib -e
    python bittexurl.py -i $f.bib -o $f-nl.bib -n
done

echo "====> Done!"
