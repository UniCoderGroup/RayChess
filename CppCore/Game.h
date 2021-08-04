#pragma once

#include "Map.h"

class Game {
public:
	Game() = default;
	//Game(int XNum, int YNum) :map(XNum, YNum) {	};
protected:
	Map map;
public:
	Map& GetMap() {
		return map;
	}
	Grid& GetGrid(int x, int y) {
		return map.GetGrid(x, y);
	}
	Grid& GetGrid(const Coord& coord) {
		return map.GetGrid(coord);
	}
	bool init(int XNum, int YNum) {
		return map.init(XNum, YNum);
	}
	bool CreateHome(int x, int y, Player whose) {
		return map.CreateHome(x, y, whose);
	}
	bool SetHomeDirection(int x, int y, Direction d) {
		return map.SetHomeDirection(x, y, d);
	}
	class SearchData { //这个class用来临时存储搜索所用的data
	public:
		SearchData(Game& game) : g(game) {
			XNum = g.map.GetXNum();
			YNum = g.map.GetYNum();
			data.resize(YNum);
			for (auto& row : data) {
				row = new std::vector<RayData>;
				row->resize(XNum);
			}
		}
	public:
		RayData TestSurrounding(int x, int y) {
			RayData r = 0;
			if (!(x - 1 < 0)) {
				r |= static_cast<RayData>(Direction::Left);
			}
			if (!(x + 1 >= XNum)) {
				r |= static_cast<RayData>(Direction::Right);
			}
			if (!(y - 1 < 0)) {
				r |= static_cast<RayData>(Direction::Top);
			}
			if (!(y + 1 >= YNum)) {
				r |= static_cast<RayData>(Direction::Bottom);
			}
			return r;
		}
		RayData& GetRayData(int x, int y) {
			return (*data[y])[x];
		}
	protected:
		int XNum = 0;
		int YNum = 0;
		Game& g;
		std::vector<std::vector<RayData>*> data;
	};
	//std::pair<int, int> stk[1000005];
	//int top;
	//                  数据          坐标      玩家     进入方向
	bool CheckNode(SearchData& s, int x, int y, Player p, Direction d) { //查找格子，关键
		//WriteLog("CheckNode at (\t%d\t%d\t),\tdirection = \t%d\n", x, y, d);
		Grid& g = map.GetGrid(x, y);//GetGrid - 获取x,y的格子
		//stk[++top] = std::make_pair(x,y);
		if (g.GetGridType() == TypeOfGrid::Home) {//如果是基地类型
			GridHome& gh = dynamic_cast<GridHome&>(g);
			Player wh = gh.GetWhose();
			if (wh == p||wh==Player::None) {
				return false;
			}
			else {
				if (gh.GetDirection() == OppositeDirection(d)) {
					return true;
				}
			}
		}
		else if (g.GetGridType() == TypeOfGrid::Normal) {//如果是一般类型
			GridNormal& gn = dynamic_cast<GridNormal&>(g);
			RayData b = s.TestSurrounding(x, y);//未出界的方向 - 这个放心
			RayData o = gn.TestOutput(d, p);//当输入方向为d时，格子可以输出的光线方向 - 这个很难写，但我测试了有效 （格子里的事情你不用管，交给这个函数）
			RayData r = s.GetRayData(x, y);//当前格子的输出方向 - 即已经搜索过的方向
			//std::map<Direction, int> NextDirection;
			for (int i = 0; i < 4; i++) {
				int di = 0x1 << i;
				Direction dd = static_cast<Direction>(di);
				/*NextDirection[static_cast<Direction>(di)]*/
				bool iftest =
					di & o &&
					di & b &&
					!(di & r);
				if (iftest) {
					s.GetRayData(x, y) |= di;
					Coord c = GetSurroundingCoord({ x,y }, dd);
					if (CheckNode(s, c.x, c.y, p, dd)) {
						return true;
					}
				}
			}
			/*if (NextDirection[Direction::Left]) {
				if (CheckNode(s, x - 1, y, p, Direction::Left)) {
					return true;
				}
			}
			if (NextDirection[Direction::Right]) {
				if (CheckNode(s, x + 1, y, p, Direction::Right)) {
					return true;
				}
			}
			if (NextDirection[Direction::Top]) {
				if (CheckNode(s, x, y - 1, p, Direction::Top)) {
					return true;
				}
			}
			if (NextDirection[Direction::Bottom]) {
				if (CheckNode(s, x, y + 1, p, Direction::Bottom)) {
					return true;
				}
			}*/
		}
		//--top;
		return false;
	}
	bool CheckIfWin(Player p) { //关键 判断谁获胜
		Coord cHome = map.GetHomeCoord(p);
		GridHome& gHome = dynamic_cast<GridHome&>(map.GetGrid(cHome));
		SearchData s(*this);
		int x = cHome.x;
		int y = cHome.y;
		RayData b = s.TestSurrounding(x, y);
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
		return false;
	}
	Player WhoWins() {
		if (CheckIfWin(Player::P1)) {
			if (CheckIfWin(Player::P2)) {
				throw Exception("Two winners one time!");
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
		Grid& g = GetGrid(x, y);
		TypeOfGrid t = g.GetGridType();
		switch (t) {
			case TypeOfGrid::Home:
				//Error: can not place mirror on home
				throw Exception("Can not place mirror on home!");
				return false;
			case TypeOfGrid::Normal:
				GridNormal& gn = dynamic_cast<GridNormal&>(g);
				Direction d = TypeOfMirror2Direction(type);
				if (d != Direction::Unknow) {
					Grid& gs = GetGrid(GetSurroundingCoord({ x,y }, d));
					bool ret = true;
					switch (gs.GetGridType()) {
						case TypeOfGrid::Home:
							break;
						case TypeOfGrid::Normal:
							GridNormal& gsn = dynamic_cast<GridNormal&>(gs);
							ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(d)), whose, false);
							break;
					}
					return ret && gn.AddMirror(type, whose);
				}
				else {
					return gn.AddMirror(type, whose);
				}
		}
		return true;
	}
};


