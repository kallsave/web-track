export default {
	version: 'VERSION',
}

const p = new Promise((resolve) => {
	resolve()
})

p.then(() => {
	console.log(11)
})

const a: string[] = []

console.log(a)
