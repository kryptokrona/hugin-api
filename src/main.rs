mod db;
mod endpoints;
mod syncers;

use rocket::tokio::runtime::Builder;
use rocket::tokio::task;

#[macro_use]
extern crate rocket;

#[catch(404)]
fn not_found() -> &'static str {
    "Page not found!"
}

#[catch(500)]
fn internal_error() -> &'static str {
    "Whoops! Looks like we messed up."
}

#[launch]
fn rocket() -> _ {
    let tokio_runtime = Builder::new_multi_thread()
        .enable_all()
        .build()
        .expect("Failed to build Tokio runtime");

    // spawn the syncers
    tokio_runtime.spawn(async {
        syncers::hugin::hugin_syncer().await;
    });

    rocket::build()
        .mount(
            "/api",
            routes![
                endpoints::post_encrypted::get_all,
                endpoints::post_encrypted::get_by_id,
                endpoints::post_encrypted::get_by_tx_hash,
                endpoints::post_encrypted_group::get_all,
                endpoints::post_encrypted_group::get_by_id,
                endpoints::post_encrypted_group::get_by_tx_hash,
            ],
        )
        .register("/", catchers![not_found, internal_error])
}
