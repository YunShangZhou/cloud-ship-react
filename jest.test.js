test('test common matcher',() => {
    expect(2+2).toBe(4);
})


test('test error matcher',() => {
    expect(2+2).toBe(2);
})

test('test to bew true or false', () => {
    expect(0).toBeTruthy()
    expect(0).toBeFalsy()
})

test('test number ',()=>{
    expect(4).toBeGreaterThan(3);
    expect(2).toBeLessThan(3)
})

test('test object',()=>{
    expect({name: 'viking'}).toBe({name:"viking"})
})