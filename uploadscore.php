<?php
include 'opendb.php';
$conn = openCon();
$name = $_POST['name'];
$score = $_POST['score'];
// $name = 'Hey';
// $score = 5;

$sql = "INSERT INTO scorehistory(name, score) VALUES ('$name', $score)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

closeCon($conn);
?>