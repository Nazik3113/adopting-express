import connection from "./connection.js";
import {User} from "./models.js"; 

connection
    .then(async (conn) => {
        const user = new User({});
        
        const user1 = new User({name: "Nazarii", sex: "m"});

        user.save()
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                for (let fieldName in error.errors) {
                    console.log(error.errors[fieldName].properties.message);
                }
            });

        user1.save()
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });    

        const user2 = new User();
        const user3 = new User({name: "Inna", sex: "f"});

        try {
            const data = await user2.save();

            console.log(data);
        } catch (error) {
            for (let fieldName in error.errors) {
                console.log(error.errors[fieldName].properties.message);
            }
        }

        try {
            const data = await user3.save();

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