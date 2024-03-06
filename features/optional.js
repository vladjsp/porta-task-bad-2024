const { createReadStream } = require('fs')
const { createInterface } = require('readline')

async function findLongestDescendingSequence(filePath) {
  let longestDescSequence = []
  let currentSequence = []
  let prevNumber = null

  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    const current = parseInt(line.trim())
    if (prevNumber !== null) {
      if (current < prevNumber) {
        currentSequence.push(current)
      } else {
        if (currentSequence.length > longestDescSequence.length) {
          longestDescSequence = currentSequence.slice()
        }
        currentSequence = [current]
      }
    }
    prevNumber = current
  }

  return longestDescSequence
}

async function findLongestAscendingSequence(filePath) {
  let longestAscSequence = []
  let currentSequence = []
  let prevNumber = null

  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    const current = parseInt(line.trim())
    if (prevNumber !== null) {
      if (current > prevNumber) {
        currentSequence.push(current)
      } else {
        if (currentSequence.length > longestAscSequence.length) {
          longestAscSequence = currentSequence.slice()
        }
        currentSequence = [current]
      }
    }
    prevNumber = current
  }

  return longestAscSequence
}

module.exports = {
  findLongestDescendingSequence,
  findLongestAscendingSequence,
}
