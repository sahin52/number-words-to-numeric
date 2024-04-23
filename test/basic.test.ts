import test from 'node:test'
import assert from 'node:assert'
import { NumberWordsToNumeric } from '../src/NumberWordsToNumeric'
import { t } from 'tap/dist/commonjs/main'

test('Basic',()=>{
  assert.equal(NumberWordsToNumeric("three"), "3")
  assert.equal(NumberWordsToNumeric("thirty"), "30")
  assert.equal(NumberWordsToNumeric("five"), "5")
  assert.equal(NumberWordsToNumeric("forty"), "40")
  assert.equal(NumberWordsToNumeric("ninety"), "90")
  assert.equal(NumberWordsToNumeric("seventy"), "70")
  assert.equal(NumberWordsToNumeric("zero"), "0")
})

test('String Containing Only Numbers',()=>{
  assert.equal(NumberWordsToNumeric("two million fifty thousand sixty two"), "2050062")
  assert.equal(NumberWordsToNumeric("nine hundred ninety nine trillion nine hundred ninety nine billion eight hundred seventy six million five hundred forty three thousand two hundred twenty one"), "999999876543221")
})

test('Actual Tests', () => {
  assert.equal(NumberWordsToNumeric("I love fifty trillion seventy people on earth"), "I love 50000000000070 people on earth")
  assert.equal(NumberWordsToNumeric("I don't even have one dollar"), "I don't even have 1 dollar")
  assert.equal(NumberWordsToNumeric("I have zero dollar"), "I have 0 dollar")
  assert.equal(NumberWordsToNumeric("He paid twenty millions for three such cars."), "He paid 20000000 for 3 such cars.")
  
})

test('Strings Without Numbers', ()=>{
  assert.equal(NumberWordsToNumeric("hello world"), "hello world")
  assert.equal(NumberWordsToNumeric("1a2b"), "1a2b")
  assert.equal(NumberWordsToNumeric("."), ".")
  assert.equal(NumberWordsToNumeric("  "), "  ")
  assert.equal(NumberWordsToNumeric(" "), " ")
  assert.equal(NumberWordsToNumeric(" . "), " . ")
  assert.equal(NumberWordsToNumeric("oneman"), "oneman")
  assert.equal(NumberWordsToNumeric("twelwe"), "twelwe")
  assert.equal(NumberWordsToNumeric("#!..,.,.,.123123++'+'^+\n\n \t.."), "#!..,.,.,.123123++'+'^+\n\n \t..")
  assert.equal(NumberWordsToNumeric("asdadahsdjkasd,.,.,.,asdasdad,.,.,1231,."), "asdadahsdjkasd,.,.,.,asdasdad,.,.,1231,.")
  assert.equal(NumberWordsToNumeric("My name is not Kasap!"), "My name is not Kasap!")
  assert.equal(NumberWordsToNumeric("ASDASDADQWEQWEQWEASDASDASDQWEQWEQasdasdqweqweasdasqweqweqweoneoneoneoneone"), "ASDASDADQWEQWEQWEASDASDASDQWEQWEQasdasdqweqweasdasqweqweqweoneoneoneoneone")
})
test('Empty String', ()=>{
  assert.equal(NumberWordsToNumeric(""), "")
})

test('Capital letters',()=>{
  assert.equal(NumberWordsToNumeric("One hundred books"), "100 books");
  assert.equal(NumberWordsToNumeric("One Thousand Ninety Eight books"), "1098 books");
  assert.equal(NumberWordsToNumeric("Fifty six apples"), "56 apples");
  assert.equal(NumberWordsToNumeric("Three hundred seventy two pencils"), "372 pencils");
  assert.equal(NumberWordsToNumeric("Four thousand five hundred twenty one candies"), "4521 candies");
  assert.equal(NumberWordsToNumeric("Sixty seven thousand eight hundred ninety five dollars"), "67895 dollars");
  assert.equal(NumberWordsToNumeric("Two million three hundred forty five thousand six hundred seventy nine books"), "2345679 books");
})

