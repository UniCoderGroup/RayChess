/// <reference path = "Core.ts" />
console.log("----Test.Begin----");
var RayChess;
(function (RayChess) {
    let g = new RayChess.Game();
    g.init(30, 40);
    g.AddHome(1, 1, 1 /* P1 */);
    g.SetHomeDirection(1, 1, 2 /* Right */);
    g.AddMirror(2, 1, RayChess.TypeOfMirror.BackSlash, 1 /* P1 */);
    g.AddHome(2, 2, 2 /* P2 */);
    g.SetHomeDirection(2, 2, 4 /* Top */);
    console.log(g.WhoWins());
})(RayChess || (RayChess = {}));
console.log("----Test.End----");
//# sourceMappingURL=app.js.map