import { Store } from './store.ts';

// This function returns a list of the 20 most recent tweets
function getTweets({ response }: { response: any }): void {
  response.body = Store.getTweets();
}

// This function returns a list of the 20 most recent tweets that come after 
// a specific tweet id
function getTweetsSince(
  { response, params }: { response: any, params: any }
): void {
  response.body = Store.getTweetsSince(params.sinceId);
}

export {
  getTweets,
  getTweetsSince
};
