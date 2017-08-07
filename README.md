# assignment_practice_with_mongodb
which nodemon > /dev/null && nodemon app.js || node app.js

Querying with the MongoDB shell


## Getting Started

**IMPORTANT** don't run `__seeds__.js`. It is there only to generate `__products__.js` in the case that it **MUST** be regenerated. Regenerating that data will make query results different across instances of this assignment.


## Products

To get started import `__products__.js` into your MongoDB database with the following command:

```bash
$ mongoimport --db test --collection products --file __products__.js
```


## Restaurants

Restaurant data is imported from the MongoDB test database provide [here](https://docs.mongodb.com/getting-started/shell/import-data/).

Import the data from the `__restaurants__.js` file.

```bash
$ mongoimport --db test --collection restaurants --file __restaurants__.js
```

mongoimport -h ds017155.mlab.com:17155 -d practice_with_mongo -c product -u bsoung -p 123 --file __products__.js

mongo ds017155.mlab.com:17155/practice_with_mongo -u bsoung -p 123