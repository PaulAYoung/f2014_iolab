declare namespace html = "http://www.w3.org/1999/xhtml";
declare namespace my = "http://www.example.com";

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>/title</title>
    </head>
      <body>
          <div>
              {
              for $li in /html:ul/html:li
                return <p>{my:title(doc(resolve-uri($li/html:a/@href,base-uri(/))))}</p>
              }
          </div>
      </body>
</html>