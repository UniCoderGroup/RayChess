#pragma once
#include<exception>

#include <Windows.h>
#include <iostream>
#define t(x) /*MessageBoxA(NULL, x, "Debugger", MB_OK)*/

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


