## LegendsRising

LegendsRising is a Massively Multiplayer Online Role-Playing Game, claiming player to One-vs-Many battles.

## Official Page

LegendsRising can be found on the [LegendsRising website](http://www.legendsrising.de/).

## Building The Code

First of all, clone the complete repository to your local machine.

### Backend

1. Ensure that [Composer](https://getcomposer.org/) is installed.
2. From the project folder, execute the following command:

  ```shell
  composer install
  ```
3. Make sure to set up a database (preferable MySQL).
4. Adjust the ```.env.example``` file to your needs and save it as ```.env```.
5. Run the following command to set up the database:

  ```shell
  php artisan migrate
  ```

### Frontend

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

### Backend

1. Ensure that [PHPUnit](https://phpunit.de/) is installed.
2. Run the tests with the following command:

  ```shell
  phpunit
  ```

### Frontend

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. You can now run the tests with this command:

  ```shell
  karma start
  ```