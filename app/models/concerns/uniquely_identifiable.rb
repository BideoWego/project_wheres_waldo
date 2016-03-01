module UniquelyIdentifiable
  extend ActiveSupport::Concern


  included do
    before_create :assign_unique_id

    @@unique_id_seed = nil
    @@unique_id_attribute = :uid
  end


  def refresh_unique_id
    assign_unique_id
  end


  class_methods do
    def unique_id_seed(value=nil)
      @@unique_id_seed = value unless value.nil?
      @@unique_id_seed
    end


    def unique_id_attribute(name=nil)
      @@unique_id_attribute = name unless name.nil?
      @@unique_id_attribute
    end


    def generate_unique_id(seed)
      secure_unique_id = SecureRandom.uuid
      hashed_unique_field = Digest::MD5.new.hexdigest(seed)
      time = Time.now
      time = "#{time.to_i}-#{time.usec}"
      "#{secure_unique_id}-#{hashed_unique_field}-#{time}"
    end
  end




  private
  def assign_unique_id
    seed_method = self.class.unique_id_seed
    seed = self.send(seed_method)
    unique_id = self.class.generate_unique_id(seed)
    attribute_method = "#{self.class.unique_id_attribute}=".to_sym
    self.send(attribute_method, unique_id)
  end
end

