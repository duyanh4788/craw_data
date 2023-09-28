# Craw data From F1 NodeJS

## Quick Install

1.  Make sure that you have Node.js >=v18 and npm v8 or above installed.
2.  Clone this repo using `git clone git@github.com:duyanh4788/craw_data.git`
3.  checkout branch develop and development
4.  Copy file `.env.example` to `.env`
5.  Run `npm run install || yarn install` in order to install dependencies.<br />
6.  Run `npm run env-dev` in order to install dependencies.<br />
    _At this point you can see the example app at `http://localhost:8000`._
    Now you're ready to rumble!

> You can run with docker or docker-compose <br
> `$ docker-compose up -d --build` <br> > `$ docker-compose stop` <br>

## API Endpoints

- The following endpoints are available in the API in POSTMAN:
- Craw data: Current I have craw only page: https://www.formula1.com/en/results.html
  with 4 model : races, driver, teams, fastest-lap
- Have 2 way craw: Job (ON/OFF), API
- API craw data: {{host}}/craws/craw-data-f1-result
- Teams: search multi type && value
  {{host}}/teams/get-lists/:type/:value
  type/value
  seasonRaces/2023, teamName/Bull, pts/765, pos/1

- Races: search multi type && value
  {{host}}/races/get-lists/:type/:value
  type/value
  seasonRaces/2023, carName/Bull, grandPrix/765, winner/CharlesLecl

- Drivers: search multi type && value
  {{host}}/drivers/get-lists/:type/:value
  type/value
  seasonRaces/2023, carName/Bull, driverName/MaxVe, nationality/NED

- Fastest Laps/: search multi type && value
  {{host}}/fastest-laps/get-lists/:type/:value
  type/value
  seasonRaces/2023, carName/Bull, grandPrix/Australia
