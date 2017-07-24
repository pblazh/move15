import * as _ from "underscore";

const GAME_STATE = {
	moves: 0,
	blocks: [
		{id: 1,  x: 1, y: 0, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 2,  x: 2, y: 0, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 3,  x: 3, y: 0, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 4,  x: 0, y: 1, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 5,  x: 1, y: 1, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 6,  x: 2, y: 1, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 7,  x: 3, y: 1, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 8,  x: 0, y: 2, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 9,  x: 1, y: 2, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 10, x: 2, y: 2, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 11, x: 3, y: 2, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 12, x: 0, y: 3, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 13, x: 1, y: 3, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 14, x: 2, y: 3, isActive: false, isPlaced: false, isRowPlaced: false},
		{id: 15, x: 3, y: 3, isActive: false, isPlaced: false, isRowPlaced: false},
	]
}

function shuffle(blocks){
	return _.shuffle(blocks)
		.map((block, index) => Object.assign({value: index + 1}, block));
}

function checkEmpty(blocks, block){
	return ( block.x < 0
		|| block.y < 0
		|| block.x > 3
		|| block.y > 3
		|| _.find(blocks, block))
		? []
		: [block];
}

function checkEmpties(blocks, id){
	const block = _.findWhere(blocks, {id});
	return [
		...(checkEmpty(blocks, {x: block.x - 1, y: block.y})),
		...(checkEmpty(blocks, {x: block.x + 1, y: block.y})),
		...(checkEmpty(blocks, {x: block.x, y: block.y - 1})),
		...(checkEmpty(blocks, {x: block.x, y: block.y + 1})),
	];
}

const checkRow = _.memoize(function checkRow(moves, blocks, row){
	var rowBlocks = _.chain(blocks)
		.where({y: row})
		.toArray()
		.sortBy(o => o.x)
		.pluck('value')
		.value();
	var expextedBlocks = _.range(1 + row * 4,
								 1 + row * 4 + ( row === 3 ? 3 : 4));
	return _.isEqual(rowBlocks, expextedBlocks);
}, function(moves, blocks, row){
	return 'x' + moves + 'x' + row;
});

function checkPlace(block){
	return block.value === block.y * 4 + block.x + 1;
}

function move(from, to){
	return Object.assign({}, from, to);
}

function replace(moves, blocks, id, to){
	const block = _.findWhere(blocks, {id});

	var index = _.indexOf(blocks, block);
	return checkActive(moves, [].concat(
		blocks.slice(0, index),
		[move(block, to)],
		blocks.slice(index + 1)));
}

function checkActive(moves, blocks){
	return blocks.map(block => {
		return {
			...block,
			isActive: checkEmpties(blocks, block.id).length > 0,
			isPlaced: checkPlace(block),
			isRowPlaced: checkRow(moves, blocks, block.y),
		};
	});
}

function getInitionalState(){
	const gameState = _.clone(GAME_STATE);
	gameState.blocks = checkActive(0, shuffle(gameState.blocks));
	return gameState;
}

export {
	GAME_STATE,
	move,
	replace,
	getInitionalState,
	checkEmpties,
}
