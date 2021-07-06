#pragma once
#include <vector>
#include <array>
#include <memory>

enum class Player {
	None,
	P1,
	P2
};

enum class Direction {
	Left = 1,
	Right = 2,
	Top = 4,
	Bottom = 8
};

enum class MirrorType {
	Left,
	Right,
	Top,
	Bottom,
	Slash,
	BackSlash
};

enum class GridType {
	Home,
	Normal
};

class ChessGrid {
public:
	ChessGrid() = default;
public:
	virtual GridType GetGridType() = 0;
};

class ChessGridHome :public ChessGrid {
public:
	ChessGridHome() = default;
protected:
	Player whose = Player::None;
	Direction direction;
public:
	virtual GridType GetGridType()override;
};



class ChessGridNormal :public ChessGrid {
protected:
	struct{
		struct {
			Player whose;
		}Left, Top, Right, Bottom;
		struct {
			enum class PlaceOfCross {
				None,
				LeftTop_RightBottom,
				LeftBottom_RightTop
			}Type;
			Player whose;
		}Cross;
	}Mirror;
public:
	virtual GridType GetGridType()override;
	bool AddMirror(int x, int y, MirrorType type, Player whose);
};


template <int XNum, int YNum>
class ChessMap {
public:
	ChessMap() = default;
protected:
	using RowType = std::array<ChessGrid*, XNum>;
	using DataType = std::array<RowType, YNum>;
	DataType data;
public:
	bool init();
	ChessGrid& GetGrid(int x, int y);
};


class ChessData {
public:
	ChessData() = default;
public:
	virtual bool init() = 0;
	virtual Player WhoWins() = 0;
	virtual bool AddMirror(int col, int row, Player whose) = 0;
};

template <int XNum, int YNum>
class ChessDataImpl :public ChessData {
public:
	ChessDataImpl() = default;
protected:
	ChessMap<XNum, YNum> map;
public:
	virtual ChessGrid& GetGrid(int x, int y);
	virtual bool init() override;
	virtual Player WhoWins() override;
	virtual bool AddMirror(int x, int y, MirrorType type, Player whose) override;
};

int main() {
	ChessDataImpl<3, 3> c;
}