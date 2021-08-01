#pragma once

#include <vector>
#include "Grid.h"


class Map {
public:
	Map() = default;
	/*Map(int XNum, int YNum) : data(YNum, new RowType(XNum, new GridNormal)) {
		nx = XNum;
		ny = YNum;
	}*/
public:
	using RowType = std::vector<PGrid>;
	using DataType = std::vector<RowType*>;
protected:
	DataType data;
	int nx = 0;
	int ny = 0;
public:
	bool init(int XNum, int YNum) {
		nx = XNum;
		ny = YNum;
		data.resize(YNum);
		int i = 0;
		for (RowType*& prow : data) {
			prow = new RowType;
			RowType& row = *prow;
			row.resize(XNum);
			for (PGrid& grid : row) {
				grid = new GridNormal;
			}
			i++;
		}
		return true;
	}
	DataType& GetData() {
		return data;
	}
	int GetXNum() {
		return nx;
	}
	int GetYNum() {
		return ny;
	}
	PGrid& GetPGrid(int x, int y) {
#if BUILD_CHECKRANGE
		if (x < 0 || x >= nx || y < 0 || y >= ny) {
			throw Exception("The coordinate of a grid is out of range!");
			return *(static_cast<PGrid*>(0)); // I think I'm wrong.
		}
#endif
		return (*data[y])[x];
	}
	Grid& GetGrid(int x, int y) {
		return *GetPGrid(x, y);
	}
	Grid& GetGrid(const Coord& coord) {
		return GetGrid(coord.x, coord.y);
	}
	bool CreateHome(int x, int y, Player whose) {
		if (!(GetHomeCoord(whose) == InvalidCoord)) {
			throw Exception("There has been a grid of home!");
			return false;
		}
		PGrid& pGrid = GetPGrid(x, y);
		if (pGrid.GetPointer() != nullptr) {
			delete pGrid.GetPointer();
		}
		pGrid = new GridHome(whose);
		return true;
	}
	bool SetHomeDirection(int x, int y, Direction d) {
#if BUILD_CHECKGRIDTYPE
		if (GetGrid(x, y).GetGridType() != GridType::Home) {
			throw Exception("Cannot set direction at a non-home grid!");
			return false;
		}
#endif
		GridHome& h = dynamic_cast<GridHome&>(GetGrid(x, y));
		bool ret = true;
		for (int i = 0; i < 4; i++) {
			int idi = 0x1 << i;
			Direction idd = static_cast<Direction>(idi);
			if (idd!=d) {
				WriteLog("SetSurGrid (%d , %d) d=%d\n", GetSurroundingCoord({ x,y }, idd).x, GetSurroundingCoord({ x,y }, idd).y, OppositeDirection(idd));
				Grid& gs = GetGrid(GetSurroundingCoord({ x,y }, idd));
				switch (gs.GetGridType()) {
					case GridType::Home:
						break;
					case GridType::Normal:
						GridNormal& gsn = dynamic_cast<GridNormal&>(gs);
						ret = ret && gsn.AddMirror(Direction2TypeOfMirror(OppositeDirection(idd)), h.GetWhose(), false);
						break;
				}
			}
		}
		return ret && h.SetDirection(d);
	}
	Coord GetHomeCoord(Player whose) {
		for (DataType::iterator i = data.begin(); i < data.end(); ++i) {
			RowType::iterator iterHome = std::find_if((*i)->begin(), (*i)->end(), [whose](PGrid another) {
				if (GridType::Home == another->GetGridType()) {
					if (dynamic_cast<GridHome&>(*another).GetWhose() == whose) {
						return true;
					}
				}
				return false;
				});
			if (iterHome != (*i)->end()) {
				return { static_cast<int>(iterHome - (*i)->begin()),static_cast<int>(i - data.begin()) };
			}
		}
		return InvalidCoord;
	}
};