#pragma once
#include "Base.h"

enum class MirrorType {
	Left,
	Right,
	Top,
	Bottom,
	Slash,
	BackSlash
};

enum class TypeOfCross {
	None,
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
	struct {
		struct {
			Player whose;
		}Left, Top, Right, Bottom;
		struct {
			TypeOfCross type;
			Player whose;
		}Cross;
	}Mirror;
public:
	virtual GridType GetGridType()override;
	bool AddMirror(int x, int y, MirrorType type, Player whose);
};


