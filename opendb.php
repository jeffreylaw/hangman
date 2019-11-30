<?php
function openCon() {
    $servername = "localhost";
    $username = "jeffreyl_root";
    // $password = "678logintech";
    $password = "notreallysleepy";
    // $dbname = "scoreboard";
    $dbname = "jeffreyl_scoreboard";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    return $conn;
}

function closeCon($conn) {
    mysqli_close($conn);
}
?>