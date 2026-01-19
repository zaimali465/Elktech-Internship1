class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []
root = TreeNode("A")
child1 = TreeNode("b")
child2 = TreeNode("C")
root.children.append(child1)
root.children.append(child2)
print("Root:", root.value)
print("Children:")
for child in root.children:
    print(child.value)
