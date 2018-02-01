class Position < ActiveRecord::Base
  STATUS = [
    ACTIVE = 'active',
    DRAFT = 'draft'
  ]

  belongs_to :asset
  belongs_to :idea

  def benchmark_false
    self.where(benchmark: false)
  end
end
