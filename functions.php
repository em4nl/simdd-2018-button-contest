<?php

// a version of file_get_contents that doesn't generate a warning
// when a file doesn't exist, it just returns FALSE "silently" ...
// use with caution and make sure to handle the FALSE case always!
function my_file_get_contents($path) {
    set_error_handler(function() {});
    $res = file_get_contents($path);
    restore_error_handler();
    return $res;
}

// same with fopen
function my_fopen($path, $mode) {
    set_error_handler(function() {});
    $res = @fopen($path, $mode);
    restore_error_handler();
    return $res;
}
