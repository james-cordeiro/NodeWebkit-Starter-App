# README

This is a short and unobstrusive read me. Quick details for starting and running a nodewebkit (NW) app. There are/can be much improvements to be made to this starter kit. _Pull requests are welcome!!!_ 

Help me improve it. Help me Learn. Do Good. Drink Coffee. Lot's of it!!!

The starter kit works best (designs based too) on Mac system (sorry to those who are not Apple inclined). However, submit a pull request to help me it more generic. Regardless, it does build for Linux, Windows & Mac. Works too (most of the time).

Wishlist of improvements would be: 

- nodewebkit "routing" 
- index.html split out into components (web components that is)
- general clean up, performance improve

## Requirements

Install the following packages globally on your system (or some of them just locally). I will not details here but provide links to investigate. 

- Install NPM & Node (for running and installing dependencies)
- Install Gulp (for performing tasks such as build process)
- Install NodeWebkit (for running the app under development)
- Install Mocha (for running tests in command line)

## NPM Commands

``` 
$ npm start
```

This runs the gulpfile.js build process with the default `gulp` command. Checkout the gulpfile to see the details under the hood. It basically runs the image processing, scss & js compilation etc. Everything required to to build your app and getting it up and running. NPM start also then runs the default `nw` app to run the APP within scope immediately.

```
npm run-script build
```

This runs the gulpfile.js `gulp new-release-candidate` command which triggers the native app build and deploy step for the different desktop environments based on the manifest file. 

```
npm test
```

This runs the `mocha` command under spec format.


# Remember

Have fun. Tell me about it. I'd love to know what you feel, what you build, what you create and destroy. #cheers
