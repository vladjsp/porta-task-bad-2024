const decompress = require('decompress')
const decompressBzip2 = require('decompress-bzip2')

function extractBz2File(inputPath, outputFolder, outputFileName) {
  return new Promise((resolve, reject) => {
    decompress(inputPath, outputFolder, {
      plugins: [decompressBzip2({ path: `${outputFileName}` })],
    })
      .then((files) => {
        console.log('Extraction Done!')
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = extractBz2File
