
//////////////////////////////////////////////////

// Base begin

export const enum Player {
    None = 0,
    P1 = 1,
    P2 = 2
}

export function GetAnotherPlayer(player: Player): Player {
    switch (player) {
        case Player.P1:
            return Player.P2;
        case Player.P2:
            return Player.P1;
        case Player.None:
            return Player.None;
    }
}

export const enum RelativePlayer {
    None,
    This,
    Another
}

export function GetRelativePlayer(PlayerThis: Player, PlayerThat: Player): RelativePlayer {
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

export const enum Direction {
    Unknow = 0,
    Left = 1,
    Right = 2,
    Top = 4,
    Bottom = 8
}

export function OppositeDirection(d: Direction): Direction {
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

export class Coord {
    constructor(X: number = -1, Y: number = -1) {
        this.x = X;
        this.y = Y;
    }
    public x: number;
    public y: number;
}
export const InvalidCoord: Coord = { x: -1, y: -1 };

export function IsCoordEqual(c1: Coord, c2: Coord): boolean {
    return c1.x == c2.x && c1.y == c2.y;
}

export type RayData = number;

export type RayRoute = Coord[];

export let WriteLog = console.log;

export function GetSurroundingCoord(c: Coord, d: Direction): Coord {
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
            return InvalidCoord;
    }
}

export function GetDirectionFromTo(from: Coord, to: Coord): Direction {
    for (let i: number = 0; i < 4; i++) {
        let di = 0x1 << i;
        let dd = <Direction>(di);
        if (GetSurroundingCoord(from, dd) == to) {
            return dd;
        }
    }
    return Direction.Unknow;
}

//Base end

//////////////////////////////////////////////////

//Grid begin

export enum TypeOfMirror {
    Unknow = 0,
    Left = 1,
    Right = 2,
    Top = 4,
    Bottom = 8,
    Slash = 16,
    BackSlash = 32
}

export function TypeOfMirror2Direction(t: TypeOfMirror): Direction {
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

export function Direction2TypeOfMirror(d: Direction): TypeOfMirror {
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

export enum TypeOfCross {
    None,
    Slash,
    BackSlash
}

export enum TypeOfGrid {
    Home,
    Normal
}

export class BorderMirrorType {
    constructor(Whose: Player = Player.None) {
        this.whose = Whose;
    }
    protected whose: Player;
    get Whose() { return this.whose }
    set Whose(Whose) { this.whose = Whose; }
}

export class CrossMirrorType {
    constructor(Type: TypeOfCross = TypeOfCross.None, Whose: Player = Player.None) {
        this.type = Type;
        this.whose = Whose;
    }
    protected type: TypeOfCross;
    get Type() { return this.type }
    set Type(Type) { this.type = Type; }
    protected whose: Player;
    get Whose() { return this.whose }
    set Whose(Whose) { this.whose = Whose; }
}

export class MirrorType {
    public Left = new BorderMirrorType;
    public Right = new BorderMirrorType;
    public Top = new BorderMirrorType;
    public Bottom = new BorderMirrorType;
    public Cross = new CrossMirrorType;
}

export abstract class Grid {
    protected readonly type: TypeOfGrid;
    get Type(): TypeOfGrid { return this.type; }
}

export class GridHome extends Grid {
    constructor(Whose: Player = Player.None) {
        super();
        this.whose = Whose;
    }
    public readonly type: TypeOfGrid = TypeOfGrid.Home;
    protected whose: Player;
    get Whose(): Player { return this.whose; }
    protected outdir: Direction;
    get Outdir(): Direction { return this.outdir; }
    set Outdir(Outdir: Direction) { this.outdir = Outdir; }
}

namespace TestOutput {
    class TestMirror {
        constructor(Data: TestData, Whose: RelativePlayer) {
            this.data = Data;
            this.whose = Whose
        }
        protected data: TestData;
        protected whose: RelativePlayer;
    }
    abstract class TestMirrorBorder extends TestMirror {
        constructor(Data: TestData, Whose: RelativePlayer) {
            super(Data, Whose);
        }
        protected abstract GetOuterArea(): TestArea;
        protected abstract GetInnerArea(): TestArea;
        public Inward(): boolean {
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
        public Outward(): boolean {
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
        constructor(Data: TestData, Whose: RelativePlayer) {
            super(Data, Whose);
        }
        protected GetOuterArea(): TestArea {
            return this.data.LeftOuterArea;
        }
        protected GetInnerArea(): TestArea {
            return this.data.LeftInnerArea;
        }
    }
    class TestMirrorRight extends TestMirrorBorder {
        constructor(Data: TestData, Whose: RelativePlayer) {
            super(Data, Whose);
        }
        protected GetOuterArea(): TestArea {
            return this.data.RightOuterArea;
        }
        protected GetInnerArea(): TestArea {
            return this.data.RightInnerArea;
        }
    }
    class TestMirrorTop extends TestMirrorBorder {
        constructor(Data: TestData, Whose: RelativePlayer) {
            super(Data, Whose);
        }
        protected GetOuterArea(): TestArea {
            return this.data.TopOuterArea;
        }
        protected GetInnerArea(): TestArea {
            return this.data.TopInnerArea;
        }
    }
    class TestMirrorBottom extends TestMirrorBorder {
        constructor(Data: TestData, Whose: RelativePlayer) {
            super(Data, Whose);
        }
        protected GetOuterArea(): TestArea {
            return this.data.BottomOuterArea;
        }
        protected GetInnerArea(): TestArea {
            return this.data.BottomInnerArea;
        }
    }
    class TestMirrorCross extends TestMirror {

        constructor(Data: TestData, Whose: RelativePlayer, Type: TypeOfCross) {
            super(Data, Whose);
            this.type = Type;
        }
        protected type: TypeOfCross;
        public LeftIn(): boolean {
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
        public RightIn(): boolean {
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
        public TopIn(): boolean {
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
        public BottomIn(): boolean {
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
    abstract class TestArea {
        constructor(Data: TestData) {
            this.data = Data;
        }
        protected data: TestData;
        protected in: boolean = false;
        protected out: boolean = false;
        public abstract Inward(): boolean;
        public abstract Outward(): boolean;
    }
    class TestAreaInnerLeft extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.LeftIn();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.LeftMirror.Outward();
        }
    }
    class TestAreaOuterLeft extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.LeftMirror.Inward();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.LeftOut();
        }
    }
    class TestAreaInnerRight extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.RightIn();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.RightMirror.Outward();
        }
    }
    class TestAreaOuterRight extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.RightMirror.Inward();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.RightOut();
        }
    }
    class TestAreaInnerTop extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.TopIn();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.TopMirror.Outward();
        }
    }
    class TestAreaOuterTop extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.TopMirror.Inward();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.TopOut();
        }
    }
    class TestAreaInnerBottom extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.CrossMirror.BottomIn();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.BottomMirror.Outward();
        }
    }
    class TestAreaOuterBottom extends TestArea {
        constructor(Data: TestData) {
            super(Data);
        }
        public Inward(): boolean {
            if (this.in) {
                return true;
            }
            this.in = true;
            return this.data.BottomMirror.Inward();
        }
        public Outward(): boolean {
            if (this.out) {
                return true;
            }
            this.out = true;
            return this.data.BottomOut();
        }
    }
    export class TestData {
        constructor(p: Player, m: MirrorType) {
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
        public LeftMirror: TestMirrorLeft;
        public RightMirror: TestMirrorRight;
        public TopMirror: TestMirrorTop;
        public BottomMirror: TestMirrorBottom;
        public CrossMirror: TestMirrorCross;
        public LeftInnerArea: TestAreaInnerLeft;
        public LeftOuterArea: TestAreaOuterLeft;
        public RightInnerArea: TestAreaInnerRight;
        public RightOuterArea: TestAreaOuterRight;
        public TopInnerArea: TestAreaInnerTop;
        public TopOuterArea: TestAreaOuterTop;
        public BottomInnerArea: TestAreaInnerBottom;
        public BottomOuterArea: TestAreaOuterBottom;
        protected output: number;
        public LeftIn(): boolean {
            return this.LeftOuterArea.Inward();
        }
        public RightIn(): boolean {
            return this.RightOuterArea.Inward();
        }
        public TopIn(): boolean {
            return this.TopOuterArea.Inward();
        }
        public BottomIn(): boolean {
            return this.BottomOuterArea.Inward();
        }
        public LeftOut(): boolean {
            this.output |= Direction.Left;
            return true;
        }
        public RightOut(): boolean {
            this.output |= Direction.Right;
            return true;
        }
        public TopOut(): boolean {
            this.output |= Direction.Top;
            return true;
        }
        public BottomOut(): boolean {
            this.output |= Direction.Bottom;
            return true;
        }
        get Output(): number {
            return this.output;
        }
    }
}

