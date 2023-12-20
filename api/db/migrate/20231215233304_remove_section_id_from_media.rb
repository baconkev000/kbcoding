class RemoveSectionIdFromMedia < ActiveRecord::Migration[7.1]
  def change
    remove_column :media, :section_id
  end
end
