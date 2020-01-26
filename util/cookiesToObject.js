// My cookie splitting function

// options takes a object like so: {
//     all: true,
//     boolean: true,
//     number: true,
//     undefined: true
// }
// Setting a option to true will convert a string matching the value for that type from a string to that type. // No options specified is the same as {all: false}.

const cookiesToObject = (cookieString, options) => {
    // create empty object
    const cookieObject = {}

    // only try to split the cookieString if there are cookies
    if (typeof cookieString !== 'undefined') {

        // seperate cookies into strings in array
        const cookieArray = cookieString.split('; ');

        // loop trough cookieArray and add cookies as a key value pair to the cookieObject
        for (let i = 0; i < cookieArray.length; i++) {
            const key = cookieArray[i].split('=')[0];
            let value = cookieArray[i].split('=')[1];
            
            // Type convertion if options are set to true: 
                // convert true/false strings into boolean if option is specified
                if (options.boolean === true || options.all === true) {
                    if (value === 'true') {
                        value = true;
                    }
                    if (value === 'false') {
                        value = false;
                    }
                }

                // convert strings into numbers if option is specified
                if (options.number === true || options.all === true) {
                    if (isNaN(value) === false && typeof value !== 'boolean') {
                        value = Number(value);
                    }
                }

                // convert strings into type undefined if option is specified
                if (options.undefined === true || options.all === true) {
                    if (value === 'undefined') {
                        value = undefined;
                    }
                }

            cookieObject[key] = value;
        }
    }

    return cookieObject;
}

module.exports = cookiesToObject;