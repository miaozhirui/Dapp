const path = require('path');
const fs = require('fs');


module.exports = function(source){

    

    if(this.request.indexOf('src/pages') === -1) {

        return source;
    }

    if(this.request.indexOf('other') > -1) {

        return source;
    }
    
    if(this.request.indexOf('jsx') > -1) {

        return source;
    }

    const fileName = path.basename(this.request,'.js');

    let jsx = fs.readFileSync(path.join(process.cwd(), `./src/pages/${fileName}/${fileName}.jsx`),'utf-8');

    const lastSource = source.replace(/\(jsx\)/ig, `(${jsx})`);
    
   return lastSource;
    
}