"use strict";
//////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Map = exports.GridNormal = exports.GridHome = exports.Grid = exports.MirrorType = exports.CrossMirrorType = exports.BorderMirrorType = exports.TypeOfGrid = exports.TypeOfCross = exports.Direction2TypeOfMirror = exports.TypeOfMirror2Direction = exports.TypeOfMirror = exports.GetSurroundingCoord = exports.WriteLog = exports.IsCoordEqual = exports.InvalidCoord = exports.Coord = exports.OppositeDirection = exports.GetRelativePlayer = void 0;
function GetRelativePlayer(PlayerThis, PlayerThat) {
    if (PlayerThis != 0 /* None */) {
        if (PlayerThat == 0 /* None */) {
            return 0 /* None */;
        }
        else if (PlayerThis == PlayerThat) {
            return 1 /* This */;
        }
        else {
            return 2 /* Another */;
        }
    }
    else {
        return 0 /* None */;
    }
}
exports.GetRelativePlayer = GetRelativePlayer;
function OppositeDirection(d) {
    switch (d) {
        case 0 /* Unknow */:
            return 0 /* Unknow */;
        case 1 /* Left */:
            return 2 /* Right */;
        case 2 /* Right */:
            return 1 /* Left */;
        case 4 /* Top */:
            return 8 /* Bottom */;
        case 8 /* Bottom */:
            return 4 /* Top */;
        default:
            return 0 /* Unknow */;
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
        case 1 /* Left */:
            return new Coord(c.x - 1, c.y);
        case 2 /* Right */:
            return new Coord(c.x + 1, c.y);
        case 4 /* Top */:
            return new Coord(c.x, c.y - 1);
        case 8 /* Bottom */:
            return new Coord(c.x, c.y + 1);
        default:
            return exports.InvalidCoord;
    }
}
exports.GetSurroundingCoord = GetSurroundingCoord;
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
            return 1 /* Left */;
        case TypeOfMirror.Right:
            return 2 /* Right */;
        case TypeOfMirror.Top:
            return 4 /* Top */;
        case TypeOfMirror.Bottom:
            return 8 /* Bottom */;
        default:
            return 0 /* Unknow */;
    }
}
exports.TypeOfMirror2Direction = TypeOfMirror2Direction;
function Direction2TypeOfMirror(d) {
    switch (d) {
        case 1 /* Left */:
            return TypeOfMirror.Left;
        case 2 /* Right */:
            return TypeOfMirror.Right;
        case 4 /* Top */:
            return TypeOfMirror.Top;
        case 8 /* Bottom */:
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
    constructor(Whose = 0 /* None */) {
        this.whose = Whose;
    }
    get Whose() { return this.whose; }
    set Whose(Whose) { this.whose = Whose; }
}
exports.BorderMirrorType = BorderMirrorType;
class CrossMirrorType {
    constructor(Type = TypeOfCross.None, Whose = 0 /* None */) {
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
    constructor(Whose = 0 /* None */) {
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
                case 0 /* None */:
                    this.GetInnerArea().Inward();
                    break;
                case 1 /* This */:
                    this.GetInnerArea().Inward();
                    this.GetOuterArea().Outward();
                    break;
                case 2 /* Another */:
                    this.GetOuterArea().Outward();
                    break;
            }
            return true;
        }
        Outward() {
            switch (this.whose) {
                case 0 /* None */:
                    this.GetOuterArea().Outward();
                    break;
                case 1 /* This */:
                    this.GetInnerArea().Inward();
                    this.GetOuterArea().Outward();
                    break;
                case 2 /* Another */:
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
                        case 0 /* None */:
                            this.data.RightInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.RightInnerArea.Outward();
                            this.data.TopInnerArea.Outward();
                            break;
                        case 2 /* Another */:
                            this.data.TopInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case 0 /* None */:
                            this.data.RightInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.RightInnerArea.Outward();
                            this.data.BottomInnerArea.Outward();
                            break;
                        case 2 /* Another */:
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
                        case 0 /* None */:
                            this.data.LeftInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.LeftInnerArea.Outward();
                            this.data.BottomInnerArea.Outward();
                            break;
                        case 2 /* Another */:
                            this.data.BottomInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case 0 /* None */:
                            this.data.LeftInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.LeftInnerArea.Outward();
                            this.data.TopInnerArea.Outward();
                            break;
                        case 2 /* Another */:
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
                        case 0 /* None */:
                            this.data.BottomInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.BottomInnerArea.Outward();
                            this.data.LeftInnerArea.Outward();
                            break;
                        case 2 /* Another */:
                            this.data.LeftInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case 0 /* None */:
                            this.data.BottomInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.BottomInnerArea.Outward();
                            this.data.RightInnerArea.Outward();
                            break;
                        case 2 /* Another */:
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
                        case 0 /* None */:
                            this.data.TopInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.TopInnerArea.Outward();
                            this.data.RightInnerArea.Outward();
                            break;
                        case 2 /* Another */:
                            this.data.RightInnerArea.Outward();
                            break;
                    }
                    break;
                case TypeOfCross.BackSlash:
                    switch (this.whose) {
                        case 0 /* None */:
                            this.data.TopInnerArea.Outward();
                            break;
                        case 1 /* This */:
                            this.data.TopInnerArea.Outward();
                            this.data.LeftInnerArea.Outward();
                            break;
                        case 2 /* Another */:
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
            this.output |= 1 /* Left */;
            return true;
        }
        RightOut() {
            this.output |= 2 /* Right */;
            return true;
        }
        TopOut() {
            this.output |= 4 /* Top */;
            return true;
        }
        BottomOut() {
            this.output |= 8 /* Bottom */;
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
                if (this.mirror.Left.Whose != 0 /* None */) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Left.Whose = whose;
                break;
            case TypeOfMirror.Right:
                if (this.mirror.Right.Whose != 0 /* None */) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Right.Whose = whose;
                break;
            case TypeOfMirror.Top:
                if (this.mirror.Top.Whose != 0 /* None */) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Top.Whose = whose;
                break;
            case TypeOfMirror.Bottom:
                if (this.mirror.Bottom.Whose != 0 /* None */) {
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
            throw "There has been a mirror!";
        }
        else {
            return true;
        }
    }
    TestOutput(d, p) {
        let t = new TestOutput.TestData(p, this.mirror);
        switch (d) {
            case 1 /* Left */:
                t.RightIn();
                break;
            case 2 /* Right */:
                t.LeftIn();
                break;
            case 4 /* Top */:
                t.BottomIn();
                break;
            case 8 /* Bottom */:
                t.TopIn();
                break;
            default:
                throw "Unknow direction!";
        }
        return t.Output;
    }
}
exports.GridNormal = GridNormal;
//Grid end
//////////////////////////////////////////////////
//Map begin
class Map {
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
    AddHome(x, y, whose) {
        if (!IsCoordEqual(this.GetHomeCoord(whose), exports.InvalidCoord)) {
            throw "There has been a grid of home!";
        }
        let g = this.GetGrid(x, y);
        if (g.Type == TypeOfGrid.Home) {
            throw "This grid has been one player's home!";
        }
        this.SetGrid(x, y, new GridHome(whose));
        return true;
    }
    SetHomeDirection(x, y, d) {
        if (this.GetGrid(x, y).Type != TypeOfGrid.Home) {
            throw "Cannot set direction at a non-home grid!";
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
exports.Map = Map;
//Map end
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
                r |= 1 /* Left */;
            }
            if (!(x + 1 >= this.nx)) {
                r |= 2 /* Right */;
            }
            if (!(y - 1 < 0)) {
                r |= 4 /* Top */;
            }
            if (!(y + 1 >= this.ny)) {
                r |= 8 /* Bottom */;
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
        this.map = new Map;
    }
    get Map() { return this.map; }
    get Nx() { return this.map.Nx; }
    ;
    get Ny() { return this.map.Ny; }
    ;
    init(Nx, Ny) {
        return this.map.init(Nx, Ny);
    }
    GetGrid(x, y) {
        return this.map.GetGrid(x, y);
    }
    AddHome(x, y, whose) {
        return this.map.AddHome(x, y, whose);
    }
    SetHomeDirection(x, y, d) {
        return this.map.SetHomeDirection(x, y, d);
    }
    CheckNode(s, x, y, p, d) {
        let g = this.map.GetGrid(x, y);
        if (g.Type == TypeOfGrid.Home) {
            let gh = (g);
            let wh = gh.Whose;
            if (wh == p || wh == 0 /* None */) {
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
        let cHome = this.map.GetHomeCoord(p);
        let gHome = this.map.GetGrid(cHome.x, cHome.y);
        let s = new CheckIfWin.SearchData(this);
        let x = cHome.x;
        let y = cHome.y;
        let b = s.TestSurrounding(x, y);
        if (b & 1 /* Left */) {
            if (this.CheckNode(s, x - 1, y, p, 1 /* Left */)) {
                return true;
            }
        }
        if (b & 2 /* Right */) {
            if (this.CheckNode(s, x + 1, y, p, 2 /* Right */)) {
                return true;
            }
        }
        if (b & 4 /* Top */) {
            if (this.CheckNode(s, x, y - 1, p, 4 /* Top */)) {
                return true;
            }
        }
        if (b & 8 /* Bottom */) {
            if (this.CheckNode(s, x, y + 1, p, 8 /* Bottom */)) {
                return true;
            }
        }
        return false;
    }
    WhoWins() {
        if (this.CheckIfWin(1 /* P1 */)) {
            if (this.CheckIfWin(2 /* P2 */)) {
                throw "Two winners one time!";
            }
            else {
                return 1 /* P1 */;
            }
        }
        else if (this.CheckIfWin(2 /* P2 */)) {
            return 2 /* P2 */;
        }
        return 0 /* None */;
    }
    AddMirror(x, y, type, whose) {
        let g = this.GetGrid(x, y);
        let t = g.Type;
        switch (t) {
            case TypeOfGrid.Home:
                //Error: can not place mirror on home
                throw "Can not place mirror on home!";
                return false;
            case TypeOfGrid.Normal:
                let gn = (g);
                let d = TypeOfMirror2Direction(type);
                if (d != 0 /* Unknow */) {
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
                    return ret && gn.AddMirror(type, whose);
                }
                else {
                    return gn.AddMirror(type, whose);
                }
        }
    }
}
exports.Game = Game;
//Game end
//////////////////////////////////////////////////
//# sourceMappingURL=Core.js.map