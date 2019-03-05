# LegendsRising 

[![Build Status](https://img.shields.io/travis/MarcScheib/legendsrising/master.svg?style=flat-square)](https://travis-ci.org/MarcScheib/legendsrising) 
[![Coverage Status](https://img.shields.io/coveralls/MarcScheib/legendsrising/master.svg?style=flat-square)](https://coveralls.io/github/MarcScheib/legendsrising?branch=master)
[![Dependency Status](https://img.shields.io/david/MarcScheib/legendsrising.svg?style=flat-square)](https://david-dm.org/MarcScheib/legendsrising)
[![devDependency Status](https://img.shields.io/david/dev/MarcScheib/legendsrising.svg?style=flat-square)](https://david-dm.org/MarcScheib/legendsrising?type=dev)
[![CodeFactor](https://www.codefactor.io/repository/github/marcscheib/legendsrising/badge)](https://www.codefactor.io/repository/github/marcscheib/legendsrising)

LegendsRising is a Massively Multiplayer Online Role-Playing Game, claiming player to One-vs-Many battles.

## Building The Code

First of all, clone the complete repository to your local machine.

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. To build the code, you can now run:

  ```shell
  npm run build:dev
  ```
  
## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the project. Once you have done that, proceed with the following steps.

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. You can now run the tests with this command:

  ```shell
  karma start
  ```
  
## Releasing A New Version

1. Bump the version
  
  ```shell
  npm run bump-version [<newversion> | major | minor | patch]
  ```

2. Prepare the release (run tests, run build, docs, release notes)
  
  ```shell
  npm run prepare-release
  ```

3. Commit and tag
