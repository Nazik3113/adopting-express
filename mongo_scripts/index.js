```js
use nazarii;
const names = ["Nazarii", "Andriy", "Yaroslav"];
let insert_accamulator = [];

for (let iterations = 0; iterations < 1000; iterations++) {
    for (let names_index = 0; names_index < names.length; names_index++) {
        insert_accamulator.push({date: new Date(), name: names[names_index], scores: Math.random()})
    }
}

db.users.insert(insert_accamulator);
```

// mongo < index.js