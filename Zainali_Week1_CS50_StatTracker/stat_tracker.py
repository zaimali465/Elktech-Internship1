#  by CS50 Lecture on Python (Intro to Programming)

import random

#  Stats rakhnay ke liye variables 
games_played = 0
wins = 0
losses = 0
total_guesses = 0

# Helper functions 
def calc_win_percentage():
    if games_played == 0:
        return 0
    return round((wins / games_played) * 100, 2)

def calc_avg_guesses():
    if games_played == 0:
        return 0
    return round(total_guesses / games_played, 2)

#  Game  ki main logic
def play_game():
    global games_played, wins, losses, total_guesses
    games_played += 1
    number = random.randint(1, 100)
    attempts_left = 5
    guessed_numbers = []

    while attempts_left > 0:
        guess_input = input("Guess a number (1-100): ")

        if not guess_input.isdigit():
            print("Please enter a valid number.")
            continue

        guess = int(guess_input)

        if guess < 1 or guess > 100:
            print("Number must be between 1 and 100.")
            continue

        if guess in guessed_numbers:
            print("You already guessed this number!")
            continue

        guessed_numbers.append(guess)
        total_guesses += 1
        attempts_left -= 1

        if guess == number:
            print(f"Correct! You won The number was {random_number}.")
            wins += 1
            break
        elif guess < number:
            print("Too Low!")
        else:
            print("Too High!")
    else:
        print("Out of attempts! The number was:", number)
        losses += 1

#  Stats Display  ka function 
def show_stats():
    print("\n--- Your Session Stats ---")
    print("Games played:", games_played)
    print("Wins:", wins)
    print("Losses:", losses)
    print("Win %:", calc_win_percentage())
    print("Total guesses:", total_guesses)
    print("Avg guesses per game:", calc_avg_guesses())
    print("--------------------------\n")

#  Main Menu 
def main_menu():
    while True:
        print("=== Number Guessing Game ===")
        print("1. Play New Game")
        print("2. Show Stats")
        print("3. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            play_game()
        elif choice == "2":
            show_stats()
        elif choice == "3":
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")

#  Program start 
if __name__ == "__main__":
    main_menu()
