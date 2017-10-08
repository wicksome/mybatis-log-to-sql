const slice = function(str, token) {
    let idx = str.trim().indexOf(token);
    idx = (idx !== -1) ? idx + token.length : 0;
    return str.slice(idx);
}

const filteringSql = function(sqlStr) {
    if(!sqlStr || sqlStr.length === 0) {
        return '';
    }
    return slice(sqlStr, 'Preparing: ');
};

const filteringArgs = function(paramsStr) {
    if(!paramsStr || paramsStr.length === 0) {
        return [];
    }
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
    if(params && params.length > 0) {
        while(sql.match(/(?! = )\?/) != null) {
            sql = sql.replace(/(?! = )\?/, params[idx++]);
        }
    }
    return sql;
};


if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = (sqlStr, paramsStr) => {
        return getResult(filteringSql(sqlStr), filteringArgs(paramsStr));
    }
} else {
    window.myBatisLogParser = (sqlStr, paramsStr) => {
        return getResult(filteringSql(sqlStr), filteringArgs(paramsStr));
    }
}
