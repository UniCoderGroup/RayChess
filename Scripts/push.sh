echo "Enter Commit Message"
read msg

cd "../"
for repo in {"CppCore","JsCore","WebApp","Win32TestApp"}
do
cd "./$repo"
git add .
git commit -m "$msg"
git push
cd "../"
done
git add .
git commit -m "$msg"
git push origin master

echo "END"
read