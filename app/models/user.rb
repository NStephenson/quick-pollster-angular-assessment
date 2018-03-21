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

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      if conditions[:username].nil?
        where(conditions).first
      else
        where(username: conditions[:username]).first
      end
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      ##### The username should be set by the user and ideally a user would not be able to be created without a validated username ##
      user.username = auth.info.name
    end
  end

  ###### Temporary code to bypasss issue with Devise token auth. Needs long term solution #####################################

  def nickname
    username
  end

  def name
  end

  def name=(n)
  end

  def nickname=(name)
    self.username = "Terry"
  end

  def image=(n)
  end

  def image
  end

################################################ß

  def polls_responded
    responses.map { |response| response.poll }.uniq
  end
  

end
