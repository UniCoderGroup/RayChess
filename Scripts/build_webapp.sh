
cd "./Webapp"
npm run deploy
git add .
git commit -m "deploy"
git push
cd "../"

git add .
git commit -m "build WebApp"
git push origin master
git push github master

echo "END"
read