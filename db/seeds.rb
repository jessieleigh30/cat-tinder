200.times do
  name = Faker::Cat.name
  breed = Faker::Cat.breed
  registry = Faker::Cat.registry
  avatar = Faker::Avatar.image(name, '100x400', 'png', 'set4')
  Cat.create(name: name, breed: breed, registry: registry, avatar: avatar)
end

puts "200 Cats Seeded"
