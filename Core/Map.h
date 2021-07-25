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
	DataType& GetData() {
		return data;
	}
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
	int GetXNum() {
		return nx;
	}
	int GetYNum() {
		return ny;
	}
	PGrid& GetPGrid(int x, int y) {
#if BUILD_CHECKRANGE
		if (x < 0 || x >= nx || y < 0 || y >= ny) {
			throw std::exception("The coordinate of a grid is out of range!");
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
	GridHome& CreateHome(int x, int y, Player whose) {
		if (!(GetHomeCoord(whose) == EOFCoord)) {
			throw std::exception("There has been a grid of home!");
			return *(static_cast<GridHome*>(0)); // I think I'm wrong.
		}
		PGrid& pGrid = GetPGrid(x, y);
		if (pGrid.GetPointer() != nullptr) {
			delete pGrid.GetPointer();
		}
		pGrid = new GridHome(whose);
		return *dynamic_cast<GridHome*>(pGrid.GetPointer());
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
		return EOFCoord;
	}
};