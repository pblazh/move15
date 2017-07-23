import React from 'react';
import ReactDom from 'react-dom';
import TopBar from './components/topbar.jsx';
import {App, Gamefield, GameBlock} from './components/app.jsx';
import Game from './components/game.jsx';
import {createGameStore} from './core/core';
import {Provider} from 'react-redux';

var gameStore = createGameStore();


ReactDom.render(
	<Provider store={gameStore}>
		<App>
			<TopBar/>
			<Gamefield>
				<Game/>
			</Gamefield>
		</App>
	</Provider>,
	document.getElementById('app')
);

module.hot.accept();
