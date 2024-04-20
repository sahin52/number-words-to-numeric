import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Write a sentence to translate:', (answer) => {
    
    TranslateSentence(answer)

    rl.close();
});

const translations = {
    "twenty": 20,
    "million": 1000000,

}


/**
 * Gets a sentence with numbers written as words replaced with numbers
 */
function TranslateSentence(sentence: string): string
{
    if(typeof sentence !== 'string'){
        throw new Error("Please Specify a sentence")
    }

    return ""
}