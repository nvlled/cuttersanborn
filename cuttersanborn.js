#!/usr/bin/env node

async function main() {
    const process = require("process");
    const {basename} = require("path");

    let generateCutter = await require("./lib")();
    let args = process.argv.slice(1);
    if (args.length < 3) {
        console.log("A Cutter-Sanborn Four-Figure number generator");
        console.log(`usage: ${basename(args[0])} <firstname> <lastname>`);
        return;
    }
    let fname = args[1];
    let lname = args[2];
    let cutterNum = await generateCutter(fname, lname)
    if (!cutterNum)
        console.error("* failed to generate number, name may be invalid");
    else
        console.log(cutterNum);
}

main();