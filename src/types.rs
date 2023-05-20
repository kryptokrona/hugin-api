use serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct PoolChangesLiteRequest<'r> {
    pub known_txs_ids: &'r Vec<&'r str>,
}
