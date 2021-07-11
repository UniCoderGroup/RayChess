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

TestOutput::TestArea& TestOutput::TestMirrorLeft::GetOuterArea()
{
	return data.LeftOuterArea;
}

TestOutput::TestArea& TestOutput::TestMirrorLeft::GetInnerArea()
{
	return data.LeftInnerArea;
}

TestOutput::TestArea& TestOutput::TestMirrorRight::GetOuterArea()
{
	return data.RightOuterArea;
}

TestOutput::TestArea& TestOutput::TestMirrorRight::GetInnerArea()
{
	return data.RightInnerArea;
}

TestOutput::TestArea& TestOutput::TestMirrorTop::GetOuterArea()
{
	return data.TopOuterArea;
}

TestOutput::TestArea& TestOutput::TestMirrorTop::GetInnerArea()
{
	return data.TopInnerArea;
}

TestOutput::TestArea& TestOutput::TestMirrorBottom::GetOuterArea()
{
	return data.BottomOuterArea;
}

TestOutput::TestArea& TestOutput::TestMirrorBottom::GetInnerArea()
{
	return data.BottomInnerArea;
}

bool TestOutput::TestMirrorCross::LeftIn()
{
	switch (type) {
		case TypeOfCross::Slash:
			switch (whose) {
				case RelativePlayer::None:
					data.RightInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.RightInnerArea.Outward();
					data.TopInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.TopInnerArea.Outward();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.RightInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.RightInnerArea.Outward();
					data.BottomInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.BottomInnerArea.Outward();
					break;
			}
			break;
	}
}

bool TestOutput::TestMirrorCross::RightIn()
{
	switch (type) {
		case TypeOfCross::Slash:
			switch (whose) {
				case RelativePlayer::None:
					data.LeftInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.LeftInnerArea.Outward();
					data.BottomInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.BottomInnerArea.Outward();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.LeftInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.LeftInnerArea.Outward();
					data.TopInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.TopInnerArea.Outward();
					break;
			}
			break;
	}
}

bool TestOutput::TestMirrorCross::TopIn()
{
	switch (type) {
		case TypeOfCross::Slash:
			switch (whose) {
				case RelativePlayer::None:
					data.BottomInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.BottomInnerArea.Outward();
					data.LeftInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.LeftInnerArea.Outward();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.BottomInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.BottomInnerArea.Outward();
					data.RightInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.RightInnerArea.Outward();
					break;
			}
			break;
	}
}

bool TestOutput::TestMirrorCross::BottomIn()
{
	switch (type) {
		case TypeOfCross::Slash:
			switch (whose) {
				case RelativePlayer::None:
					data.TopInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.TopInnerArea.Outward();
					data.RightInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.RightInnerArea.Outward();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.TopInnerArea.Outward();
					break;
				case RelativePlayer::This:
					data.TopInnerArea.Outward();
					data.LeftInnerArea.Outward();
					break;
				case RelativePlayer::Another:
					data.LeftInnerArea.Outward();
					break;
			}
			break;
	}
}

bool TestOutput::TestAreaInnerLeft::Inward()
{
	if (in) {
		return true;
	}
	return data.CrossMirror.LeftIn();
}

bool TestOutput::TestAreaInnerLeft::Outward()
{
	if (in) {
		return true;
	}
	return data.LeftMirror.Outward();
}

bool TestOutput::TestAreaOuterLeft::Inward()
{
	if (in) {
		return true;
	}
	return data.LeftMirror.Inward();
}

bool TestOutput::TestAreaOuterLeft::Outward()
{
	if (in) {
		return true;
	}
	return data.LeftOut();
}

bool TestOutput::TestAreaInnerRight::Inward()
{
	if (in) {
		return true;
	}
	return data.CrossMirror.RightIn();
}

bool TestOutput::TestAreaInnerRight::Outward()
{
	if (in) {
		return true;
	}
	return data.RightMirror.Outward();
}

bool TestOutput::TestAreaOuterRight::Inward()
{
	if (in) {
		return true;
	}
	return data.RightMirror.Inward();
}

bool TestOutput::TestAreaOuterRight::Outward()
{
	if (in) {
		return true;
	}
	return data.RightOut();
}

bool TestOutput::TestAreaInnerTop::Inward()
{
	if (in) {
		return true;
	}
	return data.CrossMirror.TopIn();
}

bool TestOutput::TestAreaInnerTop::Outward()
{
	if (in) {
		return true;
	}
	return data.TopMirror.Outward();
}

bool TestOutput::TestAreaOuterTop::Inward()
{
	if (in) {
		return true;
	}
	return data.TopMirror.Inward();
}

bool TestOutput::TestAreaOuterTop::Outward()
{
	if (in) {
		return true;
	}
	return data.TopOut();
}

bool TestOutput::TestAreaInnerBottom::Inward()
{
	if (in) {
		return true;
	}
	return data.CrossMirror.BottomIn();
}

bool TestOutput::TestAreaInnerBottom::Outward()
{
	if (in) {
		return true;
	}
	return data.BottomMirror.Outward();
}

bool TestOutput::TestAreaOuterBottom::Inward()
{
	if (in) {
		return true;
	}
	return data.BottomMirror.Inward();
}

bool TestOutput::TestAreaOuterBottom::Outward()
{
	if (in) {
		return true;
	}
	return data.BottomOut();
}

bool TestOutput::TestData::LeftOut()
{
	return false;
}

bool TestOutput::TestData::RightOut()
{
	return false;
}

bool TestOutput::TestData::TopOut()
{
	return false;
}

bool TestOutput::TestData::BottomOut()
{
	return false;
}
