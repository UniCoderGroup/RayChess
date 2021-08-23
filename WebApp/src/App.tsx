import React, { CSSProperties } from 'react';
import logo from './logo.svg';
import './App.css';
import * as _r from 'raychess-jscore';
import { Stage, Layer, Group, Line } from 'react-konva';
import Konva from 'konva';


let GameType = _r.TypeOfGame.Undefined;
let GameData: _r.Game = new _r.Game();/*!!!*/

let W = 30;
let H = 30;


GameData.InitBoard(6, 8);

type Color = any;
const BkgrColor = "white"
const ColorOfPlayer = new Map<_r.Player, Color>([
    [_r.Player.P1, "blue"],
    [_r.Player.P2, "red"],
    [_r.Player.None, "grey"]
]);

const StringOfPlayer = new Map<_r.Player, String>([
    [_r.Player.P1, "Player 1"],
    [_r.Player.P2, "Player 2"],
    [_r.Player.None, "<No Player>"]
]);

enum Corner {
    LeftTop,
    LeftBottom,
    RightTop,
    RightBottom
}


class BtnOld extends React.Component<{ pos: Corner, colorLR: Color, colorTB: Color, crossType: _r.TypeOfCross, colorCross: Color } & React.DOMAttributes<HTMLButtonElement>> {
    render() {
        let borderWidth = 2;
        let btnMargin = "-" + borderWidth + "px";
        let btnBorder = "solid " + borderWidth + "px ";
        let base: CSSProperties = {
            position: "absolute",
            background: BkgrColor,
            border: "hidden",
            borderRadius: "0px",
            marginLeft: btnMargin,
            marginRight: btnMargin,
            marginTop: btnMargin,
            marginBottom: btnMargin,
            padding: 0,
            width: "100%",
            height: "100%",
            /*display: "inline-table"*/
        }
        let style: CSSProperties = {};
        let _this = this;
        Object.assign(style, base,
            (() => {
                switch (_this.props.pos) {
                    case Corner.LeftTop:
                        return {
                            borderLeft: btnBorder + _this.props.colorLR,
                            borderTop: btnBorder + _this.props.colorTB
                        }
                    case Corner.LeftBottom:
                        return {
                            borderLeft: btnBorder + _this.props.colorLR,
                            borderBottom: btnBorder + _this.props.colorTB
                        }
                    case Corner.RightTop:
                        return {
                            borderRight: btnBorder + _this.props.colorLR,
                            borderTop: btnBorder + _this.props.colorTB
                        }
                    case Corner.RightBottom:
                        return {
                            borderRight: btnBorder + _this.props.colorLR,
                            borderBottom: btnBorder + _this.props.colorTB
                        }
                }
            })());



        return (
            <div style={{ position: "relative" }}>
                <button style={style} />
                <svg style={{ position: "absolute" }}>
                    <line x1="0" y1="0" x2="100%" y2="100%"
                        style={{ stroke: this.props.colorCross, strokeWidth: borderWidth, background: "transparent" }}
                    />
                </svg>
                {/*{afterElement}*/}
            </div>
        );
    }
}
class GridOld extends React.Component<{ Data: _r.Grid }> {
    constructor(props: { Data: _r.Grid; } | Readonly<{ Data: _r.Grid; }>) {
        super(props);
        this.Data = props.Data;
    }
    public Data: _r.Grid;
    render() {
        let gridStyle: CSSProperties = {
            display: "inline-grid",
            gridTemplateColumns: "repeat(2, 50%)",
            gridTemplateRows: "repeat(2, 50%)",
            background: BkgrColor,
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
        let CrossType: _r.TypeOfCross;
        let ColorCross: Color;
        switch (this.Data.Type) {
            case _r.TypeOfGrid.Home:
                let gh = this.Data as _r.GridHome;
                ColorLeft = ColorOfPlayer.get(gh.Outdir != _r.Direction.Left ? gh.Whose : gh.OutMirror.Whose);
                ColorRight = ColorOfPlayer.get(gh.Outdir != _r.Direction.Right ? gh.Whose : gh.OutMirror.Whose);
                ColorTop = ColorOfPlayer.get(gh.Outdir != _r.Direction.Top ? gh.Whose : gh.OutMirror.Whose);
                ColorBottom = ColorOfPlayer.get(gh.Outdir != _r.Direction.Bottom ? gh.Whose : gh.OutMirror.Whose);
                CrossType = _r.TypeOfCross.None;
                ColorCross = ColorOfPlayer.get(_r.Player.None);
                break;
            case _r.TypeOfGrid.Normal:
                let gn = this.Data as _r.GridNormal;
                ColorLeft = ColorOfPlayer.get(gn.Mirror.Left.Whose);
                ColorRight = ColorOfPlayer.get(gn.Mirror.Right.Whose);
                ColorTop = ColorOfPlayer.get(gn.Mirror.Top.Whose);
                ColorBottom = ColorOfPlayer.get(gn.Mirror.Bottom.Whose);
                CrossType = gn.Mirror.Cross.Type;
                ColorCross = ColorOfPlayer.get(gn.Mirror.Cross.Whose);
                break;
        }
        let btnOnClick = function (e: React.MouseEvent<HTMLButtonElement>) {
            console.log("clicked!");
        }

        return (
            <div style={gridStyle}>
                <BtnOld pos={Corner.LeftTop}
                    colorLR={ColorLeft}
                    colorTB={ColorTop}
                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.Slash : _r.TypeOfCross.None}
                    colorCross={ColorCross}
                    onClick={btnOnClick} />
                <BtnOld pos={Corner.RightTop}
                    colorLR={ColorRight}
                    colorTB={ColorTop}
                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.BackSlash : _r.TypeOfCross.None}
                    colorCross={ColorCross}
                    onClick={btnOnClick} />
                <BtnOld pos={Corner.LeftBottom}
                    colorLR={ColorLeft}
                    colorTB={ColorBottom}
                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.Slash : _r.TypeOfCross.None}
                    colorCross={ColorCross}
                    onClick={btnOnClick} />
                <BtnOld pos={Corner.RightBottom}
                    colorLR={ColorRight}
                    colorTB={ColorBottom}
                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.BackSlash : _r.TypeOfCross.None}
                    colorCross={ColorCross}
                    onClick={btnOnClick} />
            </div>
        );
    }
}
class BoardOld extends React.Component {
    renderGrid(grid: _r.Grid, key: React.Key) {
        return <GridOld key={key} Data={grid} />;
    }
    renderRow(y: number): JSX.Element[] {
        return GameData.Board.Data[y].map((value, index) => {
            return this.renderGrid(value, y * GameData.Nx + index);
        });
    }
    render() {
        let status = <span>Next player:<span style={{ color: ColorOfPlayer.get(_r.Player.P1) }}>{StringOfPlayer.get(_r.Player.P1)}</span></span>;

        let board: JSX.Element[] = [];
        GameData.Board.Data.forEach((value, index) => {
            board = board.concat(this.renderRow(index));
        });

        let boardStyle: CSSProperties = {
            display: "inline-grid",
            gridTemplateColumns: "repeat(" + GameData.Nx + "," + 100 / GameData.Nx + "%)",
            gridTemplateRows: "repeat(" + GameData.Ny + "," + 100 / GameData.Ny + "%)",
            background: BkgrColor,
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

class Grid extends React.Component<{ Data: _r.Grid, x: number, y: number }, { w: number, h: number }> {
    constructor(props: { Data: _r.Grid; x: number; y: number; } | Readonly<{ Data: _r.Grid; x: number; y: number; }>) {
        super(props);
        this.Data = props.Data;
        this.state = {
            w: W,
            h: H
        };
    }
    public Data: _r.Grid;
    render() {
        let ColorLeft: any;
        let ColorRight: any;
        let ColorTop: any;
        let ColorBottom: any;
        let CrossType: _r.TypeOfCross;
        let ColorCross: Color;
        switch (this.Data.Type) {
            case _r.TypeOfGrid.Home:
                let gh = this.Data as _r.GridHome;
                ColorLeft = ColorOfPlayer.get(gh.Outdir != _r.Direction.Left ? gh.Whose : gh.OutMirror.Whose);
                ColorRight = ColorOfPlayer.get(gh.Outdir != _r.Direction.Right ? gh.Whose : gh.OutMirror.Whose);
                ColorTop = ColorOfPlayer.get(gh.Outdir != _r.Direction.Top ? gh.Whose : gh.OutMirror.Whose);
                ColorBottom = ColorOfPlayer.get(gh.Outdir != _r.Direction.Bottom ? gh.Whose : gh.OutMirror.Whose);
                CrossType = _r.TypeOfCross.None;
                ColorCross = ColorOfPlayer.get(_r.Player.None);
                break;
            case _r.TypeOfGrid.Normal:
                let gn = this.Data as _r.GridNormal;
                ColorLeft = ColorOfPlayer.get(gn.Mirror.Left.Whose);
                ColorRight = ColorOfPlayer.get(gn.Mirror.Right.Whose);
                ColorTop = ColorOfPlayer.get(gn.Mirror.Top.Whose);
                ColorBottom = ColorOfPlayer.get(gn.Mirror.Bottom.Whose);
                CrossType = gn.Mirror.Cross.Type;
                ColorCross = ColorOfPlayer.get(gn.Mirror.Cross.Whose);
                break;
        }
        console.log(ColorTop);
        let w = this.state.w;
        let h = this.state.h;
        let l = 0;
        let t = 0;
        let r = l + w;
        let b = t + h;
        let strokeWidth = 3
        return (
            <Group
                x={this.props.x}
                y={this.props.y}>
                <Line
                    x={l}
                    y={t}
                    points={[0, 0, 0, h]}
                    stroke={ColorLeft}
                    strokeWidth={strokeWidth} />
                <Line
                    x={r}
                    y={t}
                    points={[0, 0, 0, h]}
                    stroke={ColorRight}
                    strokeWidth={strokeWidth} />
                <Line
                    x={l}
                    y={t}
                    points={[0, 0, w, 0]}
                    stroke={ColorTop}
                    strokeWidth={strokeWidth} />
                <Line
                    x={l}
                    y={b}
                    points={[0, 0, w, 0]}
                    stroke={ColorBottom}
                    strokeWidth={strokeWidth} />
                {
                    CrossType == _r.TypeOfCross.None ?
                        (<div style={{ display: "hidden" }} />)
                        :
                        (CrossType == _r.TypeOfCross.Slash ?
                                (<Line
                                    x={r}
                                    y={t}
                                    points={[0, 0, -w, h]}
                                    stroke={ColorCross}
                                    strokeWidth={strokeWidth}
                                />)
                                :
                                (<Line
                                    x={l}
                                    y={t}
                                    points={[0, 0, w, h]}
                                    stroke={ColorCross}
                                    strokeWidth={strokeWidth}
                                />)
                        )
                }
            </Group>
        )
    }
}

class Board extends React.Component {
    renderGrid(grid: _r.Grid, y: number, x: number) {
        return <Grid
            key={y * GameData.Nx + x}
            Data={grid}
            x={x * W}
            y={y * H} />;
    }
    renderRow(y: number): JSX.Element[] {
        return GameData.Board.Data[y].map((value, index) => {
            return this.renderGrid(value, y, index);
        });
    }
    render() {

        let board: JSX.Element[] = [];
        GameData.Board.Data.forEach((value, index) => {
            board = board.concat(this.renderRow(index));
        });

        console.log(board);
        return (
            <Stage width={1000} height={1000}>
                <Layer>
                    {board}
                </Layer>
            </Stage>
        );
    }
}

class Game extends React.Component<{}, { Data: _r.Game }> {
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
                    <div className="next-player"></div>
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

setTimeout(() => { }, 1000);
let g = GameData;
g.AddHome(1, 1, _r.Player.P1);
g.SetHomeDirection(1, 1, _r.Direction.Top);
g.AddMirror(2, 1, _r.TypeOfMirror.BackSlash, _r.Player.P1);
g.AddHome(2, 2, _r.Player.P2);
g.SetHomeDirection(2, 2, _r.Direction.Top);
console.log(g.WhoWins());


export default App;
