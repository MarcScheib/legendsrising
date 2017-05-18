# LegendsRising 

[![Build Status](https://img.shields.io/travis/MarcScheib/legendsrising/master.svg?style=flat-square)](https://travis-ci.org/MarcScheib/legendsrising) 
[![Coverage Status](https://img.shields.io/coveralls/MarcScheib/legendsrising/master.svg?style=flat-square)](https://coveralls.io/github/MarcScheib/legendsrising?branch=master)
[![Dependency Status](https://img.shields.io/david/MarcScheib/legendsrising.svg?style=flat-square)](https://david-dm.org/MarcScheib/legendsrising)
[![devDependency Status](https://img.shields.io/david/dev/MarcScheib/legendsrising.svg?style=flat-square)](https://david-dm.org/MarcScheib/legendsrising?type=dev)

LegendsRising is a Massively Multiplayer Online Role-Playing Game, claiming player to One-vs-Many battles.

## Official Page

LegendsRising can be found on the [LegendsRising website](http://www.legendsrising.de/).

## Building The Code

First of all, clone the complete repository to your local machine.

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g jspm
  ```
  > **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm endpoint config github` and following the prompts.
5. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```
  >**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.
6. To build the code, you can now run:

  ```shell
  gulp build
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
