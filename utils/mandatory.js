const { createReadStream } = require('fs')
const { createInterface } = require('readline')

async function findMaxNumber(filePath) {
  let maxNumber = Number.NEGATIVE_INFINITY

  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    const currentNum = parseInt(line.trim())

    if (currentNum > maxNumber) {
      maxNumber = currentNum
    }
  }

  return maxNumber
}

async function findMinNumber(filePath) {
  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  let minNumber = Number.POSITIVE_INFINITY

  for await (const line of rl) {
    const currentNum = parseInt(line.trim())

    if (currentNum < minNumber) {
      minNumber = currentNum
    }
  }
  return minNumber
}

async function calculateSum(filePath) {
  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let sum = 0

  for await (const line of rl) {
    sum += parseInt(line.trim())
  }

  return sum
}

async function findMedian(filePath) {
  const numbers = []

  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    const currentNum = parseFloat(line.trim())
    if (!isNaN(currentNum)) {
      numbers.push(currentNum)
    }
  }

  numbers.sort((a, b) => a - b)

  const length = numbers.length
  if (length === 0) {
    return null
  }

  if (length % 2 === 0) {
    const midIndex = length / 2
    return (numbers[midIndex - 1] + numbers[midIndex]) / 2
  } else {
    const midIndex = Math.floor(length / 2)
    return numbers[midIndex]
  }
}

module.exports = {
  findMaxNumber,
  findMinNumber,
  calculateSum,
  findMedian,
}
