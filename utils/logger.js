function logger(text, value) {
  const output = value !== undefined ? `${text}${value}` : text
  console.log(output)
}

module.exports = logger
