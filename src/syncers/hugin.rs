use crate::types::PoolChangesLiteRequest;
use log::{info, warn};
use reqwest::header::HeaderMap;
use std::{thread, time};

//async fn get_pool_changes_lite() -> String {}

async fn get_pool_changes_lite(body: &str) -> String {
    let body = body.to_string();

    // set headers
    let mut headers = HeaderMap::new();
    headers.insert("Content-Type", "application/json".parse().unwrap());

    // set node and request endpoint
    let ip = String::from("privacymine.net");
    let port = String::from("11898");
    let url = format!("http://{}:{}/{}", ip, port, "get_pool_changes_lite");

    // make the post request
    let client = reqwest::Client::new();
    let response = client
        .post(url)
        .headers(headers)
        .body(body)
        .send()
        .await
        .expect("Failed to get response")
        .text()
        .await
        .expect("Failed to get payload");

    let res = response.clone();
    res
}

pub async fn hugin_syncer() {
    info!(target: "sync_events", "Starting Hugin syncer...");

    let delay = time::Duration::from_secs(5);
    let known = vec!["37669a52df20daf42e74757d05547f9b151ec0383819b377be1c7df59d43e2f8"];
    let pool_changes_lite_req = PoolChangesLiteRequest {
        known_txs_ids: &known,
    };

    loop {
        //let pool_changes_lite = get_pool_changes_lite().await;
        info!("Hugin syncer loop...");

        let json_body = serde_json::to_string(&pool_changes_lite_req);

        match json_body {
            Ok(body) => {
                let response = get_pool_changes_lite(&body).await;
                info!("Response: {}", response);
            }
            Err(e) => {
                warn!("Error: {}", e);
            }
        }

        thread::sleep(delay);
    }
}
