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
  assert.equal(NumberWordsToNumeric("She received twelve thousand dollars as a bonus."), "She received 12000 dollars as a bonus.");
  assert.equal(NumberWordsToNumeric("There were seven hundred twenty five students in the class."), "There were 725 students in the class.");
  assert.equal(NumberWordsToNumeric("The temperature dropped to minus fifteen degrees Celsius."), "The temperature dropped to minus 15 degrees Celsius.");
  assert.equal(NumberWordsToNumeric("Her age is fifty five years old."), "Her age is 55 years old.");
  assert.equal(NumberWordsToNumeric("The lottery winner received twenty five million dollars."), "The lottery winner received 25000000 dollars.");
  assert.equal(NumberWordsToNumeric("The population of the city is over one million."), "The population of the city is over 1000000.");
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
  assert.equal(NumberWordsToNumeric("one hundred twenty three "), "123 ");
  assert.equal(NumberWordsToNumeric("  two million  "), "  2000000  ");
  assert.equal(NumberWordsToNumeric("   three thousand four   "), "   3004   ");
})

test('Tens Hundred',()=>{
  assert.equal(NumberWordsToNumeric("nineteen hundred fifty eight"), "1958")
    assert.equal(NumberWordsToNumeric("nineteen hundred fifty eight"), "1958");
    assert.equal(NumberWordsToNumeric("thirty five hundred"), "3500");
    assert.equal(NumberWordsToNumeric("seven hundred sixty two"), "762");
    assert.equal(NumberWordsToNumeric("four thousand eight hundred ninety six"), "4896");
    assert.equal(NumberWordsToNumeric("twenty three hundred forty five"), "2345");
    assert.equal(NumberWordsToNumeric("nine hundred ninety nine thousand nine hundred ninety nine"), "999999");
})

test('Locale',()=>{
  assert.equal(NumberWordsToNumeric("I need three thousand nine hundred nineteen books.",{numberFormat:'en-US', numberFormatOptions:{}}), "I need 3,919 books.");
})

