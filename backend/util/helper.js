module.exports = {
  // object "obj" is empty or null return true, return false in all other cases
  isEmpty(obj) {
    let isEmpty = false;

    if (!obj || (Object.keys(obj).length === 0 && obj.constructor === Object)) {
      isEmpty = true;
    }

    return isEmpty;
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

};