test('Trailing Whitespace',()=>{
  assert.equal(NumberWordsToNumeric(" fifty five "), " 55 ")

})

test('Tens Hundred',()=>{ // TODO: decide what to expect
  assert.equal(NumberWordsToNumeric("nineteen hundred fifty eight"), "1958")
})

test('Locale',()=>{
  assert.equal(NumberWordsToNumeric("I need three thousand nine hundred nineteen books.",{numberFormat:'en-US', numberFormatOptions:{}}), "I need 3,919 books.");
})

test('Punctuations', ()=>{
  assert.equal(NumberWordsToNumeric("The year was one thousand nine hundred nineteen."), "The year was 1919.");
  assert.equal(NumberWordsToNumeric("number of books is one hundred million nineteen, number of notebooks are three hundred twenty billion two million one hundred twelve!"), "number of books is 100000019, number of notebooks are 320002000112!");
  assert.equal(NumberWordsToNumeric("Countdown! nine,eight,seven,six,five,four,three,two,one,zero!!!"), "Countdown! 9,8,7,6,5,4,3,2,1,0!!!");
  assert.equal(NumberWordsToNumeric("The marathon runner completed the race in just under three hours, finishing at two hours, fifty nine minutes, and fifty nine seconds."), "The marathon runner completed the race in just under 3 hours, finishing at 2 hours, 59 minutes, and 59 seconds.");
  assert.equal(NumberWordsToNumeric("The book contains chapters one through ten."), "The book contains chapters 1 through 10.");
})
// test('Decimal Points',()=>{
//   assert.equal(NumberWordsToNumeric("It's three hundred eighty six point thirty grams"), "It's 386.30 grams");
// })
// test('Number after number',()=>{
//   assert.equal(NumberWordsToNumeric("two three twenty four sixty eight"), "2 3 24 68")
//   assert.equal(NumberWordsToNumeric("one two three four five six seven eight nine ten twelve one thousand one hundred million"), "1 2 3 4 5 6 7 8 9 10 12 1000 100000000")
// })



// test('Negative Numbers',()=>{
//   assert.equal(NumberWordsToNumeric("minus five"), "-5")
//   assert.equal(NumberWordsToNumeric("I have minus two thousand dollars in my bank account"), "I have -2000 dollars in my bank account")
// })

// test('Nil As Zero',()=>{
//   assert.equal(NumberWordsToNumeric("The score is two-nil"), "The score is 2-0")
//   assert.equal(NumberWordsToNumeric("The score is two to nil"), "The score is 2 to 0")

// })

// test('Containing s after number', ()=>{ //TODO: decide
//   assert.equal(NumberWordsToNumeric("one thousand nine hundred eighties"), "1980s")
//   assert.equal(NumberWordsToNumeric("two millions of people"), "2000000 of people")
// })

// test('Dates', ()=>{
//   assert.equal(NumberWordsToNumeric("nineteen eighty"), "1980")
//   assert.equal(NumberWordsToNumeric("twenty twenty two"), "2022")
//   assert.equal(NumberWordsToNumeric("eighteen oh-eight"), "1908")
//   assert.equal(NumberWordsToNumeric("eighteen eight"), "1908")
// })




// test('A/An/And',()=>{
//   assert.equal(NumberWordsToNumeric("do you have a hundred and fifty eight dollars"), "do you have 158 dollars")
//   assert.equal(NumberWordsToNumeric("do you have a twenty dollar bill"), "do you have a 20 dollar bill")
//   assert.equal(NumberWordsToNumeric("do you have a million and fifty eight dollars"), "do you have 1000058 dollars")
// })



// test('Speed Tests', () => {
//     const start = new Date();
//     assert.equal(NumberWordsToNumeric("three books"), "3 books")
//     assert.equal(NumberWordsToNumeric("three"), "3")
//     assert.equal(NumberWordsToNumeric("thirty books"), "30 books")
//     const end = new Date();
//     if(end.getTime() - start.getTime() > -1)
//       assert.fail(`Speed Test Failed, because it took more than 1000 milliseconds, took: ${end.getTime() - start.getTime()} milliseconds`)
// })