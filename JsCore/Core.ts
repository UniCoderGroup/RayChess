
// Base begin

var Player = {
    None: 0,
    P1: 1,
    P2: 2
};

var RelativePlayer = {
    None: 0,
    This: 1,
    Another: -1
}

var Direction = {
    Unknow: 0,
    Left: 1,
    Right: 2,
    Top: 4,
    Bottom: 8
};

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

function Coord(X = -1, Y = -1) {
    this.x = X;
    this.y = Y;
}
const InvalidCoord = new Coord(-1, -1);

var WriteLog = console.log;

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
            return InvalidCoord;
    }
}

//Base end

//////////////////////////////////////////////////

//Grid begin

var TypeOfMirror = {
    Unknow: 0,
    Left: 1,
    Right: 2,
    Top: 3,
    Bottom: 4,
    Slash: 5,
    BackSlash: 6
};

function TypeOfMirror2Direction(t) {
    switch (t) {
        case TypeOfMirror.Left:
            return Direction.Left;
            break;
        case TypeOfMirror.Right:
            return Direction.Right;
            break;
        case TypeOfMirror.Top:
            return Direction.Top;
            break;
        case TypeOfMirror.Bottom:
            return Direction.Bottom;
            break;
        default:
            return Direction.Unknow;
    }
}

function Direction2TypeOfMirror(d) {
    switch (d) {
        case Direction.Left:
            return TypeOfMirror.Left;
            break;
        case Direction.Right:
            return TypeOfMirror.Right;
            break;
        case Direction.Top:
            return TypeOfMirror.Top;
            break;
        case Direction.Bottom:
            return TypeOfMirror.Bottom;
            break;
        default:
            return TypeOfMirror.Unknow;
    }
}

var TypeOfCross = {
    None: 0,
    Slash: 1,
    BackSlash: 2
};

var GridType = {
    Home: 1,
    Normal: 2
};

function Mirror() {
    this.Left.whose = Player.None;
    this.Right.whose = Player.None;
    this.Top.whose = Player.None;
    this.Bottom.whose = Player.None;
    this.Cross.type = TypeOfCross.None;
    this.Cross.whose = Player.None;
}

//TODO: 
//class Grid
//class GridHome
//class GridNormal

//Grid end

//////////////////////////////////////////////////

//Map begin


function Map() {
    this.data;
    this.nx;
    this.ny;
    this.init = function (XNum, YNum) {
        this.nx = XNum;
        this.ny = YNum;
        this.data = new Array;
        let row = new Array;
        row[0, XNum] = new Grid;
        this.data[0, YNum] = new row;

        //let i = 0;
        //for (RowType *& prow : data) {
        //    prow = new RowType;
        //    RowType & row = * prow;
        //    row.resize(XNum);
        //    for (PGrid & grid : row) {
        //        grid = new GridNormal;
        //    }
        //    i++;
        //}
        return true;
    }
    this.GetData = function () {
        return data;
    }
    this.GetXNum = function () {
        return this.nx;
    }
    this.GetYNum = function () {
        return this.ny;
    }
    this.GetGrid = function (x, y) {
        return data[y][x];
    }
    this.GetGrid = function (coord) {
        return GetGrid(coord.x, coord.y);
    }
    this.CreateHome = function (x, y, whose) {
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
        if (GetGrid(x, y).GetGridType() != GridType:: Home) {
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
                    case GridType:: Home:
                        break;
                    case GridType:: Normal:
                        GridNormal & gsn = dynamic_cast<GridNormal &>(gs);
                        ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(idd)), h.GetWhose(), false);
                        break;
                }
            }
        }
        return ret && h.SetDirection(d);
    }
    this.GetHomeCoord = function (whose) {
        for (DataType:: iterator i = data.begin(); i < data.end(); ++i) {
            RowType:: iterator iterHome = std:: find_if((* i) -> begin(), (* i) -> end(), [whose](PGrid another) {
                if(GridType:: Home == another -> GetGridType()) {
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