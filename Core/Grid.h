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
	GridHome(Player _whose) : whose(_whose), direction(Direction::Unknow) {};
protected:
	Player whose = Player::None;
	Direction direction;
public:
	virtual GridType GetGridType()override;
	bool SetDirection(Direction _direction) {
		direction = _direction;
		return true;
	}
	Direction GetDirection() {
		return direction;
	}
};



class GridNormal :public Grid {
public:
	GridNormal() = default;
protected:
	struct {
		struct {
			Player whose = Player::None;
		}Left, Top, Right, Bottom;
		struct {
			TypeOfCross type = TypeOfCross::None;
			Player whose = Player::None;
		}Cross;
	}Mirror;
public:
	virtual GridType GetGridType()override;
	bool AddMirror(int x, int y, MirrorType type, Player whose);
};


class PGrid {
public:
	PGrid() :p(nullptr) {};
	PGrid(Grid* pGrid) :p(pGrid) {};
protected:
	Grid* p;
public:
	operator Grid* () {
		return p;
	}
	operator Grid& () {
		return *p;
	}
	Grid& operator*()const {
		return *p;
	}
	Grid* operator->()const { // 箭头符号作用下去的结果，箭头符号会继续作用下去
		return p;
	}
	Grid* GetPointer() {
		return p;
	}
};

