"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("----Test.Begin----");
const r = require("./Core");
let g = new r.Game;
g.init(30, 40);
g.AddHome(1, 1, 1 /* P1 */);
g.SetHomeDirection(1, 1, 4 /* Top */);
g.AddMirror(2, 1, r.TypeOfMirror.BackSlash, 1 /* P1 */);
g.AddHome(2, 2, 2 /* P2 */);
g.SetHomeDirection(2, 2, 4 /* Top */);
console.log(g.WhoWins());
console.log("----Test.End----");
//# sourceMappingURL=app.js.map