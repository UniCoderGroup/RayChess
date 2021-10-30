
//////////////////////////////////////////////////

// Base begin

export enum Player {
    None = 0,
    P1 = 1,
    P2 = 2,
    Other = 3
}

export function GetAnotherPlayer(player: Player): Player {
    switch (player) {
        case Player.P1:
            return Player.P2;
        case Player.P2:
            return Player.P1;
        default:
            return player;
    }
}

export enum RelativePlayer {
    None,
    This,
    Another
}

export function GetRelativePlayer(PlayerThis: Player, PlayerThat: Player): RelativePlayer {
    if (PlayerThis !== Player.None) {
        if (PlayerThat === Player.None) {
            return RelativePlayer.None;
        }
        else if (PlayerThis === PlayerThat) {
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

export enum Direction {
    Undefined = 0,
    Left = 1,
    Right = 2,
    Top = 4,
    Bottom = 8
}

export const AllDirections = [
    Direction.Left,
    Direction.Right,
    Direction.Top,
    Direction.Bottom,
];

export function GetOppositeDirection(d: Direction): Direction {
    switch (d) {
        case Direction.Undefined:
            return Direction.Undefined;
        case Direction.Left:
            return Direction.Right;
        case Direction.Right:
            return Direction.Left;
        case Direction.Top:
            return Direction.Bottom;
        case Direction.Bottom:
            return Direction.Top;
        default:
            return Direction.Undefined;
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
    return c1.x === c2.x && c1.y === c2.y;
}

/**
 *
 * @param xMax 注：取不到
 * @param yMax 注：取不到
 * @param xMin 注：取到
 * @param yMin 注：取到
 */
export function IsCoordInRange(c: Coord, xMax: number, yMax: number, xMin: number = 0, yMin: number = 0) {
    return xMin <= c.x && c.x < xMax
        && yMin <= c.y && c.y < yMax;
}

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

/**
 * 
 * @param xMax 注：取不到
 * @param yMax 注：取不到
 */
export function HasSurroundingCoord(c: Coord, d: Direction, xMax: number, yMax: number, xMin: number = 0, yMin: number = 0) {
    return IsCoordInRange(GetSurroundingCoord(c, d), xMax, yMax, xMin, yMin);
}

export type RayData = number;

export type RayRoute = Coord[];

export let WriteLog = console.log;

export function GetDirectionFromTo(from: Coord, to: Coord): Direction {
    let ret = Direction.Undefined;
    AllDirections.forEach((d) => {
        if (GetSurroundingCoord(from, d) === to) {
            ret = d;
        }
    });
    return ret;
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

export const AllTypesOfMirror = [
    TypeOfMirror.Left,
    TypeOfMirror.Right,
    TypeOfMirror.Top,
    TypeOfMirror.Bottom,
    TypeOfMirror.Slash,
    TypeOfMirror.BackSlash
]

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
            return Direction.Undefined;
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

export function TypeOfCross2TypeOfMirror(typeOfCross: TypeOfCross): TypeOfMirror {
    switch (typeOfCross) {
        case TypeOfCross.Slash:
            return TypeOfMirror.Slash;
        case TypeOfCross.BackSlash:
            return TypeOfMirror.BackSlash;
        default:
            return TypeOfMirror.Unknow;
    }
}

export enum TypeOfGrid {
    Undefined,
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
    public Left = new BorderMirrorType();
    public Right = new BorderMirrorType();
    public Top = new BorderMirrorType();
    public Bottom = new BorderMirrorType();
    public Cross = new CrossMirrorType();
    Get(type: TypeOfMirror): BorderMirrorType | CrossMirrorType {
        switch (type) {
            case TypeOfMirror.Left:
                return this.Left;
            case TypeOfMirror.Right:
                return this.Right;
            case TypeOfMirror.Top:
                return this.Top;
            case TypeOfMirror.Bottom:
                return this.Bottom;
            case TypeOfMirror.Slash:
                return this.Cross;
            case TypeOfMirror.BackSlash:
                return this.Cross;
            default:
                throw new Error("Unknow TypeOfMirror");
        }
    }
}

export abstract class Grid {
    protected readonly type: TypeOfGrid = TypeOfGrid.Undefined;
    get Type() { return this.type; }
}

export class GridHome extends Grid {
    constructor(Whose: Player = Player.None) {
        super();
        this.whose = Whose;
    }
    public readonly type: TypeOfGrid = TypeOfGrid.Home;
    protected whose: Player;
    get Whose() { return this.whose; }
    protected outdir = Direction.Undefined;
    get Outdir() { return this.outdir; }
    set Outdir(Outdir: Direction) { this.outdir = Outdir; }
    protected outMirror = new BorderMirrorType();
    get OutMirror() { return this.outMirror; }
    set OutMirror(OutMirror: BorderMirrorType) { this.outMirror = OutMirror; }
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
        protected GetOuterArea(): TestArea {
            return this.data.LeftOuterArea;
        }
        protected GetInnerArea(): TestArea {
            return this.data.LeftInnerArea;
        }
    }
    class TestMirrorRight extends TestMirrorBorder {
        protected GetOuterArea(): TestArea {
            return this.data.RightOuterArea;
        }
        protected GetInnerArea(): TestArea {
            return this.data.RightInnerArea;
        }
    }
    class TestMirrorTop extends TestMirrorBorder {
        protected GetOuterArea(): TestArea {
            return this.data.TopOuterArea;
        }
        protected GetInnerArea(): TestArea {
            return this.data.TopInnerArea;
        }
    }
    class TestMirrorBottom extends TestMirrorBorder {
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
        protected output = 0;
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
    public readonly type: TypeOfGrid = TypeOfGrid.Normal;
    protected mirror = new MirrorType();
    get Mirror() { return this.mirror }
    public AddMirror(type: TypeOfMirror, whose: Player, checkExist: boolean = true): boolean {
        let mirrorExist: boolean = false;
        switch (type) {
            case TypeOfMirror.Left:
                if (this.mirror.Left.Whose !== Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Left.Whose = whose;
                break;
            case TypeOfMirror.Right:
                if (this.mirror.Right.Whose !== Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Right.Whose = whose;
                break;
            case TypeOfMirror.Top:
                if (this.mirror.Top.Whose !== Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Top.Whose = whose;
                break;
            case TypeOfMirror.Bottom:
                if (this.mirror.Bottom.Whose !== Player.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Bottom.Whose = whose;
                break;
            case TypeOfMirror.Slash:
                if (this.mirror.Cross.Type !== TypeOfCross.None) {
                    mirrorExist = true;
                    break;
                }
                this.mirror.Cross.Type = TypeOfCross.Slash;
                this.mirror.Cross.Whose = whose;
                break;
            case TypeOfMirror.BackSlash:
                if (this.mirror.Cross.Type !== TypeOfCross.None) {
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
                throw new Error("Undefined direction!");
        }
        return t.Output;
    }
}

//Grid end

//////////////////////////////////////////////////

//Board begin

namespace CheckIfWin {
    export class SearchData {
        constructor(board: Board) {
            this.nx = board.Nx;
            this.ny = board.Ny;
            this.board = board;
            for (let i = 0; i < this.ny; i++) {
                this.data[i] = new Array<RayData>(this.nx);
            }
        }
        protected nx: number;
        get Nx() { return this.nx };
        protected ny: number;
        get Ny() { return this.ny };
        protected board: Board;
        protected data: RayData[][] = [];
        get Board() { return this.board; }
        TestSurrounding(x: number, y: number): RayData {
            let r: RayData = 0;
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
        GetRayData(x: number, y: number): RayData {
            return this.data[y][x];
        }
        SetRayData(x: number, y: number, r: RayData) {
            this.data[y][x] = r;
        }
    }
}

export class Board {
    protected data: Grid[][] = [];
    get Data() { return this.data; }
    protected nx: number = -1;
    get Nx() { return this.nx; }
    protected ny: number = -1;
    get Ny() { return this.ny; }
    protected onChange: () => void = () => { };
    get OnChange() { return this.onChange; }
    set OnChange(OnChange: () => void) { this.onChange = OnChange; }
    public init(Nx: number, Ny: number, BorderReflect: boolean): boolean {
        this.nx = Nx;
        this.ny = Ny;
        for (let i = 0; i < Ny; i++) {
            this.data[i] = new Array<GridNormal>(Nx);
            for (let j = 0; j < Nx; j++) {
                this.data[i][j] = new GridNormal();
            }
        }
        if (BorderReflect) {
            //Left&Right
            for (let y = 0; y < Ny; y++) {
                (this.GetGrid(0, y) as GridNormal).AddMirror(TypeOfMirror.Left, Player.Other, false);
                (this.GetGrid(Nx - 1, y) as GridNormal).AddMirror(TypeOfMirror.Right, Player.Other, false);
            }
            //Top&bottom
            for (let x = 0; x < Nx; x++) {
                (this.GetGrid(x, 0) as GridNormal).AddMirror(TypeOfMirror.Top, Player.Other, false);
                (this.GetGrid(x, Ny - 1) as GridNormal).AddMirror(TypeOfMirror.Bottom, Player.Other, false);
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
    public GetRow(y: number): Grid[] {
        return this.data[y];
    }
    public IsOnBorder(x: number, y: number) {
        return x === 0 || x === this.nx - 1 || y === 0 || y === this.ny - 1;
    }

    public AddHome(x: number, y: number, whose: Player, outDir: Direction): boolean {
        // Check if OK
        if (!IsCoordEqual(this.GetHomeCoord(whose), InvalidCoord)) {
            throw new Error("There has been a grid of this player's home!");
        }
        let g = this.GetGrid(x, y);
        if (g.Type === TypeOfGrid.Home) {
            throw new Error("This grid has been one player's home!");
        }
        if (this.IsOnBorder(x, y)) {
            throw new Error("Cannot place home here!")
        }
        AllDirections.forEach((d) => {
            if (HasSurroundingCoord({ x, y }, d, this.Nx, this.Ny)) {
                let sc = GetSurroundingCoord({ x, y }, d);
                let gs = this.GetGrid(sc.x, sc.y);
                if (gs.Type === TypeOfGrid.Home) {
                    throw new Error("Cannot place home next to another home");
                }
            }
        });

        this.SetGrid(x, y, new GridHome(whose));
        let h = this.GetGrid(x, y) as GridHome;
        let ret = true;
        AllDirections.forEach((d) => {
            if (d !== outDir) {
                if (HasSurroundingCoord({ x, y }, d, this.Nx, this.Ny)) {
                    let sc = GetSurroundingCoord({ x, y }, d);
                    let gsn = this.GetGrid(sc.x, sc.y) as GridNormal;
                    ret = ret && gsn.AddMirror(Direction2TypeOfMirror(GetOppositeDirection(d)), h.Whose, false);
                }
            }
        });
        h.Outdir = outDir;
        return ret;
    }

    GetHomeCoord(whose: Player): Coord {
        let c = new Coord();
        c.y = this.data.findIndex(
            (value) => {
                c.x = value.findIndex(
                    (value) => {
                        if (value.Type === TypeOfGrid.Home) {
                            let home: GridHome = value as GridHome;
                            if (home.Whose === whose) {
                                return true;
                            }
                        }
                        return false;
                    }
                );
                if (c.x !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
        );
        return c;
    }
    public AddMirror(x: number, y: number, type: TypeOfMirror, whose: Player, checkExist: boolean = true): boolean {
        let g = this.GetGrid(x, y);
        switch (g.Type) {
            case TypeOfGrid.Normal:
                let gn = g as GridNormal;
                let d = TypeOfMirror2Direction(type);
                if (d !== Direction.Undefined) {
                    if (IsCoordInRange({ x, y }, this.Nx, this.Ny)) {
                        if (HasSurroundingCoord({ x, y }, d, this.Nx, this.Ny)) {
                            let cs = GetSurroundingCoord({ x, y }, d)
                            let gs = this.GetGrid(cs.x, cs.y);
                            let ret = true;
                            switch (gs.Type) {
                                case TypeOfGrid.Home:
                                    let gsh = gs as GridHome;
                                    if (gsh.Outdir === GetOppositeDirection(d)) {
                                        gsh.OutMirror.Whose = whose;
                                    }
                                    break;
                                case TypeOfGrid.Normal:
                                    let gsn = gs as GridNormal;
                                    ret = ret && gsn.AddMirror(Direction2TypeOfMirror(GetOppositeDirection(d)), whose, false);
                                    break;
                            }
                            return ret && gn.AddMirror(type, whose, checkExist);
                        } else {
                            return gn.AddMirror(type, whose, checkExist);
                        }
                    } else {
                        throw new Error("Out of range!");
                    }
                }
                else {
                    return gn.AddMirror(type, whose, checkExist);
                }
            default:
                throw new Error("Can not place mirror on this grid!");
        }
    }
    protected CheckNode(s: CheckIfWin.SearchData, x: number, y: number, p: Player, d: Direction): boolean {
        let g = this.GetGrid(x, y);
        if (g.Type === TypeOfGrid.Home) {
            let gh = g as GridHome;
            let wh = gh.Whose;
            if (wh === p || wh === Player.None) {
                return false;
            }
            else {
                if (gh.Outdir === GetOppositeDirection(d)) {
                    return true;
                }
            }
        }
        else if (g.Type === TypeOfGrid.Normal) {
            let gn = g as GridNormal;
            let b = s.TestSurrounding(x, y);
            let o = gn.TestOutput(d, p);
            let r = s.GetRayData(x, y);
            AllDirections.forEach((d) => {
                let iftest =
                    (d & o) &&
                    (d & b) &&
                    !(d & r);
                if (iftest) {
                    let ray = s.GetRayData(x, y);
                    s.SetRayData(x, y, ray | d);
                    let c = new Coord(x, y);
                    let sc = GetSurroundingCoord(c, d);
                    if (this.CheckNode(s, sc.x, sc.y, p, d)) {
                        return true;
                    }
                }
            });
            return false;
        }
        return false;
    }
    protected CheckIfWin(p: Player): boolean {
        let cHome: Coord = this.GetHomeCoord(p);
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
    public CheckRayRoute(route: RayRoute, p: Player, n: number = 0): boolean {
        let g = this.GetGrid(route[n].x, route[n].y);
        let d = GetDirectionFromTo(route[n - 1], route[n]);
        if (g.Type === TypeOfGrid.Home) {
            let gh = g as GridHome;
            if (gh.Whose === p) {
                if (n === 0) {
                    return this.CheckRayRoute(route, p, n + 1);
                }
                else {
                    WriteLog("This is a bug if happends");
                    return false;
                }
            } else if (gh.Whose === GetAnotherPlayer(p)) {
                if (n === route.length - 1) {
                    if (gh.Outdir !== d) {
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
        } else if (g.Type === TypeOfGrid.Normal) {
            let gn = g as GridNormal;
            let o = gn.TestOutput(d, p);
            if (d & o) {
                if (n + 1 < route.length) {
                    return this.CheckRayRoute(route, p, n + 1);
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        return false;
    }
}

//Board end

//////////////////////////////////////////////////

//Game begin



export namespace GameRecord {
    export enum ActionType {
        Undefined,
        AddHome,
        AddMirror,
        CheckRouteFailed,
        Win
    }
    export interface ActionData {
        who: Player,
        type: ActionType
    }
    export interface ActionNullData extends ActionData { }
    export interface ActionUndefinedData extends ActionData { }
    export interface ActionAddHomeData extends ActionData {
        coord: Coord,
        outDir: Direction
    }
    export interface ActionAddMirrorData extends ActionData {
        coord: Coord,
        mirrorType: TypeOfMirror
    }
    export interface ActionCheckRouteFailedData extends ActionData { };
    export interface ActionWinData extends ActionData {
        route: RayRoute
    }
    export class Record {
        constructor() {
            this.actions = [];
        }
        protected actions: ActionData[];
        get Actions() { return this.actions; }
        get FirstPlayer() {
            return this.actions[0].type === ActionType.AddHome ?
                this.actions[0].who : Player.None;
        }
        get Winner() {
            return this.actions[this.actions.length - 1].type === ActionType.Win ?
                this.actions[this.actions.length - 1].who : Player.None;
        }
        get ActionNumber() {
            return this.actions.length;
        }
        AddAction(Action: ActionData) {
            return this.actions.push(Action)
        }
        Store(): string {
            return JSON.stringify(this.actions);
        }
        Load(s: string) {
            this.actions = JSON.parse(s);
        }
    }
}

export class Game {
    protected board= new Board();
    get Board() { return this.board; }
    get Nx() { return this.board.Nx; }
    get Ny() { return this.board.Ny; }
    protected currentPlayer: Player = Player.None;
    get CurrentPlayer() { return this.currentPlayer; }
    set CurrentPlayer(CurrentPlayer: Player) { this.currentPlayer = CurrentPlayer; this.board.OnChange(); }
    get OnChange() { return this.board.OnChange; }
    set OnChange(OnChange: () => void) { this.board.OnChange = OnChange; }
    protected record = new GameRecord.Record();
    get Record() { return this.record; }
    public InitBoard(Nx: number, Ny: number, FirstPlayer: Player, BorderReflect: boolean): boolean {
        this.CurrentPlayer = FirstPlayer;
        return this.board.init(Nx, Ny, BorderReflect);
    }
    public GetGrid(x: number, y: number): Grid {
        return this.board.GetGrid(x, y);
    }
    public GetRow(y: number): Grid[] {
        return this.board.GetRow(y);
    }
    public NextPlayer() {
        this.CurrentPlayer = GetAnotherPlayer(this.CurrentPlayer);
    }
    public AddHome(x: number, y: number, whose: Player, outDir: Direction): boolean {
        let data: GameRecord.ActionAddHomeData = {
            who: whose,
            type: GameRecord.ActionType.AddHome,
            coord: new Coord(x, y),
            outDir: outDir
        }
        this.record.AddAction(data);
        return this.board.AddHome(x, y, whose, outDir);
    }
    public AddMirror(x: number, y: number, type: TypeOfMirror, whose: Player, checkExist: boolean = true): boolean {
        let data: GameRecord.ActionAddMirrorData = {
            who: whose,
            type: GameRecord.ActionType.AddMirror,
            coord: new Coord(x, y),
            mirrorType:type
        }
        this.record.AddAction(data);
        return this.board.AddMirror(x, y, type, whose, checkExist);
    }
    public WhoWins(): Player {
        return this.board.WhoWins();
    }
    public CheckRayRoute(route: RayRoute, p: Player): boolean {
        let result = this.board.CheckRayRoute(route, p);
        if (result) {
            let data: GameRecord.ActionWinData = {
                who: p,
                type: GameRecord.ActionType.Win,
                route:route
            }
            this.record.AddAction(data);
        } else {
            let data: GameRecord.ActionCheckRouteFailedData = {
                who: p,
                type: GameRecord.ActionType.CheckRouteFailed
            }
            this.record.AddAction(data);
        }
        return result;
    }
}

export class DefaultGame extends Game {

}

export enum TypeOfGame {
    Undefined,
    Local,
    OnlineCreate,
    OnlineJoin,
}

//class LocalGame extends Game {
//    //Step 1
//    //CONDITION:	when starting a game or reset a game
//    //TODO:			construct a Game object.
//    //FUNCTION:		this function is a constructor
//    public constructor() { super(); };

//    //Step 2
//    //CONDITION:	when after user selected create mode and inputted the board's size
//    //TODO:			Set board size
//    //FUNCTION:		this function set the size of the board and alloc memories for grids
//    //public ProcSetSize(Nx: number, Ny: number): boolean {
//    //    return this.InitBoard(Nx, Ny);
//    //}

//    //Step 3
//    //CONDITION:	when a player place a mirror and the turn is finished
//    //TODO:			Add the mirror and check if someone wins
//    //FUNCITON:		this function check and add the mirror, then check if someone wins
//    public ProcFinishTurn(x: number, y: number, type: TypeOfMirror, whose: Player): [boolean, Player] {
//        try {
//            this.AddMirror(x, y, type, whose);
//        } catch (e) {
//            return [false, Player.None];
//        }
//        return [true, this.WhoWins()];
//    }

//    //Step 4
//    //CONDITION:	someone wins
//    //TODO:			let the winner show the route of ray
//    //FUNCTION:     check if the route is right
//    public ProcCheckRayRoute(route: RayRoute, p: Player): boolean {
//        return this.CheckRayRoute(route, p);
//    }
//}
//    //Game end

//    //////////////////////////////////////////////////
