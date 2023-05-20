#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

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
    rocket::build()
        .mount("/api", routes![index])
        .register("/", catchers![not_found, internal_error])
}
