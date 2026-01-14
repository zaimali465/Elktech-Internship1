
use std::io;

fn main() {
    let mut name = String::new();
    let mut age = String::new();

    println!("Enter your name: ");
    io::stdin().read_line(&mut name).expect("Failed to read input");
    let name = name.trim();

    println!("Enter your age: ");
    io::stdin().read_line(&mut age).expect("Failed to read input");
    let age: u32 = age.trim().parse().expect("Please enter a valid number");

    println!("Hello {}", name);
    println!("You are {} years old", age);
}