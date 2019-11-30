<?php
include 'opendb.php';
$conn = openCon();
echo "Connected Successfully";
closeCon($conn);
?>