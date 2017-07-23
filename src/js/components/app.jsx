import React from 'react';

const APP_STYLE = {
  width: 400,
  outline: '1px solid red',
  backgroundColor: 'silver',
}

function App(props){
	return (
		<div style={APP_STYLE}>{props.children}</div>
	);
}

const GAMEFIELD_STYLE = {
  outline: '1px solid black',
  backgroundColor: 'grey',
  position: 'relative',
  width: 400,
  height: 400
}

function Gamefield(props){
	return (
		<div style={GAMEFIELD_STYLE}>{props.children}</div>
	);
}

export {
	App,
	Gamefield,
}
