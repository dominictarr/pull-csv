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
  ]

  pull(
    pull.values(expected),
    csv.stringify(),
    csv.parse(),
    pull.collect(function (err, actual) {
      if(err) throw err
      t.deepEqual(actual, expected)
      t.end()
    })
  )
})
