#!/usr/bin/env bash
set -euo pipefail

min_css() {
  in="$1"; out="$2"
  python3 - "$in" "$out" << 'PY'
import re, sys
src, dst = sys.argv[1], sys.argv[2]
s = open(src, 'r', encoding='utf-8').read()
s = re.sub(r"/\*[^*]*\*+(?:[^/*][^*]*\*+)*/", "", s, flags=re.S)  # strip comments
s = re.sub(r"\s+", " ", s)  # collapse whitespace
s = re.sub(r"\s*([{}:;,>])\s*", r"\1", s)  # trim around separators
s = s.replace(";}", "}")
open(dst, 'w', encoding='utf-8').write(s.strip())
PY
}

min_js() {
  in="$1"; out="$2"
  python3 - "$in" "$out" << 'PY'
import re, sys
src, dst = sys.argv[1], sys.argv[2]
s = open(src, 'r', encoding='utf-8').read()
s = re.sub(r"/\*[^*]*\*+(?:[^/*][^*]*\*+)*/", "", s, flags=re.S)  # block comments
s = re.sub(r"(^|[\s;])//.*", r"\1", s, flags=re.M)  # line comments (best-effort)
s = re.sub(r"\s+", " ", s)  # collapse whitespace
s = re.sub(r"\s*([=+\-*/{}();,:<>])\s*", r"\1", s)
open(dst, 'w', encoding='utf-8').write(s.strip())
PY
}

mkdir -p files
min_css files/style.css files/style.min.css
min_css files/overrides.css files/overrides.min.css
min_css files/github-calendar.css files/github-calendar.min.css
min_js files/custom.js files/custom.min.js
echo "Minified: files/style.min.css, files/overrides.min.css, files/github-calendar.min.css, files/custom.min.js"

