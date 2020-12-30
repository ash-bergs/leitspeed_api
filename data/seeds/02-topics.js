
exports.seed = function(knex) {
  return knex('topics').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('topics').insert([
        {name: 'Geography'},
        {name: 'JavScript'},
        {name: 'CSS'}, 
        {name: 'American History'}, 
        {name: 'Computer Science'}, 
        {name: 'Vocabulary'}
      ]);
    });
};
