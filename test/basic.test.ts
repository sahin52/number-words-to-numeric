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
  
})
test('Empty String', ()=>{
  assert.equal(TranslateSentence(""), "")
})

test('Capital letters',()=>{
  assert.equal(TranslateSentence("One hundred books"), "100 books");
  assert.equal(TranslateSentence("One Thousand Ninety Eight books"), "1098 books");
})

test('Trailing Whitespace',()=>{
  assert.equal(TranslateSentence(" fifty five "), " 55 ")

})

test('Tens Hundred',()=>{ // TODO: decide what to expect
  assert.equal(TranslateSentence("nineteen hundred fifty eight"), "1958")
})

test('Number after number',()=>{
  assert.equal(TranslateSentence("twenty twenty twenty"), "20 20 20")
  assert.equal(TranslateSentence("one two three four five six seven eight nine ten twelve one thousand one hundred million"), "1 2 3 4 5 6 7 8 9 10 12 1000 100000000")
})

test('Punctuations', ()=>{
  assert.equal(TranslateSentence("The year was one thousand nine hundred nineteen."), "The year was 1919.");
  assert.equal(TranslateSentence("number of books is one hundred million nineteen, number of notebooks are three hundred twenty billion two million one hundred twelve!"), "number of books is 100000019, number of notebooks are 32000200112!");
  assert.equal(TranslateSentence("Countdown! nine,eight,seven,six,five,four,three,two,one,zero!!!"), "Countdown! 9,8,7,6,5,4,3,2,1,0!!!");
})

test('Negative Numbers',()=>{
  assert.equal(TranslateSentence("minus five"), "-5")
  assert.equal(TranslateSentence("I have minus two thousand dollars in my bank account"), "I have -2000 dollars in my bank account")
})


test('Containing s after number', ()=>{ //TODO: decide
  assert.equal(TranslateSentence("one thousand nine hundred eighties"), "1980s")
  assert.equal(TranslateSentence("two millions of people"), "2000000 of people")
})

test('Dates', ()=>{
  assert.equal(TranslateSentence("nineteen eighty"), "1980")
  assert.equal(TranslateSentence("twenty twenty two"), "2022")
  assert.equal(TranslateSentence("eighteen oh-eight"), "1908")
  assert.equal(TranslateSentence("eighteen eight"), "1908")
})




test('A/An/And',()=>{
  assert.equal(TranslateSentence("do you have a hundred and fifty eight dollars"), "do you have 158 dollars")
  assert.equal(TranslateSentence("do you have a twenty dollar bill"), "do you have a 20 dollar bill")
  assert.equal(TranslateSentence("do you have a million and fifty eight dollars"), "do you have 1000058 dollars")
})



test('Speed Tests', () => {
    const start = new Date();
    assert.equal(TranslateSentence("three books"), "3 books")
    assert.equal(TranslateSentence("three"), "3")
    assert.equal(TranslateSentence("thirty books"), "30 books")
    const end = new Date();
    if(end.getTime() - start.getTime() > -1)
      assert.fail(`Speed Test Failed, because it took more than 1000 milliseconds, took: ${end.getTime() - start.getTime()} milliseconds`)
})