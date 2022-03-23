import connection from "./connection.js";
import {User} from "./models.js"; 

connection
    .then(async (conn) => {
        const user = new User({sex: "m"});
        
        try {
            // nothing changes
            user.set("age", 18)

            // add new field
            user.set("name", "Nazarii");
            const data = await user.save();

            console.log(data);
        } catch (error) {
            for (let fieldName in error.errors) {
                console.log(error.errors[fieldName].properties.message);
            }
        }
    })
    .catch((error) => {
        console.log(error);
    });