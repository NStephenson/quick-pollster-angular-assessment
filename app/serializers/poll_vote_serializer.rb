class PollVoteSerializer < ActiveModel::Serializer
  attributes :response, :public_response, :created_at, :user

end