import * as readline from 'readline';
import { NumberWordsToNumeric } from './NumberWordsToNumeric'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('Welcome! Type your input to convert numbers as words into integers. Press Ctrl+C to exit.');
  
  const processInput = (input: string) => {
    NumberWordsToNumeric(input);
  };
  
  rl.on('line', (input) => {
    processInput(input);
  });