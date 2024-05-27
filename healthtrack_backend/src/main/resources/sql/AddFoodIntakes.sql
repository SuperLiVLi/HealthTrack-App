create
    definer = root@`%` procedure AddFoodIntakes(IN input_user_id int)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            DELETE FROM TempNutriTrack WHERE user_id = input_user_id;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred during AddFoodIntake transaction. Rollback';
        END;

    START TRANSACTION;

    INSERT INTO nutriTrack (user_id, fdc_id, intake_amount, store_time)
    SELECT user_id, fdc_id, intake_amount, store_time FROM TempNutriTrack;

    DELETE FROM TempNutriTrack WHERE user_id = input_user_id;

    CALL UpdateDailyNutrientIntake();

    COMMIT;
END;