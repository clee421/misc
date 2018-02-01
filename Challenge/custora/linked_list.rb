class Node
  attr_accessor :value, :next

  def initialize(value)
    @value = value
    @next = nil
  end
end

class LinkedList
  attr_accessor :size, :head, :tail

  def initialize
    @head = nil
    @tail = nil
    @size = 0
  end

  def add_front(value)
    if head == nil
      node = Node.new(value)
      head = node
      tail = node
      size += 1
    else
      node = Node.new(value)
      node.next = head
      head = node
      size += 1
    end
  end

  def get_front
    head.value
  end

end
