cd "../"
git submodule init
git submodule update
cd "./JsCore"
npm link
cd "../WebApp"
npm run linkcore