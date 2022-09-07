-- GET COUNT OF REPLIES
SELECT count(*), reply
FROM post
GROUP BY reply
HAVING COUNT(*) > 1;