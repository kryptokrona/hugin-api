use log::{info, trace, warn};
use rocket::serde::json::Json;
use std::{thread, time};

//async fn get_pool_changes_lite() -> String {}

// async fn make_request(body: &str, endpoint: &str) -> String {}

pub async fn hugin_syncer() {
    info!("Starting Hugin syncer...");
    let delay = time::Duration::from_secs(5);

    loop {
        //let pool_changes_lite = get_pool_changes_lite().await;
        println!("Hugin syncer loop...");
        thread::sleep(delay);
    }
}
