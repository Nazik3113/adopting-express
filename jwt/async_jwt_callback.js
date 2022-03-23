import jwt from "jsonwebtoken";

const pass = "pa$$word";

const options = { algorithm: "HS512", expiresIn: "2s", issuer: "Nazarii Spikhalskyi", audience: "http://localhost:3000" };

jwt.sign({name: "John"}, pass, options, (error, token) => { // async method
    if (error) {
        return console.log(error.message);
    }

    jwt.verify(token, pass, (error, json) => {
        if (error) {
            return console.log(error.message);
        }

        console.log(token);
        console.log(json);
    });

    setTimeout(() => {
        try {
            jwt.verify(token, pass, (error, json) => {
                if (error) throw error;
 
                console.log(token);
                console.log(json);
            });
        } catch (error) {
            console.log(error.message);
        }
    }, 3000);
}); 

