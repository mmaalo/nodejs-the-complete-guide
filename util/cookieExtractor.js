// My cookie splitting function
const cookieStringToObject = (cookieString) => {
    // create empty object
    const cookieObject = {}

    // only try to split the cookieString if there are cookies
    if (typeof cookieString !== 'undefined') {

        // seperate cookies into strings in array
        const cookieArray = cookieString.split('; ');

        // loop trough cookieArray and add cookies as a key value pair to the cookieObject
        for (let i = 0; i < cookieArray.length; i++) {
            const key = cookieArray[i].split('=')[0];
            const value = cookieArray[i].split('=')[1];
            cookieObject[key] = value;
        }
    }

    // Please note that cookies with no value will be returned with the string 'undefined' as its value, instead of being of type undefined
    return cookieObject;
}

module.exports = cookieStringToObject;