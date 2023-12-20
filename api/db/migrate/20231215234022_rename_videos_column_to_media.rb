class RenameVideosColumnToMedia < ActiveRecord::Migration[7.1]
  def change
    rename_column :media, :video, :media
  end
end
