#!/usr/bin/env node

import { runGSharp } from './index.js';

const args = process.argv.slice(2);
const directory = args[0] || '.'; 

runGSharp(directory);
