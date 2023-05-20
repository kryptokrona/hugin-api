use crate::types::PoolChangesLiteRequest;
use log::{info, warn};
use reqwest::header::HeaderMap;
use reqwest::header::CONTENT_TYPE;
use rocket::http::hyper::HeaderValue;
use std::{thread, time};

//async fn get_pool_changes_lite() -> String {}

async fn get_pool_changes_lite(body: &str) -> String {
    let body = body.to_string();

    // set headers
    let mut headers = HeaderMap::new();
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));

    // set node and request endpoint
    let ip = String::from("privacymine.net");
    let port = String::from("11898");
    let url = format!("http://{}:{}/{}", ip, port, "get_pool_changes_lite");

    // make the post request
    let client = reqwest::Client::new();
    let request = client
        .post(&url)
        .headers(headers.clone())
        .body(body.clone());

    let response = request.send().await;
    let response_text = response.unwrap().text().await;

    match response_text {
        Ok(text) => {
            info!("Response text: {}", text);
            text
        }
        Err(e) => {
            warn!("Error: {}", e);
            String::from("")
        }
    }
}

pub async fn hugin_syncer() {
    info!(target: "sync_events", "Starting Hugin syncer...");

    let delay = time::Duration::from_secs(2);
    let known = vec!["37669a52df20daf42e74757d05547f9b151ec0383819b377be1c7df59d43e2f8"];
    let pool_changes_lite_req = PoolChangesLiteRequest {
        known_txs_ids: &known,
    };

    loop {
        info!("Hugin syncer loop...");

        let json_body = serde_json::to_string(&pool_changes_lite_req);

        println!("json_body: {:?}", json_body);

        match json_body {
            Ok(body) => {
                let response = get_pool_changes_lite(&body).await;
                info!("Response: {}", response);

                // parse the deserialize the response into a PoolChangesLiteResponse
            }
            Err(e) => {
                warn!("Error: {}", e);
            }
        }

        thread::sleep(delay);
    }
}
