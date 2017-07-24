import {compose} from 'underscore';
import {createStore} from 'redux';
import {gameReducer, shuffleAction} from './actions';

function createGameStore(){
	const store = createStore(gameReducer);
	store.dispatch(shuffleAction());
	return store;
}

export {
	createGameStore,
}
