1. What columns violate 1NF?
    - member_address : Strings and numbers are together, should be seperated.
    - dinner_date : Different date formats in the same column.
    - food_code, food_description : They are not atomic values.

2. What entities do you recognize that could be extracted?
   Dinner, Venue, and Food entities should be extracted as a separated table.

3. Name all the tables and columns that would make a 3NF compliant solution.
    ##### members
    - member_id (PK)
    - member_name
    - adresse_id (FK)

    ##### address
    - address_id (PK)
    - street_number
    - street_name

    ##### dinners
    - dinner_id (PK)
    - dinner_date
    - venue_description
    - food_code (FK)

    ##### foods
    - food_code (PK)
    - food_description

    ##### dinner_members 
    - dinner_id (FK)
    - member_id (FK)
    ##### dinner_food
    - dinner_id
    - food_code