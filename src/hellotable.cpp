
#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

CONTRACT hellotable : public contract {
  public:
    using contract::contract;
    hellotable(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds) {}
    
    ACTION insert(name owner, std::string dog_name, int age) {
      require_auth(owner);
      dog_index dogs(get_self(), get_self().value);
      dogs.emplace(owner, [&] (auto& row) {
        row.id = dogs.available_primary_key();
        row.dog_name = dog_name;
        row.age = age;
        row.owner = owner;
      });
     };
     
     ACTION erase(int dog_id) {
       dog_index dogs(get_self(), get_self().value);
       auto dog = dogs.get(dog_id, "Unable to fetch the dog.");
       require_auth(dog.owner);
       auto iterator = dogs.find(dog_id);
       dogs.erase(iterator);
     }
     
     ACTION update(int dog_id, name owner, std::string dog_name, int age) {
       dog_index dogs(get_self(), get_self().value);
       auto dog = dogs.get(dog_id, "Unable to fetch the dog.");
       require_auth(dog.owner);
       auto iterator = dogs.find(dog_id);
       dogs.modify(iterator, dog.owner, [&] (auto& row) {
        row.id = dog_id;
        row.dog_name = dog_name;
        row.age = age;
        row.owner = owner;
      });
     }

   private:
   TABLE dog {
     int id;
     std::string dog_name;
     int age;
     name owner;
     uint64_t primary_key() const {return id;}
   };
   
   typedef multi_index<"dogs"_n,dog> dog_index;

};