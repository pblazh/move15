import React from 'react';
import {shuffleAction} from '../core/actions';
import {connect} from 'react-redux';

const TITLE_STYLE = {
	textAlign: 'center',
    fontSize: '30px',
    margin: 0,
}

function Title(props){
	return (
		<h3 style={TITLE_STYLE}>{props.children}</h3>
	);
}

const SHUFFLE_STYLE = {
	textAlign: 'center',
	backgroundColor: 'grey',
	border: 'none',
	fontSize: '23px',
	width: '94px',
	padding: 0,
	height: '50px',
	fontWeight: 'bold',
	color: 'white',
}

function Shuffle(props){
	return (
		<button style={SHUFFLE_STYLE} onClick={props.onClick}>
			Shuffle
		</button>
	);
}

function TopBar(props){
	return(
		<table style={{width: '100%', align: 'center'}}>
		<tbody>
		<tr>
			<td style={{width: '100%'}}>
				<Title>Moved {props.moves}</Title>
			</td>
			<td>
				<Shuffle onClick={props.shuffle}/>
			</td>
		</tr>
		</tbody>
		</table>
	);
}

const mapStateToProps = state => {
	return {
		moves: state.moves
	}
}

const mapDispatchToProps = dispatch => {
	return {
		shuffle: () => {
			dispatch(shuffleAction());
		}
	}
}

TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default TopBar;
