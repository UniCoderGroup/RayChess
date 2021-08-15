"use strict";
//////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfGame = exports.Game = exports.Board = exports.GridNormal = exports.GridHome = exports.Grid = exports.MirrorType = exports.CrossMirrorType = exports.BorderMirrorType = exports.TypeOfGrid = exports.TypeOfCross = exports.Direction2TypeOfMirror = exports.TypeOfMirror2Direction = exports.TypeOfMirror = exports.GetDirectionFromTo = exports.GetSurroundingCoord = exports.WriteLog = exports.IsCoordEqual = exports.InvalidCoord = exports.Coord = exports.OppositeDirection = exports.Direction = exports.GetRelativePlayer = exports.RelativePlayer = exports.GetAnotherPlayer = exports.Player = void 0;
// Base begin
var Player;
(function (Player) {
    Player[Player["None"] = 0] = "None";
    Player[Player["P1"] = 1] = "P1";
    Player[Player["P2"] = 2] = "P2";
})(Player = exports.Player || (exports.Player = {}));
function GetAnotherPlayer(player) {
    switch (player) {
        case Player.P1:
            return Player.P2;
        case Player.P2:
            return Player.P1;
        case Player.None:
            return Player.None;
    }
}
exports.GetAnotherPlayer = GetAnotherPlayer;
var RelativePlayer;
(function (RelativePlayer) {
    RelativePlayer[RelativePlayer["None"] = 0] = "None";
    RelativePlayer[RelativePlayer["This"] = 1] = "This";
    RelativePlayer[RelativePlayer["Another"] = 2] = "Another";
})(RelativePlayer = exports.RelativePlayer || (exports.RelativePlayer = {}));
function GetRelativePlayer(PlayerThis, PlayerThat) {
    if (PlayerThis != Player.None) {
        if (PlayerThat == Player.None) {
            return RelativePlayer.None;
        }
        else if (PlayerThis == PlayerThat) {
            return RelativePlayer.This;
        }
        else {
            return RelativePlayer.Another;
        }
    }
    else {
        return RelativePlayer.None;
    }
}
exports.GetRelativePlayer = GetRelativePlayer;
var Direction;
(function (Direction) {
    Direction[Direction["Unknow"] = 0] = "Unknow";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Top"] = 4] = "Top";
    Direction[Direction["Bottom"] = 8] = "Bottom";
})(Direction = exports.Direction || (exports.Direction = {}));
function OppositeDirection(d) {
    switch (d) {
        case Direction.Unknow:
            return Direction.Unknow;
        case Direction.Left:
            return Direction.Right;
        case Direction.Right:
            return Direction.Left;
        case Direction.Top:
            return Direction.Bottom;
        case Direction.Bottom:
            return Direction.Top;
        default:
            return Direction.Unknow;
    }
}
exports.OppositeDirection = OppositeDirection;
class Coord {
    constructor(X = -1, Y = -1) {
        this.x = X;
        this.y = Y;
    }
}
exports.Coord = Coord;
exports.InvalidCoord = { x: -1, y: -1 };
function IsCoordEqual(c1, c2) {
    return c1.x == c2.x && c1.y == c2.y;
}
exports.IsCoordEqual = IsCoordEqual;
exports.WriteLog = console.log;
function GetSurroundingCoord(c, d) {
    switch (d) {
        case Direction.Left:
            return new Coord(c.x - 1, c.y);
        case Direction.Right:
            return new Coord(c.x + 1, c.y);
        case Direction.Top:
            return new Coord(c.x, c.y - 1);
        case Direction.Bottom:
            return new Coord(c.x, c.y + 1);
        default:
            return exports.InvalidCoord;
    }
}
exports.GetSurroundingCoord = GetSurroundingCoord;
function GetDirectionFromTo(from, to) {
    for (let i = 0; i < 4; i++) {
        let di = 0x1 << i;
        let dd = (di);
        if (GetSurroundingCoord(from, dd) == to) {
            return dd;
        }
    }
    return Direction.Unknow;
}
exports.GetDirectionFromTo = GetDirectionFromTo;
//Base end
//////////////////////////////////////////////////
//Grid begin
var TypeOfMirror;
(function (TypeOfMirror) {
    TypeOfMirror[TypeOfMirror["Unknow"] = 0] = "Unknow";
    TypeOfMirror[TypeOfMirror["Left"] = 1] = "Left";
    TypeOfMirror[TypeOfMirror["Right"] = 2] = "Right";
    TypeOfMirror[TypeOfMirror["Top"] = 4] = "Top";
    TypeOfMirror[TypeOfMirror["Bottom"] = 8] = "Bottom";
    TypeOfMirror[TypeOfMirror["Slash"] = 16] = "Slash";
    TypeOfMirror[TypeOfMirror["BackSlash"] = 32] = "BackSlash";
})(TypeOfMirror = exports.TypeOfMirror || (exports.TypeOfMirror = {}));
function TypeOfMirror2Direction(t) {
    switch (t) {
        case TypeOfMirror.Left:
            return Direction.Left;
        case TypeOfMirror.Right:
            return Direction.Right;
        case TypeOfMirror.Top:
            return Direction.Top;
        case TypeOfMirror.Bottom:
            return Direction.Bottom;
        default:
            return Direction.Unknow;
    }
}
exports.TypeOfMirror2Direction = TypeOfMirror2Direction;
function Direction2TypeOfMirror(d) {
    switch (d) {
        case Direction.Left:
            return TypeOfMirror.Left;
        case Direction.Right:
            return TypeOfMirror.Right;
        case Direction.Top:
            return TypeOfMirror.Top;
        case Direction.Bottom:
            return TypeOfMirror.Bottom;
        default:
            return TypeOfMirror.Unknow;
    }
}
exports.Direction2TypeOfMirror = Direction2TypeOfMirror;
var TypeOfCross;
(function (TypeOfCross) {
    TypeOfCross[TypeOfCross["None"] = 0] = "None";
    TypeOfCross[TypeOfCross["Slash"] = 1] = "Slash";
    TypeOfCross[TypeOfCross["BackSlash"] = 2] = "BackSlash";
})(TypeOfCross = exports.TypeOfCross || (exports.TypeOfCross = {}));
var TypeOfGrid;
(function (TypeOfGrid) {
    TypeOfGrid[TypeOfGrid["Home"] = 0] = "Home";
    TypeOfGrid[TypeOfGrid["Normal"] = 1] = "Normal";
})(TypeOfGrid = exports.TypeOfGrid || (exports.TypeOfGrid = {}));
class BorderMirrorType {
    constructor(Whose = Player.None) {
        this.whose = Whose;
    }
    get Whose() { return this.whose; }
    set Whose(Whose) { this.whose = Whose; }
}
exports.BorderMirrorType = BorderMirrorType;
class CrossMirrorType {
    constructor(Type = TypeOfCross.None, Whose = Player.None) {
        this.type = Type;
        this.whose = Whose;
    }
    get Type() { return this.type; }
    set Type(Type) { this.type = Type; }
    get Whose() { return this.whose; }
    set Whose(Whose) { this.whose = Whose; }
}
exports.CrossMirrorType = CrossMirrorType;
class MirrorType {
    constructor() {
        this.Left = new BorderMirrorType;
        this.Right = new BorderMirrorType;
        this.Top = new BorderMirrorType;
        this.Bottom = new BorderMirrorType;
        this.Cross = new CrossMirrorType;
    }
}
exports.MirrorType = MirrorType;
class Grid {
    get Type() { return this.type; }
}
exports.Grid = Grid;
class GridHome extends Grid {
    constructor(Whose = Player.None) {
        super();
        this.type = TypeOfGrid.Home;
        this.whose = Whose;
    }
    get Whose() { return this.whose; }
    get Outdir() { return this.outdir; }
    set Outdir(Outdir) { this.outdir = Outdir; }
}
exports.GridHome = GridHome;
var TestOutput;
(function (TestOutput) {
    class TestMirror {
        constructor(Data, Whose) {
            this.data = Data;
            this.whose = Whose;
        }
    }
    class TestMirrorBorder extends TestMirror {
        constructor(Data, Whose) {
            super(Data, Whose);
        }
        Inward() {
            switch (this.whose) {
                case RelativePlayer.None:
                    this.GetInnerArea().Inward();
                    break;
                case RelativePlayer.This:
                    this.GetInnerArea().Inward();
                    this.GetOuterArea().Outward();
                    break;
                case RelativePlayer.Another:
                    this.GetOuterArea().Outward();
                    break;
            }
            return true;
        }
        Outward() {
            switch (this.whose) {
                case RelativePlayer.None:
                    this.GetOuterArea().Outward();
                    break;
                case RelativePlayer.This:
                    this.GetInnerArea().Inward();
                    this.GetOuterArea().Outward();
                    break;
                case RelativePlayer.Another:
                    this.GetInnerArea().Inward();
                    break;
            }
            return true;
        }
    }
    class TestMirrorLeft extends TestMirrorBorder {
        constructor(Data, Whose) {
            super(Data, Whose);
        }
        GetOuterArea() {
            return this.data.LeftOuterArea;
        }
        GetInnerArea() {
            return this.data.LeftInnerArea;
        }
    }
    class TestMirrorRight extends TestMirrorBorder {
        constructor(Data, Whose) {
            super(Data, Whose);
        }
        GetOuterArea() {
            return this.data.RightOuterArea;
        }
        GetInnerArea() {
            return this.data.RightInnerArea;
        }
    }
    class TestMirrorTop extends TestMirrorBorder {
        constructor(Data, Whose) {
            super(Data, Whose);
        }
        GetOuterArea() {
            return this.data.TopOuterArea;
        }
        GetInnerArea() {
            return this.data.TopInnerArea;
        }
    }
    class TestMirrorBottom extends TestMirrorBorder {
        constructor(Data, Whose) {
            super(Data, Whose);
        }
        GetOuterArea() {
            return this.data.BottomOuterArea;
        }
        GetInnerArea() {
            return this.data.BottomInnerArea;
        }
    }
    class TestMirrorCross extends TestMirror {
        constructor(Data, Whose, Type) {
            super(Data, Whose);
            this.type = Type;
        }
        LeftIn() {
            switch (this.type) {
                case TypeOfCross.Slash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.RightInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.RightInnerArea.Outward();
                            this.data.TopInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.TopInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.RightInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.RightInnerArea.Outward();
                            this.data.BottomInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.BottomInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.None:
                    this.data.RightInnerArea.Outward();
                    break;
            }
            return true;
        }
        RightIn() {
            switch (this.type) {
                case TypeOfCross.Slash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.LeftInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.LeftInnerArea.Outward();
                            this.data.BottomInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.BottomInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.LeftInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.LeftInnerArea.Outward();
                            this.data.TopInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.TopInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.None:
                    this.data.LeftInnerArea.Outward();
                    break;
            }
            return true;
        }
        TopIn() {
            switch (this.type) {
                case TypeOfCross.Slash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.BottomInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.BottomInnerArea.Outward();
                            this.data.LeftInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.LeftInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.BottomInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.BottomInnerArea.Outward();
                            this.data.RightInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.RightInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.None:
                    this.data.BottomInnerArea.Outward();
                    break;
            }
            return true;
        }
        BottomIn() {
            switch (this.type) {
                case TypeOfCross.Slash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.TopInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.TopInnerArea.Outward();
                            this.data.RightInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.RightInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case RelativePlayer.None:
                            this.data.TopInnerArea.Outward();
                            break;
                        case RelativePlayer.This:
                            this.data.TopInnerArea.Outward();
                            this.data.LeftInnerArea.Outward();
                            break;
                        case RelativePlayer.Another:
                            this.data.LeftInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.None:
                    this.data.TopInnerArea.Outward();
                    break;
            }
            return true;
        }
    }
    class TestArea {
        constructor(Data) {
            this.in = false;
            this.out = false;
            this.data = Data;
        }
    }
    class TestAreaInnerLeft extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.LeftIn();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.LeftMirror.Outward();
        }
    }
    class TestAreaOuterLeft extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.LeftMirror.Inward();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.LeftOut();
        }
    }
    class TestAreaInnerRight extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.RightIn();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.RightMirror.Outward();
        }
    }
    class TestAreaOuterRight extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.RightMirror.Inward();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.RightOut();
        }
    }
    class TestAreaInnerTop extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.TopIn();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.TopMirror.Outward();
        }
    }
    class TestAreaOuterTop extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.TopMirror.Inward();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.TopOut();
        }
    }
    class TestAreaInnerBottom extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.BottomIn();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.BottomMirror.Outward();
        }
    }
    class TestAreaOuterBottom extends TestArea {
        constructor(Data) {
            super(Data);
        }
        Inward() {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.BottomMirror.Inward();
        }
        Outward() {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.BottomOut();
        }
    }
    class TestData {
        constructor(p, m) {
            this.LeftMirror = new TestMirrorLeft(this, GetRelativePlayer(p, m.Left.Whose));
            this.RightMirror = new TestMirrorRight(this, GetRelativePlayer(p, m.Right.Whose));
            this.TopMirror = new TestMirrorTop(this, GetRelativePlayer(p, m.Top.Whose));
            this.BottomMirror = new TestMirrorBottom(this, GetRelativePlayer(p, m.Bottom.Whose));
            this.CrossMirror = new TestMirrorCross(this, GetRelativePlayer(p, m.Cross.Whose), m.Cross.Type);
            this.LeftInnerArea = new TestAreaInnerLeft(this);
            this.LeftOuterArea = new TestAreaOuterLeft(this);
            this.RightInnerArea = new TestAreaInnerRight(this);
            this.RightOuterArea = new TestAreaOuterRight(this);
            this.TopInnerArea = new TestAreaInnerTop(this);
            this.TopOuterArea = new TestAreaOuterTop(this);
            this.BottomInnerArea = new TestAreaInnerBottom(this);
            this.BottomOuterArea = new TestAreaOuterBottom(this);
        }
        LeftIn() {
            return this.LeftOuterArea.Inward();
        }
        RightIn() {
            return this.RightOuterArea.Inward();
        }
        TopIn() {
            return this.TopOuterArea.Inward();
        }
        BottomIn() {
            return this.BottomOuterArea.Inward();
        }
        LeftOut() {
            this.output |= Direction.Left;
            return true;
        }
        RightOut() {
            this.output |= Direction.Right;
            return true;
        }
        TopOut() {
            this.output |= Direction.Top;
            return true;
        }
        BottomOut() {
            this.output |= Direction.Bottom;
            return true;
        }
        get Output() {
            return this.output;
        }
    }
    TestOutput.TestData = TestData;
})(TestOutput || (TestOutput = {}));
class GridNormal extends Grid {
    constructor() {
        super();
        this.type = TypeOfGrid.Normal;
        this.mirror = new MirrorType;
    }
    get Mirror() { return this.mirror; }
    AddMirror(type, whose, checkExist = true) {
        let mirrorExist = false;
        switch (type) {
            case TypeOfMirror.Left:
                if (this.mirror.Left.Whose != Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Left.Whose = whose;
                break;
            case TypeOfMirror.Right:
                if (this.mirror.Right.Whose != Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Right.Whose = whose;
                break;
            case TypeOfMirror.Top:
                if (this.mirror.Top.Whose != Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Top.Whose = whose;
                break;
            case TypeOfMirror.Bottom:
                if (this.mirror.Bottom.Whose != Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Bottom.Whose = whose;
                break;
            case TypeOfMirror.Slash:
                if (this.mirror.Cross.Type != TypeOfCross.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Cross.Type = TypeOfCross.Slash;
                this.mirror.Cross.Whose = whose;
                break;
            case TypeOfMirror.BackSlash:
                if (this.mirror.Cross.Type != TypeOfCross.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Cross.Type = TypeOfCross.BackSlash;
                this.mirror.Cross.Whose = whose;
                break;
            default:
                return false;
        }
        if (mirrorExist && checkExist) {
            throw new Error("There has been a mirror!");
        }
        else {
            return true;
        }
    }
    TestOutput(d, p) {
        let t = new TestOutput.TestData(p, this.mirror);
        switch (d) {
            case Direction.Left:
                t.RightIn();
                break;
            case Direction.Right:
                t.LeftIn();
                break;
            case Direction.Top:
                t.BottomIn();
                break;
            case Direction.Bottom:
                t.TopIn();
                break;
            default:
                throw new Error("Unknow direction!");
        }
        return t.Output;
    }
}
exports.GridNormal = GridNormal;
//Grid end
//////////////////////////////////////////////////
//Board begin
class Board {
    constructor() {
        this.data = [];
    }
    get Data() { return this.data; }
    get Nx() { return this.nx; }
    get Ny() { return this.ny; }
    init(Nx, Ny) {
        this.nx = Nx;
        this.ny = Ny;
        for (let i = 0; i < Ny; i++) {
            this.data[i] = new Array(Nx);
            for (let j = 0; j < Nx; j++) {
                this.data[i][j] = new GridNormal;
            }
        }
        return true;
    }
    GetGrid(x, y) {
        return this.data[y][x];
    }
    SetGrid(x, y, value) {
        this.data[y][x] = value;
        return true;
    }
    GetRow(y) {
        return this.data[y];
    }
    AddHome(x, y, whose) {
        if (!IsCoordEqual(this.GetHomeCoord(whose), exports.InvalidCoord)) {
            throw new Error("There has been a grid of home!");
        }
        let g = this.GetGrid(x, y);
        if (g.Type == TypeOfGrid.Home) {
            throw new Error("This grid has been one player's home!");
        }
        this.SetGrid(x, y, new GridHome(whose));
        return true;
    }
    SetHomeDirection(x, y, d) {
        if (this.GetGrid(x, y).Type != TypeOfGrid.Home) {
            throw new Error("Cannot set direction at a non-home grid!");
        }
        let h = this.GetGrid(x, y);
        let ret = true;
        for (let i = 0; i < 4; i++) {
            let idi = 0x1 << i;
            let idd = idi;
            if (idd != d) {
                let sc = GetSurroundingCoord({ x, y }, idd);
                let gs = this.GetGrid(sc.x, sc.y);
                switch (gs.Type) {
                    case TypeOfGrid.Home:
                        break;
                    case TypeOfGrid.Normal:
                        let gsn = gs;
                        ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(idd)), h.Whose, false);
                        break;
                }
            }
        }
        h.Outdir = d;
        return ret;
    }
    GetHomeCoord(whose) {
        let c = new Coord;
        c.y = this.data.findIndex(function (value, index, obj) {
            c.x = value.findIndex(function (value, index, obj) {
                if (value.Type == TypeOfGrid.Home) {
                    let home = value;
                    if (home.Whose == whose) {
                        return true;
                    }
                }
                return false;
            });
            if (c.x != -1) {
                return true;
            }
            else {
                return false;
            }
        });
        return c;
    }
}
exports.Board = Board;
//Board end
//////////////////////////////////////////////////
//Game begin
var CheckIfWin;
(function (CheckIfWin) {
    class SearchData {
        constructor(Game) {
            this.data = [];
            this.nx = Game.Nx;
            this.ny = Game.Ny;
            this.game = Game;
            for (let i = 0; i < this.ny; i++) {
                this.data[i] = new Array(this.nx);
            }
        }
        get Nx() { return this.nx; }
        ;
        get Ny() { return this.ny; }
        ;
        get Game() { return this.game; }
        TestSurrounding(x, y) {
            let r = 0;
            if (!(x - 1 < 0)) {
                r |= Direction.Left;
            }
            if (!(x + 1 >= this.nx)) {
                r |= Direction.Right;
            }
            if (!(y - 1 < 0)) {
                r |= Direction.Top;
            }
            if (!(y + 1 >= this.ny)) {
                r |= Direction.Bottom;
            }
            return r;
        }
        GetRayData(x, y) {
            return this.data[y][x];
        }
    }
    CheckIfWin.SearchData = SearchData;
})(CheckIfWin || (CheckIfWin = {}));
class Game {
    constructor() {
        this.board = new Board;
        this.nextPlayer = Player.None;
        this.onChange = () => { };
    }
    get Board() { return this.board; }
    get Nx() { return this.board.Nx; }
    get Ny() { return this.board.Ny; }
    get NextPlayer() { return this.nextPlayer; }
    set NextPlayer(NextPlayer) { this.nextPlayer = NextPlayer; this.onChange(); }
    get OnChange() { return this.onChange; }
    set OnChange(OnChange) { this.onChange = OnChange; }
    InitBoard(Nx, Ny) {
        return this.board.init(Nx, Ny);
    }
    GetGrid(x, y) {
        return this.board.GetGrid(x, y);
    }
    GetRow(y) {
        return this.board.GetRow(y);
    }
    AddHome(x, y, whose) {
        return this.board.AddHome(x, y, whose);
    }
    SetHomeDirection(x, y, d) {
        return this.board.SetHomeDirection(x, y, d);
    }
    CheckNode(s, x, y, p, d) {
        let g = this.board.GetGrid(x, y);
        if (g.Type == TypeOfGrid.Home) {
            let gh = (g);
            let wh = gh.Whose;
            if (wh == p || wh == Player.None) {
                return false;
            }
            else {
                if (gh.Outdir == OppositeDirection(d)) {
                    return true;
                }
            }
        }
        else if (g.Type == TypeOfGrid.Normal) {
            let gn = (g);
            let b = s.TestSurrounding(x, y);
            let o = gn.TestOutput(d, p);
            let r = s.GetRayData(x, y);
            for (let i = 0; i < 4; i++) {
                let di = 0x1 << i;
                let dd = (di);
                let iftest = di & o &&
                    di & b &&
                    !(di & r);
                if (iftest) {
                    let ray = s.GetRayData(x, y);
                    ray |= di;
                    let c = new Coord(x, y);
                    let sc = GetSurroundingCoord(c, dd);
                    if (this.CheckNode(s, sc.x, sc.y, p, dd)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    CheckIfWin(p) {
        let cHome = this.board.GetHomeCoord(p);
        let gHome = this.board.GetGrid(cHome.x, cHome.y);
        let s = new CheckIfWin.SearchData(this);
        let x = cHome.x;
        let y = cHome.y;
        let b = s.TestSurrounding(x, y);
        if (b & Direction.Left) {
            if (this.CheckNode(s, x - 1, y, p, Direction.Left)) {
                return true;
            }
        }
        if (b & Direction.Right) {
            if (this.CheckNode(s, x + 1, y, p, Direction.Right)) {
                return true;
            }
        }
        if (b & Direction.Top) {
            if (this.CheckNode(s, x, y - 1, p, Direction.Top)) {
                return true;
            }
        }
        if (b & Direction.Bottom) {
            if (this.CheckNode(s, x, y + 1, p, Direction.Bottom)) {
                return true;
            }
        }
        return false;
    }
    WhoWins() {
        if (this.CheckIfWin(Player.P1)) {
            if (this.CheckIfWin(Player.P2)) {
                throw new Error("Two winners one time!");
            }
            else {
                return Player.P1;
            }
        }
        else if (this.CheckIfWin(Player.P2)) {
            return Player.P2;
        }
        return Player.None;
    }
    CheckRayRoute(route, p, n) {
        let g = this.GetGrid(route[n].x, route[n].y);
        let d = GetDirectionFromTo(route[n - 1], route[n]);
        if (g.Type == TypeOfGrid.Home) {
            let gh = g;
            if (gh.Whose == p) {
                if (n == 0) {
                    return this.CheckRayRoute(route, p, n + 1);
                }
                else {
                    exports.WriteLog("This is a bug if happends");
                    return false;
                }
            }
            else if (gh.Whose == GetAnotherPlayer(p)) {
                if (n == route.length - 1) {
                    if (gh.Outdir != d) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    exports.WriteLog("This is a bug if happends");
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else if (g.Type == TypeOfGrid.Normal) {
            let gn = g;
            let o = gn.TestOutput(d, p);
            if (d & o) {
                if (n + 1 < route.length) {
                    return this.CheckRayRoute(route, p, n + 1);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        return false;
    }
    AddMirror(x, y, type, whose) {
        let g = this.GetGrid(x, y);
        let t = g.Type;
        switch (t) {
            case TypeOfGrid.Home:
                throw new Error("Can not place mirror on home!");
            case TypeOfGrid.Normal:
                let gn = (g);
                let d = TypeOfMirror2Direction(type);
                if (d != Direction.Unknow) {
                    let c = new Coord(x, y);
                    let cs = GetSurroundingCoord(c, d);
                    let gs = this.GetGrid(cs.x, cs.y);
                    let ret = true;
                    switch (gs.Type) {
                        case TypeOfGrid.Home:
                            break;
                        case TypeOfGrid.Normal:
                            let gsn = gs;
                            ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(d)), whose, false);
                            break;
                    }
                    this.onChange();
                    return ret && gn.AddMirror(type, whose);
                }
                else {
                    this.onChange();
                    return gn.AddMirror(type, whose);
                }
        }
    }
}
exports.Game = Game;
var TypeOfGame;
(function (TypeOfGame) {
    TypeOfGame[TypeOfGame["Undefined"] = 0] = "Undefined";
    TypeOfGame[TypeOfGame["Local"] = 1] = "Local";
    TypeOfGame[TypeOfGame["OnlineCreate"] = 2] = "OnlineCreate";
    TypeOfGame[TypeOfGame["OnlineJoin"] = 3] = "OnlineJoin";
})(TypeOfGame = exports.TypeOfGame || (exports.TypeOfGame = {}));
class LocalGame extends Game {
    //Step 1
    //CONDITION:	when starting a game or reset a game
    //TODO:			construct a Game object.
    //FUNCTION:		this function is a constructor
    constructor() { super(); }
    ;
    //Step 2
    //CONDITION:	when after user selected create mode and inputted the board's size
    //TODO:			Set board size
    //FUNCTION:		this function set the size of the board and alloc memories for grids
    ProcSetSize(Nx, Ny) {
        return this.InitBoard(Nx, Ny);
    }
    //Step 3
    //CONDITION:	when a player place a mirror and the turn is finished
    //TODO:			Add the mirror and check if someone wins
    //FUNCITON:		this function check and add the mirror, then check if someone wins
    ProcFinishTurn(x, y, type, whose) {
        try {
            this.AddMirror(x, y, type, whose);
        }
        catch (e) {
            return [false, Player.None];
        }
        return [true, this.WhoWins()];
    }
    //Step 4
    //CONDITION:	someone wins
    //TODO:			let the winner show the route of ray
    //FUNCTION:     check if the route is right
    ProcCheckRayRoute(route, p) {
        return this.CheckRayRoute(route, p, 0);
    }
}
//Game end
//////////////////////////////////////////////////
//# sourceMappingURL=Core.js.map