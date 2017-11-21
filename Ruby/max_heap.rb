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
    @heap = []
  end
  
  def peek
    @heap.first
  end
  
  def insert(val)
    @heap.push(val)
    heapify_up
  end
  
  def extract
    max = @heap.first
    @heap[0], @heap[-1] = @heap[-1], @heap[0]
    @heap.pop
    heapify_down
    max
  end
  
  def show_heap
    @heap.dup
  end
  
  def size
    @heap.length
  end
  
  private
  
  def heapify_down(idx = 0)
    c_one_idx, c_two_idx = get_child_idx(idx)
    
    while (c_one_idx != nil && @heap[idx] < @heap[c_one_idx]) || 
      (c_two_idx != nil && @heap[idx] < @heap[c_two_idx])
      
      if c_two_idx != nil && @heap[c_two_idx] > @heap[c_one_idx]
        swap(idx, c_two_idx)
        idx = c_two_idx
      else
        swap(idx, c_one_idx)
        idx = c_one_idx
      end
      
      c_one_idx, c_two_idx = get_child_idx(idx)
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
  
  def get_child_idx(p_idx)
    base = (p_idx * 2)
    a = base + 1
    b = base + 2
    a = nil if a > @heap.length - 1
    b = nil if b > @heap.length - 1
    [a, b]
  end
  
  def swap(idx_one, idx_two)
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













