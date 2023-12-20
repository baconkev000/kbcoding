class RenameVideosTableToMedia < ActiveRecord::Migration[7.1]
  def change
    rename_table :videos, :media
  end
end
