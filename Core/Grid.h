#pragma once
#include "Base.h"

enum class TypeOfMirror {
	Left,
	Right,
	Top,
	Bottom,
	Slash,
	BackSlash
};

enum class TypeOfCross {
	None,
	Slash,
	BackSlash
};

enum class GridType {
	Home,
	Normal
};

struct MirrorStruct {
	struct {
		Player whose = Player::None;
	}Left, Top, Right, Bottom;
	struct {
		TypeOfCross type = TypeOfCross::None;
		Player whose = Player::None;
	}Cross;
};


class Grid {
public:
	Grid() = default;
public:
	virtual GridType GetGridType() = 0;
};

class GridHome :public Grid {
public:
	GridHome() = default;
	GridHome(Player _whose) : whose(_whose), direction(Direction::Unknow) {};
protected:
	Player whose = Player::None;
	Direction direction;
public:
	virtual GridType GetGridType()override;
	Player GetWhose() {
		return whose;
	}
	bool SetDirection(Direction _direction) {
		direction = _direction;
		return true;
	}
	Direction GetDirection() {
		return direction;
	}
};

namespace TestOutput {
	class TestData;
	class TestArea;

	class TestMirror {
	public:
		TestMirror(TestData& data, RelativePlayer whose) :data(data), whose(whose) {};
	protected:
		TestData& data;
		RelativePlayer whose;
	};

	class TestMirrorBorder :public TestMirror {
	public:
		using TestMirror::TestMirror;
	protected:
		virtual TestOutput::TestArea* GetOuterArea() = 0;
		virtual TestOutput::TestArea* GetInnerArea() = 0;
	public:
		bool Inward();
		bool Outward();
	};

	class TestMirrorLeft :public TestMirrorBorder {
	public:
		using TestMirrorBorder::TestMirrorBorder;
	protected:
		virtual TestArea* GetOuterArea()override;
		virtual TestArea* GetInnerArea()override;
	};

	class TestMirrorRight :public TestMirrorBorder {
	public:
		using TestMirrorBorder::TestMirrorBorder;
	protected:
		virtual TestArea* GetOuterArea()override;
		virtual TestArea* GetInnerArea()override;
	};

	class TestMirrorTop :public TestMirrorBorder {
	public:
		using TestMirrorBorder::TestMirrorBorder;
	protected:
		virtual TestArea* GetOuterArea()override;
		virtual TestArea* GetInnerArea()override;
	};

	class TestMirrorBottom :public TestMirrorBorder {
	public:
		using TestMirrorBorder::TestMirrorBorder;
	protected:
		virtual TestArea* GetOuterArea()override;
		virtual TestArea* GetInnerArea()override;
	};

	class TestMirrorCross :public TestMirror {
	public:
		TestMirrorCross(TestData& data, RelativePlayer p, TypeOfCross type) :TestMirror(data, p), type(type) {};
	protected:
		TypeOfCross type;
	public:
		bool LeftIn();
		bool RightIn();
		bool TopIn();
		bool BottomIn();
	};

	class TestArea {
	public:
		TestArea(TestData& data) :data(data) {};
	protected:
		TestData& data;
		bool in = false;
		bool out = false;
	public:
		virtual bool  Inward() = 0;
		virtual bool  Outward() = 0;
	};

	class TestAreaInnerLeft :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestAreaOuterLeft :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestAreaInnerRight :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestAreaOuterRight :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestAreaInnerTop :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestAreaOuterTop :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestAreaInnerBottom :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestAreaOuterBottom :public TestArea {
	public:
		using TestArea::TestArea;
	public:
		virtual bool  Inward() override;
		virtual bool  Outward() override;
	};

	class TestData {
	public:
		TestData(Player p, MirrorStruct& m) :
			LeftMirror(*this, RelativePlayer(p, m.Left.whose)),
			RightMirror(*this, RelativePlayer(p, m.Right.whose)),
			TopMirror(*this, RelativePlayer(p, m.Top.whose)),
			BottomMirror(*this, RelativePlayer(p, m.Bottom.whose)),
			CrossMirror(*this, RelativePlayer(p, m.Cross.whose), m.Cross.type),
			LeftInnerArea(*this),
			LeftOuterArea(*this),
			RightInnerArea(*this),
			RightOuterArea(*this),
			TopInnerArea(*this),
			TopOuterArea(*this),
			BottomInnerArea(*this),
			BottomOuterArea(*this)
		{};
	public:
		TestMirrorLeft LeftMirror;
		TestMirrorRight RightMirror;
		TestMirrorTop TopMirror;
		TestMirrorBottom BottomMirror;
		TestMirrorCross CrossMirror;
		TestAreaInnerLeft LeftInnerArea;
		TestAreaOuterLeft LeftOuterArea;
		TestAreaInnerRight RightInnerArea;
		TestAreaOuterRight RightOuterArea;
		TestAreaInnerTop TopInnerArea;
		TestAreaOuterTop TopOuterArea;
		TestAreaInnerBottom BottomInnerArea;
		TestAreaOuterBottom BottomOuterArea;
		bool LeftOut();
		bool RightOut();
		bool TopOut();
		bool BottomOut();
	protected:
		RayData Output = 0;
	public:
		bool LeftIn();
		bool RightIn();
		bool TopIn();
		bool BottomIn();
		RayData GetOutput();
	};
}

class GridNormal :public Grid {
public:
	GridNormal() = default;
protected:
	MirrorStruct Mirror;
public:
	virtual GridType GetGridType()override;
	bool AddMirror(TypeOfMirror type, Player whose);
	decltype(Mirror)& GetMirror() {
		return Mirror;
	}
	RayData TestOutput(Direction d, Player p) {
		TestOutput::TestData t(p, Mirror);
		switch (d) {
			case Direction::Left:
				t.LeftIn();
				break;
			case Direction::Right:
				t.RightIn();
				break;
			case Direction::Top:
				t.TopIn();
				break;
			case Direction::Bottom:
				t.BottomIn();
				break;
			default:
				throw std::exception("Unknow direction!");
				break;
		}
		return t.GetOutput();
	}
};


class PGrid {
public:
	PGrid() :p(nullptr) {};
	PGrid(Grid* pGrid) :p(pGrid) {};
protected:
	Grid* p;
public:
	operator Grid* () {
		return p;
	}
	operator Grid& () {
		return *p;
	}
	Grid& operator*()const {
		return *p;
	}
	Grid* operator->()const { // 箭头符号作用下去的结果，箭头符号会继续作用下去
		return p;
	}
	Grid* GetPointer() {
		return p;
	}
};

