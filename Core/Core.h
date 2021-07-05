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
	Bottom = 8,
};

class ChessGrid {
public:
	ChessGrid() = default;
};

class ChessGridHome :public ChessGrid {
public:
	ChessGridHome() = default;
protected:
	Player whose = Player::None;
	Direction direction;
};

class ChessGridNormal :public ChessGrid {
public:
	struct{
		struct{
			Player whose;
		}Left,Top,Right,Bottom;
		struct{
			enum class CrossType {
				None,
				LeftTop_RightBottom,
				LeftBottom_RightTop
			}Type;
			Player whose;
		}Cross;
	}Mirror;
};

class ChessData {
public:
	ChessData() = default;
public:
	virtual bool init() = 0;
	virtual Player WhoWins() = 0;
	virtual bool AddMirror(int col, int row, Player whose) = 0;
};

template <int ColNum, int RowNum>
class ChessDataImpl :public ChessData {
protected:
	using RowType = std::array<ChessGrid*, ColNum>;
	using DataType = std::array<RowType, RowNum>;
	DataType data;
public:
	virtual bool init() override;
	virtual Player WhoWins() override;
	virtual bool AddMirror(int col, int row, Player whose) override;
};

int main() {
	ChessDataImpl<3, 3> c;
}