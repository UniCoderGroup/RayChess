﻿// Win32TestApp.cpp : 定义应用程序的入口点。
//

#include "framework.h"
#include "Win32TestApp.h"

#define MAX_LOADSTRING 100
#define X 25
#define Y 30
#define W 15

// 全局变量:
HINSTANCE hInst;                                // 当前实例
WCHAR szTitle[MAX_LOADSTRING];                  // 标题栏文本
WCHAR szWindowClass[MAX_LOADSTRING];            // 主窗口类名
Game game(X, Y);


// 此代码模块中包含的函数的前向声明:
ATOM                MyRegisterClass(HINSTANCE hInstance);
BOOL                InitInstance(HINSTANCE, int);
LRESULT CALLBACK    WndProc(HWND, UINT, WPARAM, LPARAM);
INT_PTR CALLBACK    About(HWND, UINT, WPARAM, LPARAM);

int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
	_In_opt_ HINSTANCE hPrevInstance,
	_In_ LPWSTR    lpCmdLine,
	_In_ int       nCmdShow)
{
	UNREFERENCED_PARAMETER(hPrevInstance);
	UNREFERENCED_PARAMETER(lpCmdLine);

	// TODO: 在此处放置代码。

	// 初始化全局字符串
	LoadStringW(hInstance, IDS_APP_TITLE, szTitle, MAX_LOADSTRING);
	LoadStringW(hInstance, IDC_WIN32TESTAPP, szWindowClass, MAX_LOADSTRING);
	MyRegisterClass(hInstance);

	// 执行应用程序初始化:
	if (!InitInstance(hInstance, nCmdShow))
	{
		return FALSE;
	}

	HACCEL hAccelTable = LoadAccelerators(hInstance, MAKEINTRESOURCE(IDC_WIN32TESTAPP));

	MSG msg;

	// 主消息循环:
	while (GetMessage(&msg, nullptr, 0, 0))
	{
		if (!TranslateAccelerator(msg.hwnd, hAccelTable, &msg))
		{
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}
	}

	return (int)msg.wParam;
}



//
//  函数: MyRegisterClass()
//
//  目标: 注册窗口类。
//
ATOM MyRegisterClass(HINSTANCE hInstance)
{
	WNDCLASSEXW wcex;

	wcex.cbSize = sizeof(WNDCLASSEX);

	wcex.style = CS_HREDRAW | CS_VREDRAW;
	wcex.lpfnWndProc = WndProc;
	wcex.cbClsExtra = 0;
	wcex.cbWndExtra = 0;
	wcex.hInstance = hInstance;
	wcex.hIcon = LoadIcon(hInstance, MAKEINTRESOURCE(IDI_WIN32TESTAPP));
	wcex.hCursor = LoadCursor(nullptr, IDC_ARROW);
	wcex.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
	wcex.lpszMenuName = MAKEINTRESOURCEW(IDC_WIN32TESTAPP);
	wcex.lpszClassName = szWindowClass;
	wcex.hIconSm = LoadIcon(wcex.hInstance, MAKEINTRESOURCE(IDI_SMALL));

	return RegisterClassExW(&wcex);
}

//
//   函数: InitInstance(HINSTANCE, int)
//
//   目标: 保存实例句柄并创建主窗口
//
//   注释:
//
//        在此函数中，我们在全局变量中保存实例句柄并
//        创建和显示主程序窗口。
//
BOOL InitInstance(HINSTANCE hInstance, int nCmdShow)
{
	hInst = hInstance; // 将实例句柄存储在全局变量中

	HWND hWnd = CreateWindowW(szWindowClass, szTitle, WS_OVERLAPPEDWINDOW,
		CW_USEDEFAULT, 0, CW_USEDEFAULT, 0, nullptr, nullptr, hInstance, nullptr);
	AllocConsole();
	game.AddMirror(1, 1, TypeOfMirror::Left, Player::P1);
	game.AddMirror(1, 1, TypeOfMirror::Top, Player::P2);

	if (!hWnd)
	{
		return FALSE;
	}

	ShowWindow(hWnd, nCmdShow);
	UpdateWindow(hWnd);

	return TRUE;
}

