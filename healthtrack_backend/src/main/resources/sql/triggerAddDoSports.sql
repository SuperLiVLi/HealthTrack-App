CREATE TRIGGER triggerAddDoSports
BEFORE INSERT ON sportTrack
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM sportTrack
        WHERE NEW.user_id = user_id AND
            NOT (NEW.end_time <= start_time OR NEW.start_time >= end_time)
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Time overlap detected with existing entry.';
    END IF;
END;
