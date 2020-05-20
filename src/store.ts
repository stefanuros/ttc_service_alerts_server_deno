import { storeConfig } from './config.ts';
import { TwitterApi } from './deps.ts';
import { keys } from './keys.ts';

export interface Tweet {
  id_str: string,
  [key: string]: any
}

// A store object that stores tweet info
export class Store {
  // This is where tweets are stored
  private static tweets: Tweet[] = [];
  private static mostRecentId: string | undefined = undefined;
  private static readonly maxStored: number = storeConfig.MAX_TWEETS_STORED;
  private static readonly maxRequested: number = storeConfig.MAX_TWEETS_REQUESTED;
  private static readonly twitterApi: TwitterApi = new TwitterApi(keys); 

  // This function gets tweets from the Twitter Developer Api and saves them. It
  // keeps a max number of tweets defined in the config. It only gets tweets that
  // are after 
  public static async updateTweets(): Promise<void> {
    // Create the request object
    let options: any = {
      user_id: "19025957",
      screen_name: "TTCnotices",
      count: Store.maxRequested.toString(),
      trim_user: "true",
      tweet_mode: "extended"
    };

    // Optionally, only get tweets more recent than the most recent tweet we
    // already have
    if(Store.mostRecentId != undefined) {
      options.since_id = Store.mostRecentId;
    }

    // Get tweets from api
    let ttcTweetsPromise: Response = 
      await Store.twitterApi.get("statuses/user_timeline.json", options);
    let tweetJson: Tweet[] = await ttcTweetsPromise.json();

    let keepTweets: number = 
      Math.min(Store.tweets.length, Store.maxStored - tweetJson.length);

    // Add them to front of list and remove extra
    Store.tweets = [
      ...tweetJson,
      ...Store.tweets.slice(0, keepTweets)
    ];

    // Set the new most recent
    if(tweetJson[0] != null) {
      Store.mostRecentId = tweetJson[0].id_str;
    }
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
