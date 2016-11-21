import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from 'routes';
import rootSaga from 'sagas';
import configureStore from 'store';

export default function(req, res, next) {
	const store = configureStore();

	match({routes, location: req.url}, (error, redirect, props) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirect) {
			res.redirect(302, redirect.pathname + redirect.search);
		} else if (props) {
			const rootComponent = (
				<Provider store={store}>
					<RouterContext {...props} />
				</Provider>
			);

			store.runSaga(rootSaga).done.then(() => {
				const state = store.getState();
                const html = renderToString(rootComponent);

                res.render('index', {
                    html,
                    preloadedState: JSON.stringify(state)
                });
            });

			// Trigger sagas for component to run
			// https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
			renderToString(rootComponent);

			// Dispatch a close event so sagas stop listening after they're resolved
			store.close();
		} else {
            res.status(404).send('Not Found');
		}
	});
}
