class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
class BinaryTree:
    def __init__(self):
        self.root = None
    # Pre-order traversal
    def preorder(self, node):
        if node:
            print(node.data, end=" ")
            self.preorder(node.left)
            self.preorder(node.right)
    # In-order traversal
    def inorder(self, node):
        if node:
            self.inorder(node.left)
            print(node.data, end=" ")
            self.inorder(node.right)
        # Post-order traversal
    def postorder(self, node):
        if node:
            self.postorder(node.left)
            self.postorder(node.right)
            print(node.data, end=" ")
if __name__ == "__main__":
    tree = BinaryTree()
    
    
    tree.root = Node(1)
    tree.root.left = Node(2)
    tree.root.right = Node(3)
    tree.root.left.left = Node(4)
    tree.root.left.right = Node(5)

    print("Pre-order Traversal:")
    tree.preorder(tree.root)   

    print("\nIn-order Traversal:")
    tree.inorder(tree.root)    

    print("\nPost-order Traversal:")
    tree.postorder(tree.root) 
