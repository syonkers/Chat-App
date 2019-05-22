# Chat Application using React + Redux

![ScreenShot](./public/screenshots/screenshot.png?raw=true)

## Requirements

For development, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation

Just go on [official Node.js website](http://nodejs.org/) & follow the instructions for your OS.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/syonkers/chat-app-react-redux.git
    $ cd PROJECT
    $ npm install

## Start the client

    $ npm start

## Start the server

    $ cd PROJECT
    $ node server/server.js

## Update sources

Some packages usages might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands you can just do

    $ npm run pull

**Note:** Unix user can just link the `git-hooks/post-merge`:
