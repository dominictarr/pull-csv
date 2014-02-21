var tape = require('tape')

var pull = require('pull-stream')

var csv = require('../')

tape('simple', function (t) {

  var expected = [
    ['a', '123', '324', 'hello there'],
    ['b', '123', '324', 'hello, there'],
    ['c', '123', ''   , 'hello there'],
    ['','',''],
    ['d', ''   , 'aoeu oaeu j jn'  , 'hello, there'],
    ['aa"b,bb"cc', 'hello', 'there']
  ]

  pull(
    pull.values(expected),
    csv.stringify(),
    pull.through(console.log),
    csv.parse(),
    pull.collect(function (err, actual) {
      if(err) throw err
      t.deepEqual(actual, expected)
      t.end()
    })
  )
})

tape('parseLine', function (t) {

  t.deepEqual(csv.parseLine('"aaa""bbb""ccc", 1, 2\n'), ['aaa"bbb"ccc', '1', '2'])
  t.equal(csv.stringifyLine(['aaa"bbb"ccc', '1', '2']), '"aaa""bbb""ccc", 1, 2\n')

  t.deepEqual(csv.parseLine('"a,aa""b,bb""c,cc", 1, 2\n'), ['a,aa"b,bb"c,cc', '1', '2'])


  t.end()

})
