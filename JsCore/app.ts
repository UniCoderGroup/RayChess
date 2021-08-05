/// <reference path = "Core.ts" />

console.log("----Test.Begin----");

namespace RayChess {
    let g = new Game();
    g.init(30, 40);
    g.AddHome(1, 1, Player.P1);
    g.SetHomeDirection(1, 1, Direction.Right);
    g.AddMirror(2, 1, TypeOfMirror.BackSlash, Player.P1);
    g.AddHome(2, 2, Player.P2);
    g.SetHomeDirection(2, 2, Direction.Top);
    console.log(g.WhoWins());
}

console.log("----Test.End----");