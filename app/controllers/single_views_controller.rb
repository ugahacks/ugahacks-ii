require 'gibbon'
require 'google/api_client'
require 'google_drive'

class SingleViewsController < ApplicationController
  attr_reader :CLIENT_ID
  attr_reader :CLIENT_SECRET
  attr_reader :GOOGLE_SESSION
  attr_reader :WORKSHEET
  # session = GoogleDrive.login_with_oauth(access_token)
  layout 'blank', only: [:apply]

  def home
    @typeform_url = "https://ugahacks.typeform.com/to/rXE0ra"
  end

  def apply
  end

  def preregister
    if preregisterant = Preregistrant.create(clean_params)
      # @CLIENT_ID = ENV['GOOGLE_CLIENT_ID']
      # @CLIENT_SECRET = ENV['GOOGLE_CLIENT_SECRET']
      # @GOOGLE_SESSION = GoogleDrive.saved_session("./stored_token.json", nil, @CLIENT_ID, @CLIENT_SECRET)
      # @WORKSHEET = @GOOGLE_SESSION.spreadsheet_by_key("1bEPyKVmNMaX9874OE_GwT16pO-nagaqO_zICjGCdEqE").worksheets[0]
      # new_row = @WORKSHEET.num_rows + 1
      # @WORKSHEET[new_row, 1] = Time.now()
      # @WORKSHEET[new_row, 2] = clean_params[:email]
      # @WORKSHEET.synchronize()
      render json: clean_params
    else
      render json: {status: "error"}
    end
  end

  private

  def clean_params
    params.require(:data).permit(:email)
  end

end
