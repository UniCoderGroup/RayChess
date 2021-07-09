#pragma once
#include<exception>
#include <cstdio>


enum class Player {
	None,
	P1,
	P2
};

enum class Direction {
	Unknow = 0,
	Left = 1,
	Right = 2,
	Top = 4,
	Bottom = 8
};

struct Coord {
	int x = -1;
	int y = -1;
};

using RayData = int;

class _tag_logger {
public:
	int log(char const* const _Format,...) {
		int _Result;
		va_list _ArgList;
		__crt_va_start(_ArgList, _Format);
		_Result = _vfprintf_l(stdout, _Format, NULL, _ArgList);
		__crt_va_end(_ArgList);
		return _Result;
	}
};

_tag_logger& logger();