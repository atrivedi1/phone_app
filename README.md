# Zipline Order Tracking App
Zipline is a full-service logistics platform that leverages autonomous flying vehicles to provide rural hospitals and clinics with live-saving medical supplies (such as blood, vaccines etc).

This app is the beginning implementation of a customer-facing web application for doctors and clinicians that will ultimately serve 3 functions:

1) Allow a doctor to place an order for medical products to be delivered to a hospital
2) Allow a doctor to track the status of a placed order
3) Allow a regulator to audit all of the fulfilled orders -- which products have been shipped to which hospitals

As of 6/23/2019, this app has the following basic functionality:
1) Allows a doctor to place an order for a single medical product
2) Notifies a doctor when:
 - Their order was successfully submitted
 - There was an issue fulfilling their order
 - Zipline's distribution center is completely out of inventory
3) Stores order information (in-memory) for future audits

## Screenshots
![App Screenshot](https://cl.ly/5c91f7131187)

## Technology Used
1) ReactJS 
2) Node.js

## Installation
1) Open terminal, and run `git clone https://github.com/atrivedi1/Zipline_Order_Tracking_App.git` in the target directory
2) Run `npm install`
3) Run the following commands: 
  - `pip install Flask==1.0.2`
  - `pip install Flask-SQLAlchemy==2.3.2`
  - `pip install enum34==1.1.6`
4) Open the root directory in 3 separate tabs in the terminal and run the following commands (1 per tab):
  - `npm run start-simulator`
  - `npm run start-server` 
  - `npm run start-client`

##v1 Design/Implementation Considerations
For v1 of this app, I decided to focus on the Order UI in particular. Currently the UI fulfills the following requirements:

1) Allows a doctor to choose a destination hospital
2) Allows a doctor to select integer quantities of a SINGLE product
3) Allows a doctor to confirm whether or not an order was placed successfully
4) Does NOT allow a doctor to place an order for out-of-stock items
5) Does NOT require the doctor to manually split their order based on weight requirements

###General
Although it may be a bit overkill for the purposes of v1, I wanted to separate concerns as much as possible in my application design - so as to ensure a solid foundation for the future. As such, the app contains:

1) A folder for helper functions in both the /server and /src folders
2) A routes folder on the backend, broken down thematically in case we need to eventually add additional routes for the `/inventory`, `/hospital`, and `/order` endpoints. 
 - NOTE: to distinguish between the concerns of the user vs. those of Zipline, I decided to route requests to the client-side `/order` endpoint to the `/flight` endpoint on the backend
3) A controllers folder on the backend to house the "business logic" corresponding to each endpoint
4) A separate folder for the database (DB). Eventually, this could contain separate files for each DB model

###Client-side
Given that these orders are oftentimes urgent, and every second matters, I wanted to make sure that users don't spend unecessary time inputting "invalid" quantities for a given product OR selecting a product that is currently out of stock. Thus:

1) I decided to use dropdown lists vs. open-ended inputs (NOTE: for v1, I decided to stack the inputs visually, however that would obviously change when accounting for multiple products)
2) The dropdown inputs for both product and quantity ONLY allow a doctor to select valid products and quantity numbers respectively (e.g. if there are only 10 products left of a given product, a user will be unable to select 11; and if a product is out-of-stock, it won't show up in the product dropdown at all).
3) To accommodate for the use case where doctors can select multiple products
  - I introduced the concept of a "projected inventory" (/src/components/OrderTrackingApp.js). Though I'm not making full use of it at the moment, the idea is to use it to provide the customer w/ guidance re: how many items of a given product they can still select based on what's already in their "checkout cart" vs. the actual inventory available at Zipline's distribution center. 
  - I created a separate `ProductSelectionInput` component which I can easily duplicate going forward

In addition, it's worth noting, that I decided to use a functional pattern for the `OrderForm` and `Notification` components since they are used solely for templating. 

###Server-side
Although it's only possible for a doctor to select ONE product at the moment, I was very much thinking about the "mulitple product" use case when designing the backend as well: 

1) The `createPackage` method in `/server/controllers/flight.js` takes a greedy approach to filling packages for a given order:
 - It loops through each product category alphabetically (NOTE: for v1 I DID consider sorting the product categories by weight as well, but didn't see any particular benefit)
 - For every product category, it places individual items into a package until it can't anymore
 - If another item from another product category can fit into the package, the `createPackage` function adds it
2) Although I would have liked to have spent a bit more time thinking about a more optimal packaging algorithm (i.e. to optimize/balance out weight distribution across packages), the greedy solution works for v1

Additionally, to account for a future where we would need to audit which products have been shipped to which hospital, I created an in-memory data store to keep track of order data. 

##Outstanding Items
There are definitely a few UI things I'd still like to clean up:

1) Given that a user will presumably not be operating out of more than 1 clinic/hospital (at least very often), I would want to preserve the user's hospital selection from previous orders
2) Right now, when a user submits an order, I'm using jquery to reset the form data. I'm okay with this since the state of the app's child components is not changing on "submit", but nonetheless I'd like to clean this up. 
3) Even for v1, I would have preferred to have provided the user with a time estimate on their delivery - even if they're unable to see more granular status updated
4) Right now, as mentioned, ONE user can single-handedly cause a particular product to go out of stock. From an ethical standpoint, I'd want to put a cap on how much of a given product a user can order. However I'd need to spend more time thinking through the underlying logic (e.g. "a user can select up to 5 units of a given product if Zipline has over 20 units in inventory")

In addition, while I DID play around with various stubbed order data, I would want to create robust unit tests for the `createPackage` function to ensure that it's working as expected. 

##Next Steps
1) Multiple product functionality - In my mind, the first priority is to get doctors the supplies they need 
2) Order Tracking + Transparency - Once doctor's are able to order the supplies they need as easily as possible, the next area of focus would be to build out the order tracking functionality. 
3) Data persistence/Auditing - Lastly, would build out a route/controller to pull delivery data by hospital 

##Extras
In case you're curious, the todo.txt file provides a bit more insight into how I approached this exercise from an implementation standpoint. 
