#pragma once

#include "Map.h"

class Game {
public:
	Game() = default;
	Game(int XNum, int YNum) :map(XNum, YNum) {

	}
protected:
	Map map;
public:
	Grid& GetGrid(int x, int y) {
		return map.GetGrid(x, y);
	}
	Grid& GetGrid(const Coord& coord) {
		return map.GetGrid(coord);
	}
	bool init(int XNum, int YNum) {
		return map.init(XNum, YNum);
	}
	GridHome& CreateHome(int x, int y, Player whose) {
		return map.CreateHome(x, y, whose);
	}
	class SearchData {
	public:
		SearchData(Game& game) : g(game) {
			XNum = g.map.GetXNum();
			YNum = g.map.GetYNum();
			data.resize(YNum);
			for (std::vector<RayData> row : data) {
				row.resize(XNum);
			}
		}
	public:
		RayData TestRange(int x, int y) {
			RayData r = 0;
			if (!(x - 1 < 0)) {
				r &= static_cast<RayData>(Direction::Left);
			}
			if (!(x + 1 >= XNum)) {
				r &= static_cast<RayData>(Direction::Right);
			}
			if (!(y - 1 < 0)) {
				r &= static_cast<RayData>(Direction::Top);
			}
			if (!(y + 1 >= YNum)) {
				r &= static_cast<RayData>(Direction::Bottom);
			}
			return r;
		}
		RayData GetRayData(int x, int y) {
			return data[y][x];
		}
	protected:
		int XNum = 0;
		int YNum = 0;
		Game& g;
		std::vector<std::vector<RayData>> data;
	};
	bool CheckNode(SearchData& s, int x, int y, Player p, Direction d) {
		Grid& g = map.GetGrid(x, y);
		if (g.GetGridType() == GridType::Home) {
			GridHome gh = dynamic_cast<GridHome&>(g);
			if (gh.GetWhose() != p && gh.GetWhose() != Player::None) {
				return true;
			}
		}
		else if (g.GetGridType() == GridType::Normal) {
			GridNormal& gn = dynamic_cast<GridNormal&>(g);
			RayData o = gn.TestOutput(d, p);
			RayData r = s.GetRayData(x, y);
			RayData b = s.TestRange(x, y);
			if (r & static_cast<int>(Direction::Left)
				&& b & static_cast<int>(Direction::Left)) {
				if (CheckNode(s, x - 1, y, p, Direction::Left)) {
					return true;
				}
			}
			if (r & static_cast<int>(Direction::Right)
				&& b & static_cast<int>(Direction::Right)) {
				if (CheckNode(s, x + 1, y, p, Direction::Right)) {
					return true;
				}
			}
			if (r & static_cast<int>(Direction::Top)
				&& b & static_cast<int>(Direction::Top)) {
				if (CheckNode(s, x, y - 1, p, Direction::Top)) {
					return true;
				}
			}
			if (r & static_cast<int>(Direction::Bottom)
				&& b & static_cast<int>(Direction::Bottom)) {
				if (CheckNode(s, x, y + 1, p, Direction::Bottom)) {
					return true;
				}
			}
		}
	}
	bool CheckIfWin(Player p) {
		Coord cHome = map.GetHomeCoord(p);
		GridHome& gHome = dynamic_cast<GridHome&>(map.GetGrid(cHome));
		SearchData s(*this);
		int x = cHome.x;
		int y = cHome.y;
		RayData b = s.TestRange(x, y);
		if (b & static_cast<int>(Direction::Left)) {
			if (CheckNode(s, x - 1, y, p, Direction::Left)) {
				return true;
			}
		}
		if (b & static_cast<int>(Direction::Right)) {
			if (CheckNode(s, x + 1, y, p, Direction::Right)) {
				return true;
			}
		}
		if (b & static_cast<int>(Direction::Top)) {
			if (CheckNode(s, x, y - 1, p, Direction::Top)) {
				return true;
			}
		}
		if (b & static_cast<int>(Direction::Bottom)) {
			if (CheckNode(s, x, y + 1, p, Direction::Bottom)) {
				return true;
			}
		}
	}
	Player WhoWins() {
		if (CheckIfWin(Player::P1)) {
			if (CheckIfWin(Player::P2)) {
				throw std::exception("Two winners one time!");
			}
			else {
				return Player::P1;
			}
		}
		else if (CheckIfWin(Player::P2)) {
			return Player::P2;
		}
		return Player::None;
	}
	bool AddMirror(int x, int y, TypeOfMirror type, Player whose) {
		GridType t = GetGrid(x, y).GetGridType();
		switch (t) {
			case GridType::Home:
				//Error: can not place mirror on home
				throw std::exception("Can not place mirror on home!");
				return false;
			case GridType::Normal:
				return dynamic_cast<GridNormal&>(GetGrid(x, y)).AddMirror(x, y, type, whose);
		}
		return true;
	}
};