export class GridNormal extends Grid {
    constructor() {
        super();
    }
    public readonly type: TypeOfGrid = TypeOfGrid.Normal;
    protected mirror = new MirrorType;
    get Mirror(): MirrorType { return this.mirror }

    public AddMirror(type: TypeOfMirror, whose: Player, checkExist: boolean = true): boolean {
        let mirrorExist: boolean = false;
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
            throw "There has been a mirror!";
        }
        else {
            return true;
        }
    }

    public TestOutput(d: Direction, p: Player): RayData {
        let t: TestOutput.TestData = new TestOutput.TestData(p, this.mirror);
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
                throw "Unknow direction!";
        }
        return t.Output;
    }
}

//Grid end

//////////////////////////////////////////////////

//Board begin

export class Board {
    protected data: Grid[][] = [];
    get Data(): Grid[][] { return this.data; }
    protected nx: number;
    get Nx(): number { return this.nx; }
    protected ny: number;
    get Ny(): number { return this.ny; }
    public init(Nx: number, Ny: number): boolean {
        this.nx = Nx;
        this.ny = Ny;
        for (let i = 0; i < Ny; i++) {
            this.data[i] = new Array<GridNormal>(Nx);
            for (let j = 0; j < Nx; j++) {
                this.data[i][j] = new GridNormal;
            }
        }
        return true;
    }
    public GetGrid(x: number, y: number): Grid {
        return this.data[y][x];
    }
    public SetGrid(x: number, y: number, value: Grid): boolean {
        this.data[y][x] = value;
        return true;
    }
    public AddHome(x: number, y: number, whose: Player) {
        if (!IsCoordEqual(this.GetHomeCoord(whose), InvalidCoord)) {
            throw "There has been a grid of home!";
        }
        let g = this.GetGrid(x, y);
        if (g.Type == TypeOfGrid.Home) {
            throw "This grid has been one player's home!";
        }
        this.SetGrid(x, y, new GridHome(whose));
        return true;
    }
    SetHomeDirection(x: number, y: number, d: Direction) {
        if (this.GetGrid(x, y).Type != TypeOfGrid.Home) {
            throw "Cannot set direction at a non-home grid!";
        }
        let h = <GridHome>this.GetGrid(x, y);
        let ret = true;
        for (let i = 0; i < 4; i++) {
            let idi = 0x1 << i;
            let idd: Direction = <Direction>idi;
            if (idd != d) {
                let sc = GetSurroundingCoord({ x, y }, idd);
                let gs: Grid = this.GetGrid(sc.x, sc.y);
                switch (gs.Type) {
                    case TypeOfGrid.Home:
                        break;
                    case TypeOfGrid.Normal:
                        let gsn = <GridNormal>gs;
                        ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(idd)), h.Whose, false);
                        break;
                }
            }
        }
        h.Outdir = d;
        return ret;
    }
    GetHomeCoord(whose: Player): Coord {
        let c: Coord = new Coord;
        c.y = this.data.findIndex(
            function (value: Grid[], index: number, obj: Grid[][]): boolean {
                c.x = value.findIndex(
                    function (value: Grid, index: number, obj: Grid[]): boolean {
                        if (value.Type == TypeOfGrid.Home) {
                            let home: GridHome = <GridHome>value;
                            if (home.Whose == whose) {
                                return true;
                            }
                        }
                        return false;
                    }
                );
                if (c.x != -1) {
                    return true;
                } else {
                    return false;
                }
            }
        );
        return c;
    }
}

