create
    definer = root@`%` procedure AddDoSports(IN input_user_id int)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            DELETE FROM TempSportTrack WHERE user_id = input_user_id;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Time overlap detected with existing entry in AddDoSports.';
        END;

    START TRANSACTION;

    INSERT INTO sportTrack (user_id, sport_id, start_time, end_time)
    SELECT user_id, sport_id, start_time, end_time FROM TempSportTrack;

    DELETE FROM TempSportTrack WHERE user_id = input_user_id;

    CALL UpdateDailyCalories();

    COMMIT;
END;