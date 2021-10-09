echo "Enter Commit Message:"
read msg

cd "../"
for repo in {"JsCore","WebApp"}
do
cd "./$repo"
git add .
git commit -m "$msg"
git push
cd "../"
done

cd "./Webapp"
npm run deploy
git add .
git commit -m "deploy"
git push
cd "../"

git add .
git commit -m "$msg"
git push origin master
git push github master

echo "END"
read