//Board end

//////////////////////////////////////////////////

//Game begin

namespace CheckIfWin {
    export class SearchData {
        constructor(Game: Game) {
            this.nx = Game.Nx;
            this.ny = Game.Ny;
            this.game = Game;
            for (let i = 0; i < this.ny; i++) {
                this.data[i] = new Array<RayData>(this.nx);
            }
        }
        protected nx: number;
        get Nx(): number { return this.nx };
        protected ny: number;
        get Ny(): number { return this.ny };
        protected game: Game;
        protected data: RayData[][] = [];
        get Game(): Game { return this.game; }
        TestSurrounding(x: number, y: number): RayData {
            let r: RayData = 0;
            if (!(x - 1 < 0)) {
                r |= <RayData>Direction.Left;
            }
            if (!(x + 1 >= this.nx)) {
                r |= <RayData>Direction.Right;
            }
            if (!(y - 1 < 0)) {
                r |= <RayData>Direction.Top;
            }
            if (!(y + 1 >= this.ny)) {
                r |= <RayData>Direction.Bottom;
            }
            return r;
        }
        GetRayData(x: number, y: number): RayData {
            return this.data[y][x];
        }
    }
}

export class Game {
    protected board: Board = new Board;
    get Board(): Board { return this.board; }
    get Nx(): number { return this.board.Nx; };
    get Ny(): number { return this.board.Ny; };
    public me: Player = Player.None;
    public nextPlayer: Player = Player.None;
    protected isCreate: boolean;
    get IsCreate(): boolean { return this.isCreate; };
    public InitBoard(Nx: number, Ny: number): boolean {
        return this.board.init(Nx, Ny);
    }
    public GetGrid(x: number, y: number): Grid {
        return this.board.GetGrid(x, y);
    }
    public AddHome(x: number, y: number, whose: Player): boolean {
        return this.board.AddHome(x, y, whose);
    }
    public SetHomeDirection(x: number, y: number, d: Direction): boolean {
        return this.board.SetHomeDirection(x, y, d);
    }
    protected CheckNode(s: CheckIfWin.SearchData, x: number, y: number, p: Player, d: Direction): boolean {
        let g = this.board.GetGrid(x, y);
        if (g.Type == TypeOfGrid.Home) {
            let gh = <GridHome>(g);
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
            let gn = <GridNormal>(g);
            let b: RayData = s.TestSurrounding(x, y);
            let o: RayData = gn.TestOutput(d, p);
            let r: RayData = s.GetRayData(x, y);
            for (let i: number = 0; i < 4; i++) {
                let di = 0x1 << i;
                let dd = <Direction>(di);
                let iftest: boolean =
                    di & o &&
                    di & b &&
                    !(di & r);
                if (iftest) {
                    let ray = s.GetRayData(x, y)
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
    protected CheckIfWin(p: Player): boolean {
        let cHome: Coord = this.board.GetHomeCoord(p);
        let gHome: GridHome = <GridHome>this.board.GetGrid(cHome.x, cHome.y);
        let s = new CheckIfWin.SearchData(this);
        let x = cHome.x;
        let y = cHome.y;
        let b: RayData = s.TestSurrounding(x, y);
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
    public WhoWins(): Player {
        if (this.CheckIfWin(Player.P1)) {
            if (this.CheckIfWin(Player.P2)) {
                throw "Two winners one time!";
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

    public CheckRayRoute(route: RayRoute, p: Player, n: number): boolean {
        let g = this.GetGrid(route[n].x, route[n].y);
        if (g.Type == TypeOfGrid.Home) {
            let gh = <GridHome>g;
            if (gh.Whose == p) {
                if (n == 0) {
                    return this.CheckRayRoute(route, p, n + 1);
                }
                else {
                    return false;
                }
            } else if (gh.Whose == GetAnotherPlayer(p)) {
                if (n == route.length - 1) {
                    if (gh.Outdir != GetDirectionFromTo(route[n - 1], route[n])) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    WriteLog("This is a bug if happends");
                    return false;
                }
            } else {
                return false;
            }
        } else if (g.Type == TypeOfGrid.Normal) {
            let gn = <GridNormal>g;

        }
        return false;
    }

    public AddMirror(x: number, y: number, type: TypeOfMirror, whose: Player): boolean {
        let g = this.GetGrid(x, y);
        let t = g.Type;
        switch (t) {
            case TypeOfGrid.Home:
                throw "Can not place mirror on home!";
                return false;
            case TypeOfGrid.Normal:
                let gn = <GridNormal>(g);
                let d = TypeOfMirror2Direction(type);
                if (d != Direction.Unknow) {
                    let c = new Coord(x, y);
                    let cs = GetSurroundingCoord(c, d)
                    let gs = this.GetGrid(cs.x, cs.y);
                    let ret = true;
                    switch (gs.Type) {
                        case TypeOfGrid.Home:
                            break;
                        case TypeOfGrid.Normal:
                            let gsn = <GridNormal>gs;
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

class LocalGame extends Game {
    //Step 1
    //CONDITION:	when starting a game or reset a game
    //TODO:			construct a Game object.
    //FUNCTION:		this function is a constructor
    public constructor() { super(); };

    //Step 2
    //CONDITION:	when after user selected create mode and inputted the board's size
    //TODO:			Set board size
    //FUNCTION:		this function set the size of the board and alloc memories for grids
    public ProcSetSize(Nx: number, Ny: number): boolean {
        return this.InitBoard(Nx, Ny);
    }

    //Step 3
    //CONDITION:	when a player place a mirror and the turn is finished
    //TODO:			Add the mirror and check if someone wins
    //FUNCITON:		this function check and add the mirror, then check if someone wins
    public ProcFinishTurn(x: number, y: number, type: TypeOfMirror, whose: Player): [boolean, Player] {
        try {
            this.AddMirror(x, y, type, whose);
        } catch (e) {
            return [false, Player.None];
        }
        return [true, this.WhoWins()];
    }

    //Step 4
    //CONDITION:	someone wins
    //TODO:			let the winner show the route of ray
    //FUNCTION:     check if the route is right
    public ProcCheckRayRoute(route: RayRoute, p: Player): boolean {
        return this.CheckRayRoute(route, p, 0);
    }
}

    //Game end

    //////////////////////////////////////////////////
