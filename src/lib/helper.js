const bcryptjs = require('bcryptjs');

const helper = {};

helper.encryptPass = async (password) => {
    const salt = await bcryptjs.genSalt(8);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
};

helper.comparePass = async (password, savedHash) => {
    try {
        return await bcryptjs.compare(password, savedHash);
    } catch (error) {
        console.log(error);
    }
    return
};

module.exports = helper;
