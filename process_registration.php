<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Generate a random 10-digit registration number
    $registrationNumber = rand(1000000000, 9999999999);

    // Gather the submitted form data
    $name = htmlspecialchars($_POST["name"]);
    $fatherName = htmlspecialchars($_POST["father_name"]);
    $motherName = htmlspecialchars($_POST["mother_name"]);
    $adharCard = htmlspecialchars($_POST["adhar_card"]);
    $addressLine1 = htmlspecialchars($_POST["address_line1"]);
    $addressLine2 = htmlspecialchars($_POST["address_line2"]);
    $state = htmlspecialchars($_POST["state"]);
    $district = htmlspecialchars($_POST["district"]);
    $block = htmlspecialchars($_POST["block"]);
    $mobileNo = htmlspecialchars($_POST["mobile_no"]);
    $email = htmlspecialchars($_POST["email_id"]);

    // Save the uploaded files
    $signature = $_FILES["signature"]["name"];
    $photo = $_FILES["photo"]["name"];
    move_uploaded_file($_FILES["signature"]["tmp_name"], "uploads/" . $signature);
    move_uploaded_file($_FILES["photo"]["tmp_name"], "uploads/" . $photo);

    // Display the registration details
    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Registration Details</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                width: 50%;
                margin: auto;
                background: #fff;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            h2 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Registration Successful</h2>
            <p><strong>Registration Number:</strong> $registrationNumber</p>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Father's Name:</strong> $fatherName</p>
            <p><strong>Mother's Name:</strong> $motherName</p>
            <p><strong>Adhar Card:</strong> $adharCard</p>
            <p><strong>Address Line 1:</strong> $addressLine1</p>
            <p><strong>Address Line 2:</strong> $addressLine2</p>
            <p><strong>State:</strong> $state</p>
            <p><strong>District:</strong> $district</p>
            <p><strong>Block:</strong> $block</p>
            <p><strong>Mobile Number:</strong> $mobileNo</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Signature File:</strong> $signature</p>
            <p><strong>Photo File:</strong> $photo</p>
        </div>
    </body>
    </html>";
}
?>
