exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.integer('positions').alter();
      table.specificType('position_company_name', 'jsonb');
      table.specificType('position_company_industry', 'jsonb');
      table.specificType('position_company_type', 'jsonb');
      table.specificType('position_company_location', 'jsonb');
      table.specificType('position_company_summary', 'jsonb');
      table.specificType('position_company_title', 'jsonb');
      table.dropColumn('three_current_positions');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('positions').alter();
      table.dropColumn('position_company_name');
      table.dropColumn('position_company_industry');
      table.dropColumn('position_company_type');
      table.dropColumn('position_company_location');
      table.dropColumn('position_company_summary');
      table.dropColumn('position_company_title');
      table.specificType('three_current_positions', 'jsonb');
    })
  ])
};
