<?php
header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
include('404.html'); // provide your own HTML for the error page
die();
?>