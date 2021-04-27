Feature: Costumer Crud

  Costumers on our application are the companys.
  Companys hava devices that they use to track data in their industries.
  We provide a app for that.

  Example: Super admin see the list and delete consumer
    Given A admin access the costumer route
    And there are costumers on the database
    Then admin will se a list of the costumers
    Then admin will click on the delete button
    Then a dialog should appear with confirmation button
    Then admin will click on the confirmation button
    Then admin will see a success notification and the consumer should've disapeared from the list


