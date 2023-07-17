const sortedJSONStringify = (obj) => JSON.stringify(obj, Object.keys(obj).sort());

module.exports = sortedJSONStringify;
