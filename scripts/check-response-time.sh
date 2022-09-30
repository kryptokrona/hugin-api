# this checks the response times of the API on localhost
# and on api.hugin.chat

echo "CHECKING LOCALHOST:8080"
echo
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:8080"
echo
echo "CHECKING LOCALHOST:8080/API/V1/POSTS"
echo
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:8080/api/v1/posts"
echo
echo "CHECKING API.HUGIN.CHAT"
echo
curl -w "@curl-format.txt" -o /dev/null -s "https://api.hugin.chat"
echo
echo "CHECKING API.HUGIN.CHAT/API/V1/POSTS"
echo
curl -w "@curl-format.txt" -o /dev/null -s "https://api.hugin.chat/v1/posts"
