const testLeak = new WeakMap()

if (!(window as any).testLeak) {
    (window as any).testLeak = testLeak
}

export default testLeak;