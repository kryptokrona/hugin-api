-- GET COUNT OF REPLIES
SELECT count(*), reply
FROM post
GROUP BY reply
HAVING COUNT(*) > 1;

-- GET COUNT OF BOARDS
SELECT count(*), board
FROM post
GROUP BY board
HAVING COUNT(*) > 1;