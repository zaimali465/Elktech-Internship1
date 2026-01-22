n = int(input("Enter number of elements: "))

a = []
i = 0
while i < n:
    a.append(int(input("Enter value: ")))
    i = i + 1

key = int(input("Enter value to search: "))

found = False
i = 0
while i < n:
    if a[i] == key:
        print("Element found at index", i)
        found = True
        break
    i = i + 1

if found == False:
    print("Element not found")
