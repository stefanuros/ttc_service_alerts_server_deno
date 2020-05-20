# TTC Service Alerts Server

This repo is the backend server for the TTC Service Alerts app I made with flutter. 
It is made with Deno for no reason other than I wanted to learn it.

This project was necessary because the twitter api can handle a max of 150 requests
every 15 minutes. Given how the TTC Service Alerts app was programmed, if there are
enough people, the api would be overloaded and everyones app would stop working.
Thats why this backend app will be the new endpoint the TTC Service Alerts app will 
hit. This allows me to control a maximum number of requests going out to the 
Twitter Api to prevent overloading.

This project has 3 different components. It has an http server, a cron scheduler, and
a Twitter api store. 

The http server will handle any incoming requests. At the moment, this can be 
`/api/tweets` which gets the 20 most recent tweets, and `api/tweets/:id` (where
:id is the id of a tweet) which returns the most recent tweets that are older 
than the tweet specified by id. This data comes from the store.

The cron scheduler, updates the store every minute. It accesses the twitter api
and updates the list of tweets it stores. It keeps the 100 most recent tweets in store.

Finally, the store keeps a list of the 100 most recent tweets, as well as returning
lists of tweets to the REST requests that ask for them.

## Running

First you need to make a keys.ts file that looks like this:
```typescript
// Fill in the strings with your own keys from the Twitter Developer Api website
export const keys = {
  consumerApiKey: "",
  consumerApiSecret: "",
  accessToken: "",
  accessTokenSecret: "",
}
```
To run it, simply run `cd src` and then `deno run --allow-net app.ts`
Now the app will be running and constantly updating the tweets stored. You can 
test it by going to `localhost:8000/api/tweets`
