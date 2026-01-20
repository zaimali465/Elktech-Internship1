n = int(input("Enter number of elements: "))

a = []
i = 0
while i < n:
    a.append(int(input("Enter value: ")))
    i = i + 1

i = 1
while i < n:
    key = a[i]
    j = i - 1

    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]
        j = j - 1

    a[j + 1] = key
    i = i + 1

print("Sorted array:")
i = 0
while i < n:
    print(a[i], end=" ")
    i = i + 1
