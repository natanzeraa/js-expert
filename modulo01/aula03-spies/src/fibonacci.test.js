import assert from 'node:assert'
import { createSandbox } from 'sinon'
import Fibonacci from './fibonacci.js'


const sinon = createSandbox()


    ; (async () => {
        {
            const fibonacci = new Fibonacci()
            const spy = sinon.spy(
                fibonacci,
                fibonacci.execute.name
            )

            for (const seq of fibonacci.execute(5)) { }

            const expectedCallCount = 6
            assert.strictEqual(spy.callCount, expectedCallCount)
            const { args } = spy.getCall(2)
            const expectedParams = [3, 1, 2]
            assert.deepStrictEqual(args, expectedParams, "Arrays are not equal")
        }

        {
            const fibonacci = new Fibonacci()
            const spy = sinon.spy(
                fibonacci,
                fibonacci.execute.name
            )

            const result = [...fibonacci.execute(5)]

            const expectedCallCount = 6
            assert.strictEqual(spy.callCount, expectedCallCount)
            const { args } = spy.getCall(2)
            const expectedParams = [3, 1, 2]
            assert.deepStrictEqual(args, expectedParams, "Arrays are not equal")

            const expectedResult = [0, 1, 1, 2, 3]
            assert.deepStrictEqual(result, expectedResult, "Arrays are not equal")
        }
    })()