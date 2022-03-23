import connection from "./connection.js";
import {User} from "./models.js"; 

connection
    .then(async (conn) => {
        
        try {
            const data = await User.create({name: "Nazarii", sex: "m", map: {name: "Nazarii"}});

            console.log(data);
        } catch (error) {
            for (let fieldName in error.errors) {
                console.log(error.errors[fieldName].properties.message);
            }
        }

        try {
            // error
            const data = await User.create({name: "Nazarii"});

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