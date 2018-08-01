const prettier = require("prettier");
const path = require('path'); 
const fs = require('fs-extra');

const viewsFolder = path.join(__dirname, '../templates/');

const re = /<%(.+?)%>/g, 
      reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;      

var JSTemplateEngine = function(filename, options) {
    let template = fs.readFileSync(viewsFolder + filename, 'utf8');
        
    let code = 'with(obj) { var r=[];\n', 
		cursor = 0, 
		result,
	    match;
    
    while(match = re.exec(template)) {
        add(template.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }

    add(template.substr(cursor, template.length - cursor));

    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');

	try { 
        result = new Function('obj', code).apply(options, [options]); }
	catch(err) { 
        console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); 
    }

    return prettier.format(result, {});
    
    function add(line, jsFlag) {
        if (jsFlag) {
            code += line.match(reExp) ? line : 'r.push(' + line + ');';
        } else {
            code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");' : '';
        }
        
        return add;
    }
}

module.exports = JSTemplateEngine;