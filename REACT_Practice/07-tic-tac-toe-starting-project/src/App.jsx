import  Player  from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYERS={
  O:"Player 2",
  X:"Player 1",
};
const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer="X";
  if(gameTurns.length > 0 && gameTurns[0].player==="X"){
     currentPlayer="O";
    }
    return currentPlayer;
}
function derivGameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])];
     
  for(const turn of gameTurns){
     const {square,player}=turn;
     const {row,col}=square;
     gameBoard[row][col]=player;
  }
   return gameBoard;

}

function derivWinner(gameBoard,players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
   const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
   const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
   const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

   if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol ){
        winner=players[firstSquareSymbol];
   }
  }
   return winner;
}
function App() {
  const[players,setplayers]=useState(PLAYERS);
  const [gameTurns, setGameTurns]=useState([]);
  
  const activePlayer=deriveActivePlayer(gameTurns);
  const gameBoard=derivGameBoard(gameTurns);
 
  const winner=derivWinner(gameBoard,players);

   const hasDraw=(gameTurns.length===9 && !winner);

   function handleSelectSquare(rowIndex,colIndex){
          setGameTurns((prevTurns)=>{
           const currentPlayer=deriveActivePlayer(prevTurns);

            const updateTurns=[ {square: {row:rowIndex, col:colIndex}, player:currentPlayer}, ...prevTurns,];
             return updateTurns;

          });
   }

   function handleRestart(){
    setGameTurns([]);
   }

   function handlePlayerNameChange(symbol,newName){
    setplayers(prevPlayers=>{
      return(
        {
          ...prevPlayers,
          [symbol]:newName,
        }
      )
    })

   }

  return (
   <menu>
    <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player initialName={PLAYERS.X} symbol="X" onChangeName={handlePlayerNameChange} isActive={activePlayer==="X" }/>
         <Player initialName={PLAYERS.O} symbol="O" onChangeName={handlePlayerNameChange} isActive={activePlayer==="O"}/>
        </ol>
        {(winner||hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} 
         board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
   </menu>
  )
}

export default App
