# DVB Home Assistant

### Development
To start a development server, open two command lines. In the first one, you run
> npm run build:watch

and in the second one, you run 
> npm run start:watch

That way, we start `rollup` in it's "watch" mode and the `@web/web-dev-server` to serve a static html file from the `dev` folder. Not ideal, but works for now. 