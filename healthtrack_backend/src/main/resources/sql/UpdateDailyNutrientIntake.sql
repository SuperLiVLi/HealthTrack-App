create
    definer = root@`%` procedure UpdateDailyNutrientIntake()
BEGIN
    DECLARE finished BOOLEAN DEFAULT FALSE;
    DECLARE current_user_id INT;

    DECLARE user_cursor CURSOR FOR SELECT DISTINCT user_id FROM nutriTrack;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = TRUE;

    CREATE TABLE IF NOT EXISTS daily_nutrient_intake (
                                                         user_id INT,
                                                         nutrient_id INT,
                                                         intake_date DATE,
                                                         total_intake FLOAT,
                                                         unit_name VARCHAR(255),
                                                         PRIMARY KEY (user_id, nutrient_id, intake_date)
    );

    CREATE TABLE IF NOT EXISTS daily_category_intake (
                                                         user_id INT,
                                                         category_name VARCHAR(255),
                                                         intake_date DATE,
                                                         sum_intake FLOAT,
                                                         PRIMARY KEY (user_id, category_name, intake_date)
    );

    OPEN user_cursor;

    user_loop: LOOP
        FETCH user_cursor INTO current_user_id;
        IF finished THEN
            LEAVE user_loop;
        END IF;

        # update daily_nutrient_intake
        INSERT INTO daily_nutrient_intake(user_id, nutrient_id, intake_date, total_intake, unit_name)
        SELECT
            nt.user_id,
            n.nutrient_id,
            DATE(nt.store_time) AS intake_date,
            SUM(c.amount * nt.intake_amount / 100) AS total_intake,
            n.unit_name
        FROM
            nutriTrack nt
                JOIN food f ON nt.fdc_id = f.fdc_id
                JOIN contains c ON nt.fdc_id = c.fdc_id
                JOIN nutrient n ON c.nutrient_id = n.nutrient_id
        WHERE
                nt.user_id = current_user_id
        GROUP BY
            nt.user_id, n.nutrient_id, DATE(nt.store_time), n.unit_name
        ON DUPLICATE KEY UPDATE
            total_intake = VALUES(total_intake);

        # update daily_category_intake
        INSERT INTO daily_category_intake(user_id, category_name, intake_date, sum_intake)
        SELECT
            nt.user_id,
            f.category_name,
            DATE(nt.store_time) AS intake_date,
            SUM(nt.intake_amount) AS sum_intake
        FROM
            nutriTrack nt
                JOIN food f ON nt.fdc_id = f.fdc_id
        WHERE
                nt.user_id = current_user_id
        GROUP BY
            nt.user_id, f.category_name, DATE(nt.store_time)
        ON DUPLICATE KEY UPDATE
            sum_intake = VALUES(sum_intake);

    END LOOP;

    CLOSE user_cursor;
END;
