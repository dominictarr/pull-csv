var map = require('pull-stream').map
//split lines into csv, including escaping commas


var splitter = /(\s*"(?:""|[^"])*"\s*|[^,]*|^[^,]*)/

exports.parseLine = function (line) {
  var cells = line.split(splitter)

  if(cells[0] === ',')
    cells.splice(0, 0, '', '')
  return cells.filter(function (_, i) {
    return i % 2
  }).map(function (cell) {
    cell = cell.trim()
    if(/^"(?:""|[^"])*"$/.test(cell)) {
      cell = cell.substring(1, cell.length - 1)
      cell = cell.replace(/""/g, '"')
    }
    return cell
  })
}

exports.stringifyLine = function (line) {
  return line.map(function (cell) {
    cell = cell.toString()
    return /"|,/.test(cell) ? '"' + cell.replace(/"/g, '""') + '"' : cell
  }).join(', ') + '\n'
}

exports.decode =
exports.parse = function () {
  return map(exports.parseLine)
}

exports.encode =
exports.stringify = function () {
  return map(exports.stringifyLine)
}

