import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as r from 'raychess-jscore';
import { createJsxElement } from 'typescript';

let GameType = r.TypeOfGame.Undefined;
let GameData : r.Game = new r.Game;/*!!!*/

let me: r.Player ;

const ColorOfPlayer = new Map<r.Player, any>([
    [r.Player.P1, "blue"],
    [r.Player.P2, "red"],
    [r.Player.None,"black"]
]);

const StringOfPlayer = new Map<r.Player, String>([
    [r.Player.P1, "Player 1"],
    [r.Player.P2, "Player 2"],
    [r.Player.None, "<No Player>"]
]);

class Grid extends React.Component {
    render() {
        return (
            <button className="grid">
            </button>
        );
    }
}

class Board extends React.Component {
    renderGrid(x:number,y:number) {
        return <Grid />;
    }
    renderRow(y: number): JSX.Element{
        let arr = new Array<JSX.Element>();
        for (let x = 0; x < GameData.Nx; x++) {
            arr.push(this.renderGrid(x, y));
        }
        return/* <div className="board-row" >*/{arr}/*</div>*/;
    }
    render() {
        const status = <span>Next player:<span style={{ color: ColorOfPlayer.get(r.Player.P1) }}>{ StringOfPlayer.get(r.Player.P1)}</span></span>;

        let rows = new Array<JSX.Element>();
        for (let y = 0; y < GameData.Ny; y++) {
            rows.push(this.renderRow(y));
        }
        let board = <div className="board" >{rows}</div>;

        return (
            <div>
                <div className="status">{status}</div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function App() {
    return (
        <Game />
    );
}

export default App;
