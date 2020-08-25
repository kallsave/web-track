exports.camelize = (str) => {
  str = String(str)
  return str.replace(/-(\w)/g, (m, c) => {
    return c ? c.toUpperCase() : ''
  })
}
