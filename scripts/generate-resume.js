#!/usr/bin/env node
/* global process */

/**
 * generate-resume.js
 *
 * Reads content.yaml → renders ResumeDocument → writes public/resume.pdf
 *
 * Usage:
 *   node scripts/generate-resume.js
 *   npm run generate:resume
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import YAML from 'yaml';
import ResumeDocument from '../src/resume/ResumeDocument.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const yamlPath = resolve(__dirname, '../src/data/content.yaml');
const outputPath = resolve(__dirname, '../public/resume.pdf');

async function main() {
  console.log('📄 Reading content.yaml...');
  const raw = readFileSync(yamlPath, 'utf8');
  const data = YAML.parse(raw);

  console.log(`👤 Generating resume for: ${data.basics?.name}`);
  await ReactPDF.renderToFile(
    React.createElement(ResumeDocument, { data }),
    outputPath
  );

  console.log(`✅ Resume written to: ${outputPath}`);
}

main().catch((err) => {
  console.error('❌ Failed to generate resume:', err);
  process.exit(1);
});
