import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation, } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import * as _r from 'raychess-jscore';
import { Stage, Layer, Group, Line, Rect } from 'react-konva';
import Konva from 'konva';
import DocumentTitle from 'react-document-title';


type Color = string | undefined;

const ColorOfPlayer = new Map<_r.Player, Color>([
    [_r.Player.P1, "blue"],
    [_r.Player.P2, "red"],
    [_r.Player.None, "transparent"]
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


//class BtnOld extends React.Component<{ pos: Corner, colorLR: Color, colorTB: Color, crossType: _r.TypeOfCross, colorCross: Color } & React.DOMAttributes<HTMLButtonElement>> {
//    render() {
//        let borderWidth = 2;
//        let btnMargin = "-" + borderWidth + "px";
//        let btnBorder = "solid " + borderWidth + "px ";
//        let base: CSSProperties = {
//            position: "absolute",
//            background: BkgrColor,
//            border: "hidden",
//            borderRadius: "0px",
//            marginLeft: btnMargin,
//            marginRight: btnMargin,
//            marginTop: btnMargin,
//            marginBottom: btnMargin,
//            padding: 0,
//            width: "100%",
//            height: "100%",
//            /*display: "inline-table"*/
//        }
//        let style: CSSProperties = {};
//        let _this = this;
//        Object.assign(style, base,
//            (() => {
//                switch (_this.props.pos) {
//                    case Corner.LeftTop:
//                        return {
//                            borderLeft: btnBorder + _this.props.colorLR,
//                            borderTop: btnBorder + _this.props.colorTB
//                        }
//                    case Corner.LeftBottom:
//                        return {
//                            borderLeft: btnBorder + _this.props.colorLR,
//                            borderBottom: btnBorder + _this.props.colorTB
//                        }
//                    case Corner.RightTop:
//                        return {
//                            borderRight: btnBorder + _this.props.colorLR,
//                            borderTop: btnBorder + _this.props.colorTB
//                        }
//                    case Corner.RightBottom:
//                        return {
//                            borderRight: btnBorder + _this.props.colorLR,
//                            borderBottom: btnBorder + _this.props.colorTB
//                        }
//                }
//            })());



//        return (
//            <div style={{ position: "relative" }}>
//                <button style={style} />
//                <svg style={{ position: "absolute" }}>
//                    <line x1="0" y1="0" x2="100%" y2="100%"
//                        style={{ stroke: this.props.colorCross, strokeWidth: borderWidth, background: "transparent" }}
//                    />
//                </svg>
//                {/*{afterElement}*/}
//            </div>
//        );
//    }
//}
//class GridOld extends React.Component<{ data: _r.Grid }> {
//    constructor(props: { data: _r.Grid; } | Readonly<{ data: _r.Grid; }>) {
//        super(props);
//        this.data = props.data;
//    }
//    public data: _r.Grid;
//    render() {
//        let gridStyle: CSSProperties = {
//            display: "inline-grid",
//            gridTemplateColumns: "repeat(2, 50%)",
//            gridTemplateRows: "repeat(2, 50%)",
//            background: BkgrColor,
//            padding: 0,
//            /*border: "3px solid #999",*/
//            //float: "left",
//            //lineHeight: "34px",
//            //height: "34px",
//            //marginRight: "-3px",
//            //marginTop: "-3px",
//            //width: "34px",
//        }

//        let ColorLeft: any;
//        let ColorRight: any;
//        let ColorTop: any;
//        let ColorBottom: any;
//        let CrossType: _r.TypeOfCross;
//        let ColorCross: Color;
//        switch (this.data.Type) {
//            case _r.TypeOfGrid.Home:
//                let gh = this.data as _r.GridHome;
//                ColorLeft = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Left ? gh.Whose : gh.OutMirror.Whose);
//                ColorRight = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Right ? gh.Whose : gh.OutMirror.Whose);
//                ColorTop = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Top ? gh.Whose : gh.OutMirror.Whose);
//                ColorBottom = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Bottom ? gh.Whose : gh.OutMirror.Whose);
//                CrossType = _r.TypeOfCross.None;
//                ColorCross = ColorOfPlayer.get(_r.Player.None);
//                break;
//            case _r.TypeOfGrid.Normal:
//                let gn = this.data as _r.GridNormal;
//                ColorLeft = ColorOfPlayer.get(gn.Mirror.Left.Whose);
//                ColorRight = ColorOfPlayer.get(gn.Mirror.Right.Whose);
//                ColorTop = ColorOfPlayer.get(gn.Mirror.Top.Whose);
//                ColorBottom = ColorOfPlayer.get(gn.Mirror.Bottom.Whose);
//                CrossType = gn.Mirror.Cross.Type;
//                ColorCross = ColorOfPlayer.get(gn.Mirror.Cross.Whose);
//                break;
//        }
//        let btnOnClick = function (e: React.MouseEvent<HTMLButtonElement>) {
//            console.log("clicked!");
//        }

//        return (
//            <div style={gridStyle}>
//                <BtnOld pos={Corner.LeftTop}
//                    colorLR={ColorLeft}
//                    colorTB={ColorTop}
//                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.Slash : _r.TypeOfCross.None}
//                    colorCross={ColorCross}
//                    onClick={btnOnClick} />
//                <BtnOld pos={Corner.RightTop}
//                    colorLR={ColorRight}
//                    colorTB={ColorTop}
//                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.BackSlash : _r.TypeOfCross.None}
//                    colorCross={ColorCross}
//                    onClick={btnOnClick} />
//                <BtnOld pos={Corner.LeftBottom}
//                    colorLR={ColorLeft}
//                    colorTB={ColorBottom}
//                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.Slash : _r.TypeOfCross.None}
//                    colorCross={ColorCross}
//                    onClick={btnOnClick} />
//                <BtnOld pos={Corner.RightBottom}
//                    colorLR={ColorRight}
//                    colorTB={ColorBottom}
//                    crossType={CrossType == _r.TypeOfCross.Slash ? _r.TypeOfCross.BackSlash : _r.TypeOfCross.None}
//                    colorCross={ColorCross}
//                    onClick={btnOnClick} />
//            </div>
//        );
//    }
//}
//class BoardOld extends React.Component {
//    renderGrid(grid: _r.Grid, key: React.Key) {
//        return <GridOld key={key} data={grid} />;
//    }
//    renderRow(y: number): JSX.Element[] {
//        return GameData.Board.Data[y].map((value, index) => {
//            return this.renderGrid(value, y * GameData.Nx + index);
//        });
//    }
//    render() {
//        let status = <span>Next player:<span style={{ color: ColorOfPlayer.get(_r.Player.P1) }}>{StringOfPlayer.get(_r.Player.P1)}</span></span>;

//        let board: JSX.Element[] = [];
//        GameData.Board.Data.forEach((value, index) => {
//            board = board.concat(this.renderRow(index));
//        });

//        let boardStyle: CSSProperties = {
//            display: "inline-grid",
//            gridTemplateColumns: "repeat(" + GameData.Nx + "," + 100 / GameData.Nx + "%)",
//            gridTemplateRows: "repeat(" + GameData.Ny + "," + 100 / GameData.Ny + "%)",
//            background: BkgrColor,
//            padding: 0,
//            width: "200px",
//            height: "200px"
//        }

//        return (
//            <>
//                <div className="status">{status}</div>
//                <div style={boardStyle} >{board}</div>
//            </>
//        );
//    }
//}


class App extends React.Component {
    render() {
        return (
            <DocumentTitle title="RayChess">
                <>
                    <nav>
                        Ray Chess
                    </nav>
                    <div>
                        {this.props.children}
                    </div>
                </>
            </DocumentTitle>);
    }
}


class GridStyle {
    constructor(Width: number, Height: number, MirrorWidth: number) {
        this.width = Width;
        this.height = Height;
        this.mirrorWidth = MirrorWidth;
    }
    width: number;
    height: number;
    mirrorWidth: number;
}
class Grid extends React.Component<{ data: _r.Grid, x: number, y: number, style: GridStyle }, { w: number, h: number }> {
    constructor(props: { data: _r.Grid, x: number, y: number, style: GridStyle } | Readonly<{ data: _r.Grid, x: number, y: number, style: GridStyle }>) {
        super(props);
        this.state = {
            w: this.props.style.width,
            h: this.props.style.height
        };
    }
    click(evt: Konva.KonvaEventObject<globalThis.MouseEvent>): void {
        let x = evt.evt.clientX - evt.currentTarget.x();
        let y = evt.evt.clientY - evt.currentTarget.y();
        console.log(x, y);
    }
    render() {
        let data = this.props.data;
        let ColorLeft: any;
        let ColorRight: any;
        let ColorTop: any;
        let ColorBottom: any;
        let CrossType: _r.TypeOfCross;
        let ColorCross: Color;
        switch (data.Type) {
            case _r.TypeOfGrid.Home:
                let gh = data as _r.GridHome;
                ColorLeft = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Left ? gh.Whose : gh.OutMirror.Whose);
                ColorRight = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Right ? gh.Whose : gh.OutMirror.Whose);
                ColorTop = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Top ? gh.Whose : gh.OutMirror.Whose);
                ColorBottom = ColorOfPlayer.get(gh.Outdir !== _r.Direction.Bottom ? gh.Whose : gh.OutMirror.Whose);
                CrossType = _r.TypeOfCross.None;
                ColorCross = ColorOfPlayer.get(_r.Player.None);
                break;
            case _r.TypeOfGrid.Normal:
                let gn = data as _r.GridNormal;
                ColorLeft = ColorOfPlayer.get(gn.Mirror.Left.Whose);
                ColorRight = ColorOfPlayer.get(gn.Mirror.Right.Whose);
                ColorTop = ColorOfPlayer.get(gn.Mirror.Top.Whose);
                ColorBottom = ColorOfPlayer.get(gn.Mirror.Bottom.Whose);
                CrossType = gn.Mirror.Cross.Type;
                ColorCross = ColorOfPlayer.get(gn.Mirror.Cross.Whose);
                break;
        }
        let w = this.state.w;
        let h = this.state.h;
        let l = 0;
        let t = 0;
        let r = l + w;
        let b = t + h;
        return (
            <Group
                x={this.props.x}
                y={this.props.y}
                onClick={this.click}>
                <Line
                    x={l}
                    y={t}
                    points={[0, 0, 0, h]}
                    stroke={ColorLeft}
                    strokeWidth={this.props.style.mirrorWidth} />
                <Line
                    x={r}
                    y={t}
                    points={[0, 0, 0, h]}
                    stroke={ColorRight}
                    strokeWidth={this.props.style.mirrorWidth} />
                <Line
                    x={l}
                    y={t}
                    points={[0, 0, w, 0]}
                    stroke={ColorTop}
                    strokeWidth={this.props.style.mirrorWidth} />
                <Line
                    x={l}
                    y={b}
                    points={[0, 0, w, 0]}
                    stroke={ColorBottom}
                    strokeWidth={this.props.style.mirrorWidth} />
                {
                    CrossType === _r.TypeOfCross.None ?
                        (<></>)
                        :
                        (CrossType === _r.TypeOfCross.Slash ?
                            (<Line
                                x={r}
                                y={t}
                                points={[0, 0, -w, h]}
                                stroke={ColorCross}
                                strokeWidth={this.props.style.mirrorWidth}
                            />)
                            :
                            (<Line
                                x={l}
                                y={t}
                                points={[0, 0, w, h]}
                                stroke={ColorCross}
                                strokeWidth={this.props.style.mirrorWidth}
                            />)
                        )
                }
            </Group>
        )
    }
}
class PointStyle {
    constructor(Size: number, Color: Color) {
        this.size = Size;
        this.color = Color;
    }
    size: number;
    color: Color;
}
class Point extends React.Component<{ x: number, y: number, style: PointStyle }> {
    click(evt: Konva.KonvaEventObject<globalThis.MouseEvent>): void {
        let x = evt.evt.clientX - evt.currentTarget.x();
        let y = evt.evt.clientY - evt.currentTarget.y();
        console.log(x, y);
    }
    render() {
        return (
            <Rect
                x={this.props.x}
                y={this.props.y}
                onClick={this.click}
                width={this.props.style.size}
                height={this.props.style.size}
                offsetX={this.props.style.size / 2}
                offsetY={this.props.style.size / 2}
                fill={this.props.style.color} />
        );
    }
}
class BoardStyle {
    constructor() {
        this.grid = new GridStyle(30, 30, 3);
        this.point = new PointStyle(4,"grey");
    }
    grid: GridStyle;
    point: PointStyle;
}
class Board extends React.Component<{ data: _r.Board, style: BoardStyle }>{
    renderMirrorOne(grid: _r.Grid, y: number, x: number) {
        return (<Grid
            key={"Grid" + y * this.props.data.Nx + x}
            data={grid}
            x={x * this.props.style.grid.width}
            y={y * this.props.style.grid.height}
            style={this.props.style.grid} />);
    }
    renderMirrorRow(y: number): JSX.Element[] {
        return this.props.data.Data[y].map((value, x) => {
            return this.renderMirrorOne(value, y, x);
        });
    }
    renderMirrors(): JSX.Element[] {
        let mirrors: JSX.Element[] = [];
        this.props.data.Data.forEach((value, y) => {
            mirrors = mirrors.concat(this.renderMirrorRow(y));
        });
        return mirrors;
    }
    renderPointOne(x: number, y: number) {
        return (<Point
            key={"Point" + y * this.props.data.Nx + x}
            x={x * this.props.style.grid.width}
            y={y * this.props.style.grid.height}
            style={this.props.style.point} />);
    }
    renderPointRow(y: number): JSX.Element[] {
        let points: JSX.Element[] = [];
        for (let x = 0; x <= this.props.data.Nx; x++) {
            points = points.concat(this.renderPointOne(x, y));
        }
        return points;
    }
    renderPoints(): JSX.Element[] {
        let points: JSX.Element[] = [];
        for (let y = 0; y <= this.props.data.Ny; y++) {
            points = points.concat(this.renderPointRow(y));
        }
        return points;
    }
    render() {
        let margin = 5;
        let innerMargin = 3;
        let mirrors = this.renderMirrors();
        let points = this.renderPoints();
        return (
            <Stage
                style={{ margin: margin }}
                width={this.props.data.Nx * this.props.style.grid.width + innerMargin * 2}
                height={this.props.data.Ny * this.props.style.grid.height + innerMargin * 2}>
                <Layer>{/*Mirrors*/}
                    <Group
                        x={innerMargin}
                        y={innerMargin}>
                        {mirrors}
                    </Group>
                </Layer>
                <Layer>{/*Points*/}
                    <Group
                        x={innerMargin}
                        y={innerMargin}>
                        {points}
                    </Group>
                </Layer>
            </Stage>
        );
    }
}

