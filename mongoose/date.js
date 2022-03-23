import connection from "./connection.js";
import {User} from "./models.js"; 

connection
    .then(async (conn) => {
        try {
            const data = await User.create({
                name: "Nazarii", 
                sex: "m",
                date: new Date()
            });

            console.log(data);
        } catch (error) {
            for (let fieldName in error.errors) {
                console.log(error.errors[fieldName].properties.message);
            }
        }

        try {
            const data = await User.create({
                name: "Nazarii", 
                sex: "m",
                date: "2022-03-23 13:47:22"
            });

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