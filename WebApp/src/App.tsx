import React, { CSSProperties } from 'react';
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
        let gridStyle: CSSProperties = {
            display: "inline-grid",
            gridTemplateColumns: "repeat(2, 50%)",
            gridTemplateRows: "repeat(2, 50%)",
            background: "#fff",
            padding: 0,
            /*border: "3px solid #999",*/
            //float: "left",
            //lineHeight: "34px",
            //height: "34px",
            //marginRight: "-3px",
            //marginTop: "-3px",
            //width: "34px",
        }

        let btnMargin = "-2px";
        let btnBorder = "solid 1px #999";
        let btnLeftTopStyle: CSSProperties = {
            background: "#fff",
            border: "hidden",
            borderLeft: btnBorder,
            borderTop: btnBorder,
            borderRadius: "0px",
            marginLeft: btnMargin,
            marginRight: btnMargin,
            marginTop: btnMargin,
            marginBottom: btnMargin,
            padding: 0
        }
        let btnRightTopStyle: CSSProperties = {
            background: "#fff",
            border: "hidden",
            borderRight: btnBorder,
            borderTop: btnBorder,
            borderRadius: "0px",
            marginLeft: btnMargin,
            marginRight: btnMargin,
            marginTop: btnMargin,
            marginBottom: btnMargin,
            padding: 0
        }
        let btnLeftBottomStyle: CSSProperties = {
            background: "#fff",
            border: "hidden",
            borderLeft: btnBorder,
            borderBottom: btnBorder,
            borderRadius: "0px",
            marginLeft: btnMargin,
            marginRight: btnMargin,
            marginTop: btnMargin,
            marginBottom: btnMargin,
            padding: 0
        }
        let btnRightBottomStyle: CSSProperties = {
            background: "#fff",
            border: "hidden",
            borderRight: btnBorder,
            borderBottom: btnBorder,
            borderRadius: "0px",
            marginLeft: btnMargin,
            marginRight: btnMargin,
            marginTop: btnMargin,
            marginBottom: btnMargin,
            padding: 0
        }
        let btnOnClick = function () { console.log("clicked!"); }

        return (
            <div style={gridStyle}>
                <button style={btnLeftTopStyle} onClick={btnOnClick} />
                <button style={btnRightTopStyle} onClick={btnOnClick} />
                <button style={btnLeftBottomStyle} onClick={btnOnClick} />
                <button style={btnRightBottomStyle} onClick={btnOnClick} />
            </div>
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
                <div  key={index}>
                    {this.renderRow(index)}
                </div>
            );
        });
        let boardStyle: CSSProperties = {
            display: "inline-grid",
            gridTemplateColumns: "100%",
            gridTemplateRows: "repeat(" + GameData.Ny + "," + 100 / GameData.Ny + "%)",
            background: "#fff",
            padding: 0,
            width: "200px",
            height: "200px"
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div style={boardStyle} >{board}</div>
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
