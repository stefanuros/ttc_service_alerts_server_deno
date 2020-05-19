// A store object that stores tweet info
export class Store {
  // This is where tweets are stored
  private static tweets: object[] = [];

  // This function gets tweets from the Twitter Developer Api and saves them. It
  // keeps a max number of tweets defined in the config. It only gets tweets that
  // are after 
  public static updateTweets(): void {
    Store.tweets.push({tweet: 1});
    console.log(Store.tweets);
  }

  // This function returns a list of the 20 most recent tweets
  public static getTweets(): object[] {
    return [];
  }

  // This function returns a list of the 20 most recent tweets that come after 
  // 
  public static getTweetsSince(): object[] {
    return [];
  }
}
