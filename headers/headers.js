import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.get('/agent', (req, res) => { 
    // get headers
    const { 'user-agent': userAgentDestructurised } = req.headers;
    
    const userAgentFromArr = req.headers['user-agent'];

    const userAgentCapitalize = req.header('User-Agent');
    const userAgentLowerCase = req.header('user-agent');

    // some server stuff
    const content = JSON.stringify({
        user_agent: `${userAgentCapitalize} - ${userAgentLowerCase}`,
        userAgentDestructurised: userAgentDestructurised,
        userAgentFromArr: userAgentFromArr 
    });
    const contentLength = Buffer.byteLength(content);  

    // set headers
    res.header('Content-Type', 'application/json');
    // res.type('json') 
    // res.type('application/json') 
    res.header({
        'X-SOME-CUSTOM': true,
        'Content-Length': contentLength
    });

    res.end(content);
});

app.get('/redirect/:url', (req, res) => {
    res.set('Location', `https://${req.params.url}`);
    res.sendStatus(301);

    // res.redirect(301, `https://${req.params.url}`);
});

app.listen(port);