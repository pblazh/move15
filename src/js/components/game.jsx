import {connect} from 'react-redux';
import React from 'react';
import * as _ from "underscore";
import {moveAction} from '../core/actions';

const GAMEBLOCK_STYLE = {
  transition: 'all 0.3s',
  userSelect: 'none',
  backgroundColor: 'green',
  cursor: 'pointer',
  border: '1px solid black',
  backgroundColor: 'green',
  position: 'absolute',
  width: 100,
  height: 100
}

const GAMEBLOCK_INSIDE_STYLE = {
  pointerEvents: 'none',
  backgroundColor: 'green',
  position: 'absolute',
  fontSize: '50px',
  fontWeight: 'bolder',
  textAlign: 'center',
  left: 10,
  top: 10,
  lineHeight: '80px',
  width: 80,
  height: 80
}

function GameBlock(props){
	var style = Object.assign({}, GAMEBLOCK_STYLE, {
		left: props.x * GAMEBLOCK_STYLE.width || 0,
		top: props.y * GAMEBLOCK_STYLE.height|| 0,
		backgroundColor: props.isActive ? 'red' : GAMEBLOCK_STYLE.backgroundColor,
		cursor: props.isActive ? 'pointer' : 'default',
	});
	var insideStyle = Object.assign({}, GAMEBLOCK_INSIDE_STYLE, {
		backgroundColor: props.isPlaced ? 'blue' : 'yellow',
	});
	return (
		<div style={style}
			 id={props.id}
			 onClick={props.onClick}>
			<div style={insideStyle}>
				{props.value}
			</div>
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
