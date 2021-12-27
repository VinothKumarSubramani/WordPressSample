#!/usr/bin/env node

const fs = require("fs")

const filepath = "./cypress/scripts"
const files = fs.readdirSync(filepath);


const child_process = require('child_process');
files.forEach((file) => {
    if(!file.endsWith(".js")){
        return;
    }

    child_process.fork(`${filepath}/${file}`)
})


//var d = new Date(); console.log('Current Time: ' +d);