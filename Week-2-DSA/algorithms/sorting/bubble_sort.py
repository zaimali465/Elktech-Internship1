n = int(input("Enter number of elements: "))

a = []
i = 0
while i < n:
    a.append(int(input("Enter value: ")))
    i = i + 1

i = 0
while i < n - 1:
    j = 0
    while j < n - i - 1:
        if a[j] > a[j + 1]:
            t = a[j]
            a[j] = a[j + 1]
            a[j + 1] = t
        j = j + 1
    i = i + 1

print("Sorted array:")
i = 0
while i < n:
    print(a[i], end=" ")
    i = i + 1
