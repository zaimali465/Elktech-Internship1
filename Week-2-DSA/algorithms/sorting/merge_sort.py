def merge_sort(a):
    if len(a) > 1:
        mid = len(a) // 2
        left = a[:mid]
        right = a[mid:]

        merge_sort(left)
        merge_sort(right)

        i = 0
        j = 0
        k = 0

        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                a[k] = left[i]
                i = i + 1
            else:
                a[k] = right[j]
                j = j + 1
            k = k + 1

        while i < len(left):
            a[k] = left[i]
            i = i + 1
            k = k + 1

        while j < len(right):
            a[k] = right[j]
            j = j + 1
            k = k + 1


n = int(input("Enter number of elements: "))
a = []

i = 0
while i < n:
    a.append(int(input("Enter value: ")))
    i = i + 1

merge_sort(a)

print("Sorted array:")
i = 0
while i < n:
    print(a[i], end=" ")
    i = i + 1
