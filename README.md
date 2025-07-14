# DVB Home Assistant

### Setup
Get your `stop_id` from this url, simply change the text "Hauptbahnhof" to whatever station you want to know the if. The first number is the `stop_id` you're looking for:

> https://webapi.vvo-online.de/tr/pointfinder?format=JSON&stopsOnly=True&query=%27Dresden%20Hauptbahnhof%27&dvb=True


### Development
To start a development server, open two command lines. In the first one, you run
> npm run build:watch

and in the second one, you run 
> npm run start:watch

That way, we start `rollup` in it's "watch" mode and the `@web/web-dev-server` to serve a static html file from the `dev` folder. Not ideal, but works for now.


### Credits
- Thanks a lot to alexpfau's [calendar-card-pro](https://github.com/alexpfau/calendar-card-pro), I took some inspiration from it.