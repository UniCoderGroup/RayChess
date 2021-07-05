#include "Core.h"

template<int ColNum, int RowNum>
inline bool ChessDataImpl<ColNum, RowNum>::init()
{
	for (auto row : data) {
		for (auto grid : row) {
			grid
		}
	}
	return false;
}

template<int ColNum, int RowNum>
Player ChessDataImpl<ColNum, RowNum>::WhoWins()
{
	return Player();
}
