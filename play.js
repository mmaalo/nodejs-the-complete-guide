// Async vs. sync code:

    // // This is async code, because it is not excecuted immideatly.
    // setTimeout(() => {
    //     console.log('Timer is done!');
    // }, 2000);

    // // This is syncronus code because it is excecuted as soon as it is called
    // console.log('Hello!');
    // console.log('Hi!');

// Working with async code:

    // // callback function:
    // const fetchData = callback => {
    //     setTimeout(() => {
    //         callback('Done!')
    //     }, 1500);
    // }

    // setTimeout(() => {
    //     console.log('Timer is done!');
    //     fetchData(text => {
    //         console.log(text);
    //     });
    // }, 2000);

    // Nested promises (use .then instead):
        // const fetchData = () => {
        //     const promise = new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve('Done!')
        //         }, 1500);
        //     }); 
        //     return promise; // This is syncronus code and will be run immideatly when the promise is created, but won't be run before we call fetchData in the setTimeout() below.
        // }

        // setTimeout(() => {
        //     console.log('Timer is done!');
        //     fetchData(text => {
        //         console.log(text);
        //         fetchData().then(text2 => {
        //             console.log(text2);
        //         });
        //     });
        // }, 2000);

    // Nested promises with multiple .then blocks:
        const fetchData = () => {
            const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('Done!');
                }, 1500);
            });
            return promise;
        };

        setTimeout(() => {
            console.log('Timer is done!');
            fetchData()
            .then(text => {
                console.log(text);
            })
            .then(text2 => {
                console.log(text2);
            })
            ;
        }, 2000);