# Quiz Master UI 

[Demo](https://christineoo.github.com/Quiz-Master)

This is the UI application for Quiz Master. This application is written using ReactJS and Redux with Material UI. The question content can be styled using rich text editor from [Draft.js](https://facebook.github.io/draft-js/) which is an open source project from Facebook.

There are 2 modes in this application.

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

## Run Locally

1. Clone repository: git clone https://github.com/christineoo/Quiz-Master.git
2. npm install
3. npm start

## Future Feature Enhancement
* Implement pagination for the questions list page.
* Implement search/filter for the questions list so that user can easily search for a particular question.
* Implement batch delete so that user can easily delete more than one question at a time.
* Add [DraftJS plugin](https://www.draft-js-plugins.com/) to further enhance the rich text editor(such as attaching images).
