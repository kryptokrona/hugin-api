use rocket::serde::json::Json;

#[get("/post-encrypted-group", format = "json")]
pub fn get_all() -> Json<Vec<String>> {
    Json(vec!["Hello".to_string(), "World".to_string()])
}

#[post("/post-encrypted-group/<id>", format = "json")]
pub fn get_by_id(id: usize) -> Json<String> {
    Json(format!("Hello, {:?}!", id))
}

#[post("/post-encrypted-group/<tx_hash>", format = "json", rank = 2)]
pub fn get_by_tx_hash(tx_hash: &str) -> Json<String> {
    Json(format!("Hello, {:?}!", tx_hash))
}
