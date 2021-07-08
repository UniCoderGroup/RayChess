#pragma once

#include <vector>
#include "Base.h"
#include "Grid.h"


class Map {
public:
	Map() = default;
protected:
	using RowType = std::vector<PGrid>;
	using DataType = std::vector<RowType>;
	DataType data;
	int x = 0;
	int y = 0;
public:
	bool init(int XNum, int YNum) {
		x = XNum;
		y = YNum;
		data.resize(YNum);
		for (RowType row : data) {
			row.resize(XNum);
			for (Grid* grid : row) {
				grid = new GridNormal;
			}
		}
		return true;
	}
	int GetXNum() {
		return x;
	}
	int GetYNum() {
		return y;
	}
	PGrid& GetPGrid(int x, int y) {
		return data[y][x];
	}
	Grid& GetGrid(int x, int y) {
		return *GetPGrid(x, y);
	}
	Grid& GetGrid(const Coord& coord) {
		return GetGrid(coord.x, coord.y);
	}
	GridHome& CreateHome(int x, int y, Player whose) {
		PGrid pGrid = GetPGrid(x, y);
		if (pGrid != nullptr) {
			delete pGrid;
		}
		pGrid = new GridHome(whose);
		return *static_cast<GridHome*>(pGrid.GetPointer());
	}
	Coord GetHomeCoord(Player whose) {
		for (DataType::iterator i = data.begin(); i < data.end(); ++i) {
			RowType::iterator iterHome = std::find_if(i->begin(), i->end(), [whose](PGrid* another) {
					if (GridType::Home == (*another)->GetGridType()) {
						return true;
					}
					return false;
				});
			if (iterHome != i->end()) {
				return { iterHome - i->begin() , i - data.begin() };
			}
		}
		throw std::exception("Home not found");
		return Coord();
	}
};

