#include "Grid.h"


GridType GridHome::GetGridType()
{
	return GridType::Home;
}

GridType GridNormal::GetGridType()
{
	return GridType::Normal;
}

bool GridNormal::AddMirror(TypeOfMirror type, Player whose)
{
	switch (type) {
		case TypeOfMirror::Left:
			if (Mirror.Left.whose != Player::None) goto therehasbeen;
			Mirror.Left.whose = whose;
			break;
		case TypeOfMirror::Right:
			if (Mirror.Right.whose != Player::None) goto therehasbeen;
			Mirror.Right.whose = whose;
			break;
		case TypeOfMirror::Top:
			if (Mirror.Top.whose != Player::None) goto therehasbeen;
			Mirror.Top.whose = whose;
			break;
		case TypeOfMirror::Bottom:
			if (Mirror.Bottom.whose != Player::None) goto therehasbeen;
			Mirror.Bottom.whose = whose;
			break;
		case TypeOfMirror::Slash:
			if (Mirror.Cross.type != TypeOfCross::None) goto therehasbeen;
			Mirror.Cross.type = TypeOfCross::Slash;
			Mirror.Cross.whose = whose;
			break;
		case TypeOfMirror::BackSlash:
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

namespace TestOutput {

	bool TestMirrorBorder::Inward()
	{
		switch (whose) {
			case RelativePlayer::None:
				GetInnerArea()->Inward();
				break;
			case RelativePlayer::This:
				GetInnerArea()->Inward();
				GetOuterArea()->Outward();
				break;
			case RelativePlayer::Another:
				GetOuterArea()->Outward();
				break;
		}
		return true;
	}

	bool TestMirrorBorder::Outward()
	{
		switch (whose) {
			case RelativePlayer::None:
				GetOuterArea()->Outward();
				break;
			case RelativePlayer::This:
				GetInnerArea()->Inward();
				GetOuterArea()->Outward();
				break;
			case RelativePlayer::Another:
				GetInnerArea()->Inward();
				break;
		}
		return true;
	}

	TestArea* TestMirrorLeft::GetOuterArea()
	{
		return &data.LeftOuterArea;
	}

	TestArea* TestMirrorLeft::GetInnerArea()
	{
		return &data.LeftInnerArea;
	}

	TestArea* TestMirrorRight::GetOuterArea()
	{
		return &data.RightOuterArea;
	}

	TestArea* TestMirrorRight::GetInnerArea()
	{
		return &data.RightInnerArea;
	}

	TestArea* TestMirrorTop::GetOuterArea()
	{
		return &data.TopOuterArea;
	}

	TestArea* TestMirrorTop::GetInnerArea()
	{
		return &data.TopInnerArea;
	}

	TestArea* TestMirrorBottom::GetOuterArea()
	{
		return &data.BottomOuterArea;
	}

	TestArea* TestMirrorBottom::GetInnerArea()
	{
		return &data.BottomInnerArea;
	}

	bool TestMirrorCross::LeftIn()
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
			case TypeOfCross::None:
				data.RightInnerArea.Outward();
				break;
		}
		return true;
	}

	bool TestMirrorCross::RightIn()
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
			case TypeOfCross::None:
				data.LeftInnerArea.Outward();
				break;
		}
		return true;
	}

	bool TestMirrorCross::TopIn()
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
			case TypeOfCross::None:
				data.BottomInnerArea.Outward();
				break;
		}
		return true;
	}

	bool TestMirrorCross::BottomIn()
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
			case TypeOfCross::None:
				data.TopInnerArea.Outward();
				break;
		}
		return true;
	}

	bool TestAreaInnerLeft::Inward()
	{
		if (in) {
			return true;
		}
		return data.CrossMirror.LeftIn();
	}

	bool TestAreaInnerLeft::Outward()
	{
		if (in) {
			return true;
		}
		return data.LeftMirror.Outward();
	}

	bool TestAreaOuterLeft::Inward()
	{
		if (in) {
			return true;
		}
		return data.LeftMirror.Inward();
	}

	bool TestAreaOuterLeft::Outward()
	{
		if (in) {
			return true;
		}
		return data.LeftOut();
	}

	bool TestAreaInnerRight::Inward()
	{
		if (in) {
			return true;
		}
		return data.CrossMirror.RightIn();
	}

	bool TestAreaInnerRight::Outward()
	{
		if (in) {
			return true;
		}
		return data.RightMirror.Outward();
	}

	bool TestAreaOuterRight::Inward()
	{
		if (in) {
			return true;
		}
		return data.RightMirror.Inward();
	}

	bool TestAreaOuterRight::Outward()
	{
		if (in) {
			return true;
		}
		return data.RightOut();
	}

	bool TestAreaInnerTop::Inward()
	{
		if (in) {
			return true;
		}
		return data.CrossMirror.TopIn();
	}

	bool TestAreaInnerTop::Outward()
	{
		if (in) {
			return true;
		}
		return data.TopMirror.Outward();
	}

	bool TestAreaOuterTop::Inward()
	{
		if (in) {
			return true;
		}
		return data.TopMirror.Inward();
	}

	bool TestAreaOuterTop::Outward()
	{
		if (in) {
			return true;
		}
		return data.TopOut();
	}

	bool TestAreaInnerBottom::Inward()
	{
		if (in) {
			return true;
		}
		return data.CrossMirror.BottomIn();
	}

	bool TestAreaInnerBottom::Outward()
	{
		if (in) {
			return true;
		}
		return data.BottomMirror.Outward();
	}

	bool TestAreaOuterBottom::Inward()
	{
		if (in) {
			return true;
		}
		return data.BottomMirror.Inward();
	}

	bool TestAreaOuterBottom::Outward()
	{
		if (in) {
			return true;
		}
		return data.BottomOut();
	}

	bool TestData::LeftOut()
	{
		Output |= static_cast<RayData>(Direction::Left);
		return true;
	}

	bool TestData::RightOut()
	{
		Output |= static_cast<RayData>(Direction::Right);
		return true;
	}

	bool TestData::TopOut()
	{
		Output |= static_cast<RayData>(Direction::Top);
		return true;
	}

	bool TestData::BottomOut()
	{
		Output |= static_cast<RayData>(Direction::Bottom);
		return true;
	}

	bool TestData::LeftIn()
	{
		return LeftOuterArea.Inward();
	}

	bool TestData::RightIn()
	{
		return RightOuterArea.Inward();
	}

	bool TestData::TopIn()
	{
		return TopOuterArea.Inward();
	}

	bool TestData::BottomIn()
	{
		return BottomOuterArea.Inward();
	}

	RayData TestData::GetOutput()
	{
		return Output;
	}

}