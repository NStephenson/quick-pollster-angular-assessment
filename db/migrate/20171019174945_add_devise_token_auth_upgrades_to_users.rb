class AddDeviseTokenAuthUpgradesToUsers < ActiveRecord::Migration
  def change
    ## add defaults
    change_column :users, :provider, :string, :null => false, :default => "email"
    change_column :users, :uid, :string, :null => false, :default => ""

    ## Tokens
    add_column :users, :tokens, :json


    ##Add in a later migration probably##
    #add_index :users, :provider,  unique: true
    #add_index :users, :uid,       unique: true


    # add_index :users, :unlock_token,       unique: true
  end
end
