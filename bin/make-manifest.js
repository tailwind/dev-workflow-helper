#!/usr/bin/env node

/**
 * Update the `version` of our extension manifest file based on our
 * package.json version.
 *
 * We run this script before building our extension for distribution.
 *
 * This script prevents needing to manually upgrade the versions of the extension manifest.
 * We only need to increment the `package.json` version.
 *
 * @command - `npm run make:manifest`
 */

const fs = require('fs');
const path = require('path');

const manifest = require('../manifest.json');

manifest.version = require('../package.json').version;

const manifestPath = path.resolve(__dirname, '../dist/build/manifest.json');

fs.writeFile(
  manifestPath,
  JSON.stringify(manifest, null, 2),
  err => { if (err) throw err; }
);
