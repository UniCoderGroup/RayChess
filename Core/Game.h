#pragma once
#include "Map.h"
template <int XNum, int YNum>
class Game {
public:
	Game() = default;
protected:
	Map<XNum, YNum> map;
public:
	Grid& GetGrid(int x, int y) {
		return map.GetGrid(x, y);
	}
	bool init() {
		return map.init();
	}
	bool PlaceHome(int x, int y, Player whose) {
		return map.PlaceHome(x, y, whose);
	}
	Player WhoWins() {
		return Player::None;
	}
	bool AddMirror(int x, int y, MirrorType type, Player whose) {
		GridType t = GetGrid(x, y).GetGridType();
		switch (t) {
			case GridType::Home:
				//Error: can not place mirror on home
				throw std::exception("Can not place mirror on home!");
				return false;
			case GridType::Normal:
				return static_cast<GridNormal&>(GetGrid(x, y)).AddMirror(x, y, type, whose);
		}
		return true;
	}
};


