#include "Core.h"

template<int ColNum, int RowNum>
inline bool ChessDataImpl<ColNum, RowNum>::init()
{
	for (RowType row : data) {
		for (ChessGrid* grid : row) {
		}
	}
	return false;
}

template<int ColNum, int RowNum>
Player ChessDataImpl<ColNum, RowNum>::WhoWins()
{
	return Player::None;
}

template<int ColNum, int RowNum>
bool ChessDataImpl<ColNum, RowNum>::AddMirror(int col, int row, Player whose)
{
	return false;
}
