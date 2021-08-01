#pragma once
#include<cstdio>

#pragma region BuildConfigurations

#define BUILD_CHECKRANGE 1
#define BUILD_CHECKGRIDTYPE 1

#pragma endregion


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

	bool operator==(const Coord& other)
	{
		return x == other.x && y == other.y;
	}
};
constexpr Coord InvalidCoord{ -1,-1 };

inline Coord GetSurroundingCoord(Coord&& c, Direction d) {
	switch (d) {
		case Direction::Left:
			return { c.x - 1, c.y };
		case Direction::Right:
			return { c.x + 1, c.y };
		case Direction::Top:
			return { c.x, c.y - 1 };
		case Direction::Bottom:
			return { c.x, c.y + 1 };
		default:
			return InvalidCoord;
	}
}

using RayData = int;

#define WriteLog(...) printf(__VA_ARGS__)

class Exception
{
public:

	Exception() noexcept
	{
	}

	explicit Exception(char const* const _Message) noexcept
	{
		_what = _Message;
	}

	Exception(Exception const& _Other) noexcept
	{
		_what = _Other._what;
	}

	virtual char const* what() const
	{
		return _what!=nullptr ? _what : "Unknown exception";
	}

private:

	const char* _what = nullptr;
};