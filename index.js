const readline = require('readline');
const colors = require('colors');

const slice = function(str, token) {
    let idx = str.trim().indexOf(token);
    idx = (idx !== -1) ? idx + token.length : 0;
    return str.slice(idx);
}

const filteringSql = function(sqlStr) {
    return slice(sqlStr, 'Preparing: ');
};

const filteringArgs = function(paramsStr) {
    paramsStr = slice(paramsStr, 'Parameters: ');

    const re = new RegExp('(.+)\((.+)\)');
    return paramsStr.split(',').map(function(param) {
        const t = /(.+)\((.+)\)/.exec(param.trim());
        if(!t) return undefined;
	    return (t[2] === 'String') ? `'${t[1]}'` : t[1];
    });
};

const getResult = function(sql, params) {
    let idx = 0;
    while(sql.match(/(?! = )\?/) != null) {
        sql = sql.replace(/(?! = )\?/, params[idx++]);
    }
    return sql;
};

function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(data); proc.stdin.end();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// main
const prefix = '>> '.green;
rl.question(`${prefix}SQL: `, (sqlStr) => {
    rl.question(`${prefix}Parameters: `, (paramsStr) => {
        console.log('--------------------------------------------------------------------------------'.black);
        if (!sqlStr || !paramsStr ||sqlStr.length === 0 || paramsStr.length === 0) {
            console.log('✘ Empty sql or params'.yello);
            rl.close();
            return;
        }

        const sql = getResult(filteringSql(sqlStr), filteringArgs(paramsStr));
        console.log(sql);
        console.log('✔ Copy sql!'.green);
        pbcopy(sql);
        rl.close();
    });
});


