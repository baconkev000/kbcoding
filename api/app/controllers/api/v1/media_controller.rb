class Api::V1::MediaController < ApplicationController
  def index
    media = Media.all
    render json:media, status:200
  end

  def show
    media = Media.find(params[:id])
    if media
      render json:media, status:200
    else
      render json: {error: "Error finding media"}, status:404
    end
  end

  def create
    media = Media.new(media_params)

    if media.save
      render json:media, status:200
    else
      render json: {error: "Error creating media"}, status:400
    end
  end

  def update
    media = Media.find(params[:id])

    if media.update(media_params)
      render json:media, status:200
    else
      render json: {error: "Error updating media"}, status:400
    end
  end

  private
    def media_params
      params.require(:media).permit(:name, :section_id, :media, :completed)
    end
end
