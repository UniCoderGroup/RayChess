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
	Player GetWhose() {
		return whose;
	}
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
	decltype(Mirror)& GetMirror() {
		return Mirror;
	}
	RayData TestOutput(Direction d, Player p) {
#pragma warning unfinished!
		RayData o = 0;
		switch (d) {
			case Direction::Left:
				if (Mirror.Right.whose != Player::None) {
					if (Mirror.Right.whose == p) {
						o &= static_cast<RayData>(Direction::Right);//LR
					}
					else if (Mirror.Right.whose != p) {
						o &= static_cast<RayData>(Direction::Right);//R
						goto end;
					}
				}
				if (Mirror.Cross.type != TypeOfCross::None) {
					switch (Mirror.Cross.type) {
						case TypeOfCross::Slash:
							if (Mirror.Cross.whose != Player::None) {
								if (Mirror.Cross.whose == p) {
									if (Mirror.Bottom.whose != Player::None) {
										if (Mirror.Bottom.whose == p) {
											o &= static_cast<RayData>(Direction::Bottom);
										}
										else if (Mirror.Bottom.whose != p) {
											o &= static_cast<RayData>(Direction::Right);
											if (Mirror.Top.whose != Player::None) {
												if (Mirror.Top.whose == p) {
													o &= static_cast<RayData>(Direction::Top);

												}
											}
											o &= static_cast<RayData>(Direction::Top);
											goto end;
										}
									}
									else {
										o &= static_cast<RayData>(Direction::Bottom);
									}
								}
								else if (Mirror.Right.whose != p) {
									o &= static_cast<RayData>(Direction::Bottom);

								}
							}
							break;
						case TypeOfCross::BackSlash:
							if (Mirror.Cross.whose != Player::None) {
								if (Mirror.Cross.whose == p) {
									o &= static_cast<RayData>(Direction::Top);
								}
								else if (Mirror.Right.whose != p) {
									o &= static_cast<RayData>(Direction::Top);
									goto end;
								}
							}
							break;

					}
				}
				break;
		}
	end:
		return o;
	} 
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

