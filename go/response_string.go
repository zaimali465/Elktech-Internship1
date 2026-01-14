package main

import "fmt"

func main() {
	var tech string
	fmt.Print("Enter your preferred technology at Elktech (Python, NodeJS, Go, Rust): ")
	fmt.Scanln(&tech)
	fmt.Println("Great choice!", tech, "is widely used in Elktech projects.")
}
