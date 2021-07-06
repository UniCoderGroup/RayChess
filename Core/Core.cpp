#include "Core.h"

GridType ChessGridHome::GetGridType()
{
	return GridType::Home;
}

GridType ChessGridNormal::GetGridType()
{
	return GridType::Normal;
}

bool ChessGridNormal::AddMirror(int x, int y, MirrorType type, Player whose)
{
	switch (type) {
		case MirrorType::Left:
			Mirror.Left.whose = whose;

			//7/6 todo
	}
	return true;
}

template<int XNum, int YNum>
inline ChessGrid& ChessMap<XNum, YNum>::GetGrid(int x, int y)
{
	return *data[y][x];
}

template<int XNum, int YNum>
bool ChessMap<XNum, YNum>::init()
{
	for (RowType row : data) {
		for (ChessGrid* grid : row) {
			// TODO: init every grid
		}
	}
	return true;
}

template<int XNum, int YNum>
ChessGrid& ChessDataImpl<XNum, YNum>::GetGrid(int x, int y)
{
	return map.GetGrid(x, y);
}

template<int XNum, int YNum>
inline bool ChessDataImpl<XNum, YNum>::init()
{
	return map.init();
}

template<int XNum, int YNum>
Player ChessDataImpl<XNum, YNum>::WhoWins()
{
	return Player::None;
}

template<int XNum, int YNum>
bool ChessDataImpl<XNum, YNum>::AddMirror(int x, int y, MirrorType type, Player whose)
{
	GridType t=GetGrid(x, y).GetGridType();
	switch (t) {
		case GridType::Home:
			//Error: can not place mirror on home
			return false;
		case GridType::Normal:
			static_cast<ChessGridHome&>(GetGrid(x, y)).AddMirror(x, y, type, whose);
	}
	return true;
}
