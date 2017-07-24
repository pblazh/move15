import {connect} from 'react-redux';
import React from 'react';
import * as _ from "underscore";
import {moveAction} from '../core/actions';

const GAMEBLOCK_STYLE = {
  border: 'solid 10px silver',
  borderColor: 'lightgrey darkgrey grey silver',
  outline: 'solid 1px black',
  color: 'darkgrey',
  transition: 'all 0.3s',
  userSelect: 'none',
  backgroundColor: '#DDDDDD',
  fontSize: '50px',
  fontWeight: 'bold',
  textAlign: 'center',
  cursor: 'default',
  position: 'absolute',
  lineHeight: '80px',
  width: 100,
  height: 100
}

const GAMEBLOCK_ACTIVE_STYLE = {
  cursor: 'pointer',
  color: 'black',
  backgroundColor: 'white',
}

const GAMEBLOCK_PLACED_STYLE = {
  color: 'black',
  backgroundColor: '#EEEEEE',
}

const GAMEBLOCK_ROW_PLACED_STYLE = {
  borderColor: 'white darkgrey #333333 silver',
}

function GameBlock(props){
	var style = Object.assign({}, 
		GAMEBLOCK_STYLE,
		{
			left: props.x * GAMEBLOCK_STYLE.width || 0,
			top: props.y * GAMEBLOCK_STYLE.height|| 0,
		},
		props.isPlaced ? GAMEBLOCK_PLACED_STYLE : {},
		props.isActive ? GAMEBLOCK_ACTIVE_STYLE : {},
		props.isRowPlaced ? GAMEBLOCK_ROW_PLACED_STYLE : {});

	return (
		<div style={style}
			 id={props.id}
			 onClick={props.onClick}>
				{props.value}
		</div>
	);
}

function Game(props){
	const blocks = props.blocks.map(
		block => <GameBlock key={block.id} 
							onClick={props.move}
							{...block}/>
	)
	return (
		<div> {blocks} </div>
	);
}

const mapStateToProps = state => {
	return {
		moves: state.moves,
		blocks: state.blocks,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		move: (ev) => {
			dispatch(moveAction(parseInt(ev.target.id)));
		}
	}
}

Game = connect(mapStateToProps, mapDispatchToProps)(Game);

export default Game;
