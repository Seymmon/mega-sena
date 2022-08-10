var state = {board: [], currentGame: [], savedGame:[]};

function start(){
    createBoard()
    newGame()
    renderButtons()
    renderSavedGames()
}

function newGame(){
    resetGame();
    render();
    console.log(state.currentGame)
}

function createBoard(){
    for (var i = 1; i <=60;i++)
    state.board.push(i)
}

function render(){
    renderBoard();
}

function renderBoard(){
    var divBoard = document.querySelector('#megaSenaBoard');
    divBoard.innerHTML = '';
    var ulNumbers = document.createElement('ul');
    ulNumbers.classList.add('numbers')
    for( var i = 0; i < state.board.length; i++ ){
        var currentNumber = state.board[i];

        var liNumber = document.createElement('li')
        liNumber.textContent = currentNumber
        liNumber.classList.add('number')
        liNumber.addEventListener('click', handleNumberList)

        if(checkNumber(currentNumber)){
            liNumber.classList.add('selectNumber')
        }
        ulNumbers.appendChild(liNumber)
    }
    divBoard.appendChild(ulNumbers)
}

function handleNumberList(event){
    var value = Number(event.currentTarget.textContent)

    if(checkNumber(value)){
        removeNumberFromGame(value);
    } else {
        addNumberToGame(value);
    }
    console.log(state.currentGame)
    render()
}

function renderButtons(){
    var divButtons = document.querySelector('#megaSenaButtons')
    divButtons.innerHTML = '';

    var buttonNewGame = createNewGameButton();
    var buttonRandomGame = createRandomGame();
    var buttonSavedGame = createSaveGame();
    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSavedGame);
}

function createNewGameButton(){
    var button = document.createElement('button');
    button.textContent = 'novo jogo'

    button.addEventListener('click', newGame)

    return button
}

function createRandomGame(){
    var button = document.createElement('button');
    button.textContent = 'Jogo aleatorio'

    button.addEventListener('click', randomGame)

    return button
}

function createSaveGame(){
    var button = document.createElement('button');
    button.textContent = 'Salvar jogo';
    

    button.addEventListener('click', saveGame)

    return button
}

function renderSavedGames(){
    var divSavedGame = document.querySelector('#megaSenaSaved');
    divSavedGame.innerHTML = ''; 
    
    if(state.savedGame.length === 0){
        divSavedGame.innerHTML = '<p>Nenhum jogo salvo<p>';
    } else {
        var ulSavedGames = document.createElement('ul')

        for(var i = 0; i <state.savedGame.length; i++){
            var currentGame = state.savedGame[i];

            var liGame = document.createElement('li');
            liGame.textContent = currentGame;

            ulSavedGames.appendChild(liGame)
        }
        divSavedGame.appendChild(ulSavedGames)
    }
}

function addNumberToGame(numberToAdd){
    if (numberToAdd < 1 || numberToAdd > 60){
        console.error('Numero invalido')
        return;
    }
    if (state.currentGame.length === 6){
        console.error('O jogo ja esta completo')
        return;
    }
    if (checkNumber(numberToAdd)){
        console.error('O numero ja esta no jogo');
        return;
    }
    state.currentGame.push(numberToAdd) 
}

function removeNumberFromGame(numberToRemove) {
    var newGame = [];

    if (numberToRemove < 1 || numberToRemove > 60){
        console.error('Numero invalido ' + numberToRemove)
        return;
    }

    for (var i = 0; i <state.currentGame.length; i++) {
        var currentGame = state.currentGame[i];
        if (currentGame === numberToRemove){
            continue;
        }
        newGame.push(currentGame)
    }
    state.currentGame = newGame;
}

function checkNumber (numberToCheck){
    //if (state.currentGame.includes(numberToCheck)){  
    //return true;
    //}
    //return false;
    return state.currentGame.includes(numberToCheck)
}

function saveGame(){
    if(!isGameComplete()){
        console.error('O jogo não esta completo')
        return;
    }
    state.savedGame.push(state.currentGame);
    newGame();
    console.log(state.savedGame)
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame(){
    state.currentGame = [];
}

function randomGame(){
    resetGame();

    while(!isGameComplete()){
        var randomNumber = Math.ceil(Math.random() * 60);
        addNumberToGame(randomNumber)
    }
    console.log(state.currentGame)
    render();
}
start()