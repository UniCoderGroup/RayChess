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

bool TestOutput::TestMirrorLeft::LeftIn()
{
	switch (whose) {
		case RelativePlayer::None:
			data.LeftInnerArea.LeftIn();
			break;
		case RelativePlayer::This:
			data.LeftOuterArea.RightIn();
			data.LeftInnerArea.LeftIn();
			break;
		case RelativePlayer::Another:
			data.LeftOuterArea.RightIn();
			break;
	}
}
bool TestOutput::TestMirrorLeft::RightIn() {
	switch (whose) {
		case RelativePlayer::None:
			data.LeftOuterArea.RightIn();
			break;
		case RelativePlayer::This:
			data.LeftOuterArea.RightIn();
			data.LeftInnerArea.LeftIn();
			break;
		case RelativePlayer::Another:
			data.LeftInnerArea.LeftIn();
			break;
	}
}
bool TestOutput::TestMirrorRight::LeftIn() {
	switch (whose) {
		case RelativePlayer::None:
			data.RightOuterArea.LeftIn();
			break;
		case RelativePlayer::This:
			data.RightOuterArea.LeftIn();
			data.RightInnerArea.RightIn();
			break;
		case RelativePlayer::Another:
			data.RightInnerArea.RightIn();
			break;
	}
}
bool TestOutput::TestMirrorRight::RightIn() {
	switch (whose) {
		case RelativePlayer::None:
			data.RightInnerArea.RightIn();
			break;
		case RelativePlayer::This:
			data.RightOuterArea.LeftIn();
			data.RightInnerArea.RightIn();
			break;
		case RelativePlayer::Another:
			data.RightOuterArea.LeftIn();
			break;
	}
}
bool TestOutput::TestMirrorTop::TopIn() {
	switch (whose) {
		case RelativePlayer::None:
			data.TopInnerArea.TopIn();
			break;
		case RelativePlayer::This:
			data.TopOuterArea.BottomIn();
			data.TopInnerArea.TopIn();
			break;
		case RelativePlayer::Another:
			data.TopOuterArea.BottomIn();
			break;
	}
}
bool TestOutput::TestMirrorTop::BottomIn() {
	switch (whose) {
		case RelativePlayer::None:
			data.TopOuterArea.BottomIn();
			break;
		case RelativePlayer::This:
			data.TopInnerArea.TopIn();
			data.TopOuterArea.BottomIn();
			break;
		case RelativePlayer::Another:
			data.TopInnerArea.TopIn();
			break;
	}
}
bool TestOutput::TestMirrorBottom::TopIn() {
	switch (whose) {
		case RelativePlayer::None:
			data.BottomOuterArea.TopIn();
			break;
		case RelativePlayer::This:
			data.BottomInnerArea.BottomIn();
			data.BottomOuterArea.TopIn();
			break;
		case RelativePlayer::Another:
			data.BottomInnerArea.BottomIn();
			break;
	}
}
bool TestOutput::TestMirrorBottom::BottomIn() {
	switch (whose) {
		case RelativePlayer::None:
			data.BottomInnerArea.BottomIn();
			break;
		case RelativePlayer::This:
			data.BottomInnerArea.BottomIn();
			data.BottomOuterArea.TopIn();
			break;
		case RelativePlayer::Another:
			data.BottomOuterArea.TopIn();
			break;
	}
}

bool TestOutput::TestMirrorCross::LeftIn()
{
	switch (type) {
		case TypeOfCross::Slash:
			switch (whose) {
				case RelativePlayer::None:
					data.RightInnerArea.LeftIn();
					break;
				case RelativePlayer::This:
					data.RightInnerArea.LeftIn();
					data.TopInnerArea.BottomIn();
					break;
				case RelativePlayer::Another:
					data.TopInnerArea.BottomIn();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.RightInnerArea.LeftIn();
					break;
				case RelativePlayer::This:
					data.RightInnerArea.LeftIn();
					data.BottomInnerArea.TopIn();
					break;
				case RelativePlayer::Another:
					data.BottomInnerArea.TopIn();
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
					data.LeftInnerArea.RightIn();
					break;
				case RelativePlayer::This:
					data.LeftInnerArea.RightIn();
					data.BottomInnerArea.TopIn();
					break;
				case RelativePlayer::Another:
					data.BottomInnerArea.TopIn();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.LeftInnerArea.RightIn();
					break;
				case RelativePlayer::This:
					data.LeftInnerArea.RightIn();
					data.TopInnerArea.BottomIn();
					break;
				case RelativePlayer::Another:
					data.TopInnerArea.BottomIn();
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
					data.BottomInnerArea.TopIn();
					break;
				case RelativePlayer::This:
					data.BottomInnerArea.TopIn();
					data.LeftInnerArea.RightIn();
					break;
				case RelativePlayer::Another:
					data.LeftInnerArea.RightIn();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.BottomInnerArea.TopIn();
					break;
				case RelativePlayer::This:
					data.BottomInnerArea.TopIn();
					data.RightInnerArea.LeftIn();
					break;
				case RelativePlayer::Another:
					data.RightInnerArea.LeftIn();
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
					data.TopInnerArea.BottomIn();
					break;
				case RelativePlayer::This:
					data.TopInnerArea.BottomIn();
					data.RightInnerArea.LeftIn();
					break;
				case RelativePlayer::Another:
					data.RightInnerArea.LeftIn();
					break;
			}
			break;
		case TypeOfCross::BackSlash:
			switch (whose) {
				case RelativePlayer::None:
					data.TopInnerArea.BottomIn();
					break;
				case RelativePlayer::This:
					data.TopInnerArea.BottomIn();
					data.LeftInnerArea.RightIn();
					break;
				case RelativePlayer::Another:
					data.LeftInnerArea.RightIn();
					break;
			}
			break;
	}
}

bool TestOutput::TestAreaInnerLeft::LeftIn()
{
	if(!left){
		data.CrossMirror.LeftIn();
	}
}

bool TestOutput::TestAreaInnerLeft::RightIn()
{
	if (!right) {
		data.LeftMirror.RightIn();
	}
}

bool TestOutput::TestAreaOuterRight::LeftIn()
{
	if (!left) {
		data.LeftMirror.LeftIn();
	}
}

bool TestOutput::TestAreaOuterRight::RightIn()
{
	if (!right) {
		data.LeftOut();
	}
}

bool TestOutput::TestAreaInnerRight::LeftIn()
{
	if (!left) {
		data.RightMirror.LeftIn();
	}
}

bool TestOutput::TestAreaInnerRight::RightIn()
{
	if (!right) {
		data.CrossMirror.RightIn();
	}
}

bool TestOutput::TestAreaOuterLeft::LeftIn()
{
	if (!left) {
		data.RightOut();
	}
}

bool TestOutput::TestAreaOuterLeft::RightIn()
{
	if (!right) {
		data.RightMirror.RightIn();
	}
}
