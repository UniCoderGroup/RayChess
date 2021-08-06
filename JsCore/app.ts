
console.log("----Test.Begin----");

import * as r from "./Core";
let g = new r.Game;
g.init(30, 40);
g.AddHome(1, 1, r.Player.P1);
g.SetHomeDirection(1, 1, r.Direction.Top);
g.AddMirror(2, 1, r.TypeOfMirror.BackSlash, r.Player.P1);
g.AddHome(2, 2, r.Player.P2);
g.SetHomeDirection(2, 2, r.Direction.Top);
console.log(g.WhoWins());

console.log("----Test.End----");