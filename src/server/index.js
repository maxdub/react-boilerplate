// import Glue from 'glue';
import renderReact from './utils/renderReact';
import Express from 'express';
import { join } from 'path';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import path from 'path';
// import Helmet from 'react-helmet';
// import modRewrite from 'connect-modrewrite';


const app = new Express();

app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('views', join(__dirname, './views'));
app.set('view engine', '.hbs');

app.use(Express.static('public'));
// app.use(Express.static('app'));
// app.use(Express.static('build'));

app.use(cookieParser());
// app.use('*', Express.static('public'))
app.get('*', (req, res, next) => {
    // console.log(res);
    // Express.static(path.join(__dirname, 'public'));

    if(req.statusCode){
        console.log(req.statusCode);
        return next();
    }
    renderReact(req, res, next);
}, function(req, res, next){
    // Express.static(path.join(__dirname, 'public'));
});

// Glue.compose(manifest, {
// 	relativeTo: __dirname
// }, (err, server) => {
// 	// Add a route to serve static assets
// 	server.route({
// 		method: 'GET',
// 		path: '/{param*}',
// 		handler: {
// 			directory: {
// 				path: 'public'
// 			}
// 		}
// 	});

// 	// Add dynamic router requests
// 	server.ext('onPreResponse', (request, reply) => {
// 		// Pass valid requests through
// 		if (request.response.statusCode) {
// 			return reply.continue();
// 		}

// 		// Unmatched requests fallback to react router
// 		renderReact(request, reply);
// 	});

// 	server.start(() => console.log(`Server running at: ${server.info.uri}`));
// });

const server = app.listen('3000', (err) => {
    if (err) {
        return console.log(err);
    }
    // console.log(server.address());
    console.log(`Listening on ${server.address().port}`);
});

