import {GAME_STATE, getInitionalState, replace, move, checkEmpties} from './game';

const ACTION_MOVE = 'ACTION_MOVE';
const ACTION_SHUFFLE = 'ACTION_SHUFFLE';

function createAction(type){
	return function _action_(payload){
		return {
			type,
			payload,
		};
	};
};

function createReducer(type, reducer){
	return function _reducer_(state = GAME_STATE, action){
		if(action && action.type === type){
			return reducer(state, action);
		}else{
			return state;
		}
	}
}

function actionShuffle(state, action){
	return getInitionalState();
}

function actionMove(state=getInitionalState(), action){
	const hit = action.payload;
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

const shuffleReducer = createReducer(ACTION_SHUFFLE, actionShuffle);
const moveReducer = createReducer(ACTION_MOVE, actionMove);
const shuffleAction = createAction(ACTION_SHUFFLE);
const moveAction = createAction(ACTION_MOVE);

export {
	shuffleReducer,
	moveReducer,
	shuffleAction,
	moveAction,
}
