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

    function GetRelativePlayer(PlayerThis: Player, PlayerThat: Player): RelativePlayer {
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
        constructor(X: number = -1, Y: number = -1) {
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


    namespace TestOutput {
        class TestMirror {
            constructor(Data: TestData, Whose: RelativePlayer) {
                this.data = Data;
                this.whose = Whose
            }
            protected data: TestData;
            protected whose: RelativePlayer;
        }
        class TestMirrorBorder extends TestMirror {
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
        };
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
        };
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
        };
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
        };
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
        };
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
        };
        class TestArea {
            constructor(Data: TestData) {
                this.data = Data;
            }
            protected data: TestData;
            protected in: boolean = false;
            protected out: boolean = false;
            public abstract Inward(): boolean;
            public abstract Outward(): boolean;
        };
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
        };
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
        };
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
        };
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
        };
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
        };
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
        };
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
        };
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
        };
        export class TestData {
            constructor(p: Player, m: MirrorType) {
                this.LeftMirror = new TestMirrorLeft(this, GetRelativePlayer(p, m.Left.whose));
                this.RightMirror = new TestMirrorRight(this, GetRelativePlayer(p, m.Right.whose));
                this.TopMirror = new TestMirrorTop(this, GetRelativePlayer(p, m.Top.whose));
                this.BottomMirror = new TestMirrorBottom(this, GetRelativePlayer(p, m.Bottom.whose));
                this.CrossMirror = new TestMirrorCross(this, GetRelativePlayer(p, m.Cross.whose), m.Cross.type);
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
        //    public CreateHome(x: number, y: number, whose: Player) {
        //        if (!(GetHomeCoord(whose) == InvalidCoord)) {
        //            throw "There has been a grid of home!";
        //            return false;
        //        }
        //        PGrid & pGrid = GetPGrid(x, y);
        //        if (pGrid.GetPothis.er() != nullptr) {
        //            delete pGrid.GetPothis.er();
        //        }
        //        pGrid = new GridHome(whose);
        //        return true;
        //    }
        //this.SetHomeDirection = function (x, y, d) {
        //    //#if BUILD_CHECKGRIDTYPE
        //    if (GetGrid(x, y).GetGridType() != GridType.Home) {
        //        throw "Cannot set direction at a non-home grid!";
        //        return false;
        //    }
        //    //#endif
        //    GridHome & h = dynamic_cast<GridHome &>(GetGrid(x, y));
        //    ret = true;
        //    for (this.i = 0; i < 4; i++) {
        //        this.idi = 0x1 << i;
        //        Direction idd = static_cast<Direction>(idi);
        //        if (idd != d) {
        //            WriteLog("SetSurGrid (%d , %d) d=%d\n", GetSurroundingCoord({ x, y }, idd).x, GetSurroundingCoord({ x, y }, idd).y, OppositeDirection(idd));
        //            Grid & gs = GetGrid(GetSurroundingCoord({ x, y }, idd));
        //            switch (gs.GetGridType()) {
        //                case GridType.Home:
        //                    break;
        //                case GridType.Normal:
        //                    GridNormal & gsn = dynamic_cast<GridNormal &>(gs);
        //                    ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(idd)), h.GetWhose(), false);
        //                    break;
        //            }
        //        }
        //    }
        //    return ret && h.SetDirection(d);
        //}
        GetHomeCoord(whose: Player): Coord {
            let c: Coord = new Coord;
            this.data.findIndex(
                function (value: Grid[], index: number, obj: Grid[][]): boolean {
                    if (value.findIndex(
                        function (value: Grid, index: number, obj: Grid[]): boolean {
                            if (value.type == TypeOfGrid.Home) {
                                let home: GridHome = value;
                                //???????
                                if (home.Whose == whose) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    ) != -1) {
                        return true;
                    } else {
                        return false;
                    }
                }
            );
            //unfinished!!!!!!
            return c;
        }
}






















}