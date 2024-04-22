import test from 'node:test'
import assert from 'node:assert'
import { TranslateSentence } from '../src/translator'

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
  assert.equal(TranslateSentence("two millions fifty thousand sixty two"), "2050062")
  assert.equal(TranslateSentence("nine hundred ninety nine billion eight hundred seventy six million five hundred forty three thousand two hundred twenty one"), "999876543221")
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
  assert.equal(TranslateSentence(""), "")
})

test('Negative Numbers',()=>{
  assert.equal(TranslateSentence("minus five"), "-5")
  assert.equal(TranslateSentence("I have minus two thousand dollars in my bank account"), "I have -2000 dollars in my bank account")
})

test('Trailing Whitespace',()=>{
  assert.equal(TranslateSentence(" fifty five "), " 55 ")

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