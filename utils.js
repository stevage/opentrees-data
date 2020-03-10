module.exports = {
    match(s, regex, patternNo) {
        if (!s) {
            return;
        }
        const m = String(s).match(regex);
        if (m && patternNo !== undefined) {
            return m[patternNo];
        } else {
            return m;
        }
    }
};
