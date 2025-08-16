# Stock watchlist

Take home assignment as part of a job interview process. Develop a stock watchlist feature where user can create watchlist of stocks from available stocks. Prices for the watchlist stocks should dynamically update. User should be able to set price based alerts for stocks.

## How to run?

1. Install all dependencies:

   ```
   npm run install-all
   ```

2. Start both server and UI:

   ```
   npm start
   ```

3. Navigate to [Stock watchlist UI](http://localhost:4200)


## High level functional requirements

- Assume a system with 200 stocks and a data source that emits updated prices of all those stocks every 100ms.
- The user should be able to search from the 200 stocks and add upto 20 stocks to a watchlist.
- The system should dynamically update the prices of the stocks on the screen as and when the above source emits updated prices.
- User can create upto 10 such watchlists. User can look at one watchlist at a time.
- Trade-off: There is no support for multiple users due to time constraints. But system can be extended to multiple users with some time and effort.

## Detailed Scope

This section outlines detailed requirements and provides high level UI direction.

### UI and navigation

- The app layout will have a simple header. Shows App name and 3 links - Home, Watchlists and Alerts. App name also points to Home page. So in total we have two top level pages

### Home page

- The home page contains a big typeahead input where user can search the 200 stocks in the system by name or symbol.
- The results show matching stock name in a drop down and user can click to view the stock
- Clicking on the stock takes the user to the stock detail page. On this page user can view price of the stock being dynamically updated and add the stock to one of the watchlists.
- User can also create a new watchlist while adding to watchlist.
- The search box should still be available on the stock detail page.

### Watchlist page
- User can create a watchlist on this page or select any existing watchlist
  - For creating a watchlist a pop up opens where user can provide a name and select stocks for the watch list.
  - once done, the watchlist is saved and user goes to watchlist detail page.
- The watchlist page shows the list of stocks present in the watchlist. The prices update dynamically+       
- With every update the page should indicate if the stock went up or down in price since the last update.
- On this page, user can add a stock to the watchlist and remove a stock from watchlist.

### Alerts

- Alerts can be configured from Home -> Stock detail page or from Watch list page for a single stock
- User is alerted when price reaches a particular absolute value specified by user
- Alerts page shows alerts in two sections.
  - Pending alerts: Where the alert criteria is not still met. Shows timestamp when alert was created
  - Executed alerts: Where the alert criteria is already met. Shows timestamp when alert was created and when it was met.

## Technology

This section outlines what technology used to develop the app.

### Backend

Backend is a node and express app. This is responsible for the following

- Maintaining JSON file based database for stocks, prices, watchlists and alerts. LowDB is used for this.
- Hosts a master data source that mimicks a live feed of 200 stocks. It emits the randomly generated prices of the stocks every 100ms
- It provides a web socket connection for
  1. Subscribing to realtime price updates of stocks
  2. Notifying subscribers when price alerts are met.
- It also provides following RESTFul APIs
  - Stocks: GET with query params (Used for search)
  - Watchlists: GET all watchlists of users.
  - Watchlist: Full CRUD API
  - WatchlistStock: API to add/remove stocks from watchlist
  - Alert: API to create/delete alert

### Frontend

- Frontend built using Angular framework
- Angular material used for UI Components.
- State management: Angular native signals. RxJS for events.
- WebSocket for live feed of stock prices.
- HttpClient for communication with APIs
- CSS: Mix of CSS in components css file and custom css in global css
