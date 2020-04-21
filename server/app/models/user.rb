class User < ApplicationRecord
  has_secure_password
  validates :moniker, presence: true, uniqueness: true
  validates :password_digest, presence: true
end
