import {GAME_STATE, getInitionalState, replace, move, checkEmpties} from './game';
import {createActions, handleActions} from 'redux-actions';

function actionMove(state, action){
	const hit = action.payload.id;
	const empty = checkEmpties(state.blocks, hit).pop();
	if(empty){
		return {
			moves: state.moves + 1,
			blocks: replace(state.moves + 1, state.blocks, hit, move(hit, empty)),
		};
	}else{
		return state;
	}
}

const MOVE_ACTION = 'MOVE_ACTION';
const SHUFFLE_ACTION = 'SHUFFLE_ACTION';

const {moveAction, shuffleAction} = createActions({
	MOVE_ACTION: id => ({id}),
	SHUFFLE_ACTION: () => ({}),
});

const gameReducer = handleActions({
	MOVE_ACTION: actionMove,
	SHUFFLE_ACTION: (state, action) => getInitionalState(),
}, GAME_STATE);

export {
	gameReducer,
	shuffleAction,
	moveAction,
}
