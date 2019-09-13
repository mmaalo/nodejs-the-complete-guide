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

## 02-24:
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