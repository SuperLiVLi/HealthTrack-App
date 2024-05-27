create
    definer = root@`%` procedure UpdateDailyCalories()
BEGIN
    DECLARE finished BOOLEAN DEFAULT FALSE;
    DECLARE current_user_id INT;

    DECLARE user_cursor CURSOR FOR SELECT DISTINCT user_id FROM user;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = TRUE;

    CREATE TABLE IF NOT EXISTS daily_calories (
                                                  user_id INT,
                                                  calories_date DATE,
                                                  total_intake FLOAT,
                                                  total_burn FLOAT,
                                                  PRIMARY KEY (user_id, calories_date)
    );

    OPEN user_cursor;

    user_loop: LOOP
        FETCH user_cursor INTO current_user_id;
        IF finished THEN
            LEAVE user_loop;
        END IF;

        CREATE TEMPORARY TABLE IF NOT EXISTS TempIntake (
                                                            user_id INT,
                                                            intake_date DATE,
                                                            total_intake FLOAT,
                                                            PRIMARY KEY (user_id, intake_date)
        );

        CREATE TEMPORARY TABLE IF NOT EXISTS TempBurn (
                                                          user_id INT,
                                                          burn_date DATE,
                                                          total_burn FLOAT,
                                                          PRIMARY KEY (user_id, burn_date)
        );

        # query daily calories intake
        INSERT INTO TempIntake(user_id, intake_date, total_intake)
        SELECT
            nt.user_id,
            DATE(nt.store_time) AS intake_date,
            SUM(c.amount * nt.intake_amount / 100) AS total_intake
        FROM
            nutriTrack nt
                JOIN food f ON nt.fdc_id = f.fdc_id
                JOIN contains c ON nt.fdc_id = c.fdc_id
                JOIN nutrient n ON c.nutrient_id = n.nutrient_id
        WHERE
                nt.user_id = current_user_id
          AND
                c.nutrient_id = 2047
        GROUP BY
            nt.user_id, DATE(nt.store_time);

        # query daily calories burn
        INSERT INTO TempBurn(user_id, burn_date, total_burn)
        SELECT
            st.user_id,
            DATE(st.start_time) AS burn_date,
            SUM(s.calories_per_kg * u.weight *
                TIMESTAMPDIFF(HOUR, st.start_time, st.end_time)) AS total_burn
        FROM
            sportTrack st
                JOIN
            sport s ON st.sport_id = s.sport_id
                JOIN
            user u ON st.user_id = u.user_id
        WHERE
                st.user_id = current_user_id
        GROUP BY
            st.user_id, DATE(st.start_time);

    END LOOP;

    CLOSE user_cursor;

    # combine results
    CREATE TEMPORARY TABLE IF NOT EXISTS TempCombined (
                                                          user_id INT,
                                                          calories_date DATE,
                                                          total_intake FLOAT DEFAULT 0,
                                                          total_burn FLOAT DEFAULT 0,
                                                          PRIMARY KEY (user_id, calories_date)
    );

    INSERT INTO TempCombined (user_id, calories_date, total_intake)
    SELECT user_id, intake_date, total_intake
    FROM TempIntake
    ON DUPLICATE KEY UPDATE
        total_intake = VALUES(total_intake);

    INSERT INTO TempCombined (user_id, calories_date, total_burn)
    SELECT user_id, burn_date, total_burn
    FROM TempBurn
    ON DUPLICATE KEY UPDATE
        total_burn = VALUES(total_burn);


    INSERT INTO daily_calories (user_id, calories_date, total_intake, total_burn)
    SELECT user_id, calories_date, total_intake, total_burn
    FROM TempCombined
    ON DUPLICATE KEY UPDATE
                         total_intake = VALUES(total_intake),
                         total_burn = VALUES(total_burn);

    DROP TEMPORARY TABLE TempIntake;
    DROP TEMPORARY TABLE TempBurn;
    DROP TEMPORARY TABLE TempCombined;


END;