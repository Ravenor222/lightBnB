const { Pool } = require('pg')
const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});





pool.connect();


module.exports = {
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

getUserWithEmail: function(email) {
 return pool.query(`
  SELECT * from users
  WHERE email = $1
 `, [email])
 
 .then(res => res.rows[0]);
},

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
getUserWithId: function(id) {
  return pool.query(`
    SELECT * FROM users
    WHERE id = $1
  `, [id])
  .then(res => res.rows[0])
},


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
addUser:  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  const { name, email, password } = user;
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2 , $3) 
    RETURNING *
  `, [name, email, password])
  .then(res=> res.rows[0])
},

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
getAllReservations: function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.* , avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = reservations.property_id
  WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date ASC
  LIMIT $2;
  `, [guest_id, limit])


  .then(res => res.rows)
  
},

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
getAllProperties: function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    if(queryParams.length === 1) {
      queryString += `WHERE city LIKE $${queryParams.length}`;
    } else if (queryParams.length > 1) {
      queryString += `AND city LIKE $${queryParams.length}`;
    }
  }
  //
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`)
    if(queryParams.length === 1) {
      queryString += `WHERE properties.owner_id = $${queryParams.length}`
    } else if (queryParams.length > 1) {
      queryString += `AND properties.owner_id = $${queryParams.length}`
    }
  }
  //
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`)
    if(queryParams.length === 1) {
      queryString += `WHERE cost_per_night > $${queryParams.length}`
    } else if (queryParams.length > 1) {
      queryString += `AND cost_per_night > $${queryParams.length}`
    }
  }
  //
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`)
    if(queryParams.length === 1) {
      queryString += `WHERE cost_per_night < $${queryParams.length}` 
    } else if (queryParams.length > 1) {
      queryString += `AND cost_per_night < $${queryParams.length}`
    }
  }
  //
  queryString += ` GROUP BY properties.id `
  //
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`)

     queryString += `HAVING AVG(property_reviews.rating) > $${queryParams.length}`
  }
  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  //console.log(queryString, queryParams, "consolelog");

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);

//  return pool.query(`
//   SELECT * FROM properties
//   LIMIT $1
//  `, [limit])
//  .then(res=> res.rows)
},


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
addProperty: function(property) {
  return pool.query (`
    INSERT INTO properties (
    owner_id,
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *
  `, [property.owner_id ,property.title, property.description, property.number_of_bedrooms, property.number_of_bathrooms, property.parking_spaces, property.cost_per_night, property.thumbnail_photo_url, property.cover_photo_url, property.street, property.country, property.city, property.province, property.post_code])
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
 },
}