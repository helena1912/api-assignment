Feature: Everything about your Pets

    Scenario: Add a new pet
        Given the pet does not exist in the system
        When a post request to add to the store is sent 
        Then the pet should be added successfully

    Scenario: Get a pet information
        Given the pet exists in the system
        And a get request to get pet information by petId is sent 
        Then the system should return the latest pet information

    Scenario: Find pet by status
        Given the pet exists in the system with status "available"
        When a get request to get pets list by status is sent 
        Then the system should return the pet list matched with status "available"

    Scenario: Update pet information
        Given the pet exists in the system
        When a post request to update pet information is sent 
        Then the pet should be updated successfully

     Scenario: Delete a pet
        Given the pet exists in the system
        When a delete request to delete a pet is sent
        Then the pet should be removed from the system successfully
        And the pet should be not found


