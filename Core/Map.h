#pragma once

#include <vector>
#include "Grid.h"


class Map {
public:
	Map() = default;
	Map(int XNum, int YNum) : data(YNum, RowType(XNum, new GridNormal)) {
		x = XNum;
		y = YNum;
	}
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
		logger().log("init map: x=%d y=%d \n", XNum, YNum);
		logger().log("init map: [COL] resize=%d (&data=%p)\n", YNum, &data);
		data.resize(YNum);
		logger().log("init map: [COL]   -->size=%d (&data=%p)\n", data.size(), &data);
		int i = 0;
		for (RowType& row : data) {
			logger().log("init map: [ROW %d] resize=%d (&row=%p)\n", i, XNum, &row);
			row.resize(XNum);
			for (Grid* grid : row) {
				grid = new GridNormal;
			}
			logger().log("init map: [ROW %d]   -->size=%d \n", i, row.size());
			i++;
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
		logger().log("GetPGrid %d %d , sizex=%d,sizey=%d (&row=%p)\n", x, y, data.size(), data[y].size(), &data[y]);
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
		return *dynamic_cast<GridHome*>(pGrid.GetPointer());
	}
	Coord GetHomeCoord(Player whose) {
		for (DataType::iterator i = data.begin(); i < data.end(); ++i) {
			RowType::iterator iterHome = std::find_if(i->begin(), i->end(), [whose](PGrid another) {
				if (GridType::Home == another->GetGridType()) {
					return true;
				}
				return false;
				});
			if (iterHome != i->end()) {
				return { static_cast<int>(iterHome - i->begin()),static_cast<int>(i - data.begin()) };
			}
		}
		throw std::exception("Home not found");
		return Coord();
	}
};