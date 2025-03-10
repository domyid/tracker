# tracker

## index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script type="module" src="main.js"></script>
</body>
</html>
```

## contoh main.js menggunakan jscroot
```
import { getSystemInfo } from "./index.js"
import { runAfterDOM } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";

runAfterDOM(getSystemInfo);
```

## contoh main.js menggunakan document
```
import { getSystemInfo } from "./index.js"

document.addEventListener("DOMContentLoaded", function() {
    getSystemInfo();
});
```