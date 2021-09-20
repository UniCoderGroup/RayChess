
cd "../"

git pull
git submodule update

for repo in {"CppCore","JsCore","WebApp","Win32TestApp"}
do
cd "./$repo"
git pull
cd "../"
done

echo "END"
read