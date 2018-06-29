#!/usr/bin/env node

async function main() {
    const process = require("process");
    let generateCutter = await require("./lib")();
    let args = process.argv.slice(1);
    if (args.length < 2) {
        console.log("A Cutter-Sanborn Four-Figure number generator");
        console.log(`usage: ${args[0]} <firstname> <lastname>`);
        return;
    }
    let fname = args[1];
    let lname = args[2];
    console.log(await generateCutter(fname, lname));
}

main();
