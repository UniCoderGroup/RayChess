#pragma once



#include "Game.h"


int main() {
	t("0");
	Game<50, 50> g;
	g.init();
	t("1");
	GridHome& home1 = g.CreateHome(2, 2, Player::P1);
	t("2");
	home1.SetDirection(Direction::Top);

}