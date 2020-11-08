interface Target {
    [key: string]: any
};

export function deleteUndefinedProperties(target: Target){
    const copy = {...target};
    Object.keys(copy).forEach(key => copy[key] === undefined ? delete copy[key] : {});
    return copy;
}