const fs = require('fs')

const extractBz2File = require('./utils/archieveHelper')
const {
  findMaxNumber,
  findMinNumber,
  calculateSum,
  findMedian,
} = require('./features/mandatory')
const {
  findLongestAscendingSequence,
  findLongestDescendingSequence,
} = require('./features/optional')
const logger = require('./utils/logger')
const config = require('./config/config')

async function main() {
  const bz2FilePath = config.ARCHIEVE_PATH
  const extractedFilePath = config.PATH_TO_EXTRACT
  const outputFileName = config.EXTRACTED_FILE_PATH

  const isFileAlreadyExist = fs.existsSync(outputFileName)

  if (!isFileAlreadyExist) {
    await extractBz2File(bz2FilePath, extractedFilePath, outputFileName)
  } else {
    logger('File already exists!')
  }

  const maxNumber = await findMaxNumber(outputFileName)
  const minNumber = await findMinNumber(outputFileName)
  const fileSum = await calculateSum(outputFileName)
  const median = await findMedian(outputFileName)
  const maxAscSequenceLength = await findLongestAscendingSequence(
    outputFileName
  )
  const maxDescSequenceLength = await findLongestDescendingSequence(
    outputFileName
  )

  logger('Biggest number - ', maxNumber)
  logger('Smallest number - ', minNumber)
  logger('Sum of all numbers ', fileSum)
  logger('Median - ', median)
  logger('Longest ascending sequence length ', maxAscSequenceLength)
  logger('Longest descending sequence length ', maxDescSequenceLength)
}

main().catch((error) => {
  console.error('An error occurred:', error)
})
