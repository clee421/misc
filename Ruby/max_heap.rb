# HEAP
# P | C
# 0 | 1, 2
# 1 | 3, 4
# 2 | 5, 6
# 3 | 7, 8
# 4 | 9, 10
# Parent -> Children = (P * 2) + 1 || 2
# Children -> Parent = (C - 1) / 2 # Round down

class MaxHeap
  def initialize
    # Heap starts off empty
    @heap = []
  end
  
  def peek
    # Checking the largest value
    @heap.first
  end
  
  def insert(val)
    # Insert the value in the last position
    # heapify up will put it where it needs to be
    @heap.push(val)
    heapify_up
  end
  
  def extract
    # Grab the max value and hold onto it
    max = @heap.first

    # Swap the first item with the last to pop
    @heap[0], @heap[-1] = @heap[-1], @heap[0]
    @heap.pop

    # First item might be out of position so heapify down
    heapify_down

    # Return the max value
    max
  end
  
  def show_heap
    # Return a duplicate of the heap
    # this is only a shallow copy so next items
    # will need to be duped too
    @heap.dup
  end
  
  def size
    # Size of heap
    @heap.length
  end

  def sort
    # Sorting the heap in place modifies the heap
    # Keep a dup of it first. It's ok for the
    # dupe to be shallow since sorting is about order
    dupe = @heap.dup

    # last_idx will keep track of where the last part of
    # the heap is and where the sorted portion starts
    last_idx = @heap.length - 1

    # Keep heapify'n until you're on the first item
    until last_idx <= 0
      swap(0, last_idx)
      last_idx -= 1
      heapify_down(0, last_idx)
    end

    # The heap is sorted at this point so hold onto 
    # the sorted heap and reassign @heap
    sort = @heap
    @heap = dupe

    # Return the sorted heap
    sort
  end
  
  private
  
  def heapify_down(idx = 0, last_idx = @heap.length - 1)
    c_one_idx, c_two_idx = get_child_idx(idx, last_idx)
    
    while (c_one_idx != nil && @heap[idx] < @heap[c_one_idx]) || 
      (c_two_idx != nil && @heap[idx] < @heap[c_two_idx])
      
      if c_two_idx != nil && @heap[c_two_idx] > @heap[c_one_idx]
        swap(idx, c_two_idx)
        idx = c_two_idx
      else
        swap(idx, c_one_idx)
        idx = c_one_idx
      end
      
      c_one_idx, c_two_idx = get_child_idx(idx, last_idx)
    end
  end
  
  def heapify_up(idx = @heap.length - 1)
    p_idx = get_parent_idx(idx)
    
    while p_idx != nil && @heap[idx] > @heap[p_idx]
      swap(idx, p_idx)
      idx = p_idx
      p_idx = get_parent_idx(idx)
    end
  end
  
  def get_parent_idx(c_idx)
    idx = (c_idx - 1) / 2
    return nil if idx < 0
    idx
  end
  
  def get_child_idx(p_idx, last_idx)
    # get_child_idx takes in a parent index and finds the children
    # index but only as far as last index permits since
    # beyond that is where the sorted part will start
    base = (p_idx * 2)
    a = base + 1
    b = base + 2
    a = nil if a > last_idx
    b = nil if b > last_idx
    [a, b]
  end
  
  def swap(idx_one, idx_two)
    # Helper for swaping positions, this happens a lot and
    # it's good to keep it easier to read
    @heap[idx_one], @heap[idx_two] = @heap[idx_two], @heap[idx_one]
  end
end

arr = [1, 7, 6, 4, 5, 2, 8, 9]
# arr = [1, 7]
max_heap = MaxHeap.new
arr.each do |n|
  max_heap.insert(n)
  p max_heap.show_heap
end
p "_________________________"
until max_heap.size == 0
  p max_heap.extract
  p max_heap.show_heap
end
p "_________________________"
arr.each do |n|
  max_heap.insert(n)
end
p max_heap.show_heap
p max_heap.sort











