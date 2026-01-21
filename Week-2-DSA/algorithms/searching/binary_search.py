n = int(input("Enter number of elements: "))

a = []
i = 0
while i < n:
    a.append(int(input("Enter value: ")))
    i = i + 1

key = int(input("Enter value to search: "))

low = 0
high = n - 1
found = False

while low <= high:
    mid = (low + high) // 2

    if a[mid] == key:
        print("Element found at index", mid)
        found = True
        break
    elif key < a[mid]:
        high = mid - 1
    else:
        low = mid + 1

if found == False:
    print("Element not found")
    