class VideoSerializer < ActiveModel::Serializer
  attributes :id, :name, :media, :completed
end
