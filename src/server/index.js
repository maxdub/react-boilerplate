import renderReact from './utils/renderReact';
import Express from 'express';
import { join } from 'path';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import path from 'path';
//TODO implement helmet
// import Helmet from 'react-helmet';


const app = new Express();

app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('views', join(__dirname, './views'));
app.set('view engine', '.hbs');

app.use(Express.static('public'));
app.use(cookieParser());

app.get('*', (req, res, next) => {
    //TODO figure the hell this is
    if(req.statusCode){
        return next();
    }
    renderReact(req, res, next);
});

const server = app.listen('3000', (err) => {
    if (err) {
        return console.log(err);
    }
    // console.log(server.address());
    console.log(`Listening on ${server.address().port}`);
});

