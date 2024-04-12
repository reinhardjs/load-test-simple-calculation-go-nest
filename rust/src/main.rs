use actix_web::{web, App, HttpServer, HttpRequest, Responder, HttpResponse};

fn calculate_count() -> i64 {
    let mut count = 0;
    for i in 1..=5000 {
        for j in 1..=5000 {
            count += i + j;
        }
    }
    count
}

async fn calculate(_req: HttpRequest) -> impl Responder {
    let count = calculate_count();
    HttpResponse::Ok().body(count.to_string())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(calculate))
    })
    .bind("127.0.0.1:8081")?
    .run()
    .await
}
