import React, { CSSProperties } from 'react';
import logo from './logo.svg';
import './App.css';
import * as r from 'raychess-jscore';
import { createJsxElement } from 'typescript';

let GameType = r.TypeOfGame.Undefined;
let GameData: r.Game = new r.Game();/*!!!*/

GameData.InitBoard(6, 8);

type Color = any;
const ColorOfPlayer = new Map<r.Player, Color>([
    [r.Player.P1, "blue"],
    [r.Player.P2, "red"],
    [r.Player.None, "grey"]
]);

const StringOfPlayer = new Map<r.Player, String>([
    [r.Player.P1, "Player 1"],
    [r.Player.P2, "Player 2"],
    [r.Player.None, "<No Player>"]
]);

enum Corner {
    LeftTop,
    LeftBottom,
    RightTop,
    RightBottom
}


class Btn extends React.Component<{ pos: Corner,colorLR:Color,colorTB:Color }> {
    render() {
        let btnMargin = "-2px";
        let btnBorder = "solid 2px ";
        let s: CSSProperties = {
            background: "#fff",
            border: "hidden",
            //https://www.cnblogs.com/newsea/p/3781110.html
            borderRigh#t: btnBorder + this.props.colorLR,
            borderTo#p: btnBorder + this.props.colorTB,
            borderRadius: "0px",
            marginLeft: btnMargin,
            marginRight: btnMargin,
            marginTop: btnMargin,
            marginBottom: btnMargin,
            padding: 0
        }
        return <div><button/></div>
    }
}

class Grid extends React.Component<{Data:r.Grid}> {
    constructor(props: { Data: r.Grid; } | Readonly<{ Data: r.Grid; }>) {
        super(props);
        this.Data = props.Data;
    }
    public Data: r.Grid;
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

        let ColorLeft: any;
        let ColorRight: any;
        let ColorTop: any;
        let ColorBottom: any;
        switch (this.Data.Type) {
            case r.TypeOfGrid.Home:
                let gh = this.Data as r.GridHome;
                ColorLeft = ColorOfPlayer.get(gh.Outdir != r.Direction.Left ? gh.Whose : gh.OutMirror.Whose);
                ColorRight = ColorOfPlayer.get(gh.Outdir != r.Direction.Right ? gh.Whose : gh.OutMirror.Whose);
                ColorTop = ColorOfPlayer.get(gh.Outdir != r.Direction.Top ? gh.Whose : gh.OutMirror.Whose);
                ColorBottom = ColorOfPlayer.get(gh.Outdir != r.Direction.Bottom ? gh.Whose : gh.OutMirror.Whose);
                break;
            case r.TypeOfGrid.Normal:
                let gn = this.Data as r.GridNormal;
                ColorLeft = ColorOfPlayer.get(gn.Mirror.Left.Whose);
                ColorRight = ColorOfPlayer.get(gn.Mirror.Right.Whose);
                ColorTop = ColorOfPlayer.get(gn.Mirror.Top.Whose);
                ColorBottom = ColorOfPlayer.get(gn.Mirror.Bottom.Whose);
                
        }
        

        
        let btnLeftTopStyle: CSSProperties = {
            background: "#fff",
            border: "hidden",
            borderLeft: btnBorder+ColorLeft,
            borderTop: btnBorder + ColorTop,
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
            borderRight: btnBorder + ColorRight,
            borderTop: btnBorder + ColorTop,
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
            borderLeft: btnBorder + ColorLeft,
            borderBottom: btnBorder + ColorBottom,
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
            borderRight: btnBorder + ColorRight,
            borderBottom: btnBorder + ColorBottom,
            borderRadius: "0px",
            marginLeft: btnMargin,
            marginRight: btnMargin,
            marginTop: btnMargin,
            marginBottom: btnMargin,
            padding: 0
        }
        let btnOnClick = function (e: React.MouseEvent<HTMLButtonElement>) {
            console.log("clicked!");
        }

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
        return <Grid Data={grid}/>;
    }
    renderRow(y: number): JSX.Element[] {
        return GameData.Board.Data[y].map((value, index) => {
            return this.renderGrid(value);
        });
    }
    render() {
        let status = <span>Next player:<span style={{ color: ColorOfPlayer.get(r.Player.P1) }}>{StringOfPlayer.get(r.Player.P1)}</span></span>;

        let board: JSX.Element[] = [];
        GameData.Board.Data.forEach((value, index) => {
            board = board.concat(this.renderRow(index));
        });

        let boardStyle: CSSProperties = {
            display: "inline-grid",
            gridTemplateColumns: "repeat(" + GameData.Nx + "," + 100 / GameData.Nx + "%)",
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

class Game extends React.Component<{}, { Data: r.Game }> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        GameData.OnChange = () => {
            this.setState({
                Data: GameData
            })
        };
        GameData.OnChange();
    }

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

setTimeout(() => {}, 1000);
let g = GameData;
g.AddHome(1, 1, r.Player.P1);
g.SetHomeDirection(1, 1, r.Direction.Top);
g.AddMirror(2, 1, r.TypeOfMirror.BackSlash, r.Player.P1);
g.AddHome(2, 2, r.Player.P2);
g.SetHomeDirection(2, 2, r.Direction.Top);
console.log(g.WhoWins());


export default App;
