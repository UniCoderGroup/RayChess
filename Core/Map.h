#pragma once

#include <array>
#include "Base.h"
#include "Grid.h"

template <int XNum, int YNum>
class ChessMap {
public:
	ChessMap() = default;
protected:
	using RowType = std::array<ChessGrid*, XNum>;
	using DataType = std::array<RowType, YNum>;
	DataType data;
public:
	bool init();
	ChessGrid& GetGrid(int x, int y);
};


class ChessData {
public:
	ChessData() = default;
public:
	virtual bool init() = 0;
	virtual Player WhoWins() = 0;
	virtual bool AddMirror(int col, int row, MirrorType type, Player whose) = 0;
};

template <int XNum, int YNum>
class ChessDataImpl :public ChessData {
public:
	ChessDataImpl() = default;
protected:
	ChessMap<XNum, YNum> map;
public:
	virtual ChessGrid& GetGrid(int x, int y);
	virtual bool init() override;
	virtual Player WhoWins() override;
	virtual bool AddMirror(int x, int y, MirrorType type, Player whose) override;
};


