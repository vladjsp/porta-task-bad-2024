const { createReadStream } = require('fs')
const { createInterface } = require('readline')

async function findLongestDescendingSequence(filePath) {
  let longestDescSequenceLength = 1
  let currentSequenceLength = 1

  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let prevNumber = null
  for await (const line of rl) {
    const current = parseInt(line.trim())
    if (prevNumber !== null) {
      if (current < prevNumber) {
        currentSequenceLength++
        longestDescSequenceLength = Math.max(
          longestDescSequenceLength,
          currentSequenceLength
        )
      } else {
        currentSequenceLength = 1
      }
    }
    prevNumber = current
  }

  return longestDescSequenceLength
}

async function findLongestAscendingSequence(filePath) {
  let longestAscSequenceLength = 1
  let currentSequenceLength = 1

  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let prevNumber = null
  for await (const line of rl) {
    const current = parseInt(line.trim())
    if (prevNumber !== null) {
      if (current > prevNumber) {
        currentSequenceLength++
        longestAscSequenceLength = Math.max(
          longestAscSequenceLength,
          currentSequenceLength
        )
      } else {
        currentSequenceLength = 1
      }
    }
    prevNumber = current
  }

  return longestAscSequenceLength
}

module.exports = {
  findLongestDescendingSequence,
  findLongestAscendingSequence,
}
