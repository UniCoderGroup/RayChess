
cd "../"

git pull
git submodule update

for repo in {"JsCore","WebApp"}
do
cd "./$repo"
git pull
cd "../"
done

echo "END"
read