var map = require('pull-stream').map
//split lines into csv, including escaping commas


var splitter = /(^[^,]*|\s*"[^"]*"\s*|[^,]*)/

exports.parseLine = function (line) {
  var cells = line.split(splitter)

  if(cells[0] === ',')
    cells.splice(0, 0, '', '')
  return cells.filter(function (_, i) {
    return i % 2
  }).map(function (cell) {
    cell = cell.trim()
    return (
      /^"[^"]*"$/.test(cell)
      ? cell.substring(1, cell.length - 1)
      : cell
    )
  })
}
exports.stringifyLine = function (line) {
  return line.map(function (cell) {
    cell = cell.toString()
    return ~cell.indexOf(',') ? '"' + cell + '"' : cell
  }) + '\n'
}

exports.decode =
exports.parse = function () {
  return map(exports.parseLine)
}

exports.encode =
exports.stringify = function () {
  return map(exports.stringifyLine)
}

