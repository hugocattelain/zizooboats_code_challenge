# Zizoo Boats code challenge

Candidate: Hugo Cattelain

## Getting started

To run the project locally, run the following commands :

- npm install
- cd client
- npm install
- cd ..
- npm start

If the last command does not automatically open the app in your browser, follow this URL: http://localhost:3000/

## Choices & dependencies

React has been chosen over Vue for convenience.
Express was used for the backend.

The App styling was made exclusively using CSS in JS

The main librarie used for the UI components is Material-ui (https://material-ui.com/)

Appart from the existing test in './src/App.test.js', no additional test has been written.

## Features

Users can display the list of boats in the table as well as any boat details by clicking on the boat name.
Boat list can be sorted by clicking on any field title.
It can also be filtered by clicking on the filter icon on the top right corner of the boat table.

5 filters can be used including 3 range sliders, a multi-select dropbox and an auto-complete text-field.
