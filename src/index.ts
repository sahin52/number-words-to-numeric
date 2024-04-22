import * as readline from 'readline';
import { TranslateSentence } from './translator'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Write a sentence to translate:', (answer) => {
    
    TranslateSentence(answer)

    rl.close();
});

TranslateSentence("Test two")