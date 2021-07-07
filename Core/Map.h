#pragma once

#include <array>
#include "Base.h"
#include "Grid.h"

template <int XNum, int YNum>
class Map {
public:
	Map() = default;
protected:
	using RowType = std::array<PGrid, XNum>;
	using DataType = std::array<RowType, YNum>;
	DataType data;
public:
	bool init() {
		for (RowType row : data) {
			for (Grid* grid : row) {
				grid = new GridNormal;
			}
		}
		return true;
	}
	PGrid& GetPGrid(int x, int y) {
		return data[y][x];
	}
	Grid& GetGrid(int x, int y) {
		return *GetPGrid(x, y);
	}
	GridHome& CreateHome(int x, int y, Player whose) {
		t("1.2");
		PGrid pGrid = GetPGrid(x, y);
		t("1.3");
		if (pGrid != nullptr) {
			t("1.4");
			delete pGrid;
			t("1.5");
		}
		pGrid = new GridHome(whose);
		t("1.6");
		return *static_cast<GridHome*>(pGrid.GetPointer());
	}
};

