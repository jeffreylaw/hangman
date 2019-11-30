<!DOCTYPE html>
<html>
    <head>
        <style>
         table {
            margin: 0 auto;
            width: 80%;
            border-collapse: collapse;
        }

        table, td, th {
            border: 1px solid white;
            padding: 5px;
        }

        th {
            text-align: center;
        }
        </style>
    </head>
    <body>
    <?php
        include 'opendb.php';
        $conn = openCon();
        $result = mysqli_query($conn,"SELECT name, score FROM scorehistory ORDER BY score DESC LIMIT 10");
        echo "<table>
        <tr>
        <th>Name</th>
        <th>Score</th>
        </tr>";
        while($row = mysqli_fetch_array($result)) {
            echo "<tr>";
            echo "<td>" . $row['name'] . "</td>";
            echo "<td>" . $row['score'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        mysqli_close($conn);
        ?>
    </body>
</html>