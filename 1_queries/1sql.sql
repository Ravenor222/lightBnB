-- select id, name, email, password
-- FROM USERS where email = 'tristanjacobs@gmail.com';

-- select avg(end_date - start_date) FROM reservations;

-- SELECT properties.*, avg(property_reviews.rating) as average_rating
-- FROM properties
-- JOIN property_reviews ON properties.id = property_id
-- WHERE city LIKE '%ancouv%'
-- GROUP BY properties.id
-- HAVING avg(property_reviews.rating) >= 4
-- ORDER BY cost_per_night
-- LIMIT 10;

-- select city, count(reservations.*) as total_reservations from reservations
-- JOIN properties ON property_id = properties.id GROUP BY properties.city ORDER BY total_reservations DESC;


-- SELECT reservations.*, properties.* , avg(rating) as average_rating
-- FROM reservations
-- JOIN properties ON reservations.property_id = properties.id
-- JOIN property_reviews ON properties.id = reservations.property_id
-- WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
-- GROUP BY properties.id, reservations.id
-- ORDER BY reservations.start_date ASC
-- LIMIT 10;