# Quiz Master UI 

This is the UI application for Quiz Master. This application is written using ReactJS and Redux with Material UI. There are 2 modes in this application.

* Manage Questions mode
  * User is able create, read, update and delete questions.

* Quiz Mode
  * User is able do quiz on the questions created in manage questions mode. Input answer will be submitted and verify if the input answer is correct or not.

## Available Scripts

In the project directory, you can run:

### `npm start`

* Runs the application in development mode
* Open [http://localhost:8080](http://localhost:8080/) to view it in the browser.

### `npm test`

* Runs tests located under the test folder with file names `*.spec.js`

### `npm run build`

* Builds the application for production into the `src/public` folder.
* It bundles React into production mode and produce output files that are ready to be deployed.

### `npm run deploy`

* Runs `npm run build` then using `gh-pages` to push the built files in `src/public` folder into `gh-pages`(ie: [https://christineoo.github.com/Quiz-Master](https://christineoo.github.com/Quiz-Master))

## Future Feature Enhancement

* Implement pagination for the questions list page.
* Implement batch delete so that user can easily delete more than one question at a time.
