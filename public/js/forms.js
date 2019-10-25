/*
HOUDINI FORM:
Creates and sends a hidden html form with JS.

NOTE: If only 'action' is specified houdiniForm will send a GET request with that action attribute.

USAGE: 
'action' | takes a string like the action attribute in any html form.
'method' | takes a string of 'GET' or 'POST' like the method attribute of any html form.
'inputObject' | takes a array of objects, each object is a input that is submitted by the form.
    [
        {
            name: '' | takes a string, sets the name attribute like in any html form
            value: '' | takes a string, sets the value attribute of the data that is to be sendt
            moreAttributes: [ | Optional, if defined it is a array of objects with name and value keys. Each name and value key pair defines an additional attribute that is added to this input.
                {
                    name: '' | takes a string, sets the additional attribute name.
                    value: '' | takes a string, sets the additional attribute value.
                },
                { ... }
            ] 
        },
        { ... }
    ]

*/
function houdiniForm(action, method, inputObject) {
    let form = document.createElement('form');
    let err;

    // Set the action and method of the houdiniForm
        
        // Set action of houdiniForm, must be a non empty string
        if (typeof action == 'string' && action != '') {
            form.setAttribute('action', action);
        } else {
            err = 'action argument needs to be a non-empty string';
        }

        // Set the method of the houdiniForm
            // If the method is not 'post' set it to 'get'
            if (
                typeof method == 'undefined' ||
                method.toLowerCase() != 'post'
                ) {
                method = 'get';
            }

            // If method is 'post' set the method attribute to post in the houdiniForm. If not handle any errors.
            if (method.toLowerCase() == 'post') {
                form.setAttribute('method', method);
            } else {
                if (method.toLowerCase() != 'get' && method.toLowerCase() != 'post')
                err = 'method argument have to be "get" or "post.';
            }


    // Set the inputs of the houdiniForm
        // If the inputObject is undefined it is assumed that the user will send a 'GET' request without any data. Therefore inputs are not set in the houdiniForm in that case.
        if (typeof inputObject != 'undefined') {
            // Loop trough the array of inputObjects, each object in the inputObject array will create one input field in the form.
            for (let i = 0; i < inputObject.length; i++) {
                // Hidden form inputs are created with the type, name and value attributes that are specified in the inputObject. 
                let input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', inputObject[i].name);
                input.setAttribute('value', inputObject[i].value);

                // If the moreAttributes array inside the inputObject exists we will loop trought it and set additional inputAttributes.
                if (typeof inputObject[i].moreAttributes != 'undefined') {
                    let mAtt = inputObject[i].moreAttributes;
                    for (let mi = 0; mi < mAtt.length; mi++) {
                        input.setAttribute(
                            mAtt[mi].name,
                            mAtt[mi].value
                        );
                        
                    }
                }

                // Append the input to the form before we continue the next itteration of the loop.
                form.appendChild(input);
            }

        }
    
    // Set the submit child in the form. This will let us submitt the houdiniForm.
    let submit = document.createElement('submit');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'submit');
    form.appendChild(submit);

    // Append form to the body of the document
    document.body.appendChild(form);

    // Submit form or log error
    if (err) {
        console.log(err);
    } else {
        form.submit();
    }
}

