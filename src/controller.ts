import { Store, Tweet } from './store.ts';

function init({ request, response}: { request: any, response: any }) {
  response.body = "Welcome to this page";
  response.status = 200;
}

// This function returns a list of the 20 most recent tweets
function getTweets({request, response}: { request: any, response: any}): void {
  response.body = Store.getTweets();
}

// This function returns a list of the 20 most recent tweets that come after 
// a specific tweet id
function getTweetsSince(
  {request, response, params}: { request: any, response: any, params: any}
): void {
  response.body = Store.getTweetsSince(params.sinceId);
}

export {
  init,
  getTweets,
  getTweetsSince
};