//
//  函数: WndProc(HWND, UINT, WPARAM, LPARAM)
//
//  目标: 处理主窗口的消息。
//
//  WM_COMMAND  - 处理应用程序菜单
//  WM_PAINT    - 绘制主窗口
//  WM_DESTROY  - 发送退出消息并返回
//
//
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
	switch (message)
	{
		case WM_COMMAND:
		{
			int wmId = LOWORD(wParam);
			// 分析菜单选择:
			switch (wmId)
			{
				case IDM_ABOUT:
					DialogBox(hInst, MAKEINTRESOURCE(IDD_ABOUTBOX), hWnd, About);
					break;
				case IDM_EXIT:
					DestroyWindow(hWnd);
					break;
				default:
					return DefWindowProc(hWnd, message, wParam, lParam);
			}
		}
		break;
		case WM_PAINT:
		{
			PAINTSTRUCT ps;
			HDC hdc = BeginPaint(hWnd, &ps);
			HPEN hpen = CreatePen(PS_SOLID, 2, RGB(150, 150, 150));
			HPEN pen1 = CreatePen(PS_SOLID, 2, RGB(255, 0, 0));
			HPEN pen2 = CreatePen(PS_SOLID, 2, RGB(0, 0, 255));
			SelectObject(hdc, hpen);
			for (int i = 0; i <= Y; i++) {
				MoveToEx(hdc, W, W + i * W, NULL);
				LineTo(hdc, W + X * W, W + i * W);
			}
			for (int j = 0; j <= X; j++) {
				MoveToEx(hdc, W + j * W, W, NULL);
				LineTo(hdc, W + j * W, W + Y * W);
			}
			for (int i = 0; i < X; i++) {
				for (int j = 0; j < Y; j++) {
					Grid& g0 = game.GetGrid(i, j);
					switch (g0.GetGridType()) {
						case GridType::Normal:
							GridNormal& g = dynamic_cast<GridNormal&>(g0);
							switch (g.GetMirror().Left.whose) {
								case Player::P1:
									SelectObject(hdc, pen1);
									MoveToEx(hdc, W + i * W, W + j * W, NULL);
									LineTo(hdc, W + i * W, W + j * W + W);
									break;
								case Player::P2:
									SelectObject(hdc, pen2);
									MoveToEx(hdc, W + i * W, W + j * W, NULL);
									LineTo(hdc, W + i * W, W + j * W + W);
									break;
							}switch (g.GetMirror().Right.whose) {
								case Player::P1:
									SelectObject(hdc, pen1);
									MoveToEx(hdc, W + i * W + W, W + j * W, NULL);
									LineTo(hdc, W + i * W + W, W + j * W + W);
									break;
								case Player::P2:
									SelectObject(hdc, pen2);
									MoveToEx(hdc, W + i * W, W + j * W, NULL);
									LineTo(hdc, W + i * W, W + j * W + W);
									break;
							}switch (g.GetMirror().Top.whose) {
								case Player::P1:
									SelectObject(hdc, pen1);
									MoveToEx(hdc, W + i * W, W + j * W, NULL);
									LineTo(hdc, W + i * W + W, W + j * W);
									break;
								case Player::P2:
									SelectObject(hdc, pen2);
									MoveToEx(hdc, W + i * W, W + j * W, NULL);
									LineTo(hdc, W + i * W + W, W + j * W);
									break;
							}switch (g.GetMirror().Bottom.whose) {
								case Player::P1:
									SelectObject(hdc, pen1);
									MoveToEx(hdc, W + i * W, W + j * W + W, NULL);
									LineTo(hdc, W + i * W + W, W + j * W + W);
									break;
								case Player::P2:
									SelectObject(hdc, pen2);
									MoveToEx(hdc, W + i * W, W + j * W + W, NULL);
									LineTo(hdc, W + i * W + W, W + j * W + W);
									break;
							}
							break;
					}

				}
			}
			EndPaint(hWnd, &ps);
		}
		break;
		case WM_DESTROY:
			PostQuitMessage(0);
			break;
		default:
			return DefWindowProc(hWnd, message, wParam, lParam);
	}
	return 0;
}

// “关于”框的消息处理程序。
INT_PTR CALLBACK About(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
	UNREFERENCED_PARAMETER(lParam);
	switch (message)
	{
		case WM_INITDIALOG:
			return (INT_PTR)TRUE;

		case WM_COMMAND:
			if (LOWORD(wParam) == IDOK || LOWORD(wParam) == IDCANCEL)
			{
				EndDialog(hDlg, LOWORD(wParam));
				return (INT_PTR)TRUE;
			}
			break;
	}
	return (INT_PTR)FALSE;
}
