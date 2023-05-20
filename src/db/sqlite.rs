use sqlite::{Connection, State};

fn init_db() -> Result<(), sqlite::Error> {
    let conn = Connection::open("hugin_api.db")?;

    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS postencrypted (
            tx_hash TEXT,
            tx_box TEXT,
            tx_timestamp INTEGER,
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS postencryptedgroup (
            tx_hash TEXT,
            tx_sb TEXT,
            tx_timestamp INTEGER,
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL
        );

        ",
    )?;

    Ok(())
}
