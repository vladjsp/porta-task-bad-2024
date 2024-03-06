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
  rl.close()
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

  rl.close()
  return minNumber
}

async function findArithmeticMean(filePath) {
  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let lineCounter = 0
  let sum = 0

  for await (const line of rl) {
    lineCounter += 1
    sum += parseInt(line.trim())
  }

  const result = sum / lineCounter

  rl.close()
  return result
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
    rl.close()
    return (numbers[midIndex - 1] + numbers[midIndex]) / 2
  } else {
    const midIndex = Math.floor(length / 2)
    rl.close()
    return numbers[midIndex]
  }
}

module.exports = {
  findMaxNumber,
  findMinNumber,
  findArithmeticMean,
  findMedian,
}
