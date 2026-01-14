use std::io;

fn main() {
    let mut tech = String::new();
    println!("Enter your preferred technology at Elktech (Python, NodeJS, Go, Rust): ");
    io::stdin().read_line(&mut tech).expect("Failed to read input");
    let tech = tech.trim();

    println!("Great choice! {} is widely used in Elktech projects .", tech);
}