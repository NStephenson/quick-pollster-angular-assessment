class UserVoteSerializer < ActiveModel::Serializer
  attributes :response, :public_response, :created_at, :poll

end