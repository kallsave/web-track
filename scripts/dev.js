const rollup = require('rollup')
const copy = require('ncp').ncp
const buildMap = require('./config')
const name = require('../package.json').name

const TARGET = process.env.TARGET

async function buildEntry() {
  const build = buildMap[TARGET]

  if (build) {
    await (() => {
      return new Promise((resolve) => {
        const watcher = rollup.watch(build)
        watcher.on('event', event => {
          console.log(event.code)
          if (event.code === 'END') {
            copy('dist', `examples/plugins/${name}/`, function (err) {
              console.log(err)
            })
            resolve()
          }
        })
      })
    })()
  }
}

buildEntry()
