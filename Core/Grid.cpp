#include "Grid.h"


GridType GridHome::GetGridType()
{
	return GridType::Home;
}

GridType GridNormal::GetGridType()
{
	return GridType::Normal;
}

bool GridNormal::AddMirror(int x, int y, MirrorType type, Player whose)
{
	switch (type) {
		case MirrorType::Left:
			if (Mirror.Left.whose != Player::None) goto therehasbeen;
			Mirror.Left.whose = whose;
			break;
		case MirrorType::Right:
			if (Mirror.Right.whose != Player::None) goto therehasbeen;
			Mirror.Right.whose = whose;
			break;
		case MirrorType::Top:
			if (Mirror.Top.whose != Player::None) goto therehasbeen;
			Mirror.Top.whose = whose;
			break;
		case MirrorType::Bottom:
			if (Mirror.Bottom.whose != Player::None) goto therehasbeen;
			Mirror.Bottom.whose = whose;
			break;
		case MirrorType::Slash:
			if (Mirror.Cross.type != TypeOfCross::None) goto therehasbeen;
			Mirror.Cross.type = TypeOfCross::Slash;
			Mirror.Cross.whose = whose;
			break;
		case MirrorType::BackSlash:
			if (Mirror.Cross.type != TypeOfCross::None) goto therehasbeen;
			Mirror.Cross.type = TypeOfCross::BackSlash;
			Mirror.Cross.whose = whose;
			break;
		default:
			return false;
	}
	return true;
therehasbeen:
	throw std::exception("There has been a mirror!");
	return false;
}