test('Punctuations', () => {
  assert.equal(NumberWordsToNumeric("The score was two-zero."), "The score was 2-0.");
  assert.equal(NumberWordsToNumeric("She bought ten apples, five oranges, and three bananas."), "She bought 10 apples, 5 oranges, and 3 bananas.");
  assert.equal(NumberWordsToNumeric("The temperature was minus five degrees Celsius."), "The temperature was minus 5 degrees Celsius.");
  assert.equal(NumberWordsToNumeric("I have twenty three dollars in my wallet."), "I have 23 dollars in my wallet.");
  assert.equal(NumberWordsToNumeric("The answer is four plus three."), "The answer is 4 plus 3.");
  assert.equal(NumberWordsToNumeric("The package weighs ten kilograms."), "The package weighs 10 kilograms.");
  assert.equal(NumberWordsToNumeric("She is thirty five years old."), "She is 35 years old.");
  assert.equal(NumberWordsToNumeric("The meeting starts at three o'clock."), "The meeting starts at 3 o'clock.");
  assert.equal(NumberWordsToNumeric("I need to buy six eggs."), "I need to buy 6 eggs.");
  assert.equal(NumberWordsToNumeric("The price is twenty five dollars and fifty cents."), "The price is 25 dollars and 50 cents.");
  assert.equal(NumberWordsToNumeric("The recipe calls for one cup of flour."), "The recipe calls for 1 cup of flour.");
  assert.equal(NumberWordsToNumeric("The movie lasts two hours and forty five minutes."), "The movie lasts 2 hours and 45 minutes.");
  assert.equal(NumberWordsToNumeric("The exam has fifty questions."), "The exam has 50 questions.");
  assert.equal(NumberWordsToNumeric("The car can go from zero to sixty miles per hour in six seconds."), "The car can go from 0 to 60 miles per hour in 6 seconds.");
  assert.equal(NumberWordsToNumeric("The score was three-two."), "The score was 3-2.");
  assert.equal(NumberWordsToNumeric("The hotel has seven floors."), "The hotel has 7 floors.");
  assert.equal(NumberWordsToNumeric("The sale is buy one, get one free."), "The sale is buy 1, get 1 free.");
  assert.equal(NumberWordsToNumeric("The answer is four divided by two."), "The answer is 4 divided by 2.");
  assert.equal(NumberWordsToNumeric("The building is ten stories high."), "The building is 10 stories high.");
  assert.equal(NumberWordsToNumeric("She is in her late twenty."), "She is in her late 20.");
  assert.equal(NumberWordsToNumeric("The concert starts at eight p.m."), "The concert starts at 8 p.m.");
  assert.equal(NumberWordsToNumeric("I have forty two dollars in my account."), "I have 42 dollars in my account.");
  assert.equal(NumberWordsToNumeric("The cake has sixteen candles on it."), "The cake has 16 candles on it.");
  assert.equal(NumberWordsToNumeric("The temperature is twenty eight degrees Celsius."), "The temperature is 28 degrees Celsius.");
  assert.equal(NumberWordsToNumeric("The train departs at nine a.m."), "The train departs at 9 a.m.");
  assert.equal(NumberWordsToNumeric("The score was five-four in overtime."), "The score was 5-4 in overtime.");
  assert.equal(NumberWordsToNumeric("The book has three hundred fifty pages."), "The book has 350 pages.");
  assert.equal(NumberWordsToNumeric("The sale price is twenty percent off."), "The sale price is 20 percent off.");
  assert.equal(NumberWordsToNumeric("The meeting starts at ten a.m."), "The meeting starts at 10 a.m.");
  assert.equal(NumberWordsToNumeric("The stadium holds sixty five thousand people."), "The stadium holds 65000 people.");
  assert.equal(NumberWordsToNumeric("The exam has twenty five multiple choice questions."), "The exam has 25 multiple choice questions.");
  assert.equal(NumberWordsToNumeric("The speed limit is thirty five miles per hour."), "The speed limit is 35 miles per hour.");
  assert.equal(NumberWordsToNumeric("The recipe calls for one cup of sugar."), "The recipe calls for 1 cup of sugar.");
  assert.equal(NumberWordsToNumeric("The deadline is in two weeks."), "The deadline is in 2 weeks.");
  assert.equal(NumberWordsToNumeric("The flight is at six p.m."), "The flight is at 6 p.m.");
  assert.equal(NumberWordsToNumeric("The score was four-three in the final period."), "The score was 4-3 in the final period.");
  assert.equal(NumberWordsToNumeric("The sale is buy two, get one free."), "The sale is buy 2, get 1 free.");
  assert.equal(NumberWordsToNumeric("The answer is six times four."), "The answer is 6 times 4.");
  assert.equal(NumberWordsToNumeric("The book has seven hundred eighty nine pages."), "The book has 789 pages.");
  assert.equal(NumberWordsToNumeric("The temperature is minus ten degrees Fahrenheit."), "The temperature is minus 10 degrees Fahrenheit.");
  assert.equal(NumberWordsToNumeric("The sale price is fifty percent off."), "The sale price is 50 percent off.");
  assert.equal(NumberWordsToNumeric("The meeting starts at eleven a.m."), "The meeting starts at 11 a.m.");
  assert.equal(NumberWordsToNumeric("The stadium holds eighty thousand people."), "The stadium holds 80000 people.");
  assert.equal(NumberWordsToNumeric("The exam has thirty multiple choice questions."), "The exam has 30 multiple choice questions.");
  assert.equal(NumberWordsToNumeric("The speed limit is forty five miles per hour."), "The speed limit is 45 miles per hour.");
  assert.equal(NumberWordsToNumeric("The recipe calls for one cup of oil."), "The recipe calls for 1 cup of oil.");
  assert.equal(NumberWordsToNumeric("The deadline is in three weeks."), "The deadline is in 3 weeks.");
  assert.equal(NumberWordsToNumeric("The flight is at seven p.m."), "The flight is at 7 p.m.");
  assert.equal(NumberWordsToNumeric("The score was five-four in the final minutes."), "The score was 5-4 in the final minutes.");
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