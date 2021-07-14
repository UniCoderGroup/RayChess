#pragma once
#include<exception>
#include <cstdio>


enum class Player {
	None,
	P1,
	P2
};

class RelativePlayer {
public:
#pragma warning(disable:26812)
	enum RelativePlayerData {
		None,
		This,
		Another
	};
	RelativePlayer() = default;
	RelativePlayer(RelativePlayerData data) :data(data) {}
	RelativePlayer(Player PlayerThis, Player PlayerThat) :data(GetRelativePlayer(PlayerThis, PlayerThat)) {}
	static RelativePlayer GetRelativePlayer(Player PlayerThis, Player PlayerThat) {
		if (PlayerThis != Player::None) {
			if (PlayerThat == Player::None) {
				return None;
			}
			else if (PlayerThis == PlayerThat) {
				return This;
			}
			else {
				return Another;
			}
		}
		else {
			return None;
		}
	}
	operator RelativePlayerData() {
		return data;
	}
protected:
	RelativePlayerData data = None;

};

enum class Direction {
	Unknow = 0,
	Left = 1,
	Right = 2,
	Top = 4,
	Bottom = 8
};

inline Direction OppositeDirection(Direction d) {
	switch (d) {
		case Direction::Unknow:
			return Direction::Unknow;
		case Direction::Left:
			return Direction::Right;
		case Direction::Right:
			return Direction::Left;
		case Direction::Top:
			return Direction::Bottom;
		case Direction::Bottom:
			return Direction::Top;
		default:
			return Direction::Unknow;
	}
}

struct Coord {
	int x = -1;
	int y = -1;
};

using RayData = int;

class _tag_logger {
public:
	int log(char const* const _Format, ...) {
		int _Result;
		va_list _ArgList;
		__crt_va_start(_ArgList, _Format);
		_Result = _vfprintf_l(stdout, _Format, NULL, _ArgList);
		__crt_va_end(_ArgList);
		return _Result;
	}
};

_tag_logger& logger();