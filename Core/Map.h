#pragma once

#include <array>
#include "Base.h"
#include "Grid.h"

template <int XNum, int YNum>
class Map {
public:
	Map() = default;
protected:
	using RowType = std::array<Grid*, XNum>;
	using DataType = std::array<RowType, YNum>;
	DataType data;
public:
	bool init() {
		for (RowType row : data) {
			for (Grid* grid : row) {
				// TODO: init every grid
			}
		}
		return true;
	}
	Grid*& GetPGrid(int x, int y) {
		return data[y][x];
	}
	Grid& GetGrid(int x, int y) {
		return *GetPGrid(x, y);
	}
	bool PlaceHome(int x, int y, Player whose) {
		Grid*& pGrid = GetPGrid(x, y);
		if (pGrid != nullptr) {
			delete GetPGrid;
		}
		Grid* newGrid = new GridHome;

		pGrid = newGrid;
	}
};

