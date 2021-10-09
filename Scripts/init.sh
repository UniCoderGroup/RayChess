cd "../"
git submodule init
git submodule update
cd "./JsCore"
npm install
npm link
cd "../WebApp"
npm install
npm run linkcore