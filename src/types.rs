use serde::{Deserialize, Serialize};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct PoolChangesLiteRequest<'r> {
    pub known_txs_ids: &'r Vec<&'r str>,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct PoolChangesLiteResponse {
    pub added_txs: Vec<String>,
    pub removed_txs: Vec<String>,
}
