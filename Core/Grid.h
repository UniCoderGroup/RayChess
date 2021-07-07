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


class Grid {
public:
	Grid() = default;
public:
	virtual GridType GetGridType() = 0;
};

class GridHome :public Grid {
public:
	GridHome() = default;
protected:
	Player whose = Player::None;
	Direction direction;
public:
	virtual GridType GetGridType()override;
};



class GridNormal :public Grid {
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


