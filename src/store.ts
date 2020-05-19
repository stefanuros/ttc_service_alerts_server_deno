import { storeConfig } from './config.ts';

export interface Tweet {
  
  created_at: string,
  id_str: string,
  [key: string]: any
}

// A store object that stores tweet info
export class Store {
  // This is where tweets are stored
  private static tweets: Tweet[] = [];
  private static mostRecentId: string | null = null;
  private static readonly maxStored: number = storeConfig.MAX_TWEETS_STORED;
  private static readonly maxRequested: number = storeConfig.MAX_TWEETS_REQUESTED;

  // This function gets tweets from the Twitter Developer Api and saves them. It
  // keeps a max number of tweets defined in the config. It only gets tweets that
  // are after 
  public static updateTweets(): void {
    Store.tweets.push({created_at: "", id_str: "", tweet: 1});
    console.log(Store.tweets);
  }

  // This function returns a list of the 20 most recent tweets
  public static getTweets(num: number = Store.maxRequested): Tweet[] {
    return Store.tweets.slice(0, Math.min(num, Store.maxRequested));
  }

  // This function returns a list of the 20 most recent tweets that come after 
  // a specific tweet id
  public static getTweetsSince(id: string): Tweet[] {
    let c = 0;

    while(id < Store.tweets[c].id_str) {
      c++;

      if(c === Store.maxRequested) {
        return Store.getTweets();
      }
    }

    return Store.getTweets(c);
  }
}
