-- INSERT INTO USERS (
--     name, email, password
-- ) VALUES (
--     'Nick', 'ndanvers222@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
-- ), (
--     'Bick', 'ndanvers222@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
-- ), (
--     'Tick', 'ndanvers222@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
-- );

-- INSERT INTO properties (
--     owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces,number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code
-- ) VALUES (
--     1, 'Speed lamb', 'description', 'https://images.pexels.com/photos/2121121/pexels_photo-2086676.jpeg?auto+compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexeps-photo-2086676.jpeg', 930.61, 6,4,8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142'
-- ), (
--     2, 'Slow Rabbit', 'description', 'https://images.pexels.com/photos/2121121/pexels_photo-2086676.jpeg?auto+compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexeps-photo-2086676.jpeg', 930.61, 6,4,8, 'Canada', '536 Namsub Highway', 'Sotbosker', 'Quebec', '28142'
-- ) ,(
--     3, 'Funny Bear', 'description', 'https://images.pexels.com/photos/2121121/pexels_photo-2086676.jpeg?auto+compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexeps-photo-2086676.jpeg', 930.61, 6,4,8, 'Canada', '536 Namsub Highway', 'Sotbosket', 'Quebec', '28142'
-- );


INSERT INTO reservations (
    guest_id, property_id, start_date, end_date
) VALUES (1,1,'2018-09-09', '2018-09-10'),
(1,1,'2018-09-09', '2018-09-10'),
(2,2,'2018-09-09', '2018-09-10'),
(3,3,'2018-09-09', '2018-09-10');


INSERT INTO property_reviews (
    guest_id, property_id, reservation_id, rating, message 
) VALUES (1,1,1,99,'was good'),
(2,2,2,99,'was medium'),
(3,3,3,99,'was decent');