var db=require('./models/index.js');
var faker=require('faker');
var cities=[];
var users=[];
db.Post.remove({},function(err,removed){
  if(err)
  throw err
});
db.City.remove({},function(err,removed){
  if(err)
  throw err
  else{
    for(let i=0;i<10;i++){
    city={
      name:faker.address.city(),
      lat:faker.address.latitude(),
      lng:faker.address.longitude(),
      img:faker.image.city()
    }
    cities.push(city)
  }
}

db.City.create(cities,function(err,all){
  if(err)
  throw err
  else{
    cities=all;
    db.User.remove({},function(err,removed){
      if(err)
      throw err
    else{
      for(let i=0;i<5;i++){
      db.User.create({
        email:`golden${i+1}@gmail.com`,
        password:`heyhey123`,
        firstname:faker.name.firstName(),
        lastname:faker.name.lastName(),
        img:faker.image.avatar(),
        city:cities[Math.floor(Math.random() * Math.floor(10))]
      },function(err,user){
        if(err)
        throw err;
        else{
        users.push(user);
        for(let i=0;i< (Math.floor(Math.random() * Math.floor(10)+5));i++){
        db.Post.create({
          title:faker.name.title(),
          body:faker.lorem.paragraph(Math.floor(Math.random() * Math.floor(400)+100)),
          city:cities[Math.floor(Math.random() * Math.floor(10))],
          user:user
        },function(err,post){
          if(err)
          throw err;
          else{
            console.log(post)
          }
        });
      }
      }
      })
      }
    }
    });
  }
});
});
