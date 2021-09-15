# Weather Forecast

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction
This project is implement the weather forecast, user can search for the location to view 5 days forecast, using [MetaWeather API](https://www.metaweather.com/api/)

This project is deployed at: https://binh-ho-weather-forecast.herokuapp.com

Because facing with CORS issue of MetaWeather API, so I deploy a [proxy](https://binh-ho-cors-proxy.herokuapp.com) that allow all origin by using [cors-anywhere](https://github.com/Rob--W/cors-anywhere)

## Prerequisites
 - NodeJS v14
 - Yarn 1.22.10

## Available Scripts

 - `yarn start`: Runs the app at [http://localhost:3000](http://localhost:3000)
 - `yarn test`: Launches the test runner
 - `yarn build`: Builds the app for production to the */build* folder.
 - `yarn test --coverage --watchAll`: View the code coverage

## References
 - [How to deploy this project using Heroku CLI](https://blog.heroku.com/deploying-react-with-zero-configuration)


