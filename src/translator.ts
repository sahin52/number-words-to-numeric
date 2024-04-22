


const zero = 'zero'
const units: { [key: string]: number } = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}




const teens: { [key: string]: number } = {
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19
};

const tens: { [key: string]: number } = {
    'ten': 10,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};

const hundred = 'hundred';
const exponent: { [key: string]: number } = {
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000,
    'quadrillion': 1000000000000000,
    // 'quintillion',
    // 'sextillion',
    // 'septillion',
    // 'octillion',
    // 'nonillion',
    // 'decillion',
    // 'undecillion',
    // 'duodecillion',
    // 'tredecillion',
    // 'quattuordecillion',
    // 'quindecillion',
    // 'sexdecillion',
    // 'septendecillion',
    // 'octodecillion',
    // 'novemdecillion',
    // 'vigintillion',
}
function getAllNumberWords(): string[] {
    const allNumberWords = [zero]
    allNumberWords.push(...Object.keys(units))
    allNumberWords.push(...Object.keys(teens))
    allNumberWords.push(...Object.keys(tens))
    allNumberWords.push(hundred)
    allNumberWords.push(...Object.keys(exponent))

    return allNumberWords
}



const unitsDict = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}

interface TranslateSentenceOptions {
    convertTeen_TenHundredToNumber?: boolean,
    convertA_AnToNumber: boolean,

}
/**
 * Gets a sentence with numbers written as words replaced with numbers
 */
export function TranslateSentence(sentence: string, options?: TranslateSentenceOptions): string {
    if (typeof sentence !== 'string') {
        throw new Error("Please Specify a sentence")
    }
    const innerStrings = sentence.split(/[ ]/g)
    if (innerStrings.length == 0) return sentence;

    let res = "";
    let previousString = innerStrings[0]
    let totalSum = 0;

    let sumTillHundred = 0;
    // if currently a number is found and it is tried to be converted to int
    let isNumberWordProcessRunning = false;

    let startAddingSpaces = false;
    for (let i = 0; i < innerStrings.length; i++) {
        const currentStr = innerStrings[i]
        const isStringNum = isStringNumber(currentStr)
        if (!isStringNum && isNumberWordProcessRunning) {
            // number conversion ended, convert the older strings
            isNumberWordProcessRunning = false;
            if (startAddingSpaces) res = res + " ";
            res = res + (totalSum + sumTillHundred) + " " + currentStr;
            startAddingSpaces = true;
        } else if (isStringNum && isNumberWordProcessRunning) {
            // continue to add numbers
        } else if (!isStringNum && !isNumberWordProcessRunning) {
            // do nothing, because the string is not number and there wasnt a number conversion process going on
            if (startAddingSpaces) res = res + " ";
            res = res + currentStr;
            startAddingSpaces = true;
            continue;
        } else if (isStringNum && !isNumberWordProcessRunning) {
            isNumberWordProcessRunning = true;
        }
        if (exponent[currentStr] !== undefined) {
            totalSum += sumTillHundred * exponent[currentStr]
            sumTillHundred = 0;
            continue;
        }
        if (currentStr == hundred) {
            // teen/ten hundred? - options todo
            sumTillHundred = sumTillHundred * 100;
            continue;
        }
        if(currentStr == zero){
            isNumberWordProcessRunning = false;
            if (startAddingSpaces) res = res + " ";
            res = res + '0';
        }

        if (teens[currentStr]) {
            sumTillHundred += teens[currentStr];
            continue;
        }
        if (tens[currentStr]) {
            sumTillHundred += tens[currentStr]
            continue;
        }
        if (units[currentStr]) {
            sumTillHundred += units[currentStr]
            continue;
        }

        previousString = innerStrings[i]
    }
    if (isNumberWordProcessRunning) {
        if (startAddingSpaces) res = res + " ";
        res = res + (totalSum + sumTillHundred);
    }

    return res;
    throw new Error("Not Implemented")
}

function isStringNumber(str: string) {
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