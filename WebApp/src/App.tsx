import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as r from 'raychess-jscore';
import { createJsxElement } from 'typescript';

let GameType = r.TypeOfGame.Undefined;
let GameData: r.Game = new r.Game();/*!!!*/

GameData.InitBoard(6, 8);

const ColorOfPlayer = new Map<r.Player, any>([
    [r.Player.P1, "blue"],
    [r.Player.P2, "red"],
    [r.Player.None, "black"]
]);

const StringOfPlayer = new Map<r.Player, String>([
    [r.Player.P1, "Player 1"],
    [r.Player.P2, "Player 2"],
    [r.Player.None, "<No Player>"]
]);

class Grid extends React.Component {
    render() {
        return (
            <button className="game-grid">
            </button>
        );
    }
}

class Board extends React.Component {
    renderGrid(grid: r.Grid) {
        return <Grid />;
    }
    renderRow(y: number): JSX.Element[] {
        return GameData.Board.Data[y].map((value, index) => {
            return this.renderGrid(value);
        });
    }
    render() {
        let status = <span>Next player:<span style={{ color: ColorOfPlayer.get(r.Player.P1) }}>{StringOfPlayer.get(r.Player.P1)}</span></span>;
        let board = GameData.Board.Data.map((value, index) => {
            return (
                <div className="game-row" key={index}>
                    {this.renderRow(index)}
                </div>
            );
        });

        return (
            <div>
                <div className="status">{status}</div>
                <div className="game-board" >{board}</div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Board />
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