class Game extends React.Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.type = _r.TypeOfGame.Undefined;
        this.data = new _r.Game();
        this.data.InitBoard(6, 8);

        // Main Test Part Begin
        let g = this.data;
        g.AddHome(1, 1, _r.Player.P1);
        g.SetHomeDirection(1, 1, _r.Direction.Top);
        g.AddMirror(2, 1, _r.TypeOfMirror.BackSlash, _r.Player.P1);
        g.AddHome(2, 2, _r.Player.P2);
        g.SetHomeDirection(2, 2, _r.Direction.Top);
        console.log(g.WhoWins());
        // Main Test Part End
    }
    type: _r.TypeOfGame;
    data :_r.Game;
    render() {
        return (
            <>
                <Board data={this.data.Board} style={new BoardStyle()} />
                <div className="game-info">
                    <div className="next-player">
                        Next Player:&nbsp;
                        <span style={{ color: ColorOfPlayer.get(this.data.NextPlayer) }}>
                            {StringOfPlayer.get(this.data.NextPlayer)}
                        </span>
                    </div>
                </div>
            </>
        );
    }
}

function NoMatch() {
    let loc = useLocation();

    return (<DocumentTitle title="404 | RayChess">
        <>
            <h1>
                404 Not Found
            </h1>
            <p>
                URL:<code>{loc.pathname}</code>
            </p>
            <Link to='/'>Back To HomePage</Link>
        </>
    </DocumentTitle>);
}


export default () => {
    return (
        <Router>
            <App>
                <Switch>
                    {/*<Route path="/about">*/}
                    {/*    <About />*/}
                    {/*</Route>*/}
                    <Route exact path="/">
                        <Game />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </App>
        </Router>
    );
};



