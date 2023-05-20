use rocket::serde::json::Json;

#[post("/post-encrypted-group", format = "json")]
pub fn get_all() -> Json<Vec<String>> {
    Json(vec!["Hello".to_string(), "World".to_string()])
}

#[post("/post-encrypted-group/<id>", format = "json")]
pub fn get(id: usize) -> Json<String> {
    Json(format!("Hello, {}!", id))
}

#[post("/post-encrypted-group/<tx_hash>", format = "json")]
pub fn get(tx_hash: Json<String>) -> Json<String> {
    Json(format!("Hello, {}!", tx_hash))
}
