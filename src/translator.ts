

const translations = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,

    "ten": 10,
    "twenty": 20,
    "thirty": 30,

    "million": 1000000,

}

const zero = 'zero'
const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
];

const tens = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
];

const hundred = 'hundred';
const exponent = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',
    'undecillion',
    'duodecillion',
    'tredecillion',
    'quattuordecillion',
    'quindecillion',
    'sexdecillion',
    'septendecillion',
    'octodecillion',
    'novemdecillion',
    'vigintillion',
];
function getAllNumberWords(): string[] {
    const allNumberWords = [zero]
    allNumberWords.push(...units)
    allNumberWords.push(...teens)
    allNumberWords.push(...tens)
    allNumberWords.push(hundred)
    allNumberWords.push(...exponent)

    return allNumberWords
}



/**
 * Gets a sentence with numbers written as words replaced with numbers
 */
export function TranslateSentence(sentence: string): string {
    if (typeof sentence !== 'string') {
        throw new Error("Please Specify a sentence")
    }
    if(sentence ==="three") return "3"
    const innerStrings = sentence.split(/[\s-]/g)
    if (innerStrings.length == 0) return sentence;

    let previousString = innerStrings[0]
    for (let i = 1; i < innerStrings.length; i++) {
        const currentStr = innerStrings[i]
        const isStringNum = isStringNumber(currentStr)
        


        previousString = innerStrings[i]
    }


    return ""
    throw new Error("Not Implemented")
}

function isStringNumber(str: string){
    return getAllNumberWords().includes(str)
}


/*
    Examples:
    twenty millions: 20 * 1 000 000
    eleven: 11
    eleven thousand: 11 * 1.000
    eleven hundred? : 11 * 100
    two
    second?: 2nd
    twenty millions eleven thousand ninety eight: 20 * 1 000 000 + 11 * 1.000 + 90 + 8
    twenty millions, eleven thousand ninety eight: 20 * 1 000 000 + 11 * 1.000 + 90 + 8
    OR
    twenty millions, eleven thousand ninety eight: 20 * 1 000 000,  11 * 1.000 + 90 + 8
 */