var RayChess;
(function (RayChess) {
    // Base begin
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
    ;
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
    class Coord {
        constructor(X = -1, Y = -1) {
            this.x = X;
            this.y = Y;
        }
    }
    const InvalidCoord = { x: -1, y: -1 };
    let WriteLog = console.log;
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
                return InvalidCoord;
        }
    }
    //Base end
    //////////////////////////////////////////////////
    //Grid begin
    let TypeOfMirror;
    (function (TypeOfMirror) {
        TypeOfMirror[TypeOfMirror["Unknow"] = 0] = "Unknow";
        TypeOfMirror[TypeOfMirror["Left"] = 1] = "Left";
        TypeOfMirror[TypeOfMirror["Right"] = 2] = "Right";
        TypeOfMirror[TypeOfMirror["Top"] = 4] = "Top";
        TypeOfMirror[TypeOfMirror["Bottom"] = 8] = "Bottom";
        TypeOfMirror[TypeOfMirror["Slash"] = 16] = "Slash";
        TypeOfMirror[TypeOfMirror["BackSlash"] = 32] = "BackSlash";
    })(TypeOfMirror || (TypeOfMirror = {}));
    ;
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
    let TypeOfCross;
    (function (TypeOfCross) {
        TypeOfCross[TypeOfCross["None"] = 0] = "None";
        TypeOfCross[TypeOfCross["Slash"] = 1] = "Slash";
        TypeOfCross[TypeOfCross["BackSlash"] = 2] = "BackSlash";
    })(TypeOfCross || (TypeOfCross = {}));
    ;
    let TypeOfGrid;
    (function (TypeOfGrid) {
        TypeOfGrid[TypeOfGrid["Home"] = 0] = "Home";
        TypeOfGrid[TypeOfGrid["Normal"] = 1] = "Normal";
    })(TypeOfGrid || (TypeOfGrid = {}));
    ;
    class BorderMirrorType {
        constructor(Whose = 0 /* None */) {
            this.whose = Whose;
        }
    }
    class CrossMirrorType {
        constructor(Type = TypeOfCross.None, Whose = 0 /* None */) {
            this.type = Type;
            this.whose = Whose;
        }
    }
    class Grid {
    }
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
    let TestOutput;
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
        ;
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
        ;
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
        ;
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
        ;
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
        ;
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
        ;
        class TestArea {
            constructor(Data) {
                this.in = false;
                this.out = false;
                this.data = Data;
            }
        }
        ;
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
        ;
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
        ;
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
        ;
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
        ;
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
        ;
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
        ;
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
        ;
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
        ;
        class TestData {
            constructor(p, m) {
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
        }
        get Mirror() { return this.mirror; }
        ;
        AddMirror(type, whose, checkExist = true) {
            let mirrorExist = false;
            switch (type) {
                case TypeOfMirror.Left:
                    if (this.mirror.Left.whose != 0 /* None */) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Left.whose = whose;
                    break;
                case TypeOfMirror.Right:
                    if (this.mirror.Right.whose != 0 /* None */) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Right.whose = whose;
                    break;
                case TypeOfMirror.Top:
                    if (this.mirror.Top.whose != 0 /* None */) {
                        mirrorExist = true;
                        break;
                    }
                    this.mirror.Top.whose = whose;
                    break;
                case TypeOfMirror.Bottom:
                    if (this.mirror.Bottom.whose != 0 /* None */) {
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
    //Grid end
    //////////////////////////////////////////////////
    //Map begin
    class Map {
        get Data() { return this.data; }
        get Nx() { return this.nx; }
        get Ny() { return this.ny; }
        init(XNum, YNum) {
            this.nx = XNum;
            this.ny = YNum;
            this.data = new GridNormal[YNum][XNum];
            return true;
        }
        GetGrid(x, y) {
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
        GetHomeCoord(whose) {
            let c = new Coord;
            this.data.findIndex(function (value, index, obj) {
                if (value.findIndex(function (value, index, obj) {
                    if (value.type == TypeOfGrid.Home) {
                        let home = value;
                        if (home.Whose == whose) {
                            return true;
                        }
                    }
                    return false;
                }) != -1) {
                    return true;
                }
                else {
                    return false;
                }
            });
            //unfinished!!!!!!
            return c;
        }
    }
})(RayChess || (RayChess = {}));
console.log("hi");
//# sourceMappingURL=app.js.map