#! /bin/bash

dr=$(dirname ${0})

cat ${dr}/purim/PurimTorah.md | md-to-pdf --stylesheet ${dr}/purim/purim.css --as-html > ${dr}/pages/purim/PurimTorah.html
cat ${dr}/purim/PurimTorah.md | md-to-pdf --stylesheet ${dr}/purim/purim.css --pdf-options '{"margin":"20mm 20mm"}' > ${dr}/pages/purim/PurimTorah.pdf
