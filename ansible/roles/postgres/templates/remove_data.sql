-- This file is used in the cron job to delete data periodically
DELETE FROM
    post
WHERE
    created_at < now() - interval '7 days'