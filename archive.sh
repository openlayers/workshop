#!/bin/bash

#
# Run this script to generate a zip archive for the workshop in a single
# language.
#
set -o errexit

#
# Destination directory for build.
#
BUILD=build

#
# Display usage and exit.
#
display_usage() {
  cat <<-EOF

  Usage: ${1} <lang>

  Example:

    ${1} en

  This will generate a zip archive for the English version of the workshop.
  The openlayers-workshop-en.zip should be posted to the release page.

EOF
}

#
# Exit if the current working tree is not clean.
#
assert_clean() {
  git checkout -- package-lock.json
  source `git --exec-path`/git-sh-setup && \
      require_clean_work_tree "publish" "Please commit or stash them."
}

#
# Build the workshop and create an archive for a single language.
#
build_archive() {
  npm run build
  mkdir -p ${BUILD}/openlayers-workshop-${1}
  cp doc/${1}/README.md ${BUILD}/openlayers-workshop-${1}/
  cp src/${1}/*.* ${BUILD}/openlayers-workshop-${1}
  cp -r src/${1}/data ${BUILD}/openlayers-workshop-${1}/data
  cp -r src/${1}/examples ${BUILD}/openlayers-workshop-${1}/examples
  cp -r ${BUILD}/openlayers-workshop/${1} ${BUILD}/openlayers-workshop-${1}/doc
  cp -r ${BUILD}/openlayers-workshop/gitbook ${BUILD}/openlayers-workshop-${1}/gitbook
  cd ${BUILD}
  zip -FSr ../openlayers-workshop-${1}.zip openlayers-workshop-${1}
}

#
# Build the archive.
#
main() {
  root=$(cd -P -- "$(dirname -- "${0}")" && pwd -P)
  cd ${root}
  assert_clean
  build_archive ${1}
}

if test ${#} -ne 1; then
  display_usage ${0}
  exit 1
else
  main ${1}
fi
