# Introduction

## 01-02:
### What is NodeJS?

NodeJS is a javascript runtime. It uses the chrome v8 engine to compile JS code into machine code. NodeJS adds extra features that the chrome engine lacks. For example the option to access the local file system. Also some features from the browser are missing, like the ability to access the HTML DOM. In a statement, NodeJS is Javascript on the server.

## 01-04:
### Javascript on the Server
NodeJs lets us write a webserver with javascript. As a JavaScript runtime NodeJs is not limited to running a server. It can be used to run any code we want locally. As NodeJs has access to the local file system it is also suited for utility scripts, build tools ect.

With NodeJS unlike PHP, Java ect. witch is only the code that runs on a server NodeJs also runs the server. With NodeJs we write the code for our server, thus no extra tools are required. A huge advantage of NodeJs is that it lets us use JavasScript on both the server and client side.

## 01-06:
### Get The Most Out Of The Course
- Watch the videos (duh) ---------------> At Your Speed! Pause & Rewind!
                                                     |
- Code along & do the Excercises --------------------|

- Use the Course Resources -------------> Attached Code & Links

## 01-07:
### Working with the REPL vs Using Files

REPL:
Read  --> Read User Input
Eval  --> Evaluate User Input
Print --> Print Output (Result)
Loop  --> Wait for new Input

- The REPL is what we use if we just type "node" in the terminal. It is a great playground for learning node as the code is excecuted as it is written, but nothing is saved when we exit the REPL. Therefore we will be using excecutable files in this course.

# Javascript Refresher

## 02-10:
### JavaScript in a Nutshell

JavaScript Summary:
- Weakly Typed Language
    - No explicit type assignment, does not force you to define variable types. Leads to more flexibility, but is also more subject to errors.
- Object-Oriented Language
    - Data can be organized in logical objects.
    - Logical objects are a reference type instead of primitive like undefined, null, boolean, nubmer, string and symbol.
- Versitale Language
    - Runs in the browser or directly on a pc or server.
    - Can preform a wide array of tasks.

## 03-24:
### How the Web Works

Basic diagram of how the web works:
------------------------->User/Client (Browser)<-----------------
|                           |                                   |
|                           V                                   |
|                         User Enters http://my-page.com        |
|                           |                                   |
V                           V                                   |
Request<------------------Domain Lookup                     Response
|                                                               |
|                                                               |
|                                                               |
|                                                               |
-- -----------------------Server (at 10.212.212.12)--------------
                            ^
                            |
                            V
Node.js PHP ASP .NET<-->Your Code<------------------------->Database

HTTP, HTTPS:
- Hyper Text Transfer Protocol
    - Protocol for transferring Data witch is understood by Browser and Server

- Hyper Text Transfer Protocol Secure
    - HTTP + Data Encryption (during Transmission)

## 03-25:
### Creating a Node Server

Some important core modules:
- http      --> Launch a server, send requests
- https     --> Launch a SSL server
- fs
- path
- os

## 03-26:
### The Node Lifecycle & Event Loop

Node.js Program Lifecycle:
- node app.js
- Start Script
- Parse Code, Register Variables & Functions
- Node Application
    - Event Loop (Keeps running as long as there are event listener registered)
        - Is in theory single threaded, but node takes advantage of the OS and there are modules to enable multithreading.
        - process.exit will end the event loop, thus stopping our server.

## 03-33:
### Parsing Request Bodies

Streams & Buffers
- Example: Incoming Request
- Stream --- reqpart1 --- reqpart2 --- reqpart3 --- reqpart4 ---> Fully Parsed
    - Start working on the Data early
    - We don't work on the data stream itself, but on the buffer.

## 03-34
### Understanding Event Driven Code Execution

* Sending the response does not mean that the event listeners are dead. They will still run, even after the response are sent.
* If we do something that influences the response in the eventlistener, then the res.end() needs to be inside the event listener so that the response is not sent before the event listener is executed.
* Node execute a lot of the functions useing the function in function pattern asyncronusly. Examples are http.createServer() and req.on().
    * With these functions Node does not run the functions immediatly but instead creates a eventlistener and calls it after Node is finished parsing the request.
        * This means that all the code outside the eventlisteners are run from top to bottom before the eventlisteners are called in succession.

## 03-35
### Blocking and Non-Blocking Code

writeFileSync:
    - The "Sync" part stands for syncronus and blocks following code from being executed before it is done.
    - Therefore using writeFile instead of writeFileSync will stop the server from hanging until the task is complete. This is especially important with large files.
    - writeFile() takes a callback function and is therefore executed asyncronusly.

## 03-36
### Looking Behind the Scenes

Single Thread, Event Loop & Blocking code
- The code we write in Node.js uses a single javascript thread.
- The event loop only handle the event callbacks that contain fast finishing code
- Heavier operations are sent to the worker pool. The worker pool are detached form my code and handled by the operating system. The worker pool are able to create diffrent threads.
- Once the worker in the worker pool is finished with a task it will trigger the callback in the event loop.

The Event Loop:
- Checks for Timers
    - Execute setTimeout, setInterval callbacks
- Checks Pending Callbacks
    - Execute I/O related callbacks that were deferred.
    - After a certian amount of the Node.js will continue its code excecution and pospone the remaning callbacks to the next loop.
- Poll
    - Jump to Timer execution if nesessary
    - Retrive new I/O events, execute their callbacks
    - If it is not possible to execute the new callbacks they will be deferred into pending callbacks
- Check
    - Execute setImmediate callbacks
- Close Callbacks
    - Execute all 'close' event callbacks
- Process.exit()
    - Only if refs == 0, refs is the amount of eventlisteners. server.listen() is never finished by default. Therefore a normal Node.js server will not shut down unless process.exit() is called in our code.

Security: Request seperation:
- Incomeing requests do by default not have access to each other, they are seperated by scope.

## 04-41
### Understanding NPM Scripts
- npm init will create the package.json file.
- We can add our own scripts in the package.json file.
    - The "start" script can be run simply by running "npm start" in the terminal
    - All other scripts is run by writing "npm run scriptname"

## 04-42
### Installing 3rd Party Packages
3rd party packages are accessable via the npm tool

To install packages locally:
- npm install "name of package"
    - by default npm installs the latest package
    - to install a specific package "npm install package@4.17.2"
    - "npm install package^@4.0.0" installs the latest 4.x.x version of the package
    - "--save-dev" installs package as a development dependency
    - "--save" installs package as a production dependency
    - "--save-exact" togeater with "--save" or "--save-dev" will lock the specific version in the package.json file.
    - "npm install package -g" installs the package globally on the computer so that it can be used anywhere

## 04-44
### Using Nodemon for Autorestarts
Running nodemon trough a npm script will work if it is installed locally, but it needs to be installed globally for it to be run in the terminal.

## 04-46
### Understanding Diffrent Types of Errors
Types of errors:
- Syntax Errors
    - Typos, forgetting a curlybracket ect.
- Runtime Errors:
    - Code that breaks when it runs, while not being a syntax error.
- Logical Errors:
    - The app does not work the way it is supposed to and we do not get a error message.

## 04-51
### Restarting the Debugger Automatically After Editing our App
- In VSCodium or VSCode select Debug --> Add Configuration. Make sure that you add the following in the configurations object:
    "program": "${workspaceFolder}/app.js",
    "restart": true,
    "runtimeExecutable": "nodemon,
    "console": "integratedTerminal"

## 04-52
### Changeing Variables in the Debug Console
Variables can be changed in the debug console when the debugger is running simply by clicking and changeing them in the variables window when the program hits a breakpoint.