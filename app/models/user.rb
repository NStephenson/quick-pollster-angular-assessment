class User < ActiveRecord::Base
  # Include default devise modules.
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  include DeviseTokenAuth::Concerns::User

  validates :username, :presence => true, 
  :uniqueness => { :case_sensitive => false }

  has_many :polls
  has_many :votes
  has_many :responses, through: :votes
  has_many :surveys

  attr_accessor :login

  def polls_responded
    responses.map { |response| response.poll }.uniq
  end
  

end
