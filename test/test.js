

const expect = require('chai').expect;
const lib = require("../lib");

describe("Generate cutter number", async function() {
    let generateCutter;
    before(async function() {
        generateCutter = await lib();
    });

    let data = [
        {fname: "John", lname: "Adams", cutterNum: "A214"},
        {fname: "john", lname: "adams", cutterNum: "A214"},
        {fname: "Ruth", lname: "Adams", cutterNum: "A216"},
        {fname: "Linda", lname: "Gabel", cutterNum: "G112"},
        {fname: "Brian", lname: "Lavoie", cutterNum: "L414"},
        {fname: "Edward", lname: "O'Neill", cutterNum: "O58"},
        {fname: "Helen", lname: "Andrews", cutterNum: "A566"},
        {fname: "Hopkins", lname: "Johns", cutterNum: "J65"},
        {fname: "1234", lname: "12313", cutterNum: ""},
    ];
    for (let {fname, lname, cutterNum} of data) {
        it(`should yield ${cutterNum} for ${fname} ${lname}`, async function() {
            let num = await generateCutter(fname, lname);
            expect(num).to.equal(cutterNum);
        });
    }
});
