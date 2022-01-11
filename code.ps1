echo "delete temp"
rm -R -Force "temp"

echo "delete code.zip"
rm -Force "code.zip"

echo "clone code"
git clone git@github.com:sky027/route-link.git temp

echo "delete useless"
rm -R -Force "temp\.cmit"
rm -R -Force "temp\.git"
rm -R -Force "temp\.idea"
rm -R -Force "temp\.vscode"

rm -R -Force "temp\simulation"
rm -Force "temp\.gitlab-ci.yml"

echo "compress"
Compress-Archive -Path "temp\*" -DestinationPath "code.zip"

echo "delete temp"
rm -R -Force "temp"