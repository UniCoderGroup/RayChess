
#pragma once

#include "Game.h"

int main() {
	Game g;
	g.init(30, 30);
	GridHome& home1 = g.CreateHome(2, 2, Player::P1);
	home1.SetDirection(Direction::Top);

}