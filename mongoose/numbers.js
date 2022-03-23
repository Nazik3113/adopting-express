import connection from "./connection.js";
import {User} from "./models.js"; 

connection
    .then(async (conn) => {

        let upd_id = null;
        
        try {
            const data = await User.create({
                name: "Nazarii", 
                sex: "m",
                number: 0.1,
                decimal128: 0.1
            });

            upd_id = data._id;
            
            console.log(data);
        } catch (error) {
            for (let fieldName in error.errors) {
                console.log(error.errors[fieldName].properties.message);
            }
        }

        try {
            const updatedData = await User.findByIdAndUpdate(
                upd_id,
                { $inc: { number: 0.2, decimal128: 0.2 } },
                {new: true}
            );

            console.log(updatedData);
            console.log(updatedData.number.toString() === "0.3");
            console.log(updatedData.decimal128.toString() === "0.3");
        } catch (error) {
            for (let fieldName in error.errors) {
                console.log(error.errors[fieldName].properties.message);
            }
        }
    })
    .catch((error) => {
        console.log(error);
    });