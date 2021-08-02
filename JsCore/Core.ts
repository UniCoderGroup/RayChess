namespace RayChess {

    // Base begin



    const enum Player {
        None = 0,
        P1 = 1,
        P2 = 2
    }

    const enum RelativePlayer {
        None,
        This,
        Another
    }


    const enum Direction {
        Unknow = 0,
        Left = 1,
        Right = 2,
        Top = 4,
        Bottom = 8
    };

    function OppositeDirection(d: Direction): Direction {
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

    class Coord {
        constructor(X: number, Y: number) {
            this.x = X;
            this.y = Y;
        }
        public x: number;
        public y: number;
    }
    const InvalidCoord: Coord = { x: -1, y: -1 };

    type RayData = number;

    let WriteLog = console.log;

    function GetSurroundingCoord(c: Coord, d: Direction): Coord {
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

    //Base end

    //////////////////////////////////////////////////

    //Grid begin

    enum TypeOfMirror {
        Unknow = 0,
        Left = 1,
        Right = 2,
        Top = 4,
        Bottom = 8,
        Slash = 16,
        BackSlash = 32
    };

    function TypeOfMirror2Direction(t: TypeOfMirror): Direction {
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

    function Direction2TypeOfMirror(d: Direction): TypeOfMirror {
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

    enum TypeOfCross {
        None,
        Slash,
        BackSlash
    };

    enum TypeOfGrid {
        Home,
        Normal
    };

    interface BorderMirrorType {
        whose: Player = Player.None;
    }

    interface CrossMirrorType {
        type: TypeOfCross = TypeOfCross.None;
        whose: Player = Player.None;
    }

    interface MirrorType {
        Left: BorderMirrorType;
        Right: BorderMirrorType;
        Top: BorderMirrorType;
        Bottom: BorderMirrorType;
        Cross: CrossMirrorType;
    }

    abstract class Grid {
        public const type: TypeOfGrid;
    }

    class GridHome extends Grid {
        constructor(Whose: Player = Player.None) {
            super();
            this.whose = Whose;
        }
        public const type: TypeOfGrid = TypeOfGrid.Home;
        protected whose: Player;
        get Whose(): Player { return this.whose; }
        protected outdir: Direction;
        get Outdir(): Direction { return this.outdir; }
        set Outdir(Outdir: Direction) { this.outdir = Outdir; }
    }

    class GridNormal extends Grid {
        constructor() {
            super();
        }
        public const type: TypeOfGrid = TypeOfGrid.Normal;
        protected mirror: MirrorType;
        get Mirror(): MirrorType { return this.mirror };

        public AddMirror(type: TypeOfMirror, whose: Player, checkExist: boolean = true): boolean {
            let mirrorExist: boolean = false;
            switch (type) {
                case TypeOfMirror.Left:
                    if (this.mirror.Left.whose != Player.None) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Left.whose = whose;
                    break;
                case TypeOfMirror.Right:
                    if (this.mirror.Right.whose != Player.None) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Right.whose = whose;
                    break;
                case TypeOfMirror.Top:
                    if (this.mirror.Top.whose != Player.None) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Top.whose = whose;
                    break;
                case TypeOfMirror.Bottom:
                    if (this.mirror.Bottom.whose != Player.None) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Bottom.whose = whose;
                    break;
                case TypeOfMirror.Slash:
                    if (this.mirror.Cross.type != TypeOfCross.None) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Cross.type = TypeOfCross.Slash;
                    this.mirror.Cross.whose = whose;
                    break;
                case TypeOfMirror.BackSlash:
                    if (this.mirror.Cross.type != TypeOfCross.None) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Cross.type = TypeOfCross.BackSlash;
                    this.mirror.Cross.whose = whose;
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

        }
    }
    //TODO: 
    //class Grid
    //class GridHome
    //class GridNormal

    //Grid end

    //////////////////////////////////////////////////

    //Map begin


    class Map {
        protected data: Grid[][];
        get Data(): Grid[][] { return this.data; }
        protected nx: number;
        get Nx(): number { return this.nx; }
        protected ny: number;
        get Ny(): number { return this.ny; }
        public init(XNum: number, YNum: number): boolean {
            this.nx = XNum;
            this.ny = YNum;
            this.data = new GridNormal[YNum][XNum];
            return true;
        }
        public GetGrid(x: number, y: number): Grid {
            return this.data[y][x];
        }
        public CreateHome(x: number, y: number, whose:Player) {
        if (!(GetHomeCoord(whose) == InvalidCoord)) {
            throw "There has been a grid of home!";
            return false;
        }
        PGrid & pGrid = GetPGrid(x, y);
        if (pGrid.GetPothis.er() != nullptr) {
            delete pGrid.GetPothis.er();
        }
        pGrid = new GridHome(whose);
        return true;
    }
    this.SetHomeDirection = function (x, y, d) {
        //#if BUILD_CHECKGRIDTYPE
        if (GetGrid(x, y).GetGridType() != GridType.Home) {
            throw "Cannot set direction at a non-home grid!";
            return false;
        }
        //#endif
        GridHome & h = dynamic_cast<GridHome &>(GetGrid(x, y));
        ret = true;
        for (this.i = 0; i < 4; i++) {
            this.idi = 0x1 << i;
            Direction idd = static_cast<Direction>(idi);
            if (idd != d) {
                WriteLog("SetSurGrid (%d , %d) d=%d\n", GetSurroundingCoord({ x, y }, idd).x, GetSurroundingCoord({ x, y }, idd).y, OppositeDirection(idd));
                Grid & gs = GetGrid(GetSurroundingCoord({ x, y }, idd));
                switch (gs.GetGridType()) {
                    case GridType.Home:
                        break;
                    case GridType.Normal:
                        GridNormal & gsn = dynamic_cast<GridNormal &>(gs);
                        ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(idd)), h.GetWhose(), false);
                        break;
                }
            }
        }
        return ret && h.SetDirection(d);
    }
    this.GetHomeCoord = function (whose) {
        for (DataType.iterator i = data.begin(); i < data.end(); ++i) {
            RowType.iterator iterHome = std.find_if((* i) -> begin(), (* i) -> end(), [whose](PGrid another) {
                if(GridType.Home == another -> GetGridType()) {
                if (dynamic_cast<GridHome &>(* another).GetWhose() == whose) {
                    return true;
                }
            }
            return false;
        });
        if (iterHome != (* i) -> end()) {
            return {
                static_cast<this.> (iterHome - (* i) -> begin()), static_cast<this.> (i - data.begin())
            };
        }
    }
    return InvalidCoord;
}
}






















}