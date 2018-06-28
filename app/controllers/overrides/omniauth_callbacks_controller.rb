module Overrides

  class OmniauthCallbacksController <  DeviseTokenAuth::OmniauthCallbacksController

    def assign_provider_attrs(user, auth_hash)
      user.email = auth_hash["info"]['email']
      user.username = auth_hash["info"]['name']
      user.create_new_auth_token(user.uid)
      user
    end


  end

end