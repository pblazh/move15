import {compose} from 'underscore';
import {createStore} from 'redux';
import {moveReducer, shuffleReducer, shuffleAction} from './actions';

const gameReducer = function(state, action){
	return moveReducer(shuffleReducer(state, action), action);
};

function createGameStore(){
	const store = createStore(gameReducer);
	store.dispatch(shuffleAction());
	return store;
}

export {
	createGameStore,
}
