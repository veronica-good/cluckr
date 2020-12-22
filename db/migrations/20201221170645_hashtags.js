exports.up = function(knex) {
    return knex.schema
    .createTable('hashtags', table=>{
        table.increments('id');
        table.text('hashtag');
        table.integer('counter');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('hashtags');
  };
  