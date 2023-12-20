class RemoveCompletedFromMedia < ActiveRecord::Migration[7.1]
  def change
    remove_column :media, :completed
  end
end
