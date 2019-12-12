/**
 * @return {boolean}
 */
const VarHasValue = function (variable) {
    try {
        if (variable === null) {
            throw 'Variable is null';
        }
        if (variable === undefined) {
            throw 'Variable is undefined';
        }
    } catch (e) {
        console.error(e);
        return false;
    }
    return variable;
};

/**
 * @return {boolean}
 */
const VarTypeCheck = function (variable, checkType = []) {
    return checkType.indexOf(typeof variable) >= 0;
};

export let ArrayTakeFirst = function (variable,) {
    if (VarTypeCheck(variable, ['null', 'undefined'])) {
        if (typeof variable === 'object' && variable.hasOwnProperty('length')) {
            return variable[0];
        }
    }
};

