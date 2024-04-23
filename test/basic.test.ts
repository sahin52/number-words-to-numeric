import test from 'node:test'
import assert from 'node:assert'
import { TranslateSentence } from '../src/translator'
import { t } from 'tap/dist/commonjs/main'

test('Basic',()=>{
  assert.equal(TranslateSentence("three"), "3")
  assert.equal(TranslateSentence("thirty"), "30")
  assert.equal(TranslateSentence("five"), "5")
  assert.equal(TranslateSentence("forty"), "40")
  assert.equal(TranslateSentence("ninety"), "90")
  assert.equal(TranslateSentence("seventy"), "70")
  assert.equal(TranslateSentence("zero"), "0")
})

test('String Containing Only Numbers',()=>{
  assert.equal(TranslateSentence("two million fifty thousand sixty two"), "2050062")
  assert.equal(TranslateSentence("nine hundred ninety nine trillion nine hundred ninety nine billion eight hundred seventy six million five hundred forty three thousand two hundred twenty one"), "999999876543221")
})

test('Actual Tests', () => {
  assert.equal(TranslateSentence("I love fifty trillion seventy people on earth"), "I love 50000000000070 people on earth")
  assert.equal(TranslateSentence("I don't even have one dollar"), "I don't even have 1 dollar")
  assert.equal(TranslateSentence("I have zero dollar"), "I have 0 dollar")
  
})

test('Strings Without Numbers', ()=>{
  assert.equal(TranslateSentence("hello world"), "hello world")
  assert.equal(TranslateSentence("1a2b"), "1a2b")
  assert.equal(TranslateSentence("."), ".")
  assert.equal(TranslateSentence("  "), "  ")
  assert.equal(TranslateSentence(" "), " ")
  assert.equal(TranslateSentence(" . "), " . ")
  assert.equal(TranslateSentence("oneman"), "oneman")
  assert.equal(TranslateSentence("twelwe"), "twelwe")
  assert.equal(TranslateSentence("#!..,.,.,.123123++'+'^+\n\n \t.."), "#!..,.,.,.123123++'+'^+\n\n \t..")
  assert.equal(TranslateSentence("asdadahsdjkasd,.,.,.,asdasdad,.,.,1231,."), "asdadahsdjkasd,.,.,.,asdasdad,.,.,1231,.")
  assert.equal(TranslateSentence("My name is not Kasap!"), "My name is not Kasap!")
  assert.equal(TranslateSentence("ASDASDADQWEQWEQWEASDASDASDQWEQWEQasdasdqweqweasdasqweqweqweoneoneoneoneone"), "ASDASDADQWEQWEQWEASDASDASDQWEQWEQasdasdqweqweasdasqweqweqweoneoneoneoneone")
})
test('Empty String', ()=>{
  assert.equal(TranslateSentence(""), "")
})

test('Capital letters',()=>{
  assert.equal(TranslateSentence("One hundred books"), "100 books");
  assert.equal(TranslateSentence("One Thousand Ninety Eight books"), "1098 books");
  assert.equal(TranslateSentence("Fifty six apples"), "56 apples");
  assert.equal(TranslateSentence("Three hundred seventy two pencils"), "372 pencils");
  assert.equal(TranslateSentence("Four thousand five hundred twenty one candies"), "4521 candies");
  assert.equal(TranslateSentence("Sixty seven thousand eight hundred ninety five dollars"), "67895 dollars");
  assert.equal(TranslateSentence("Two million three hundred forty five thousand six hundred seventy nine books"), "2345679 books");
})

test('Trailing Whitespace',()=>{
  assert.equal(TranslateSentence(" fifty five "), " 55 ")

})

test('Tens Hundred',()=>{ // TODO: decide what to expect
  assert.equal(TranslateSentence("nineteen hundred fifty eight"), "1958")
})

test('Locale',()=>{
  assert.equal(TranslateSentence("I need three thousand nine hundred nineteen books.",{numberFormat:'en-US', numberFormatOptions:{}}), "I need 3,919 books.");
})

test('Punctuations', ()=>{
  assert.equal(TranslateSentence("The year was one thousand nine hundred nineteen."), "The year was 1919.");
  assert.equal(TranslateSentence("number of books is one hundred million nineteen, number of notebooks are three hundred twenty billion two million one hundred twelve!"), "number of books is 100000019, number of notebooks are 320002000112!");
  assert.equal(TranslateSentence("Countdown! nine,eight,seven,six,five,four,three,two,one,zero!!!"), "Countdown! 9,8,7,6,5,4,3,2,1,0!!!");
  assert.equal(TranslateSentence("The marathon runner completed the race in just under three hours, finishing at two hours, fifty nine minutes, and fifty nine seconds."), "The marathon runner completed the race in just under 3 hours, finishing at 2 hours, 59 minutes, and 59 seconds.");
  assert.equal(TranslateSentence("The book contains chapters one through ten."), "The book contains chapters 1 through 10.");
})
// test('Decimal Points',()=>{
//   assert.equal(TranslateSentence("It's three hundred eighty six point thirty grams"), "It's 386.30 grams");
// })
// test('Number after number',()=>{
//   assert.equal(TranslateSentence("two three twenty four sixty eight"), "2 3 24 68")
//   assert.equal(TranslateSentence("one two three four five six seven eight nine ten twelve one thousand one hundred million"), "1 2 3 4 5 6 7 8 9 10 12 1000 100000000")
// })



// test('Negative Numbers',()=>{
//   assert.equal(TranslateSentence("minus five"), "-5")
//   assert.equal(TranslateSentence("I have minus two thousand dollars in my bank account"), "I have -2000 dollars in my bank account")
// })

// test('Nil As Zero',()=>{
//   assert.equal(TranslateSentence("The score is two-nil"), "The score is 2-0")
//   assert.equal(TranslateSentence("The score is two to nil"), "The score is 2 to 0")

// })

// test('Containing s after number', ()=>{ //TODO: decide
//   assert.equal(TranslateSentence("one thousand nine hundred eighties"), "1980s")
//   assert.equal(TranslateSentence("two millions of people"), "2000000 of people")
// })

// test('Dates', ()=>{
//   assert.equal(TranslateSentence("nineteen eighty"), "1980")
//   assert.equal(TranslateSentence("twenty twenty two"), "2022")
//   assert.equal(TranslateSentence("eighteen oh-eight"), "1908")
//   assert.equal(TranslateSentence("eighteen eight"), "1908")
// })




// test('A/An/And',()=>{
//   assert.equal(TranslateSentence("do you have a hundred and fifty eight dollars"), "do you have 158 dollars")
//   assert.equal(TranslateSentence("do you have a twenty dollar bill"), "do you have a 20 dollar bill")
//   assert.equal(TranslateSentence("do you have a million and fifty eight dollars"), "do you have 1000058 dollars")
// })



// test('Speed Tests', () => {
//     const start = new Date();
//     assert.equal(TranslateSentence("three books"), "3 books")
//     assert.equal(TranslateSentence("three"), "3")
//     assert.equal(TranslateSentence("thirty books"), "30 books")
//     const end = new Date();
//     if(end.getTime() - start.getTime() > -1)
//       assert.fail(`Speed Test Failed, because it took more than 1000 milliseconds, took: ${end.getTime() - start.getTime()} milliseconds`)
// })