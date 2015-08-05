require 'gibbon'

class EmailapiController < ApplicationController

  def index
  end


  def subscribe

    @list_id = "3b813d061b"
    gb = Gibbon::Request.new
    begin
      gb.lists(@list_id).members.create(body: {
                                         email_address: params['email'],
                                         status: "subscribed",
      })
      redirect_to root_path, :flash => { success: "Thanks for subscribing we'll keep you posted!" }
    rescue Gibbon::MailChimpError => e
      return redirect_to root_path, :flash => { error: e.message }
    end

  end

end
