import { Task } from 'fp-ts/Task'

const main: Task<void> = () => Promise.resolve(console.log('Hello, World!'))

main()
